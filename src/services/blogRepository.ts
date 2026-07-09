import { getSupabaseClient, isSupabaseConfigured } from "./supabaseClient";

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
    readingTime: number;
}

const BLOG_STORAGE_KEY = "portfolio_blog_posts";

const postModules = import.meta.glob("../blog/*.md", {
    query: "?raw",
    import: "default",
});

function calcReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

function parseFrontmatter(raw: string): {
    metadata: Record<string, any>;
    content: string;
} {
    const parts = raw.split("---");
    if (parts.length < 3) return { metadata: {}, content: raw };

    const frontmatter = parts[1].trim();
    const content = parts.slice(2).join("---").trim();
    const metadata: Record<string, any> = {};

    frontmatter.split("\n").forEach((line) => {
        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) return;
        const key = line.slice(0, colonIdx).trim();
        const rawVal = line
            .slice(colonIdx + 1)
            .trim()
            .replace(/^["']|["']$/g, "");
        if (key === "tags") {
            if (rawVal.startsWith("[")) {
                metadata[key] = rawVal
                    .replace(/[\[\]"']/g, "")
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
            } else {
                metadata[key] = rawVal
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
            }
        } else {
            metadata[key] = rawVal;
        }
    });

    return { metadata, content };
}

// Fetch all local static posts (e.g. from src/blog/*.md glob)
export async function fetchStaticPosts(): Promise<BlogPost[]> {
    const results = await Promise.all(
        Object.entries(postModules).map(async ([path, rawContent]) => {
            const text = (await rawContent()) as string;
            const { metadata, content } = parseFrontmatter(text);
            const fileName = path.split("/").pop()!.replace(".md", "");
            return {
                slug: metadata.slug || fileName,
                title: metadata.title || "Untitled",
                date: metadata.date || "",
                description: metadata.description || "",
                tags: metadata.tags || [],
                content,
                readingTime: calcReadingTime(content),
            } as BlogPost;
        })
    );
    return results;
}

// Local Storage Fallbacks
function loadFromLocalStorage(): BlogPost[] {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(BLOG_STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveToLocalStorage(posts: BlogPost[]): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}

// Main API: Loading posts
export async function loadBlogPosts(): Promise<BlogPost[]> {
    const supabase = getSupabaseClient();

    if (!supabase) {
        // Local storage path
        const local = loadFromLocalStorage();
        if (local.length === 0) {
            const statics = await fetchStaticPosts();
            saveToLocalStorage(statics);
            return statics.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        }
        return local.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    try {
        const { data: dbPosts, error } = await supabase
            .from("posts")
            .select("*")
            .order("date", { ascending: false });

        if (error) throw error;

        if (!dbPosts || dbPosts.length === 0) {
            // Seed from local static posts into database
            const statics = await fetchStaticPosts();
            if (statics.length > 0) {
                const toInsert = statics.map(post => ({
                    slug: post.slug,
                    title: post.title,
                    date: post.date,
                    description: post.description,
                    tags: post.tags,
                    content: post.content,
                    reading_time: post.readingTime
                }));

                await supabase.from("posts").insert(toInsert);
            }
            return statics.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        }

        return dbPosts.map(db => ({
            slug: db.slug,
            title: db.title,
            date: db.date,
            description: db.description,
            tags: db.tags || [],
            content: db.content,
            readingTime: db.reading_time || calcReadingTime(db.content)
        }));
    } catch (err) {
        console.error("Error loading blog posts from Supabase database:", err);
        // fallback to local storage
        return loadFromLocalStorage().sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
}

// Main API: Saving / editing a single post
export async function saveBlogPost(post: BlogPost): Promise<void> {
    // Update local storage in both instances to keep fallback updated
    const local = loadFromLocalStorage();
    const index = local.findIndex(p => p.slug === post.slug);
    if (index > -1) {
        local[index] = post;
    } else {
        local.push(post);
    }
    saveToLocalStorage(local);

    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
        const payload = {
            slug: post.slug,
            title: post.title,
            date: post.date,
            description: post.description,
            tags: post.tags,
            content: post.content,
            reading_time: calcReadingTime(post.content)
        };

        const { error } = await supabase.from("posts").upsert(payload, { onConflict: "slug" });
        if (error) throw error;
    } catch (err) {
        console.error("Error saving blog post to Supabase database:", err);
        throw err;
    }
}

// Main API: Deleting a single post
export async function deleteBlogPost(slug: string): Promise<void> {
    const local = loadFromLocalStorage();
    const updated = local.filter(p => p.slug !== slug);
    saveToLocalStorage(updated);

    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
        const { error } = await supabase.from("posts").delete().eq("slug", slug);
        if (error) throw error;
    } catch (err) {
        console.error("Error deleting blog post from Supabase database:", err);
        throw err;
    }
}

// Parse uploaded Markdown frontmatter and contents
export function parseUploadedMarkdown(rawSource: string): Partial<BlogPost> {
    const { metadata, content } = parseFrontmatter(rawSource);

    // Try to generate reading time
    const readingTime = calcReadingTime(content);

    return {
        title: metadata.title || "",
        slug: metadata.slug || "",
        date: metadata.date || new Date().toISOString().split("T")[0],
        description: metadata.description || "",
        tags: metadata.tags || [],
        content,
        readingTime
    };
}

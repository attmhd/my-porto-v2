import { useState, useEffect } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  readingTime: number;
}

// Add new post files here
export const POST_FILES = [
  "building-scalable-rag-pipelines.md",
  "deploying-ai-models-on-edge-devices.md",
];

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFrontmatter(raw: string): { metadata: Record<string, any>; content: string } {
  const parts = raw.split("---");
  if (parts.length < 3) return { metadata: {}, content: raw };

  const frontmatter = parts[1].trim();
  const content = parts.slice(2).join("---").trim();
  const metadata: Record<string, any> = {};

  frontmatter.split("\n").forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const rawVal = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key === "tags") {
      // handle both `["a","b"]` and `a, b` formats
      if (rawVal.startsWith("[")) {
        metadata[key] = rawVal
          .replace(/[\[\]"']/g, "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      } else {
        metadata[key] = rawVal.split(",").map((t) => t.trim()).filter(Boolean);
      }
    } else {
      metadata[key] = rawVal;
    }
  });

  return { metadata, content };
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const fileName = POST_FILES.find((f) => f.replace(".md", "") === slug);
  if (!fileName) return null;

  try {
    const res = await fetch(`/blog/${fileName}`);
    if (!res.ok) return null;
    const text = await res.text();
    const { metadata, content } = parseFrontmatter(text);

    return {
      slug: metadata.slug || fileName.replace(".md", ""),
      title: metadata.title || "Untitled",
      date: metadata.date || "",
      description: metadata.description || "",
      tags: metadata.tags || [],
      content,
      readingTime: calcReadingTime(content),
    };
  } catch {
    return null;
  }
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  const results = await Promise.all(
    POST_FILES.map(async (file) => {
      try {
        const res = await fetch(`/blog/${file}`);
        if (!res.ok) return null;
        const text = await res.text();
        const { metadata, content } = parseFrontmatter(text);
        return {
          slug: metadata.slug || file.replace(".md", ""),
          title: metadata.title || "Untitled",
          date: metadata.date || "",
          description: metadata.description || "",
          tags: metadata.tags || [],
          content,
          readingTime: calcReadingTime(content),
        } as BlogPost;
      } catch {
        return null;
      }
    }),
  );

  return results
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Hook: all posts
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts().then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, []);

  return { posts, loading };
}

// Hook: single post
export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("No slug provided");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchPostBySlug(slug).then((p) => {
      if (!p) setError("Post not found");
      else setPost(p);
      setLoading(false);
    });
  }, [slug]);

  return { post, loading, error };
}

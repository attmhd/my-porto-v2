import React, { useState, useEffect } from "react";
import {
    BlogPost,
    loadBlogPosts,
    saveBlogPost,
    deleteBlogPost,
    parseUploadedMarkdown
} from "../../services/blogRepository";
import {
    fieldClass,
    textareaClass,
    sectionCardClass,
    EmptyState,
    SectionHeader
} from "./shared";
import ReactMarkdown from "react-markdown";

export const BlogSection: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    // Editor view states
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editorTab, setEditorTab] = useState<"write" | "preview">("write");

    // Form fields
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [tagsInput, setTagsInput] = useState("");
    const [content, setContent] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const allPosts = await loadBlogPosts();
            setPosts(allPosts);
        } catch (err) {
            console.error("Failed to load posts", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNew = () => {
        setEditingPost(null);
        setTitle("");
        setSlug("");
        setDate(new Date().toISOString().split("T")[0]);
        setDescription("");
        setTagsInput("");
        setContent("");
        setErrorMsg("");
        setEditorTab("write");
        setIsEditing(true);
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setTitle(post.title);
        setSlug(post.slug);
        setDate(post.date);
        setDescription(post.description);
        setTagsInput(post.tags.join(", "));
        setContent(post.content);
        setErrorMsg("");
        setEditorTab("write");
        setIsEditing(true);
    };

    const handleDelete = async (slugToDelete: string) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await deleteBlogPost(slugToDelete);
            setPosts((prev) => prev.filter((p) => p.slug !== slugToDelete));
        } catch (err) {
            console.error("Failed to delete post", err);
            alert("Error deleting post");
        }
    };

    const handleImportMarkdown = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            if (text) {
                try {
                    const parsed = parseUploadedMarkdown(text);
                    if (parsed.title) setTitle(parsed.title);
                    if (parsed.slug) setSlug(parsed.slug);
                    if (parsed.date) setDate(parsed.date);
                    if (parsed.description) setDescription(parsed.description);
                    if (parsed.tags) setTagsInput(parsed.tags.join(", "));
                    if (parsed.content) setContent(parsed.content);
                } catch (error) {
                    console.error("Error parsing markdown file", error);
                    setErrorMsg("Could not parse file. Make sure file has valid YAML frontmatter.");
                }
            }
        };
        reader.readAsText(file);
        // Reset file input value so same file can be uploaded again
        e.target.value = "";
    };

    const generateSlugFromTitle = () => {
        const generated = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
        setSlug(generated);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!title.trim() || !slug.trim() || !date.trim() || !content.trim()) {
            setErrorMsg("Title, unique slug, date, and content are required.");
            return;
        }

        // Verify duplicate slug if creating new
        if (!editingPost && posts.some((p) => p.slug === slug)) {
            setErrorMsg("A post with this slug already exists.");
            return;
        }

        setIsSaving(true);
        try {
            const tags = tagsInput
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);

            const payload: BlogPost = {
                title,
                slug,
                date,
                description,
                tags,
                content,
                readingTime: Math.max(1, Math.round(content.trim().split(/\s+/).length / 200))
            };

            await saveBlogPost(payload);

            // Refresh local list
            await fetchPosts();
            setIsEditing(false);
        } catch (err: any) {
            console.error("Failed to save post", err);
            setErrorMsg(err.message || "Failed to save blog post. Verify database schema.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading && posts.length === 0) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="ml-3 text-sm text-gray-500">Loading blog posts...</span>
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/[0.08] pb-4">
                    <div>
                        <h3 className="text-xl font-bold">
                            {editingPost ? `Edit Post: ${editingPost.title}` : "Create New Blog Post"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Add details, upload an existing *.md file or write dynamically in Markdown.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="rounded-full border border-gray-200 dark:border-white/[0.08] px-4 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                    >
                        Cancel
                    </button>
                </div>

                {errorMsg && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 font-mono">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Title */}
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Title</label>
                            <input
                                type="text"
                                className={fieldClass}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="How to build custom CLI tools"
                                required
                            />
                        </div>

                        {/* Upload markdown file */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                                Option: Upload Markdown
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".md"
                                    onChange={handleImportMarkdown}
                                    className="hidden"
                                    id="markdown-uploader"
                                />
                                <label
                                    htmlFor="markdown-uploader"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 dark:border-white/[0.15] bg-gray-50 dark:bg-white/[0.02] px-4 py-3 text-xs text-gray-600 dark:text-gray-300 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center"
                                >
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                    </svg>
                                    Choose *.md file...
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Slug */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-between">
                                <span>Unique Slug</span>
                                <button
                                    type="button"
                                    onClick={generateSlugFromTitle}
                                    className="text-[10px] text-primary hover:underline"
                                >
                                    Sync Title
                                </button>
                            </label>
                            <input
                                type="text"
                                className={fieldClass}
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="custom-cli-tools"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Publish Date</label>
                            <input
                                type="date"
                                className={fieldClass}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Tags (comma-separated)</label>
                            <input
                                type="text"
                                className={fieldClass}
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                placeholder="react, web, nodejs"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Short Description</label>
                        <input
                            type="text"
                            className={fieldClass}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of the post..."
                        />
                    </div>

                    {/* Dynamic editor interface with Write and Preview options */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center bg-gray-50 dark:bg-white/[0.02] p-1.5 rounded-xl border border-gray-200 dark:border-white/[0.08]">
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => setEditorTab("write")}
                                    className={`rounded-lg px-3 py-1.5 text-xs transition-colors font-medium ${editorTab === "write"
                                            ? "bg-white dark:bg-[#18181b] text-gray-900 dark:text-white shadow-sm"
                                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                        }`}
                                >
                                    Write Content
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditorTab("preview")}
                                    className={`rounded-lg px-3 py-1.5 text-xs transition-colors font-medium ${editorTab === "preview"
                                            ? "bg-white dark:bg-[#18181b] text-gray-900 dark:text-white shadow-sm"
                                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                        }`}
                                >
                                    Visual Preview
                                </button>
                            </div>
                            <span className="text-[10px] text-gray-400 pr-2 font-mono">Supports Markdown Syntax</span>
                        </div>

                        {editorTab === "write" ? (
                            <textarea
                                className={`${textareaClass} font-mono text-xs`}
                                rows={20}
                                style={{ minHeight: "450px" }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="# Introduction&#10;&#10;Start writing here in Markdown..."
                                required
                            />
                        ) : (
                            <div
                                className="w-full rounded-xl border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.01] px-6 py-6 overflow-y-auto text-sm prose-content prose dark:prose-invert max-w-none"
                                style={{ height: "450px" }}
                            >
                                {content.trim() ? (
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                ) : (
                                    <p className="text-gray-400 italic">No content written yet.</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-white/[0.08]">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="rounded-full border border-gray-200 dark:border-white/[0.08] px-5 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSaving ? "Saving..." : "Save Post"}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Blog Posts</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your articles which are saved directly to the database.
                    </p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100"
                >
                    Add new post
                </button>
            </div>

            {posts.length === 0 ? (
                <EmptyState
                    title="No blog posts"
                    description="Create your first post or upload a markdown file to get started."
                    action={
                        <button
                            onClick={handleCreateNew}
                            className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-gray-900"
                        >
                            Add first post
                        </button>
                    }
                />
            ) : (
                <div className="grid gap-3 pt-2">
                    {posts.map((post) => (
                        <div key={post.slug} className={sectionCardClass}>
                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                        <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/[0.04] px-2 py-0.5 rounded">
                                            {post.date}
                                        </span>
                                        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                                            {post.readingTime} min read
                                        </span>
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-mono text-gray-500 bg-gray-100 dark:bg-white/[0.04] px-2 py-0.5 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                                        {post.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                                        {post.description || "No description provided."}
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-mono mt-1">
                                        Slug: {post.slug}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="rounded-full border border-gray-200 dark:border-white/[0.08] px-3.5 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.slug)}
                                        className="rounded-full border border-red-200 dark:border-red-500/20 px-3.5 py-1.5 text-xs text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default BlogSection;

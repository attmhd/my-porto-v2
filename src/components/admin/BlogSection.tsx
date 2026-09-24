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
    EmptyState
} from "./shared";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { generateBlogContentStream } from "../../services/geminiService";
import { useToast } from "./ToastContext";

const MARKDOWN_PREVIEW_EXAMPLE = `# Status: Kurang Sopan

### Analisis
Penggunaan sapaan 'Bapak' kepada teman sebaya terasa terlalu formal dan berjarak, sehingga tidak selaras dengan prinsip Kato Mandata. Selain itu, penggunaan kata 'izin' kepada teman sebaya kurang lazim dalam pergaulan akrab masyarakat Minangkabau.

### Saran Perbaikan
> 'Sanak, ambo nio pai jalan-jalan ka Padang Japang dulu yo.'`;

const DUMMY_MARKDOWN_RESPONSE =
{
    result: "Di tepi hutan yang rimbun, hiduplah dua sahabat yang sangat berbeda sifatnya: Monyet yang lincah namun pemalas, dan Kura-kura yang lambat namun sangat rajin. Monyet selalu membanggakan kecepatan dan keahlian memanjatnya, sementara Kura-kura lebih suka bekerja dalam diam.\n\nSuatu pagi, Monyet melihat seberkas cahaya kuning dari seberang sungai. Ternyata, itu adalah pohon pisang yang berbuah sangat lebat, tampak begitu menggoda dengan tandan-tandan emasnya.\n\n\"Wah, pisang itu pasti manis sekali!\" seru Monyet, melompat-lompat kegirangan. \"Andai saja aku bisa memetiknya sekarang juga!\" Namun, ia terlalu malas untuk menyeberangi sungai yang cukup lebar.\n\nKura-kura yang sedang berjemur di tepi sungai, turut memandangi pohon pisang itu. Dalam benaknya, ia berpikir, *\"Pasti menyenangkan jika aku bisa menanam pohon pisang seperti itu di dekat rumahku.\"*\n\nTanpa banyak bicara, Kura-kura mulai bergerak perlahan menuju sungai. Ia bertekad untuk menyeberang dan mencari bibit pohon pisang dari sana, meski tahu perjalanannya akan sangat panjang dan melelahkan.\n\nMonyet melihat Kura-kura yang mulai berenang dengan susah payah. Ia tertawa terbahak-bahak. \"Hahaha, Kura-kura! Dengan kecepatanmu itu, mungkin kau baru akan sampai besok pagi!\" ejeknya.\n\nKura-kura tidak menghiraukan ejekan Monyet. Ia terus mengayuh kakinya, satu demi satu, dengan penuh kesabaran. Baginya, yang terpenting adalah mencapai tujuannya, bukan seberapa cepat ia sampai.\n\nSetelah berjam-jam berjuang melawan arus, akhirnya Kura-kura berhasil mencapai tepi seberang. Ia mencari-cari di antara semak belukar dan menemukan sebuah tunas pisang kecil yang tampak sehat.\n\nDengan hati-hati, Kura-kura mencabut tunas itu, lalu kembali berenang menyeberangi sungai. Kali ini, ia harus membawa beban tambahan, membuat perjalanannya terasa jauh lebih berat.\n\nMonyet sudah tertidur pulas di pohonnya saat Kura-kura kembali. Kura-kura tidak berhenti, ia langsung menggali tanah di dekat rumahnya dan menanam tunas pisang itu dengan penuh kasih sayang.\n\nSetiap hari, Kura-kura menyiram tunas pisangnya, membersihkan gulma di sekitarnya, dan memastikan ia mendapatkan cukup sinar matahari. Sementara itu, Monyet masih bermalas-malasan, hanya memimpikan pisang tanpa usaha.\n\nBulan berganti bulan, tunas pisang Kura-kura tumbuh semakin tinggi dan besar. Daun-daunnya hijau subur, dan tak lama kemudian, munculah jantung pisang yang perlahan berubah menjadi tandan-tandan buah.\n\nAkhirnya, tiba saatnya pisang-pisang itu matang sempurna, berwarna kuning keemasan, dan mengeluarkan aroma manis yang semerbak. Kura-kura sangat bahagia melihat hasil kerja kerasnya.\n\nMonyet yang terbangun karena aroma manis itu, terkejut melihat pohon pisang Kura-kura yang berbuah lebat. Ia merasa menyesal karena dulu hanya mengejek dan tidak mau berusaha.\n\nKura-kura memetik pisang-pisang itu dan membagikannya kepada teman-teman hewan lain yang juga rajin bekerja. Mereka semua menikmati manisnya pisang hasil jerih payah Kura-kura.\n\nMonyet, dengan perut keroncongan, mendekati Kura-kura. \"Kura-kura, bolehkah aku meminta sedikit pisangmu?\" tanyanya malu-malu. Kura-kura tersenyum, *\"Tentu saja, Monyet. Tapi ingatlah, hasil terbaik selalu datang dari kerja keras dan kesabaran.\"* Monyet pun mengangguk, menyadari pelajaran berharga hari itu."
}

export const BlogSection: React.FC = () => {
    const { showToast } = useToast();
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

    // AI Content Generator states
    const [aiPrompt, setAiPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [useMetadata, setUseMetadata] = useState(true);
    const previewContent = content.includes("\\n")
        ? content.replace(/\\n/g, "\n")
        : content;

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

    const handleUsePreviewExample = () => {
        setTitle("Preview Markdown Test");
        setDescription("Contoh konten untuk testing visual preview ReactMarkdown.");
        setTagsInput("testing, markdown, preview");
        setContent(MARKDOWN_PREVIEW_EXAMPLE);
        setEditorTab("preview");
        setErrorMsg("");
    };

    const handleLoadDummyResponse = () => {
        setTitle("Dummy API Markdown Response");
        setDescription("Simulasi respons API untuk pengujian preview markdown.");
        setTagsInput("testing, markdown, dummy-response");
        setContent(DUMMY_MARKDOWN_RESPONSE.result);
        setEditorTab("preview");
        setErrorMsg("");
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
            showToast("Blog post deleted successfully!", "success");
        } catch (err: any) {
            console.error("Failed to delete post", err);
            showToast(err.message || "Failed to delete blog post.", "error");
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
                    showToast("Markdown file imported successfully!", "success");
                } catch (error) {
                    console.error("Error parsing markdown file", error);
                    setErrorMsg("Could not parse file. Make sure file has valid YAML frontmatter.");
                    showToast("Could not parse file. Invalid YAML frontmatter.", "error");
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

    const handleGenerateWithAI = async () => {
        if (isGenerating) return;

        setErrorMsg("");
        setIsGenerating(true);

        const promptText = aiPrompt.trim();
        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        // Standard overwrite confirmation if content already exists
        if (content.trim()) {
            const shouldAppend = window.confirm(
                "Do you want to append the generated content to the end of the current post? Click 'Cancel' to overwrite."
            );
            if (!shouldAppend) {
                setContent("");
            }
        }

        try {
            const stream = await generateBlogContentStream(
                promptText,
                useMetadata ? title : undefined,
                useMetadata ? description : undefined,
                useMetadata ? tags : undefined
            );

            // Switch to write tab so they can see it writing
            setEditorTab("write");

            for await (const chunk of stream) {
                const text = chunk.text;
                if (text) {
                    setContent((prev) => prev + text);
                }
            }
            showToast("Blog content generated successfully!", "success");
        } catch (err: any) {
            console.error("AI generation failed", err);
            setErrorMsg(
                err.message === "API Key missing"
                    ? "Gemini API Key is missing. Please ensure GEMINI_API_KEY is set in your .env file."
                    : `Failed to generate blog content: ${err.message || "Unknown error"}`
            );
            showToast("Failed to generate content with AI.", "error");
        } finally {
            setIsGenerating(false);
        }
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
            showToast("Blog post saved successfully!", "success");
        } catch (err: any) {
            console.error("Failed to save post", err);
            setErrorMsg(err.message || "Failed to save blog post. Verify database schema.");
            showToast("Failed to save blog post.", "error");
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

                    {/* AI Generator Assistant */}
                    <div className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-gray-50/50 dark:bg-white/[0.01] p-4 space-y-3.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-base">✨</span>
                                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">AI Writer Assistant</h4>
                            </div>
                            <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-mono font-semibold">
                                Gemini-3.5-Flash
                            </span>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Let AI draft or refine your article directly in the editor. Set custom instructions or let the AI write based on your current metadata.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Custom Prompt / Instructions (Optional)
                                </label>
                                <input
                                    type="text"
                                    className={fieldClass}
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    placeholder="e.g. Focus on Server Actions, add code examples, explain performance implications..."
                                    disabled={isGenerating}
                                />
                            </div>

                            <div className="flex items-center gap-4 h-10 pb-1">
                                <label className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={useMetadata}
                                        onChange={(e) => setUseMetadata(e.target.checked)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                        disabled={isGenerating}
                                    />
                                    Include Title, Tags & Desc
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-1.5">
                            <button
                                type="button"
                                onClick={handleGenerateWithAI}
                                disabled={isGenerating || (!aiPrompt.trim() && !useMetadata) || (useMetadata && !title.trim())}
                                className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-xs font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center gap-1.5"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
                                        <span>AI is writing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>✨</span> Generate Content
                                    </>
                                )}
                            </button>

                            {content.trim() && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to clear the editor content?")) {
                                            setContent("");
                                        }
                                    }}
                                    className="rounded-full border border-gray-200 dark:border-white/[0.08] px-4 py-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                                    disabled={isGenerating}
                                >
                                    Clear Content
                                </button>
                            )}
                        </div>
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
                            <div className="flex items-center gap-2 pr-2">
                                <button
                                    type="button"
                                    onClick={handleUsePreviewExample}
                                    className="text-[10px] font-mono text-primary hover:underline"
                                >
                                    Use preview example
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLoadDummyResponse}
                                    className="text-[10px] font-mono text-primary hover:underline"
                                >
                                    Load dummy response
                                </button>
                                <span className="text-[10px] text-gray-400 font-mono">
                                    Supports Markdown Syntax
                                </span>
                            </div>
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
                                {previewContent.trim() ? (
                                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                        {previewContent}
                                    </ReactMarkdown>
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

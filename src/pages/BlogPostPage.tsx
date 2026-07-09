import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  useBlogPost,
  useBlogPosts,
  BlogPost as BlogPostType,
} from "../hooks/useBlogPosts";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={oneDark}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const RelatedCard: React.FC<{ post: BlogPostType }> = ({ post }) => (
  <Link
    to={`/writing/${post.slug}`}
    className="group block py-2 border-b border-gray-100 last:border-0"
  >
    <div>
      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors leading-snug mb-1 line-clamp-2">
        {post.title}
      </h4>
      <span className="text-xs font-mono text-gray-500">
        {post.readingTime} min read
      </span>
    </div>
  </Link>
);

// Instagram share helper: attempts Web Share API then copies link to clipboard as fallback
const InstagramShare: React.FC<{ post: BlogPostType }> = ({ post }) => {
  const [copied, setCopied] = React.useState(false);
  const getUrl = () => (typeof window !== "undefined" ? window.location.origin + `/writing/${post.slug}` : "");

  const handleShare = async () => {
    const url = getUrl();
    // Prefer native share where available (mobile) so user can pick Instagram
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.description || post.title, url });
        return;
      } catch (err) {
        // fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // ignore
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-sm font-mono text-gray-700 hover:text-primary transition-colors"
      aria-label="Share to Instagram"
      title={copied ? "Link copied" : "Share to Instagram"}
    >
      Instagram{copied ? " (copied)" : ""}
    </button>
  );
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug);
  const { posts } = useBlogPosts();
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setScrollProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on new post
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Related posts: share at least one tag, exclude current
  const related = post
    ? posts
        .filter(
          (p) =>
            p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)),
        )
        .slice(0, 3)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4" />
          <p className="text-sm font-mono text-gray-400">loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-sm text-gray-400 mb-2">404</p>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">
            Post not found
          </h1>
          <Link
            to="/writing"
            className="text-sm text-primary hover:underline font-mono"
          >
            ← Back to Writing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={contentRef} className="min-h-screen bg-white">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gray-100">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Post header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl py-4 md:py-6">
          {/* Back nav */}
          <div className="mb-4">
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-primary transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              All posts
            </Link>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight  max-w-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 max-w-6xl py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Article */}
          <article className="lg:col-span-3">
            <div className="prose-content">
              <ReactMarkdown components={{ code: CodeBlock }}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Related articles (mobile) */}
            {related.length > 0 && (
              <div className="mt-4 lg:hidden">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    Related
                  </span>
                  <span className="h-px flex-1 bg-gray-100" />
                </div>
                <div className="space-y-0">
                  {related.map((r) => (
                    <RelatedCard key={r.slug} post={r} />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Post Date */}
              <div className="pb-4 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Published on
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-mono text-gray-900">
                    {formatDate(post.date)}
                  </span>
                </div>
              </div>

              {/* Reading progress */}
              <div className="pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Progress
                  </span>
                  <span className="text-sm font-mono text-primary font-semibold">
                    {Math.round(scrollProgress)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-200"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>

              {/* Share article to social media */}
              <div className="pb-4 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Share on
                </p>
                <div className="flex items-center gap-3">
                  {/* WhatsApp - open share to WhatsApp/Status */}
                  <button
                    onClick={() => {
                      const url = window.location.origin + `/writing/${post.slug}`;
                      const text = `${post.title} — ${url}`;
                      const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
                      window.open(wa, "_blank", "noopener,noreferrer");
                    }}
                    className="text-sm font-mono text-gray-700 hover:text-primary transition-colors"
                    aria-label="Share to WhatsApp"
                  >
                    WhatsApp
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={() => {
                      const url = window.location.origin + `/writing/${post.slug}`;
                      const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        url,
                      )}`;
                      window.open(li, "_blank", "noopener,noreferrer");
                    }}
                    className="text-sm font-mono text-gray-700 hover:text-primary transition-colors"
                    aria-label="Share to LinkedIn"
                  >
                    LinkedIn
                  </button>

                  {/* Instagram: try Web Share API, fallback to copy link */}
                  <InstagramShare post={post} />
                </div>
              </div>

              {/*<div className="h-px bg-gray-100" />

              <div className="h-px bg-gray-100" />*/}

              {/* Other articles */}
              {related.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Other articles
                  </p>
                  <div className="space-y-1">
                    {related.map((r) => (
                      <RelatedCard key={r.slug} post={r} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

import React from "react";
import { Link } from "react-router-dom";
import { useBlogPosts, BlogPost } from "../hooks/useBlogPosts";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const FeaturedCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Link
    to={`/writing/${post.slug}`}
    className="group block pb-2 mb-2 border-b border-gray-100"
  >
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-mono text-primary tracking-wide uppercase">
        Featured
      </span>
      <span className="h-px w-8 bg-primary/40" />
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm font-mono text-gray-400">
        {formatDate(post.date)}
      </span>
      <span className="text-gray-300">·</span>
      <h2 className="text-lg font-display font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
        {post.title}
      </h2>
    </div>
  </Link>
);

const PostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Link
    to={`/writing/${post.slug}`}
    className="group block py-1 border-b border-gray-100 last:border-0 hover:opacity-80 transition-opacity"
  >
    <div className="flex items-center gap-4">
      <span className="text-sm font-mono text-gray-400">
        {formatDate(post.date)}
      </span>
      <span className="text-gray-300">·</span>
      <h3 className="text-base font-display font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
        {post.title}
      </h3>
    </div>
  </Link>
);

const Blog: React.FC = () => {
  const { posts, loading } = useBlogPosts();

  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4" />
          <p className="text-sm font-mono text-gray-400">loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-6 py-7 md:py-9 max-w-6xl">
          {/* Back to home */}
          <div className="border-b border-gray-100 bg-white">
            <div className="container mx-auto  py-5 max-w-6xl">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-primary transition-colors"
              >
                <svg
                  className="w-4 h-4"
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
                Back to home
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 tracking-tight mb-2">
                Writing
              </h1>
              <p className="text-gray-500 max-w-md text-sm">
                Thoughts on AI, backend systems, and the craft of software
                engineering.
              </p>
            </div>
            <p className="text-sm font-mono text-gray-400 shrink-0">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-6xl py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main feed */}
          <div className="lg:col-span-2">
            {featured && <FeaturedCard post={featured} />}
            <div className="space-y-0">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 tracking-wide uppercase">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set(posts.flatMap((p) => p.tags))).map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;

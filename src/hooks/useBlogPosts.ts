import { useState, useEffect } from "react";
import { BlogPost, loadBlogPosts } from "../services/blogRepository";

export type { BlogPost };

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Hook: all posts
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPosts = () => {
    setLoading(true);
    loadBlogPosts().then((p) => {
      setPosts(p);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return { posts, loading, refreshPosts };
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
    loadBlogPosts().then((posts) => {
      const p = posts.find((item) => item.slug === slug);
      if (!p) setError("Post not found");
      else setPost(p);
      setLoading(false);
    });
  }, [slug]);

  return { post, loading, error };
}


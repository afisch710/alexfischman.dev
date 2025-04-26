// /src/context/BlogProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchBlogs } from "@/lib";

export interface Post {
  title: string;
  date: string;
  description: string;
  slug: string;
  body: string;
  ogImage?: string;
}

interface BlogContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs()
      .then(setPosts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BlogContext.Provider value={{ posts, loading, error }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlog must be used within a BlogProvider");
  return context;
};
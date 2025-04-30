export interface Post {
  title: string;
  date: string;
  description: string;
  slug: string;
  body: string;
  ogImage: string | null;
  tags: string[];
  draft: boolean;
} 
export type Artifact =
  | { url: string; title?: string; description?: string; image?: string }
  | { image: string; title?: string; description?: string };

export interface Experience {
  slug: string;
  title: string;
  company: string;
  team: string;
  tags: string[];
  description: string;
  artifacts: Artifact[];
  priority: number;
  ogImage?: string;
} 
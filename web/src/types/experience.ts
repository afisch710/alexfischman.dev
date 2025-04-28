export interface Experience {
  slug: string;
  title: string;
  company: string;
  team: string;
  tags: string[];
  description: string;
  artifacts: Array<{
    url: string;
    title: string;
    description: string;
    image: string;
  }>;
  priority: number;
  ogImage?: string;
} 
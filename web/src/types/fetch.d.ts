// Declaration file for fetch functions
declare module '../lib/fetchBlogs' {
  import { Post } from '../types/blog';
  export function fetchBlogs(): Promise<Post[]>;
}

declare module '../lib/fetchExperiences' {
  import { Experience } from '../types/experience';
  export function fetchExperiences(): Promise<Experience[]>;
}

// Also declare the modules with the @/ path alias for backward compatibility
declare module '@/lib/fetchBlogs' {
  import { Post } from '@/types/blog';
  export function fetchBlogs(): Promise<Post[]>;
}

declare module '@/lib/fetchExperiences' {
  import { Experience } from '@/types/experience';
  export function fetchExperiences(): Promise<Experience[]>;
} 
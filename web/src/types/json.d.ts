declare module '*.json' {
  const value: any;
  export default value;
}

// Specific declarations for our data files with relative paths
declare module '../data/about.json' {
  const value: {
    title: string;
    description: string;
    ogImage: string;
    content: string[];
    contact: {
      email: string;
      linkedin: string;
      github: string;
    };
  };
  export default value;
}

declare module '../data/posts.json' {
  const value: Array<{
    title: string;
    date: string;
    description: string;
    slug: string;
    body: string;
    ogImage: string | null;
    tags: string[];
    draft: boolean;
  }>;
  export default value;
}

declare module '../data/experience.json' {
  const value: Array<{
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
  }>;
  export default value;
}

declare module '../data/github-profile.json' {
  const value: {
    totalContributions: number;
    monthlyContributions: Record<string, number>;
    workflows: {
      total: number;
      success: number;
      failure: number;
    };
  };
  export default value;
}

// Also declare the modules with the @/ path alias for backward compatibility
declare module '@/data/posts.json' {
  const value: Array<{
    title: string;
    date: string;
    description: string;
    slug: string;
    body: string;
    ogImage: string | null;
    tags: string[];
    draft: boolean;
  }>;
  export default value;
}

declare module '@/data/experience.json' {
  const value: Array<{
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
  }>;
  export default value;
}

declare module '@/data/github-profile.json' {
  const value: {
    totalContributions: number;
    monthlyContributions: Record<string, number>;
    workflows: {
      total: number;
      success: number;
      failure: number;
    };
  };
  export default value;
} 
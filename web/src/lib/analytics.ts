// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined tracking functions
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

export const trackContactClick = () => {
  trackEvent('click', 'engagement', 'contact_button');
};

export const trackProjectClick = (projectName: string) => {
  trackEvent('click', 'engagement', `project_${projectName}`);
};

export const trackBlogRead = (postTitle: string) => {
  trackEvent('read', 'engagement', `blog_${postTitle}`);
};

export const trackExternalLink = (url: string) => {
  trackEvent('click', 'outbound', url);
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll', 'engagement', `scroll_${depth}%`);
}; 
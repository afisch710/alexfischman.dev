/**
 * Calculate estimated reading time for text content
 * Industry standard: 200 words per minute for average adult reading speed
 * 
 * @param text - The text content to analyze (markdown, HTML, or plain text)
 * @returns Reading time in minutes (rounded up, minimum 1 minute)
 */
export function calculateReadingTime(text: string): number {
  const WORDS_PER_MINUTE = 200;
  
  // Remove markdown/HTML tags and special characters for accurate word count
  const plainText = text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[#*_~\[\]()]/g, '') // Remove markdown formatting
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .trim();
  
  // Count words (split by whitespace)
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate reading time in minutes (rounded up, minimum 1)
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  return Math.max(1, readingTime);
}

/**
 * Format reading time as a human-readable string
 * 
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

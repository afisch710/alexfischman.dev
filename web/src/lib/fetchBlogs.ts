import { Post } from '../context/BlogProvider';
// Directly import the JSON data from the src/data folder.
import postsData from '../data/posts.json';

export async function fetchBlogs(): Promise<Post[]> {
    // Sort posts by date descending (assuming date is a parsable string)
    return postsData.sort(
        (a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

// Create a named variable for the default export
const fetchBlogsModule = {
    fetchBlogs
};

// Export the named variable as default
export default fetchBlogsModule;
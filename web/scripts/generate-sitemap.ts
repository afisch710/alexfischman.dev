import fs from 'fs';
import path from 'path';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

function generateSitemap() {
  const baseUrl = 'https://www.alexfischman.dev';
  const today = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/experience`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    }
  ];

  // Read blog posts from content directory
  const blogDir = path.join(process.cwd(), '..', 'content', 'blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    blogFiles.forEach(file => {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const frontMatter = content.split('---')[1];
      const dateMatch = frontMatter.match(/date:\s*(\d{4}-\d{2}-\d{2})/);
      const titleMatch = frontMatter.match(/title:\s*["']([^"']+)["']/);
      
      if (dateMatch && titleMatch) {
        const date = dateMatch[1];
        const title = titleMatch[1];
        const slug = file.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
        
        staticPages.push({
          loc: `${baseUrl}/blog/${slug}/`,
          lastmod: date,
          changefreq: 'yearly',
          priority: 0.7
        });
      }
    });
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to public directory
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  
  console.log(`✅ Sitemap generated with ${staticPages.length} URLs`);
}

generateSitemap(); 
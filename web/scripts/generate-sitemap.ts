// @ts-nocheck
const fs = require('fs');
const path = require('path');

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

  // Read blog posts from generated JSON data
  const postsDataPath = path.join(process.cwd(), 'src', 'data', 'posts.json');
  if (fs.existsSync(postsDataPath)) {
    const postsData = JSON.parse(fs.readFileSync(postsDataPath, 'utf-8'));
    
    postsData.forEach((post: any) => {
      if (!post.draft) {
        const date = new Date(post.date).toISOString().split('T')[0];
        
        staticPages.push({
          loc: `${baseUrl}/blog/${post.slug}/`,
          lastmod: date,
          changefreq: 'yearly',
          priority: 0.7
        });
      }
    });
  }

  // Read experience pages from generated JSON data
  const experienceDataPath = path.join(process.cwd(), 'src', 'data', 'experience.json');
  if (fs.existsSync(experienceDataPath)) {
    const experienceData = JSON.parse(fs.readFileSync(experienceDataPath, 'utf-8'));
    
    experienceData.forEach((exp: any) => {
      staticPages.push({
        loc: `${baseUrl}/experience/${exp.slug}/`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.6
      });
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
// @ts-nocheck
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "..", "content", "blog");
const filenames = fs.readdirSync(postsDirectory);

const posts = filenames
  .map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      title: data.title,
      date: (() => {
        if (typeof data.date === 'string') {
          const hasTz = /[Zz]|[+-]\d{2}:?\d{2}$/.test(data.date);
          return hasTz ? data.date : `${data.date}Z`;
        }
        return data.date;
      })(),
      description: data.description,
      slug: filename.replace(/\.md$/, ""),
      body: content,
      ogImage: data.thumbnail || null,
      tags: data.tags || [],
      draft: data.draft || false,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(
  path.join(process.cwd(), "src", "data", "posts.json"),
  JSON.stringify(posts, null, 2)
);
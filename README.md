# Personal Website & Blog

Welcome to my personal website repository—a showcase of my technical skills and a platform to share technical insights via my blog. This project is built to demonstrate modern web development practices, a sleek design, and a robust deployment pipeline.

---

## Overview

This repository implements a hybrid architecture that leverages both static site generation and client-side rendering. It is designed to:
- **Deliver fast, SEO-friendly pages** by pre-rendering static content (like blog posts) at build time.
- **Provide dynamic interactivity** through client-side React, ensuring a smooth Single Page Application (SPA) experience.
- **Automate deployments** via GitHub Actions, and host the site on AWS S3 and CloudFront for cost-effective, globally distributed content delivery.
- **Manage content directly** through markdown files in the repository, leveraging modern IDE features and developer workflows.

---

## Architecture

### Static Generation & Client-Side Rendering with Next.js

- **Static Generation:**  
  Pages such as blog posts are pre-rendered at build time using Next.js's `getStaticProps` and `getStaticPaths` functions. This generates static HTML that is optimized for SEO and fast load times.

- **Client-Side Rendering (CSR):**  
  Dynamic elements or interactive features are handled on the client side. After the initial load, React hydrates the static pages, enabling rich interactivity and dynamic content fetching where needed.

### Hosting on AWS S3 + CloudFront

- **AWS S3:**  
  The static output from the Next.js build (via `next export`) is deployed to an S3 bucket. This bucket serves as the origin for the website assets.

- **CloudFront:**  
  CloudFront acts as a global CDN that caches and serves the static assets, ensuring fast load times and reduced latency for visitors around the world—all without incurring server costs.

### Deployment Pipeline with GitHub Actions

- **Automated Builds:**  
  GitHub Actions is used to automatically build the Next.js project whenever changes are pushed to the repository, including updates to blog post markdown files.

- **Seamless Deployments:**  
  The built static files are then deployed to the AWS S3 bucket. CloudFront invalidation is triggered to ensure that users always receive the most up-to-date content.

### Content Management through Markdown

- **Direct Markdown Editing:**  
  Blog posts are written and edited directly in markdown files within the repository. This approach leverages modern IDE features like:
  - Real-time markdown preview
  - Syntax highlighting
  - Git integration
  - Spell checking
  - Code snippets with syntax highlighting
  
- **Developer-First Workflow:**  
  Content creation and editing follow standard developer workflows:
  - Create feature branches for new posts
  - Use pull requests for content review
  - Leverage Git for version control and content history
  - Maintain content alongside code in a single repository

---

## Technology Stack

- **Next.js:**  
  Provides a robust framework for building hybrid applications with static generation and client-side rendering.

- **React:**  
  Powers the dynamic, interactive parts of the website once the static pages are loaded.

- **AWS S3 & CloudFront:**  
  Hosts the static site assets cost-effectively and delivers them globally via a Content Delivery Network (CDN).

- **GitHub Actions:**  
  Automates the build and deployment processes, ensuring continuous integration and delivery.

- **Markdown:**  
  Provides a simple, readable format for blog content that can be easily edited in any text editor or IDE.

---

## Blog Inline Images

The blog system supports inline images with styling control:

### Quick Start
```markdown
<!-- Standard markdown (full width) -->
![Description](/blog/image.jpg)

<!-- HTML with custom sizing -->
<img src="/blog/image.jpg" alt="Description" width="400" />
```

### Features
- **Responsive scaling** and click-to-expand modal
- **Custom sizing** via HTML attributes or CSS  
- **Support for all formats** (JPG, PNG, SVG, GIF)
- **Professional styling** with hover effects

### File Organization
Place blog images in: `web/public/blog/`

For complete styling examples and best practices, use either standard markdown for full-width images or HTML `<img>` tags with `width`, `height`, or `style` attributes for custom sizing.

---

import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container } from '@mui/material';
import BlogPost from '../../components/blog/BlogPost';
import { Post } from '../../types/blog';
import postsData from '../../data/posts.json';
import CustomHead from '@/components/common/Head';
import ArticleStructuredData from '@/components/common/ArticleStructuredData';
import BreadcrumbStructuredData from '@/components/common/BreadcrumbStructuredData';

interface BlogPostPageProps {
  post: Post;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <>
      <CustomHead
        title={`${post.title} | Alex Fischman – Founder & Senior Software Engineer`}
        description={post.description}
        ogImage={post.ogImage || '/af_dark.png'}
        ogUrl={`https://www.alexfischman.dev/blog/${post.slug}`}
        ogType="article"
        keywords={`Alex Fischman, blog, ${post.tags?.join(', ')}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://www.alexfischman.dev/" },
          { name: "Blog", url: "https://www.alexfischman.dev/blog" },
          { name: post.title, url: `https://www.alexfischman.dev/blog/${post.slug}` }
        ]}
      />
      <ArticleStructuredData
        headline={post.title}
        description={post.description}
        datePublished={post.date}
        author={{
          name: "Alex Fischman",
          url: "https://www.alexfischman.dev"
        }}
        image={post.ogImage || '/af_dark.png'}
        url={`https://www.alexfischman.dev/blog/${post.slug}`}
        keywords={post.tags || []}
      />
      <Container sx={{ p: 0 }}>
        <BlogPost post={post} />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = postsData;
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const { slug } = params as { slug: string };
  const posts: Post[] = postsData;
  const post = posts.find((p: Post) => p.slug === slug);
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
  };
};
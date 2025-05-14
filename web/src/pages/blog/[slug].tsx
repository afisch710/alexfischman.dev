import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container } from '@mui/material';
import BlogPost from '../../components/blog/BlogPost';
import { Post } from '../../types/blog';
import postsData from '../../data/posts.json';
import CustomHead from '@/components/common/Head';

interface BlogPostPageProps {
  post: Post;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <>
      <CustomHead
        title={`${post.title} | Alex Fischman`}
        description={post.description}
        ogImage={post.ogImage || 'af_dark.png'}
        ogUrl={`https://www.alexfischman.dev/blog/${post.slug}`}
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
import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container } from '@mui/material';
import BlogPost from '../../components/blog/BlogPost';
import { Post } from '../../types/blog';
import postsData from '../../data/posts.json';

interface BlogPostPageProps {
  post: Post;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <>
      <Head>
        <title key="title">{`${post.title} | Alex Fischman`}</title>
        <meta key="description" name="description" content={post.description} />
        <meta key="og:title" property="og:title" content={`${post.title} | Alex Fischman`} />
        <meta key="og:description" property="og:description" content={post.description} />
        <meta key="og:image" property="og:image" content={post.ogImage || '/af_dark.png'} />
      </Head>
      <Container>
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
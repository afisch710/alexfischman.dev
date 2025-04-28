import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container } from '@mui/material';
import ExperiencePage from '@/components/experience/ExperiencePage';
import type { Experience } from '../../types/experience';
import experiencesData from '../../data/experience.json';

interface ExperienceSlugPageProps {
  experience: Experience;
}

export default function ExperienceSlugPage({ experience }: ExperienceSlugPageProps) {
  return (
    <>
      <Head>
        <title key="title">{`${experience.title} | Alex Fischman`}</title>
        <meta key="description" name="description" content={experience.description} />
        <meta key="og:title" property="og:title" content={`${experience.title} | Alex Fischman`} />
        <meta key="og:description" property="og:description" content={experience.description} />
        <meta key="og:image" property="og:image" content={experience.ogImage || '/af_dark.png'} />
      </Head>
      <Container>
        <ExperiencePage experience={experience} />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const experiences: Experience[] = [...experiencesData].sort((a, b) => a.priority - b.priority);
  const paths = experiences.map((exp: Experience) => ({
    params: { slug: exp.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ExperienceSlugPageProps> = async ({ params }) => {
  const { slug } = params as { slug: string };
  const experiences: Experience[] = experiencesData;
  const experience = experiences.find((exp: Experience) => exp.slug === slug);
  if (!experience) {
    return { notFound: true };
  }
  return {
    props: { experience },
  };
};
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container } from '@mui/material';
import ExperiencePage from '@/components/experience/ExperiencePage';
import type { Experience } from '../../types/experience';
import experiencesData from '../../data/experience.json';
import CustomHead from '@/components/common/Head';

interface ExperienceSlugPageProps {
  experience: Experience;
}

export default function ExperienceSlugPage({ experience }: ExperienceSlugPageProps) {
  return (
    <>
      <CustomHead
        title={`${experience.title} | Alex Fischman`}
        description={experience.description}
        ogImage={experience.ogImage || 'af_dark.png'}
        ogUrl={`https://www.alexfischman.dev/experience/${experience.slug}`}
      />
      <Container sx={{ p: 0 }}>
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
// /src/context/ExperienceProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchExperiences } from "@/lib/fetchExperiences";

export interface Artifact {
  url: string;
  title: string;
  description: string;
  image: string;
}

export interface Experience {
  slug: string;
  title: string;
  company: string;
  team: string;
  tags: string[];
  description: string;
  artifacts: Artifact[];
  priority: number;
  ogImage: string;
}

interface ExperienceContextType {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences()
      .then(setExperiences)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ExperienceContext.Provider value={{ experiences, loading, error }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = (): ExperienceContextType => {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience must be used within an ExperienceProvider");
  return context;
};
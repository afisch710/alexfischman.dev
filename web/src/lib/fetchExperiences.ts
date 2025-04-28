import { Experience } from '../context/ExperienceProvider';
// Directly import the JSON data from the src/data folder.
import experiencesData from '../data/experience.json';

export async function fetchExperiences(): Promise<Experience[]> {
  const data = experiencesData as Experience[];
  // sort ascending: lower `priority` values come first
  return [...data].sort((a, b) => a.priority - b.priority);
}

// Create a named variable for the default export
const fetchExperiencesModule = {
  fetchExperiences
};

export default fetchExperiencesModule;
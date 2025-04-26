import { Experience } from '../context/ExperienceProvider';
// Directly import the JSON data from the src/data folder.
import experiencesData from '../data/experience.json';

export async function fetchExperiences(): Promise<Experience[]> {
  // Return the experiences data directly
  return experiencesData as Experience[];
}

// Create a named variable for the default export
const fetchExperiencesModule = {
    fetchExperiences
};

// Export the named variable as default
export default fetchExperiencesModule;
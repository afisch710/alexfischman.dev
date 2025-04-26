// @ts-nocheck
const fs = require("fs");
const path = require("path");
const { getLinkPreview } = require("link-preview-js");

// Helper function to generate a URL-friendly slug from a title.
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function fetchMetadata(url: string) {
  try {
    const data = await getLinkPreview(url);
    return {
      title: data.title || "",
      description: data.description || "",
      image: (data.images && data.images.length > 0) ? data.images[0] : ""
    };
  } catch (e) {
    console.error("Failed to fetch metadata for", url, e);
    return {
      title: "",
      description: "",
      image: ""
    };
  }
}

async function main() {
  // Define the input and output paths.
  // The input experiences file is assumed to be at the project root in the content folder.
  const inputPath = path.join(process.cwd(), "..", "content", "experience.json");
  const outputPath = path.join(process.cwd(), "src", "data", "experience.json");

  // Read the experience JSON file.
  const fileContents = fs.readFileSync(inputPath, "utf8");
  let experiences = JSON.parse(fileContents);

  // Process each experience entry.
  for (const exp of experiences) {
    // Ensure 'artifacts' field exists.
    if (!exp.artifacts) {
      exp.artifacts = [];
    }

    // Ensure each artifact is an object with at least a 'url' property.
    exp.artifacts = exp.artifacts.map(a => typeof a === "string" ? { url: a } : a);

    // Generate slug from title if missing.
    if (!exp.slug) {
      exp.slug = generateSlug(exp.title);
    }

    // Fetch metadata for each artifact URL.
    for (let i = 0; i < exp.artifacts.length; i++) {
      const artifact = exp.artifacts[i];
      if (artifact.url) {
        const meta = await fetchMetadata(artifact.url);
        // Merge the fetched metadata into the artifact object.
        exp.artifacts[i] = {
          ...artifact,
          ...meta
        };
      }
    }
  }

  // Write the updated experiences JSON to the public folder.
  fs.writeFileSync(outputPath, JSON.stringify(experiences, null, 2));
  console.log(`Experience data with artifact metadata generated at ${outputPath}`);
}

main().catch(console.error);
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
    // Check if the URL is a local image path
    if (url.startsWith('/')) {
      return {
        title: "",
        description: "",
        image: url
      };
    }

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

    // Process artifacts
    const processedArtifacts = [];
    
    for (const artifact of exp.artifacts) {
      if (typeof artifact === "string") {
        // If it's a string, it could be a URL or a local image path
        const meta = await fetchMetadata(artifact);
        processedArtifacts.push({
          url: artifact.startsWith('/') ? undefined : artifact,
          ...meta
        });
      } else if (typeof artifact === "object") {
        // If it's already an object, preserve its structure
        if (artifact.image && !artifact.url) {
          // If it has an image but no URL, it's an image-only artifact
          processedArtifacts.push(artifact);
        } else if (artifact.url) {
          // If it has a URL, fetch metadata
          const meta = await fetchMetadata(artifact.url);
          processedArtifacts.push({
            ...artifact,
            ...meta
          });
        }
      }
    }

    exp.artifacts = processedArtifacts;

    // Generate slug from title if missing.
    if (!exp.slug) {
      exp.slug = generateSlug(exp.title);
    }
  }

  // Write the updated experiences JSON to the public folder.
  fs.writeFileSync(outputPath, JSON.stringify(experiences, null, 2));
  console.log(`Experience data with artifact metadata generated at ${outputPath}`);
}

main().catch(console.error);
#!/bin/bash

# This script checks if the required modules exist before running the type check

# Check if the lib directory exists
if [ ! -d "src/lib" ]; then
  echo "Error: src/lib directory does not exist"
  exit 1
fi

# Check if the fetchBlogs.ts file exists
if [ ! -f "src/lib/fetchBlogs.ts" ]; then
  echo "Error: src/lib/fetchBlogs.ts file does not exist"
  exit 1
fi

# Check if the fetchExperiences.ts file exists
if [ ! -f "src/lib/fetchExperiences.ts" ]; then
  echo "Error: src/lib/fetchExperiences.ts file does not exist"
  exit 1
fi

# Check if the data directory exists
if [ ! -d "src/data" ]; then
  echo "Error: src/data directory does not exist"
  exit 1
fi

# Check if the posts.json file exists
if [ ! -f "src/data/posts.json" ]; then
  echo "Error: src/data/posts.json file does not exist"
  exit 1
fi

# Check if the experience.json file exists
if [ ! -f "src/data/experience.json" ]; then
  echo "Error: src/data/experience.json file does not exist"
  exit 1
fi

# Check if the github-profile.json file exists
if [ ! -f "src/data/github-profile.json" ]; then
  echo "Error: src/data/github-profile.json file does not exist"
  exit 1
fi

echo "All required modules exist"
exit 0 
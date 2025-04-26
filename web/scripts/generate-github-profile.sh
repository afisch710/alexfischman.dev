#!/bin/bash

# This script is designed to run on macOS, Linux, or Windows with Git Bash/WSL
# For Windows users without Git Bash or WSL, please refer to the README

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Error: Node.js is not installed. Please install it first:"
  echo "  - macOS: brew install node"
  echo "  - Ubuntu/Debian: sudo apt-get install nodejs npm"
  echo "  - Windows: Download from https://nodejs.org/"
  exit 1
fi

# Check if ts-node is installed
if ! command -v npx &> /dev/null; then
  echo "Error: npx is not installed. Please install it first:"
  echo "  - macOS: brew install node (includes npx)"
  echo "  - Ubuntu/Debian: sudo apt-get install nodejs npm (includes npx)"
  echo "  - Windows: Download from https://nodejs.org/ (includes npx)"
  exit 1
fi

# Get the script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Get the web directory (one level up from the script)
WEB_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Check for environment file in the web directory
if [ -f "$WEB_DIR/.env" ]; then
  echo "Loading environment variables from $WEB_DIR/.env file..."
  export $(grep -v '^#' "$WEB_DIR/.env" | xargs)
fi

# Check if GitHub token is provided
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN not found. Please either:"
  echo "1. Add GITHUB_TOKEN to your .env file in the web directory"
  echo "2. Set it manually: export GITHUB_TOKEN=your_token_here"
  echo ""
  echo "To create a token:"
  echo "1. Go to GitHub Settings > Developer settings > Personal access tokens"
  echo "2. Generate a new token with 'read:user' and 'repo' scopes"
  echo "3. Add it to your .env file in the web directory"
  exit 1
fi

# Set default values if not provided
export GITHUB_USERNAME=${GITHUB_USERNAME:-"afisch710"}
export GITHUB_PROFILE_OUTPUT=${GITHUB_PROFILE_OUTPUT:-"web/public/github-profile.json"}

# Run the TypeScript script
echo "Running GitHub profile generator (TypeScript version)..."
npx ts-node "$SCRIPT_DIR/generate-github-profile.ts"

echo "Profile data updated successfully!" 
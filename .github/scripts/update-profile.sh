#!/bin/bash

# This script is designed to run on macOS, Linux, or Windows with Git Bash/WSL
# For Windows users without Git Bash or WSL, please refer to the README in this directory

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "Error: jq is not installed. Please install it first:"
  echo "  - macOS: brew install jq"
  echo "  - Ubuntu/Debian: sudo apt-get install jq"
  echo "  - Windows (with Chocolatey): choco install jq"
  exit 1
fi

# Check for local environment file
if [ -f ".github/scripts/.env" ]; then
  echo "Loading token from .env file..."
  # Read the token and export it
  export GITHUB_TOKEN=$(grep GITHUB_TOKEN .github/scripts/.env | cut -d '=' -f2)
  echo "GITHUB_TOKEN after setting: $GITHUB_TOKEN"
fi

# Check if GitHub token is provided
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN not found. Please either:"
  echo "1. Copy .github/scripts/.env.example to .github/scripts/.env and add your token"
  echo "2. Set it manually: export GITHUB_TOKEN=your_token_here"
  echo ""
  echo "To create a token:"
  echo "1. Go to GitHub Settings > Developer settings > Personal access tokens"
  echo "2. Generate a new token with 'read:user' and 'repo' scopes"
  echo "3. Copy .env.example to .env and add your token"
  exit 1
fi

# Make the script executable
chmod +x .github/scripts/workflow/update_github_profile.sh

# Run the script
.github/scripts/workflow/update_github_profile.sh --username afisch710 --output profile-data.json

echo "Profile data updated successfully!" 
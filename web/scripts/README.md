# Web Scripts

This directory contains scripts used to generate data for the website.

## Available Scripts

- `generate-posts.ts`: Generates post data from markdown files
- `generate-experience.ts`: Generates experience data from JSON files
- `generate-github-profile.ts`: Generates GitHub profile data including contributions and workflow statistics

## GitHub Profile Generator

The `generate-github-profile.ts` script fetches GitHub profile data including:
- Total contributions
- Monthly contribution breakdown
- Workflow run statistics

### Prerequisites

- Node.js (v16 or higher)
- TypeScript and ts-node (will be installed automatically if needed)
- GitHub Personal Access Token with `read:user` and `repo` scopes

### Running the Script

#### Option 1: Using the Helper Script (Recommended)

1. Make the helper script executable:
   ```bash
   chmod +x web/scripts/generate-github-profile.sh
   ```

2. Add your GitHub token to the `.env` file in the project root:
   ```
   GITHUB_TOKEN=your_github_token_here
   ```

3. Run the helper script:
   ```bash
   web/scripts/generate-github-profile.sh
   ```

#### Option 2: Running the TypeScript Script Directly

1. Install dependencies:
   ```bash
   npm install -g ts-node typescript
   ```

2. Set environment variables:
   ```bash
   # macOS/Linux
   export GITHUB_TOKEN=your_github_token_here
   export GITHUB_USERNAME=your_github_username
   export GITHUB_PROFILE_OUTPUT=web/public/github-profile.json
   
   # Windows (Command Prompt)
   set GITHUB_TOKEN=your_github_token_here
   set GITHUB_USERNAME=your_github_username
   set GITHUB_PROFILE_OUTPUT=web/public/github-profile.json
   ```

3. Run the script:
   ```bash
   npx ts-node web/scripts/generate-github-profile.ts
   ```

### Creating a GitHub Token

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with the following permissions:
   - `read:user`
   - `repo` (for private repositories)
3. Add the token to your `.env` file as described above

### Output

The script generates a JSON file at `web/public/github-profile.json` with the following structure:

```json
{
  "totalContributions": 1234,
  "monthlyContributions": {
    "2023-01": 45,
    "2023-02": 67,
    ...
  },
  "workflows": {
    "total": 100,
    "success": 95,
    "failure": 5
  }
}
```

This data is used by the website to display your GitHub activity and workflow statistics. 
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

Use a **classic** personal access token (the scopes below have no equivalent on
fine-grained tokens, so a fine-grained token would silently return public-only data):

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate a new token with the following scopes:
   - `repo` — read private repositories (used for language and workflow-run stats)
   - `read:user` — **required** so `contributionsCollection` includes your private-repo
     contribution counts. Without it the contribution totals drop to public-only.
3. Add the token to your `.env` file as described above.

> Token must belong to the same account whose stats are generated (`afisch710`),
> otherwise private repos and private contributions are excluded.

### Token expiry and the nightly workflow

The scheduled `Refresh GitHub Profile Data` GitHub Action reads this token from the
`PROFILE_UPDATE_TOKEN` repository secret. **When the token expires the nightly run
fails** (checkout can no longer authenticate). To recover, generate a new classic
token with the scopes above and update the secret:

```bash
gh secret set PROFILE_UPDATE_TOKEN
```

Set a long expiration and a calendar reminder to rotate it before it lapses.

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
# GitHub Scripts

This directory contains scripts used by GitHub Actions workflows.

## Profile Update Script

The `workflow/update_github_profile.sh` script fetches GitHub profile data including:
- Total contributions
- Workflow run statistics

### Prerequisites

- `curl` (usually pre-installed on most systems)
- `jq` (for JSON parsing)

### Installing Prerequisites

#### macOS
```bash
brew install jq
```

#### Ubuntu/Debian
```bash
sudo apt-get install jq
```

#### Windows (with Chocolatey)
```bash
choco install jq
```

### Running the Script

The script requires a GitHub token which should be stored in a `.env` file:

1. Create a `.env` file in the `.github/scripts/` directory:
   ```bash
   # Create the .env file
   touch .github/scripts/.env
   
   # Add your GitHub token to the file
   echo "GITHUB_TOKEN=your_github_token_here" > .github/scripts/.env
   ```

2. Make the helper script executable:
   ```bash
   chmod +x .github/scripts/update-profile.sh
   ```

3. Run the helper script:
   ```bash
   .github/scripts/update-profile.sh
   ```

The helper script will:
- Check if `jq` is installed
- Load your GitHub token from the `.env` file
- Make the main script executable
- Run the main script with the correct parameters

### Creating a GitHub Token

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with the following permissions:
   - `read:user`
   - `repo` (for private repositories)
3. Add the token to your `.env` file as described above

### Running on Windows

If you're using Windows and don't have PowerShell or bash installed, you have a few options:

1. **Use Git Bash**: If you have Git for Windows installed, you can use Git Bash which provides a bash-like environment:
   ```bash
   # In Git Bash
   .github/scripts/update-profile.sh
   ```

2. **Use WSL**: If you have Windows Subsystem for Linux installed, you can run the script in a Linux environment:
   ```bash
   # In WSL
   .github/scripts/update-profile.sh
   ```

### Using GitHub CLI to Access Secrets

If you have the GitHub CLI installed, you can access repository secrets directly:

1. Install GitHub CLI:
   ```bash
   # macOS
   brew install gh

   # Ubuntu/Debian
   sudo apt install gh

   # Windows (with scoop)
   scoop install gh
   ```

2. Login to GitHub CLI:
   ```bash
   gh auth login
   ```

3. Get the secret value and add it to your `.env` file:
   ```bash
   # Get the token
   TOKEN=$(gh secret get PROFILE_UPDATE_TOKEN -R alexfischman/alexfischman.dev)
   
   # Add it to your .env file
   echo "GITHUB_TOKEN=$TOKEN" > .github/scripts/.env
   
   # Run the script
   .github/scripts/update-profile.sh
   ``` 
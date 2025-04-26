// @ts-nocheck
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Define the GitHub profile data structure
type GitHubProfileData = {
  totalContributions: number;
  monthlyContributions: Record<string, number>;
  workflows: {
    total: number;
    success: number;
    failure: number;
  };
};

async function generateGitHubProfile(username: string, outputFile: string): Promise<void> {
  console.log(`Generating GitHub profile data for ${username}...`);
  
  // Check if GitHub token is available
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    throw new Error('GITHUB_TOKEN environment variable not set. Please add it to your .env file.');
  }

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Get contributions data using GraphQL
  console.log('Fetching contributions data...');
  const graphqlQuery = `
    {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const graphqlResponse = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `token ${githubToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: graphqlQuery }),
  });

  const graphqlData = await graphqlResponse.json();
  console.log('GraphQL Response:', JSON.stringify(graphqlData, null, 2));

  // Extract total contributions
  const totalContributions = graphqlData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

  // Process contributions by month
  const monthlyContributions: Record<string, number> = {};
  
  const contributionDays = graphqlData.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    .flatMap((week: any) => week.contributionDays)
    .filter((day: any) => day !== null) || [];

  for (const day of contributionDays) {
    const date = new Date(day.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyContributions[monthKey]) {
      monthlyContributions[monthKey] = 0;
    }
    
    monthlyContributions[monthKey] += day.contributionCount;
  }

  // 2. List public repositories
  console.log('Fetching repository list...');
  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?type=public&per_page=100`, {
    headers: {
      'Authorization': `token ${githubToken}`,
    },
  });

  const reposData = await reposResponse.json();
  const repos = reposData.map((repo: any) => repo.name);

  // 3. Count workflow runs
  let totalRuns = 0;
  let successRuns = 0;
  let failureRuns = 0;

  for (const repo of repos) {
    console.log(`Checking workflows for ${repo}...`);
    
    // Get total runs
    const runsResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/actions/runs?per_page=1`, {
      headers: {
        'Authorization': `token ${githubToken}`,
      },
    });
    
    const runsData = await runsResponse.json();
    totalRuns += runsData.total_count || 0;
    
    // Get successful runs
    const successResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/actions/runs?status=success&per_page=1`, {
      headers: {
        'Authorization': `token ${githubToken}`,
      },
    });
    
    const successData = await successResponse.json();
    successRuns += successData.total_count || 0;
    
    // Get failed runs
    const failureResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/actions/runs?status=failure&per_page=1`, {
      headers: {
        'Authorization': `token ${githubToken}`,
      },
    });
    
    const failureData = await failureResponse.json();
    failureRuns += failureData.total_count || 0;
  }

  // 4. Write JSON output to both locations
  console.log(`Writing data to ${outputFile}...`);
  const profileData: GitHubProfileData = {
    totalContributions,
    monthlyContributions,
    workflows: {
      total: totalRuns,
      success: successRuns,
      failure: failureRuns,
    },
  };

  // Write to the specified output file (which will be in src/data)
  fs.writeFileSync(outputFile, JSON.stringify(profileData, null, 2));
  console.log(`✅ Wrote profile data to ${outputFile}`);
}

// Main execution
if (require.main === module) {
  const username = process.env.GITHUB_USERNAME || 'afisch710';
  const outputFile = process.env.GITHUB_PROFILE_OUTPUT || path.resolve(__dirname, '../src/data/github-profile.json');
  
  generateGitHubProfile(username, outputFile)
    .then(() => console.log('Profile data updated successfully!'))
    .catch(error => {
      console.error('Error generating GitHub profile:', error);
      process.exit(1);
    });
}

module.exports = generateGitHubProfile; 
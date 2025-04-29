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
  commitContributions: number;
  issueContributions: number;
  prContributions: number;
  prReviewContributions: number;
  followersCount: number;
  followingCount: number;
  starredCount: number;
  reposContributedToCount: number;
  languageCount: Record<string, number>;
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
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          commitContributionsByRepository(maxRepositories: 100) {
            repository { nameWithOwner }
          }
          issueContributionsByRepository(maxRepositories: 100) {
            repository { nameWithOwner }
          }
          pullRequestContributionsByRepository(maxRepositories: 100) {
            repository { nameWithOwner }
          }
          pullRequestReviewContributionsByRepository(maxRepositories: 100) {
            repository { nameWithOwner }
          }
        }
        followers {
          totalCount
        }
        following {
          totalCount
        }
        starredRepositories {
          totalCount
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
  const commitContributions = graphqlData.data.user.contributionsCollection.totalCommitContributions || 0;
  const issueContributions = graphqlData.data.user.contributionsCollection.totalIssueContributions || 0;
  const prContributions = graphqlData.data.user.contributionsCollection.totalPullRequestContributions || 0;
  const prReviewContributions = graphqlData.data.user.contributionsCollection.totalPullRequestReviewContributions || 0;

  // Derive repos contributed to by unique repository across all contribution types
  const coll = graphqlData.data.user.contributionsCollection;
  const repoNames = new Set<string>();
  coll.commitContributionsByRepository.forEach((edge: any) =>
    repoNames.add(edge.repository.nameWithOwner)
  );
  coll.issueContributionsByRepository.forEach((edge: any) =>
    repoNames.add(edge.repository.nameWithOwner)
  );
  coll.pullRequestContributionsByRepository.forEach((edge: any) =>
    repoNames.add(edge.repository.nameWithOwner)
  );
  coll.pullRequestReviewContributionsByRepository.forEach((edge: any) =>
    repoNames.add(edge.repository.nameWithOwner)
  );
  const reposContributedToCount = repoNames.size;

  const followersCount = graphqlData.data.user.followers.totalCount;
  const followingCount = graphqlData.data.user.following.totalCount;
  const starredCount = graphqlData.data.user.starredRepositories.totalCount;

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

  // 2. List all repositories (including private) for authenticated user
  console.log('Fetching repository list...');
  const reposResponse = await fetch(
    `https://api.github.com/user/repos?visibility=all&per_page=100`,
    {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  );

  const reposData = await reposResponse.json();
  // Compute language distribution across all repos (including private)
  const languageCount: Record<string, number> = {};
  for (const repo of reposData) {
    // Fetch each repo's detailed language usage
    const langRes = await fetch(repo.languages_url, {
      headers: { 'Authorization': `token ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' },
    });
    const langs = await langRes.json(); // e.g. { "JavaScript": 12345, "Python": 6789, ... }
    for (const [lang, bytes] of Object.entries(langs)) {
      languageCount[lang] = (languageCount[lang] || 0) + (bytes as number);
    }
  }
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
    commitContributions,
    issueContributions,
    prContributions,
    prReviewContributions,
    followersCount,
    followingCount,
    starredCount,
    reposContributedToCount,
    languageCount,
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
#!/bin/bash

# Parse command line arguments
USERNAME=""
OUTPUT_FILE=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --username)
      USERNAME="$2"
      shift 2
      ;;
    --output)
      OUTPUT_FILE="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Check if required arguments are provided
if [ -z "$USERNAME" ] || [ -z "$OUTPUT_FILE" ]; then
  echo "Usage: $0 --username <username> --output <output-file>"
  exit 1
fi

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN environment variable not set."
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# 1. Get contributions data using GraphQL
echo "Fetching contributions data..."
GRAPHQL_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"query\": \"{ user(login: \\\"$USERNAME\\\") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } } } } }\"}" \
  https://api.github.com/graphql)

echo "GraphQL Response: $GRAPHQL_RESPONSE"

# Extract total contributions and process monthly data
TOTAL_CONTRIBUTIONS=$(echo "$GRAPHQL_RESPONSE" | jq -r '.data.user.contributionsCollection.contributionCalendar.totalContributions // 0')

# Process contributions by month
echo "$GRAPHQL_RESPONSE" | jq -r '.data.user.contributionsCollection.contributionCalendar.weeks[].contributionDays[] | "\(.date) \(.contributionCount)"' | \
while read -r line; do
  DATE=$(echo "$line" | cut -d' ' -f1)
  COUNT=$(echo "$line" | cut -d' ' -f2)
  # Convert date to YYYY-MM format
  MONTH=$(date -j -f "%Y-%m-%d" "$DATE" "+%Y-%m" 2>/dev/null || date -d "$DATE" "+%Y-%m")
  if [ ! -z "$MONTH" ]; then
    echo "$MONTH $COUNT"
  fi
done | awk '{contributions[$1] += $2} END {for (month in contributions) print month, contributions[month]}' | \
sort > /tmp/monthly_contributions.txt

# 2. List public repositories
echo "Fetching repository list..."
REPOS_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/users/$USERNAME/repos?type=public&per_page=100")

REPOS=$(echo "$REPOS_RESPONSE" | jq -r '.[] | select(.name != null) | .name')

# 3. Count workflow runs
TOTAL_RUNS=0
SUCCESS_RUNS=0
FAILURE_RUNS=0

for REPO in $REPOS; do
  echo "Checking workflows for $REPO..."
  
  # Get total runs
  RUNS_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$USERNAME/$REPO/actions/runs?per_page=1")
  
  TOTAL=$(echo "$RUNS_RESPONSE" | jq -r '.total_count // 0')
  TOTAL_RUNS=$((TOTAL_RUNS + TOTAL))
  
  # Get successful runs
  SUCCESS_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$USERNAME/$REPO/actions/runs?status=success&per_page=1")
  SUCCESS=$(echo "$SUCCESS_RESPONSE" | jq -r '.total_count // 0')
  SUCCESS_RUNS=$((SUCCESS_RUNS + SUCCESS))
  
  # Get failed runs
  FAILURE_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$USERNAME/$REPO/actions/runs?status=failure&per_page=1")
  FAILURE=$(echo "$FAILURE_RESPONSE" | jq -r '.total_count // 0')
  FAILURE_RUNS=$((FAILURE_RUNS + FAILURE))
done

# 4. Write JSON output
echo "Writing data to $OUTPUT_FILE..."
echo "{" > "$OUTPUT_FILE"
echo "  \"totalContributions\": $TOTAL_CONTRIBUTIONS," >> "$OUTPUT_FILE"
echo "  \"monthlyContributions\": {" >> "$OUTPUT_FILE"

# Add monthly contributions
FIRST=true
while read -r line; do
  MONTH=$(echo "$line" | cut -d' ' -f1)
  COUNT=$(echo "$line" | cut -d' ' -f2)
  if [ "$FIRST" = true ]; then
    FIRST=false
  else
    echo "," >> "$OUTPUT_FILE"
  fi
  echo -n "    \"$MONTH\": $COUNT" >> "$OUTPUT_FILE"
done < /tmp/monthly_contributions.txt
echo "" >> "$OUTPUT_FILE"

echo "  }," >> "$OUTPUT_FILE"
echo "  \"workflows\": {" >> "$OUTPUT_FILE"
echo "    \"total\": $TOTAL_RUNS," >> "$OUTPUT_FILE"
echo "    \"success\": $SUCCESS_RUNS," >> "$OUTPUT_FILE"
echo "    \"failure\": $FAILURE_RUNS" >> "$OUTPUT_FILE"
echo "  }" >> "$OUTPUT_FILE"
echo "}" >> "$OUTPUT_FILE"

rm /tmp/monthly_contributions.txt
echo "✅ Wrote profile data to $OUTPUT_FILE" 
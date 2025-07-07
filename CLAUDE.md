# SmarterWeather Development Guide

## Agent Development Workflow

For detailed instructions on the developer workflow for agents in this repository, please refer to [AGENT.md](./AGENT.md).

### Quick Reference

**Required workflow for all agents:**
1. Review issue: `gh issue view <issue_number>`
2. Create topic branch: `gci <issue_number>`
3. Make code changes
4. Stage changes: `git add <files>`
5. Commit changes: `git commit -m "<message>"`
6. Create PR: `gpa` (default) or `gp` (if explicitly permitted)
7. Provide PR URL to @afisch710

**Important Notes:**
- All branches must use the `gci` command for issue-specific topic branches
- Default to `gpa` for PR creation unless explicitly told to use `gp`
- Target the `development` branch for all pull requests
- Follow the complete workflow in AGENT.md unless explicitly instructed otherwise

## Repository Information

- **Main Branch**: `development`
- **GitHub CLI**: Available for issue management
- **Custom Scripts**: Located in `.github/scripts/shell/`
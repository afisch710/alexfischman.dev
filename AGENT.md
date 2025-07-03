# Agent Instructions

Any and all background agents acting on behalf of me (afisch710) must adhere to the following developer workflow, with the associated shell commands.

## GitHub CLI Commands

The below commands are available to you as an agent for fetching GitHub issue information.

### Reading Issues by Number
- `gh issue view <issue_number>` - View detailed information about a specific issue
- `gh issue view <issue_number> --comments` - View issue with all comments
- `gh issue view <issue_number> --json` - View issue data in JSON format
- `gh issue list` - List all issues in the repository
- `gh issue list --state open` - List only open issues
- `gh issue list --state closed` - List only closed issues
- `gh issue list --assignee @me` - List issues assigned to you

### Examples
```bash
# View issue #123
gh issue view 123

# View issue #123 with comments
gh issue view 123 --comments

# View issue #123 as JSON for parsing
gh issue view 123 --json title,body,state,labels,assignees
```

### GitHub CLI Best Practices for Agents in Cursor

**Important**: Some `gh` commands may have formatting/pager issues in cursor terminal environments. Use these reliable alternatives:

#### ✅ Recommended Approaches:

1. **Finding Issues**: Use `gh issue list | grep <number>` instead of `gh issue view <number>`
   ```bash
   # Instead of: gh issue view 123
   # Use: 
   gh issue list | grep 123
   ```

2. **Bypass Pager Issues**: Add `| cat` to commands that hang or show formatting errors
   ```bash
   # If gh issue view 123 fails, try:
   gh issue view 123 | cat
   
   # If gh pr view 123 --json fails, try:
   gh pr view 123 --json | cat
   ```

3. **Use JSON Output**: For structured data, prefer JSON format
   ```bash
   gh issue view 123 --json title,body,state,labels | cat
   ```

4. **Issue List Commands**: These work reliably without modification
   ```bash
   gh issue list
   gh issue list --state open
   gh issue list | head -20
   ```

#### ❌ Commands That May Fail:
- `gh issue view <number>` (without `| cat`)
- `gh pr view <number> --json` (without `| cat`)

These commands may show "head: |: No such file or directory" errors due to pager conflicts.

## Repo Shell Commands

The below commands are available to you as an agent for creating git branches and creating GitHub pull requests.

### Create Issue Topic Branch

- `gci <issue_number>` - Creates a topic branch with repo naming standards for the specified issue. Note this command is defined at `.github/scripts/shell/functions/gci.sh`and you may use setup.sh (`.github/scripts/shell/setup.sh`) to configure the function

Any and all branches created by an agent must leverage the gci command for a specific issue number. No branch creations are permitted that do not use this mechanism.

### Create Pull Requests For Issue-Resolving change

The below commands are available to you as an agent for creating GitHub pull requests to resolve an issue.

- `gp` - Creates a pull request for a committed change on an issue topic branch and opens a browser to the pull request with auto merge enabled. Defined here `.github/scripts/shell/functions/gp.sh`. **NOTE** agents must be given explicit permission by @afisch710 to use this command.
- `gpa` - Creates a pull request for a committed change on an issue topic branch. Defined here `.github/scripts/shell/functions/gpa.sh`. **All agents must default to this command for creating pull requests unless explicitly instructed otherwise.**

## Agent Development Workflow

The below workflow is to be used by all agents when making a code change to resolve an issue. This must be followed unless @afisch710 explicitly instructs otherwise.

1. Review the issue provided by @afisch710
```
gh issue view <issue_number>
```
2. Ask any clarifying questions to @afisch710 before beginning development on a resolving change
3. Create a topic branch to work on the issue
```
gci <issue_number>
```
4. Perform code changes to resolve the issue.
5. Stage the changes you have made
```
git add <file_1>
git add <file_2>
git add <file_n>
```
6. Commit the staged changes you have made. Use your best judgement when creating a descriptive commit message for the changes you have made.
```
git commit -m <descriptive_message>
```
7. Create a pull request for the change that targets the `development` branch (default repo branch and main equivalent)
**DEFAULT PR CREATION MECHANISM**
```
gpa
```
Alternate PR creation mechanism granted @afisch710 has explicitly instructed use of this
```
gp
```
8. Provide @afisch710 with a URL to the newly created pull request

These instructions are required and not to be adapted by any agent unless @afisch710 has explicilty instructed otherwise.
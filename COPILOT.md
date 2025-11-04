# Task Master - GitHub Copilot Integration Guide

> **Optimized for:** Solo developers using VS Code + GitHub Copilot in enterprise environments

## Quick Start

```bash
# Install
npm install -g task-master-ai

# Initialize in your project
cd your-project
task-master init

# Set OpenAI API key
export OPENAI_API_KEY="your-key-here"

# Create a PRD and parse it
task-master parse-prd .taskmaster/docs/prd.txt

# Start working
task-master list
task-master show 1
```

## What is Task Master?

Task Master is a CLI tool that helps you:
- **Break down** complex projects using AI-powered PRD parsing
- **Track** multi-level tasks (1, 1.1, 1.1.1) in simple JSON files
- **Analyze** task complexity and suggest breakdowns
- **Integrate** with git for task-based commits and branches

## Core Workflow

### 1. Project Setup

```bash
# Initialize Task Master in your project
task-master init

# This creates:
# .taskmaster/
# ├── tasks/tasks.json    # Task database
# ├── config.json         # AI model configuration
# └── docs/              # PRD documents
```

### 2. Write a PRD (Product Requirements Document)

Create `.taskmaster/docs/prd.txt`:

```text
# User Authentication System

## Overview
Build a JWT-based authentication system for the web application.

## Requirements

### User Registration
- Email and password validation
- Password hashing with bcrypt
- Email verification flow
- Store user data in PostgreSQL

### User Login
- Email/password authentication
- JWT token generation
- Refresh token mechanism
- Remember me functionality

### Password Reset
- Email-based password reset
- Secure reset token generation
- Token expiration (24 hours)
- Password strength validation

## Technical Details
- Use Express.js for API endpoints
- JWT for authentication tokens
- bcrypt for password hashing
- nodemailer for emails
- PostgreSQL database
```

### 3. Parse PRD with AI

```bash
# Parse PRD into structured tasks
task-master parse-prd .taskmaster/docs/prd.txt

# Output:
# ✓ Generated 3 main tasks
# ✓ Saved to .taskmaster/tasks/tasks.json
```

### 4. Analyze and Expand Tasks

```bash
# Analyze task complexity
task-master analyze-complexity

# View complexity report
task-master complexity-report

# Expand complex tasks into subtasks
task-master expand 1  # Expands task 1
task-master expand 2  # Expands task 2

# Or expand all at once
task-master expand --all
```

### 5. Work on Tasks

```bash
# List all tasks
task-master list

# Show task details
task-master show 1.1

# Update task status
task-master status 1.1 in-progress

# Mark complete
task-master status 1.1 done
```

## Task Structure

Tasks support multi-level hierarchy:

```
1. User Registration           # Main task
├── 1.1 Email validation       # Subtask
│   ├── 1.1.1 Format check     # Sub-subtask
│   └── 1.1.2 Domain verify    # Sub-subtask
├── 1.2 Password hashing       # Subtask
└── 1.3 Database storage       # Subtask
```

## Essential Commands

### Project Management
```bash
task-master init                  # Initialize project
task-master parse-prd <file>     # Parse PRD into tasks
```

### Task Operations
```bash
task-master list                  # List all tasks
task-master show <id>            # Show task details
task-master add "description"    # Add new task
task-master update <id> "text"   # Update task
task-master delete <id>          # Delete task
task-master status <id> <status> # Set status (pending/in-progress/done/blocked/cancelled)
```

### Complexity Analysis
```bash
task-master analyze-complexity   # Analyze all tasks
task-master expand <id>          # Break task into subtasks
task-master expand --all         # Expand all eligible tasks
task-master complexity-report    # View analysis report
```

### Dependencies
```bash
task-master add-dependency <id> --depends-on <other-id>
task-master validate-dependencies
```

### Git Integration
```bash
task-master commit <id> "message"   # Commit with task reference
task-master branch <id>             # Create task-based branch
```

## Configuration

### OpenAI API Key

**Environment variable (recommended):**
```bash
export OPENAI_API_KEY="sk-..."
```

**Or in `.env` file:**
```bash
OPENAI_API_KEY=sk-...
```

### Model Selection

```bash
# View current model
task-master models

# Set model
task-master models --set-main gpt-4o
task-master models --set-main gpt-4-turbo

# Available models:
# - gpt-4o (recommended, fast and capable)
# - gpt-4-turbo
# - gpt-4
# - gpt-3.5-turbo (budget option)
```

## Working with GitHub Copilot

### 1. Use Task Master for Planning

Let Task Master handle project planning and task breakdown:

```bash
# 1. Write your PRD
# 2. Parse it with AI
task-master parse-prd .taskmaster/docs/prd.txt

# 3. Get your next task
task-master show 1.1

# 4. Let Copilot help implement it
```

### 2. Reference Tasks in Code

Add task IDs to comments so Copilot understands context:

```typescript
// Task 1.1: Email validation
export function validateEmail(email: string): boolean {
  // Task 1.1.1: Format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Task 1.1.2: Domain verification
  const domain = email.split('@')[1];
  return isValidDomain(domain);
}
```

### 3. Copilot-Friendly File Structure

Keep task files visible to Copilot:

```
your-project/
├── .taskmaster/
│   ├── tasks/
│   │   ├── tasks.json       # Copilot can read this
│   │   ├── task-1.md        # Auto-generated
│   │   └── task-2.md        # Auto-generated
│   └── docs/
│       └── prd.txt          # Your requirements
├── src/
│   └── ...your code...
└── README.md
```

### 4. Task-Driven Development Workflow

```bash
# 1. Check next task
task-master show 1.2

# Output:
# Task 1.2: Password Hashing
# Status: pending
# Description: Implement bcrypt password hashing
# Details: Use bcrypt with salt rounds of 10...

# 2. Open relevant file in VS Code
code src/auth/password.ts

# 3. Add task comment at top
# Task 1.2: Password Hashing

# 4. Start typing - Copilot will suggest based on:
#    - Task description from .taskmaster/
#    - Your code context
#    - Common patterns

# 5. Mark complete when done
task-master status 1.2 done
```

## Example PRD Formats

### Simple Feature

```text
# Dark Mode Toggle

Add a dark mode toggle to the application settings.

Requirements:
- Toggle switch in settings page
- Store preference in localStorage
- Apply dark theme to all components
- Smooth transition animation
```

### API Endpoint

```text
# User Profile API

Create REST API endpoint for user profile management.

Endpoints:
- GET /api/profile - Get current user profile
- PUT /api/profile - Update user profile
- DELETE /api/profile - Delete user account

Fields:
- name (string, required)
- email (string, required, unique)
- bio (string, optional)
- avatar_url (string, optional)

Validation:
- Email must be valid format
- Name max 100 characters
- Bio max 500 characters
```

### Bug Fix

```text
# Fix Authentication Bug

Users are being logged out randomly after 5 minutes.

Root Cause:
- JWT token expiry is set to 5 minutes
- Refresh token logic is not working

Fix:
- Update token expiry to 24 hours
- Implement refresh token rotation
- Add token validation middleware
- Test with various scenarios
```

## Task Status Values

```bash
pending      # Ready to work on
in-progress  # Currently working
done         # Completed
blocked      # Waiting on external factors
deferred     # Postponed
cancelled    # No longer needed
```

## Tips for Success

### 1. **Write Detailed PRDs**
The better your PRD, the better the AI-generated tasks:
```text
❌ "Add login"
✓ "Implement JWT-based login with email/password, including validation, error handling, and refresh tokens"
```

### 2. **Use Complexity Analysis**
Let AI suggest how to break down tasks:
```bash
task-master analyze-complexity
# Review suggestions
task-master expand --all
```

### 3. **Keep Tasks Small**
Aim for tasks you can complete in 1-4 hours:
```text
✓ Good: "Implement email validation with regex"
❌ Too big: "Build entire authentication system"
```

### 4. **Reference Tasks in Commits**
```bash
git commit -m "feat: implement email validation (task 1.1.1)"
# Or use task-master
task-master commit 1.1.1 "implement email validation"
```

### 5. **Update Task Details as You Learn**
```bash
task-master update 1.2 "Add notes: using bcrypt v5.1, salt rounds 10, async hashing for performance"
```

## File Locations

```
.taskmaster/
├── tasks/
│   ├── tasks.json              # Main task database (JSON)
│   ├── task-1.md               # Auto-generated markdown
│   └── task-2.md
├── docs/
│   └── prd.txt                 # Your PRD documents
├── reports/
│   └── complexity-report.json  # Complexity analysis
└── config.json                 # Model configuration
```

## Common Patterns

### Pattern 1: New Feature Development

```bash
# 1. Write PRD
echo "# Feature Description..." > .taskmaster/docs/feature-x.txt

# 2. Parse
task-master parse-prd .taskmaster/docs/feature-x.txt

# 3. Analyze and expand
task-master analyze-complexity
task-master expand --all

# 4. Work through tasks
task-master list
task-master show 1
# ... implement ...
task-master status 1 done
```

### Pattern 2: Bug Fix

```bash
# 1. Add bug as task
task-master add "Fix: Users logged out after 5 minutes - JWT expiry issue"

# 2. Add details
task-master update 1 "Root cause: Token expiry 5min, refresh not working. Fix: Update expiry to 24h, implement refresh rotation"

# 3. Work on it
task-master status 1 in-progress
# ... fix ...
task-master status 1 done
```

### Pattern 3: Refactoring

```bash
# 1. Create refactoring PRD
cat > .taskmaster/docs/refactor.txt << 'EOF'
# Authentication Refactor

Split monolithic auth.ts into separate modules:
- validation.ts (email, password validation)
- hashing.ts (bcrypt operations)
- tokens.ts (JWT generation/validation)
- middleware.ts (auth middleware)
EOF

# 2. Parse and expand
task-master parse-prd .taskmaster/docs/refactor.txt
task-master expand --all

# 3. Work through systematically
task-master list --status pending
```

## Troubleshooting

### "No OpenAI API key found"
```bash
export OPENAI_API_KEY="sk-..."
# Or add to .env file
```

### "Task not found"
```bash
# Check task exists
task-master list

# Use correct ID format (1, 1.1, 1.1.1)
task-master show 1.1
```

### "Cannot parse PRD"
- Ensure PRD has clear structure
- Use headings (# ##) for sections
- Write specific requirements
- Check file path is correct

### "Tasks not expanding"
```bash
# Ensure complexity analysis ran
task-master analyze-complexity

# Force expansion
task-master expand 1 --force

# Check complexity report for recommendations
task-master complexity-report
```

## Integration with VS Code

### Recommended Extensions

While Task Master works standalone, these enhance the experience:

- **GitHub Copilot** - AI code completion
- **Markdown All in One** - View task markdown files
- **Task Master Snippets** - Add task references quickly
- **GitLens** - See task IDs in git history

### Workspace Settings

Add to `.vscode/settings.json`:

```json
{
  "files.associations": {
    ".taskmaster/tasks/*.md": "markdown"
  },
  "files.watcherExclude": {
    ".taskmaster/reports/**": true
  }
}
```

### Custom Snippets

Add to `.vscode/snippets/task-reference.code-snippets`:

```json
{
  "Task Reference": {
    "prefix": "task",
    "body": [
      "// Task ${1:id}: ${2:description}"
    ],
    "description": "Add task reference comment"
  }
}
```

## Advanced Usage

### Multi-PRD Projects

```bash
# Feature 1
task-master parse-prd .taskmaster/docs/auth.txt

# Feature 2
task-master parse-prd .taskmaster/docs/api.txt

# All tasks combined in tasks.json
task-master list
```

### Task Dependencies

```bash
# Task 2 depends on task 1
task-master add-dependency 2 --depends-on 1

# Task 1.2 depends on 1.1
task-master add-dependency 1.2 --depends-on 1.1

# Validate dependency graph
task-master validate-dependencies
```

### Custom Task Addition

```bash
# Add without AI
task-master add "Implement caching layer"

# Add with priority
task-master add "Fix critical bug" --priority high

# Add with dependencies
task-master add "Deploy to prod" --depends-on 1,2,3
```

## Keyboard-Driven Workflow

```bash
# Setup aliases in ~/.bashrc or ~/.zshrc
alias tm="task-master"
alias tml="task-master list"
alias tms="task-master show"
alias tmd="task-master status $1 done"

# Usage
tm list
tms 1.1
tmd 1.1  # mark done
```

## FAQ

**Q: Do I need Claude Code or Cursor?**
A: No! This is a CLI-only tool. It works great with VS Code + GitHub Copilot.

**Q: Can Copilot read my tasks?**
A: Yes! Tasks are stored in `.taskmaster/tasks/` as JSON and markdown files that Copilot can read as context.

**Q: What AI model should I use?**
A: `gpt-4o` is recommended - fast and capable. `gpt-3.5-turbo` works for budget-conscious use.

**Q: How do tasks help with Copilot?**
A: When you reference task IDs in comments, Copilot uses the task descriptions as context for better suggestions.

**Q: Can I use this in an enterprise environment?**
A: Yes! It's CLI-only, requires only OpenAI API access, and stores everything locally in `.taskmaster/`.

**Q: Does this require internet?**
A: Only for AI features (PRD parsing, complexity analysis, task expansion). Task management works offline.

**Q: How is this different from GitHub Issues?**
A: Task Master is local, AI-powered, and optimized for solo development with multi-level task hierarchy.

---

**Ready to boost your productivity with AI-assisted task management?**

```bash
npm install -g task-master-ai
cd your-project
task-master init
```

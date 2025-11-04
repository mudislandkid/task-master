# Task Master AI - CLI Edition

> **AI-Powered Task Management for Solo Developers**
> Optimized for VS Code + GitHub Copilot

[![npm version](https://badge.fury.io/js/task-master-ai.svg)](https://www.npmjs.com/package/task-master-ai)
[![License](https://img.shields.io/badge/license-MIT%20with%20Commons%20Clause-blue.svg)](LICENSE)

---

## What is Task Master?

Task Master is a command-line tool that helps you break down complex projects into manageable tasks using AI. Perfect for solo developers who want structured task management without the overhead of team collaboration tools.

### Key Features

- ✅ **AI-Powered PRD Parsing** - Convert project requirements into structured tasks
- ✅ **Multi-Level Tasks** - Support for tasks, subtasks, and sub-subtasks (1, 1.1, 1.1.1)
- ✅ **Complexity Analysis** - AI suggests how to break down complex tasks
- ✅ **Git Integration** - Task-based commits and branches
- ✅ **GitHub Copilot Friendly** - Tasks stored as readable files for AI context
- ✅ **CLI-Only** - No GUI, no server, just simple commands
- ✅ **Local Storage** - All data in `.taskmaster/` directory

---

## Quick Start

```bash
# Install globally
npm install -g task-master-ai

# Initialize in your project
cd your-project
task-master init

# Set your OpenAI API key
export OPENAI_API_KEY="sk-..."

# Create a PRD document
cat > .taskmaster/docs/prd.txt << 'EOF'
# Authentication System

Build JWT-based authentication with:
- User registration (email + password)
- Login with JWT tokens
- Password reset flow
- Email verification
EOF

# Parse PRD into tasks
task-master parse-prd .taskmaster/docs/prd.txt

# Analyze complexity and expand tasks
task-master analyze-complexity
task-master expand --all

# Start working
task-master list
task-master show 1
task-master status 1 in-progress
```

---

## Installation

### Prerequisites

- **Node.js** 18 or higher
- **OpenAI API Key** (for AI features)

### Install

```bash
npm install -g task-master-ai
```

### Setup

```bash
# Add to ~/.bashrc, ~/.zshrc, or equivalent
export OPENAI_API_KEY="sk-your-key-here"

# Or use a .env file in your project
echo "OPENAI_API_KEY=sk-your-key-here" > .env
```

---

## Core Concepts

### Tasks

Tasks are organized in a multi-level hierarchy:

```
1. Build Authentication System          # Main task
├── 1.1 User Registration               # Subtask
│   ├── 1.1.1 Email validation          # Sub-subtask
│   ├── 1.1.2 Password hashing          # Sub-subtask
│   └── 1.1.3 Database storage          # Sub-subtask
├── 1.2 User Login                      # Subtask
└── 1.3 Password Reset                  # Subtask
```

### Task Status

- `pending` - Ready to work on
- `in-progress` - Currently working
- `done` - Completed
- `blocked` - Waiting on dependencies
- `deferred` - Postponed
- `cancelled` - No longer needed

### PRD (Product Requirements Document)

Write your project requirements in plain text. The AI parses it into structured tasks.

**Example:**

```text
# Feature: Dark Mode

Add dark mode support to the application.

Requirements:
- Toggle switch in settings
- Save preference to localStorage
- Apply theme to all components
- Smooth transition animation
```

---

## Essential Commands

### Project Setup

```bash
task-master init                          # Initialize Task Master
task-master parse-prd <file>             # Parse PRD into tasks
```

### Task Management

```bash
task-master list                          # List all tasks
task-master show <id>                    # Show task details
task-master add "description"            # Add new task
task-master update <id> "changes"        # Update task
task-master delete <id>                  # Delete task
task-master status <id> <status>         # Set status
```

### Complexity Analysis

```bash
task-master analyze-complexity           # Analyze all tasks
task-master expand <id>                  # Expand task into subtasks
task-master expand --all                 # Expand all eligible tasks
task-master complexity-report            # View analysis report
```

### Dependencies

```bash
task-master add-dependency <id> --depends-on <other-id>
task-master validate-dependencies
```

### Git Integration

```bash
task-master commit <id> "message"        # Commit with task ref
task-master branch <id>                  # Create task branch
```

### Configuration

```bash
task-master models                       # View current model
task-master models --set-main gpt-4o    # Set model
```

---

## GitHub Copilot Integration

Task Master works seamlessly with GitHub Copilot by storing tasks in readable formats.

### How It Works

1. **Tasks are visible files** - Stored in `.taskmaster/tasks/` as JSON and markdown
2. **Copilot reads context** - When you reference task IDs, Copilot understands the context
3. **Better suggestions** - Task descriptions guide Copilot's code generation

### Best Practices

#### 1. Reference Tasks in Code

```typescript
// Task 1.1.1: Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

#### 2. Use Task-Driven Development

```bash
# 1. Get next task
task-master show 1.2

# 2. Create file with task comment
# Task 1.2: Password Hashing

# 3. Let Copilot help implement

# 4. Mark complete
task-master status 1.2 done
```

#### 3. Keep Task Details Updated

```bash
task-master update 1.2 "Using bcrypt v5.1, salt rounds 10, async for performance"
```

---

## Workflow Examples

### New Feature Development

```bash
# 1. Write PRD
echo "# Feature description..." > .taskmaster/docs/feature.txt

# 2. Parse with AI
task-master parse-prd .taskmaster/docs/feature.txt

# 3. Analyze and expand
task-master analyze-complexity
task-master expand --all

# 4. Work through tasks
task-master list
task-master show 1
# ... implement ...
task-master status 1 done
```

### Bug Fix

```bash
# 1. Add bug as task
task-master add "Fix: Login fails with special characters in password"

# 2. Add investigation notes
task-master update 1 "Root cause: password not properly escaped. Fix: use parameterized queries"

# 3. Track progress
task-master status 1 in-progress
# ... fix ...
task-master status 1 done
```

### Refactoring

```bash
# 1. Create refactoring PRD
cat > .taskmaster/docs/refactor.txt << 'EOF'
# Auth Module Refactor

Split auth.ts into:
- validation.ts (email/password validation)
- hashing.ts (bcrypt operations)
- tokens.ts (JWT handling)
EOF

# 2. Parse and expand
task-master parse-prd .taskmaster/docs/refactor.txt
task-master expand --all

# 3. Work systematically
task-master list
```

---

## File Structure

```
your-project/
├── .taskmaster/
│   ├── tasks/
│   │   ├── tasks.json           # Task database (JSON)
│   │   ├── task-1.md           # Auto-generated markdown
│   │   └── task-2.md
│   ├── docs/
│   │   └── prd.txt             # Your PRD documents
│   ├── reports/
│   │   └── complexity-report.json
│   └── config.json             # Model configuration
├── src/
│   └── ...your code...
├── .env                        # API keys (optional)
└── package.json
```

---

## Configuration

### Models

Task Master supports various OpenAI models:

```bash
# Recommended for most use cases
task-master models --set-main gpt-4o

# Budget-friendly option
task-master models --set-main gpt-3.5-turbo

# Maximum capability
task-master models --set-main gpt-4-turbo
```

### Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-...

# Optional
TM_LOG_LEVEL=info           # Logging level
TM_CONFIG_PATH=.taskmaster  # Custom config path
```

---

## Advanced Usage

### Task Dependencies

```bash
# Task 2 depends on Task 1
task-master add-dependency 2 --depends-on 1

# Validate dependency graph
task-master validate-dependencies
```

### Custom Task Properties

```bash
# Add with priority
task-master add "Critical bug fix" --priority high

# Add with multiple dependencies
task-master add "Deploy" --depends-on 1,2,3
```

### Multiple PRDs

```bash
# Parse multiple PRDs
task-master parse-prd .taskmaster/docs/auth.txt
task-master parse-prd .taskmaster/docs/api.txt

# All tasks combined in tasks.json
task-master list
```

---

## Troubleshooting

### No OpenAI API key found

```bash
export OPENAI_API_KEY="sk-..."
# Or add to .env file
```

### Task not found

```bash
# List all tasks
task-master list

# Use correct ID format
task-master show 1.1  # Not "1-1" or "1_1"
```

### Cannot parse PRD

- Use clear structure with headings (`#`, `##`)
- Write specific requirements
- Check file path is correct

### Tasks not expanding

```bash
# Run complexity analysis first
task-master analyze-complexity

# Force expansion
task-master expand 1 --force
```

---

## vs. Other Tools

| Feature | Task Master | GitHub Issues | Jira | Trello |
|---------|------------|---------------|------|--------|
| **AI-Powered** | ✅ | ❌ | ❌ | ❌ |
| **Local Storage** | ✅ | ❌ | ❌ | ❌ |
| **Multi-Level Tasks** | ✅ | Limited | ✅ | ❌ |
| **CLI-First** | ✅ | ❌ | ❌ | ❌ |
| **Copilot Friendly** | ✅ | ❌ | ❌ | ❌ |
| **Solo Developer** | ✅ | ❌ | ❌ | ✅ |
| **Free** | ✅ | ✅ | ❌ | Limited |

---

## Documentation

- **[COPILOT.md](./COPILOT.md)** - Complete Copilot integration guide
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

---

## FAQ

**Q: Do I need Claude Code or Cursor AI?**
A: No! This is CLI-only and works with any editor, especially VS Code + Copilot.

**Q: Does this work offline?**
A: Task management works offline. AI features (PRD parsing, complexity analysis) require internet.

**Q: How much does it cost?**
A: Task Master is free. You only pay for OpenAI API usage (typically $0.01-0.10 per PRD parsing).

**Q: Can I use this for team projects?**
A: This version is optimized for solo developers. For teams, check out the full version at [task-master.dev](https://task-master.dev).

**Q: Where is my data stored?**
A: Everything is stored locally in `.taskmaster/` directory. No cloud, no database, no tracking.

**Q: Can I export tasks?**
A: Tasks are stored as JSON and markdown files - easy to export, backup, or version control.

---

## Examples

See **[COPILOT.md](./COPILOT.md)** for comprehensive examples including:

- PRD templates
- Task-driven development workflow
- Copilot integration patterns
- Git workflow integration
- Keyboard-driven workflows

---

## Support

- 📖 **Documentation**: See [COPILOT.md](./COPILOT.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/eyaltoledano/claude-task-master/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/eyaltoledano/claude-task-master/discussions)

---

## License

MIT with Commons Clause - See [LICENSE](./LICENSE) for details.

---

## Credits

Created by [@eyaltoledano](https://x.com/eyaltoledano) & [@RalphEcom](https://x.com/RalphEcom)

---

**Ready to supercharge your development workflow?**

```bash
npm install -g task-master-ai
task-master init
```

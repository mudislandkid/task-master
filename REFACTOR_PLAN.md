# Task Master Slim-Down Refactoring Plan

## Goal
Create a lightweight, CLI-only version for solo developers using VS Code + GitHub Copilot in enterprise environments.

## Requirements Summary
- ✅ CLI interface only
- ✅ Core task management (add, list, update, complete)
- ✅ PRD parsing (AI-powered task generation)
- ✅ Complexity analysis
- ✅ Multi-level subtasks (1.1.1 depth)
- ✅ OpenAI/ChatGPT integration only
- ✅ Solo developer workflow
- ✅ Works without MCP
- ❌ No VS Code extension
- ❌ No MCP server
- ❌ No multiple AI providers

---

## Components to REMOVE

### Apps to Delete
1. **apps/mcp/** - MCP server (not needed without Claude Code/Cursor)
2. **apps/extension/** - VS Code Kanban extension
3. **apps/docs/** - Can simplify to README only

### Packages to Delete
1. **packages/tm-bridge/** - Already marked for deletion
2. **packages/claude-code-plugin/** - Claude-specific
3. **packages/grok-provider/** - Alternative AI provider
4. **packages/tsconfig/** - Can inline configs

### @tm/core Modules to Remove/Simplify
1. **workflow/** module - Complex orchestration not needed for basic task mgmt
2. **execution/** module - Advanced execution handlers
3. **auth/** module - No team features needed
4. **integration/** module - External integrations

### AI Providers to Remove (keep OpenAI only)
- Anthropic (Claude)
- Google (Gemini)
- Mistral
- Perplexity
- OpenRouter
- xAI (Grok)
- Azure OpenAI
- Ollama

---

## Components to KEEP

### Apps
- ✅ **apps/cli/** - Primary interface
  - Keep all commands related to task management, PRD parsing, complexity
  - Remove workflow/execution commands
  - Simplify to ~2,000 lines (from 4,867)

### Packages
- ✅ **packages/tm-core/** - Business logic
  - Keep: tasks, config, git, storage, reports, dependencies, ai (simplified)
  - Remove: workflow, execution, auth, integration
  - Simplify from 15,240 to ~8,000 lines

### Core Features to Maintain
1. **Task Management**
   - CRUD operations (add, list, update, delete)
   - Multi-level subtasks (1, 1.1, 1.1.1)
   - Status tracking (pending, in-progress, done, blocked, cancelled)
   - Dependencies

2. **PRD Parsing**
   - AI-powered task generation from PRD documents
   - Intelligent task breakdown
   - OpenAI integration only

3. **Complexity Analysis**
   - Analyze task complexity
   - Generate complexity reports
   - Recommend subtask breakdown

4. **Git Integration**
   - Task-based commits
   - Branch management
   - PR creation

5. **Configuration**
   - OpenAI API key management
   - Model selection (gpt-4, gpt-4-turbo, gpt-4o, etc.)
   - Project settings

---

## Simplified Architecture

```
┌─────────────────────────────┐
│     CLI Interface           │
│  (apps/cli)                 │
│  - Commands: init, list,    │
│    add, show, parse-prd,    │
│    analyze-complexity       │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│     @tm/core                │
│  (packages/tm-core)         │
│                             │
│  ┌─────────────────────┐   │
│  │ Tasks Domain        │   │
│  │ - CRUD operations   │   │
│  │ - PRD parsing       │   │
│  │ - Complexity calc   │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ AI Module           │   │
│  │ - OpenAI only       │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Storage             │   │
│  │ - JSON files        │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Git Integration     │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Config              │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
             │
             ▼
┌─────────────────────────────┐
│   File System               │
│  .taskmaster/               │
│  ├── tasks/tasks.json       │
│  ├── config.json            │
│  └── docs/prd.txt           │
└─────────────────────────────┘
```

---

## Essential CLI Commands to Keep

### Project Setup
```bash
task-master init                                    # Initialize
task-master parse-prd .taskmaster/docs/prd.txt     # Parse PRD
task-master config set openai-key <key>            # Set API key
```

### Task Management
```bash
task-master list                                   # List all tasks
task-master show <id>                             # Show task details
task-master add "description"                     # Add task
task-master update <id> "changes"                 # Update task
task-master status <id> done                      # Set status
task-master delete <id>                           # Delete task
```

### Advanced Features
```bash
task-master analyze-complexity                     # Analyze complexity
task-master expand <id>                           # Break into subtasks
task-master add-dependency <id> --depends-on <id> # Add dependency
task-master complexity-report                      # View report
```

### Git Integration
```bash
task-master commit <id> "message"                 # Commit with task ref
task-master branch <id>                           # Create task branch
```

---

## GitHub Copilot Integration Strategy

Since Copilot can't use MCP, we'll use:

1. **Rich README.md** - Comprehensive examples for Copilot context
2. **Inline Comments** - JSDoc comments with examples
3. **COPILOT.md** - Copilot-specific instructions file
4. **Example Files** - Sample PRDs, workflows in `.taskmaster/examples/`

### COPILOT.md Structure
```markdown
# Task Master - Copilot Guide

## Quick Reference
[Common commands with examples]

## Project Workflow
[Step-by-step workflow for solo dev]

## PRD Format
[How to write PRDs that parse well]

## Code Patterns
[Common patterns when working with tasks]

## Integration Examples
[How to reference tasks in commits, code comments, etc.]
```

---

## File Structure After Refactoring

```
task-master/
├── apps/
│   └── cli/                    # CLI interface (simplified)
│       ├── src/
│       │   ├── commands/       # Core commands only
│       │   ├── utils/
│       │   └── index.ts
│       └── package.json
│
├── packages/
│   ├── tm-core/               # Core logic (simplified)
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── tasks/     # Task management
│   │   │   │   ├── ai/        # OpenAI only
│   │   │   │   ├── config/    # Configuration
│   │   │   │   ├── git/       # Git integration
│   │   │   │   ├── storage/   # File system
│   │   │   │   └── reports/   # Complexity reports
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── build-config/          # Build tools (keep)
│
├── .taskmaster/
│   ├── tasks/
│   │   └── tasks.json
│   ├── config.json
│   ├── docs/
│   │   └── prd.txt
│   └── examples/              # NEW: Example files for Copilot
│       ├── example-prd.txt
│       └── workflow.md
│
├── README.md                  # Enhanced for Copilot
├── COPILOT.md                 # NEW: Copilot-specific guide
├── package.json               # Simplified
└── turbo.json                 # Simplified
```

---

## Dependencies to Remove

### From package.json root:
- MCP-related dependencies
- VS Code extension dependencies
- Unused AI provider SDKs (keep only OpenAI)
- Database dependencies (Supabase, etc.)

### Keep:
- OpenAI SDK
- CLI utilities (commander, inquirer, ora, chalk)
- File system (fs-extra, steno)
- Git (simple-git)
- Validation (zod)
- Build tools (turbo, typescript, biome)

---

## Migration Steps

### Phase 1: Remove Apps
1. Delete apps/mcp/
2. Delete apps/extension/
3. Delete apps/docs/ (replace with enhanced README)

### Phase 2: Remove Packages
1. Delete packages/tm-bridge/
2. Delete packages/claude-code-plugin/
3. Delete packages/grok-provider/
4. Delete packages/tsconfig/ (inline configs)

### Phase 3: Simplify @tm/core
1. Delete src/modules/workflow/
2. Delete src/modules/execution/
3. Delete src/modules/auth/
4. Delete src/modules/integration/
5. Simplify src/modules/ai/ (OpenAI only)

### Phase 4: Simplify CLI
1. Remove workflow commands
2. Remove execution commands
3. Simplify to core commands only
4. Update help text

### Phase 5: Update Configuration
1. Simplify turbo.json (fewer apps)
2. Update root package.json
3. Remove unused dependencies
4. Update build scripts

### Phase 6: Create Copilot Documentation
1. Create COPILOT.md
2. Enhance README.md with examples
3. Add .taskmaster/examples/
4. Add inline JSDoc comments

### Phase 7: Testing
1. Test all core commands
2. Test PRD parsing
3. Test complexity analysis
4. Test git integration
5. Verify OpenAI integration

---

## Expected Results

### Size Reduction
- **Before**: ~30,812 lines of code
- **After**: ~10,000 lines of code
- **Reduction**: ~67%

### Complexity Reduction
- **Before**: 8 AI providers, 3 interfaces, 14 core modules
- **After**: 1 AI provider, 1 interface, 6 core modules
- **Reduction**: ~70%

### Dependencies
- **Before**: ~80+ dependencies
- **After**: ~30 dependencies
- **Reduction**: ~63%

### Maintenance
- Easier to understand
- Faster to modify
- Fewer breaking changes
- Better for solo developers

---

## Risk Mitigation

1. **Create backup branch**: `backup/pre-slim-down`
2. **Incremental commits**: One phase at a time
3. **Test after each phase**: Ensure CLI still works
4. **Keep test files**: Maintain test coverage
5. **Document changes**: Clear commit messages

---

## Timeline

- **Phase 1-2** (Remove apps/packages): 1 hour
- **Phase 3** (Simplify core): 2-3 hours
- **Phase 4** (Simplify CLI): 1 hour
- **Phase 5** (Configuration): 30 mins
- **Phase 6** (Documentation): 1-2 hours
- **Phase 7** (Testing): 1-2 hours

**Total**: 7-10 hours

---

## Success Criteria

✅ CLI works with all essential commands
✅ PRD parsing generates tasks correctly
✅ Complexity analysis runs successfully
✅ Multi-level subtasks work (1.1.1 depth)
✅ OpenAI integration functional
✅ Git commands work
✅ Documentation is Copilot-friendly
✅ Codebase is < 12,000 lines
✅ All tests pass
✅ README has clear examples

---

## Next Steps

1. **Review this plan** - Does this match your vision?
2. **Approve to proceed** - Ready to start Phase 1?
3. **Backup current state** - Create safety branch
4. **Begin refactoring** - Execute phases 1-7

---

**Ready to proceed?** I can start with Phase 1 (removing apps) immediately.

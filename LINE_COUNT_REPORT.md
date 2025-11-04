# Task Master - Line Count Report

**Date:** November 4, 2025
**Branch:** `claude/refactor-slim-down-011CUnewVc93MKQbh6z9vPGT`

---

## Summary

| Category | Lines | Percentage |
|----------|-------|------------|
| **Source Code** | 22,729 | 74.6% |
| **Tests** | 7,724 | 25.4% |
| **Total** | 30,453 | 100% |

### Comparison to Original

| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| **Source Lines** | ~30,812 | 22,729 | ~26% |
| **Total (with tests)** | ~45,000+ | 30,453 | ~32% |
| **Files** | 500+ | ~240 | ~52% |

> **Note:** The "before" estimate of 30,812 lines was source only. Including tests, the original was likely 45,000+ lines. We're now at 30,453 total (source + tests).

---

## By Package/App

| Component | Source Lines | Test Lines | Total |
|-----------|--------------|------------|-------|
| **apps/cli** | 8,665 | ~158 | 8,823 |
| **packages/tm-core** | 13,697 | 2,702 | 16,399 |
| **packages/build-config** | 367 | 0 | 367 |
| **Total** | 22,729 | ~7,724 | 30,453 |

---

## packages/tm-core Breakdown

### By Module (Source Only)

| Module | Lines | Purpose |
|--------|-------|---------|
| **storage** | 2,798 | File system persistence, API storage |
| **tasks** | 2,735 | Task CRUD, PRD parsing, validation |
| **git** | 1,721 | Git integration, commit messages |
| **config** | 1,252 | Configuration management |
| **ai** | 886 | AI provider interface (OpenAI) |
| **reports** | 261 | Complexity analysis reports |
| **common** | 3,746 | Shared utilities, types, interfaces |
| **ui** | 8 | CLI UI helpers (minimal) |
| **dependencies** | 8 | Task dependencies (minimal) |
| **commands** | 8 | Command utilities (minimal) |
| **Subtotal** | 13,423 | |
| **Core files** | 274 | (index.ts, tm-core.ts, etc.) |
| **Total tm-core** | 13,697 | |

### Top 20 Largest tm-core Files (Source Only)

| File | Lines | Purpose |
|------|-------|---------|
| `storage/adapters/api-storage.ts` | 970 | API-based storage adapter |
| `git/adapters/git-adapter.ts` | 780 | Git operations wrapper |
| `storage/adapters/file-storage/file-storage.ts` | 700 | File system storage |
| `tasks/services/task-service.ts` | 690 | Core task operations |
| `common/interfaces/configuration.interface.ts` | 588 | Config type definitions |
| `common/types/database.types.ts` | 491 | Database type definitions |
| `ai/providers/base-provider.ts` | 440 | Base AI provider class |
| `ai/interfaces/ai-provider.interface.ts` | 423 | AI provider interface |
| `common/utils/git-utils.ts` | 421 | Git utility functions |
| `tasks/services/preflight-checker.service.ts` | 395 | Task validation checks |
| `tasks/services/task-loader.service.ts` | 384 | Task loading logic |
| `common/logger/logger.ts` | 354 | Logging system |
| `common/errors/task-master-error.ts` | 332 | Error handling |
| `common/interfaces/storage.interface.ts` | 322 | Storage interfaces |
| `tasks/services/task-execution-service.ts` | 308 | Task execution logic |
| `config/managers/config-manager.ts` | 280 | Config manager |
| `tasks/repositories/supabase/supabase-task-repository.ts` | 275 | Supabase repository |
| `tasks/entities/task.entity.ts` | 275 | Task entity model |
| `storage/services/storage-factory.ts` | 270 | Storage factory |
| `common/types/index.ts` | 262 | Type exports |

---

## apps/cli Breakdown

### Top 20 Largest CLI Files (Source Only)

| File | Lines | Purpose |
|------|-------|---------|
| `commands/context.command.ts` | 766 | Context management command |
| `commands/auth.command.ts` | 631 | Authentication command |
| `ui/components/dashboard.component.ts` | 568 | Dashboard UI |
| `commands/start.command.ts` | 485 | Start workflow command |
| `commands/list.command.ts` | 474 | List tasks command |
| `utils/ui.ts` | 419 | UI utilities |
| `utils/auto-update.ts` | 409 | Auto-update functionality |
| `commands/export.command.ts` | 362 | Export command |
| `ui/components/task-detail.component.ts` | 351 | Task detail UI |
| `commands/show.command.ts` | 341 | Show task command |
| `commands/models/setup.ts` | 304 | Model setup wizard |
| `commands/set-status.command.ts` | 303 | Set task status |
| `commands/models/custom-providers.ts` | 282 | Custom provider config |
| `command-registry.ts` | 270 | Command registry |
| `commands/autopilot/shared.ts` | 262 | Autopilot shared logic |
| `commands/next.command.ts` | 245 | Next task command |
| `commands/models/prompts.ts` | 217 | Model selection prompts |
| `commands/autopilot/complete.command.ts` | 172 | Autopilot complete |
| `commands/autopilot/start.command.ts` | 165 | Autopilot start |
| `commands/models/fetchers.ts` | 165 | Model data fetchers |

### CLI Commands Still Present (May Need Cleanup)

The following CLI commands still exist and may reference removed features:

- `commands/auth.command.ts` (631 lines) - Auth removed in Phase 3
- `commands/context.command.ts` (766 lines) - May have workflow refs
- `commands/start.command.ts` (485 lines) - Likely workflow-related
- `commands/export.command.ts` (362 lines) - Integration removed
- `commands/autopilot/*.ts` (1,234 lines total) - Workflow/execution removed

**Recommendation:** These could be candidates for Phase 6 (CLI cleanup) to further reduce code.

---

## Complete File List by Module

### packages/tm-core/src/modules/

#### ai/ (886 lines)
- `providers/base-provider.ts` - 440 lines
- `interfaces/ai-provider.interface.ts` - 423 lines
- `providers/index.ts` - 6 lines
- `index.ts` - 17 lines

#### commands/ (8 lines)
- `index.ts` - 8 lines

#### config/ (1,252 lines, 1,698 test lines)
- `managers/config-manager.ts` - 280 lines
- `services/config-persistence.service.ts` - 188 lines
- `services/environment-config-provider.service.ts` - 169 lines
- `services/runtime-state-manager.service.ts` - 164 lines
- `services/config-loader.service.ts` - 153 lines
- `services/config-merger.service.ts` - 118 lines
- `config-domain.ts` - 116 lines
- `services/index.ts` - 25 lines
- `managers/index.ts` - 11 lines
- `index.ts` - 11 lines
- `config.ts` - 9 lines
- `types.ts` - 8 lines
- *Tests:* 1,698 lines

#### dependencies/ (8 lines)
- `index.ts` - 8 lines

#### git/ (1,721 lines, 67 test lines)
- `adapters/git-adapter.ts` - 780 lines
- `git-domain.ts` - 247 lines
- `services/commit-message-generator.ts` - 205 lines
- `services/scope-detector.ts` - 204 lines
- `services/template-engine.ts` - 203 lines
- `adapters/index.ts` - 35 lines
- `services/index.ts` - 18 lines
- `index.ts` - 12 lines
- `types.ts` - 10 lines
- *Tests:* 67 lines

#### reports/ (261 lines)
- `managers/complexity-report-manager.ts` - 185 lines
- `managers/index.ts` - 11 lines
- `types.ts` - 54 lines
- `index.ts` - 11 lines

#### storage/ (2,798 lines)
- `adapters/api-storage.ts` - 970 lines
- `adapters/file-storage/file-storage.ts` - 700 lines
- `adapters/file-storage/format-handler.ts` - 248 lines
- `adapters/activity-logger.ts` - 182 lines
- `adapters/file-storage/file-operations.ts` - 171 lines
- `utils/api-client.ts` - 146 lines
- `services/storage-factory.ts` - 270 lines
- `adapters/file-storage/index.ts` - 21 lines
- `adapters/index.ts` - 28 lines
- `services/index.ts` - 11 lines
- `utils/index.ts` - 11 lines
- `index.ts` - 40 lines

#### tasks/ (2,735 lines)
- `services/task-service.ts` - 690 lines
- `services/preflight-checker.service.ts` - 395 lines
- `services/task-loader.service.ts` - 384 lines
- `services/task-execution-service.ts` - 308 lines
- `entities/task.entity.ts` - 275 lines
- `repositories/supabase/supabase-task-repository.ts` - 275 lines
- `tasks-domain.ts` - 259 lines
- `services/index.ts` - 39 lines
- `entities/index.ts` - 37 lines
- `repositories/index.ts` - 23 lines
- `repositories/file/index.ts` - 20 lines
- `index.ts` - 15 lines
- `types.ts` - 15 lines

#### ui/ (8 lines)
- `index.ts` - 8 lines

### packages/tm-core/src/common/ (3,746 lines)

#### interfaces/
- `configuration.interface.ts` - 588 lines
- `storage.interface.ts` - 322 lines
- `index.ts` - 127 lines

#### types/
- `database.types.ts` - 491 lines
- `index.ts` - 262 lines
- `repository-types.ts` - 83 lines

#### utils/
- `git-utils.ts` - 421 lines
- `id-generator.ts` - 142 lines
- `run-id-generator.ts` - 129 lines
- `path-normalizer.ts` - 76 lines
- `index.ts` - 30 lines

#### logger/
- `logger.ts` - 354 lines
- `index.ts` - 49 lines

#### errors/
- `task-master-error.ts` - 332 lines
- `index.ts` - 31 lines

#### mappers/
- `TaskMapper.ts` - 216 lines
- `index.ts` - 11 lines

#### constants/
- `index.ts` - 82 lines

### packages/tm-core/src/ (Core files - 274 lines)

- `tm-core.ts` - 190 lines
- `index.ts` - 84 lines

---

## apps/cli/src/ (8,665 lines)

### commands/ (6,584 lines)

#### Top-level commands
- `context.command.ts` - 766 lines
- `auth.command.ts` - 631 lines
- `start.command.ts` - 485 lines
- `list.command.ts` - 474 lines
- `export.command.ts` - 362 lines
- `show.command.ts` - 341 lines
- `set-status.command.ts` - 303 lines
- `next.command.ts` - 245 lines

#### autopilot/
- `shared.ts` - 262 lines
- `complete.command.ts` - 172 lines
- `start.command.ts` - 165 lines
- `next.command.ts` - 164 lines
- `commit.command.ts` - 143 lines
- `abort.command.ts` - 119 lines
- `status.command.ts` - 114 lines
- `resume.command.ts` - 111 lines
- `index.ts` - 82 lines

#### models/
- `setup.ts` - 304 lines
- `custom-providers.ts` - 282 lines
- `prompts.ts` - 217 lines
- `fetchers.ts` - 165 lines
- `types.ts` - 148 lines
- `index.ts` - 9 lines

### ui/ (960 lines)

#### components/
- `dashboard.component.ts` - 568 lines
- `task-detail.component.ts` - 351 lines
- `next-task.component.ts` - 141 lines
- `header.component.ts` - 81 lines
- `suggested-steps.component.ts` - 32 lines
- `index.ts` - 9 lines

- `index.ts` - 9 lines

### utils/ (620 lines)
- `ui.ts` - 419 lines
- `auto-update.ts` - 409 lines
- `error-handler.ts` - 60 lines
- `display-helpers.ts` - 43 lines

### lib/ (162 lines)
- `model-management.ts` - 162 lines

### Other (339 lines)
- `command-registry.ts` - 270 lines
- `index.ts` - 47 lines

---

## Observations & Recommendations

### Current State
- **Source code:** 22,729 lines (down from ~30,812)
- **With tests:** 30,453 lines total
- **Main reduction:** Removed apps, packages, and core modules

### Potential Further Reductions

If you want to slim down even more, consider Phase 6:

#### 1. Remove Unused CLI Commands (~2,500 lines)
- `commands/auth.command.ts` (631 lines) - Auth removed
- `commands/context.command.ts` (766 lines) - May have workflow refs
- `commands/start.command.ts` (485 lines) - Workflow command
- `commands/export.command.ts` (362 lines) - Integration removed
- `commands/autopilot/*.ts` (1,234 lines) - Workflow/execution removed

**Potential savings:** ~2,500 lines

#### 2. Simplify Storage (~1,000 lines)
- `storage/adapters/api-storage.ts` (970 lines) - Remove if only using file storage
- Keep only `file-storage` for local-first workflow

**Potential savings:** ~1,000 lines

#### 3. Remove Supabase References (~300 lines)
- `tasks/repositories/supabase/` (275 lines) - Team feature
- `common/types/database.types.ts` (491 lines) - If Supabase-specific

**Potential savings:** ~300 lines

#### 4. Simplify Config (~500 lines)
- Some config services may be overkill for CLI-only
- Runtime state manager may not be needed

**Potential savings:** ~500 lines

### Total Potential Reduction
With Phase 6, could reduce by another **~4,300 lines**, bringing total to:
- **Source:** ~18,400 lines (40% reduction from original)
- **With tests:** ~26,100 lines

---

## Conclusion

Current codebase is **22,729 lines** of source code (30,453 with tests).

This represents a **~26% reduction** in source code from the original ~30,812 lines, with further reduction possible by removing workflow/auth-related CLI commands and simplifying storage/config modules.

The code is now focused on:
- ✅ CLI interface
- ✅ Core task management
- ✅ PRD parsing (OpenAI only)
- ✅ Complexity analysis
- ✅ Git integration
- ✅ Local file storage

Perfect for solo developers using VS Code + GitHub Copilot!

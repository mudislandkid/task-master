/**
 * @fileoverview Main entry point for @tm/core
 * Provides unified access to all Task Master functionality through TmCore
 */

import type { TasksDomain } from './modules/tasks/tasks-domain.js';

// ========== Primary API ==========

/**
 * Create a new TmCore instance - The ONLY way to use tm-core
 *
 * @example
 * ```typescript
 * import { createTmCore } from '@tm/core';
 *
 * const tmcore = await createTmCore({
 *   projectPath: process.cwd()
 * });
 *
 * // Access domains
 * const tasks = await tmcore.tasks.list();
 * await tmcore.git.commit('feat: add feature');
 * const config = tmcore.config.get('models.main');
 * ```
 */
export { createTmCore, TmCore, type TmCoreOptions } from './tm-core.js';

// ========== Type Exports ==========

// Common types that consumers need
export type * from './common/types/index.js';

// Common interfaces
export type * from './common/interfaces/index.js';

// Constants
export * from './common/constants/index.js';

// Errors
export * from './common/errors/index.js';

// ========== Domain-Specific Type Exports ==========

// Task types
export type {
	TaskListResult,
	GetTaskListOptions
} from './modules/tasks/services/task-service.js';

export type {
	StartTaskOptions,
	StartTaskResult,
	ConflictCheckResult
} from './modules/tasks/services/task-execution-service.js';

export type {
	PreflightResult,
	CheckResult
} from './modules/tasks/services/preflight-checker.service.js';

// Task domain result types
export type TaskWithSubtaskResult = Awaited<ReturnType<TasksDomain['get']>>;

// Git types
export type { CommitMessageOptions } from './modules/git/services/commit-message-generator.js';

// Reports types
export type {
	ComplexityReport,
	ComplexityReportMetadata,
	ComplexityAnalysis,
	TaskComplexityData
} from './modules/reports/types.js';

// ========== Advanced API (for CLI) ==========

// Git - Advanced
export { GitAdapter } from './modules/git/adapters/git-adapter.js';
export { CommitMessageGenerator } from './modules/git/services/commit-message-generator.js';

// Tasks - Advanced
export { PreflightChecker } from './modules/tasks/services/preflight-checker.service.js';
export { TaskLoaderService } from './modules/tasks/services/task-loader.service.js';

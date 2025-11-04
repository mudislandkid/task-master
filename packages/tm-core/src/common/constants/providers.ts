/**
 * Provider validation constants
 * Simplified to OpenAI only for CLI usage
 */

// Only OpenAI provider is supported
export const VALIDATED_PROVIDERS = ['openai'] as const;

export type ValidatedProvider = (typeof VALIDATED_PROVIDERS)[number];

// No custom providers needed for CLI-only usage
export const CUSTOM_PROVIDERS = {} as const;

export type CustomProvider = never;

// Custom providers array (for backward compatibility)
export const CUSTOM_PROVIDERS_ARRAY: readonly never[] = [];

// All known providers (only OpenAI)
export const ALL_PROVIDERS = [...VALIDATED_PROVIDERS] as const;

export type Provider = ValidatedProvider;

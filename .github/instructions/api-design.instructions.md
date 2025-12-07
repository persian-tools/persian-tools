# API Design Instructions for persian-tools

## Function Design Principles

### Naming Conventions
- Use clear, descriptive names
- Follow camelCase for functions
- Use verbs for actions: `convertDigits`, `validateCardNumber`
- Use boolean prefixes: `isPersian`, `hasValidFormat`

### Function Signatures
```typescript
// Good: Clear, typed, documented
/**
 * Converts Persian digits to English digits
 * @param input - Text containing Persian digits
 * @returns Text with English digits
 * @throws {Error} When input is not a string
 */
export function persianToEnglishDigits(input: string): string;

// Avoid: Unclear, untyped
export function convert(input: any): any;
```

### Parameter Design
```typescript
// Use options objects for complex parameters
interface ConversionOptions {
  preserveNonDigits?: boolean;
  throwOnError?: boolean;
  format?: 'standard' | 'persian';
}

export function convertText(text: string, options: ConversionOptions = {}): string;
```

### Return Types
```typescript
// Use discriminated unions for result types
type ValidationResult = 
  | { valid: true; normalized: string }
  | { valid: false; error: string };

export function validateNationalId(id: string): ValidationResult;
```

## Error Handling Patterns

### Input Validation
```typescript
export function processText(input: string): string {
  if (!isString(input)) {
    throw new TypeError('Input must be a string');
  }
  
  if (input.length === 0) {
    return input; // Handle empty string gracefully
  }
  
  // Process the input...
}
```

### Custom Error Types
```typescript
export class PersianToolsError extends Error {
  constructor(
    message: string,
    public code: string,
    public input?: unknown
  ) {
    super(message);
    this.name = 'PersianToolsError';
  }
}

// Usage
if (!isValidFormat(input)) {
  throw new PersianToolsError(
    'Invalid format provided',
    'INVALID_FORMAT',
    input
  );
}
```

## Module Organization

### Module Structure
```
src/modules/moduleName/
├── index.ts           # Main exports
├── types.ts          # Type definitions (if complex)
├── constants.ts      # Constants and data
├── helpers.ts        # Internal helper functions
└── data.skip.json      # Large data files
```

### Export Patterns
```typescript
// index.ts - Main module file
export { mainFunction } from './implementation';
export type { ModuleTypes } from './types';
export { constants } from './constants';

// Default export for the primary function
export { mainFunction as default };
```

### Data Organization
```typescript
// For large datasets, use .skip.ts files
// constants.skip.ts
export const LARGE_DATA_SET = {
  // ... large data that shouldn't be in main bundle
} as const;

// Regular constants.ts
export const CONFIG = {
  DEFAULT_LOCALE: 'fa-IR',
  MAX_LENGTH: 1000,
} as const;
```

## Documentation Standards

### JSDoc Comments
```typescript
/**
 * Validates Iranian national ID numbers
 * 
 * @param nationalId - The national ID to validate (10 digits)
 * @returns True if the national ID is valid
 * 
 * @example
 * ```typescript
 * validateNationalId('0123456789'); // true
 * validateNationalId('1234567890'); // false
 * ```
 * 
 * @throws {TypeError} When input is not a string
 * @throws {RangeError} When input length is not 10
 * 
 * @see {@link https://example.com/national-id-rules} for validation rules
 */
export function validateNationalId(nationalId: string): boolean;
```

### README Examples
```typescript
// Always provide working examples in README
import { persianToEnglishDigits } from '@persian-tools/persian-tools';

const result = persianToEnglishDigits('۱۲۳۴۵');
console.log(result); // '12345'
```

## Backward Compatibility

### Deprecation Pattern
```typescript
/**
 * @deprecated Use newFunctionName instead. Will be removed in v3.0.0
 */
export function oldFunctionName(input: string): string {
  console.warn('oldFunctionName is deprecated, use newFunctionName instead');
  return newFunctionName(input);
}
```

### Version Management
- Follow semantic versioning
- Mark breaking changes clearly
- Provide migration guides
- Maintain changelog

# TypeScript Development Instructions

## TypeScript Best Practices for persian-tools

### Type Safety
- Always use explicit types for function parameters and return values
- Avoid `any` type - use `unknown` when needed
- Use union types for specific value sets
- Leverage TypeScript's strict mode settings

### Function Signatures
```typescript
// Good: Explicit types with JSDoc
/**
 * Converts Persian digits to English digits
 * @param input - Persian text containing digits
 * @returns Text with English digits
 */
export function persianToEnglishDigits(input: string): string {
  return input.replace(/[۰-۹]/g, (match) => 
    String.fromCharCode(match.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0))
  );
}
```

### Type Definitions
```typescript
// Define specific types for Persian contexts
export type PersianDigit = '۰' | '۱' | '۲' | '۳' | '۴' | '۵' | '۶' | '۷' | '۸' | '۹';
export type EnglishDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export interface BankInfo {
  nickname: string;
  name: string;
  persianName: string;
  code: string;
  accountNumberAvailable: boolean;
}
```

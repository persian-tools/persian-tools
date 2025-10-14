# Testing Instructions for persian-tools

## Testing Philosophy
- Write tests first when possible (TDD)
- Test edge cases and error conditions
- Aim for high test coverage (>90%)
- Use descriptive test names that explain the scenario

## Test Structure with Vitest

### Basic Test Template
```typescript
import { describe, it, expect } from 'vitest';
import { functionName } from '../src/modules/moduleName';

describe('functionName', () => {
  it('should handle basic case correctly', () => {
    const result = functionName('input');
    expect(result).toBe('expected');
  });

  it('should throw error for invalid input', () => {
    expect(() => functionName('')).toThrow('Invalid input');
  });

  it('should handle edge case: empty string', () => {
    const result = functionName('');
    expect(result).toBe('');
  });
});
```

### Persian Language Testing
```typescript
describe('Persian text utilities', () => {
  it('should correctly identify Persian text', () => {
    expect(isPersian('سلام')).toBe(true);
    expect(isPersian('Hello')).toBe(false);
    expect(isPersian('سلام123')).toBe(true); // Mixed content
  });

  it('should handle RTL text properly', () => {
    const persianText = 'متن فارسی';
    const result = processText(persianText);
    expect(result).toContain('فارسی');
  });
});
```

### Testing Data Structures
```typescript
describe('Bank data validation', () => {
  it('should validate all bank codes', () => {
    const banks = getAllBanks();
    banks.forEach(bank => {
      expect(bank.code).toMatch(/^\d{3}$/);
      expect(bank.persianName).toBeTruthy();
      expect(bank.name).toBeTruthy();
    });
  });
});
```

### Parameterized Tests
```typescript
describe('Digit conversion', () => {
  const testCases = [
    { input: '۱۲۳', expected: '123', description: 'Persian to English' },
    { input: '123', expected: '۱۲۳', description: 'English to Persian' },
    { input: '۱a۲', expected: '1a2', description: 'Mixed content' },
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(`should convert ${description}`, () => {
      const result = convertDigits(input);
      expect(result).toBe(expected);
    });
  });
});
```

### Error Testing
```typescript
describe('Error handling', () => {
  it('should throw specific error for invalid national ID', () => {
    expect(() => {
      validateNationalId('invalid');
    }).toThrow('Invalid national ID format');
  });

  it('should return false for malformed input', () => {
    expect(isValidCardNumber('123')).toBe(false);
  });
});
```

### Performance Testing
```typescript
describe('Performance tests', () => {
  it('should process large text efficiently', () => {
    const largeText = 'متن بسیار طولانی'.repeat(10000);
    const start = performance.now();
    processText(largeText);
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // Should complete in <100ms
  });
});
```

## Test Coverage Requirements
- All exported functions must have tests
- Error paths must be tested
- Edge cases (empty strings, null, undefined) must be covered
- Persian-specific scenarios must be tested

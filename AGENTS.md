# AI Agent Instructions for persian-tools

## Overview
This document provides instructions for various AI coding agents working on the persian-tools library. Each agent should follow these guidelines while respecting their specific capabilities and interfaces.

## General Agent Guidelines

### Code Understanding
- **Context First**: Always read and understand existing code patterns before making changes
- **Persian Expertise**: Understand Persian language nuances, RTL text, and cultural context
- **Type Safety**: Maintain strict TypeScript typing throughout the codebase
- **Testing Focus**: Write comprehensive tests for all functionality

### Development Workflow
1. **Analyze**: Understand the existing codebase structure
2. **Plan**: Break down complex tasks into smaller, manageable steps
3. **Implement**: Write code following established patterns
4. **Test**: Create thorough test coverage
5. **Document**: Update relevant documentation

### Code Quality Standards
- Follow existing naming conventions and code style
- Use explicit types and avoid `any`
- Write JSDoc comments for public APIs
- Include error handling and input validation
- Maintain backward compatibility

## Agent-Specific Instructions

### GitHub Copilot
- Leverage the `.github/copilot-instructions.md` file
- Focus on incremental improvements and bug fixes
- Suggest relevant completions based on context
- Respect existing code patterns and conventions

### Claude (Anthropic)
- Use step-by-step reasoning for complex problems
- Provide detailed explanations for Persian language decisions
- Consider edge cases and error scenarios
- Offer multiple implementation approaches when relevant

### Gemini (Google)
- Utilize multimodal capabilities for documentation review
- Focus on performance optimization opportunities
- Suggest modern JavaScript/TypeScript patterns
- Provide comprehensive testing strategies

## Persian Language Expertise Required

All agents must understand:
- Persian vs Arabic character differences
- Persian digit systems (۰-۹)
- Half-space (ZWNJ) usage in Persian text
- RTL text direction implications
- Iranian banking and ID number formats
- Jalali calendar system
- Persian number-to-words conversion patterns

## Common Tasks and Approaches

### Adding New Utilities
1. Create module directory under `src/modules/`
2. Implement main function with proper typing
3. Add comprehensive tests in `test/`
4. Update main `index.ts` exports
5. Document in README if user-facing

### Bug Fixes
1. Reproduce the issue with a test case
2. Identify root cause
3. Implement minimal fix
4. Ensure no regressions
5. Update tests to prevent recurrence

### Performance Improvements
1. Profile current performance
2. Identify bottlenecks
3. Implement optimizations
4. Benchmark improvements
5. Maintain API compatibility

### Documentation Updates
1. Keep README.md current with examples
2. Update JSDoc comments
3. Maintain CHANGELOG.md
4. Update type definitions

## Error Handling Patterns

```typescript
// Standard error handling approach
export function validateInput(input: string): ValidationResult {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  if (input.length === 0) {
    return { valid: false, error: 'Input cannot be empty' };
  }
  
  // Validation logic...
  return { valid: true, normalized: input };
}
```

## Testing Requirements

### Test Coverage
- All exported functions must have tests
- Include positive and negative test cases
- Test edge cases (empty strings, null, undefined)
- Test Persian-specific scenarios

### Test Structure
```typescript
describe('functionName', () => {
  describe('valid inputs', () => {
    it('should handle basic case', () => {
      // Test implementation
    });
  });
  
  describe('invalid inputs', () => {
    it('should throw error for invalid input', () => {
      // Error test implementation
    });
  });
  
  describe('edge cases', () => {
    it('should handle empty string', () => {
      // Edge case implementation
    });
  });
});
```

## Performance Considerations

- Use lazy loading for large datasets
- Implement caching for expensive operations
- Consider memory usage for large text processing
- Optimize for both single-use and batch operations

## Security Guidelines

- Validate all inputs thoroughly
- Avoid executing dynamic code
- Don't expose sensitive data in error messages
- Use safe parsing methods for user data

## Collaboration Guidelines

When multiple agents work on the same codebase:
- Communicate changes clearly
- Maintain consistent coding style
- Avoid conflicting modifications
- Respect ongoing work by other agents
- Follow established branching strategies

Remember: The goal is to maintain a high-quality, reliable Persian language utility library that serves the Persian-speaking developer community effectively.

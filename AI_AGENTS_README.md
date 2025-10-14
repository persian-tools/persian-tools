# AI Coding Agent Configuration for persian-tools

This repository is fully configured for AI coding agents following best practices from [GitHub Copilot Coding Agent Tips](https://gh.io/copilot-coding-agent-tips).

## 📁 File Structure

### Primary Instructions
- **`.github/copilot-instructions.md`** - Main GitHub Copilot configuration
- **`AGENTS.md`** - General instructions for all AI agents
- **`CLAUDE.md`** - Specialized instructions for Claude (Anthropic)
- **`GEMINI.md`** - Specialized instructions for Gemini (Google)

### Domain-Specific Instructions (`.github/instructions/`)
- **`typescript.instructions.md`** - TypeScript development guidelines
- **`testing.instructions.md`** - Testing strategies with Vitest
- **`persian-language.instructions.md`** - Persian language processing expertise
- **`api-design.instructions.md`** - API design principles and patterns

## 🎯 Key Features

### Agent-Optimized Instructions
Each AI agent has tailored instructions that leverage their unique strengths:
- **GitHub Copilot**: Context-aware completions and suggestions
- **Claude**: Analytical reasoning and detailed explanations
- **Gemini**: Performance optimization and modern JavaScript patterns

### Persian Language Expertise
All instructions include comprehensive guidance on:
- Persian vs Arabic character differences (پ، چ، ژ، گ vs ب، ج، ز، ع)
- Persian digit systems (۰-۹) and conversions
- Half-space (ZWNJ) handling in text
- RTL (right-to-left) text processing
- Iranian cultural context (banking, IDs, calendars)

### Development Standards
- **Type Safety**: Strict TypeScript with explicit types
- **Testing**: >90% coverage with Vitest
- **Performance**: Optimized for large text processing
- **Documentation**: JSDoc comments for all public APIs
- **Compatibility**: Semantic versioning and backward compatibility

## 🚀 Quick Start for AI Agents

### 1. Read Instructions
Before starting work, review:
1. Your agent-specific file (`CLAUDE.md`, `GEMINI.md`, or `.github/copilot-instructions.md`)
2. Relevant domain instructions in `.github/instructions/`
3. The general `AGENTS.md` guidelines

### 2. Development Workflow
```bash
# Create a feature branch
git checkout -b agent/feature-name

# Make changes following the patterns in existing code
# Run tests
pnpm test

# Check linting
pnpm lint

# Verify build
pnpm build

# Commit with conventional commit messages
git commit -m "feat: add Persian text normalization utility"

# Push and create PR
git push origin agent/feature-name
```

### 3. Code Quality Checklist
- [ ] TypeScript strict mode compliant
- [ ] All functions have explicit return types
- [ ] JSDoc comments for public APIs
- [ ] Comprehensive test coverage
- [ ] Persian language edge cases handled
- [ ] Error handling implemented
- [ ] Documentation updated

## 📚 Persian Language Reference

### Character Sets
```typescript
// Persian-specific characters
const PERSIAN = ['پ', 'چ', 'ژ', 'گ', 'ی', 'ک'];

// Persian digits
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// Half-space (ZWNJ)
const HALF_SPACE = '\u200C';
```

### Common Patterns
```typescript
// Text normalization
function normalizePersian(text: string): string {
  return text
    .replace(/ي/g, 'ی')  // Arabic ya → Persian ya
    .replace(/ك/g, 'ک')  // Arabic kaf → Persian kaf
    .trim();
}

// Digit conversion
function persianToEnglish(text: string): string {
  return text.replace(/[۰-۹]/g, (d) => 
    String.fromCharCode(d.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0))
  );
}
```

## 🧪 Testing Guidelines

### Test Structure
```typescript
describe('moduleName', () => {
  describe('valid inputs', () => {
    it('should handle basic Persian text', () => {
      expect(processText('سلام')).toBe('expected');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(processText('')).toBe('');
    });
  });

  describe('error handling', () => {
    it('should throw for invalid input', () => {
      expect(() => processText(null)).toThrow();
    });
  });
});
```

## 🤝 Multi-Agent Collaboration

When multiple AI agents work on this repo:
1. **Communication**: Use clear commit messages and PR descriptions
2. **Coordination**: Check existing branches and PRs
3. **Consistency**: Follow established patterns
4. **Quality**: Maintain high standards

## 📖 Additional Resources

- [Repository README](./README.md) - Project overview
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute
- [Changelog](./CHANGELOG.md) - Version history
- [Code of Conduct](./CODE_OF_CONDUCT.md) - Community guidelines

## 🎓 Learning Path

### For New AI Agents
1. Read `AGENTS.md` for general guidelines
2. Study existing modules in `src/modules/`
3. Review test patterns in `test/`
4. Start with small improvements
5. Graduate to new features

### For Experienced Agents
1. Review your agent-specific instructions
2. Focus on domain-specific improvements
3. Optimize performance and bundle size
4. Enhance test coverage
5. Improve documentation

---

**Remember**: The goal is to create a reliable, high-quality Persian language utility library that serves the Persian-speaking developer community effectively.

For questions or issues, refer to the instruction files or consult the repository maintainers.

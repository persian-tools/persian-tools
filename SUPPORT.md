# Support

Thank you for using Persian Tools! We're here to help you get the most out of this library.

## 📚 Documentation

Before asking for help, please check our comprehensive documentation:

- **README**: [Project README](README.md) - Overview and quick start
- **API Documentation**: [https://persian-tools.usestrict.dev](https://persian-tools.usestrict.dev)
- **Examples**: See the examples in each function's documentation
- **Contributing Guide**: [CONTRIBUTING.md](CONTRIBUTING.md)

## 🔍 Common Issues

### Installation Issues

If you encounter problems installing Persian Tools:

```bash
# Clear bun cache
bun pm cache rm
bun install @persian-tools/persian-tools

# Or fallback to npm if needed
npm cache clean --force
npm install @persian-tools/persian-tools
```

### TypeScript Issues

Ensure you have TypeScript >= 4.0 installed:

```bash
bun add -d typescript@latest
```

### Build Issues

If the build fails:

```bash
# Clean and reinstall
rm -rf node_modules bun.lockb
bun install
bun run build
```

## 💬 Getting Help

### GitHub Discussions (Recommended)

For questions, ideas, and general discussions:

👉 [GitHub Discussions](https://github.com/persian-tools/persian-tools/discussions)

This is the best place for:
- Questions about how to use Persian Tools
- Feature discussions and ideas
- Showcasing your projects using Persian Tools
- General Persian language processing discussions

### GitHub Issues

For bug reports and feature requests:

👉 [GitHub Issues](https://github.com/persian-tools/persian-tools/issues)

Before creating an issue:
1. Search existing issues to avoid duplicates
2. Use the appropriate issue template
3. Provide a minimal reproduction case
4. Include relevant system information

**Please use issues ONLY for bugs and feature requests**, not for questions.

### Stack Overflow

Ask questions on Stack Overflow using the tag:

👉 [`persian-tools`](https://stackoverflow.com/questions/tagged/persian-tools)

This helps build a searchable knowledge base for the community.

## 📧 Direct Contact

For security vulnerabilities or sensitive issues:

📧 Email: [ali_4286@live.com](mailto:ali_4286@live.com)

**Note**: Please use email only for:
- Security vulnerability reports (see [SECURITY.md](SECURITY.md))
- Private or sensitive matters
- Partnership/collaboration inquiries

For general questions, please use GitHub Discussions or Stack Overflow.

## 🐛 Reporting Bugs

When reporting bugs, include:

1. **Persian Tools version**: Check with `bun list @persian-tools/persian-tools`
2. **Node.js version**: Run `node --version`
3. **Operating System**: Your OS and version
4. **Package Manager**: bun, npm, yarn, etc.
5. **Minimal reproduction**: A simple code example that demonstrates the bug
6. **Expected behavior**: What you expected to happen
7. **Actual behavior**: What actually happened
8. **Error messages**: Full error messages and stack traces

Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

## 💡 Feature Requests

We welcome feature suggestions! When requesting features:

1. **Check existing requests**: Search issues first
2. **Describe the use case**: Why is this feature needed?
3. **Provide examples**: How would it be used?
4. **Consider alternatives**: What other solutions exist?
5. **Breaking changes**: Note if it would break existing code

Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

## 🤝 Contributing

Want to contribute? We'd love your help!

See our [Contributing Guide](CONTRIBUTING.md) for:
- Code style guidelines
- Development setup (using bun)
- Pull request process
- Testing requirements

## 📖 Learning Resources

### Persian Language Processing

- Understanding Persian/Farsi characters
- RTL (Right-to-Left) text handling
- Persian number systems
- Iranian validation standards (National ID, bank cards, etc.)

### Persian-Specific Topics

- **Jalali Calendar**: Iranian calendar system
- **National ID**: کد ملی (Kod-e Melli) validation
- **Bank Cards**: Iranian bank card validation
- **Phone Numbers**: Iranian mobile number formats
- **IBAN/Sheba**: Iranian bank account numbers

## 🌟 Community

### Stay Updated

- ⭐ Star the repository on [GitHub](https://github.com/persian-tools/persian-tools)
- 👀 Watch releases for updates
- 🐦 Follow project updates (if available)

### Show Your Support

If Persian Tools helped you, consider:

- ⭐ Starring the repository
- 📝 Writing a blog post about your experience
- 🗣️ Talking about it at meetups or conferences
- 💰 Supporting via [GitHub Sponsors](https://github.com/sponsors/ali-master)

## 📝 Feedback

We value your feedback! Let us know:

- What features you'd like to see
- How we can improve documentation
- Your experience using Persian Tools
- Any pain points you've encountered

Share feedback via [GitHub Discussions](https://github.com/persian-tools/persian-tools/discussions).

## ⚠️ Note

This project is maintained by volunteers in their free time. While we strive to respond promptly:

- Complex issues may take time to investigate
- Feature requests are prioritized based on community needs
- Pull requests with tests and documentation are more likely to be merged quickly

Thank you for your patience and understanding! 🙏

---


**Package Manager**: This project uses [Bun](https://bun.sh/) for fast, reliable package management and development.


**Made with ❤️ by the Persian developer community**
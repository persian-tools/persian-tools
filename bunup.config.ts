import { $, file } from "bun";
import { defineConfig } from "bunup";
import { version } from "./package.json" assert { type: "json" };

// Get git commit hash
let commitHash = "unknown";
const gitFile = file(".git");
try {
	if (await gitFile.exists()) {
		const commit = await $`git rev-parse --short HEAD`;
		commitHash = commit.text("utf-8").trim();
	}
} catch {
	// Fallback if the git command fails
	commitHash = "dev";
}

// Get a build timestamp
const buildTime = new Date().toISOString();

/**
 * @internal
 */
const config = defineConfig([
	{
		entry: ["src/index.ts"],
		format: ["esm", "cjs"],
		outDir: "./build",
		loader: {
			".svg": "file",
		},
		banner: `
/*!
 * ╔═══════════════════════════════════════════════════════════════════════════════════════╗
 * ║                               🚀 Persian Tools v${version}                            ║
 * ╠═══════════════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                                       ║
 * ║  📦 A comprehensive TypeScript library for Persian language utilities                 ║
 * ║  🛠️  Features: IBAN validation, National ID, Phone numbers, Text processing & more    ║
 * ║                                                                                       ║
 * ║  🏗️  Build Information:                                                              ║
 * ║    • Version: ${version}                                                              ║
 * ║    • Commit: ${commitHash}                                                            ║
 * ║    • Built: ${buildTime}                                          ║
 * ║    • Bundle: Universal (ESM + CJS)                                                    ║
 * ║                                                                                       ║
 * ║  👥 Maintainers:                                                                      ║
 * ║    • Ali Torki <ali_4286@live.com>                                                    ║
 * ║    • Persian Tools Community                                                          ║
 * ║                                                                                       ║
 * ║  📚 Resources:                                                                        ║
 * ║    • GitHub: https://github.com/persian-tools/persian-tools                           ║
 * ║    • NPM: https://www.npmjs.com/package/@persian-tools/persian-tools                  ║
 * ║    • Docs: https://persian-tools.usestrict.dev                                        ║
 * ║    • Issues: https://github.com/persian-tools/persian-tools/issues                    ║
 * ║                                                                                       ║
 * ║  ⚖️  License: MIT License                                                             ║
 * ║  🌟 Made with love for the Persian developer community                                ║
 * ╚═══════════════════════════════════════════════════════════════════════════════════════╝
 *
 * 🔧 Developer Notes:
 * • This library is optimized for both browser and Node.js environments
 * • Full TypeScript support with comprehensive type definitions
 * • Tree-shakable ES modules for optimal bundle size
 * • All functions are pure and side-effect free
 *
 * 📖 Quick Start:
 * import { isValidIranianNationalId, toPersianChars } from '@persian-tools/persian-tools';
 *
 * 💡 Pro Tip: Use named imports for better tree-shaking and smaller bundles
 */
`.trim(),
		footer: `
/*!
 * ════════════════════════════════════════════════════════════════════════════════════════
 *
 *                           📄 Persian Tools v${version} - End of Bundle
 *
 * ════════════════════════════════════════════════════════════════════════════════════════
 *
 * 🎯 Performance Metrics:
 *   • Optimized with Bun bundler for maximum performance
 *   • Minified and compressed for production use
 *   • Support for modern JavaScript environments (ES2020+)
 *   • Compatible with Node.js 14+ and all modern browsers
 *
 * 🔍 Debug Information:
 *   • Build Target: Universal (ESM + CJS)
 *   • Source Maps: Available in development builds
 *   • TypeScript: Strict mode enabled
 *   • Bundle Analysis: Use 'npm run analyze' for detailed metrics
 *
 * 🚀 Production Ready:
 *   • Thoroughly tested with 80+ test coverage
 *   • Continuous integration with GitHub Actions
 *   • Automated dependency updates via Renovate
 *   • Semantic versioning for reliable updates
 *
 * 🤝 Contributing:
 *   • We welcome contributions from the community!
 *   • See CONTRIBUTING.md for guidelines
 *   • Join our discussions on GitHub Discussions
 *   • Follow our Code of Conduct
 *
 * 📧 Support:
 *   • Report bugs: https://github.com/persian-tools/persian-tools/issues
 *   • Feature requests: https://github.com/persian-tools/persian-tools/discussions
 *   • Security issues: See SECURITY.md
 *
 * ⭐ If this library helped you, please consider giving us a star on GitHub!
 *
 * ════════════════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) ${new Date().getFullYear()} Persian Tools Contributors
 * Released under the MIT License
 *
 * "Empowering Persian developers, one utility at a time" 🇮🇷
 *
 * ════════════════════════════════════════════════════════════════════════════════════════
 */
`.trim(),
		dts: true,
		clean: true,
		minify: true,
		exports: true,
		report: {
			brotli: true,
			gzip: true,
		},
		shims: true,
		unused: true,
		splitting: true,
		sourcemap: false,
		minifyWhitespace: true,
		minifyIdentifiers: true,
		minifySyntax: true,
	},
]);

export default config;

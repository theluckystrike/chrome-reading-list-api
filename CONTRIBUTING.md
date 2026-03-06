# Contributing to chrome-reading-list-api

Thank you for your interest in contributing. This document outlines the process for contributing to this project.

## Reporting Issues

Before reporting an issue, please check if the issue has already been reported. When reporting a new issue, include:

1. A clear description of the problem
2. Steps to reproduce the issue
3. Expected behavior vs actual behavior
4. Chrome version and manifest version being used
5. Any relevant error messages or console output

Use the issue templates provided in .github/ISSUE_TEMPLATE/ when creating bug reports or feature requests.

## Development Workflow

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch from main
4. Make your changes
5. Test your changes
6. Commit with a clear commit message
7. Push to your fork
8. Submit a pull request

### Getting Started

```bash
git clone https://github.com/theluckystrike/chrome-reading-list-api.git
cd chrome-reading-list-api
npm install
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## Code Style

This project uses standard TypeScript conventions:

- Use TypeScript for all new code
- Run the build to ensure type checking passes
- Keep code clean and readable
- Add JSDoc comments for public methods
- Use meaningful variable and function names

## Testing

All new features should include appropriate tests. Run the test suite before submitting a pull request:

```bash
npm test
```

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

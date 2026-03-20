# 🤝 Contributing to Beaned-Charts

Welcome! We're thrilled you're interested in contributing to Beaned-Charts. This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [Commit Messages](#commit-messages)
- [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn
- Git

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/beaned-charts.git
   cd beaned-charts
   ```
3. Set up upstream remote:
   ```bash
   git remote add upstream https://github.com/ez0000001000000/beaned-charts.git
   ```

## 🛠️ Development Setup

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm test
```

### Run Demo

```bash
node demo.js
```

### Run React Demo

```bash
node react-demo.js
```

## 📁 Project Structure

```
beaned-charts/
├── index.js              # Main entry point
├── index.d.ts            # TypeScript definitions
├── BarChart.js           # Bar chart implementation
├── LineChart.js          # Line chart implementation
├── PieChart.js           # Pie chart implementation
├── utils.js              # Utility functions
├── react-components.js   # React-style API
├── react-demo.js         # React demo examples
├── styled-charts.md      # Styled charts documentation
├── react-test.md         # React integration guide
├── demo.js               # Basic demo
├── package.json          # Package configuration
├── test/                 # Test files
│   └── test.js
├── bin/                  # CLI tools
│   └── cli.js
└── README.md             # Main documentation
```

## 📝 Contributing Guidelines

### Types of Contributions

- 🐛 **Bug fixes**: Fix existing issues
- ✨ **Features**: Add new functionality
- 📚 **Documentation**: Improve docs or examples
- 🧪 **Tests**: Add or improve test coverage
- 🎨 **Styling**: Improve visual design or UX
- 🔧 **Tools**: Development tools and automation

### Development Workflow

1. **Choose an issue** or create one for your contribution
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the guidelines below
4. **Run tests** to ensure nothing breaks:
   ```bash
   npm test
   ```
5. **Update documentation** if needed
6. **Commit your changes** with clear messages
7. **Push to your fork** and create a Pull Request

## 🧪 Testing

### Test Structure

- Tests are located in `test/test.js`
- Use the existing test framework (simple assertion-based)
- Test both basic functionality and edge cases
- Include visual tests for chart rendering

### Running Tests

```bash
npm test
```

### Test Coverage Requirements

- Maintain or improve existing test coverage
- Add tests for new features
- Test error conditions and edge cases
- Verify cross-browser compatibility

### Manual Testing

Test your changes in different environments:
- Node.js versions 14+
- Different browsers (Chrome, Firefox, Safari, Edge)
- Various screen sizes and devices

## 📚 Documentation

### Documentation Requirements

- Update README.md for API changes
- Update styled-charts.md for new features
- Add examples to demo files
- Update TypeScript definitions if needed
- Keep documentation synchronized with code

### Documentation Standards

- Use clear, concise language
- Include code examples for new features
- Update screenshots/diagrams when visuals change
- Maintain consistent formatting
- Test all code examples

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch** with latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run full test suite**:
   ```bash
   npm test
   ```

3. **Check code style** and formatting

4. **Update documentation** and examples

5. **Test manually** in different environments

### Pull Request Template

Use this template when creating a PR:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots (if applicable)
Add screenshots of visual changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Ready for review
```

### Review Process

1. **Automated checks** run (tests, linting)
2. **Code review** by maintainers
3. **Approval** and merge
4. **Release** in next version

## 🎨 Style Guide

### JavaScript Style

- Use ES6+ features appropriately
- Consistent indentation (2 spaces)
- Descriptive variable and function names
- Add JSDoc comments for public APIs
- Follow existing code patterns

### Code Organization

- Keep functions focused and single-purpose
- Group related functionality
- Use meaningful module exports
- Maintain consistent file structure

### Chart API Design

- Follow existing option patterns
- Maintain backward compatibility
- Provide sensible defaults
- Document all options clearly

## 📝 Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

### Examples

```
feat: add gradient support to bar charts

fix: correct tooltip positioning on mobile devices

docs: update React integration examples

refactor: simplify SVG path generation logic
```

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Node version, browser)
- **Code examples** or test cases
- **Screenshots** if visual issues

### Feature Requests

For new features, provide:

- **Clear description** of the feature
- **Use case** and benefits
- **Implementation ideas** if any
- **Mockups** or examples if applicable

### Issue Labels

Common labels:
- `bug`: Confirmed bugs
- `enhancement`: Feature requests
- `documentation`: Docs improvements
- `help wanted`: Good for new contributors
- `good first issue`: Beginner-friendly issues

## 🎯 Recognition

Contributors are recognized through:
- GitHub contributor stats
- Mention in release notes
- Special contributor badges
- Featured in README contributors section

## 📞 Getting Help

- **Issues**: Use GitHub issues for bugs and features
- **Discussions**: General questions and ideas
- **Discord**: Real-time community chat
- **Documentation**: Check existing docs first

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Beaned-Charts! Your help makes this library better for everyone. 🚀

# 🤖 AI Agent Guidelines for Beaned-Charts

This document contains comprehensive guidelines and rules for AI agents working on the Beaned-Charts project. All AI assistants and automation tools must follow these rules when contributing to the codebase.

## � Core Principles

### Code Quality Standards
- **Zero Dependencies**: Beaned-Charts must maintain its zero-dependency promise
- **Pure SVG Output**: All charts must generate clean, standards-compliant SVG
- **Performance First**: Optimize for fast rendering and minimal memory usage
- **Browser Compatibility**: Support modern browsers (Chrome, Firefox, Safari, Edge)
- **TypeScript Support**: Maintain full TypeScript definitions for all public APIs

### File Structure Rules
- **Main Entry**: `index.js` exports all public APIs
- **Type Definitions**: `index.d.ts` contains complete TypeScript interfaces
- **Chart Classes**: `BarChart.js`, `LineChart.js`, `PieChart.js` contain implementations
- **Utilities**: `utils.js` contains shared helper functions
- **Documentation**: `README.md`, `styled-charts.md`, `react-test.md` for docs
- **Tests**: `test/test.js` contains unit tests
- **Demos**: `demo.js`, `react-demo.js` for examples

## 🔧 Development Guidelines

### Code Style Rules
- **ES6+ Features**: Use modern JavaScript features appropriately
- **Consistent Indentation**: 2 spaces, no tabs
- **Descriptive Names**: Use clear, meaningful variable and function names
- **JSDoc Comments**: Document all public APIs with JSDoc
- **Error Handling**: Implement proper error handling and validation
- **Modular Code**: Keep functions focused and single-purpose

### Chart API Design
- **Constructor Pattern**: All charts use `new ChartClass(data, options)`
- **Options Object**: Flexible configuration through options parameter
- **Render Method**: All charts implement `.render()` returning SVG string
- **Backward Compatibility**: Never break existing APIs without migration path
- **Sensible Defaults**: Provide good defaults for all optional parameters

### Testing Requirements
- **Unit Tests**: Test all chart types and edge cases
- **Validation**: Test input validation and error conditions
- **Output Verification**: Verify SVG output contains expected elements
- **Cross-Browser**: Test rendering in different environments
- **Performance**: Monitor memory usage and rendering speed

## 📚 Documentation Standards

### README.md Requirements
- **Clear Examples**: Show basic usage for each chart type
- **Installation**: Include npm install instructions
- **API Reference**: Document all options and methods
- **Customization Guide**: Explain styling and theming options
- **Browser Support**: List supported browsers and versions

### Code Documentation
- **JSDoc Comments**: Every public method needs JSDoc
- **Parameter Types**: Document all parameters with types
- **Return Values**: Specify return types and descriptions
- **Usage Examples**: Include code examples in comments
- **Edge Cases**: Document special behaviors and limitations

## 🚀 Contribution Rules

### Pull Request Guidelines
- **Descriptive Title**: Use clear, specific PR titles
- **Issue Reference**: Link to related issues when applicable
- **Testing**: Include tests for new features
- **Documentation**: Update docs for API changes
- **Breaking Changes**: Clearly mark and explain breaking changes
- **Code Review**: Address all review feedback

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

**Examples:**
```
feat: add gradient support to bar charts
fix: correct tooltip positioning on mobile devices
docs: update React integration examples
```

## 🎨 Design System

### Color Management
- **Consistent Palette**: Use predefined color arrays for consistency
- **Theme Support**: Support light/dark themes
- **Accessibility**: Ensure sufficient color contrast
- **Customization**: Allow color overrides in options

### Typography
- **Font Stacks**: Use system font stacks for performance
- **Responsive Text**: Scale text appropriately for different sizes
- **Hierarchy**: Clear visual hierarchy in charts
- **Readability**: Ensure text is readable at all sizes

### Layout & Spacing
- **Responsive Design**: Charts adapt to container sizes
- **Consistent Margins**: Use standard spacing units
- **Grid Systems**: Align elements to logical grids
- **Touch Targets**: Ensure adequate click/hover areas

## 🔒 Security Guidelines

### Input Validation
- **Sanitize Data**: Validate all input data types
- **Size Limits**: Prevent extremely large datasets
- **XSS Prevention**: Ensure SVG output is safe
- **Error Boundaries**: Handle errors gracefully

### Performance Limits
- **Memory Usage**: Monitor heap usage for large datasets
- **Rendering Time**: Keep initial render under 100ms
- **Animation Performance**: Use CSS animations over JavaScript
- **Bundle Size**: Maintain small package size

## 🧪 Testing Strategy

### Unit Tests
- **Chart Rendering**: Test SVG output structure
- **Options Handling**: Verify configuration options work
- **Data Processing**: Test data transformation logic
- **Edge Cases**: Test with empty data, large datasets, etc.

### Integration Tests
- **Browser Compatibility**: Test in multiple browsers
- **Framework Integration**: Verify React/Vue/Angular usage
- **Build Process**: Test npm packaging and distribution

### Visual Tests
- **Screenshot Comparison**: Compare rendered charts
- **Layout Verification**: Check element positioning
- **Responsive Behavior**: Test different screen sizes

## 📦 Release Process

### Version Management
- **Semantic Versioning**: Use MAJOR.MINOR.PATCH format
- **Breaking Changes**: Increment MAJOR for API breaks
- **New Features**: Increment MINOR for new functionality
- **Bug Fixes**: Increment PATCH for fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] TypeScript definitions current
- [ ] NPM package builds correctly
- [ ] Browser compatibility verified
- [ ] Performance benchmarks pass
- [ ] Security scan completed

## 🚨 Critical Rules

### Never Break These Rules
1. **Zero Dependencies**: No external libraries allowed
2. **SVG Only**: Charts must output pure SVG strings
3. **Backward Compatibility**: Existing APIs must continue working
4. **Performance**: Charts must render quickly
5. **Security**: Output must be XSS-safe
6. **Standards**: Follow web standards and best practices

### Forbidden Actions
- Adding dependencies without approval
- Breaking existing APIs
- Including non-SVG output formats
- Using deprecated browser features
- Ignoring performance implications
- Skipping security considerations

## � Support & Communication

### Issue Reporting
- **Clear Description**: Explain the problem thoroughly
- **Reproduction Steps**: Provide minimal reproduction case
- **Environment Details**: Include browser, Node.js version, etc.
- **Expected vs Actual**: Describe what should happen vs what does

### Feature Requests
- **Use Case**: Explain why the feature is needed
- **Implementation Ideas**: Suggest how it could work
- **Alternatives**: Mention alternative approaches
- **Scope**: Consider implementation complexity

### Code Review Process
- **Constructive Feedback**: Focus on code quality and standards
- **Explain Rationale**: Justify suggestions with reasoning
- **Collaborative**: Work together to find best solutions
- **Documentation**: Ensure changes are properly documented

---

## 🤝 Contributing

AI agents should:
- Follow all guidelines in this document
- Ask for clarification when unsure
- Prioritize user experience and code quality
- Maintain open communication with human developers
- Document all changes and decisions

*This document is maintained by human developers. AI agents must follow these rules exactly as written.*

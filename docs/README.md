# WordPress Content Service Documentation

Welcome to the WordPress Content Service documentation. This service provides efficient content synchronization from WordPress sites to markdown files with structured frontmatter.

## Quick Start

```bash
# Install dependencies
npm install

# Run full synchronization
npm run full

# Run incremental sync (last 7 days)
npm run latest

# Clean all content
npm run clean
```

## Documentation Sections

### Development Standards
- [Development Standards](./development-standards.md) - Core development principles and workflow
- [Version Control](./version-control.md) - Branching strategy and change management
- [Testing Standards](./testing.md) - Testing philosophy and implementation guidelines
- [Documentation Standards](./documentation-standards.md) - Documentation creation and maintenance
- [Testable Architecture](./testable-architecture.md) - Architectural principles for maintainable code

### Project Documentation
- [Architecture](./architecture.md) - System architecture and component overview
- [API Reference](./api-reference.md) - Service APIs and interfaces
- [Configuration](./configuration.md) - Environment and site configuration
- [Deployment](./deployment.md) - Deployment strategies and CI/CD

## Key Principles

This project follows the same high standards as the main application:

- **Separation of Concerns**: Business logic extracted into testable utility functions
- **Comprehensive Testing**: All functionality covered by automated tests
- **Clear Documentation**: All components and services thoroughly documented
- **Version Control**: Semantic versioning with comprehensive changelog
- **Consistent Standards**: Code follows established patterns and conventions

## Getting Help

- Check the [API Reference](./api-reference.md) for service interfaces
- Review [Testing Standards](./testing.md) for test implementation
- See [Development Standards](./development-standards.md) for workflow guidance

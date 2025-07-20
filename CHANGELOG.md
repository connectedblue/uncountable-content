# WordPress Content Service - Changelog

All notable changes to the WordPress Content Service will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-07-20

### Added
- WordPress site configuration module with comprehensive type definitions
- WordPressApiService for fetching posts and media from WordPress REST APIs
- ContentWriterService for generating markdown files with YAML frontmatter
- Complete CLI interface with full, latest, clean, and stats commands
- Centralized type definitions for better code organization
- Comprehensive error handling with custom error classes
- Support for both regular posts and media items with captions
- Pagination support for large WordPress sites
- Retry logic and timeout handling for API requests
- File naming convention: [root_slug]-[post_id].md
- YAML frontmatter generation with all WordPress metadata
- Content directory management and statistics

### Changed
- N/A

### Fixed
- N/A

## [Unreleased]

### Added
- Initial project structure with TypeScript configuration
- Basic package.json with CLI framework dependencies
- Documentation standards adapted from main application
- Development standards and testing guidelines
- Version control and change management processes

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [1.0.0] - 2025-07-20

### Added
- Initial WordPress Content Service project setup
- Git repository initialization with SSH remote configuration
- Comprehensive documentation structure:
  - Development standards and workflow guidelines
  - Version control and branching strategy
  - Testing standards and implementation requirements
  - Documentation standards and maintenance guidelines
  - Testable architecture principles and patterns
- TypeScript configuration with strict mode enabled
- Package.json with core dependencies:
  - commander (CLI framework)
  - gray-matter (frontmatter handling)
  - turndown (HTML to Markdown conversion)
  - tsx (TypeScript execution)
- Environment configuration template (.env.example)
- Comprehensive .gitignore for Node.js projects
- Project README with quick start instructions

### Changed
- N/A (initial release)

### Fixed
- N/A (initial release)

---

## Changelog Guidelines

When updating this changelog:

1. **Add entries under [Unreleased]** during development
2. **Move entries to versioned section** when releasing
3. **Follow the format categories**: Added, Changed, Deprecated, Removed, Fixed, Security
4. **Use clear, descriptive language** for all entries
5. **Include issue/PR references** when applicable
6. **Date releases** in YYYY-MM-DD format

### Change Categories

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** in case of vulnerabilities

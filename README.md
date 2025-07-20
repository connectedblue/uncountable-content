# WordPress Content Service

A Node.js application for fetching and managing WordPress content as markdown files with YAML frontmatter.

## Overview

This service decouples WordPress content fetching from the main Astro application, providing:
- Efficient content synchronization
- Git-based content version control
- Markdown files with structured frontmatter
- CLI commands for full and incremental syncing

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure your WordPress sites:

```bash
cp .env.example .env
```

## Commands

### Full Sync
Fetch all posts and media from configured WordPress sites:
```bash
npm run full
```

### Incremental Sync
Fetch only recent content (default: last 7 days):
```bash
npm run latest
```

Specify custom days:
```bash
npm run latest -- --days=14
```

### Clean Content
Remove all generated content files:
```bash
npm run clean
```

## Content Structure

Generated markdown files follow this structure:
- Filename: `[root_slug]-[post_id].md`
- YAML frontmatter with all WordPress metadata
- HTML content below frontmatter

## Development

Build TypeScript:
```bash
npm run build
```

Development mode:
```bash
npm run dev
```

## Integration

This service is designed to work with the main Astro application which reads the generated markdown files using Astro content collections.

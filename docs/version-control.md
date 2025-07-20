# Version Control & Change Management

Guidelines for version control, branching strategy, and change management processes for the WordPress Content Service.

## Versioning Strategy

### Semantic Versioning

This project follows [Semantic Versioning (SemVer)](https://semver.org/spec/v2.0.0.html):

```
MAJOR.MINOR.PATCH
```

- **MAJOR** (X.0.0): Breaking changes to CLI interfaces or service APIs
- **MINOR** (0.X.0): New features like additional CLI commands or service capabilities
- **PATCH** (0.0.X): Bug fixes and performance improvements

### Version Management

1. **Current Version**: Maintained in `package.json`
2. **Version History**: Documented in `CHANGELOG.md`
3. **Git Tags**: Each release is tagged with the version number (e.g., `v1.0.0`)

## Branching Strategy

### Main Branches

- **`main`**: Production-ready code, always deployable
- **Feature branches**: Short-lived branches for specific features or fixes

### Branch Naming Convention

```
feature/short-description
bugfix/issue-description
hotfix/critical-fix
docs/documentation-update
refactor/code-improvement
```

Examples:
- `feature/incremental-sync`
- `bugfix/api-rate-limiting`
- `docs/api-reference`
- `refactor/content-writer-service`

### Workflow

1. **Create Feature Branch**: Branch from `main` for new work
2. **Development**: Make changes, add tests, update documentation
3. **Version Update**: Update `package.json` version in the feature branch
4. **Changelog Update**: Add entry to `CHANGELOG.md` describing changes
5. **Testing**: Ensure all tests pass
6. **Pull Request**: Create PR for review
7. **Merge**: Merge to `main` after approval
8. **Tag Release**: Tag the merge commit with the new version

## Change Management Process

### Before Starting Work

1. **Check Current Version**: Review `package.json` and latest changelog
2. **Determine Version Impact**: Decide if changes are MAJOR, MINOR, or PATCH
3. **Create Feature Branch**: Use appropriate naming convention
4. **Plan Changes**: Document expected changes and their impact

### During Development

1. **Write Tests**: Add or update tests for new functionality
2. **Update Documentation**: Keep documentation current with changes
3. **Follow Code Standards**: Adhere to established coding standards
4. **Commit Regularly**: Make small, focused commits with clear messages

### Before Merging

#### **MANDATORY: Version Update**

**All feature branches MUST update the version number before merging to main.**

1. **Update `package.json`**:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. **Update `CHANGELOG.md`**:
   ```markdown
   ## [1.1.0] - 2025-07-20
   
   ### Added
   - Incremental sync with configurable days parameter
   - Rate limiting for WordPress API requests
   
   ### Changed
   - Improved error handling in content writer service
   
   ### Fixed
   - Fixed memory leak in large content processing
   ```

3. **Test Everything**: Run full test suite
4. **Update Documentation**: Ensure all docs reflect changes

## Commit Message Standards

Use conventional commit format for clear history:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Test additions or modifications
- `chore`: Build process or auxiliary tool changes

### Examples
```
feat(cli): add incremental sync command with days parameter
fix(api): handle rate limiting with exponential backoff
docs(readme): update installation and usage instructions
refactor(services): extract common API utilities
test(integration): add comprehensive WordPress API tests
```

## Release Process

### Preparing a Release

1. **Ensure All Tests Pass**: Run complete test suite
2. **Update Documentation**: Verify all docs are current
3. **Update Version**: Following semantic versioning rules
4. **Update Changelog**: Document all changes since last release
5. **Create Pull Request**: For final review

### Creating a Release

1. **Merge to Main**: After approval and all checks pass
2. **Tag Release**: Create git tag with version number
3. **Publish**: Deploy to production environment
4. **Monitor**: Ensure release is working correctly

### Hotfix Process

For critical production issues:

1. **Create Hotfix Branch**: From `main` branch
2. **Fix Issue**: Minimal changes to address the problem
3. **Update Version**: Increment PATCH version
4. **Fast-Track Review**: Expedited review process
5. **Deploy Immediately**: After approval

## Version Control Best Practices

### Commit Practices
- **Atomic Commits**: Each commit represents a single logical change
- **Clear Messages**: Descriptive commit messages following conventions
- **Frequent Commits**: Regular commits during development
- **Clean History**: Avoid merge commits where possible

### Branch Management
- **Short-Lived Branches**: Feature branches should be merged quickly
- **Up-to-Date Branches**: Regularly sync with main branch
- **Delete Merged Branches**: Clean up after successful merges
- **Meaningful Names**: Branch names clearly describe the work

### Code Review Standards
- **All Changes Reviewed**: No direct commits to main branch
- **Test Coverage**: Ensure new code is properly tested
- **Documentation Updates**: Verify docs reflect changes
- **Version Requirements**: Confirm version has been updated

## Emergency Procedures

### Rolling Back Changes
1. **Identify Problem**: Determine the problematic commit/release
2. **Create Revert**: Use git revert for safe rollback
3. **Test Revert**: Ensure rollback doesn't introduce new issues
4. **Deploy Quickly**: Get stable version back to production

### Handling Conflicts
1. **Communicate**: Notify team of conflicts immediately
2. **Coordinate Resolution**: Work together to resolve conflicts
3. **Test Thoroughly**: Ensure resolution doesn't break functionality
4. **Document**: Record resolution process for future reference

## Related Documentation

- [Development Standards](./development-standards.md)
- [Testing Standards](./testing.md)
- [Architecture Overview](./architecture.md)
- [Deployment Guide](./deployment.md)

# Testing Standards

Comprehensive testing strategy and standards for the WordPress Content Service to ensure reliability and correctness.

## Testing Philosophy

The testing strategy emphasizes:

- **Comprehensive Coverage**: Tests cover all services, utilities, CLI commands, and integration scenarios
- **Real-World Scenarios**: Tests use realistic WordPress data and edge cases
- **Maintainability**: Well-organized test files with clear naming and documentation
- **Performance Awareness**: Includes performance benchmarks and efficiency tests
- **Service Integration**: Tests the complete flow from WordPress APIs to markdown generation

## Test Architecture

### Test Categories

#### Service Layer Tests
- **WordPress API Service** (`wordpress-api.test.ts`) - API interaction and data fetching
- **Content Writer Service** (`content-writer.test.ts`) - Markdown generation and file operations
- **Configuration Service** (`config.test.ts`) - Site configuration and validation

#### CLI Command Tests
- **Full Sync Command** (`full-sync.test.ts`) - Complete content synchronization
- **Incremental Sync** (`incremental-sync.test.ts`) - Date-based content updates
- **Clean Command** (`clean.test.ts`) - Content removal and cleanup

#### Integration Tests
- **End-to-End Workflow** (`e2e.test.ts`) - Complete sync workflow testing
- **WordPress Integration** (`wordpress-integration.test.ts`) - Live API integration
- **File System Integration** (`filesystem.test.ts`) - File generation and management

#### Utility Tests
- **Data Processing** (`data-processing.test.ts`) - Content transformation utilities
- **Date Utilities** (`date-utils.test.ts`) - Date parsing and formatting
- **File Utilities** (`file-utils.test.ts`) - File naming and path utilities

### Test Data and Fixtures

#### Test Fixtures (`test/fixtures/`)
Centralized test data for consistent testing across the suite:

**Mock Data Types:**
- WordPress post objects with complete metadata
- Media items with srcset and caption data
- Category and tag taxonomies
- Multi-site content collections
- API response structures

**Fixture Organization:**
```
test/fixtures/
├── wordpress-posts.json     # Sample WordPress post data
├── wordpress-media.json     # Sample media items
├── site-configs.json        # Test site configurations
├── api-responses/           # Mock API response data
└── expected-output/         # Expected markdown output samples
```

## Key Testing Areas

### WordPress API Integration Testing

#### API Response Handling
- **Multi-site fetching**: Tests content from multiple WordPress sites
- **Pagination handling**: Ensures all pages of content are fetched
- **Embedded data processing**: Tests _embedded content like featured media
- **Error response handling**: Tests API failures and rate limiting

#### Data Transformation
- **HTML entity decoding**: Validates proper character processing
- **Content sanitization**: Tests HTML cleaning and safety
- **Media processing**: Tests image handling and srcset generation
- **Taxonomy processing**: Tests category and tag handling

### Content Generation Testing

#### Markdown File Generation
- **Frontmatter creation**: Tests YAML frontmatter generation
- **Content formatting**: Validates HTML content preservation
- **File naming**: Tests `[root_slug]-[post_id].md` convention
- **Directory structure**: Tests content organization

#### File System Operations
- **File creation**: Tests markdown file writing
- **File updates**: Tests incremental sync file operations
- **File cleanup**: Tests content removal operations
- **Path validation**: Tests safe file path generation

### CLI Command Testing

#### Command Execution
- **Argument parsing**: Tests CLI parameter handling
- **Command orchestration**: Tests service coordination
- **Error handling**: Tests command failure scenarios
- **Output formatting**: Tests command output and logging

#### Integration Scenarios
- **Full sync workflow**: Tests complete content synchronization
- **Incremental sync logic**: Tests date-based filtering
- **Clean operation**: Tests content removal
- **Error recovery**: Tests partial failure handling

### Performance Testing

#### API Efficiency
- **Rate limiting**: Tests respectful API usage
- **Concurrent requests**: Tests parallel processing efficiency
- **Memory usage**: Validates memory efficiency with large datasets
- **Error resilience**: Tests recovery from API failures

#### File System Performance
- **Large dataset handling**: Tests with hundreds of posts
- **File I/O efficiency**: Tests file writing performance
- **Directory operations**: Tests bulk file operations
- **Clean up performance**: Tests bulk file removal

## Testing Implementation Standards

### Test File Organization

```typescript
// ✅ GOOD: Clear test structure
describe('WordPressApiService', () => {
  describe('fetchPosts', () => {
    it('should fetch all posts from configured sites', async () => {
      // Test implementation
    });
    
    it('should handle API rate limiting gracefully', async () => {
      // Test implementation
    });
  });
  
  describe('fetchMedia', () => {
    it('should fetch media items with captions', async () => {
      // Test implementation
    });
  });
});
```

### Mock Strategy

#### External Service Mocking
- **WordPress APIs**: Mock all HTTP requests to WordPress sites
- **File System**: Mock file operations for isolated testing
- **Network Calls**: Mock all external network dependencies
- **Date/Time**: Mock time-dependent functionality

#### Mock Implementation
```typescript
// ✅ GOOD: Comprehensive mocking
import { jest } from '@jest/globals';
import { WordPressApiService } from '../src/services/wordpress-api.js';

// Mock fetch for API calls
global.fetch = jest.fn();

// Mock file system operations
jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
  readdir: jest.fn(),
  unlink: jest.fn()
}));
```

### Test Data Management

#### Realistic Test Data
- **Use actual WordPress response structures** for API tests
- **Include edge cases** like missing fields and malformed data
- **Test with various content types** (posts, media, pages)
- **Include multi-site scenarios** with different configurations

#### Test Data Validation
```typescript
// ✅ GOOD: Validate test data structure
const mockWordPressPost = {
  id: 123,
  title: { rendered: 'Test Post' },
  content: { rendered: '<p>Test content</p>' },
  date: '2025-07-20T10:00:00',
  slug: 'test-post',
  _embedded: {
    'wp:featuredmedia': [{ source_url: 'https://example.com/image.jpg' }]
  }
};

// Validate structure matches WordPress API
expect(mockWordPressPost).toHaveProperty('_embedded.wp:featuredmedia');
```

### Performance Testing Standards

#### Benchmarking
- **Set performance baselines** for all major operations
- **Test with various dataset sizes** (10, 100, 1000+ posts)
- **Measure memory usage** during processing
- **Track API call efficiency** and rate limiting

#### Performance Test Implementation
```typescript
// ✅ GOOD: Performance testing
describe('Performance Tests', () => {
  it('should process 1000 posts within acceptable time', async () => {
    const startTime = performance.now();
    
    const result = await contentWriter.processLargeDataset(mockPosts1000);
    
    const duration = performance.now() - startTime;
    expect(duration).toBeLessThan(5000); // 5 seconds max
    expect(result).toHaveLength(1000);
  });
});
```

## Test Configuration

### Jest Configuration
```javascript
// jest.config.js
export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,js}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Test Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testPathPattern=integration",
    "test:unit": "jest --testPathPattern=unit"
  }
}
```

## Quality Assurance

### Coverage Requirements
- **Minimum 80% coverage** for all code paths
- **100% coverage** for critical services (API, content writer)
- **Integration test coverage** for all CLI commands
- **Performance test coverage** for all major operations

### Code Quality Checks
- **All tests must pass** before merging
- **No console errors** during test execution
- **Clean test output** with meaningful assertions
- **Test performance** within acceptable bounds

## Related Documentation

- [Development Standards](./development-standards.md)
- [Testable Architecture](./testable-architecture.md)
- [API Reference](./api-reference.md)
- [Architecture Overview](./architecture.md)

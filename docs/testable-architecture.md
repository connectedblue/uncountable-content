# Testable Architecture Requirements

Architectural principles and standards for writing maintainable, testable code in the WordPress Content Service. These standards ensure that all code is maintainable, testable, and follows consistent patterns.

## Core Architectural Principles

All new code must follow these architectural principles to maintain code quality and testability.

### Service Layer Separation

**Extract ALL business logic** into dedicated service classes and utility functions:

- **Create service classes** in `src/services/` for core business operations
- **CLI commands are thin orchestrators** that call service methods
- **No business logic in CLI command files** - only argument parsing and service coordination
- **All services must be independently testable** without CLI dependencies

This separation ensures that business logic can be thoroughly tested in isolation from the command-line interface.

### Service Design Standards

Services must follow consistent design patterns:

- **Single Responsibility Principle** - each service has one clear purpose
- **Dependency Injection** - services receive their dependencies as constructor parameters
- **Interface-based Design** - all services implement clear TypeScript interfaces
- **Error Handling** - consistent error types and handling across all services

### Test File Standards

Test files must maintain strict separation between test logic and business logic:

- **NEVER define business functions in test files** - all functions must be imported from source code
- **Import all testable services** from their respective modules
- **Test files should ONLY contain:**
  - Import statements for services and types
  - Test data/mocks and fixtures
  - Test cases and assertions
  - Test setup and teardown helpers (not business logic)

### File Organization Requirements

Maintain consistent file organization across the codebase:

- **Service modules** for each logical domain (e.g., `WordPressApiService`, `ContentWriterService`)
- **Export all public methods** that need testing from service classes
- **Use TypeScript interfaces** for consistent type definitions across services and tests
- **Document service methods** with JSDoc comments including parameters, returns, and exceptions

### DRY Principle Enforcement

Eliminate code duplication through proper service organization:

- **Single source of truth** - each service method exists in exactly one place
- **No duplicate implementations** between test files and source code
- **Shared logic goes in utilities** - import everywhere it's needed
- **Consistent service interfaces** across all usage locations

## Implementation Patterns

### Recommended Service Structure

```typescript
// ✅ GOOD: src/services/WordPressApiService.ts

export interface WordPressApiConfig {
  apiUrl: string;
  timeout: number;
  retryAttempts: number;
}

export interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
}

/**
 * Service for interacting with WordPress REST APIs
 */
export class WordPressApiService {
  constructor(private config: WordPressApiConfig) {}

  /**
   * Fetches posts from WordPress site with pagination
   * 
   * @param siteUrl - WordPress site URL
   * @param page - Page number to fetch (default: 1)
   * @param perPage - Posts per page (default: 100)
   * @returns Promise resolving to array of WordPress posts
   * 
   * @throws {ApiError} When WordPress API returns error response
   */
  async fetchPosts(
    siteUrl: string, 
    page: number = 1, 
    perPage: number = 100
  ): Promise<WordPressPost[]> {
    // Service implementation here
    const response = await this.makeApiRequest(`${siteUrl}/wp-json/wp/v2/posts`, {
      page,
      per_page: perPage
    });
    
    return this.transformApiResponse(response);
  }

  private async makeApiRequest(url: string, params: Record<string, any>): Promise<any> {
    // API request implementation
  }

  private transformApiResponse(response: any): WordPressPost[] {
    // Transform response data
  }
}
```

### CLI Command Structure

```typescript
// ✅ GOOD: src/cli/full-sync.ts

import { WordPressApiService } from '../services/WordPressApiService.js';
import { ContentWriterService } from '../services/ContentWriterService.js';
import { ConfigService } from '../services/ConfigService.js';

/**
 * CLI command for full content synchronization
 * This is a thin orchestrator that coordinates services
 */
export class FullSyncCommand {
  constructor(
    private apiService: WordPressApiService,
    private writerService: ContentWriterService,
    private configService: ConfigService
  ) {}

  async execute(): Promise<void> {
    console.log('Starting full synchronization...');
    
    try {
      // Get configuration
      const sites = await this.configService.getSiteConfigurations();
      
      // Clear existing content
      await this.writerService.clearAllContent();
      
      // Process each site
      for (const site of sites) {
        await this.processSite(site);
      }
      
      console.log('Full synchronization completed successfully');
    } catch (error) {
      console.error('Full synchronization failed:', error);
      throw error;
    }
  }

  private async processSite(site: SiteConfig): Promise<void> {
    // Orchestrate API service and writer service
    const posts = await this.apiService.fetchAllPosts(site.url);
    await this.writerService.writePostsToMarkdown(posts, site);
  }
}
```

### Anti-Patterns to Avoid

```typescript
// ❌ BAD: Business logic in CLI command
export async function fullSyncCommand() {
  // Don't put WordPress API logic here
  const response = await fetch('https://wordpress.com/wp-json/wp/v2/posts');
  const posts = await response.json();
  
  // Don't put file writing logic here
  for (const post of posts) {
    const markdown = `---\ntitle: ${post.title.rendered}\n---\n${post.content.rendered}`;
    await fs.writeFile(`content/${post.slug}.md`, markdown);
  }
}

// ❌ BAD: Business logic in test files
describe('WordPress Integration', () => {
  // Don't define business functions in test files
  function processWordPressData(data) {
    return data.map(post => ({
      title: post.title.rendered,
      content: post.content.rendered
    }));
  }
  
  it('should process data', () => {
    const result = processWordPressData(mockData);
    expect(result).toBeDefined();
  });
});
```

## Service Testing Standards

### Service Test Structure

```typescript
// ✅ GOOD: src/services/__tests__/WordPressApiService.test.ts

import { WordPressApiService } from '../WordPressApiService.js';
import { mockWordPressResponse } from '../../test/fixtures/wordpress-responses.js';

describe('WordPressApiService', () => {
  let apiService: WordPressApiService;
  
  beforeEach(() => {
    const config = {
      apiUrl: 'https://test.wordpress.com',
      timeout: 5000,
      retryAttempts: 3
    };
    apiService = new WordPressApiService(config);
  });

  describe('fetchPosts', () => {
    it('should fetch posts from WordPress API', async () => {
      // Mock external dependencies
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockWordPressResponse)
      });

      const result = await apiService.fetchPosts('https://example.com');

      expect(result).toHaveLength(mockWordPressResponse.length);
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('content');
    });

    it('should handle API errors gracefully', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(apiService.fetchPosts('https://example.com'))
        .rejects.toThrow('API request failed');
    });
  });
});
```

### Integration Test Patterns

```typescript
// ✅ GOOD: Integration test using service coordination
describe('Full Sync Integration', () => {
  let apiService: WordPressApiService;
  let writerService: ContentWriterService;
  let fullSyncCommand: FullSyncCommand;

  beforeEach(() => {
    // Set up services with test configurations
    apiService = new WordPressApiService(testConfig);
    writerService = new ContentWriterService(testWriterConfig);
    fullSyncCommand = new FullSyncCommand(apiService, writerService, configService);
  });

  it('should perform complete sync workflow', async () => {
    // Mock API responses
    jest.spyOn(apiService, 'fetchAllPosts').mockResolvedValue(mockPosts);
    jest.spyOn(writerService, 'writePostsToMarkdown').mockResolvedValue();

    await fullSyncCommand.execute();

    expect(apiService.fetchAllPosts).toHaveBeenCalled();
    expect(writerService.writePostsToMarkdown).toHaveBeenCalledWith(mockPosts, expect.any(Object));
  });
});
```

## Error Handling Standards

### Consistent Error Types

```typescript
// ✅ GOOD: Consistent error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public apiResponse?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ContentWriterError extends Error {
  constructor(message: string, public filePath?: string) {
    super(message);
    this.name = 'ContentWriterError';
  }
}

// Service methods throw consistent error types
export class WordPressApiService {
  async fetchPosts(siteUrl: string): Promise<WordPressPost[]> {
    try {
      const response = await fetch(`${siteUrl}/wp-json/wp/v2/posts`);
      
      if (!response.ok) {
        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status,
          await response.text()
        );
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Network error: ${error.message}`, 0);
    }
  }
}
```

## Performance Considerations

### Efficient Service Design

- **Lazy loading** - services only initialize resources when needed
- **Connection pooling** - reuse HTTP connections for multiple requests
- **Concurrent processing** - process multiple sites/posts in parallel where safe
- **Memory management** - avoid loading all content into memory simultaneously

### Performance Testing Requirements

```typescript
// ✅ GOOD: Performance testing for services
describe('WordPressApiService Performance', () => {
  it('should handle large datasets efficiently', async () => {
    const startTime = performance.now();
    
    const posts = await apiService.fetchAllPosts('https://large-site.com');
    
    const duration = performance.now() - startTime;
    expect(duration).toBeLessThan(10000); // 10 second max
    expect(posts.length).toBeGreaterThan(1000);
  });

  it('should manage memory usage with large content', async () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    await apiService.fetchAllPosts('https://content-heavy-site.com');
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;
    
    // Should not increase memory by more than 100MB
    expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024);
  });
});
```

## Related Documentation

- [Development Standards](./development-standards.md)
- [Testing Standards](./testing.md)
- [API Reference](./api-reference.md)
- [Architecture Overview](./architecture.md)

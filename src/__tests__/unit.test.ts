/**
 * @fileoverview Unit tests for individual service methods
 * 
 * Tests specific functionality without complex mocking scenarios
 */

import { WordPressApiService, WordPressApiError } from '../services/wordpress-api.js';
import { ContentWriterService } from '../services/content-writer.js';
import { mockSiteConfigs } from './fixtures/index.js';

describe('Service Unit Tests', () => {
  
  describe('WordPressApiService', () => {
    let service: WordPressApiService;
    
    beforeEach(() => {
      service = new WordPressApiService();
    });

    it('should create instance with default config', () => {
      expect(service).toBeInstanceOf(WordPressApiService);
    });

    it('should create instance with custom config', () => {
      const customService = new WordPressApiService({
        timeout: 5000,
        retryAttempts: 3,
        maxPerPage: 50
      });
      expect(customService).toBeInstanceOf(WordPressApiService);
    });

    it('should create WordPressApiError correctly', () => {
      const error = new WordPressApiError(
        'Test error',
        404,
        'https://test.com',
        { error: 'not found' }
      );
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(WordPressApiError);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(404);
      expect(error.siteUrl).toBe('https://test.com');
      expect(error.apiResponse).toEqual({ error: 'not found' });
    });
  });

  describe('ContentWriterService', () => {
    let service: ContentWriterService;
    
    beforeEach(() => {
      service = new ContentWriterService('/test/path');
    });

    it('should create instance with custom path', () => {
      expect(service).toBeInstanceOf(ContentWriterService);
    });

    it('should create instance with default path', () => {
      const defaultService = new ContentWriterService();
      expect(defaultService).toBeInstanceOf(ContentWriterService);
    });
  });

  describe('Configuration validation', () => {
    it('should have valid site configurations', () => {
      expect(Array.isArray(mockSiteConfigs)).toBe(true);
      expect(mockSiteConfigs.length).toBeGreaterThan(0);
      
      mockSiteConfigs.forEach(site => {
        expect(site).toHaveProperty('wp_url');
        expect(site).toHaveProperty('root_slug');
        expect(site).toHaveProperty('site_name');
        
        expect(typeof site.wp_url).toBe('string');
        expect(typeof site.root_slug).toBe('string');
        expect(typeof site.site_name).toBe('string');
        
        // URLs should be valid
        expect(() => new URL(site.wp_url)).not.toThrow();
        
        // Root slugs should not contain invalid characters
        expect(site.root_slug).toMatch(/^[a-z0-9-]+$/);
      });
    });
  });

  describe('Type definitions', () => {
    it('should have proper type structure for mock data', () => {
      const site = mockSiteConfigs[0];
      
      // Required fields
      expect(site.wp_url).toBeDefined();
      expect(site.root_slug).toBeDefined();
      expect(site.site_name).toBeDefined();
      
      // Optional fields should be defined or undefined (not null)
      if (site.category_slug !== undefined) {
        expect(typeof site.category_slug).toBe('string');
      }
      if (site.tag_slug !== undefined) {
        expect(typeof site.tag_slug).toBe('string');
      }
    });
  });
});

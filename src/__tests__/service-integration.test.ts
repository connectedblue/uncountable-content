/**
 * @fileoverview Simple service tests to verify imports and basic functionality
 */

import { WordPressApiService } from '../services/wordpress-api.js';
import { ContentWriterService } from '../services/content-writer.js';
import { mockSiteConfigs, expectedPostRecords } from './fixtures/index.js';

describe('Service Integration', () => {
  it('should import WordPressApiService correctly', () => {
    expect(WordPressApiService).toBeDefined();
    const service = new WordPressApiService();
    expect(service).toBeInstanceOf(WordPressApiService);
  });

  it('should import ContentWriterService correctly', () => {
    expect(ContentWriterService).toBeDefined();
    const service = new ContentWriterService('/test/path');
    expect(service).toBeInstanceOf(ContentWriterService);
  });

  it('should import test fixtures correctly', () => {
    expect(mockSiteConfigs).toBeDefined();
    expect(Array.isArray(mockSiteConfigs)).toBe(true);
    expect(mockSiteConfigs.length).toBeGreaterThan(0);
    
    expect(expectedPostRecords).toBeDefined();
    expect(Array.isArray(expectedPostRecords)).toBe(true);
  });

  it('should have correct site config structure', () => {
    const site = mockSiteConfigs[0];
    expect(site).toHaveProperty('wp_url');
    expect(site).toHaveProperty('root_slug');
    expect(site).toHaveProperty('site_name');
    expect(typeof site.wp_url).toBe('string');
    expect(typeof site.root_slug).toBe('string');
  });

  it('should have correct post record structure', () => {
    const post = expectedPostRecords[0];
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
    expect(post).toHaveProperty('date');
    expect(post).toHaveProperty('type');
  });
});

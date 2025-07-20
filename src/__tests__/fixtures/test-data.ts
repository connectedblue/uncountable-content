/**
 * @fileoverview Test fixtures for WordPress Content Service
 * 
 * Provides mock data and helper functions for testing WordPress API
 * responses and content transformation.
 */

import { SiteConfig, WordPressPost, WordPressMediaItem, PostRecord } from '../../config/sites.js';

/**
 * Mock WordPress site configurations for testing
 */
export const mockSiteConfigs: SiteConfig[] = [
  {
    wp_url: 'https://test-thoughts.example.com',
    root_slug: 'thoughts',
    site_name: 'Test Thoughts',
    category_slug: 'thoughts-on',
    tag_slug: 'topic',
  },
  {
    wp_url: 'https://test-diary.example.com',
    root_slug: 'diary',
    site_name: 'Test Diary',
    category_slug: 'projects',
    tag_slug: 'series',
  },
];

/**
 * Mock WordPress post data
 */
export const mockWordPressPosts: WordPressPost[] = [
  {
    id: 123,
    title: { rendered: 'Test Post Title' },
    content: { rendered: '<p>This is test content</p>' },
    date: '2025-07-20T10:00:00',
    slug: 'test-post-title',
    _embedded: {
      'wp:featuredmedia': [{
        source_url: 'https://example.com/featured-image.jpg',
        media_details: {
          sizes: {
            medium: { source_url: 'https://example.com/featured-medium.jpg', width: 300, height: 200 },
            large: { source_url: 'https://example.com/featured-large.jpg', width: 800, height: 600 }
          }
        }
      }],
      'wp:term': [
        [{ id: 1, name: 'Technology', slug: 'technology' }],
        [{ id: 2, name: 'Testing', slug: 'testing' }]
      ]
    }
  },
  {
    id: 456,
    title: { rendered: 'Another Test Post' },
    content: { rendered: '<p>Another test content</p>' },
    date: '2025-07-19T15:30:00',
    slug: 'another-test-post',
    _embedded: {
      'wp:term': [
        [{ id: 3, name: 'Development', slug: 'development' }],
        []
      ]
    }
  }
];

/**
 * Mock WordPress media item data
 */
export const mockWordPressMedia: WordPressMediaItem[] = [
  {
    id: 789,
    caption: { rendered: 'Test image caption' },
    date: '2025-07-18T12:00:00',
    source_url: 'https://example.com/test-image.jpg',
    media_type: 'image',
    media_details: {
      sizes: {
        thumbnail: { source_url: 'https://example.com/test-thumb.jpg', width: 150, height: 150 },
        medium: { source_url: 'https://example.com/test-medium.jpg', width: 300, height: 300 }
      }
    },
    class_list: ['tag-photography', 'tag-nature'],
    alt_text: 'A beautiful test image'
  },
  {
    id: 999,
    caption: { rendered: '' }, // Empty caption - should be filtered out
    date: '2025-07-17T09:00:00',
    source_url: 'https://example.com/no-caption.jpg',
    media_type: 'image'
  }
];

/**
 * Expected PostRecord results from transformation
 */
export const mockPostRecords: PostRecord[] = [
  {
    id: 123,
    title: { rendered: 'Test Post Title' },
    content: { rendered: '<p>This is test content</p>' },
    date: '2025-07-20T10:00:00',
    slug: 'test-post-title',
    site: 'https://test-thoughts.example.com',
    wp_url: 'https://test-thoughts.example.com',
    root_slug: 'thoughts',
    site_name: 'Test Thoughts',
    featured_media_url: 'https://example.com/featured-image.jpg',
    featured_media_srcset: 'https://example.com/featured-medium.jpg 300w, https://example.com/featured-large.jpg 800w',
    type: 'post',
    category: [{ id: 1, name: 'Technology', slug: 'technology' }],
    tag: [{ id: 2, name: 'Testing', slug: 'testing' }]
  }
];

/**
 * Mock fetch response helper
 */
export function createMockResponse(data: any, ok: boolean = true, status: number = 200): Response {
  return {
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  } as Response;
}

/**
 * Expected markdown content for testing
 */
export const expectedMarkdownContent = `---
id: 123
title: "Test Post Title"
date: "2025-07-20T10:00:00"
slug: "test-post-title"
site: "https://test-thoughts.example.com"
wp_url: "https://test-thoughts.example.com"
root_slug: "thoughts"
site_name: "Test Thoughts"
featured_media_url: "https://example.com/featured-image.jpg"
featured_media_srcset: "https://example.com/featured-medium.jpg 300w, https://example.com/featured-large.jpg 800w"
type: "post"
category:
  - name: "Technology"
    slug: "technology"
    id: 1
tag:
  - name: "Testing"
    slug: "testing"
    id: 2
---

<p>This is test content</p>`;

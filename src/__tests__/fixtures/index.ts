/**
 * @fileoverview Test fixtures for WordPress Content Service tests
 * 
 * Contains mock data structures that mirror real WordPress API responses
 * and expected outputs for consistent testing across the test suite.
 */

import type { 
  SiteConfig, 
  WordPressPost, 
  WordPressMediaItem, 
  PostRecord 
} from '../../config/sites.js';

/**
 * Mock site configurations for testing
 */
export const mockSiteConfigs: SiteConfig[] = [
  {
    wp_url: 'https://test-thoughts.example.com',
    root_slug: 'thoughts',
    site_name: 'Test Thoughts',
    category_slug: 'test-categories',
    tag_slug: 'test-tags',
  },
  {
    wp_url: 'https://test-diary.example.com',
    root_slug: 'diary', 
    site_name: 'Test Diary',
    category_slug: 'test-projects',
    tag_slug: 'test-series',
  },
];

/**
 * Mock WordPress post response data
 */
export const mockWordPressPosts: WordPressPost[] = [
  {
    id: 123,
    title: { rendered: 'Test Blog Post' },
    content: { rendered: '<p>This is test content with <strong>HTML</strong>.</p>' },
    date: '2025-07-20T10:00:00Z',
    slug: 'test-blog-post',
    _embedded: {
      'wp:featuredmedia': [{
        source_url: 'https://example.com/featured-image.jpg',
        media_details: {
          sizes: {
            thumbnail: { source_url: 'https://example.com/thumb.jpg', width: 150 },
            medium: { source_url: 'https://example.com/medium.jpg', width: 300 },
            large: { source_url: 'https://example.com/large.jpg', width: 800 }
          }
        }
      }],
      'wp:term': [
        [{ id: 1, name: 'Technology', slug: 'tech' }],
        [{ id: 10, name: 'JavaScript', slug: 'javascript' }]
      ]
    }
  },
  {
    id: 124,
    title: { rendered: 'Another Test Post' },
    content: { rendered: '<p>More test content here.</p>' },
    date: '2025-07-19T15:30:00Z',
    slug: 'another-test-post',
    _embedded: {
      'wp:term': [
        [{ id: 2, name: 'Development', slug: 'dev' }],
        []
      ]
    }
  }
];

/**
 * Mock WordPress media item response data
 */
export const mockWordPressMedia: WordPressMediaItem[] = [
  {
    id: 456,
    caption: { rendered: 'Test media caption with description' },
    date: '2025-07-18T12:00:00Z',
    source_url: 'https://example.com/test-image.jpg',
    media_type: 'image',
    media_details: {
      sizes: {
        thumbnail: { source_url: 'https://example.com/test-thumb.jpg', width: 150, height: 150 },
        medium: { source_url: 'https://example.com/test-medium.jpg', width: 300, height: 200 }
      }
    },
    class_list: ['tag-photography', 'tag-nature'],
    alt_text: 'Beautiful nature photograph'
  },
  {
    id: 457,
    caption: { rendered: '' }, // Empty caption - should be filtered out
    date: '2025-07-17T09:00:00Z',
    source_url: 'https://example.com/no-caption.jpg',
    media_type: 'image'
  }
];

/**
 * Expected PostRecord outputs from transformed WordPress data
 */
export const expectedPostRecords: PostRecord[] = [
  {
    id: 123,
    title: { rendered: 'Test Blog Post' },
    content: { rendered: '<p>This is test content with <strong>HTML</strong>.</p>' },
    date: '2025-07-20T10:00:00Z',
    slug: 'test-blog-post',
    site: 'https://test-thoughts.example.com',
    wp_url: 'https://test-thoughts.example.com',
    root_slug: 'thoughts',
    site_name: 'Test Thoughts',
    featured_media_url: 'https://example.com/featured-image.jpg',
    featured_media_srcset: 'https://example.com/thumb.jpg 150w, https://example.com/medium.jpg 300w, https://example.com/large.jpg 800w',
    type: 'post',
    category: [{ id: 1, name: 'Technology', slug: 'tech' }],
    tag: [{ id: 10, name: 'JavaScript', slug: 'javascript' }]
  },
  {
    id: 'media-456',
    title: { rendered: 'Test media caption with description' },
    content: { rendered: '' },
    date: '2025-07-18T12:00:00Z',
    slug: '2025-07-18-test-media-caption-with-description',
    site: 'https://test-thoughts.example.com',
    wp_url: 'https://test-thoughts.example.com',
    root_slug: 'thoughts',
    site_name: 'Test Thoughts',
    featured_media_url: 'https://example.com/test-image.jpg',
    featured_media_srcset: 'https://example.com/test-thumb.jpg 150w, https://example.com/test-medium.jpg 300w',
    type: 'media',
    media_details: {
      sizes: {
        thumbnail: { source_url: 'https://example.com/test-thumb.jpg', width: 150, height: 150 },
        medium: { source_url: 'https://example.com/test-medium.jpg', width: 300, height: 200 }
      }
    },
    source_url: 'https://example.com/test-image.jpg',
    category: [],
    tag: [
      { id: 0, name: 'photography', slug: 'photography' },
      { id: 1, name: 'nature', slug: 'nature' }
    ]
  }
];

/**
 * Mock API response for successful fetch
 */
export const mockSuccessfulApiResponse = {
  ok: true,
  status: 200,
  json: jest.fn()
};

/**
 * Mock API response for error scenarios
 */
export const mockErrorApiResponse = {
  ok: false,
  status: 500,
  statusText: 'Internal Server Error',
  text: jest.fn().mockResolvedValue('Server Error')
};

/**
 * Expected markdown content output
 */
export const expectedMarkdownContent = `---
id: 123
title: "Test Blog Post"
date: "2025-07-20T10:00:00Z"
slug: "test-blog-post"
site: "https://test-thoughts.example.com"
wp_url: "https://test-thoughts.example.com"
root_slug: "thoughts"
site_name: "Test Thoughts"
featured_media_url: "https://example.com/featured-image.jpg"
featured_media_srcset: "https://example.com/thumb.jpg 150w, https://example.com/medium.jpg 300w, https://example.com/large.jpg 800w"
type: "post"
category:
  - name: "Technology"
    slug: "tech"
    id: 1
tag:
  - name: "JavaScript"
    slug: "javascript"
    id: 10
---

<p>This is test content with <strong>HTML</strong>.</p>`;

/**
 * Content statistics mock data
 */
export const mockContentStats = {
  totalFiles: 5,
  postFiles: 3,
  mediaFiles: 2,
  totalSize: 12840
};

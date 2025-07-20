/**
 * @fileoverview WordPress site configuration and type definitions
 * 
 * This module contains the configuration for WordPress sites to be synchronized
 * and the TypeScript interfaces that define the data structures used throughout
 * the WordPress Content Service.
 * 
 * @author WordPress Content Service
 * @version 1.0.0
 */

/**
 * Configuration for a WordPress site to be synchronized
 */
export interface SiteConfig {
  /** WordPress site URL (e.g., 'https://thoughts.uncountable.uk') */
  wp_url: string;
  /** Root slug for routing (e.g., 'thoughts', 'diary') */
  root_slug: string;
  /** Human-readable site name (e.g., 'My Thoughts') */
  site_name: string;
  /** Category taxonomy slug (e.g., 'thoughts-on', 'projects') */
  category_slug: string;
  /** Tag taxonomy slug (e.g., 'topic', 'series') */
  tag_slug: string;
}

/**
 * Raw WordPress post data structure from the REST API
 */
export interface WordPressPost {
  /** WordPress post ID */
  id: number;
  /** Post title with rendered HTML */
  title: { rendered: string };
  /** Post content with rendered HTML */
  content: { rendered: string };
  /** ISO date string when post was published */
  date: string;
  /** URL slug for the post */
  slug: string;
  /** Embedded data from WordPress API (featured media, terms, etc.) */
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: any;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    [key: string]: any;
  };
  /** Additional WordPress fields */
  [key: string]: any;
}

/**
 * WordPress media item data structure from the REST API
 */
export interface WordPressMediaItem {
  /** WordPress media ID */
  id: number;
  /** Media caption with rendered HTML */
  caption: { rendered: string };
  /** ISO date string when media was uploaded */
  date: string;
  /** Direct URL to the media file */
  source_url: string;
  /** Media type (image, video, etc.) */
  media_type: string;
  /** Detailed media metadata including sizes */
  media_details?: {
    sizes?: Record<string, {
      source_url: string;
      width: number;
      height: number;
    }>;
    [key: string]: any;
  };
  /** CSS classes applied to the media item */
  class_list?: string[];
  /** Responsive image srcset string */
  srcset?: string;
  /** Accessible alt text for the media */
  alt?: string;
  /** Alternative text from WordPress */
  alt_text?: string;
  /** Additional WordPress fields */
  [key: string]: any;
}

/**
 * Unified post record structure used throughout the system
 * This represents both WordPress posts and media items in a consistent format
 */
export interface PostRecord {
  /** Unique identifier (post ID or media-{id}) */
  id: string | number;
  /** Post title with rendered HTML */
  title: { rendered: string };
  /** Post content with rendered HTML */
  content: { rendered: string };
  /** ISO date string when content was published */
  date: string;
  /** URL slug for the content */
  slug: string;
  /** WordPress site URL this content came from */
  site: string;
  /** WordPress site URL (same as site, for compatibility) */
  wp_url: string;
  /** Root slug for routing */
  root_slug: string;
  /** Human-readable site name */
  site_name: string;
  /** URL to featured media image, if any */
  featured_media_url: string | null;
  /** Responsive image srcset for featured media */
  featured_media_srcset: string | null;
  /** Content type: 'post' or 'media' */
  type?: string;
  /** Media metadata (for media items) */
  media_details?: any;
  /** Direct media URL (for media items) */
  source_url?: string;
  /** Array of category objects */
  category: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  /** Array of tag objects */
  tag: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  /** Text snippet for previews (generated) */
  snippet?: string;
  /** Full URL to the post (generated) */
  post_url?: string;
  /** Formatted post date (generated) */
  post_date?: string;
  /** Day format with ordinal suffix (generated) */
  day_format_date?: string;
  /** Additional fields for custom WordPress data */
  [key: string]: any;
}

/**
 * Configuration for WordPress sites to be synchronized
 * 
 * Each site configuration defines:
 * - API endpoint for fetching content
 * - Routing information for the main application
 * - Taxonomy configuration for categories and tags
 */
export const WORDPRESS_SITES: SiteConfig[] = [
  {
    wp_url: 'https://thoughts.uncountable.uk',
    root_slug: 'thoughts',
    site_name: 'My Thoughts',
    category_slug: 'thoughts-on',
    tag_slug: 'topic',
  },
  {
    wp_url: 'https://diary.uncountable.uk',
    root_slug: 'diary',
    site_name: 'My Diary',
    category_slug: 'projects',
    tag_slug: 'series',
  },
];

/**
 * API configuration options for WordPress requests
 */
export interface ApiConfig {
  /** Request timeout in milliseconds */
  timeout: number;
  /** Number of retry attempts for failed requests */
  retryAttempts: number;
  /** Delay between retry attempts in milliseconds */
  retryDelay: number;
  /** Maximum posts per page to request */
  maxPerPage: number;
}

/**
 * Default API configuration
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  maxPerPage: 100,
};

/**
 * Content synchronization options
 */
export interface SyncOptions {
  /** Only fetch content modified after this date */
  sinceDate?: Date;
  /** Clear existing content before sync */
  clearExisting?: boolean;
  /** Maximum number of concurrent API requests */
  concurrency?: number;
}

/**
 * Default synchronization options
 */
export const DEFAULT_SYNC_OPTIONS: SyncOptions = {
  clearExisting: false,
  concurrency: 3,
};

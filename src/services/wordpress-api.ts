/**
 * @fileoverview WordPress REST API service for fetching posts and media
 * 
 * This service handles all interactions with WordPress REST APIs, including:
 * - Fetching posts with pagination
 * - Fetching media items with captions
 * - Processing embedded data (featured media, taxonomies)
 * - Error handling and retry logic
 * - Rate limiting and performance optimization
 * 
 * @author WordPress Content Service
 * @version 1.0.0
 */

import {
  SiteConfig,
  WordPressPost,
  WordPressMediaItem,
  PostRecord,
  ApiConfig,
  DEFAULT_API_CONFIG
} from '../config/sites.js';

/**
 * Custom error class for WordPress API failures
 */
export class WordPressApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public siteUrl: string,
    public apiResponse?: any
  ) {
    super(message);
    this.name = 'WordPressApiError';
  }
}

/**
 * Service for interacting with WordPress REST APIs
 * 
 * Provides methods for fetching posts and media items from WordPress sites
 * with comprehensive error handling, retry logic, and performance optimization.
 */
export class WordPressApiService {
  private config: ApiConfig;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...DEFAULT_API_CONFIG, ...config };
  }

  /**
   * Fetches all posts from a WordPress site with pagination
   * 
   * @param siteConfig - Configuration for the WordPress site
   * @param sinceDate - Optional date to fetch posts modified since
   * @returns Promise resolving to array of PostRecord objects
   * 
   * @example
   * ```typescript
   * const apiService = new WordPressApiService();
   * const posts = await apiService.fetchAllPosts(siteConfig);
   * console.log(`Fetched ${posts.length} posts`);
   * ```
   * 
   * @throws {WordPressApiError} When API requests fail
   */
  async fetchAllPosts(siteConfig: SiteConfig, sinceDate?: Date): Promise<PostRecord[]> {
    console.log(`Fetching posts from ${siteConfig.site_name} (${siteConfig.wp_url})`);
    
    const allPosts: PostRecord[] = [];
    
    try {
      // Fetch regular posts
      const posts = await this.fetchPosts(siteConfig, sinceDate);
      allPosts.push(...posts);
      
      // Fetch media items with captions
      const mediaPosts = await this.fetchMediaWithCaptions(siteConfig, sinceDate);
      allPosts.push(...mediaPosts);
      
      console.log(`Successfully fetched ${allPosts.length} items from ${siteConfig.site_name}`);
      return allPosts;
      
    } catch (error) {
      console.error(`Failed to fetch content from ${siteConfig.site_name}:`, error);
      throw error;
    }
  }

  /**
   * Fetches posts from a WordPress site with pagination
   * 
   * @param siteConfig - Configuration for the WordPress site
   * @param sinceDate - Optional date to fetch posts modified since
   * @returns Promise resolving to array of PostRecord objects
   */
  private async fetchPosts(siteConfig: SiteConfig, sinceDate?: Date): Promise<PostRecord[]> {
    const posts: PostRecord[] = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      try {
        const url = this.buildPostsUrl(siteConfig.wp_url, page, sinceDate);
        console.log(`Fetching posts page ${page} from ${siteConfig.wp_url}`);
        
        const response = await this.makeApiRequest(url);
        const wpPosts: WordPressPost[] = await response.json();
        
        if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
          hasMore = false;
          break;
        }
        
        // Transform WordPress posts to PostRecord format
        const transformedPosts = wpPosts.map(post => 
          this.transformPostToRecord(post, siteConfig)
        );
        
        posts.push(...transformedPosts);
        
        // Check if we've reached the end
        if (wpPosts.length < this.config.maxPerPage) {
          hasMore = false;
        } else {
          page++;
        }
        
      } catch (error) {
        console.error(`Error fetching posts page ${page} from ${siteConfig.wp_url}:`, error);
        throw new WordPressApiError(
          `Failed to fetch posts page ${page}`,
          0,
          siteConfig.wp_url,
          error
        );
      }
    }
    
    return posts;
  }

  /**
   * Fetches media items with captions from a WordPress site
   * 
   * @param siteConfig - Configuration for the WordPress site
   * @param sinceDate - Optional date to fetch media modified since
   * @returns Promise resolving to array of PostRecord objects for media items
   */
  private async fetchMediaWithCaptions(siteConfig: SiteConfig, sinceDate?: Date): Promise<PostRecord[]> {
    const mediaPosts: PostRecord[] = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      try {
        const url = this.buildMediaUrl(siteConfig.wp_url, page, sinceDate);
        console.log(`Fetching media page ${page} from ${siteConfig.wp_url}`);
        
        const response = await this.makeApiRequest(url);
        const mediaItems: WordPressMediaItem[] = await response.json();
        
        if (!Array.isArray(mediaItems) || mediaItems.length === 0) {
          hasMore = false;
          break;
        }
        
        // Filter for items with captions and transform to PostRecord format
        const mediaWithCaptions = mediaItems
          .filter(item => item.caption?.rendered && item.caption.rendered.trim() !== '')
          .map(item => this.transformMediaToRecord(item, siteConfig));
        
        mediaPosts.push(...mediaWithCaptions);
        
        // Check if we've reached the end
        if (mediaItems.length < this.config.maxPerPage) {
          hasMore = false;
        } else {
          page++;
        }
        
      } catch (error) {
        console.error(`Error fetching media page ${page} from ${siteConfig.wp_url}:`, error);
        // Continue on media fetch errors - don't fail the entire sync
        break;
      }
    }
    
    console.log(`Found ${mediaPosts.length} media items with captions from ${siteConfig.wp_url}`);
    return mediaPosts;
  }

  /**
   * Builds URL for fetching posts from WordPress REST API
   */
  private buildPostsUrl(siteUrl: string, page: number, sinceDate?: Date): string {
    const url = new URL(`${siteUrl}/wp-json/wp/v2/posts`);
    url.searchParams.set('per_page', this.config.maxPerPage.toString());
    url.searchParams.set('page', page.toString());
    url.searchParams.set('_embed', 'true');
    
    if (sinceDate) {
      url.searchParams.set('modified_after', sinceDate.toISOString());
    }
    
    return url.toString();
  }

  /**
   * Builds URL for fetching media from WordPress REST API
   */
  private buildMediaUrl(siteUrl: string, page: number, sinceDate?: Date): string {
    const url = new URL(`${siteUrl}/wp-json/wp/v2/media`);
    url.searchParams.set('per_page', this.config.maxPerPage.toString());
    url.searchParams.set('page', page.toString());
    
    if (sinceDate) {
      url.searchParams.set('modified_after', sinceDate.toISOString());
    }
    
    return url.toString();
  }

  /**
   * Makes an HTTP request with retry logic and error handling
   */
  private async makeApiRequest(url: string): Promise<Response> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'WordPress-Content-Service/1.0.0',
            'Accept': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new WordPressApiError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            url,
            await response.text()
          );
        }
        
        return response;
        
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < this.config.retryAttempts) {
          console.warn(`Request failed (attempt ${attempt}/${this.config.retryAttempts}), retrying in ${this.config.retryDelay}ms...`);
          await this.delay(this.config.retryDelay);
        }
      }
    }
    
    throw lastError || new Error('Request failed after all retry attempts');
  }

  /**
   * Transforms a WordPress post to PostRecord format
   */
  private transformPostToRecord(post: WordPressPost, siteConfig: SiteConfig): PostRecord {
    // Extract featured media information
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const featuredMediaUrl = featuredMedia?.source_url || null;
    
    // Generate srcset for featured media
    let featuredMediaSrcset: string | null = null;
    if (featuredMedia?.media_details?.sizes) {
      const sizes = featuredMedia.media_details.sizes;
      featuredMediaSrcset = Object.values(sizes)
        .map((size: any) => `${size.source_url} ${size.width}w`)
        .join(', ');
    }
    
    // Extract taxonomies
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const tags = post._embedded?.['wp:term']?.[1] || [];
    
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      date: post.date,
      slug: post.slug,
      site: siteConfig.wp_url,
      wp_url: siteConfig.wp_url,
      root_slug: siteConfig.root_slug,
      site_name: siteConfig.site_name,
      featured_media_url: featuredMediaUrl,
      featured_media_srcset: featuredMediaSrcset,
      type: 'post',
      category: categories,
      tag: tags,
    };
  }

  /**
   * Transforms a WordPress media item to PostRecord format
   */
  private transformMediaToRecord(media: WordPressMediaItem, siteConfig: SiteConfig): PostRecord {
    // Extract clean caption text for slug generation
    const cleanCaption = media.caption.rendered.replace(/<[^>]*>/g, '').trim();
    
    // Generate slug in format YYYY-MM-DD-caption-with-hyphens
    const mediaDate = new Date(media.date);
    const year = mediaDate.getFullYear();
    const month = String(mediaDate.getMonth() + 1).padStart(2, '0');
    const day = String(mediaDate.getDate()).padStart(2, '0');
    const captionSlug = cleanCaption
      .toLowerCase()
      .replace(/[^a-z0-9\\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple consecutive hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    const slug = `${year}-${month}-${day}-${captionSlug}`;
    
    // Generate srcset for media item
    let srcset: string | null = null;
    if (media.media_details?.sizes) {
      const sizes = media.media_details.sizes;
      srcset = Object.values(sizes)
        .map((size: any) => `${size.source_url} ${size.width}w`)
        .join(', ');
    }
    
    // Extract tags from class_list
    const mediaTags: Array<{ id: number; name: string; slug: string }> = [];
    if (media.class_list && Array.isArray(media.class_list)) {
      media.class_list.forEach((className, index) => {
        if (className.startsWith('tag-')) {
          const tagName = className.replace('tag-', '');
          mediaTags.push({
            id: index,
            name: tagName,
            slug: tagName,
          });
        }
      });
    }
    
    // Note: alt text handling available for future use if needed
    // const alt = media.alt_text?.trim() || cleanCaption;
    
    return {
      id: `media-${media.id}`,
      title: { rendered: cleanCaption },
      content: { rendered: '' },
      date: media.date,
      slug: slug,
      site: siteConfig.wp_url,
      wp_url: siteConfig.wp_url,
      root_slug: siteConfig.root_slug,
      site_name: siteConfig.site_name,
      featured_media_url: media.source_url,
      featured_media_srcset: srcset,
      type: 'media',
      media_details: media.media_details,
      source_url: media.source_url,
      category: [],
      tag: mediaTags,
    };
  }

  /**
   * Utility function to delay execution
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

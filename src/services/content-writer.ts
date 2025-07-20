/**
 * @fileoverview Content writer service for generating markdown files
 * 
 * This service handles the creation and management of markdown files with YAML frontmatter
 * from WordPress content. It provides functionality for:
 * - Writing PostRecord data to markdown files
 * - Generating YAML frontmatter with all metadata
 * - Creating proper file naming conventions
 * - Managing the content directory structure
 * - Cleaning up existing content
 * 
 * @author WordPress Content Service
 * @version 1.0.0
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { PostRecord, SiteConfig } from '../config/sites.js';

/**
 * Custom error class for content writing failures
 */
export class ContentWriterError extends Error {
  constructor(
    message: string,
    public filePath?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ContentWriterError';
  }
}

/**
 * Service for writing WordPress content to markdown files
 * 
 * Manages the creation of markdown files with YAML frontmatter from PostRecord data.
 * Handles file naming, directory structure, and content formatting.
 */
export class ContentWriterService {
  private contentDir: string;

  constructor(contentDir: string = './content') {
    this.contentDir = contentDir;
  }

  /**
   * Writes an array of posts to markdown files
   * 
   * @param posts - Array of PostRecord objects to write
   * @param siteConfig - Configuration for the WordPress site
   * @returns Promise resolving to array of written file paths
   * 
   * @example
   * ```typescript
   * const writer = new ContentWriterService('./content');
   * const filePaths = await writer.writePostsToMarkdown(posts, siteConfig);
   * console.log(`Wrote ${filePaths.length} files`);
   * ```
   * 
   * @throws {ContentWriterError} When file writing fails
   */
  async writePostsToMarkdown(posts: PostRecord[], siteConfig: SiteConfig): Promise<string[]> {
    console.log(`Writing ${posts.length} posts from ${siteConfig.site_name} to markdown files`);
    
    try {
      // Ensure content directory exists
      await this.ensureContentDirectory();
      
      const filePaths: string[] = [];
      
      // Write each post to a markdown file
      for (const post of posts) {
        const filePath = await this.writePostToMarkdown(post);
        filePaths.push(filePath);
      }
      
      console.log(`Successfully wrote ${filePaths.length} markdown files for ${siteConfig.site_name}`);
      return filePaths;
      
    } catch (error) {
      console.error(`Failed to write posts for ${siteConfig.site_name}:`, error);
      throw new ContentWriterError(
        `Failed to write posts for ${siteConfig.site_name}`,
        undefined,
        error as Error
      );
    }
  }

  /**
   * Writes a single post to a markdown file
   * 
   * @param post - PostRecord to write to markdown
   * @returns Promise resolving to the written file path
   * 
   * @throws {ContentWriterError} When file writing fails
   */
  async writePostToMarkdown(post: PostRecord): Promise<string> {
    try {
      const fileName = this.generateFileName(post);
      const filePath = join(this.contentDir, fileName);
      const markdownContent = this.generateMarkdownContent(post);
      
      await fs.writeFile(filePath, markdownContent, 'utf-8');
      console.log(`Wrote markdown file: ${fileName}`);
      
      return filePath;
      
    } catch (error) {
      throw new ContentWriterError(
        `Failed to write post ${post.id} to markdown`,
        undefined,
        error as Error
      );
    }
  }

  /**
   * Clears all content from the content directory
   * 
   * @returns Promise resolving when cleanup is complete
   * 
   * @example
   * ```typescript
   * const writer = new ContentWriterService('./content');
   * await writer.clearAllContent();
   * console.log('All content cleared');
   * ```
   * 
   * @throws {ContentWriterError} When cleanup fails
   */
  async clearAllContent(): Promise<void> {
    console.log('Clearing all existing content...');
    
    try {
      // Check if content directory exists
      try {
        await fs.access(this.contentDir);
      } catch {
        // Directory doesn't exist, nothing to clear
        console.log('Content directory does not exist, nothing to clear');
        return;
      }
      
      // Read all files in content directory
      const files = await fs.readdir(this.contentDir);
      const markdownFiles = files.filter(file => file.endsWith('.md'));
      
      // Delete all markdown files
      for (const file of markdownFiles) {
        const filePath = join(this.contentDir, file);
        await fs.unlink(filePath);
      }
      
      console.log(`Cleared ${markdownFiles.length} markdown files`);
      
    } catch (error) {
      throw new ContentWriterError(
        'Failed to clear existing content',
        this.contentDir,
        error as Error
      );
    }
  }

  /**
   * Gets statistics about the current content directory
   * 
   * @returns Promise resolving to content statistics
   */
  async getContentStats(): Promise<{
    totalFiles: number;
    postFiles: number;
    mediaFiles: number;
    totalSize: number;
  }> {
    try {
      await fs.access(this.contentDir);
    } catch {
      return { totalFiles: 0, postFiles: 0, mediaFiles: 0, totalSize: 0 };
    }
    
    const files = await fs.readdir(this.contentDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    let totalSize = 0;
    let postFiles = 0;
    let mediaFiles = 0;
    
    for (const file of markdownFiles) {
      const filePath = join(this.contentDir, file);
      const stats = await fs.stat(filePath);
      totalSize += stats.size;
      
      if (file.startsWith('media-')) {
        mediaFiles++;
      } else {
        postFiles++;
      }
    }
    
    return {
      totalFiles: markdownFiles.length,
      postFiles,
      mediaFiles,
      totalSize,
    };
  }

  /**
   * Generates the filename for a post following the [root_slug]-[post_id].md convention
   */
  private generateFileName(post: PostRecord): string {
    const sanitizedId = String(post.id).replace(/[^a-zA-Z0-9-]/g, '');
    return `${post.root_slug}-${sanitizedId}.md`;
  }

  /**
   * Generates the complete markdown content with YAML frontmatter
   */
  private generateMarkdownContent(post: PostRecord): string {
    const frontmatter = this.generateYamlFrontmatter(post);
    const content = post.content.rendered || '';
    
    return `---\n${frontmatter}\n---\n\n${content}`;
  }

  /**
   * Generates YAML frontmatter from PostRecord data
   */
  private generateYamlFrontmatter(post: PostRecord): string {
    const yaml: string[] = [];
    
    // Basic post information
    yaml.push(`id: ${this.escapeYamlValue(post.id)}`);
    yaml.push(`title: ${this.escapeYamlValue(post.title.rendered)}`);
    yaml.push(`date: ${this.escapeYamlValue(post.date)}`);
    yaml.push(`slug: ${this.escapeYamlValue(post.slug)}`);
    
    // Site information
    yaml.push(`site: ${this.escapeYamlValue(post.site)}`);
    yaml.push(`wp_url: ${this.escapeYamlValue(post.wp_url)}`);
    yaml.push(`root_slug: ${this.escapeYamlValue(post.root_slug)}`);
    yaml.push(`site_name: ${this.escapeYamlValue(post.site_name)}`);
    
    // Media information
    if (post.featured_media_url) {
      yaml.push(`featured_media_url: ${this.escapeYamlValue(post.featured_media_url)}`);
    } else {
      yaml.push(`featured_media_url: null`);
    }
    
    if (post.featured_media_srcset) {
      yaml.push(`featured_media_srcset: ${this.escapeYamlValue(post.featured_media_srcset)}`);
    } else {
      yaml.push(`featured_media_srcset: null`);
    }
    
    // Content type and additional metadata
    if (post.type) {
      yaml.push(`type: ${this.escapeYamlValue(post.type)}`);
    }
    
    if (post.source_url) {
      yaml.push(`source_url: ${this.escapeYamlValue(post.source_url)}`);
    }
    
    // Media details (for media items)
    if (post.media_details) {
      yaml.push(`media_details: ${JSON.stringify(post.media_details)}`);
    }
    
    // Categories
    if (post.category && post.category.length > 0) {
      yaml.push('category:');
      post.category.forEach(cat => {
        yaml.push(`  - name: ${this.escapeYamlValue(cat.name || '')}`);
        yaml.push(`    slug: ${this.escapeYamlValue(cat.slug || '')}`);
        if (cat.id) {
          yaml.push(`    id: ${cat.id}`);
        }
      });
    } else {
      yaml.push('category: []');
    }
    
    // Tags
    if (post.tag && post.tag.length > 0) {
      yaml.push('tag:');
      post.tag.forEach(tag => {
        yaml.push(`  - name: ${this.escapeYamlValue(tag.name || '')}`);
        yaml.push(`    slug: ${this.escapeYamlValue(tag.slug || '')}`);
        if (tag.id) {
          yaml.push(`    id: ${tag.id}`);
        }
      });
    } else {
      yaml.push('tag: []');
    }
    
    // Generated fields (these will be populated by the main app)
    if (post.snippet) {
      yaml.push(`snippet: ${this.escapeYamlValue(post.snippet)}`);
    }
    
    if (post.post_url) {
      yaml.push(`post_url: ${this.escapeYamlValue(post.post_url)}`);
    }
    
    if (post.post_date) {
      yaml.push(`post_date: ${this.escapeYamlValue(post.post_date)}`);
    }
    
    if (post.day_format_date) {
      yaml.push(`day_format_date: ${this.escapeYamlValue(post.day_format_date)}`);
    }
    
    return yaml.join('\\n');
  }

  /**
   * Escapes and quotes YAML values appropriately
   */
  private escapeYamlValue(value: any): string {
    if (value === null || value === undefined) {
      return 'null';
    }
    
    const str = String(value);
    
    // If the string contains special YAML characters, quote it
    if (str.includes(':') || str.includes('"') || str.includes("'") || 
        str.includes('\\n') || str.includes('#') || str.trim() !== str) {
      // Escape double quotes and wrap in double quotes
      return `"${str.replace(/"/g, '\\\\"')}"`;
    }
    
    // Return unquoted if safe
    return str;
  }

  /**
   * Ensures the content directory exists
   */
  private async ensureContentDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.contentDir, { recursive: true });
    } catch (error) {
      throw new ContentWriterError(
        `Failed to create content directory: ${this.contentDir}`,
        this.contentDir,
        error as Error
      );
    }
  }
}

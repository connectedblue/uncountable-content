#!/usr/bin/env node

/**
 * @fileoverview Command-line interface for the WordPress Content Service
 * 
 * This is the main entry point for the WordPress Content Service CLI.
 * It provides commands for synchronizing WordPress content to markdown files:
 * - full: Complete synchronization of all content
 * - latest: Incremental synchronization of recent content
 * - clean: Remove all generated content files
 * 
 * @author WordPress Content Service
 * @version 1.0.0
 */

import { Command } from 'commander';
import { WordPressApiService } from './services/wordpress-api.js';
import { ContentWriterService } from './services/content-writer.js';
import { WORDPRESS_SITES } from './config/sites.js';

/**
 * Main CLI application class
 * 
 * Orchestrates the WordPress API service and content writer service
 * to provide a complete content synchronization workflow.
 */
class WordPressContentCli {
  private apiService: WordPressApiService;
  private writerService: ContentWriterService;

  constructor() {
    this.apiService = new WordPressApiService();
    this.writerService = new ContentWriterService('./content');
  }

  /**
   * Executes full content synchronization
   * 
   * Fetches all posts and media from all configured WordPress sites
   * and writes them to markdown files, replacing any existing content.
   */
  async executeFullSync(): Promise<void> {
    console.log('🔄 Starting full content synchronization...');
    console.log(`📍 Configured sites: ${WORDPRESS_SITES.length}`);
    
    try {
      const startTime = Date.now();
      
      // Clear existing content
      console.log('🧹 Clearing existing content...');
      await this.writerService.clearAllContent();
      
      let totalPosts = 0;
      
      // Process each configured WordPress site
      for (const siteConfig of WORDPRESS_SITES) {
        console.log(`\\n📥 Processing ${siteConfig.site_name}...`);
        
        try {
          // Fetch all posts from the site
          const posts = await this.apiService.fetchAllPosts(siteConfig);
          
          // Write posts to markdown files
          const filePaths = await this.writerService.writePostsToMarkdown(posts, siteConfig);
          
          totalPosts += posts.length;
          console.log(`✅ Completed ${siteConfig.site_name}: ${posts.length} items, ${filePaths.length} files written`);
          
        } catch (error) {
          console.error(`❌ Failed to process ${siteConfig.site_name}:`, error);
          // Continue with other sites even if one fails
        }
      }
      
      const duration = Date.now() - startTime;
      const stats = await this.writerService.getContentStats();
      
      console.log('\\n🎉 Full synchronization completed!');
      console.log(`📊 Total items processed: ${totalPosts}`);
      console.log(`📁 Files written: ${stats.totalFiles} (${stats.postFiles} posts, ${stats.mediaFiles} media)`);
      console.log(`💾 Total size: ${this.formatBytes(stats.totalSize)}`);
      console.log(`⏱️  Duration: ${this.formatDuration(duration)}`);
      
    } catch (error) {
      console.error('❌ Full synchronization failed:', error);
      process.exit(1);
    }
  }

  /**
   * Executes incremental content synchronization
   * 
   * Fetches only posts modified in the last N days from all configured
   * WordPress sites and updates the corresponding markdown files.
   * 
   * @param days - Number of days to look back for modified content
   */
  async executeIncrementalSync(days: number = 7): Promise<void> {
    console.log(`🔄 Starting incremental content synchronization (last ${days} days)...`);
    console.log(`📍 Configured sites: ${WORDPRESS_SITES.length}`);
    
    try {
      const startTime = Date.now();
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - days);
      
      console.log(`📅 Fetching content modified since: ${sinceDate.toISOString()}`);
      
      let totalPosts = 0;
      
      // Process each configured WordPress site
      for (const siteConfig of WORDPRESS_SITES) {
        console.log(`\\n📥 Processing ${siteConfig.site_name}...`);
        
        try {
          // Fetch posts modified since the specified date
          const posts = await this.apiService.fetchAllPosts(siteConfig, sinceDate);
          
          if (posts.length === 0) {
            console.log(`ℹ️  No new content found for ${siteConfig.site_name}`);
            continue;
          }
          
          // Write posts to markdown files
          const filePaths = await this.writerService.writePostsToMarkdown(posts, siteConfig);
          
          totalPosts += posts.length;
          console.log(`✅ Updated ${siteConfig.site_name}: ${posts.length} items, ${filePaths.length} files written`);
          
        } catch (error) {
          console.error(`❌ Failed to process ${siteConfig.site_name}:`, error);
          // Continue with other sites even if one fails
        }
      }
      
      const duration = Date.now() - startTime;
      const stats = await this.writerService.getContentStats();
      
      console.log('\\n🎉 Incremental synchronization completed!');
      console.log(`📊 Items processed: ${totalPosts}`);
      console.log(`📁 Current files: ${stats.totalFiles} (${stats.postFiles} posts, ${stats.mediaFiles} media)`);
      console.log(`💾 Total size: ${this.formatBytes(stats.totalSize)}`);
      console.log(`⏱️  Duration: ${this.formatDuration(duration)}`);
      
    } catch (error) {
      console.error('❌ Incremental synchronization failed:', error);
      process.exit(1);
    }
  }

  /**
   * Cleans all generated content files
   */
  async executeClean(): Promise<void> {
    console.log('🧹 Cleaning all content files...');
    
    try {
      const stats = await this.writerService.getContentStats();
      
      if (stats.totalFiles === 0) {
        console.log('ℹ️  No content files found to clean');
        return;
      }
      
      console.log(`📁 Found ${stats.totalFiles} files to remove (${this.formatBytes(stats.totalSize)})`);
      
      await this.writerService.clearAllContent();
      
      console.log('✅ All content files cleaned successfully');
      
    } catch (error) {
      console.error('❌ Failed to clean content files:', error);
      process.exit(1);
    }
  }

  /**
   * Displays current content statistics
   */
  async executeStats(): Promise<void> {
    console.log('📊 Content Statistics');
    console.log('====================\\n');
    
    try {
      const stats = await this.writerService.getContentStats();
      
      if (stats.totalFiles === 0) {
        console.log('ℹ️  No content files found');
        return;
      }
      
      console.log(`📁 Total files: ${stats.totalFiles}`);
      console.log(`📄 Post files: ${stats.postFiles}`);
      console.log(`🖼️  Media files: ${stats.mediaFiles}`);
      console.log(`💾 Total size: ${this.formatBytes(stats.totalSize)}`);
      
      // Show configured sites
      console.log('\\n🌐 Configured WordPress Sites:');
      WORDPRESS_SITES.forEach((site, index) => {
        console.log(`${index + 1}. ${site.site_name}`);
        console.log(`   URL: ${site.wp_url}`);
        console.log(`   Root slug: ${site.root_slug}`);
      });
      
    } catch (error) {
      console.error('❌ Failed to get content statistics:', error);
      process.exit(1);
    }
  }

  /**
   * Formats bytes to human-readable string
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Formats duration to human-readable string
   */
  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
}

/**
 * Main CLI program setup and execution
 */
async function main() {
  const program = new Command();
  const cli = new WordPressContentCli();

  program
    .name('wordpress-content-service')
    .description('WordPress Content Service - Sync WordPress content to markdown files')
    .version('1.0.0');

  // Full synchronization command
  program
    .command('full')
    .description('Perform full content synchronization from all WordPress sites')
    .action(async () => {
      await cli.executeFullSync();
    });

  // Incremental synchronization command
  program
    .command('latest')
    .description('Perform incremental synchronization of recent content')
    .option('-d, --days <number>', 'Number of days to look back for modified content', '7')
    .action(async (options: { days?: string }) => {
      const days = parseInt(options.days || '7', 10);
      if (isNaN(days) || days < 1) {
        console.error('❌ Invalid days parameter. Must be a positive number.');
        process.exit(1);
      }
      await cli.executeIncrementalSync(days);
    });

  // Clean command
  program
    .command('clean')
    .description('Remove all generated content files')
    .action(async () => {
      await cli.executeClean();
    });

  // Stats command
  program
    .command('stats')
    .description('Show current content statistics')
    .action(async () => {
      await cli.executeStats();
    });

  // Parse command line arguments
  await program.parseAsync(process.argv);
}

// Execute the main function
main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

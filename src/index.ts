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
import * as fs from 'fs/promises';
import * as path from 'path';
import { execSync } from 'child_process';
import { WordPressApiService } from './services/wordpress-api.js';
import { ContentWriterService } from './services/content-writer.js';
import { WORDPRESS_SITES } from './config/sites.js';

/**
 * Main CLI application class
 * 
 * Orchestrates the WordPress API service and content writer service
 * to provide a complete content synchronization workflow.
 */
export class WordPressContentCli {
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
   * Creates a release-ready package of the content
   * 
   * This method:
   * 1. Validates that content exists
   * 2. Fetches recent content (last 30 days by default)
   * 3. Checks for content changes using git
   * 4. If changes exist: commits, pushes, and creates archive
   * 5. If no changes: skips archive creation
   */
  async executePackage(days: number = 30): Promise<void> {
    console.log('📦 Creating content package for release...');
    console.log(`🔄 First, fetching recent content (last ${days} days)...`);
    
    try {
      const contentDir = './content';
      const cacheDir = './content-cache';
      const archiveDir = './archives';
      
      // Check if content directory exists
      try {
        await fs.access(contentDir);
      } catch {
        console.error('❌ Content directory not found. Run "npm run full" first to generate content.');
        process.exit(1);
      }

      // Fetch recent content first
      const startTime = Date.now();
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - days);
      
      console.log(`📅 Fetching content modified since: ${sinceDate.toISOString()}`);
      
      let totalNewPosts = 0;
      
      // Process each configured WordPress site for recent content
      for (const siteConfig of WORDPRESS_SITES) {
        console.log(`📥 Checking ${siteConfig.site_name} for recent content...`);
        
        try {
          // Fetch posts modified since the specified date
          const posts = await this.apiService.fetchAllPosts(siteConfig, sinceDate);
          
          if (posts.length === 0) {
            console.log(`ℹ️  No recent content found for ${siteConfig.site_name}`);
            continue;
          }
          
          // Write posts to markdown files
          await this.writerService.writePostsToMarkdown(posts, siteConfig);
          
          totalNewPosts += posts.length;
          console.log(`✅ Updated ${siteConfig.site_name}: ${posts.length} new items`);
          
        } catch (error) {
          console.error(`❌ Failed to fetch from ${siteConfig.site_name}:`, error);
          // Continue with other sites even if one fails
        }
      }
      
      const fetchDuration = Date.now() - startTime;
      console.log(`📊 Content fetch completed: ${totalNewPosts} new items in ${this.formatDuration(fetchDuration)}`);

      // Now check for content changes using git (including untracked files)
      console.log('🔍 Checking for content changes...');
      let hasChanges = false;
      let gitAvailable = true;
      
      try {
        // Use --porcelain with -u to include untracked files
        const gitStatus = execSync('git status --porcelain -u content/', { encoding: 'utf8' });
        hasChanges = gitStatus.trim() !== '';
        
        if (!hasChanges) {
          console.log('ℹ️  No content changes detected. Skipping package creation.');
          console.log('💡 All content is up to date - no archive needed.');
          return;
        }
        
        console.log('✅ Content changes detected. Proceeding with packaging...');
        
        // Show what changes were detected for debugging
        if (gitStatus.trim()) {
          const lines = gitStatus.trim().split('\n');
          console.log(`📋 Changes found: ${lines.length} file(s)`);
          lines.slice(0, 5).forEach(line => {
            const status = line.substring(0, 2);
            const file = line.substring(3);
            let statusDesc = '';
            if (status.includes('M')) statusDesc = 'Modified';
            else if (status.includes('A')) statusDesc = 'Added';
            else if (status.includes('D')) statusDesc = 'Deleted';
            else if (status.includes('??')) statusDesc = 'Untracked';
            else statusDesc = 'Changed';
            console.log(`   - ${statusDesc}: ${file}`);
          });
          if (lines.length > 5) {
            console.log(`   ... and ${lines.length - 5} more file(s)`);
          }
        }
        
      } catch (error) {
        console.log('⚠️  Git not available or not a git repository. Proceeding with packaging...');
        gitAvailable = false;
        hasChanges = true; // Assume changes if git not available
      }
      
      // Commit and push content changes if git is available
      if (gitAvailable && hasChanges) {
        console.log('📝 Committing content changes...');
        
        try {
          // Add all content files
          execSync('git add content/', { stdio: 'inherit' });
          
          // Get stats for commit message
          const stats = await this.writerService.getContentStats();
          const timestamp = new Date().toISOString().split('T')[0];
          
          // Create descriptive commit message
          const commitMessage = `content: Update WordPress content (${timestamp})

- Total files: ${stats.totalFiles} (${stats.postFiles} posts, ${stats.mediaFiles} media)
- Content size: ${this.formatBytes(stats.totalSize)}
- Auto-generated by wordpress-content-service v${process.env.npm_package_version || '1.0.0'}`;

          execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
          console.log('✅ Content changes committed successfully');
          
          // Push to remote if configured
          try {
            execSync('git push origin HEAD', { stdio: 'inherit' });
            console.log('✅ Content changes pushed to remote repository');
          } catch (pushError) {
            console.log('⚠️  Failed to push to remote. You may need to push manually.');
            console.log('   Run: git push origin HEAD');
          }
          
        } catch (commitError) {
          console.error('❌ Failed to commit content changes:', commitError);
          console.log('⚠️  Continuing with packaging, but content is not committed.');
        }
      }
      
      // Create cache and archive directories
      await fs.mkdir(cacheDir, { recursive: true });
      await fs.mkdir(archiveDir, { recursive: true });
      
      // Clean the cache directory
      console.log('🧹 Cleaning cache directory...');
      const cacheContents = await fs.readdir(cacheDir);
      for (const item of cacheContents) {
        const itemPath = path.join(cacheDir, item);
        const stat = await fs.stat(itemPath);
        if (stat.isDirectory()) {
          await fs.rm(itemPath, { recursive: true });
        } else {
          await fs.unlink(itemPath);
        }
      }
      
      // Copy content to cache
      console.log('📋 Copying content to cache...');
      execSync(`cp -r ${contentDir}/* ${cacheDir}/`, { stdio: 'inherit' });
      
      // Add metadata file
      const metadata = {
        created: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        sites: WORDPRESS_SITES.map(site => ({
          site_name: site.site_name,
          wp_url: site.wp_url,
          root_slug: site.root_slug,
          category_slug: site.category_slug,
          tag_slug: site.tag_slug
        }))
      };
      
      await fs.writeFile(
        path.join(cacheDir, 'package-info.json'),
        JSON.stringify(metadata, null, 2)
      );
      
      // Create archive
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      const archiveName = `wordpress-content-${timestamp}.tar.gz`;
      const archivePath = path.join(archiveDir, archiveName);
      
      console.log(`🗜️  Creating archive: ${archiveName}`);
      execSync(`tar -czf ${archivePath} -C ${cacheDir} .`, { stdio: 'inherit' });
      
      // Get archive size
      const archiveStats = await fs.stat(archivePath);
      const archiveSize = this.formatBytes(archiveStats.size);
      
      console.log('✅ Package created successfully!');
      console.log(`📁 Archive: ${archivePath}`);
      console.log(`📊 Size: ${archiveSize}`);
      
      // Clean up cache directory
      console.log('🧹 Cleaning up cache directory...');
      await fs.rm(cacheDir, { recursive: true, force: true });
      
      console.log('');
      console.log('💡 Next steps:');
      console.log('   1. Upload the archive to GitHub releases');
      console.log('   2. Update version tags as needed');
      console.log('   3. Test archive extraction in target environment');
      
    } catch (error) {
      console.error('❌ Failed to create package:', error);
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

  // Package command
  program
    .command('package')
    .description('Fetch recent content and create a release-ready package if changes exist')
    .option('-d, --days <number>', 'Number of days to look back for recent content', '30')
    .action(async (options: { days?: string }) => {
      const days = parseInt(options.days || '30', 10);
      if (isNaN(days) || days < 1) {
        console.error('❌ Invalid days parameter. Must be a positive number.');
        process.exit(1);
      }
      await cli.executePackage(days);
    });

  // Parse command line arguments
  await program.parseAsync(process.argv);
}

// Execute the main function only if this module is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
}

/**
 * @fileoverview Centralized type definitions for the WordPress Content Service
 * 
 * This module re-exports all type definitions used throughout the service
 * to provide a single import location for TypeScript interfaces and types.
 * 
 * @author WordPress Content Service
 * @version 1.0.0
 */

// Re-export all types from config
export type {
  SiteConfig,
  WordPressPost,
  WordPressMediaItem,
  PostRecord,
  ApiConfig,
  SyncOptions
} from '../config/sites.js';

// Re-export error types from services
export { WordPressApiError } from '../services/wordpress-api.js';
export { ContentWriterError } from '../services/content-writer.js';

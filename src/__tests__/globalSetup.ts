/**
 * @fileoverview Global setup for Jest tests
 * 
 * This file runs once before all tests begin.
 * Use it for test environment configuration and global mocks.
 */

export default function globalSetup() {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  
  // Global fetch mock setup
  global.fetch = jest.fn();
  
  console.log('🧪 WordPress Content Service test environment initialized');
  
  return Promise.resolve();
}

/**
 * @fileoverview Jest test setup configuration
 * 
 * Global configuration for Jest tests including:
 * - Mock implementations for external dependencies
 * - Test environment setup
 * - Global utilities and helpers
 */

import { jest } from '@jest/globals';

// Mock fetch globally for all tests with proper typing
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

// Mock console methods to avoid noise in test output
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
  
  // Mock console methods
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterEach(() => {
  // Reset fetch mock
  (global.fetch as jest.Mock).mockReset();
});

// Clean up after all tests
afterAll(() => {
  // Restore console methods
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

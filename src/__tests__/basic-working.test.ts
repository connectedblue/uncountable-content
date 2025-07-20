/**
 * @fileoverview Very basic working tests
 * 
 * Minimal tests to verify our setup works
 */

describe('Basic Functionality', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should work with numbers', () => {
    expect(2 + 2).toBe(4);
  });

  it('should work with strings', () => {
    expect('hello').toBe('hello');
  });

  it('should work with arrays', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr[0]).toBe(1);
  });

  it('should work with objects', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj.name).toBe('test');
    expect(obj.value).toBe(42);
  });
});

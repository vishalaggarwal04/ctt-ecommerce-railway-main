import { describe, it, expect } from 'vitest';
import { add } from './math';

describe('Math Utils', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should fail for incorrect addition', () => {
    expect(add(1, 1)).not.toBe(3);
  });
});
import { describe, test, expect } from 'vitest';
import { parseEnv, isEnv } from '@/index.js';

describe('parseEnv', () => {
  test('parses a simple environment string', () => {
    const envString = 'FOO=bar\nBAZ=qux';
    const result = parseEnv(envString);
    expect(result).toEqual({ FOO: 'bar', BAZ: 'qux' });
  });

  test('parses a complex environment string', () => {
    const envString = 'FOO="bar"\nBAZ=\'qux\'';
    const result = parseEnv(envString);
    expect(result).toEqual({ FOO: 'bar', BAZ: 'qux' });
  });

  test('parses a commented environment string', () => {
    const envString = '# Comment\nFOO=bar';
    const result = parseEnv(envString);
    expect(result).toEqual({ FOO: 'bar' });
  });

  test('parses a mixed environment string', () => {
    const envString = 'FOO=bar\n# Comment\nBAZ=qux';
    const result = parseEnv(envString);
    expect(result).toEqual({ FOO: 'bar', BAZ: 'qux' });
  });

  test('parses a Windows environment string', () => {
    const envString = 'FOO=bar\r\nBAZ=qux';
    const result = parseEnv(envString);
    expect(result).toEqual({ FOO: 'bar', BAZ: 'qux' });
  });
});

describe('isEnv', () => {
  test('returns true for valid environment strings', () => {
    const envString = 'FOO=bar\nBAZ=qux # Comment';
    const result = isEnv(envString);
    expect(result).toBe(true);
  });

  test('returns false for invalid environment strings', () => {
    const envString = 'FOO=bar\nBAZ\n# Comment';
    const result = isEnv(envString);
    expect(result).toBe(false);
  });
});

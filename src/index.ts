export type EnvRecord = Record<string, string>;

type ParseOptions = {
  throwOnInvalid?: boolean;
  preserveQuotes?: boolean;
};

class InvalidEnvError extends Error {
  constructor(line: string, message: string) {
    super(`Invalid environment variable at line: "${line}". ${message}`);
    this.name = 'InvalidEnvError';
  }
}

const ENV_LINE_REGEX = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const QUOTED_VALUE_REGEX = /^(['"])(.*)\1$/;
const NEWLINE_REGEX = /\r?\n/;

export function parseEnv(input: string, options: ParseOptions = {}): EnvRecord {
  const { throwOnInvalid = false, preserveQuotes = false } = options;
  const env: EnvRecord = {};

  for (const line of input.split(NEWLINE_REGEX)) {
    const trimmedLine = line.trim();

    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const match = trimmedLine.match(ENV_LINE_REGEX);
    if (!match) {
      if (throwOnInvalid) {
        throw new InvalidEnvError(trimmedLine, 'Expected format: KEY=VALUE');
      }
      continue;
    }

    const [, key, rawValue = ''] = match;
    if (key) {
      env[key] = preserveQuotes ? rawValue : removeQuotes(rawValue);
    }
  }

  return env;
}

export function isEnv(input: string): boolean {
  for (const line of input.split(NEWLINE_REGEX)) {
    const trimmedLine = line.trim();
    if (
      trimmedLine &&
      !trimmedLine.startsWith('#') &&
      !ENV_LINE_REGEX.test(trimmedLine)
    ) {
      return false;
    }
  }
  return true;
}

function isValidLine(line: string): boolean {
  return Boolean(line && !line.startsWith('#'));
}

function removeQuotes(value: string): string {
  const match = value.match(QUOTED_VALUE_REGEX);
  return match ? match[2] || '' : value;
}

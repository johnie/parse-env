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

  input
    .split(NEWLINE_REGEX)
    .map((line) => line.trim())
    .filter(isValidLine)
    .forEach((line) => {
      const match = line.match(ENV_LINE_REGEX);

      if (!match) {
        if (throwOnInvalid) {
          throw new InvalidEnvError(line, 'Expected format: KEY=VALUE');
        }
        return;
      }

      const [, key, rawValue = ''] = match;
      if (key) {
        env[key] = preserveQuotes ? rawValue : removeQuotes(rawValue);
      }

      return env;
    });

  return env;
}

export function isEnv(input: string): boolean {
  return input
    .split(NEWLINE_REGEX)
    .map((line) => line.trim())
    .every((line) => !line || isValidLine(line));
}

function isValidLine(line: string): boolean {
  return Boolean(line && !line.startsWith('#'));
}

function removeQuotes(value: string): string {
  const match = value.match(QUOTED_VALUE_REGEX);
  return match ? match[2] || '' : value;
}

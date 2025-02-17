/**
 * Parses a string containing environment variable definitions and returns an object.
 *
 * Each non-empty line that does not start with '#' is expected to have the format:
 * KEY=VALUE
 *
 * Values may be optionally wrapped in single or double quotes.
 *
 * @param envString - The input string containing environment variable definitions.
 * @returns An object where keys are the environment variable names and values are their corresponding values.
 */
export function parseEnv(envString: string): Record<string, string> {
  const result: Record<string, string> = {};
  // Split the input string into lines (handles both Unix and Windows newlines)
  const lines = envString.split(/\r?\n/);

  for (const line of lines) {
    // Trim whitespace from the line.
    const trimmedLine = line.trim();

    // Skip empty lines or lines that start with '#' (comments).
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    // Find the first '=' which separates the key and value.
    const equalsIndex = trimmedLine.indexOf('=');
    if (equalsIndex === -1) {
      // If there is no '=', the line is not valid and can be skipped.
      continue;
    }

    // Extract the key and value, trimming any extra whitespace.
    const key = trimmedLine.substring(0, equalsIndex).trim();
    let value = trimmedLine.substring(equalsIndex + 1).trim();

    // Remove surrounding quotes from the value if present.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.substring(1, value.length - 1);
    }

    result[key] = value;
  }

  return result;
}

export function isEnv(envString: string): boolean {
  return envString.split(/\r?\n/).every((line) => {
    const trimmedLine = line.trim();
    return (
      !trimmedLine || trimmedLine.startsWith('#') || trimmedLine.includes('=')
    );
  });
}

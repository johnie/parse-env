# parse-env

> a simple Node.js module designed for parsing environment variable strings, providing utility functions to handle environment files effectively.

## Installation

You can install `parse-env` using your preferred package manager. Here are a fewexamples:

```sh
  # with npm
  npm install parse-env

  # with pnpm
  pnpm add parse-env
```
## Usage

Here's a basic example of how to use `parse-env`:

```ts
import { parseEnv, isEnv } from 'parse-env';

const envString = `
FOO=bar
BAZ=qux
# Comment line
QUUX="corge"
`;

const parsedEnv = parseEnv(envString);
console.log(parsedEnv); // { FOO: 'bar', BAZ: 'qux', QUUX: 'corge' }

console.log(isEnv(envString)); // true
```

## Contributing

We welcome contributions to  `parse-env`. To contribute:

1. Fork our repository.
2. Clone the forked repository.
3. Create a new branch for your feature or bugfix.
4. Make your changes, and commit them with meaningful messages.
5. Push the changes to your fork.
6. Create a Pull Request.

For more details, please see the Contributing Guide [/CONTRIBUTING.md](/CONTRIBUTING.md).

# @rtorcato/react-common-utils

[![npm](https://img.shields.io/npm/v/@rtorcato/react-common-utils)](https://www.npmjs.com/package/@rtorcato/react-common-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React-specific utilities for the [`react-common`](https://github.com/rtorcato/react-common)
family — small, tree-shakeable helpers that need React (hooks, context, element
or ref helpers) but don't belong in the component library itself.

> **Scope boundary.** Only helpers that actually depend on React live here.
> Generic, non-React utilities (dates, formatting, arrays, async, validation)
> belong in [`@rtorcato/js-common`](https://github.com/rtorcato/js-common), and
> raw browser Web API wrappers in
> [`@rtorcato/browser-common`](https://github.com/rtorcato/browser-common). See
> [ADR-0001](https://rtorcato.github.io/react-common/docs/adr) for why the family
> partitions by concern.

## Installation

```bash
pnpm add @rtorcato/react-common-utils
# or
npm install @rtorcato/react-common-utils
```

Peer dependency:

```bash
pnpm add react
```

## Usage

Import only what you need — every helper is exposed via a subpath export so
bundlers tree-shake the rest:

```ts
import { /* … */ } from '@rtorcato/react-common-utils'
```

## Status

Newly scaffolded — the utility surface is being filled out. Track progress in the
[react-common issues](https://github.com/rtorcato/react-common/issues).

## License

MIT © Richard Torcato

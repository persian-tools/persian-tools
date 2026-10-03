---
name: URLfix
description: Decode percent-encoded Persian (or any non-ASCII) URLs into a human-readable form, optionally replacing spaces with a separator. Use when displaying URLs in UI, logging, or generating slugs from copy-pasted percent-encoded URLs. Triggers on requests mentioning urlFix, URLfix, decode Persian URL, percent-encoded farsi, or "make this URL readable".
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/persian-tools/persian-tools
  version: "1.0.0"
---

# URLfix — decode percent-encoded URLs

```ts
import { urlFix } from "@persian-tools/persian-tools";
// CommonJS
const { urlFix } = require("@persian-tools/persian-tools");
```

> The exported function is **`urlFix`** (camelCase), even though the module folder is `URLfix`.

## Public export

```ts
urlFix(url?: string, separator?: string): string | undefined
```

> Note: the function name is **`urlFix`** (lowercase u). Some older documentation refers to it as `URLfix`; the actual export uses camelCase.

## What it does

1. If `url` is falsy, returns `undefined` (no throw).
2. Calls `decodeURIComponent(url)` to expand `%xx` escapes — including UTF-8 multi-byte sequences used for Persian and other non-ASCII characters.
3. If `separator` is provided, replaces the **first** space in the decoded URL with `separator` (single `String.prototype.replace` — not global).

```ts
import { urlFix } from "@persian-tools/persian-tools";

urlFix("https://fa.wikipedia.org/wiki/%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9%20%DA%A9%D9%88%D8%A7%D9%86%D8%AA%D9%88%D9%85%DB%8C");
// "https://fa.wikipedia.org/wiki/مکانیک کوانتومی"

urlFix(
  "https://fa.wikipedia.org/wiki/%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9%20%DA%A9%D9%88%D8%A7%D9%86%D8%AA%D9%88%D9%85%DB%8C",
  "_",
);
// "https://fa.wikipedia.org/wiki/مکانیک_کوانتومی"
```

## Important caveats

- **The separator replacement is single-shot.** Only the first space is replaced. If your URL contains multiple spaces, the rest stay literal.
- **`urlFix` does not re-encode the result.** The returned string is human-readable but no longer a valid URL for HTTP requests. Use it for display, logging, or as input to a slug generator — not as `fetch()` target.
- **`decodeURIComponent` throws** on malformed percent-encoding (e.g. lone `%` or invalid UTF-8 byte sequences). `urlFix` does not catch this. Wrap in `try/catch` if input is untrusted.
- **Returns `undefined`** (not `""`) for falsy input. Type the call site accordingly:
  ```ts
  const pretty = urlFix(rawUrl) ?? rawUrl;
  ```

## When to use

- Rendering recent Persian Wikipedia / blog links in a UI.
- Logging an inbound request path for debugging.
- Producing the input for `slugify(...)` from a copy-pasted URL.

## When NOT to use

- For round-tripping a URL through a system that will fetch it — keep the encoded form.
- For cleaning URLs that need to be machine-readable downstream.

## References

- Tests: `test/URLfix.spec.ts`
- Related: `slugify` skill for producing URL-safe slugs from the decoded form

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

## UI and Icon Rules

* Do not use emojis throughout the application UI.
* Avoid using emojis as icons, buttons, navigation elements, status indicators, or decorative UI elements.
* Use `lucide-react` icons instead of emojis wherever an icon is needed.
* Prefer the appropriate `lucide-react` icon based on the meaning and context of the UI element.
* Keep icon usage consistent across the application and follow the existing design system.
* Do not introduce custom emoji-based icons when a suitable `lucide-react` icon is available.
* If `lucide-react` is not already installed, use the project's existing icon library or install `lucide-react` only when appropriate.
* Use accessible labels, tooltips, or `aria-label` attributes for icon-only interactive elements.

<!-- END:nextjs-agent-rules -->

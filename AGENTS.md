# WorktreeWise Documentation Instructions

Follow the workspace instructions in `../AGENTS.md` and the release workflow in `../.codex/skills/worktreewise-release-capture/SKILL.md`.

## Project Development

- This is a Next.js 15 and Nextra 4 documentation site.
- Keep navigation definitions, version routing, canonical URLs, search generation, and sitemap behavior consistent when adding or moving pages.
- Reuse existing Nextra components and MDX conventions.
- Treat unprefixed content as the current docs and version-prefixed trees as immutable historical snapshots unless explicitly updated.
- When changing layouts, version selection, search, or routing, verify both current and archived URLs rather than checking only page compilation.
- Avoid editing generated Pagefind or sitemap output manually; let the relevant build scripts regenerate it.
- Do not change product source or landing-page claims as a side effect of a docs-only request.

## Versioning

- Version 1.1 is the current documentation line.
- Update both unprefixed current content and the matching `content/1.1` page.
- Do not change `content/1.0` unless explicitly requested.
- Add new pages to the appropriate `_meta.js` navigation file in both current and 1.1 trees.

## Images and Content

- Store 1.1 captures in `public/images/releases/1.1.0`.
- Reference images with `/images/releases/1.1.0/<filename>`.
- Document actual behavior verified in source and the running application.
- Explain prerequisites, fields, options, validation, completion state, safety implications, and common failure cases where relevant.
- Prefer task-oriented headings and useful alt text.
- Never publish screenshots containing author names, credentials, license keys, or avoidable sensitive paths.
- Do not document removed features as available in 1.1.

Run image-reference checks, `git diff --check`, type checking, and a production build when resources permit. Report environment failures separately from content or compilation failures.

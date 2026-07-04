---
name: release-notes
description: Inspect commits since the last git tag and draft conventional-commit-style release notes grouped by type (feat, fix, perf, refactor, docs, chore). Use when the user says "release notes", "what's in the next release", or "/release-notes".
---

# release-notes

Draft release notes from commits since the last semver tag. The library uses semantic-release on `main` — these notes are a preview of what semantic-release will produce.

## Steps

1. Find the most recent tag: `git describe --tags --abbrev=0`. If no tag exists, use the first commit (`git rev-list --max-parents=0 HEAD`).
2. List commits since that ref: `git log <tag>..HEAD --pretty=format:'%H%x09%s%x09%b' --no-merges`.
3. Parse conventional-commit subject prefixes (`feat:`, `fix:`, `perf:`, `refactor:`, `docs:`, `chore:`, `test:`, `build:`, `ci:`). Treat `feat(scope):` and `fix(scope):` the same way; capture the scope.
4. Detect breaking changes: subject contains `!` after the type/scope, OR body contains `BREAKING CHANGE:`. List these in a top-level **Breaking** section.
5. Group remaining commits:
   - **Features** — `feat`
   - **Fixes** — `fix`
   - **Performance** — `perf`
   - **Other** — `refactor`, `docs`, `chore`, `test`, `build`, `ci` (only include if non-trivial; skip pure `chore(release):` and bumps)

## Output format

```
## <next-version> — <YYYY-MM-DD>

### Breaking
- <subject> (<short-sha>)

### Features
- <scope>: <description> (<short-sha>)

### Fixes
- <scope>: <description> (<short-sha>)
```

Suggest the next version using semver rules:
- Any breaking → major
- Any `feat` → minor
- Only `fix`/`perf`/`other` → patch

## Notes

- Do NOT modify `package.json` or `CHANGELOG.md` — semantic-release writes those on `main`.
- If commits don't follow conventional format, flag them — semantic-release will not categorize them.

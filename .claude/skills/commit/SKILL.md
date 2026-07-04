---
name: commit
description: Stage and commit changes using Conventional Commits so semantic-release can version and publish correctly. Use when the user says "commit", "let's commit", or "/commit".
disable-model-invocation: true
---

# commit

This repo uses semantic-release on `main`, so every commit message must be a valid Conventional Commit. The project provides `pnpm commit` (commitizen) for an interactive flow.

## Steps

1. `git status` and `git diff` to understand what's staged and unstaged.
2. If nothing is staged, propose specific files to stage (do not blanket `git add -A`).
3. Suggest a Conventional Commit message based on the actual changes:
   - `feat(scope): <subject>` — new user-facing capability
   - `fix(scope): <subject>` — bug fix
   - `perf(scope): <subject>` — performance change
   - `refactor(scope): <subject>` — internal change, no behavior diff
   - `docs(scope): <subject>` — README/CLAUDE.md/JSDoc changes
   - `chore(scope): <subject>` — tooling/CI/deps (no release impact)
   - `test(scope): <subject>` — tests only
   - Add `!` after the type for breaking changes (e.g. `feat(api)!: rename Foo`), and include a `BREAKING CHANGE:` line in the body.
4. Ask the user to confirm the message (or offer to run `pnpm commit` for the interactive commitizen prompt).
5. On approval, commit. `husky` + `lint-staged` will run Biome lint/format on staged files automatically; if the hook fails, surface the failure and let the user decide whether to fix and re-commit.

## Notes

- Do not pass `--no-verify` to bypass the pre-commit hook unless the user explicitly asks.
- Do not amend published commits.
- Do not push as part of this skill — pushing to `main` triggers a release.

<!--
Thanks for the PR! Quick checklist:
  - Branch name follows `feat/`, `fix/`, `docs/`, `chore/`, `ci/`, `refactor/`, `test/`
    (with the issue number when one exists: `feat/20-resource-card`).
  - PR title is a Conventional Commit (`feat(components): add ResourceCard`) —
    it becomes the squash commit on main.
  - A changeset is included for any change to a published package (`pnpm changeset`).
  - CI gates are green locally before pushing: pnpm lint, typecheck, test, build.
  - Every new TODO/FIXME in code references an issue: `TODO(#42): …`.

Once you're ready, queue auto-merge:
  gh pr merge --auto --squash --delete-branch
-->

## What

<!-- One or two sentences. Which component(s) or area(s) are affected? -->

## Why

<!-- The user-facing motivation, bug, or use case. Link the issue: Closes #N -->

## How

<!--
  Implementation notes a reviewer would want to know:
  - New components, hooks, exports, or build.mjs entry points
  - Anything non-obvious in the diff
  - Migration steps for consumers (if any)
  - Skip this section for trivial PRs.
-->

<!--
Closes #
-->

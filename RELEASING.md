# Releasing

Releases are driven by **[Changesets](https://github.com/changesets/changesets)** — not
semantic-release. Do **not** hand-edit versions in `package.json`; Changesets owns them.

## Flow

1. **Add a changeset** for any user-facing change: `pnpm changeset` (root). Pick the
   affected packages and bump type (patch/minor/major); it writes a file under
   `.changeset/`. Commit it with your change.
2. **Merge to `main`.** The `release` job in `.github/workflows/ci.yml` runs the
   Changesets action, which opens (or updates) a **"chore(release): version packages"**
   PR that consumes the pending changesets, bumps versions, and updates each
   `CHANGELOG.md`.
3. **Merge the Version Packages PR.** On that merge, the same job runs `pnpm release`
   (`pnpm build && changeset publish`) and publishes the changed packages to public npm
   with provenance, then tags the release.

## npm authentication

Publishing uses the `NPM_TOKEN` secret. It **must be an npm _Automation_ token** (or a
granular token that bypasses 2FA) — a classic *Publish* token fails in CI with
`ERR_PNPM_OTP_NON_INTERACTIVE` because the registry demands an interactive OTP.

Migration to OIDC **Trusted Publishing** (no long-lived token) is tracked in
[js-tooling#201](https://github.com/rtorcato/js-tooling/issues/201); 2FA-bypass tokens
keep working until ~January 2027.

## Checklist for any release that adds or changes a public API

Version bumps are automated, but these are not — do them in the same PR as the change:

- [ ] **Docs site** updated (`apps/docs`) — new/changed components, hooks, or props.
- [ ] **README** updated — examples and any hand-written API notes.
- [ ] **AGENTS.md + `skills/react-common/SKILL.md`** updated together if the public
      surface changed (they must stay in sync).
- [ ] **Changeset added** describing the change and bump type.
- [ ] Relevant **[GitHub milestone](https://github.com/rtorcato/react-common/milestones)** item ticked.

The TypeDoc API reference under `apps/docs/docs/api` regenerates on every docs build,
so it never needs manual edits.

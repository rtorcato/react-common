# Releasing

Releases are driven by **[Changesets](https://github.com/changesets/changesets)** — not
semantic-release. Do **not** hand-edit versions in `package.json`; Changesets owns them.

## Flow

1. **Add a changeset** for any user-facing change: `pnpm changeset` (root). Pick the
   affected packages and bump type (patch/minor/major); it writes a file under
   `.changeset/`. Commit it with your change.
2. **Merge to `main`.** Merging does not publish. Every push to `main` runs the
   ungated `version` job in `.github/workflows/release.yml`, which runs the Changesets
   action. It opens (or updates) a **"chore(release): version packages"** PR that
   consumes the pending changesets, bumps versions, and updates each `CHANGELOG.md`.
3. **Merge the Version Packages PR, then approve once.** That push leaves no changesets
   pending and a version not yet on npm, so it also runs the `publish` job. The job runs
   in the `release` environment, which has a required-reviewer gate, so it waits for
   approval. It then builds, runs `changeset publish` to publish the changed packages to
   public npm with provenance, and tags each release. An ordinary merge skips `publish`
   and never asks for an approval. A manual dispatch (`workflow_dispatch`) retries a
   failed publish.

## Beta pre-releases (npm `beta` dist-tag)

`.changeset/pre.json` puts Changesets in **pre mode** with the `beta` tag. While it is
on `main`, the flow above is unchanged, but versions come out as `x.y.z-beta.N` and
`changeset publish` publishes them under the **`beta`** dist-tag, so `latest` does not
move. Pre mode is repo-wide: it applies to both `@rtorcato/react-common` and
`@rtorcato/shadcn-ui`.

```bash
pnpm add @rtorcato/react-common@beta
```

Nothing publishes until the Version Packages PR merges, and the `publish` job still
needs rtorcato's approval in the `release` environment.

To ship a stable release again, leave pre mode in a PR: `pnpm changeset pre exit`, then
merge it. The next Version Packages PR then bumps to the stable versions and publishes
to `latest`.

## npm authentication

Publishing uses the `NPM_TOKEN` secret. It **must be an npm _Automation_ token** (or a
granular token that bypasses 2FA) — a classic *Publish* token fails in CI with
`ERR_PNPM_OTP_NON_INTERACTIVE` because the registry demands an interactive OTP.

Migration to OIDC **Trusted Publishing** (no long-lived token) is tracked in
[repo-tooling#201](https://github.com/rtorcato/repo-tooling/issues/201); 2FA-bypass tokens
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

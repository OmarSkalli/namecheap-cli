# Release Process

This document outlines the steps to release a new version of `@omarskalli/namecheap-cli`.

## Prerequisites

- Ensure you're logged into npm: `npm login`
- Ensure you have `gh` CLI installed and authenticated
- Ensure all tests pass: `npm test`
- Ensure the build works: `npm run build`

## Release Steps

### 1. Determine Version Bump

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (0.1.0 → 0.1.1): Bug fixes, minor changes
- **Minor** (0.1.0 → 0.2.0): New features, backward-compatible
- **Major** (0.1.0 → 1.0.0): Breaking changes

### 2. Run Tests and Build

```bash
npm test
npm run build
```

Fix any failures before proceeding.

### 3. Bump Version

Use `npm version` to update package.json and create a git tag:

```bash
# For a patch release (bug fixes)
npm version patch

# For a minor release (new features)
npm version minor

# For a major release (breaking changes)
npm version major
```

This will:
- Update the version in `package.json`
- Create a git commit with the version bump
- Create a git tag (e.g., `v0.2.0`)

### 4. Push to GitHub

Push the commit and tags:

```bash
git push && git push --tags
```

### 5. Publish to npm

Publish the new version:

```bash
npm publish --access public
```

Verify the publication at: https://www.npmjs.com/package/@omarskalli/namecheap-cli

### 6. Create GitHub Release

Create a release with notes describing the changes:

```bash
gh release create v0.2.0 --title "v0.2.0" --notes "## What's New

- Feature 1: Description
- Feature 2: Description

## Bug Fixes

- Fix 1: Description

## Other Changes

- Update dependencies
"
```

Replace `v0.2.0` with your actual version and customize the release notes.

**Alternative:** Use `--generate-notes` to auto-generate release notes from commits:

```bash
gh release create v0.2.0 --title "v0.2.0" --generate-notes
```

### 7. Verify Release

Check that everything is published:

- npm: https://www.npmjs.com/package/@omarskalli/namecheap-cli
- GitHub Releases: https://github.com/omarskalli/namecheap-cli/releases

## Quick Reference

Complete release in one go:

```bash
# 1. Test and build
npm test && npm run build

# 2. Bump version (creates tag automatically)
npm version patch  # or minor/major

# 3. Push everything
git push && git push --tags

# 4. Publish to npm
npm publish --access public

# 5. Create GitHub release
gh release create $(git describe --tags --abbrev=0) \
  --title "$(git describe --tags --abbrev=0)" \
  --generate-notes
```

## Rollback

If you need to unpublish a version (only possible within 72 hours):

```bash
npm unpublish @omarskalli/namecheap-cli@<version>
```

**Note:** Unpublishing is discouraged. If there's a bug, publish a patch version instead.

## Tips

- Write meaningful commit messages - they may be used in release notes
- Keep a CHANGELOG.md to track notable changes
- Test the package locally before publishing: `npm link`
- Use `npm publish --dry-run` to preview what will be published

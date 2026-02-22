# TODO: Manual upload of binary assets (Codex web limitation)

Codex web cannot commit binary files. The following assets were intentionally removed from git and must be uploaded manually before building/running the Expo app:

## Required files
- `apps/mobile/assets/icon.png`
- `apps/mobile/assets/adaptive-icon.png`
- `apps/mobile/assets/splash.png`
- `apps/mobile/assets/moon.webp`
- `apps/mobile/assets/space.webp`

## Recommended sources
- Reuse existing web assets where applicable:
  - `public/android-chrome-512x512.png` → `icon.png`, `adaptive-icon.png`, `splash.png`
  - `public/moon.webp` → `apps/mobile/assets/moon.webp`
  - `public/space.webp` → `apps/mobile/assets/space.webp`

## Verification after upload
Run inside `apps/mobile`:

```bash
npm install
npm run start
```

Then verify routes:
- `/day/...` flow renders moon texture + phase shadow.
- `/month/...` flow renders calendar + starfield background.

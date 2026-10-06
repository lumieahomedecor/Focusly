# Focusly — GitHub Pages build

This build fixes the issues found in the screen recording.

## Included
- 9 subjects including SAT
- Five-question lessons instead of one-question loops
- Correct answer choices and reliable scoring
- Mistake corrections + missed-question retest
- Local study-material file list
- Focus Mode with adjustable drawing brush
- 25-minute timer with pause/resume/reset
- Calm synthesized focus beat with volume control
- Cute CSS mini-robot Buddy with idle, blink, listening, talking, happy and thinking states
- Buddy drag boundaries so it stays on screen
- Buddy minimize/expand control and mobile-safe sizing
- Natural unrestricted typed prompts
- Browser speech input for Buddy and Ask Focusly when supported
- Device voice selection for Buddy speech
- Personal timetable with add/delete sessions and local saving
- Notification permission flow for browser reminders
- Service-worker cache version bumped to v4 to reduce stale GitHub Pages files

## Important limitation
GitHub Pages is static hosting. This package does **not** include a secret AI API key or pretend that a cloud AI backend is connected. Ask Focusly therefore uses an offline study-helper engine in this build. A real cloud AI tutor can be connected later through a secure server-side backend without putting a private API key in GitHub.

## GitHub Pages
Extract this ZIP and replace the files in the repository root. Commit the changes, then wait for GitHub Pages to redeploy. If an older version still appears, reload the page after the new `focusly-v4` service worker activates.

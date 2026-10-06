# Focusly — GitHub-ready starter

This package is a fresh GitHub-ready rebuild based on the Focusly requirements discussed in the conversations:
- Student study assistant
- PDF/photo study-material uploads
- Main subjects + SAT
- Short lessons followed by tests
- Correction/retest flow for missed answers
- Homework/research assistant interface
- Timetable/study planning
- Exam and water-break reminders UI
- Online/offline-friendly static shell
- Focus mode with drawing canvas
- Soft, steady locally generated lo-fi-style focus audio
- Headphones-recommended notice
- Floating, draggable Focusly Buddy
- Buddy can be activated conversationally and accepts unrestricted natural text
- Buddy nickname and voice options
- Mobile-first interface

## Deploy on GitHub Pages
1. Create a GitHub repository.
2. Upload the contents of this folder (not the ZIP itself if you want the site to publish directly).
3. In Settings → Pages, choose the branch/folder containing `index.html`.
4. Open the generated Pages URL.

## Important backend note
The front-end is functional as a static GitHub Pages site. Live AI answers, account authentication, cloud sync, push notifications, OCR/PDF intelligence, and persistent cross-device progress require a secure backend/API integration. Do not put private API keys in browser JavaScript.

## Audio
The focus beat is generated in-browser with Web Audio so the package does not depend on a copyrighted music file. Browsers generally require a user gesture before audio can start.

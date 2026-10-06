# Focusly — Final GitHub Pages Package

This package combines the requested Focusly experience:
- Cute CSS-drawn mini-robot Buddy (not an emoji)
- Floating/dragging Buddy with idle movement
- Cute expressions, blinking, talking/listening animation
- Natural speech-synthesis voice choices with adjustable voice selection
- Voice input and “Hey Buddy” / “Buddy” activation where browser SpeechRecognition is supported
- Unrestricted natural-language Buddy prompts
- Calm synthesized ambient beat with soft steady pulse
- Headphones recommendation and safe browser-audio behavior
- Study subjects including SAT
- Lesson → test → personalized correction/retest flow
- Study material upload UI
- Focus canvas + 25-minute timer
- Timetable and water break
- Ask Focusly interface
- Responsive mobile layout and PWA manifest

## GitHub Pages
Upload the contents of this folder to the repository used for GitHub Pages.

## Important browser notes
Speech recognition is browser-dependent and may require permission. Voice choices come from the device/browser's available speech-synthesis voices.
Audio cannot reliably autoplay with sound until a user gesture; the Continue button starts the calm beat after permission.

The Ask Focusly UI is frontend-only in this static package. For a real AI tutor, connect a secure server-side AI backend. Never place a private API key in GitHub Pages client-side JavaScript.

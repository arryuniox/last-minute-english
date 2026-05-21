# A Museum of My English Education

A compact interactive 3D museum built with Three.js that reflects on a four-year English course through symbolic spaces, texts, and thematic objects.

## Project goal

This project turns the course journey into a spatial narrative. Each grade becomes a gallery wing with its own mood, themes, and a final room that reflects back on the student as the exhibit. The museum is designed to:

- visualise the progression of ideas across English classes
- let users explore literature through symbolic objects and short theme analysis
- make the final reflection feel like an immersive conclusion rather than just another page
- keep the experience responsive by optimizing rendering performance

## What’s included

- A 3D museum rendered in `src/museum.js` using Three.js
- Five major sections:
  - Grade 9: identity, family, belonging, and dreams
  - Grade 10: fear, survival, ambition, and collapse
  - Grade 11: society, control, ideology, and systems
  - Grade 12: memory, mortality, responsibility, and uncertainty
  - Final Room: the player becomes the final exhibit
- Side rooms for each book with three clickable exhibit objects
- Interactive object modals with symbolism and theme analysis
- A bright, fully lit final room screen at the end of the museum
- Performance optimizations like reduced antialiasing, capped pixel ratio, and simpler shadow rendering

## Files

- `index.html` — page structure and overlay UI
- `styles.css` — visual layout, HUD styles, and modal design
- `src/museum.js` — Three.js scene, museum layout, interaction logic, and animation loop
- `server.mjs` — local development server used by `npm run dev`

## Run locally

Start the dev server with:

```powershell
npm run dev
```

Then open the local URL in your browser:

```text
http://127.0.0.1:5173
```

## Controls

- `W` / `S` or `Arrow Up` / `Arrow Down`: move through the museum
- `A` / `D` or `Arrow Left` / `Arrow Right`: turn left/right
- Mouse drag: look around
- Mouse wheel: move forward/back
- Number keys `1`–`6`: jump to a specific wing for quick navigation

## Presentation shortcuts

Use URL hashes to jump directly to wings and rooms:

- `#grade-12-wing`
- `#final-room`
- `#kims-convenience`
- `#a-raisin-in-the-sun`
- `#macbeth`
- `#moon-of-the-crusted-snow`
- `#anthem`
- `#things-fall-apart`
- `#watchmen`
- `#brother`
- `#frankenstein`
- `#hamlet`

## Notes

- The final room now intentionally brightens to a white screen to reinforce the closing reflection.
- Rendering was optimized to improve framerate on most devices without changing the core interactive experience.

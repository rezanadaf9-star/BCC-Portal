PTM + Motivational Sessions + Super 15 — Updated

Changes in this package:

1. PTM
- Kept the existing PTM layout and meeting size.
- Removed the extra meeting-mode button.
- Exactly one Full Screen button and one Close Meeting button are present.
- Close Meeting disposes the embedded Jitsi meeting and returns to the join view.

2. Motivational Sessions
- Uses the same body/layout and the same Jitsi meeting-window size as PTM.
- Footer remains part of the page rather than using a full-page meeting overlay.
- Exactly one Full Screen button and one Close Meeting button.
- Jitsi is embedded directly in the page.
- Session data can be supplied through motivational-data.js or the backend endpoint.

3. Super 15
- Reduced to the requested teacher-led live meeting page only.
- No overview, statistics, chat, resource cards, or other extra Super 15 features.
- Same Jitsi meeting-window layout and size as PTM.
- Exactly one Full Screen button and one Close Meeting button.
- Footer remains visible on the normal page.

4. Sidebar
- Sidebar links have text-decoration: none so no underlines are shown.
- Existing hover icon rotation remains 10 degrees.

Jitsi note:
- The public meet.jit.si service is used by this frontend demo. Full school-controlled branding removal and host authentication require an appropriate self-hosted/licensed Jitsi deployment.

Files:
- ptm.html
- ptm.css
- ptm.js
- motivational.html
- motivational.css (legacy file retained only for compatibility; motivational.html now uses ptm.css)
- motivational.js
- motivational-data.js
- super.html
- super.css (legacy file retained only for compatibility; super.html now uses ptm.css)
- super.js
- super15-data.js
- meeting-common.js
- login.html
- login.js
- meeting-backend/ (existing backend scaffold)

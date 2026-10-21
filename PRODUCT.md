# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Students and other interested people in Berlin. Most arrive from a link someone sent them through WhatsApp or Instagram, and most of them open it on a phone. Many are first-time visitors with no background in the field: the site's own FAQ answers "Do I have to be a student?", "Do I need prior knowledge?", "Does it cost anything?", "Where exactly?", "Which language?"

Secondary audiences, inferred from the site's contact form and member call rather than stated by the team: people who want to join the organizing team, give or suggest a talk, cooperate, or write about BPSA.

## Product Purpose
The site exists to get people into the next talk and into the WhatsApp group. Everything else (who we are, the FAQ, the archive of past talks, the member call, the contact form) supports those two actions.

Success is a visitor who arrives from a shared link on a phone and, within seconds, knows when and where the next talk is, sees that it is free and open to everyone, and joins the WhatsApp group, where topics, changes and Zoom links are posted first.

## Positioning
The Berlin Psychedelic Science Association (BPSA) is a student group with an open door. It brings researchers who work on altered states of consciousness to Berlin, from neuroscience and psychiatry to philosophy, and leaves time for questions and conversation afterwards. Talks are free, need no registration and are open to everyone. BPSA is part of the Psychedelic Student Network Germany (PSNG). Its framing is academic and interdisciplinary: science, philosophy and society, not consumption or advocacy.

## Operating Context
- The site is shared as a link in WhatsApp and Instagram, so the link preview (og: title, description, image) is part of the product.
- Talks mostly take place at HU Berlin, Campus Nord, Philippstraße 12, Haus 4, Hörsaal 4. The exact place is always stated per talk.
- Talks are in German or English depending on the speaker. Some are streamed on Zoom; the link goes out through the WhatsApp group.
- The WhatsApp group is where the topic, changes and Zoom links arrive first. The site points there, with a QR code for visitors on a laptop.
- Each talk has a poster made for Instagram and print. Recordings and photos go into the site's "Rückblick" (archive) afterwards.
- Formats beyond talks: discussion, film club, social events.

## Capabilities and Constraints
- Static HTML/CSS/JS, no build step: `index.html` (German, the default) and `en/index.html` (English), with a language switch on both and hreflang links. Shared styles and scripts live in `assets/site.css` and `assets/site.js`. Fonts are self-hosted in `fonts/`. Served at bpsa.psng.info (`CNAME`).
- Per talk: date, time, place, speaker with affiliation and bio, topic (sometimes announced later, first in the WhatsApp group), "add to calendar" (Google and .ics), and schema.org Event data.
- Contact form via Formspree with a honeypot field; direct email bpsa@psng.info.
- Light and dark theme, with the visitor's choice stored in localStorage.
- Every content change has to be made in both languages.
- `/legacy` holds the previous homepage, `/lab` the draft space, and `/map` a draft map of psychedelic research groups in Berlin (not linked from the homepage).

## Brand Commitments
- **The BPSA logo** (`bpsa-logo.webp`, `BPSA-Logo*.png`) and the **BPSA autumn 2026 posters** (`Design-solo-v1.png` and `Design-duo-page-1-v1.png`, Logos und Ekstase, 08.09.) are the brand.
- BPSA's visual language may be distinct from PSNG's. It does not need to follow PSNG's look, including the pink-background PSNG posters such as `talk-2026-10-20-poster.jpg` (the PSNG lecture with Prof. Timo T. Schmidt, 20.10.). The PSNG logo (`psng-logo.webp`, `psng-logo-v1-white-extended.png`) only marks network membership and joint PSNG events.
- **The site must not look AI-generated.** This is a binding requirement.
- Open decision for later design work: the logo itself uses a neon cyan-to-purple gradient on dark navy, which is exactly the palette design detectors read as an AI tell. How to honor the logo and posters without the site reading as generic AI output is unresolved. It belongs to `document` or new-work, not here.
- Voice, taken from the existing copy: direct, informal "du", warm and plain. Invites without hype. Bilingual German and English.

## Evidence on Hand
- Three talks since September 2026, spanning neuroscience, psychology and philosophy: Miguel Estéfano Mora Vera (08.09.), Dr. Chris Timmermann (19.10., about 65 people in the lecture hall), Prof. Dr. Timo Torsten Schmidt (20.10., recording to follow).
- Next talk: Dr. med. Tomislav Majić (Charité), Wednesday 04.11.2026, 19:00. Topic still to be announced.
- Photos and portraits: `miguel/`, `timmermann/`, `tts/`, `majic/`. Recording thumbnails: `yt-logos-und-ekstase.webp`, `yt-tts.webp`. WhatsApp QR code: `whatsapp-qr.webp`.
- Organizing team: Jenny, Eric, Lilia, Miguel, Lennert and Meta.
- Not on hand, so never invent any: testimonials or quotes from attendees, member or group sizes, press coverage, sponsor or university endorsements.

## Product Principles
1. **The next talk and the WhatsApp group come first.** On a phone, opened from a chat, both have to be reachable without hunting.
2. **Lower the threshold.** Free, no registration, no prior knowledge needed, open to non-students. Say so plainly, wherever a first-timer might hesitate.
3. **Serious, not sensational.** The subject invites hype and cliché. The site earns trust through researchers, institutions and real facts, the way an academic talk series would.
4. **Made by real people.** Real photos, real names, real numbers from real evenings. Nothing generic or templated.
5. **Two languages, one site.** German and English stay in step.

---
name: Berlin Psychedelic Science Association
description: Talks and discussions with researchers on altered states of consciousness, open to everyone in Berlin.
colors:
  night-navy: "#0a0f2e"
  deep-navy: "#0e1640"
  paper-white: "#ffffff"
  mist: "#cdd2ea"
  signal-cyan: "#7fe3ee"
  lilac: "#d6b4fb"
  rose-error: "#ff9db0"
  daylight: "#f6f7fa"
  daylight-deep: "#eef0f5"
  ink: "#14163c"
  slate: "#4b5074"
  cyan-ink: "#066a76"
  violet-ink: "#7a3ccf"
  crimson-error: "#b4234a"
typography:
  wordmark:
    fontFamily: "Montserrat, DM Sans, system-ui, sans-serif"
    fontSize: "clamp(28px, 7.2vw, 88px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(28px, 3.8vw, 42px)"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(20px, 2.3vw, 26px)"
    fontWeight: 700
    lineHeight: 1.28
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.01em"
  date:
    fontFamily: "Bebas Neue, Arial Narrow, sans-serif"
    fontSize: "clamp(44px, 5.4vw, 60px)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.01em"
rounded:
  tile: "12px"
  card: "16px"
  panel: "20px"
  feature: "26px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 32px)"
  section: "clamp(56px, 8vw, 104px)"
  card-pad: "clamp(16px, 2.6vw, 28px)"
  container: "1140px"
components:
  button-primary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.night-navy}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.4em"
    height: "44px"
  button-primary-light:
    backgroundColor: "{colors.night-navy}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.4em"
  button-ghost:
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.4em"
  card:
    rounded: "{rounded.card}"
    padding: "22px 20px"
  talk-card:
    rounded: "{rounded.panel}"
    padding: "{spacing.card-pad}"
  next-talk-card:
    rounded: "{rounded.feature}"
    padding: "clamp(18px, 3.2vw, 36px)"
  field:
    rounded: "{rounded.tile}"
    padding: "0.75em 0.9em"
    height: "48px"
---

# Design System: Berlin Psychedelic Science Association

## Overview

**Creative North Star: "The Evening Programme"**

The site reads like the printed programme of a lecture series: a date set large, a name, an institution, a lecture hall, and a way to come along. Everything else steps back. Dark mode is the house design, a calm night navy with no violet tint and no glow, because most visitors open a link from WhatsApp on a phone in the evening. Light mode is a neutral off-white, never lavender.

The real material carries the character: speaker portraits, photos of full lecture halls, real affiliations and dates. The interface around it stays quiet and specific so the page never reads as a generated template. The neon cyan-to-magenta gradient belongs to the BPSA logo and stays in the logo.

**Key Characteristics:**
- One filled colour per screen: the WhatsApp button.
- Serif headings, sans body, large condensed dates, and the logo's lettering only for the name.
- Flat, tonal surfaces with thin lines; one soft shadow, only on feature cards.
- Real photos and names instead of icons, stats tiles or illustrations.
- German and English pages share one stylesheet and stay identical in structure.

## Colors

Night navy and white, with cyan as the single interactive hue and lilac for quiet labels.

### Primary
- **Paper White** (dark) / **Night Navy** (light): the fill of the primary button ("WhatsApp-Gruppe beitreten", the header WhatsApp button). It is the only solid colour block on a page.

### Secondary
- **Signal Cyan** (dark) / **Cyan Ink** (light): links, dates' weekday and time line, focus rings, text links, the active edge of ghost buttons on hover.

### Tertiary
- **Lilac** (dark) / **Violet Ink** (light): series labels above talk titles ("BPSA Talk", "PSNG × BPSA Lecture"). Text only, never a fill.

### Neutral
- **Night Navy**: dark page background, top of the page gradient.
- **Deep Navy**: dark page background at the bottom of the gradient.
- **Mist** (dark) / **Slate** (light): secondary text, captions, speaker affiliations.
- **Daylight** / **Daylight Deep**: light page background gradient and quiet surfaces.
- **Ink**: light-mode text.
- Lines are white or ink at 12% (hairline) and 22% (strong) opacity.
- **Rose Error** (dark) / **Crimson Error** (light): form errors only.
- **Institution colours** on the research map (`/map`) only: Charité cyan (#47cddb), HU violet (#b07fe0), MSB amber (#ffc861). They mark pins, legend dots and group numbers, never text or backgrounds.

### Named Rules
**The One Fill Rule.** Only the primary WhatsApp action is a filled shape. Labels, tags and notes ("Eintritt frei · ohne Anmeldung") are text, never pills that look clickable.

**The Logo Keeps Its Gradient Rule.** The cyan-to-magenta gradient appears in the logo image and nowhere else on the site: not in headings, not on portrait rings, not as glows. The one sanctioned exception is the Google Form header banner (`tools/form-banner.html`), where the wordmark is set in the logo gradient.

## Typography

**Wordmark Font:** Montserrat (the lettering of the BPSA logo)
**Headline Font:** Libre Baskerville, bold
**Body and Label Font:** DM Sans
**Date Font:** Bebas Neue

**Character:** an academic serif for what is being said, a friendly sans for everything read at speed, and the posters' condensed face only where it carries numbers.

### Hierarchy
- **Wordmark** (700, clamp 28–88px, 1.05): the organisation name in the hero, solid colour. Nowhere else.
- **Headline** (700, clamp 28–42px, 1.15): section headings ("Vergangene Talks", "Partner"), upright, one colour, no accent word. "Nächster Talk" uses the same face slightly smaller (clamp 24–32px).
- **Title** (700, clamp 20–26px, 1.28): talk titles and speaker names; the next talk scales up to 40px.
- **Body** (400, 16–17px, 1.6): prose, held to 58–68ch.
- **Label** (700, 14–15px, sentence case): series labels, weekday and time, FAQ questions (18px), role titles (19px), countdown badge (13px).
- **Date** (Bebas, 44–80px, 0.9): the day and month of each talk ("04.11.").

### Named Rules
**The Numbers-Only Rule.** Bebas Neue sets dates and the short "BPSA" in the header. It never sets sentences, questions or labels: it is too narrow to read as text.

**The Upright Rule.** No italic or coloured accent words in headings. Italic is reserved for titles of works and foreign terms inside running text (*theia mania*, *Psychedelic Harm Reduction*).

## Layout

A single column in a 1140px container with a fluid gutter (16–32px). Sections are separated by generous vertical space (56–104px) rather than rules or backgrounds. Talk entries use a three-column row (date, body, portrait) that collapses on phones to date and portrait above, body below.

On phones the first screen must show the date, the place and the WhatsApp button of the next talk; the hero shrinks and the top recruiting bar shortens to one line to make room. The section menu in the header is hidden below 900px and replaced by a row of jump links after the next talk. Past talks show their summary line and expand to photos, text and recordings on demand; the most recent one starts open.

## Elevation & Depth

Flat and tonal. Surfaces are white at 4.5% / 7.5% opacity on navy (or white / Daylight Deep in light mode) with a hairline border. One ambient shadow (`0 24px 60px rgba(0,0,0,.42)` dark, `0 18px 44px rgba(22,20,64,.10)` light) lifts the next-talk card, video frames and the join panel. The sticky header uses a translucent navy bar with background blur.

### Named Rules
**The No Glow Rule.** No coloured shadows, radial glows or neon halos. Depth comes from tone and one neutral shadow.

## Shapes

Soft, consistent rounding: 12px on photos, thumbnails and form fields; 16px on FAQ and role cards; 20px on past-talk cards; 26px on the next-talk card and join panel. Buttons, jump links and the countdown badge are full pills. Speaker portraits are circles with a thin neutral line, not a gradient ring. The PSNG logo sits on a white disc.

## Components

### Buttons
- **Shape:** full pill (999px), at least 44px tall.
- **Primary:** Paper White on navy in dark mode, Night Navy on white in light mode, bold 16px label, optional WhatsApp glyph. Hover lifts 1px and brightens slightly, no glow.
- **Ghost:** transparent with a 1.5px strong line; on hover the line and label turn cyan. Used for "Zum Kalender hinzufügen" and "psng.info besuchen".
- **Text link:** cyan, bold, underline on hover (Instagram links).

### Cards / Containers
- **Corner Style:** 16px (FAQ, roles), 20px (past talks), 26px (next talk, join panel).
- **Background:** the translucent surface tone with a hairline border.
- **Shadow Strategy:** only the next-talk card and join panel carry the ambient shadow.
- **Internal Padding:** 20–28px, 16px on phones.

### Inputs / Fields
- **Style:** 1px strong line, field background, 12px radius, at least 48px tall, 16px text.
- **Focus:** cyan border plus a soft 3px ring.
- **Error:** error colour border and a plain-language message under the field.

### Navigation
- **Header:** sticky translucent bar with logo, section links (desktop), theme switch, language switch and the primary WhatsApp button.
- **Recruiting bar:** a quiet full-width band above the header on the surface tone, cyan underlined call to action; one line on phones.
- **Jump row:** outlined pill links after the next talk, phones and tablets only.

### Next-Talk Card (signature)
The programme entry: a large Bebas date with weekday and time, a countdown badge, series label, serif speaker name, affiliation, date and place facts with icons, then the WhatsApp button, calendar menu (Google / .ics) and Instagram link. On laptops a WhatsApp QR code sits under the portrait.

## Do's and Don'ts

### Do:
- **Do** keep the WhatsApp button the only filled colour on the page.
- **Do** use real photos, names, institutions and dates; let a full lecture hall be the proof.
- **Do** set dates in Bebas Neue and everything readable in DM Sans or Libre Baskerville.
- **Do** keep German and English pages identical in structure; change both together.
- **Do** check every change at 375 × 812: date, place and WhatsApp button must stay in the first screen.

### Don't:
- **Don't** use gradient text, glows, coloured shadows or violet-tinted backgrounds.
- **Don't** put small uppercase labels above headings, or italic coloured accent words inside them.
- **Don't** style information as a pill or button when it is not clickable.
- **Don't** build stat tiles or hero metrics; put numbers into sentences or photo captions.
- **Don't** use Bebas Neue for questions, labels or running text.

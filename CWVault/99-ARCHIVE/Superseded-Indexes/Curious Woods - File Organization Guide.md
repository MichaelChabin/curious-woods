**Last Updated:** February 16, 2026

> **Note:** This document describes the HTML prototype file structure in `/Users/michaelchabin/CuriousWoods/stories/` and `/Users/michaelchabin/CuriousWoods/templates/` — NOT the Obsidian vault organization. For vault structure, see [[README]]. The four-page pattern described here predates the current five-page pattern (WHAT → WHERE → WHEN → STORY → WHY) documented in [[00-FOUNDATION/Story-Template]].

---

## Directory Structure

```
CuriousWoods/
├── templates/                          (Reusable starting points)
│   ├── blue-marble-earth.jpg          (NASA Earth image - shared by all stories)
│   ├── page1-what-template.html       (Template: Iconic image hook)
│   ├── page2-where-template.html      (Template: Blue Marble zoom)
│   └── page4-story-template.html      (Template: Story with Maya)
│
└── stories/                            (Completed stories)
    ├── montparnasse/                   (Example: Train crash story)
    │   ├── page1-what.html             (Train through wall image)
    │   ├── page2-where.html            (Zoom to Paris)
    │   ├── page3-when.html             (Oct 22, 1895 timeline - placeholder)
    │   ├── page4-story.html            (Full story with Maya)
    │   └── assets/
    │       ├── montparnasse-accident.jpeg
    │       └── paris-station.jpg
    │
    └── [future-story-name]/            (Copy montparnasse structure)
        ├── page1-what.html
        ├── page2-where.html
        ├── page3-when.html
        ├── page4-story.html
        └── assets/
            └── [story-specific-images]
```

---

## The Four-Page Pattern

Every Curious Woods story follows this sequence:

### Page 1: WHAT (3-5 seconds)

**Purpose:** The Hook - instant curiosity

- Iconic, striking image
- Raises immediate question: "What?! How?!"
- Minimal or no text
- Examples: Train through wall, Stonehenge at sunrise, Fleming's petri dish

**File:** `page1-what.html`  
**Template:** `templates/page1-what-template.html`

---

### Page 2: WHERE (5-8 seconds)

**Purpose:** Geographic context

- Blue Marble Earth view
- Red pin drops at location
- Smooth zoom to region
- Cross-fade to location photo
- Text: Location name

**File:** `page2-where.html`  
**Template:** `templates/page2-where-template.html`

---

### Page 3: WHEN (5-8 seconds)

**Purpose:** Temporal context

- Timeline animation
- Shows date/era in context
- Examples: "October 22, 1895" on Belle Époque timeline, "3000 BCE" on Neolithic timeline

**File:** `page3-when.html`  
**Template:** NOT YET BUILT (needs separate session for animation)

---

### Page 4: STORY (Main content)

**Purpose:** Full story with Maya conversation

- Text column (600px, right-positioned)
- Maya companion (middle-left)
- TTS controls (upper-left, minimized)
- Embedded images/diagrams inline
- "Explore" button to optional Page 5 tool

**File:** `page4-story.html`  
**Template:** `templates/page4-story-template.html`

---

## How to Create a New Story

### Step 1: Copy the Montparnasse Folder

```
cp -r stories/montparnasse stories/your-story-name
cd stories/your-story-name
```

### Step 2: Gather Your Assets

**Required images:**

1. **WHAT image** (iconic hook) - rename to match story
2. **WHERE destination** (location photo) - for page2 fade-in
3. **Story images** (any embedded in page4)

**Shared asset:**

- Blue Marble Earth (already in `/templates/`, referenced by all page2 files)

### Step 3: Customize Each Page

**Page 1 (WHAT):**

```html
<!-- Change image path -->
<img id="what-image" src="assets/your-what-image.jpg" alt="Description">

<!-- Optional: Add minimal text -->
<div id="what-text">Your Text Here</div>
```

**Page 2 (WHERE):**

```javascript
// Update coordinates (get from Google Maps)
const LAT = 35.0116;  // Your latitude
const LON = 135.7681; // Your longitude

// Update location name
<div id="location-text">Kyoto, Japan</div>

// Update destination image
<img id="location-image" src="assets/your-location.jpg" alt="Location">
```

**Page 3 (WHEN):**

```html
<!-- Update date/era -->
<h1>Your Date Here</h1>
<h2>Your Era Description</h2>
<!-- Timeline animation will be added later -->
```

**Page 4 (STORY):**

```html
<!-- Replace story content in #story-container -->
<h1>Your Story Title</h1>
<p>Your story text...</p>

<!-- Add your images -->
<div class="embedded-image">
    <img src="assets/your-image.jpg" alt="Description">
    <div class="caption">Your caption</div>
</div>
```

### Step 4: Update Colors (Optional)

If story needs different colors, edit CSS variables in page4-story.html:

```css
--maya-bg: #8b9d83;        /* Maya button color */
--maya-border: #6b7d63;    /* Border color */
--button-hover: #a8b5a0;   /* Hover state */
```

Extract colors from your WHAT image using an eyedropper tool, use muted versions.

---

## File Paths and Links

### Between Pages (within a story folder):

```html
<!-- Page 1 → Page 2 -->
window.location.href = 'page2-where.html';

<!-- Page 2 → Page 3 -->
window.location.href = 'page3-when.html';

<!-- Page 3 → Page 4 -->
window.location.href = 'page4-story.html';
```

### Shared Assets:

```html
<!-- Blue Marble (from any story's page2) -->
<img src="../../templates/blue-marble-earth.jpg">
```

### Story-Specific Assets:

```html
<!-- Images in same story folder -->
<img src="assets/your-image.jpg">
```

---

## Templates Explained

### page1-what-template.html

- Clean, simple full-screen image
- Fade-in animation
- Optional text overlay
- 3-second delay before clickable
- Customize: image path, optional text, timing

### page2-where-template.html

- NASA Blue Marble Earth
- Pin drop animation
- Zoom with easing
- Cross-fade to location
- Customize: lat/lon coordinates, location name, destination image

### page4-story-template.html

- Complete story layout with Maya
- All interactions working
- Typography and spacing set
- Customize: story content, embedded images, colors

---

## What's NOT Built Yet

**Page 3 (WHEN) Template:**

- Timeline animation patterns need dedicated session
- Each story type may need different timeline approach:
    - Historical events: chronological timeline
    - Scientific discoveries: era context
    - Ancient history: deep time scale
    - Natural phenomena: geological time
- For now, use simple placeholder with date/era text

**Page 5 (Optional Interactive Tools):**

- Full-screen tools like coordinate plane explorer
- Built per-story as needed
- Not required for all stories

---

## Image Requirements

### Page 1 (WHAT):

- Aspect ratio: 16:9 (1920×1080) or similar landscape
- High impact, instantly recognizable
- High contrast works best
- File size: < 500KB recommended

### Page 2 (WHERE):

- Blue Marble: In `/templates/` folder, 2048×1024, reused by all stories
- Destination photo: 1920×1080 or similar, < 500KB

### Page 4 (STORY):

- Embedded images: max 600px wide (fits text column)
- Various aspect ratios OK
- File size: < 300KB each recommended

---

## Testing Checklist

When creating a new story:

**Page 1:**

- [ ] Image loads and displays
- [ ] Fade-in animation plays
- [ ] Can click after 3 seconds
- [ ] Continues to Page 2

**Page 2:**

- [ ] Blue Marble loads
- [ ] Pin appears at correct location on Earth
- [ ] Zoom animation smooth
- [ ] Destination photo fades in
- [ ] Location name appears
- [ ] Continues to Page 3

**Page 3:**

- [ ] Date/era displays correctly
- [ ] Timeline animation (when built)
- [ ] Continues to Page 4

**Page 4:**

- [ ] Story text readable (600px column)
- [ ] Maya positioned correctly (middle-left)
- [ ] TTS controls appear (minimized)
- [ ] Embedded images display inline
- [ ] Can type questions to Maya
- [ ] Can drag Maya unit
- [ ] Can resize transcript window

**Full sequence:**

- [ ] Test WHAT → WHERE → WHEN → STORY flow
- [ ] Timing feels right (not too fast or slow)
- [ ] Story tells coherent narrative
- [ ] Child would understand progression

---

## Quick Reference: Coordinates for Common Locations

```
Paris, France:        48.8566, 2.3522
London, UK:           51.5074, -0.1278
New York, USA:        40.7128, -74.0060
Tokyo, Japan:         35.6762, 139.6503
Cairo, Egypt:         30.0444, 31.2357
Sydney, Australia:    -33.8688, 151.2093
Rio, Brazil:          -22.9068, -43.1729
Mumbai, India:        19.0760, 72.8777
Moscow, Russia:       55.7558, 37.6173
Mexico City, Mexico:  19.4326, -99.1332
```

Get exact coordinates: Right-click location in Google Maps → click coordinates

---

## Tips and Best Practices

**For WHAT images:**

- Choose images that genuinely surprise
- Avoid generic landscapes or portraits
- Think: "Would a 10-year-old gasp?"
- No text needed - let image speak

**For story content:**

- Write at adult level (no condescension)
- Short sentences, active voice
- ~1000 words for events
- ~500 words for puzzles
- Embed images at natural breaks

**For Maya colors:**

- Extract from WHAT image (eyedropper)
- Use muted, softer versions
- Test contrast (text must be readable)
- When in doubt, use default sage green

**For timing:**

- Page 1: 3-5 seconds (hook must land)
- Page 2: 5-8 seconds (geography sinks in)
- Page 3: 5-8 seconds (era context)
- Don't rush - child needs time to process

---

## Troubleshooting

**"Images won't load"**

- Check file paths (case-sensitive!)
- Verify files are in `assets/` folder
- Try hard refresh: Cmd+Shift+R

**"Blue Marble won't load in Page 2"**

- Check path: `../../templates/blue-marble-earth.jpg`
- File must be in `/templates/` folder
- Download from NASA if missing

**"Pin appears in wrong location"**

- Verify latitude/longitude
- Check Google Maps coordinates
- Remember: lat = north/south, lon = east/west

**"Maya button not appearing"**

- Check browser console for errors
- Verify all JavaScript loads
- Try opening page4 directly to test

**"Animation timing feels wrong"**

- Edit TIMING constants in JavaScript
- Test on actual iPad if possible
- Get feedback from child if available

---

**Questions?** Check Session-3-Summary.md for full context of what we built.
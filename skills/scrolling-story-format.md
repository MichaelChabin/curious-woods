# Scrolling Story Format Skill

## Purpose
This skill guides the creation of immersive, scroll-based educational story pages for The Curious Woods platform. These pages serve as engaging introductions to interactive mathematical concepts, building curiosity before launching into hands-on exploration.

## Core Philosophy

**This is NOT gamification.** These stories reveal mathematical beauty through:
- **Discovery over instruction** - Lead students to notice patterns, don't tell them
- **Visual primacy** - Show relationships in space before introducing notation
- **Error prevention by design** - Wrong answers don't register; students practice being right
- **Celebration of structure** - "Look at this beautiful pattern!" not "You got it right!"

## Inspiration Models

### Nature Magazine Photo Essays
- Full-bleed imagery
- Minimal text overlays
- Scroll-triggered progressive reveals
- Cinematic pacing

### Apple Product Pages
- Emotional hook first ("Imagine if...")
- Feature reveal second (show it working)
- Technical detail last (how it works)
- Clear call-to-action (try it now)

## Structure Template

### 1. Hero Section (Full Viewport)
**Purpose:** Create immediate curiosity with a provocative question or paradox

**Elements:**
- Large, striking visual (animated if possible)
- Single compelling question or statement
- Minimal text (10-20 words max)
- No navigation clutter

**Example:**
```
Visual: Animated rectangle subdividing itself endlessly
Text: "Some numbers refused to be measured. The Greeks called them 'unspeakable.'"
```

### 2. Context Section (Scroll to reveal)
**Purpose:** Ground the concept in real history or tangible experience

**Elements:**
- Historical context or relatable scenario
- Simple diagram or illustration
- 2-3 short paragraphs (150-200 words total)
- Conversational tone

**Example:**
```
Visual: Ancient Greek mathematician with measuring tools
Text: "In 500 BCE, the Pythagoreans discovered something disturbing. 
They could measure the side of a square, but not its diagonal. 
No fraction worked. No ratio captured it. 
The number √2 simply... escaped."
```

### 3. The Reveal (Scroll-triggered animation)
**Purpose:** Show the mathematical concept in action

**Elements:**
- Animated visualization of the core concept
- Brief explanatory text (50-100 words)
- Visual should be self-explanatory
- Let the mathematics speak for itself

**Example:**
```
Visual: Rectangle subdivision algorithm playing automatically
Text: "Watch what happens when we try to measure one length with another..."
[Animation shows: Click point → subdivide → convergents spiral]
```

### 4. Interactive Preview (Optional)
**Purpose:** Give a taste of the hands-on experience

**Elements:**
- Simplified version of the full interactive
- Single guided action ("Click here to...")
- Immediate visual feedback
- 30 seconds or less

### 5. Launch Section
**Purpose:** Transition smoothly into the full interactive

**Elements:**
- Brief summary (1-2 sentences)
- Clear launch button
- Set expectations ("You'll be able to...")
- Optional: Link to related interactives

**Example:**
```
Text: "Now it's your turn. Click anywhere on the coordinate plane 
and watch as the ancient algorithm unfolds."
Button: "Explore Continued Fractions"
```

## Technical Specifications

### Visual Style
- **Color palette:** #F8F8F0 (background), #1D3B4F (primary), #546A80 (secondary), #BE622F (accent)
- **Inspiration:** Gaudí's stained glass windows - organic, mathematical, luminous
- **Typography:** Clean, readable, hierarchical
- **No emojis** in the interface

### Scroll Behavior
```javascript
// Use Intersection Observer API
const options = {
  threshold: 0.5,  // Trigger when 50% visible
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, options);
```

### Animation Guidelines
- **Smooth and purposeful** - Every animation reveals something mathematical
- **Not decorative** - If it doesn't teach, cut it
- **Performance-conscious** - CSS transforms > JS animations
- **Accessible** - Respect prefers-reduced-motion

### Responsive Design
- **Mobile-first** - Many students use phones/tablets
- **Full viewport sections** - Each section fills the screen
- **Touch-friendly** - Large tap targets (44px minimum)
- **Readable text** - 16px minimum body text

## Content Guidelines

### Tone
- **Conversational but precise** - "You'll notice..." not "One observes..."
- **Wonder over explanation** - Lead with curiosity, follow with understanding
- **Historical grounding** - Connect to real mathematicians and real problems
- **Avoid condescension** - Respect children's intelligence

### Text Length
- **Hero:** 10-20 words
- **Context:** 150-200 words
- **Reveal:** 50-100 words
- **Launch:** 20-30 words

### Historical Accuracy
- Use actual historical names and dates when possible
- Acknowledge mysteries and uncertainties
- Connect ancient problems to modern understanding
- Avoid oversimplification

## Examples by Topic

### Continued Fractions
**Hook:** "The Greeks discovered numbers that couldn't be measured."
**Visual:** Rectangle subdivision algorithm
**Context:** Pythagoreans and √2
**Interactive:** Click any point, watch convergents spiral

### Multiplication as Area
**Hook:** "Why is 6 × 8 the same as 8 × 6?"
**Visual:** Rectangle rotating
**Context:** Euclid's geometric proof
**Interactive:** Draw rectangles, see them rotate

### Prime Factorization
**Hook:** "Every number is built from primes. But how?"
**Visual:** Number glowing with colored factors
**Context:** Fundamental Theorem of Arithmetic
**Interactive:** Toggle primes to build numbers

## Common Pitfalls to Avoid

### ❌ Don't:
- Use "fun" or "exciting" - Let the mathematics be compelling
- Add unnecessary game elements (points, levels, timers)
- Over-explain - Trust visual communication
- Make it too long - Attention spans are real
- Include multiple concepts - One story, one idea

### ✅ Do:
- Lead with genuine questions
- Use precise mathematical language
- Show before telling
- Keep it focused and brief
- Test with actual students

## Integration with The Curious Woods

### Relationship to AI Maître'd
These story pages are what the Maître'd presents when introducing a new concept. They should:
- Be self-contained (no assumed prior knowledge)
- Link naturally to prerequisite concepts
- Tag clearly for the curriculum taxonomy
- Work on any device

### Prerequisite Tagging
Each story should declare its prerequisites:
```json
{
  "requires": ["coordinate-plane.plotting-points", "fractions.basic"],
  "teaches": ["continued-fractions.geometric-interpretation"],
  "connects-to": ["euclidean-algorithm", "irrational-numbers"]
}
```

## Development Workflow

### 1. Content Planning
- Define the core mathematical insight
- Find the historical or real-world hook
- Sketch the visual progression
- Write the text (brevity is hard!)

### 2. Visual Development
- Create static mockups first
- Test scroll behavior
- Add animations last
- Get feedback early

### 3. Technical Implementation
- Build mobile version first
- Test on actual devices
- Optimize performance
- Add progressive enhancement

### 4. Testing & Iteration
- Watch students use it (silently!)
- Track where they pause/skip
- Refine based on behavior
- Kill your darlings

## Success Criteria

A scrolling story succeeds when:
- ✅ Students naturally scroll through without prompting
- ✅ They pause at the reveal moment
- ✅ They click "launch" wanting to explore more
- ✅ The mathematical concept feels discoverable, not told
- ✅ It works beautifully on a phone

## Resources & References

### Technical
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap)
- [Framer Motion](https://www.framer.com/motion/) for React animations

### Inspiration
- Nature Immersive stories
- Apple product launches
- Bret Victor's explorable explanations
- 3Blue1Brown's visual style

### Historical Sources
- *The Number Sense* by Stanislas Dehaene
- *Mathematics and Its History* by John Stillwell
- *Journey Through Genius* by William Dunham

---

## Quick Start Checklist

When creating a new scrolling story:

- [ ] Define one clear mathematical insight
- [ ] Find the historical or experiential hook
- [ ] Write hero text (10-20 words)
- [ ] Sketch visual progression (3-5 sections)
- [ ] Create context section (150-200 words)
- [ ] Design reveal animation
- [ ] Build mobile version first
- [ ] Test scroll behavior
- [ ] Add prerequisite tags
- [ ] Get student feedback

---

*This skill was created as part of The Curious Woods development process. Last updated: November 6, 2025*

# [Story/Interactive Name] Specification

**Version:** 1.0  
**Status:** [Draft / In Progress / Complete]  
**Last Updated:** [Date]  
**Foundation:** Uses [[00-FOUNDATION/Interface-Foundation]] v1.0  
**Template:** Based on [[00-FOUNDATION/Story-Template]]

---

## Overview

### What Is This?
[2-3 sentences describing what this story/interactive is about]

### Content Type
- [ ] Event Story (~1000 words)
- [ ] Puzzle Story (~500 words)
- [ ] Extended Story (multiple chapters)
- [ ] Math Interactive
- [ ] Science Interactive
- [ ] Practice Tool
- [ ] Other: [specify]

### Target Experience
[One sentence: What should the child feel/think/do when experiencing this?]

---

## The Hook (First 10 Seconds)

### Visual Element
**Type:** [Image / Animation / Interactive / Combination]

**Description:**
[Detailed description of what the child sees immediately]

**Why It Works:**
[Why this will grab a 10-year-old's attention]

**Assets Needed:**
- [ ] [Image file name/description]
- [ ] [Animation sequence]
- [ ] [Interactive element]

---

## The Story/Context

### Core Narrative
[The story in prose - write it out or outline it clearly]

### Key Concepts
The big ideas this content introduces or builds on:
1. [Concept name] - [Brief explanation]
2. [Concept name] - [Brief explanation]
3. [Concept name] - [Brief explanation]

### Prerequisite Tags
What the child should have encountered before (if anything):
- [Tag name] - [[link to other content if exists]]
- [Tag name] - [[link to other content if exists]]

### Natural Extensions
Where curiosity might lead next:
- [Extension topic] - [Why it connects]
- [Extension topic] - [Why it connects]

### Surprising Details
Specific facts that make this memorable:
- [Specific detail that's surprising]
- [Specific detail that's beautiful]
- [Specific detail that's intriguing]

---

## The Interactive Component

### Purpose
[What does this interactive help the child discover or understand?]

### Type
- [ ] Visualization (shows relationships)
- [ ] Manipulation (direct control)
- [ ] Simulation (behavior over time)
- [ ] Construction (build something)
- [ ] Exploration (discover patterns)

### Core Mechanics
**What the child can do:**
1. [Action] - [Result]
2. [Action] - [Result]
3. [Action] - [Result]

**What feedback they get:**
- [Visual feedback]
- [Numerical feedback]
- [Behavioral feedback]

### Technical Implementation

**Canvas/SVG Elements:**
- [Element name] - [Purpose]
- [Element name] - [Purpose]

**Controls:**
- [Control type] - [What it controls] - [Range/options]
- [Control type] - [What it controls] - [Range/options]

**Data Generated:**
What information does this interactive produce that Maya can reference?
- `[data_point_name]`: [Description]
- `[data_point_name]`: [Description]

---

## Maya Integration

### Context File Structure
Location: `data/maya-context.json`

### Key Concepts for Maya
[List the main ideas Maya should understand about this content]
- [Concept]
- [Concept]
- [Concept]

### Anticipated Questions
Common questions children might ask:

**Question:** "[Typical question]"  
**Context Key:** `[key_name]`  
**Answer Direction:** [How Maya should respond]  
**Follow-up Paths:** [Related topics to suggest]

**Question:** "[Typical question]"  
**Context Key:** `[key_name]`  
**Answer Direction:** [How Maya should respond]  
**Follow-up Paths:** [Related topics to suggest]

### Conversation Triggers
Moments when the story/interactive should prompt conversation:
- **Trigger:** [What happens]
- **Maya Says:** [Suggestion or question]
- **Purpose:** [Why this moment matters]

---

## Practice Integration

### "I Want to Remember This" Placements
Where should these buttons appear?
1. [Location/context] - [What gets added to practice list]
2. [Location/context] - [What gets added to practice list]

### Recommended Practice Methods
For content the child wants to remember:
- **Method:** [Elaborative encoding / Rhythmic practice / Writing to remember / etc.]
- **Why:** [Why this method suits this content]
- **Implementation:** [How the Guide facilitates this]

---

## Control Panel Specification

### Minimal State (Always Visible)
**Controls:**
- [Control name] - [Function]
- [Control name] - [Function]

### Full State (Expandable)
**Sections:**

**Section: [Name]**
- [Control] - [Function] - [Default value]
- [Control] - [Function] - [Default value]

**Section: [Name]**
- [Control] - [Function] - [Default value]

---

## Visual Design Specifications

### Color Palette
Uses [[00-FOUNDATION/Interface-Foundation#Color-Palette]] plus:
- **Content-specific color:** `#HEXCODE` - [Purpose]
- **Content-specific color:** `#HEXCODE` - [Purpose]

### Typography
Uses [[00-FOUNDATION/Interface-Foundation#Typography]] with:
- [Any variations or specific needs]

### Layout
- **Content area width:** [Default is 700px for text, specify if different]
- **Special positioning:** [Any unique layout needs]

### Assets Required
- [ ] [Image file] - [Dimensions] - [Description]
- [ ] [Image file] - [Dimensions] - [Description]
- [ ] [Audio file] - [Description]
- [ ] [Other asset] - [Description]

---

## Technical Implementation

### File Structure
```
[content-name]/
├── index.html
├── styles/
│   └── [content-name].css
├── scripts/
│   ├── interactive.js
│   └── maya-integration.js
├── assets/
│   ├── images/
│   └── audio/
└── data/
    ├── story-content.json
    └── maya-context.json
```

### Dependencies
- [ ] Interface Foundation CSS
- [ ] Maya conversation system
- [ ] [Other libraries/frameworks]

### Browser Requirements
- [Any specific requirements beyond foundation specs]

### Performance Targets
- Initial load: [Target time]
- Interactive responsiveness: [Target time]
- [Other performance criteria]

---

## Testing Criteria

### Does It Work?
- [ ] Hook grabs attention in first 10 seconds
- [ ] Story is engaging and doesn't condescend
- [ ] Interactive allows genuine exploration
- [ ] Maya button responds to questions naturally
- [ ] Practice integration works smoothly

### Does It Match the Vision?
- [ ] Respects child's intelligence
- [ ] Enables curiosity-driven exploration
- [ ] Creates conditions for conversation
- [ ] Provides memorable context
- [ ] Maintains sophisticated design

### Technical Validation
- [ ] All interface elements work per foundation spec
- [ ] Responsive on iPad (primary target)
- [ ] Accessible (keyboard, screen reader)
- [ ] Performance meets targets
- [ ] Maya context file complete and accurate

---

## Open Questions

[List any unresolved design or implementation questions]

1. [Question]
2. [Question]
3. [Question]

---

## Implementation Checklist

- [ ] Hook designed and assets created
- [ ] Story written at appropriate length
- [ ] Interactive mechanics defined
- [ ] Control panel designed
- [ ] Maya context file created
- [ ] Practice integration specified
- [ ] Visual design completed
- [ ] Technical implementation done
- [ ] Testing completed
- [ ] Ready for child testing

---

## Related Content

**Prerequisites:** (Child should encounter these first)
- [[content-name]] - [Relationship]

**Natural Pairs:** (Works well alongside)
- [[content-name]] - [Relationship]

**Extensions:** (Where this might lead)
- [[content-name]] - [Relationship]

---

## Version History

### Version 1.0 - [Date]
- Initial specification

---

**Status:** [Current status of this spec]  
**Next Step:** [What needs to happen next]  
**Prototype Location:** [Path to prototype if exists]

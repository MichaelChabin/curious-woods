# Geographic Assets Specification

**Status:** Foundation Document  
**Last Updated:** January 29, 2026  
**Version:** 1.0 (Draft - awaiting NASA imagery exploration)

---

## Overview

This specification defines the geographic imagery system used across Curious Woods stories. These assets power the WHERE and WHEN pages, establish spatial context, and appear embedded in story content.

**Core Principle:** Use authentic scientific imagery (NASA Blue Marble) to show Earth as it actually is, not stylized educational graphics. Build intuitive spatial understanding through repeated exposure to real planetary views.

---

## Image Types

### 1. Globe Views (Full Earth Perspective)

**Purpose:** Establish global context - "where in the world is this?"

**Source:** NASA Blue Marble collection - pre-rendered globe perspectives

**Available Perspectives:**
- Western Hemisphere (Americas centered)
- Eastern Hemisphere (Africa/Europe/Asia)
- Pacific View (Australia/Pacific Islands)
- Arctic View
- Antarctic View
- [Additional perspectives to be cataloged]

**Specifications:**
- Resolution: Medium (1024-2048px) - sufficient for context view
- Format: JPEG (optimized for web)
- File size target: 500KB-1MB per image
- Color space: sRGB
- No labels or overlays in source files (added at runtime)

**File Naming Convention:**
```
bluemarble_globe_western_hemisphere.jpg
bluemarble_globe_eastern_hemisphere.jpg
bluemarble_globe_pacific_view.jpg
```

**Storage Location:**
```
/assets/geographic/globe-views/
```

### 2. Regional Crops (High-Resolution Detail)

**Purpose:** Detailed view of specific geographic region for labeling and exploration

**Source:** NASA Blue Marble high-resolution imagery, cropped to region

**Rendering Style:**
- Orthographic projection (globe-like, not Mercator)
- Maintains true relative sizes
- Shows physical geography (topography, vegetation, water)
- No political borders

**Specifications:**
- Resolution: High (2048-4096px width) - allows detailed labeling
- Format: JPEG (optimized for web)
- File size target: 2-4MB per crop
- Color space: sRGB
- Seasonal variation available (optional): summer, winter, spring, fall

**File Naming Convention:**
```
bluemarble_crop_mediterranean_basin_2048w.jpg
bluemarble_crop_western_europe_2048w.jpg
bluemarble_crop_east_asia_4096w.jpg
bluemarble_crop_mediterranean_basin_summer_2048w.jpg (seasonal variant)
```

**Storage Location:**
```
/assets/geographic/regional-crops/
```

---

## Pre-Defined Regions

Each region is defined by geographic bounds and has associated cropped imagery.

**Region Definition Structure:**
```json
{
  "region_id": "mediterranean_basin",
  "display_name": "Mediterranean Basin",
  "globe_view": "eastern_hemisphere",
  "bounds": {
    "north": 45.0,
    "south": 30.0,
    "west": -10.0,
    "east": 40.0
  },
  "center": {
    "lat": 37.5,
    "lon": 15.0
  },
  "typical_zoom_level": 4,
  "crop_resolutions_available": [2048, 4096],
  "seasonal_variants": false,
  "description": "Includes Greece, Italy, North Africa, Middle East coastal regions",
  "typical_story_types": ["ancient_civilizations", "maritime_history"]
}
```

**Initial Region Set (to be expanded):**

1. **Mediterranean Basin**
   - Ancient Greece, Rome, Egypt, Phoenicia
   - Most dense historical activity

2. **Western Europe**
   - Industrial Revolution, modern European history
   - France, Britain, Germany, Low Countries

3. **Middle East / Mesopotamia**
   - Cradle of civilization
   - Tigris-Euphrates valley, Persian Gulf

4. **East Asia**
   - China, Korea, Japan
   - Major civilizational center

5. **Southeast Asia**
   - Angkor, Indonesian archipelago
   - Maritime trade routes

6. **Indian Subcontinent**
   - Indus Valley, Ganges plains
   - South Asian civilizations

7. **North Africa**
   - Sahara, Nile Valley, Sub-Saharan transition
   - Shows environmental change over time

8. **Sub-Saharan Africa**
   - Great Rift Valley, West African kingdoms
   - Often overlooked in traditional education

9. **Central America / Caribbean**
   - Maya, Aztec civilizations
   - Island chains visible

10. **South America - Andes**
    - Inca, pre-Columbian Andean cultures
    - Dramatic topography

11. **North America - Eastern**
    - Colonial history, U.S. development
    - Visible geography (Appalachians, Great Lakes)

12. **North America - Western**
    - Indigenous cultures, westward expansion
    - Rocky Mountains, Pacific coast

13. **Pacific Islands**
    - Polynesian navigation, island cultures
    - Shows vast distances and navigation challenge

14. **Arctic Regions**
    - Indigenous peoples, climate change
    - Seasonal ice variation visible

15. **Antarctica**
    - Exploration history
    - Pristine Earth view

[Additional regions to be defined as story needs emerge]

---

## Location Database

Every significant location referenced in stories is cataloged with precise coordinates.

**Location Entry Structure:**
```json
{
  "location_id": "pyramids_giza",
  "display_name": "Great Pyramid of Giza",
  "alternate_names": ["Pyramid of Khufu", "Cheops Pyramid"],
  "coords": {
    "lat": 29.9792,
    "lon": 31.1342
  },
  "appears_in_regions": ["mediterranean_basin", "north_africa"],
  "location_type": "monument",
  "time_period": "ancient",
  "associated_stories": [
    "pyramid_construction",
    "ancient_egypt_trade",
    "nile_flood_cycle"
  ],
  "map_label_priority": "high"
}
```

**Location Types:**
- `monument` - Pyramids, temples, structures
- `city` - Ancient or modern cities
- `natural_feature` - Rivers, mountains, valleys
- `region` - Broader areas (Sahara, Mediterranean)
- `event_site` - Location of specific historical event

**Label Priority:**
- `high` - Always labeled if in view (Great Pyramid, Rome, etc.)
- `medium` - Labeled if space permits
- `low` - Only labeled if specifically relevant to story

**Master Location Database:**
```
/data/geographic/locations.json
```

---

## Coordinate Mapping System

### Converting Lat/Lon to Pixel Coordinates

For orthographic (globe-like) projections, standard formulas apply:

```javascript
function latLonToPixel(lat, lon, imageBounds, imageWidth, imageHeight) {
  // Convert degrees to radians
  const latRad = lat * (Math.PI / 180);
  const lonRad = lon * (Math.PI / 180);
  
  // Normalize to image bounds
  const x = ((lon - imageBounds.west) / (imageBounds.east - imageBounds.west)) * imageWidth;
  const y = ((imageBounds.north - lat) / (imageBounds.north - imageBounds.south)) * imageHeight;
  
  return { x: Math.round(x), y: Math.round(y) };
}
```

### Handling Different Projections

- **Orthographic crops:** Use standard lat/lon to pixel conversion
- **Globe views:** Requires 3D to 2D projection accounting for visible hemisphere
- **Equirectangular source:** NASA Blue Marble original is equirectangular

**Projection Conversion Library:**
```
/scripts/geographic/coordinate-projection.js
```

---

## Integration with Story Pages

### WHERE Page Usage

**Sequence:**
1. Load appropriate globe view
2. Highlight region with subtle glow/pulse
3. Transition (zoom/fade) to regional crop
4. Display location label(s)

**Implementation:**
```json
{
  "story_id": "montparnasse-crash",
  "where_page": {
    "globe_view": "western_hemisphere",
    "highlight_region": "western_europe",
    "crop_region": "western_europe",
    "crop_resolution": 2048,
    "primary_location": {
      "location_id": "paris_france",
      "display_name": "Paris, France",
      "coords": {"lat": 48.8566, "lon": 2.3522}
    },
    "transition_duration_ms": 3000
  }
}
```

### WHEN Page Usage

**Regional crop displayed with:**
- Timeline(s) above and/or below
- Connecting lines from timeline events to map locations
- Multiple locations visible if events span geography
- Same crop used as WHERE page for consistency

**Visual Hierarchy:**
- Story event: Prominent marker and label
- Child's history: Semi-transparent markers
- Anchor landmarks: Standard markers with labels

### Embedded in STORY Page

Crops can appear inline in scrolling story content:
- Smaller resolution (1024px width)
- Specific detail highlighted
- Caption with context

---

## Asset Creation Workflow

### Initial Setup (One-Time)

**Step 1: Acquire Source Imagery**
- Download NASA Blue Marble imagery at highest available resolution
- Organize by:
  - Globe perspectives
  - Equirectangular full-Earth for cropping
  - Seasonal variants (if using)

**Step 2: Generate Globe Views**
- Identify 8-12 useful globe perspectives
- Render at 1024px and 2048px widths
- Optimize for web delivery
- Document which regions each view best shows

**Step 3: Define Initial Regions**
- Create region definitions for 15 initial regions
- Define geographic bounds for each
- Document typical use cases

**Step 4: Generate Regional Crops**
- For each region, generate orthographic crop
- Create at multiple resolutions (2048w, 4096w)
- Optimize for web
- Verify bounds capture intended geography

**Step 5: Create Location Database**
- Identify 50-100 key locations
- Research precise coordinates
- Assign to appropriate regions
- Set label priorities

**Step 6: Build Coordinate Mapping Tools**
- Implement lat/lon to pixel conversion
- Test against known locations
- Create verification tools

### Adding New Story Geographic Assets

**For each new story:**

1. **Identify location(s)**
   - Where does story take place?
   - What geography is relevant?

2. **Check existing regions**
   - Does an existing regional crop work?
   - Or need new region defined?

3. **Check location database**
   - Is location already cataloged?
   - If not, add entry with coordinates

4. **Select globe view**
   - Which perspective best shows this region?

5. **Test rendering**
   - Verify location renders correctly on crop
   - Check label placement and readability

6. **Update story metadata**
```json
{
  "story_id": "new_story",
  "where_page": {
    "globe_view": "...",
    "crop_region": "...",
    "primary_location": {...}
  },
  "when_page": {
    "crop_region": "...",
    "timeline_locations": [...]
  }
}
```

**Time estimate per story:** 30-60 minutes (after initial setup)

---

## File Structure

```
curious-woods/
├── assets/
│   └── geographic/
│       ├── globe-views/
│       │   ├── bluemarble_globe_western_hemisphere.jpg
│       │   ├── bluemarble_globe_eastern_hemisphere.jpg
│       │   └── [other perspectives]
│       ├── regional-crops/
│       │   ├── bluemarble_crop_mediterranean_basin_2048w.jpg
│       │   ├── bluemarble_crop_western_europe_2048w.jpg
│       │   └── [other regions, resolutions]
│       └── source/
│           └── [high-res NASA source files]
├── data/
│   └── geographic/
│       ├── regions.json          (region definitions)
│       ├── locations.json        (location database)
│       └── globe-perspectives.json (globe view metadata)
├── scripts/
│   └── geographic/
│       ├── coordinate-projection.js
│       ├── generate-crops.js
│       └── verify-locations.js
└── stories/
    └── [story-name]/
        └── data/
            └── geographic-context.json (story-specific geography)
```

---

## Technical Specifications

### Image Optimization

**Globe Views:**
- Original resolution: Keep high-res source
- Web delivery: 1024w (mobile/tablet), 2048w (desktop)
- Compression: JPEG quality 85-90
- Progressive JPEG encoding
- Target file size: 500KB-1MB

**Regional Crops:**
- Original resolution: Keep highest available
- Web delivery: 2048w (standard), 4096w (high-detail)
- Compression: JPEG quality 85-90
- Progressive JPEG encoding
- Target file size: 2-4MB (acceptable for detail view)

### Performance Considerations

**Loading Strategy:**
- Globe view: Load immediately (smaller file)
- Regional crop: Preload during globe view display
- Timeline page: Reuse already-loaded crop from WHERE page
- Embedded story images: Lazy load on scroll

**Caching:**
- Globe views: Cache aggressively (rarely change)
- Regional crops: Cache per session (same crop used multiple times per story)
- CDN delivery for fast global access

---

## Design Guidelines

### Visual Consistency

**Color Accuracy:**
- Use NASA imagery as-is (no color grading)
- Maintains scientific authenticity
- Seasonal variants show natural variation

**Labeling:**
- Font: [To be specified in Interface Foundation]
- Color: White text with dark semi-transparent background
- Size: Scales with image resolution
- Position: Avoid obscuring major features

**Highlighting:**
- Region highlight on globe: Subtle glow (soft yellow/gold)
- Location markers: Consistent style across all maps
- Connecting lines: Semi-transparent, don't obscure geography

### Accessibility

**Text Contrast:**
- All labels must meet WCAG AA standards
- Background overlays ensure readability

**Alternative Text:**
- Globe views: "View of Earth from space, [region] visible"
- Regional crops: "Satellite view of [region name]"
- Location labels: Available via screen reader

---

## Future Enhancements

**Potential Additions:**

1. **Seasonal Variants**
   - Show environmental change (Sahara green vs. desert)
   - Teach climate and historical change

2. **Night Imagery**
   - NASA Black Marble (Earth at night)
   - Shows modern cities, light pollution
   - Useful for modern history stories

3. **Topographic Emphasis**
   - Exaggerated relief for mountain ranges
   - Helps understand geographic barriers

4. **Animated Transitions**
   - Globe rotation to show perspective shift
   - Smooth zoom from globe to crop

5. **Historical Coastlines**
   - Show Mediterranean before Strait of Gibraltar
   - Black Sea flood visualization
   - Ice Age coastlines

6. **Interactive Exploration**
   - Click any visible location for information
   - Pan/zoom on regional crops
   - Toggle labels on/off

---

## Related Specifications

- [[Story-Template]] - How geographic assets are used in five-page structure
- [[Interface-Foundation]] - UI elements for labeling and interaction
- [[Claude-Learning-System]] - How child's geographic exploration is tracked

---

## Version History

### Version 1.0 - Draft (January 29, 2026)
- Initial specification outline
- Awaiting NASA imagery exploration
- Region list preliminary
- Workflow needs validation

**Next Steps:**
1. Explore NASA Blue Marble collection
2. Document available globe perspectives
3. Validate orthographic projection approach
4. Create initial region definitions
5. Test coordinate mapping system
6. Generate first set of crops
7. Build location database

---

## Open Questions

**To be resolved:**

1. **Seasonal variants:** Worth the complexity?
2. **Resolution tiers:** Just 2048/4096, or also 1024/8192?
3. **Projection choice:** Orthographic best, or consider alternatives?
4. **Globe view count:** 8-12 perspectives sufficient?
5. **Location database size:** Start with 50? 100? 500?
6. **Update frequency:** How often refresh NASA imagery?
7. **Attribution:** How/where credit NASA?

---

**Document Status:** Draft - awaiting imagery exploration  
**Owner:** Michael  
**Next Action:** Explore NASA Blue Marble collection and update specification

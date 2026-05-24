# Geographic Assets - Implementation Guide

**Purpose:** Step-by-step instructions for building the geographic imagery system for Curious Woods

**Status:** Action Plan  
**Created:** January 29, 2026  
**Estimated Total Time:** 25-35 hours initial setup

---

## Overview

This guide walks through acquiring NASA imagery, processing it into usable assets, building the location database, and creating the tools to integrate geographic assets into stories.

**Prerequisites:**
- Image editing software (Photoshop, GIMP, or Python with PIL/Pillow)
- Basic scripting ability (JavaScript or Python)
- ~10GB storage for source imagery
- Text editor for JSON files

---

## Phase 1: Acquire Source Imagery

**Time Estimate:** 2-3 hours

### Step 1.1: Download NASA Blue Marble Imagery

**What you need:**
- NASA Visible Earth Blue Marble imagery
- Both globe views and high-resolution source

**Where to get it:**
1. Visit: https://visibleearth.nasa.gov/collection/1484/blue-marble
2. Look for "Blue Marble: Next Generation" collection
3. Download options:
   - Individual globe perspectives (Western Hemisphere, Eastern Hemisphere, etc.)
   - High-resolution equirectangular source (for custom cropping)
   - Seasonal variants if desired

**Recommended downloads:**
- Blue Marble Next Generation - full set of globe perspectives
- Highest resolution equirectangular version (likely 21600×10800 or higher)
- Consider both January and July variants (seasonal)

**Storage:**
```
/assets/geographic/source/
├── globe-perspectives/
│   ├── western_hemisphere.tif
│   ├── eastern_hemisphere.tif
│   ├── pacific_view.tif
│   └── [others]
└── equirectangular/
    ├── bluemarble_2004_full_21600x10800.tif
    └── [seasonal variants]
```

### Step 1.2: Verify Image Quality

- Open samples in image viewer
- Check resolution (should be multiple thousands of pixels)
- Verify cloud patterns visible, land features clear
- Note: Some versions have clouds, some don't - choose based on preference

**Completion checklist:**
- [ ] Globe perspectives downloaded (at least 6-8)
- [ ] High-res equirectangular source downloaded
- [ ] Files organized in source directory
- [ ] Image quality verified

---

## Phase 2: Generate Globe Views for Web

**Time Estimate:** 3-4 hours

### Step 2.1: Optimize Globe Perspectives

For each globe perspective downloaded:

**Process:**
1. Open in image editor
2. Resize to 2048px width (maintain aspect ratio)
3. Save as: `bluemarble_globe_[name]_2048w.jpg`
   - Quality: 85-90
   - Progressive JPEG
4. Resize to 1024px width
5. Save as: `bluemarble_globe_[name]_1024w.jpg`

**Output location:**
```
/assets/geographic/globe-views/
├── bluemarble_globe_western_hemisphere_2048w.jpg
├── bluemarble_globe_western_hemisphere_1024w.jpg
├── bluemarble_globe_eastern_hemisphere_2048w.jpg
├── bluemarble_globe_eastern_hemisphere_1024w.jpg
└── [others]
```

### Step 2.2: Document Globe Perspectives

Create: `/data/geographic/globe-perspectives.json`

```json
{
  "globe_perspectives": [
    {
      "id": "western_hemisphere",
      "display_name": "Western Hemisphere",
      "filename_base": "bluemarble_globe_western_hemisphere",
      "center_coords": {"lat": 0, "lon": -90},
      "visible_regions": [
        "north_america_eastern",
        "north_america_western", 
        "south_america_andes",
        "central_america"
      ],
      "description": "Shows Americas, Atlantic Ocean visible",
      "resolutions": [1024, 2048]
    },
    {
      "id": "eastern_hemisphere",
      "display_name": "Eastern Hemisphere",
      "filename_base": "bluemarble_globe_eastern_hemisphere",
      "center_coords": {"lat": 0, "lon": 45},
      "visible_regions": [
        "mediterranean_basin",
        "middle_east",
        "north_africa",
        "sub_saharan_africa",
        "western_europe"
      ],
      "description": "Shows Europe, Africa, Western Asia",
      "resolutions": [1024, 2048]
    }
    // ... continue for all perspectives
  ]
}
```

**Completion checklist:**
- [ ] All globe perspectives resized to 2048w and 1024w
- [ ] Files saved as progressive JPEGs
- [ ] File sizes reasonable (~500KB-1.5MB)
- [ ] globe-perspectives.json created
- [ ] Each perspective documented with visible regions

---

## Phase 3: Define Geographic Regions

**Time Estimate:** 4-6 hours

### Step 3.1: Define Initial 15 Regions

Create: `/data/geographic/regions.json`

For each region, determine:
1. **Bounds** - Use Google Earth to find north/south/east/west limits
2. **Center point** - Calculate midpoint
3. **Best globe view** - Which perspective shows this region?
4. **Typical zoom** - How close to zoom for detail?

**Example region definition:**
```json
{
  "regions": [
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
      "description": "Greece, Italy, North Africa, Eastern Mediterranean",
      "typical_story_types": ["ancient_civilizations", "maritime_history"],
      "crop_resolutions": [2048, 4096]
    }
    // ... 14 more regions
  ]
}
```

**Initial 15 regions to define:**
1. Mediterranean Basin
2. Western Europe
3. Middle East / Mesopotamia
4. East Asia
5. Southeast Asia
6. Indian Subcontinent
7. North Africa
8. Sub-Saharan Africa
9. Central America / Caribbean
10. South America - Andes
11. North America - Eastern
12. North America - Western
13. Pacific Islands
14. Arctic Regions
15. Antarctica

### Step 3.2: Validate Bounds

For each region:
1. Plot bounds on map (use online tools like geojson.io)
2. Verify coverage makes sense
3. Check overlap with neighboring regions (okay if some overlap)
4. Ensure key locations within bounds

**Completion checklist:**
- [ ] All 15 regions defined in regions.json
- [ ] Bounds verified for each
- [ ] Globe view assigned to each
- [ ] Descriptions written

---

## Phase 4: Generate Regional Crops

**Time Estimate:** 4-6 hours (partially automated)

### Step 4.1: Manual Cropping (Initial Method)

For each region defined:

**Process:**
1. Open high-res equirectangular source in image editor
2. Calculate approximate pixel bounds from lat/lon
3. Crop to region bounds (add 5-10% margin)
4. Apply orthographic projection if possible (advanced)
5. Save at multiple resolutions:
   - 4096px width: `bluemarble_crop_[region]_4096w.jpg`
   - 2048px width: `bluemarble_crop_[region]_2048w.jpg`
   - 1024px width: `bluemarble_crop_[region]_1024w.jpg` (for embedded use)

**Output location:**
```
/assets/geographic/regional-crops/
├── bluemarble_crop_mediterranean_basin_4096w.jpg
├── bluemarble_crop_mediterranean_basin_2048w.jpg
├── bluemarble_crop_mediterranean_basin_1024w.jpg
└── [others]
```

### Step 4.2: Automated Cropping (Python Script)

**Create:** `/scripts/geographic/generate-crops.py`

```python
from PIL import Image
import json

# Load regions.json
with open('data/geographic/regions.json') as f:
    regions = json.load(f)['regions']

# Load source image
source = Image.open('assets/geographic/source/equirectangular/bluemarble_full.tif')
width, height = source.size

for region in regions:
    bounds = region['bounds']
    
    # Convert lat/lon to pixels
    # (Equirectangular: longitude maps linearly to x, latitude to y)
    x1 = int((bounds['west'] + 180) / 360 * width)
    x2 = int((bounds['east'] + 180) / 360 * width)
    y1 = int((90 - bounds['north']) / 180 * height)
    y2 = int((90 - bounds['south']) / 180 * height)
    
    # Crop
    cropped = source.crop((x1, y1, x2, y2))
    
    # Save at multiple resolutions
    for size in [4096, 2048, 1024]:
        resized = cropped.copy()
        resized.thumbnail((size, size * 2), Image.LANCZOS)
        filename = f"assets/geographic/regional-crops/bluemarble_crop_{region['region_id']}_{size}w.jpg"
        resized.save(filename, 'JPEG', quality=88, progressive=True)
        print(f"Generated: {filename}")
```

**Run script:**
```bash
python scripts/geographic/generate-crops.py
```

**Completion checklist:**
- [ ] All 15 regions cropped at 3 resolutions each (45 files)
- [ ] File sizes reasonable (1024w: ~500KB, 2048w: ~2MB, 4096w: ~5MB)
- [ ] Visual quality verified for each crop
- [ ] Images show expected geography

---

## Phase 5: Build Location Database

**Time Estimate:** 6-8 hours

### Step 5.1: Identify Key Locations

For each region, identify 5-10 significant locations:
- Ancient cities (Athens, Rome, Alexandria, etc.)
- Modern cities (Paris, London, Beijing, etc.)
- Monuments (Pyramids, Stonehenge, etc.)
- Natural features (Nile River, Mediterranean Sea, etc.)
- Historical event sites (specific battle sites, etc.)

**Research sources:**
- Wikipedia for coordinates (usually in infobox)
- Google Earth for verification
- Historical atlases for ancient sites

### Step 5.2: Create Location Entries

Create: `/data/geographic/locations.json`

```json
{
  "locations": [
    {
      "location_id": "athens_greece",
      "display_name": "Athens",
      "alternate_names": ["Athēnai", "Attica"],
      "coords": {
        "lat": 37.9838,
        "lon": 23.7275
      },
      "appears_in_regions": ["mediterranean_basin"],
      "location_type": "city",
      "time_periods": ["ancient", "classical", "modern"],
      "associated_stories": ["parthenon", "greek_philosophy", "marathon"],
      "map_label_priority": "high",
      "description": "Ancient Greek city-state, birthplace of democracy"
    },
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
      "time_periods": ["ancient"],
      "associated_stories": ["pyramid_construction", "ancient_egypt"],
      "map_label_priority": "high",
      "description": "Oldest of the Seven Wonders of the Ancient World"
    }
    // ... 50-100 more locations
  ]
}
```

**Completion checklist:**
- [ ] 50-100 locations cataloged
- [ ] Coordinates verified for each
- [ ] Assigned to appropriate regions
- [ ] Label priorities set
- [ ] Covers major civilizations and time periods

---

## Phase 6: Build Coordinate Mapping Tools

**Time Estimate:** 4-5 hours

### Step 6.1: Create Projection Functions

**Create:** `/scripts/geographic/coordinate-projection.js`

```javascript
/**
 * Convert latitude/longitude to pixel coordinates
 * for a given regional crop
 */
function latLonToPixel(lat, lon, region, imageWidth, imageHeight) {
  const bounds = region.bounds;
  
  // Normalize to image bounds (equirectangular projection)
  const x = ((lon - bounds.west) / (bounds.east - bounds.west)) * imageWidth;
  const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * imageHeight;
  
  return {
    x: Math.round(x),
    y: Math.round(y)
  };
}

/**
 * Check if location is within region bounds
 */
function isLocationInRegion(location, region) {
  const lat = location.coords.lat;
  const lon = location.coords.lon;
  const b = region.bounds;
  
  return lat >= b.south && lat <= b.north && 
         lon >= b.west && lon <= b.east;
}

/**
 * Get all locations visible in a given region
 */
function getLocationsForRegion(regionId, allLocations) {
  return allLocations.filter(loc => 
    loc.appears_in_regions.includes(regionId)
  );
}

module.exports = {
  latLonToPixel,
  isLocationInRegion,
  getLocationsForRegion
};
```

### Step 6.2: Create Verification Tool

**Create:** `/scripts/geographic/verify-locations.js`

```javascript
const fs = require('fs');
const { latLonToPixel, isLocationInRegion } = require('./coordinate-projection');

// Load data
const regions = JSON.parse(fs.readFileSync('data/geographic/regions.json')).regions;
const locations = JSON.parse(fs.readFileSync('data/geographic/locations.json')).locations;

// Verify each location renders in claimed regions
locations.forEach(location => {
  console.log(`\nVerifying: ${location.display_name}`);
  
  location.appears_in_regions.forEach(regionId => {
    const region = regions.find(r => r.region_id === regionId);
    
    if (!region) {
      console.error(`  ERROR: Region ${regionId} not found`);
      return;
    }
    
    if (!isLocationInRegion(location, region)) {
      console.error(`  ERROR: Location outside ${regionId} bounds`);
      return;
    }
    
    // Calculate pixel position for 2048w crop
    const pixels = latLonToPixel(
      location.coords.lat, 
      location.coords.lon, 
      region,
      2048,
      2048 * ((region.bounds.north - region.bounds.south) / 
              (region.bounds.east - region.bounds.west))
    );
    
    console.log(`  ✓ ${regionId}: (${pixels.x}, ${pixels.y})`);
  });
});
```

**Run verification:**
```bash
node scripts/geographic/verify-locations.js
```

**Completion checklist:**
- [ ] Projection functions working
- [ ] Verification tool created
- [ ] All locations verified in their regions
- [ ] No errors in verification output

---

## Phase 7: Test Integration with Story

**Time Estimate:** 3-4 hours

### Step 7.1: Create Test Story Geographic Context

**Create:** `/stories/montparnasse-crash/data/geographic-context.json`

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
    "transition_duration_ms": 3000,
    "label_style": "white_with_shadow"
  },
  "when_page": {
    "crop_region": "western_europe",
    "crop_resolution": 2048,
    "timeline_locations": [
      {
        "location_id": "paris_france",
        "event": "montparnasse_crash",
        "visual_weight": "high"
      }
    ]
  }
}
```

### Step 7.2: Build Simple Test Page

**Create:** `/stories/montparnasse-crash/test-where-page.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>WHERE Page Test - Montparnasse Crash</title>
  <style>
    body { margin: 0; background: black; }
    #container { width: 100vw; height: 100vh; position: relative; }
    #globe-view { 
      width: 100%; 
      height: 100%; 
      object-fit: contain;
      opacity: 1;
      transition: opacity 1s;
    }
    #globe-view.fade-out { opacity: 0; }
    #crop-view {
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      transition: opacity 1s;
    }
    #crop-view.fade-in { opacity: 1; }
    .location-label {
      position: absolute;
      color: white;
      font-family: Georgia, serif;
      font-size: 24px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
      opacity: 0;
      transition: opacity 0.5s;
    }
    .location-label.visible { opacity: 1; }
  </style>
</head>
<body>
  <div id="container">
    <img id="globe-view" src="../../assets/geographic/globe-views/bluemarble_globe_western_hemisphere_2048w.jpg">
    <img id="crop-view" src="../../assets/geographic/regional-crops/bluemarble_crop_western_europe_2048w.jpg">
    <div id="label" class="location-label">Paris, France</div>
  </div>
  
  <script src="../../scripts/geographic/coordinate-projection.js"></script>
  <script>
    // Load context
    fetch('data/geographic-context.json')
      .then(r => r.json())
      .then(context => {
        // Wait 2 seconds, then transition
        setTimeout(() => {
          document.getElementById('globe-view').classList.add('fade-out');
          document.getElementById('crop-view').classList.add('fade-in');
          
          // Position label
          // (Calculate pixel position using coordinate-projection)
          // ... positioning code ...
          
          setTimeout(() => {
            document.getElementById('label').classList.add('visible');
          }, 1500);
        }, 2000);
      });
  </script>
</body>
</html>
```

### Step 7.3: Test and Refine

1. Open test page in browser
2. Verify globe view displays
3. Watch transition to crop
4. Verify label appears at correct location
5. Test on different screen sizes
6. Refine timing, positioning, styling

**Completion checklist:**
- [ ] Test page loads successfully
- [ ] Globe to crop transition smooth
- [ ] Label positioned correctly
- [ ] Looks good on iPad (1024×768)
- [ ] Looks good on desktop (1440px+)

---

## Phase 8: Documentation and Handoff

**Time Estimate:** 2-3 hours

### Step 8.1: Update Geographic-Assets.md

Fill in any "TBD" sections based on implementation:
- Exact globe perspectives acquired
- Finalized region list
- Coordinate mapping approach
- File size actuals
- Performance notes

### Step 8.2: Create Usage Examples

Add to Geographic-Assets.md:

```markdown
## Usage Examples

### Example 1: Simple Event Story

Story set in Paris, 1895.

Geographic context needed:
- WHERE page: Western Hemisphere globe → Western Europe crop
- WHEN page: Western Europe crop with Paris marker
- Location: Paris (48.8566°N, 2.3522°E)

Files required:
- bluemarble_globe_western_hemisphere_2048w.jpg
- bluemarble_crop_western_europe_2048w.jpg

JSON configuration: [example shown above]
```

### Step 8.3: Document Open Issues

Note any challenges encountered:
- Projection accuracy issues
- Performance concerns
- Missing regions needed
- Tools that would help

**Completion checklist:**
- [ ] Geographic-Assets.md finalized
- [ ] Usage examples added
- [ ] Open issues documented
- [ ] Ready for production use

---

## Prompts for Claude (Future Sessions)

When you need Claude's help implementing any of these steps, use these prompts:

### For Python Scripting
```
I'm working on the Curious Woods geographic assets system. I need a Python script that:

1. Loads the regions.json file from /data/geographic/regions.json
2. Opens the source Blue Marble image from /assets/geographic/source/equirectangular/
3. For each region, crops the image based on lat/lon bounds
4. Saves three versions (4096w, 2048w, 1024w) as progressive JPEGs

The regions.json structure is:
[paste structure from Phase 3]

Please write the complete script with error handling.
```

### For JavaScript Coordinate Mapping
```
I'm working on Curious Woods geographic assets. I need JavaScript functions for:

1. Converting lat/lon to pixel coordinates for regional crops
2. Checking if a location falls within region bounds  
3. Getting all locations visible in a given region

The data structures are:
- Region: [paste example from Phase 3]
- Location: [paste example from Phase 5]

Please write clean, documented functions with example usage.
```

### For HTML/CSS Test Page
```
I'm testing the WHERE page for Curious Woods stories. I need an HTML page that:

1. Displays a globe view image
2. After 2 seconds, fades to regional crop  
3. Shows location label at correct coordinates
4. Responsive for iPad (1024×768) and desktop

Story data structure: [paste from Phase 7]

Please write the complete HTML with CSS and JavaScript.
```

### For Optimization
```
I have 45 regional crop images (15 regions × 3 sizes) totaling about 80MB. 

Help me:
1. Optimize JPEG compression without visible quality loss
2. Set up progressive loading strategy
3. Configure CDN caching headers
4. Create responsive image loading code

File structure: [paste from Phase 4]
```

---

## Maintenance Notes

**Adding new regions:**
- Update regions.json
- Run generate-crops.py
- Verify new crops
- Update globe-perspectives.json if needed

**Adding new locations:**
- Add to locations.json
- Run verify-locations.js
- Update any relevant story geographic-context.json files

**Updating imagery:**
- Download new NASA Blue Marble release
- Regenerate all crops (run generate-crops.py)
- Compare file sizes, verify quality
- Update version notes in Geographic-Assets.md

---

## Success Criteria

The geographic assets system is complete when:

- [ ] All 15 initial regions defined and cropped
- [ ] 6-8 globe perspectives optimized for web
- [ ] 50+ locations cataloged with accurate coordinates
- [ ] Coordinate mapping tools working and verified
- [ ] Test story successfully displays WHERE page
- [ ] Documentation complete
- [ ] Ready to use in story production

**Total estimated time:** 25-35 hours

---

**Last Updated:** January 29, 2026  
**Status:** Ready to begin Phase 1

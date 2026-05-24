In the version we are working on:

- What refers to the Montparnasse train accident in 1895
- Where refers to Paris, gare montparnasse
- When is 1895.
	- To do where, we started with a mercator projection Blue Marble image and you calculated the location of Paris. 
	- You did it this way because I assumed that was correct. 
	- I think I was wrong.

I spent time on the NASA site and was frustrated. They serve so many different applications that it is very hard to find anything.

So, I asked ChatGPT to help me find the images. My prompt went something like this:
I'd like to rotate the globe so that France is in the top third and centered, then zoom in to look at a high resolution image that I can then label with the parts I want the child to focus on.  

ChatGPT reccomended a solution and built it. Unforutnately because I mentioned 10 year olds, he assumed it would have to be child friendly. 

What I really want is to be able to control these images. So, in the where section, we can rotate the globe to center on France, then 'zoom' in to a high resolution image of Western Europe to do the time line. 

Just so you know the timeline has two parts. The first goes from 12,026 years ago (end of glacial period) to present. The second covers the period from 1800 to the present and highlights the story we want to tell.

This is what ChatGPT produced. 

I need your opinion

# **Mobile-Optimized CesiumJS 3D Globe Example (Using NASA Blue Marble Imagery)**

  

## **Overview: A Kid-Friendly 3D Globe for Mobile**

  

Creating a responsive 3D globe in CesiumJS for 10-year-old learners involves using a lightweight, cloud-free Earth imagery layer and a minimal UI. We will use NASA’s Blue Marble Next Generation imagery via the GIBS service as our base map. Blue Marble is a _true-color_, cloud-free composite of Earth (MODIS satellite imagery), offering moderate detail (500 m resolution) without clouds obscuring the view . This provides a clear, consistent globe for educational use, and it reveals seasonal patterns in land cover over the year . By leveraging NASA’s Global Imagery Browse Services (GIBS) WMTS, we can stream this imagery in tiled form for efficient, fast loading on mobile devices . Using tile-based imagery is crucial – the globe’s surface is divided into small tiles that load on demand as the user zooms or rotates, preventing heavy memory use by loading only what’s needed . The result is a smooth, interactive globe that performs well on mobile and allows intuitive touch gestures for rotation and tilt.

  

**Key features we’ll implement:**

- **NASA Blue Marble Imagery via GIBS:** Use Cesium’s WebMapTileServiceImageryProvider to connect to NASA’s WMTS endpoint for Blue Marble. This gives us a global, high-quality base layer without requiring a Cesium Ion account or external API keys.
    
- **Touch-Friendly Interaction:** Enable user gestures (one-finger drag to pan, two-finger pinch to zoom, two-finger twist/drag to rotate and tilt) so kids can freely explore the globe. Cesium’s default controls already support these on touch devices.
    
- **Programmatic Zoom and Centering:** Provide an example of centering the globe on a specific location (e.g. France) with appropriate zoom. We’ll use camera flight to smoothly zoom into the country level.
    
- **Clean, Minimal UI:** Turn off unnecessary Cesium widgets (e.g. animation timeline, base layer picker, geocoder) to avoid distractions. The globe will be full-screen and responsive, filling the mobile screen with just the 3D Earth.
    
- **Mobile Performance Optimizations:** Limit imagery resolution levels and avoid heavy layers. Blue Marble’s moderate resolution and limited zoom levels (up to ~Level 8 or 9) keeps performance high and memory use low. We’ll also only use the ellipsoid (no 3D terrain) by default to reduce load, though terrain can be added if desired. Cesium’s rendering will be in 3D mode only (no 2D/Columbus view switching) to simplify the experience.
    

  

NASA GIBS is well-suited for this purpose: it delivers _global, full-resolution satellite imagery in a highly responsive manner, enabling interactive exploration of Earth_ . In fact, GIBS offers over a thousand imagery products (many updated daily) that can be integrated similarly . We focus on Blue Marble for its clarity and static nature, but the implementation can be extended to other layers (like current true-color imagery or topical overlays) as described later.

  

## **Setting Up NASA Blue Marble Imagery via GIBS WMTS**

  

CesiumJS can stream imagery from a WMTS (Web Map Tile Service) provider using the WebMapTileServiceImageryProvider. NASA’s GIBS provides a RESTful WMTS endpoint for Blue Marble Next Generation. We will use the Web Mercator projection endpoint (EPSG:3857) with the tile matrix named GoogleMapsCompatible_Level9, which is compatible with Cesium’s default tiling scheme (Mercator) – this ensures the imagery lines up correctly on Cesium’s globe . Blue Marble is a static dataset (monthly 2004), so we specify a date (e.g. July 2004) in the URL. The imagery is tiled at about 500 m resolution, with zoom levels up to 8–9, which is enough to see country outlines and some city-scale features (e.g. large urban areas) without overloading the device.

  

Key parameters for the imagery provider:

- **url****:** The GIBS WMTS REST URL template for Blue Marble. It includes placeholders for {TileMatrix}, {TileRow}, {TileCol} and specifies the layer, style, tile matrix set, and image format. For example:
https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_NextGeneration/default/2004-07-01/GoogleMapsCompatible_Level9/{TileMatrix}/{TileRow}/{TileCol}.jpg
- In this URL:
    
    – BlueMarble_NextGeneration is the layer identifier.
    
    – default/2004-07-01 selects the imagery date (July 2004 composite).
    
    – GoogleMapsCompatible_Level9 is the tiling scheme (Mercator) at ~500 m resolution.
    
    – Tiles are JPEG images. (Blue Marble is naturally in true-color, so JPEG is suitable.)
    
- **layer** **and** **style****:** These correspond to the WMTS layer name and style. GIBS uses an empty style (often just "default"). We’ll set layer: "BlueMarble_NextGeneration" and style: "default" to match the service.
    
- **tileMatrixSetID****:** The tile matrix identifier. We use "GoogleMapsCompatible_Level9", which is the Mercator tiling scheme with levels 0–9 for Blue Marble. This avoids needing a custom tiling scheme since we chose the Mercator endpoint (if we used the geographic projection EPSG:4326, we’d need to use a GeographicTilingScheme explicitly ).
    
- **maximumLevel****:** We cap the maximum zoom level to the highest detail of the Blue Marble tiles (level 8 or 9). This prevents Cesium from requesting higher-resolution tiles that don’t exist or would be unnecessary. Blue Marble’s 500 m pixels roughly correspond to level 8–9 in Mercator tiling, so we set maximumLevel: 8 (you could set 9 if you want the finest tiles; the difference is minor since level 9 is an oversampling of the 500 m data). Limiting this also helps **avoid heavy memory use on mobile** by not loading superfluous tile layers.
    
- **credit****:** (Optional) Provide attribution for the imagery, e.g. _“NASA Blue Marble via GIBS”_. Cesium will display this in the corner. It’s good practice to credit NASA for the imagery.
    

  

We will pass this imagery provider into the Cesium Viewer on startup, so it replaces the default base map (which is usually Cesium’s Bing or Ion imagery). Using GIBS means **no API keys or Ion tokens needed for the imagery** – it’s completely open. Cesium’s imagery layer system will handle loading the tiles as we navigate. By using a tiled WMTS, we benefit from quick loading of only visible areas; as NASA notes, GIBS is designed for responsive, on-demand tile delivery of global imagery .

  

## **Clean and Responsive UI for Young Learners**

  

To make the interface simple and kid-friendly, we will remove Cesium’s default UI widgets that aren’t needed. This includes the animation timeline and date picker (not needed since our imagery is static), the base layer picker (we fix our base layer), scene mode picker (we’ll stick to 3D globe only), geocoder search box, and the info box/selection indicators (not used in this basic globe). Disabling these can be done via Viewer constructor options:

- timeline: false and animation: false – remove timeline and animation controls.
    
- baseLayerPicker: false – no layer switcher (we already have our desired base layer).
    
- sceneModePicker: false – remove 2D/3D mode toggle (we enforce 3D only).
    
- geocoder: false – remove the search box (could be confusing for young users; you can later add a simpler custom UI for location jumping).
    
- homeButton: false – optional, we might hide the home button if we programmatically control resets/centering.
    
- navigationHelpButton: false – the navigation instructions button can be removed to reduce clutter (instead, one might teach gestures via a brief on-screen text or tutorial if needed).
    
- infoBox: false, selectionIndicator: false – not needed since we aren’t clicking on data sources that show popups.
    

  

All these controls default to true in a standard Viewer, so explicitly turning them off yields a plain globe view. The only on-screen element left from Cesium might be the small credits in the bottom (Cesium and NASA attribution) which are fine to keep (they’re unobtrusive). The globe will fill the whole screen.

  

**Responsive layout:** We ensure the HTML and CSS make the globe container full-screen and responsive. In the example code, the CSS sets the page and #cesiumContainer to 100% width/height with no margin, so it automatically uses the entire browser viewport (on mobile, this effectively uses the full screen, adjusting to orientation changes). This approach works for a standalone page or can be adapted to a div inside an app – just ensure the container can expand (using flexbox or absolute positioning as needed in your app). The Cesium canvas will then automatically adjust to device pixel ratio and resolution.

  

**Touch gesture support:** CesiumJS on mobile supports pinch-to-zoom and two-finger tilt/rotate by default. In our code, by default the viewer’s scene.screenSpaceCameraController settings allow rotation and tilting. We might not need to change anything here, but it’s good to know:

- One-finger drag: pans the globe.
    
- Two-finger drag up/down: tilts the camera (changing pitch).
    
- Two-finger rotate (twist): rotates the view heading.
    
- Pinch: zooms in/out.
    
    For a 10-year-old audience, you may want to _introduce these controls in an onboarding or keep the gestures intuitive_. If desired, you can constrain the tilt angles (e.g., prevent flipping upside-down) via screenSpaceCameraController properties, but the defaults are usually fine. We’ll start with a slightly tilted view in our example (to show a 3D perspective) – the camera orientation can be set so the globe isn’t viewed strictly top-down.
    

  

## **Example Implementation (HTML & JavaScript)**

  

Below is a **complete HTML/JS example** of a CesiumJS globe configured as described. You can open this in a browser (after inserting the correct Cesium library references) to see the result. It centers on France as an example of programmatic zoom, but you can adjust the coordinates or add buttons for different locations. The code uses CesiumJS v1.xx (make sure the version matches the script and CSS URLs in the <head>):

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Cesium Blue Marble Globe (Mobile-Friendly)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <!-- CesiumJS CSS and JS resources -->
  <link rel="stylesheet" href="https://cesium.com/downloads/cesiumjs/releases/1.113/Build/Cesium/Widgets/widgets.css" />
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.113/Build/Cesium/Cesium.js"></script>
  <style>
    /* Make the page and Cesium container take full screen with no overflow */
    html, body, #cesiumContainer {
      width: 100%; height: 100%;
      margin: 0; padding: 0;
      overflow: hidden;
    }
    /* Optional: hide the Cesium default credit pop-up on tap (keep text) */
    .cesium-credit-lightbox {
      display: none !important;
    }
  </style>
</head>
<body>
  <!-- The container for the Cesium globe -->
  <div id="cesiumContainer"></div>

  <script>
    // Initialize the Cesium Viewer with custom options
    const viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_NextGeneration/default/2004-07-01/GoogleMapsCompatible_Level9/{TileMatrix}/{TileRow}/{TileCol}.jpg",
        layer: "BlueMarble_NextGeneration",
        style: "default",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        format: "image/jpeg",
        maximumLevel: 8,  // Limit zoom to level 8 (500m resolution tiles)
        credit: "NASA Blue Marble via GIBS"
      }),
      baseLayerPicker: false,
      timeline: false,
      animation: false,
      geocoder: false,
      sceneModePicker: false,
      homeButton: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      // Use the standard ellipsoid globe without terrain to keep it lightweight
      terrainProvider: new Cesium.EllipsoidTerrainProvider(),
      scene3DOnly: true  // Optimize for 3D only
    });

    // Set an initial view: center on France (approximate lat/long) with a tilted perspective
    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(2.0 /*lon*/, 46.0 /*lat*/, 1.0e6 /*height in meters*/),
      orientation: {
        heading: Cesium.Math.toRadians(0),      // face north (0 degrees)
        pitch: Cesium.Math.toRadians(-30),      // look down 30° from horizontal
        roll: 0.0
      },
      duration: 0 // immediate jump (set a few seconds if you want a smooth flight)
    });

    // Ensure the globe can be tilted and rotated with touch (Cesium enables this by default on mobile).
    // (No further configuration needed for basic gestures.)
  </script>
</body>
</html>

In the code above, we include the Cesium CSS/JS (using version **1.113** as an example – you can use the latest stable release). We then create a Viewer with our WMTS imagery provider. We explicitly set terrainProvider to a flat ellipsoid (no 3D terrain) to save on data and performance – the globe will still be 3D (curved) but without mountains. If you prefer to show terrain, you could integrate Cesium World Terrain (via Cesium.createWorldTerrain()), but note that requires an Ion token and increases load, so for a lightweight teaching app it’s reasonable to skip.

We used scene3DOnly: true to disable Cesium’s ability to switch to 2D mode (since we hid the button anyway). This can slightly improve performance by not initializing 2D/Columbus view code.

Finally, we programmatically move the camera to France’s location. We used rough coordinates (latitude ~46°N, longitude ~2°E, height ~1,000,000 meters which is 1000 km) – this gives a country-level view. The camera orientation is set so we tilt the view (pitch -30° means the camera is angled to see the horizon) and with no horizontal rotation (heading 0). We set duration: 0 for an instant jump; for a smoother effect, you could set say duration: 3 to fly over 3 seconds. You can change these values or use viewer.camera.setView for an immediate set without animation. In a real app, you might trigger such a camera move in response to a UI action (e.g. the user selects “France” from a list). The above demonstrates the technique.

  **Touch controls:** With the above configuration, a user can now use touch gestures on the mobile device to interact. For example, after centering on France, the user can pinch to zoom into a city or use two fingers to rotate the view around. Cesium automatically manages tile loading – as the user zooms in, higher-detail Blue Marble tiles (up to the max level) will load. Since Blue Marble doesn’t have street-level detail, zooming in further will just show a pixelated image and Cesium won’t try to fetch tiles beyond level 8. This ensures we don’t waste bandwidth or memory on unnecessary detail.

  

## **Replacing or Supplementing the Imagery Layer**

  

One big advantage of using GIBS/WMTS is that **we can easily swap or overlay different imagery layers**. The code structure remains the same – you just change the layer parameters or add additional ImageryLayers. Here are some ideas and guidance:

- **Using a different base imagery:** For a more detailed or current view, you could use NASA’s MODIS or VIIRS daily imagery. For example, the “MODIS_Terra_CorrectedReflectance_TrueColor” layer provides near real-time true-color images (updated daily) at 250 m resolution . To use it, you would set layer: "MODIS_Terra_CorrectedReflectance_TrueColor" and choose an appropriate tileMatrixSet (for Web Mercator, a common one is "GoogleMapsCompatible_Level8" or similar, corresponding to 250 m). You’d also specify a date in the URL (e.g. .../default/2023-12-01/... for a specific day). Keep in mind that daily imagery includes clouds – unlike Blue Marble, it’s not cloud-free – but it can show current events. Another example is VIIRS “Black Marble” (Earth at night) or global maps of vegetation, sea ice, etc. The NASA GIBS catalog lists over 1000 layers , so you have options to match your educational content.
    
- **Adding overlays for education:** You can overlay additional layers on top of Blue Marble. Cesium’s viewer.imageryLayers.addImageryProvider allows you to stack imagery. For instance, to highlight snow or ice, GIBS has a “Snow Cover” layer (which might be binary mask of snow) or “Sea_Ice_Extent”. You could add such a layer and adjust its alpha (transparency) so that it highlights features over the base map. Another idea is using the “Coastlines / Borders” reference layer (available in NASA Worldview ) – GIBS provides some utility layers like coastlines and country borders that can overlay the imagery for reference. These often come as separate tile layers (some might be vector tiles, but many are available as raster tiles too). To add, you’d do something like:
- 
viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "...(coastlines WMTS URL template)...",
    layer: "Coastlines",
    style: "default",
    tileMatrixSetID: "GoogleMapsCompatible_Level6",
    format: "image/png",
    maximumLevel: 6,
    transparent: true // assuming PNG with transparency
}));

- By using PNG format with transparency, the overlay can draw just the lines/borders over the Blue Marble. Adjust the maximumLevel to whatever detail is available (coastline layers might not need very high zoom). Note that if a layer is only in Geographic projection (EPSG:4326), you might need to use Cesium’s GeographicTilingScheme as hinted in the GIBS examples – but many global layers are offered in Web Mercator as well.
    
- **Seasonal variations of Blue Marble:** Since Blue Marble Next Gen has monthly images for 2004, you could switch the date in the URL to demonstrate seasonal change. For example, January vs July will show snow cover differences in the northern hemisphere . Because our example URL explicitly used 2004-07-01, you could change it to 2004-01-01 for a winter view. Alternatively, you could create a simple dropdown for months that calls imageryProvider = new WMTSImageryProvider(...) with the new date, or use Cesium’s ImageryLayerCollection to replace the layer. This is a great educational feature: students can see how Earth’s appearance changes over the year (greening, snow, dry/wet seasons) using the Blue Marble monthly data.
    
- **Performance note on overlays:** Each extra imagery layer means additional tile loads, so don’t overload with too many at once on mobile. One or two layers (base + one overlay) are usually fine. You can also enable Cesium’s **tile caching** options (Cesium will cache tiles in memory by default up to a limit) and limit overlay alpha to show just the needed info. Because GIBS imagery is generally tiled and efficient, moderate use of overlays should remain smooth on a modern tablet or phone. GIBS’s focus on responsiveness means even higher-res layers (like MODIS true-color) are optimized for quick delivery .
    

  

## **Centering the Globe on Different Locations**

  

Our example centered on France using approximate coordinates. To programmatically center on other countries or points of interest, you need the latitude/longitude and a height for the camera. A simple approach for country-scale zoom: use the country’s centroid or capital city coordinates, and a height that covers most of the country (e.g. 500–1000 km high for small countries, 1000–2000 km for larger ones like the U.S or Russia). You can store a list of favorite locations and their coords. For instance:

function flyToLocation(name) {
  let loc = { lon: 0, lat: 0, height: 1e6 };
  if (name === "France")      loc = { lon: 2.0,   lat: 46.0,  height: 1e6 };
  if (name === "Australia")   loc = { lon: 134.0, lat: -25.0, height: 2e6 };
  if (name === "Japan")       loc = { lon: 138.0, lat: 36.0,  height: 8e5 };
  // ... add more as needed
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(loc.lon, loc.lat, loc.height),
    orientation: { heading: 0, pitch: Cesium.Math.toRadians(-30), roll: 0 },
    duration: 2
  });
}

You could tie this function to UI buttons or a dropdown. This uses flyTo for a nice animated transition. If instant jump is preferred, use camera.setView similarly. Cesium’s Cartesian3.fromDegrees(lon, lat, height) converts geo coordinates to the 3D position vector the camera needs. The orientation (heading/pitch) is optional; if not set, the camera will default to looking straight down at the target. For a more dynamic effect, we set a slight tilt (pitch -30°) so the user gets a 3D perspective of terrain (even without 3D terrain, this angle makes the globe look more interesting).

  

Since we disabled the default geocoder search, providing such preset locations or a simple search interface can help users navigate. For a 10-year-old user base, big, clearly labeled buttons (like “Zoom to France”) might be more accessible than a text search box.

  

## **Mobile Performance Tips**

  

Finally, to ensure **smooth performance on mobile**, consider the following:

- **Limited zoom levels:** We already set maximumLevel on the imagery. This prevents over-fetching tiles. Also, you can use Cesium’s viewer.scene.screenSpaceCameraController.maximumZoomDistance and minimumZoomDistance to clamp how close or far the camera can go. For example, you might set a minimum height so users don’t zoom _too_ far in (where Blue Marble has no further detail). Similarly, you could cap maximumZoomDistance if you want to prevent zooming out to where the globe is just a tiny dot (though usually not an issue).
    
- **Render loop optimization:** Cesium by default continuously renders frames (like a game engine). If your scene is mostly static (no animated data), enabling _render-on-demand_ mode can save battery. You can do: viewer.scene.requestRenderMode = true; viewer.scene.maximumRenderTimeChange = Infinity;. In this mode, Cesium will render a frame only when the scene changes (camera move or explicit viewer.scene.requestRender() call). This is great for mobile because it preserves battery and reduces device heating. Just be sure to test that it updates when you expect (it should on interactions).
    
- **Testing on real devices:** Make sure to try the app on an actual phone or tablet. Cesium’s WebGL will use device GPU; most modern devices handle it well, but older or very low-end devices might struggle if too many tiles or if terrain is enabled. Adjust imagery detail or disable terrain if needed. Our use of a single moderate-res layer is quite lightweight – Blue Marble’s global tileset is only tens of MBs in total, and only a fraction will load at any one time.
    
- **Network considerations:** If the app will be used in bandwidth-constrained settings, you might even consider an offline fallback (e.g., store a few low-res tiles or use Cesium’s offline Natural Earth II base map for when offline). But if online, GIBS tiles load quickly and are globally accessible. GIBS has good uptime and is used in NASA’s own Worldview app for interactive exploration, so it’s robust for your needs.
    

  

By following these steps, you get a **mobile-optimized 3D globe** that young students can pinch, zoom, and rotate to explore the Earth. The imagery is clear and uncluttered, and the interface focuses them on the visual content rather than tools. This provides an excellent foundation for a teaching app – you can further enrich it with points of interest (placemarks), simple quizzes (e.g., “find this country”), or layer toggles to demonstrate scientific data, all while the core experience remains smooth and engaging.

  

Overall, CesiumJS combined with NASA’s open imagery services allows us to create an interactive virtual Earth that is _both_ high-performance and educational, showcasing global imagery in a way that is accessible to a 10-year-old audience . Happy exploring!

  

**Sources:**

- CesiumJS Documentation – _Imagery Layers & WebMapTileServiceImageryProvider_
    
- NASA Earthdata (GIBS) – _Global Imagery Browse Services Overview_
    
- NASA Earth Observatory – _Blue Marble: Next Generation_ (500 m global imagery description)
    
- Bellingcat Toolkit – _NASA Worldview Base Layers (Blue Marble)_ (Blue Marble is a cloud-free true-color composite, Aug 2004)
    
- NASA GIBS API Example – _WMTS usage with MODIS True Color (250 m)_
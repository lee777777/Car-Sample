import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function MapView() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timer = null;

    if (!mapContainerRef.current) return;

    timer = setTimeout(() => {
      // Guard against multiple initializations
      if (!isMounted || mapRef.current) return;

      console.log("Map initializing...");
      try {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/standard',
          center: [58.4074, 23.5859],
          zoom: 11
        });

        mapRef.current.on('load', () => {
          if (isMounted) {
            console.log("Map fully loaded!");
            mapRef.current.resize();
            setMapLoaded(true); // This triggers the overlay to hide
          }
        });
      } catch (error) {
        console.error("Mapbox error:", error);
      }
    }, 150);

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
      if (mapRef.current) {
        const instance = mapRef.current;
        mapRef.current = null;
        instance.remove();
      }
    };
  }, []);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-brand-accent font-bold tracking-widest text-sm uppercase">Find Us</h2>
        <h3 className="text-3xl md:text-4xl font-bold">Partner Map Directory</h3>
        <p className="text-brand-white/60 max-w-2xl mx-auto">
          Explore our network of certified detailing partners across the region.
        </p>
      </div>
      
    <div className="relative h-[500px] w-full bg-brand-primary/10 rounded-3xl border border-brand-primary/20 overflow-hidden">
        
        {/* THE ACTUAL MAP */}
        <div className="absolute inset-0 w-full h-full block" ref={mapContainerRef} />

        {/* THE OVERLAY - This now disappears when mapLoaded is true */}
        {!mapLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-brand-darkslate/90 backdrop-blur-md">
            <h4 className="text-xl font-bold text-brand-white">Initializing Map...</h4>
            <p className="text-sm text-brand-white/70 max-w-xs mx-auto">
              Please wait while we load the interactive partner directory.
            </p>
            <div className="flex justify-center">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-accent"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapView;
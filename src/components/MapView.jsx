
import mapImage from '../assets/world-physical-map.jpg'
function MapView() {
  return (
     <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-brand-accent font-bold tracking-widest text-sm uppercase">Find Us</h2>
        <h3 className="text-3xl md:text-4xl font-bold">Partner Map Directory</h3>
        <p className="text-brand-white/60 max-w-2xl mx-auto">
          Explore our network of certified detailing partners across the region.
        </p>
      </div>
      
      <div className="relative h-[500px] w-full bg-brand-primary/10 rounded-3xl border border-brand-primary/20 overflow-hidden flex items-center justify-center">
        {/* Placeholder for Mapbox integration */}
        <div className="absolute inset-0 opacity-40">
           <img 
            src={mapImage} 
            alt="Map background" 
            className="w-full h-full object-cover grayscale invert"
          />
        </div>
        <div className="relative z-10 text-center space-y-4 bg-brand-darkslate/80 p-8 rounded-2xl backdrop-blur-sm border border-brand-white/10">
         
          <h4 className="text-xl font-bold">Interactive Map Component</h4>
          <p className="text-sm text-brand-white/70 max-w-xs mx-auto">
            (Mapbox integration in progress. Approved partners will be plotted here.)
          </p>
          <button className="bg-brand-accent text-brand-white px-6 py-2 rounded-full font-bold text-sm">
            Detect My Location
          </button>
        </div>
      </div>
    </div>
  )

}
export default MapView;
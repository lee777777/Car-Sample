import aboutImage from '../assets/car-daitaling.jpg'

function AboutUs() {
  return (<>
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
      <div className="space-y-6">
        <h2 className="text-brand-accent font-bold tracking-widest text-sm uppercase">About Booking Detailor</h2>
        <h3 className="text-3xl md:text-4xl font-bold leading-tight">
          A Decade of Excellence in Automotive Preservation
        </h3>
        <p className="text-brand-white/70 leading-relaxed text-lg">
          Car Care is a premier distributor and service provider dedicated to the art of detailing. As the exclusive distributor for Artdeshine in the region, we bring cutting-edge graphene coating technology and professional-grade products to both enthusiasts and detailing shops.
        </p>
        <p className="text-brand-white/70 leading-relaxed">
          Our mission is to elevate the standard of car care across the Middle East by building a network of certified partners who share our passion for perfection.
        </p>
        <div className="grid grid-cols-2 gap-8 pt-4">
          <div>
            <span className="block text-3xl font-bold text-brand-accent">10+</span>
            <span className="text-sm text-brand-white/50 uppercase tracking-wider">Years Experience</span>
          </div>
          <div>
            <span className="block text-3xl font-bold text-brand-accent">50+</span>
            <span className="text-sm text-brand-white/50 uppercase tracking-wider">Certified Partners</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-square rounded-2xl overflow-hidden border-2 border-brand-primary/30">
          <img 
            src={aboutImage} 
            alt="Detailing work" 
            className="w-full h-full object-cover"
          
          />
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  </>)

}
export default AboutUs;
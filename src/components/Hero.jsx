
import heroImage from '../assets/Hero.jpg'
import { Link } from 'react-router-dom';
function Hero() {
  return ( <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-black">
        {/* Background Gradient / Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darkslate to-transparent opacity-60 z-10"></div>
        
        {/* Hero Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Car detailing" 
            className="w-full h-full object-cover opacity-40"
       
          />
        </div>
  
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-white tracking-tight leading-tight mb-6">
            PREMIUM <span className="text-brand-accent">CAR CARE</span> SOLUTIONS
          </h1>
          <p className="text-lg md:text-xl text-brand-white/80 mb-10 max-w-2xl mx-auto">
            Distributing world-class Artdeshine products and providing elite detailing services for your automotive pride.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="bg-brand-accent hover:bg-brand-accent/90 text-brand-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Shop Products
            </Link>
            <Link 
              to="/partner-signup" 
              className="bg-brand-white/10 hover:bg-brand-white/20 text-brand-white border border-brand-white/30 font-bold py-4 px-8 rounded-full transition-all backdrop-blur-sm"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>)

}
export default Hero;
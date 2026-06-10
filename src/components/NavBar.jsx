
import { Link } from "react-router-dom";
function NavBar() {
  return (

     <nav className="bg-brand-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-brand-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                  <span className="text-brand-accent font-bold text-xl tracking-tighter">Booking Detailor</span>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link to="/" className="text-brand-white hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                    <Link to="/shop" className="text-brand-white hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</Link>
                    <Link to="/partner-signup" className="text-brand-white hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Partner with Us</Link>
                  </div>
                </div>
              </div>
              <div className="md:hidden">
                {/* Mobile menu button could go here */}
              </div>
            </div>
          </div>
        </nav>
  )

}
export default NavBar;
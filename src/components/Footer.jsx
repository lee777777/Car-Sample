
function Footer (){
  return (
    <footer className="bg-brand-black py-12 border-t border-brand-primary/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-brand-accent font-bold text-lg mb-4">Booking Detailor</h3>
            <p className="text-brand-white/70 text-sm">
              Professional car detailing services and premium products distribution across the Middle East.
            </p>
          </div>
          <div>
            <h4 className="text-brand-white font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-sm text-brand-white/70">
              <li><a href="/" className="hover:text-brand-accent transition-colors">Home</a></li>
              <li><a href="/shop" className="hover:text-brand-accent transition-colors">Shop Products</a></li>
              <li><a href="/partner-signup" className="hover:text-brand-accent transition-colors">Partner Program</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-brand-white font-semibold mb-4">Contact</h4>
            <p className="text-brand-white/70 text-sm">
              Email: info@booking-detailor.com<br />
              Phone: +968 1234 5678
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-white/10 text-center">
          <p className="text-brand-white/50 text-xs">
            © {new Date().getFullYear()} Booking Detailor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

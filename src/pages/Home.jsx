import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import BestProducts from '../components/BestProducts';
import Clients from '../components/Clients';
import ContactUs from '../components/ContactUs';
import MapView from '../components/MapView';

function Home() {
  return (
    <div className="space-y-20">
      
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        <AboutUs />
       
        <Services />
        <BestProducts />
        <MapView />
        <Clients />
        <ContactUs />
      </section>
    </div>
  );
};

export default Home;

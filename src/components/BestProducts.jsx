import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import graphineImage from '../assets/graphine.png'
import detailerImage from '../assets/detailer.png'
import microfiberImage from '../assets/microfiber.png'


const featuredProducts = [
  {
    id: 1,
    name: 'Artdeshine Nano Graphene Coating',
    price: '45.000 OMR',
    image: graphineImage,
    category: 'Coatings'
  },
  {
    id: 2,
    name: 'Artdeshine Graphene Detailer',
    price: '12.500 OMR',
    image: detailerImage,
    category: 'Maintenance'
  },
  {
    id: 3,
    name: 'Premium Microfiber Pack',
    price: '8.000 OMR',
    image: microfiberImage,
    category: 'Accessories'
  }
];

function BestProducts() {
  return ( <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <h2 className="text-brand-accent font-bold tracking-widest text-sm uppercase">Shop Now</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Best Selling Products</h3>
        </div>
        <Link to="/shop" className="text-brand-accent hover:underline font-semibold flex items-center gap-2">
          View All Products <span>→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>)

}
export default BestProducts;
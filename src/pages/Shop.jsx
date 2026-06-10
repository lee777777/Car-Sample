import { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Artdeshine Nano Graphene Coating", price: "45.000 OMR", image: "/src/assets/graphine.png", category: "Coatings" },
  { id: 2, name: "Artdeshine Graphene Detailer", price: "12.500 OMR", image: "/src/assets/detailer.png", category: "Maintenance" },
  { id: 3, name: "Premium Microfiber Pack", price: "8.000 OMR", image: "/src/assets/microfiber.png", category: "Accessories" },
  { id: 4, name: "Wheel Cleaner Plus", price: "7.500 OMR", image: "...", category: "Cleaning" },
  { id: 5, name: "Iron Remover 500ml", price: "9.000 OMR", image: "...", category: "Cleaning" },
  { id: 6, name: "Artdeshine Ceramic Paste Wax", price: "25.000 OMR", image: "...", category: "Coatings" },
];

const categories = ["All", "Coatings", "Maintenance", "Cleaning", "Accessories"];

function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Premium Products</h1>
        <p className="text-brand-white/60 max-w-2xl">
          Professional-grade car care products delivered to your doorstep.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 border-b border-brand-primary/20 pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat
                ? "bg-brand-accent text-brand-white shadow-lg"
                : "bg-brand-primary/10 text-brand-white/60 hover:bg-brand-primary/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
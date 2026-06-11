import { Lineicons } from "@lineiconshq/react-lineicons";
import {  Cart1Solid   } from "@lineiconshq/free-icons";

function ProductCard ({ product }) {
  return (
    <div className="bg-brand-black border border-brand-primary/20 rounded-2xl overflow-hidden group hover:border-brand-accent/50 transition-all shadow-xl flex flex-col h-full">
      
      <div className="relative aspect-square overflow-hidden bg-brand-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4 bg-brand-accent text-brand-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
          {product.category}
        </div>
      </div>

      <div className="p-6 space-y-4 flex flex-col flex-grow">
        <h4 className="font-bold text-lg leading-snug group-hover:text-brand-accent transition-colors">
          {product.name}
        </h4>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-brand-white/10">
          <span className="text-xl font-bold text-brand-white">
            {product.price}
          </span>

          <button className="bg-brand-white text-brand-black hover:bg-brand-accent hover:text-brand-white p-3 rounded-lg transition-colors shadow-lg">
            <Lineicons icon={Cart1Solid} size={26} color="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
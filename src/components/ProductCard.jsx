

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
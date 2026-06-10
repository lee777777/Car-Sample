const logos = [
  'ARTDESHINE', '3M', 'MEGUIARS', 'SONAX', 'RUPES'
];

function Clients() {
  return (  
  
    <div className="py-20 border-y border-brand-primary/10 overflow-hidden">
      <div className="text-center mb-12">
        <p className="text-brand-white/50 text-sm font-semibold tracking-[0.3em] uppercase">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="flex w-max gap-16 animate-scroll">
        {[...logos, ...logos].map((logo, i) => (
          <span
            key={i}
            className="text-2xl md:text-3xl font-black text-brand-white opacity-30 hover:opacity-100 transition"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
    );

}
export default Clients;
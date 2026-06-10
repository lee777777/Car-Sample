

function ContactUs() {
  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-brand-accent font-bold tracking-widest text-sm uppercase">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Have a Question?</h3>
          <p className="text-brand-white/70 leading-relaxed">
            Whether you're looking for professional detailing services or want to stock our premium products, our team is here to help.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-brand-accent/10 p-3 rounded-lg text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold">Our Location</h4>
              <p className="text-brand-white/60 text-sm">Industrial Area, Muscat, Oman</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-brand-accent/10 p-3 rounded-lg text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold">Email Us</h4>
              <p className="text-brand-white/60 text-sm">support@carcare.om</p>
            </div>
          </div>
        </div>
      </div>
      
      <form className="bg-brand-primary/5 p-8 md:p-12 rounded-3xl border border-brand-primary/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-white/50">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-white/50">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-white/50">Subject</label>
          <input 
            type="text" 
            className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="Service Inquiry"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-white/50">Message</label>
          <textarea 
            rows="4" 
            className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="How can we help you?"
          ></textarea>
        </div>
        <button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-white font-bold py-4 rounded-xl transition-all shadow-lg transform hover:scale-[1.02]">
          Send Message
        </button>
      </form>
    </div>
  )

}
export default ContactUs;
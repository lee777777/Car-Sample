import { Lineicons } from "@lineiconshq/react-lineicons";
import {  MapMarker1Outlined, Envelope1Outlined   } from "@lineiconshq/free-icons";
import { useContactUsForm } from "../hooks/useContactUsForm";
const ContactUs = () => {
const {
    formData,
    isSubmitting,
    fromErrors,
  
    handleChange,
    handleSubmit,
  } = useContactUsForm();

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
    
                <Lineicons icon={MapMarker1Outlined} size={20} color="currentColor" />
            </div>
            <div>
              <h4 className="font-bold">Our Location</h4>
              <p className="text-brand-white/60 text-sm">Industrial Area, Muscat, Oman</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-brand-accent/10 p-3 rounded-lg text-brand-accent">
       
                    <Lineicons icon={Envelope1Outlined} size={20} className="text-b" color="currentColor" />
            </div>
            <div>
              <h4 className="font-bold">Email Us</h4>
              <p className="text-brand-white/60 text-sm">support@carcare.om</p>
            </div>
          </div>
        </div>
      </div>
      
<form   onSubmit={handleSubmit} 
className="bg-brand-primary/20 p-8 md:p-12 rounded-3xl border border-brand-primary/20 space-y-6">  
    {fromErrors && (
          <div className="text-rose-500 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-sm font-medium whitespace-pre-line">
            {fromErrors}
          </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-white/50">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="John Doe"  value={formData.name} onChange={handleChange}
              name="name"

            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-white/50">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="john@example.com"  value={formData.email} onChange={handleChange}
              name="email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-white/50">Subject</label>
          <input 
            type="text" 
            className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="Service Inquiry"  value={formData.message} onChange={handleChange}
            name="message"
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
        {/* <button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-white font-bold py-4 rounded-xl transition-all shadow-lg transform hover:scale-[1.02]">
          Send Message
        </button> */}
             <button
       type="submit"
       disabled={isSubmitting}
     className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-white font-bold py-4 rounded-xl transition-all shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? "Sending..." : "Send Message"}
            </button>
      </form>
    </div>
  )

}
export default ContactUs;
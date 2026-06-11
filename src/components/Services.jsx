import productDisImage from '../assets/icons/delivery.png'
import productDisHoverImage from '../assets/icons/courier-hover.png'
import certifiedImage from '../assets/icons/high-quality.png'
import certifiedHoverImage from '../assets/icons/high-quality-hover.png'
import b2bImage from '../assets/icons/b2b.png'
import b2bHoverImage from '../assets/icons/b2b-hover.png'
import trainingImage from '../assets/icons/training.png'
import tainingHoverImage from '../assets/icons/training-hover.png'




const services = [
  {
    title: "Product Distribution",
    description:
      "Exclusive access to Artdeshine graphene coatings and premium detailing supplies for shops and retailers.",
    iconWhite: productDisImage,
    iconOrange: productDisHoverImage,
  },
  {
    title: "Certified Detailing",
    description:
      "Professional paint correction, ceramic coatings, and interior restoration at our approved service centers.",
    iconWhite: certifiedImage,
    iconOrange: certifiedHoverImage,
  },
  {
    title: "B2B Partnership",
    description:
      "Empower your car care business by becoming an authorized dealer and service host.",
    iconWhite: b2bImage,
    iconOrange: b2bHoverImage,
  },
  {
    title: "Training & Support",
    description:
      "Comprehensive technical training for detailing professionals on advanced coating applications.",
    iconWhite: trainingImage,
    iconOrange: tainingHoverImage,
  },
];


function Services() {
  return (

<div className="space-y-12">
  <div className="text-center space-y-4">
    <h2 className="text-brand-accent font-bold tracking-widest text-sm uppercase">
      Our Services
    </h2>
    <h3 className="text-3xl md:text-4xl font-bold">What We Offer</h3>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {services.map((service, index) => (
      <div
        key={index}
        className="group bg-brand-primary/10 border border-brand-primary/20 p-8 rounded-2xl hover:bg-brand-primary/20 transition-all hover:-translate-y-2"
      >
        {/* ICON */}
        <div className="relative w-12 h-12 mb-6">
          {/* white icon */}
          <img
            src={service.iconWhite}
            alt={service.title}
            className="absolute inset-0 w-12 h-12 object-contain opacity-100 group-hover:opacity-0 transition-opacity"
          />

          {/* orange icon */}
          <img
            src={service.iconOrange}
            alt={service.title}
            className="absolute inset-0 w-12 h-12 object-contain opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>

        <h4 className="text-xl font-bold mb-4 text-brand-white group-hover:text-brand-accent transition-colors">
          {service.title}
        </h4>

        <p className="text-brand-white/60 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    ))}
  </div>
</div>

  )

}
export default Services;
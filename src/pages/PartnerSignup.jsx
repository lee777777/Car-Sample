import { useState } from "react";

const initialForm = {
  companyName: "",
  ownerName: "",
  email: "",
  phone: "",
  location: "",
  crNumber: "",
  servicesProvided: [],
};

const PartnerSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    setFormData(initialForm);
    setStep(1);
  };

  return (
    <div className="pt-10 pb-20 max-w-3xl mx-auto px-4 space-y-12">
      
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Partner Onboarding</h1>
        <p className="text-brand-white/60">
          Join our network of elite detailing centers.
        </p>
      </div>

      {/* PROGRESS */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
                step >= i
                  ? "bg-brand-accent border-brand-accent"
                  : "border-brand-white/20"
              }`}
            >
              {i}
            </div>
            {i < 3 && (
              <div
                className={`h-1 flex-1 mx-3 ${
                  step > i ? "bg-brand-accent" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-brand-primary/5 p-8 rounded-3xl border border-white/10 space-y-6"
      >
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold">Business Details</h2>

            <input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="input"
            />

            <input
              name="crNumber"
              placeholder="CR Number"
              value={formData.crNumber}
              onChange={handleChange}
              className="input"
            />

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="input"
            />

            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-brand-accent py-3 rounded-xl"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold">Contact Info</h2>

            <input
              name="ownerName"
              placeholder="Owner Name"
              value={formData.ownerName}
              onChange={handleChange}
              className="input"
            />

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-white/10 py-3 rounded-xl"
              >
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-brand-accent py-3 rounded-xl"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold">Uploads</h2>

            <div className="border border-dashed p-6 rounded-xl text-center">
              Upload CR file
            </div>

            <div className="border border-dashed p-6 rounded-xl text-center">
              Upload shop images
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-white/10 py-3 rounded-xl"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 bg-brand-accent py-3 rounded-xl"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default PartnerSignup;
import { usePartnerSignupForm } from "../hooks/usePartnerSignupForm";
import "mapbox-gl/dist/mapbox-gl.css";



const PartnerSignup = () => {
 // Pull all states, elements, and functions dynamically out of the hook
  const {
    step,
    formData,
    verificationDoc,
    mapContainerRef,
    isSubmitting,
    fromErrors,
    firstStepValidation,
    secondStepValidation,
    thirdStepValidation,
    prevStep,
    handleChange,
    handleFileChange,
    handleAutoLocate,
    handleSubmit,
  } = usePartnerSignupForm();



  return (
    <div className="pt-10 pb-20 max-w-3xl mx-auto px-4 space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Partner Onboarding</h1>
        <p className="text-brand-white/60">
          Join our network of elite detailing centers.
        </p>
      </div>

      {/* PROGRESS FLOW VISUAL LAYER */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
                step >= i
                  ? "bg-brand-accent border-brand-accent text-brand-darkslate"
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

      {/* FORM INTERACTION FRAMEWORK */}
      <form
        onSubmit={handleSubmit}
        className="bg-brand-primary/5 p-8 rounded-3xl border border-white/10 space-y-6"
      >
        {fromErrors && (
          <div className="text-rose-500 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-sm font-medium whitespace-pre-line">
            {fromErrors}
          </div>
        )}
        {/* STEP 1: BUSINESS DETAILS & INTERACTIVE MAP VIEW */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold">Business Details</h2>
            
            <input
              name="companyName"
              placeholder="Company Name"
             value={formData.companyName} onChange={handleChange}
              className="input w-full p-3 bg-brand-darkslate border border-white/10 rounded-xl"
              required
            />

            <input
              name="crNumber"
              placeholder="CR Number"
              value={formData.crNumber}
              onChange={handleChange}
              className="input w-full p-3 bg-brand-darkslate border border-white/10 rounded-xl"
              required
            />

            <input
              name="companyAddress"
              placeholder="Physical Store Address Description"
              value={formData.companyAddress}
              onChange={handleChange}
              className="input w-full p-3 bg-brand-darkslate border border-white/10 rounded-xl"
              required
            />

            {/* EMBEDDED MAP GEOLOCATION SELECTION FRAMEWORK */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-brand-white/80">Pinpoint Shop Location</label>
                <button
                  type="button"
                  onClick={handleAutoLocate}
                  className="px-3 py-1.5 text-xs font-semibold bg-brand-accent text-brand-darkslate rounded-lg hover:bg-brand-accent/80 transition-colors"
                >
                  Use My Current Location
                </button>
              </div>
              
              <div className="relative h-[280px] w-full rounded-2xl border border-white/10 overflow-hidden">
                <div ref={mapContainerRef} className="absolute inset-0 w-full h-full block" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/40 bg-white/5 p-3 rounded-xl border border-white/5">
                <div>Lat: <span className="text-brand-accent">{formData.latitude.toFixed(6)}</span></div>
                <div>Lng: <span className="text-brand-accent">{formData.longitude.toFixed(6)}</span></div>
              </div>
            </div>

            <button
              type="button"
              onClick={firstStepValidation}
              className="w-full bg-brand-accent text-brand-darkslate font-bold py-3 rounded-xl transition-transform active:scale-95"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2: LEGAL POINT OF CONTACT INFORMATION */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold">Contact Info</h2>
            
            <input
              name="ownerName"
              placeholder="Owner Full Name"
              value={formData.ownerName}
              onChange={handleChange}
              className="input w-full p-3 bg-brand-darkslate border border-white/10 rounded-xl"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="input w-full p-3 bg-brand-darkslate border border-white/10 rounded-xl"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="input w-full p-3 bg-brand-darkslate border border-white/10 rounded-xl"
              required
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-white/10 py-3 rounded-xl font-medium transition-colors hover:bg-white/15"
              >
                Back
              </button>

              <button
                type="button"
                onClick={secondStepValidation}
                className="flex-1 bg-brand-accent text-brand-darkslate font-bold py-3 rounded-xl"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3: FILE STORAGE ASSET BINARY STREAMS */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold">Upload Verification Documents</h2>
              
            {/* CR FILE METADATA ASSET FILE PICKER */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white/80 block">
                Commercial Registration Document (PDF / Image Proof) *
              </label>
              <div className="border border-dashed border-white/20 p-6 rounded-xl text-center relative hover:border-brand-accent/50 transition-colors">
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required={!verificationDoc}
                />
                <p className="text-sm text-brand-white/60">
                  {verificationDoc ? `Selected: ${verificationDoc.name}` : "Click or Drag to Upload CR Document File"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-white/10 py-3 rounded-xl font-medium"
              >
                Back
              </button>

     <button
       type="submit"
       disabled={isSubmitting}
     className="flex-1 bg-brand-accent text-brand-darkslate font-bold py-3 rounded-xl transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? "Uploading & Saving..." : "Submit Application"}
            </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default PartnerSignup;
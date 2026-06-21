import { useState, useEffect, useRef, use } from "react";
import { useMutation } from "@tanstack/react-query";
import mapboxgl from "mapbox-gl";
import API from "../services/api";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


const INITIAL_FORM = {
  companyName: "",
  ownerName: "",
  email: "",
  phone: "",
  companyAddress: "",
  crNumber: "",
  latitude: 23.5859, // Muscat Default fallback
  longitude: 58.4074,
};
//form validation
// const validateFormData = (formData, verificationDoc) => {
//   const errors = [];
//   if (!formData.companyName?.trim()) errors.push("Company Name is required.");
//   if (!formData.crNumber?.trim()) errors.push("CR Number is required.");
//   if (!formData.companyAddress?.trim()) errors.push("Physical Address is required.");
//   if (!formData.ownerName?.trim()) errors.push("Owner Name is required.");
  
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!formData.email || !emailRegex.test(formData.email)) {
//     errors.push("A valid email address is required.");
//   }
//   if (!formData.phone?.trim()) errors.push("Phone number is required.");
//   if (!verificationDoc) errors.push("You must upload a CR document.");

//   if (errors.length > 0) throw new Error(errors.join("\n"));
// };
//hook
export const usePartnerSignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [verificationDoc, setVerificationDoc] = useState(null);
  const [fromErrors, setFormErrors] = useState("");

  // Mapbox Canvas References
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3)); //move from 1 to 3
  const prevStep = () => setStep((s) => Math.max(s - 1, 1)); //move backe once until step 1 only
  const firstStepValidation = () =>{
     const errors = [];
     const CR_REGEX = /^\d{6,8}$/;
     if (!formData.companyName?.trim()) errors.push("Company Name is required.");
     if (!formData.crNumber?.trim()){ 
      errors.push("CR Number is required.")}
      else if (!CR_REGEX.test(formData.crNumber.trim())) {
      errors.push("CR Number must be a valid numeric sequence (6 to 8 digits).");
    }
     if (!formData.companyAddress?.trim()) errors.push("Physical Address is required.");
    if (errors.length > 0) {
      setFormErrors(errors.join("\n"));
      return false; // Blocks navigation
    }
    
    setFormErrors("");
    nextStep();
    return true;
  }
  const secondStepValidation = () =>{
     const errors = [];
     const OMAN_PHONE_REGEX = /^(?:\+?968)?(?:9|7)\d{7}$/;
    if (!formData.ownerName?.trim()) errors.push("Owner Name is required.");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.push("A valid email address is required.");
  }
  if (!formData.phone?.trim()){
     errors.push("Phone number is required.")}
     else if (!OMAN_PHONE_REGEX.test(formData.phone.trim())) {
      errors.push("Please enter a valid phone number.");
    }
  if (errors.length > 0) {
      setFormErrors(errors.join("\n"));
      return false; // Blocks navigation
    }
    
    setFormErrors("");
    nextStep();
    return true;
  }
  const thirdStepValidation = () =>{
     if (!verificationDoc) { 
      setFormErrors("You must upload a CR document.");
      return false; 
     }
    setFormErrors("");
    return true;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors("");
    setFormData((prev) => ({ ...prev, [name]: value })); //this will add all form data of all types exept files
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) { //this will check if file is added and has a name
      setVerificationDoc(e.target.files[0]); //this will add the file name in frontend state only
    }
  };

  // Sync Mapbox Instance Statefully with Hook steps
  useEffect(() => {
    if (step !== 1 || !mapContainerRef.current) return; // stop the function if user moves to next step or container didn't load

    mapRef.current = new mapboxgl.Map({  //map refrence with initial form data
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [formData.longitude, formData.latitude],
      zoom: 11,
    });

    markerRef.current = new mapboxgl.Marker({ draggable: true }) //set markers location to the form data
      .setLngLat([formData.longitude, formData.latitude])
      .addTo(mapRef.current);

    markerRef.current.on("dragend", () => {  //event listner when user moves the marker and updates location
      const lngLat = markerRef.current.getLngLat();
      setFormData((prev) => ({
        ...prev,
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      }));
    });

    return () => {  //cleans map data when user moves to diffrent step
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [step]);
   //detect user location if user wants
  const handleAutoLocate = () => {
    if (!navigator.geolocation) return alert("Geolocation unsupported.");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({ ...prev, latitude, longitude }));
        if (mapRef.current) mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 });
        if (markerRef.current) markerRef.current.setLngLat([longitude, latitude]);
      },
      () => alert("Unable to acquire location automatically.")
    );
  };

  // Chained Two-Phase API Transaction
  const submissionMutation = useMutation({
    mutationFn: async () => {
      // validateFormData(formData, verificationDoc);
      if (!thirdStepValidation()) throw new Error("Verification checks incomplete.");

      // Phase 1 Handshake
    const handshakeResponse = await API.post("/applications/signed-url", {
        filename: verificationDoc.name,
        fileType: verificationDoc.type,
      });

      const { signedUrl, publicUrl } = handshakeResponse.data;

      // Cloud Binary upload
      const upload = await fetch(signedUrl, { method: "PUT", headers: { "Content-Type": verificationDoc.type }, body: verificationDoc });
      if (!upload.ok) throw new Error("Cloud Storage upload failure.");

      // Phase 2 Database ledger transaction
  const dbPayload = {
        company_name: formData.companyName,
        commercial_registration_number: formData.crNumber,
        company_address: formData.companyAddress,
        owner_name: formData.ownerName,
        owner_email: formData.email,
        owner_phone: formData.phone,
        latitude: formData.latitude,
        longitude: formData.longitude,
        verification_document_url: publicUrl,
      };

      const dbResponse = await API.post("/applications/submit", dbPayload);

      return dbResponse.data;
  },
    // Automatically handle alerts using TanStack's lifecycle methods
    onSuccess: () => {
      alert("Application submitted successfully!");
      setFormData(INITIAL_FORM);
      setVerificationDoc(null);
      setStep(1);
    },
    onError: (error) => {
      // Pulls the backend custom message from Axios or falls back to generic message
      const message = error.response?.data?.error || error.message;
      alert(`Submission Interrupted:\n${message}`);
    }
  }); 

  const handleSubmit = (e) => {
    e.preventDefault();
  if (thirdStepValidation()) {
      submissionMutation.mutate();
    }
  };

  return {
    step,
    formData,
    verificationDoc,
    mapContainerRef,
    isSubmitting: submissionMutation.isPending,
    fromErrors,
    // nextStep,
    firstStepValidation,
    secondStepValidation,
    thirdStepValidation,
    prevStep,
    handleChange,
    handleFileChange,
    handleAutoLocate,
    handleSubmit,
  };
};
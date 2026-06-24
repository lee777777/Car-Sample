import { useState, useEffect, useRef, use } from "react";
import { useMutation } from "@tanstack/react-query";
import API from "../services/api";

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
  subject: "",
};
export const useContactUsForm = () => {

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [fromErrors, setFormErrors] = useState("");

const formValidation = () =>{
     const errors = [];
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!formData.name?.trim()) errors.push("Name is required.");
     if (!formData.email?.trim()){ 
      errors.push("Email Address is required.")}
      else if (!emailRegex.test(formData.email.trim())) {
      errors.push("Email Address must be a valid.");
    }
    if (!formData.subject?.trim()) errors.push("Subject is required.");
    if (!formData.message?.trim()) errors.push("Message is required.");
   
    if (errors.length > 0) {
      setFormErrors(errors.join("\n"));
      return false; 
    }
    
    setFormErrors("");

    return true;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors("");
    setFormData((prev) => ({ ...prev, [name]: value })); //this will add all form data of all types 
  };
 // Chained Two-Phase API Transaction
  const submissionMutation = useMutation({
    mutationFn: async () => {
       if (!formValidation()) throw new Error("Verification checks incomplete.");
      const dbPayload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      
      };

      const dbResponse = await API.post("/contact/submit", dbPayload);

      return dbResponse.data;
  },
 onSuccess: () => {
      alert("Quiery submitted successfully!");
      setFormData(INITIAL_FORM);
      setFormErrors("");

    },
    onError: (error) => {
      // Pulls the backend custom message from Axios or falls back to generic message
      const message = error.response?.data?.error || error.message;
      alert(`Submission Interrupted:\n${message}`);
    }
  }); 
 const handleSubmit = (e) => {
    e.preventDefault();
  if (formValidation()) {
      submissionMutation.mutate();
    
    }
  };
  return {
    formData,
    isSubmitting: submissionMutation.isPending,
    fromErrors,
    handleChange,
    handleSubmit,
  };
};
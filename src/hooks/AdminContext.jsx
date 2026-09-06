import React, { createContext, useContext, useState } from 'react';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';
import API from "../services/api";
import { adminQueries } from '../queryOptions/adminQueries';

const AdminContext = createContext(null);
export const AdminProvider = ({ children }) => {

  const queryClient = useQueryClient();
 // fetching Data with suspension hooks
  const useApplicationsList = () => useSuspenseQuery(adminQueries.applications());
  const usePartnersList = () => useSuspenseQuery(adminQueries.partners());
  const useInquiriesList = () => useSuspenseQuery(adminQueries.inquiries());
  const usePartnerProfile = (id) => useSuspenseQuery(adminQueries.partnerDetails(id));
  const useApplicationDetails = (id) => useSuspenseQuery(adminQueries.applicationDetails(id));
  const useInquiryDetails = (id) => useSuspenseQuery(adminQueries.inquiryDetails(id));

  async function uploadLogo(file) {
    const uniqueId = window.crypto.randomUUID().split('-')[0]; // e.g., 'a3b2c1d0'
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const storagePath = `${uniqueId}/${cleanFileName}`;
   try {
  const { data, error } = await supabase.storage.from('partner-logos').upload(storagePath, file, {
    upsert: false,
    contentType: file.type,
})
   if (error) throw error;

    // 3. Resolve the permanent public/authenticated access URL for this asset path
    const { data: publicUrlData } = supabase.storage
      .from('partner-logos')
      .getPublicUrl(storagePath);

   return publicUrlData.publicUrl;
  } catch (error) {
    console.error("File Upload Failure:", error);
   throw error;
  }
}
  async function uploadPartnerGallary(files) {
    //check iif it's one file put it in a array
   const filesArray = Array.isArray(files) ? files : [files];
  
  // collect all public image URLs
  const uploadedUrls = [];

  //  loop over each file 
  for (const file of filesArray) {
    try {
      
      const uniqueId = window.crypto.randomUUID().split('-')[0]; // e.g., 'a3b2c1d0'
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const storagePath = `${uniqueId}/${cleanFileName}`;

      // Upload the raw binary file object to Supabase
      const { data, error } = await supabase.storage
        .from('partner-gallery')
        .upload(storagePath, file, {
          upsert: false,
          contentType: file.type, 
        });

      if (error) throw error;

      // Resolve the public link path
      const { data: publicUrlData } = supabase.storage
        .from('partner-gallery')
        .getPublicUrl(storagePath);

      // Push this specific file URL to our collection array bucket
      uploadedUrls.push(publicUrlData.publicUrl);

    } catch (error) {
      console.error(`File Upload Failure for file (${file.name}):`, error);
      throw error; // Halts pipeline execution if any single upload critical fault occurs
    }
  }

  // Return the array of image URL strings 
  return uploadedUrls;
}
const editPartnerMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
    // route: PATCH /api/admin/partners/:id/profile
    const response = await API.patch(`/admin/partners/${id}/profile`, payload);
    return response.data;
  },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'partners'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'partners', variables.id] });
    }
  });

  const reviewApplicationMutation = useMutation({
    mutationFn: async ({ id, action }) => {
    const response = await API.post(`/admin/partners_applications/${id}/review`, { action });
    return response.data;
  },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'applications'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'applications', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'partners'] });
    }
  });

  const editInquiryMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
    const response = await API.patch(`/admin/inquiries/${id}`, payload);
    return response.data;
  },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries', variables.id] });
    }
  });
 

return (
    <AdminContext.Provider value={{
      // Fetching 
      useApplicationsList,
      usePartnersList,
      useInquiriesList,
      usePartnerProfile,
      useApplicationDetails,
      useInquiryDetails,

      // Asset Upload Functions
      uploadLogo,
      uploadPartnerGallary,

      //Mutation Handlers
      updatePartner: editPartnerMutation.mutateAsync,
      reviewApplication: reviewApplicationMutation.mutateAsync,
      updateInquiry: editInquiryMutation.mutateAsync,

      // Mutation Pending States
      isUpdatingPartner: editPartnerMutation.isPending,
      isReviewingApp: reviewApplicationMutation.isPending,
      isUpdatingInquiry: editInquiryMutation.isPending
    }}>
      {children}
    </AdminContext.Provider>
  );
};
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used inside an AdminProvider wrapper.");
  }
  return context;
};
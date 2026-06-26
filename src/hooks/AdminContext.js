import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../supabaseClient';
import API from "../services/api";

const AdminContext = createContext(null);
export const AdminProvider = ({ children }) => {
  const [partners, setPartners] = useState([]);

  

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
 

  return (
    <AdminContext.Provider value={{ partners }}>
      {children}
    </AdminContext.Provider>
  );
};
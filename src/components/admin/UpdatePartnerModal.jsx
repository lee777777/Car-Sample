import React, { useState } from 'react';
import { useAdmin } from '../../hooks/AdminContext';


export function UpdatePartnerModal({ partner, onClose }) {
const INITIAL_FORM = {
    company_bio: partner.company_bio || "",
    company_logo_url: partner.company_logo_url || "",
    company_pictures: partner.company_pictures || [], 
    operating_hours: partner.operating_hours || "",
    is_active: partner.is_active ?? false,
    info_status: partner.info_status || "incomplete",
  };
    const { updatePartner, isUpdatingPartner, uploadLogo, uploadPartnerGallary } = useAdmin();
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [fromErrors, setFormErrors] = useState("");
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
     };
     const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const publicUrl = await uploadLogo(file);
      setFormData((prev) => ({ ...prev, company_logo_url: publicUrl }));
    } catch (err) {
      alert("Logo upload failed: " + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingGallery(true);
    try {
      const publicUrls = await uploadPartnerGallary(files);
      // Append new image URLs 
      setFormData((prev) => ({
        ...prev,
        company_pictures: [...prev.company_pictures, ...publicUrls],
      }));
    } catch (err) {
      alert("Gallery upload failed: " + err.message);
    } finally {
      setUploadingGallery(false);
    }
  };
  const handleRemovePicture = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      company_pictures: prev.company_pictures.filter((_, idx) => idx !== indexToRemove),
    }));
  };
  const handleRemoveLogo = () => {
  setFormData((prev) => ({ ...prev, company_logo_url: "" }));
};
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const { company_bio, company_logo_url, company_pictures, operating_hours, is_active, info_status } = formData;

      await updatePartner({
        id: partner.id,
        payload: {
          company_bio,
          company_logo_url,
          company_pictures,
          operating_hours,
          is_active,
          info_status,
        },
      });

      alert("Changes saved and dashboard tables successfully refreshed!");
      onClose();
    } catch (error) {
      alert("Failed to sync updates: " + error.message);
    }
  };



return (
  <div className="modal-backdrop bg-slate-900/40 fixed inset-0 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold text-lg text-slate-800">Update Profile: {partner.company_name}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        {/* Biography Block */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Company Bio</label>
          <textarea
            name="company_bio"
            value={formData.company_bio}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 text-sm h-20"
            placeholder="Tell us about your services..."
          />
        </div>

        {/* Operating Hours Block */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Operating Hours</label>
          <input
            type="text"
            name="operating_hours"
            value={formData.operating_hours}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 text-sm"
            placeholder="e.g., 8:00 AM - 10:00 PM"
          />
        </div>

        {/* Logo Upload Section */}
       <div>
  <label className="block text-xs font-semibold uppercase text-slate-500">Company Logo</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleLogoUpload}
    className="block text-xs text-slate-500 mt-1 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
  />
  {uploadingLogo && <p className="text-xs text-amber-600 animate-pulse mt-1">Uploading logo...</p>}
  
  {formData.company_logo_url && (
    <div className="relative group w-12 h-12 border rounded overflow-hidden cursor-pointer shadow-sm mt-2">
      <img src={formData.company_logo_url} alt="Logo" className="w-full h-full object-cover transition group-hover:scale-105" />
      <button
        type="button"
        onClick={handleRemoveLogo}
        className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        title="Remove Logo"
      >
        ✕
      </button>
    </div>
  )}
</div>
          
        {/* Multi Gallery Images Section */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Gallery Pictures</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            className="block text-xs text-slate-500 mt-1 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
          />
          {uploadingGallery && <p className="text-xs text-amber-600 animate-pulse mt-1">Uploading images...</p>}
          <div className="flex gap-2 flex-wrap mt-2">
            {formData.company_pictures.map((url, idx) => (
              <div key={idx} className="relative group w-12 h-12 border rounded overflow-hidden cursor-pointer shadow-sm">
                <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition group-hover:scale-105" />
                {/* delete option */}
                <button
                  type="button"
                  onClick={() => handleRemovePicture(idx)}
                  className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  title="Remove Image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Status */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Application Info Status</label>
          <select
            name="info_status"
            value={formData.info_status}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 text-sm bg-white"
          >
            <option value="incomplete">Incomplete</option>
            <option value="updated">Updated</option>
          </select>
        </div>

        {/* Global Visibility Checkbox */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
            Publish partner profile live to user platforms
          </label>
        </div>

        {/* Footer Submits Buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded text-slate-600 text-sm hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdatingPartner || uploadingLogo || uploadingGallery}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded text-sm font-semibold shadow-sm transition"
          >
            {isUpdatingPartner ? "Saving Settings..." : "Update"}
          </button>
        </div>
      </form>
    </div>
);

}
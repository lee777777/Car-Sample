import React, { useState } from 'react';
import { useAdmin } from '../../hooks/AdminContext';

export function ApplicationReviewModal({ application, onClose }) {
  const { updatePartner, isUpdatingPartner } = useAdmin();
  const [internalNotes, setInternalNotes] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleStatusAction = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      await updatePartner({
        id: application.id,
        payload: {
          // Keep existing application info, but update review flags
          info_status: newStatus,
          is_active: newStatus === 'approved', // Auto-publish if approved
          internal_notes: internalNotes,       // Optional tracking notes
        },
      });

      alert(`Application marked as ${newStatus}!`);
      onClose();
    } catch (error) {
      alert("Failed to update application status: " + error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="modal-backdrop bg-slate-900/40 fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              New Application
            </span>
            <h3 className="font-bold text-lg text-slate-800 mt-1">{application.company_name}</h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        {/* Applicant Context Summary */}
        <div className="bg-slate-50 p-3 rounded-lg border text-sm space-y-2">
          <div>
            <span className="block text-slate-400 text-xs font-medium">Applicant Name</span>
            <p className="text-slate-700 font-medium">{application.contact_name || 'N/A'}</p>
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-medium">Contact Details</span>
            <p className="text-slate-700">{application.phone} | {application.email}</p>
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-medium">Company Bio</span>
            <p className="text-slate-600 text-xs mt-0.5 italic">"{application.company_bio || 'No bio provided.'}"</p>
          </div>
        </div>

        {/* Reviewer Admin Notes Form */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Internal Review Notes</label>
          <textarea
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            className="w-full border p-2 rounded mt-1 text-sm h-16 resize-none"
            placeholder="Add notes about background check, verification, or rejection reasons..."
          />
        </div>

        {/* Application Action Footers */}
        <div className="flex flex-col gap-2 pt-3 border-t mt-4">
          <div className="flex justify-between items-center w-full">
            <button
              type="button"
              onClick={() => handleStatusAction('incomplete')}
              disabled={updatingStatus || isUpdatingPartner}
              className="px-3 py-2 border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-lg transition"
            >
              Flag Incomplete
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleStatusAction('rejected')}
                disabled={updatingStatus || isUpdatingPartner}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg text-xs font-semibold transition"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleStatusAction('approved')}
                disabled={updatingStatus || isUpdatingPartner}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm rounded-lg text-xs font-semibold transition"
              >
                Approve & Launch
              </button>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="text-center text-xs text-slate-400 hover:text-slate-600 mt-2"
          >
            Close view without saving decisions
          </button>
        </div>

      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { UpdatePartnerModal } from './UpdatePartnerModal'; // Adjust path

export function PartnerDashboard({ partners = [] }) {
  // 1. Track which partner is being edited (null means modal is closed)
  const [selectedPartner, setSelectedPartner] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Partner Management</h2>

      {/* Partner */}
<div className="space-y-2">
        {partners.length === 0 ? (
          <p className="text-sm text-slate-400 italic p-4 border border-dashed rounded bg-slate-50/50">
            No registered partners found in the system.
          </p>
        ) : (
          partners.map((partner) => (
            <div key={partner.id} className="flex justify-between items-center p-4 border rounded bg-white">
              <div>
                <p className="font-semibold">{partner.company_name}</p>
                <p className="text-sm text-slate-500">{partner.info_status}</p>
              </div>
              {/* 2. Clicking this sets the partner object and opens the modal */}
              <button
                onClick={() => setSelectedPartner(partner)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded"
              >
                Edit Profile
              </button>
            </div>
          ))
        )}
      </div>

      {/* Only show if selectedPartner has a value */}
      {selectedPartner && (
        <UpdatePartnerModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)} // 4. Resetting to null closes it
        />
      )}
    </div>
  );
}

import React from 'react';
import { useLocation } from 'react-router-dom';
export function AdminHeader() {
 const location = useLocation();
  const adminName = "Leen Suleiman";

  // Extracts current sub-path text from url safely (e.g., /admin/stockUpdate -> 'stockUpdate')
  const rawPath = location.pathname.split('/').pop();
  const currentViewTitle = rawPath === 'admin' || !rawPath ? 'Overview' : rawPath;

  const handleLogout = () => {
    console.log("Clearing user context and routing to sign-in screen...");
    // Put auth redirection hook logic here
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm shrink-0">
      
      {/* Dynamic Section Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-slate-400 font-medium">Portal</span>
        <span className="text-slate-300 text-xs">/</span>
        <span className="text-slate-800 font-semibold capitalize tracking-wide">
          {currentViewTitle.replace(/([A-Z])/g, ' $1')}
        </span>
      </div>

      {/* Admin Identity Control Context elements */}
      <div className="flex items-center space-x-4">
        
        {/* Name Identity Details */}
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800 leading-none mb-0.5">{adminName}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Director</p>
        </div>
        
        {/* Dynamic User Avatar Placeholder Initials */}
        <div className="w-9 h-9 rounded-full bg-slate-100 border flex items-center justify-center text-xs font-bold text-slate-600 shadow-inner">
          {adminName.split(' ').map(namePart => namePart[0]).join('')}
        </div>

        {/* Guarded Logout Action Trigger */}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/50 rounded-lg transition-all"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
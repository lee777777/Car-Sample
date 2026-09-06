import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { AdminSideBar } from '../components/admin/AdminSideBar'; 
import { AdminHeader } from '../components/admin/AdminHeader';

export function AdminLayout({ children }) {



  return (
<div className="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased overflow-hidden">

 <AdminSideBar/>
<div className="flex-1 flex flex-col overflow-hidden">
        
      
        <AdminHeader />

        {/*  Workspace Scroll Container */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 p-6 min-h-[calc(100vh-8rem)] shadow-sm">
            <Suspense fallback={<div className="p-4 text-center text-sm text-slate-400">Loading component view...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </main>

      </div>
</div>
   
  );
}
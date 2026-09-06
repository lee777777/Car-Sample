import React from 'react';
import { NavLink } from "react-router-dom";

export function AdminSideBar() {
  const menuItems = [
    { path: '/admin', label: 'Dashboard Overview', icon: '📊', end: true },
    { path: '/admin/partners', label: 'Registered Partners', icon: '🤝' },
    { path: '/admin/applications', label: 'Applications', icon: '📝' },
    { path: '/admin/inquiries', label: 'Inquiries', icon: '✉️' },
    { path: '/admin/orders', label: 'Orders', icon: '📦' },
    { path: '/admin/stockUpdate', label: 'Inventory / Stock', icon: '🛒' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
      
      {/* Brand Logo Area */}
      <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 text-xs">
          DH
        </div>
        <div>
          <h1 className="font-bold text-white tracking-tight text-sm">Detailing Hub</h1>
          <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Administration</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => 
              `w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sticky footer */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-600 font-medium">
        System Panel 
      </div>
    </aside>
  );
}
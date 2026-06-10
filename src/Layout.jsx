import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Reusable Layout Wrapper
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-darkslate text-brand-white font-sans">
      {/* Persistent App Header */}
      <NavBar />

      {/* Dynamic Content Region (Grows to push footer down) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Persistent App Footer */}
      <Footer />
    </div>
  );
}
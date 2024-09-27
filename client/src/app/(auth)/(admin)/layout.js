'use client'
import React from 'react';
import Sidebar from '@/component/(auth)/(admin)/sidebar/page'; 
import TopNavbar from '@/component/(auth)/(admin)/navbar/page';
import { Toaster } from 'react-hot-toast';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Top Navbar */}
      <div className="fixed w-full z-10">
        <TopNavbar />
      </div>

      {/* Sidebar - reduced width */}
      <div className="w-1/6 mt-20"> 
        <Sidebar />
      </div>

      <Toaster position="top-right" reverseOrder={false} />

      {/* Main Content - increased width */}
      <div className="w-5/6 ml-auto mt-[60px] p-4"> {/* Changed from w-4/5 to w-5/6 */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

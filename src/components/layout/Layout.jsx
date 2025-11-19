import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, onLogout, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default true for desktop

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onLogout={onLogout}
        user={user}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={user}
      />
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;

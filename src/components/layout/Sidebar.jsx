import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  DollarSign,
  Receipt,
  RotateCcw,
  FileText,
  Package,
  Store,
  MapPin,
  Truck,
  Settings,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuSections = [
    {
      title: "TRANSACTIONS",
      items: [
        { name: "Purchases", icon: ShoppingCart, path: "/purchases" },
        { name: "Sales", icon: DollarSign, path: "/sales" },
        { name: "Payments", icon: Receipt, path: "/payments" },
        { name: "Returns", icon: RotateCcw, path: "/returns" },
        { name: "Expenses", icon: FileText, path: "/expenses" },
      ],
    },
    {
      title: "MASTER DATA",
      items: [
        { name: "Products", icon: Package, path: "/products" },
        { name: "Outlets", icon: Store, path: "/outlets" },
        { name: "Routes", icon: MapPin, path: "/routes" },
        { name: "Vendors", icon: Truck, path: "/vendors" },
        { name: "Expense Types", icon: Settings, path: "/expense-types" },
      ],
    },
    {
      title: "STORE MANAGEMENT",
      items: [
        { name: "Store Management", icon: Store, path: "/store-management" },
      ],
    },
    {
      title: "REPORTS",
      items: [
        { name: "Stock Report", icon: BarChart3, path: "/stock-report" },
        { name: "Purchase Report", icon: BarChart3, path: "/purchase-report" },
        { name: "Sales Report", icon: BarChart3, path: "/sales-report" },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        { name: "Company Settings", icon: Settings, path: "/company-settings" },
      ],
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Now positioned below navbar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#1E293B] text-white w-64 z-40 transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Dashboard Item */}
        <div className="p-4">
          <button
            onClick={() => handleNavigation("/")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/")
                ? "bg-[#E31E24] text-white"
                : "text-gray-300 hover:bg-slate-700"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
        </div>

        {/* Menu Sections */}
        <nav className="px-4 pb-6">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="px-4 mb-3 text-xs font-semibold text-gray-400">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-[#E31E24] text-white"
                          : "text-gray-300 hover:bg-slate-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

import { useState } from "react";
import { Menu, User, LogOut, ChevronDown, Store } from "lucide-react";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, onLogout, user }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Get user display information
  const displayName = user?.username || "User";
  const displayRole = user?.role || "User";

  return (
    <header className="h-16 bg-[#E31E24] text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side - Menu toggle button and Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-white transition-colors rounded-lg hover:bg-red-700"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo - Always visible */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
              <Store className="w-6 h-6 text-[#E31E24]" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold leading-tight">
                Coca-Cola Inventory
              </h1>
              <p className="text-xs opacity-90">Business Management System</p>
            </div>
          </div>
        </div>

        {/* Right side - User menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 transition-colors rounded-lg hover:bg-red-700"
          >
            <User className="w-5 h-5" />
            <div className="hidden text-left sm:block">
              <div className="text-sm font-semibold">{displayName}</div>
              <div className="text-xs opacity-90">{displayRole}</div>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isUserMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div className="absolute right-0 z-50 w-56 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-900">
                    {displayName}
                  </div>
                  <div className="text-xs text-gray-500">{displayRole}</div>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

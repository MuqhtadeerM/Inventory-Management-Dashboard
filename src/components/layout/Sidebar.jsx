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

  // Define all menu sections with role access
  const allMenuSections = [
    {
      title: "TRANSACTIONS",
      roles: ["Admin", "Manager", "User"],
      items: [
        {
          name: "Purchases",
          icon: ShoppingCart,
          path: "/purchases",
          roles: ["Admin", "Manager"],
        },
        {
          name: "Sales",
          icon: DollarSign,
          path: "/sales",
          roles: ["Admin", "Manager", "User"],
        },
        {
          name: "Payments",
          icon: Receipt,
          path: "/payments",
          roles: ["Admin", "Manager", "User"],
        },
        {
          name: "Returns",
          icon: RotateCcw,
          path: "/returns",
          roles: ["Admin", "Manager"],
        },
        {
          name: "Expenses",
          icon: FileText,
          path: "/expenses",
          roles: ["Admin", "Manager", "User"],
        },
      ],
    },
    {
      title: "MASTER DATA",
      roles: ["Admin"], // Only Admin can see Master Data
      items: [
        {
          name: "Products",
          icon: Package,
          path: "/products",
          roles: ["Admin"],
        },
        { name: "Outlets", icon: Store, path: "/outlets", roles: ["Admin"] },
        { name: "Routes", icon: MapPin, path: "/routes", roles: ["Admin"] },
        { name: "Vendors", icon: Truck, path: "/vendors", roles: ["Admin"] },
        {
          name: "Expense Types",
          icon: Settings,
          path: "/expense-types",
          roles: ["Admin"],
        },
      ],
    },
    {
      title: "STORE MANAGEMENT",
      roles: ["Admin"], // Only Admin can see Store Management
      items: [
        {
          name: "Store Management",
          icon: Store,
          path: "/store-management",
          roles: ["Admin"],
        },
      ],
    },
    {
      title: "REPORTS",
      roles: ["Admin", "Manager"],
      items: [
        {
          name: "Stock Report",
          icon: BarChart3,
          path: "/stock-report",
          roles: ["Admin", "Manager"],
        },
        {
          name: "Purchase Report",
          icon: BarChart3,
          path: "/purchase-report",
          roles: ["Admin", "Manager"],
        },
        {
          name: "Sales Report",
          icon: BarChart3,
          path: "/sales-report",
          roles: ["Admin", "Manager"],
        },
      ],
    },
    {
      title: "SETTINGS",
      roles: ["Admin"], // Only Admin can see Settings
      items: [
        {
          name: "Company Settings",
          icon: Settings,
          path: "/company-settings",
          roles: ["Admin"],
        },
      ],
    },
  ];

  // Filter menu sections and items based on user role
  const getFilteredMenuSections = () => {
    if (!user?.role) return [];

    return allMenuSections
      .filter((section) => section.roles.includes(user.role))
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.roles.includes(user.role)),
      }))
      .filter((section) => section.items.length > 0);
  };

  const menuSections = getFilteredMenuSections();

  // Get dashboard path based on role
  const getDashboardPath = () => {
    if (user?.role === "Admin") return "/admin-dashboard";
    if (user?.role === "Manager") return "/manager-dashboard";
    return "/dashboard";
  };

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
            onClick={() => handleNavigation(getDashboardPath())}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(getDashboardPath())
                ? "bg-[#E31E24] text-white"
                : "text-gray-300 hover:bg-slate-700"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
        </div>

        {/* Menu Sections - Filtered by Role */}
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

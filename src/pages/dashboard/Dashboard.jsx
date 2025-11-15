import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  Store,
} from "lucide-react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentSales from "../../components/dashboard/RecentSales";
import LowStockProducts from "../../components/dashboard/LowStockProducts";

const Dashboard = () => {
  const statsCards = [
    {
      title: "Total Sales",
      value: "₹1,568",
      icon: DollarSign,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Purchases",
      value: "₹5,880",
      icon: ShoppingCart,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Stock",
      value: "2,175",
      icon: Package,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Pending Payments",
      value: "0",
      icon: TrendingUp,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Products",
      value: "8",
      icon: Package,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Outlets",
      value: "4",
      icon: Store,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back, Admin User!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card, idx) => (
          <DashboardCard key={idx} {...card} />
        ))}
      </div>

      {/* Recent Sales and Low Stock Products */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentSales />
        <LowStockProducts />
      </div>
    </div>
  );
};

export default Dashboard;

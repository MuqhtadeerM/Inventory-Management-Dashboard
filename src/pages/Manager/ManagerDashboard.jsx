import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import StatCard from "../../components/common/StatCard";

const ManagerDashboard = ({ user }) => {
  // Sample data - replace with real data from your context/API
  const dashboardData = {
    totalSales: 1568,
    totalPurchases: 5880,
    totalStock: 2175,
    pendingPayments: 0,
    totalProducts: 8,
    recentSales: [
      {
        id: 1,
        outlet: "City Mart",
        amount: 1568,
        date: "11/12/2025",
        status: "paid",
      },
    ],
    lowStockProducts: [
      {
        id: 1,
        name: "Fanta 330ml",
        category: "Beverages",
        stock: 30,
        status: "Low Stock",
      },
      {
        id: 2,
        name: "Fanta 500ml",
        category: "Beverages",
        stock: 45,
        status: "Low Stock",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Welcome back, {user?.username || "Manager"}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Sales"
          value={`₹${dashboardData.totalSales.toLocaleString()}`}
          icon={DollarSign}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Total Purchases"
          value={`₹${dashboardData.totalPurchases.toLocaleString()}`}
          icon={ShoppingCart}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Stock"
          value={dashboardData.totalStock.toLocaleString()}
          icon={Package}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Pending Payments"
          value={dashboardData.pendingPayments}
          icon={TrendingUp}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Total Products"
          value={dashboardData.totalProducts}
          icon={Package}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />
      </div>

      {/* Bottom Section - Recent Sales and Low Stock */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Sales</h2>
          <div className="space-y-4">
            {dashboardData.recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-semibold text-gray-900">{sale.outlet}</p>
                  <p className="text-sm text-gray-500">{sale.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    ₹{sale.amount.toLocaleString()}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Low Stock Products
          </h2>
          <div className="space-y-4">
            {dashboardData.lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {product.stock} units
                  </p>
                  <span className="inline-block px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded">
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

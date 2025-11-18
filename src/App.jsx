import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login.jsx";
import Layout from "./components/layout/Layout.jsx";

// Transaction Pages
import Purchases from "./pages/transactions/Purchases.jsx";
import Sales from "./pages/transactions/Sales.jsx";
import Payments from "./pages/transactions/Payments.jsx";
import Returns from "./pages/transactions/Returns.jsx";
import Expenses from "./pages/transactions/Expenses.jsx";

// Master Data Pages
import Products from "./pages/master-data/Products.jsx";
import Outlets from "./pages/master-data/Outlets.jsx";
import RoutesPage from "./pages/master-data/Routes.jsx";
import Vendors from "./pages/master-data/Vendors.jsx";
import ExpenseTypes from "./pages/master-data/ExpenseTypes.jsx";

// Store Management
import StoreManagement from "./pages/store-management/StoreManagement.jsx";

// Reports
import StockReport from "./pages/reports/StockReport.jsx";
import PurchaseReport from "./pages/reports/PurchaseReport.jsx";
import SalesReport from "./pages/reports/SalesReport.jsx";

// Settings
import CompanySettings from "./pages/settings/CompanySettings.jsx";

// Context
import { ExpenseProvider } from "./context/ExpenseContext";

import {
  getUserFromStorage,
  saveUserToStorage,
  logoutUser,
} from "./utils/authService";
import { PaymentProvider } from "./context/PaymentContext.jsx";
import { PurchaseProvider } from "./context/PurchaseContext.jsx";
import { ReturnProvider } from "./context/ReturnContext.jsx";
import { SalesProvider } from "./context/SalesContext.jsx";

// Dashboards
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ManagerDashboard from "./pages/Manager/ManagerDashboard.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  // Load user from storage on refresh
  useEffect(() => {
    const savedUser = getUserFromStorage();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  // Layout wrapper with providers
  const LayoutWrapper = ({ children }) => (
    <ExpenseProvider>
      <PaymentProvider>
        <PurchaseProvider>
          <ReturnProvider>
            <SalesProvider>
              <Layout
                user={user}
                onLogout={() => {
                  logoutUser();
                  setUser(null);
                }}
              >
                {children}
              </Layout>
            </SalesProvider>
          </ReturnProvider>
        </PurchaseProvider>
      </PaymentProvider>
    </ExpenseProvider>
  );

  // ROLE-BASED redirect logic
  const redirectByRole = (role) => {
    if (role === "Admin") return "/admin-dashboard";
    if (role === "Manager") return "/manager-dashboard";
    return "/dashboard"; // Normal users
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={redirectByRole(user.role)} replace />
            ) : (
              <Login
                onLogin={(u) => {
                  saveUserToStorage(u);
                  setUser(u);
                }}
              />
            )
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <AdminDashboard user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* MANAGER DASHBOARD */}
        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <ManagerDashboard user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <UserDashboard user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* TRANSACTION ROUTES */}
        <Route
          path="/purchases"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Purchases user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Sales user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Payments user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/returns"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Returns user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Expenses user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* MASTER DATA */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Products user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/outlets"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Outlets user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/routes"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <RoutesPage user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendors"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Vendors user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/expense-types"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <ExpenseTypes user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* STORE MANAGEMENT */}
        <Route
          path="/store-management"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <StoreManagement user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* REPORTS */}
        <Route
          path="/stock-report"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <StockReport user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase-report"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <PurchaseReport user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales-report"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <SalesReport user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}
        <Route
          path="/company-settings"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <CompanySettings user={user} />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={redirectByRole(user?.role)} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

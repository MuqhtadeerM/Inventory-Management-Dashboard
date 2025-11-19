// Demo users database
export const DEMO_USERS = [
  {
    username: "Admin",
    password: "admin123",
    name: "Admin User",
    role: "Admin",
    email: "admin@cocacola.com",
    permissions: ["all"],
  },
  {
    username: "Manager",
    password: "manager123",
    name: "Manager User",
    role: "Manager",
    email: "manager@cocacola.com",
    permissions: [
      "dashboard",
      "sales",
      "purchases",
      "payments",
      "reports",
      "products",
      "outlets",
      "vendors",
    ],
  },
  {
    username: "User",
    password: "user123",
    name: "Sales User",
    role: "User",
    email: "user@cocacola.com",
    permissions: ["dashboard", "sales", "payments", "products", "outlets"],
  },
];

/**
 * Authenticate user with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise} User object without password
 */
export const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      const user = DEMO_USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Don't return password in response
        const { password: _, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 500);
  });
};

/**
 * Check if user has specific permission
 * @param {Object} user - User object
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;

  // Admin has all permissions
  if (user.permissions.includes("all")) return true;

  // Check specific permission
  return user.permissions.includes(permission);
};

/**
 * Check if user has any of the given permissions
 * @param {Object} user - User object
 * @param {Array} permissions - Array of permissions
 * @returns {boolean}
 */
export const hasAnyPermission = (user, permissions) => {
  if (!user || !user.permissions) return false;
  if (user.permissions.includes("all")) return true;

  return permissions.some((permission) =>
    user.permissions.includes(permission)
  );
};

/**
 * Get user role display name
 * @param {string} role - Role name
 * @returns {string}
 */
export const getRoleDisplayName = (role) => {
  const roleNames = {
    Admin: "Administrator",
    Manager: "Manager",
    User: "Sales User",
  };
  return roleNames[role] || role;
};

/**
 * Save user to localStorage
 * @param {Object} user - User object
 */
export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem("coca_cola_user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

/**
 * Get user from localStorage
 * @returns {Object|null}
 */
export const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("coca_cola_user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user from localStorage:", error);
    return null;
  }
};

/**
 * Remove user from localStorage
 */
export const removeUserFromStorage = () => {
  try {
    localStorage.removeItem("coca_cola_user");
  } catch (error) {
    console.error("Error removing user from localStorage:", error);
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return getUserFromStorage() !== null;
};

/**
 * Logout user - clear storage and return to login
 */
export const logoutUser = () => {
  removeUserFromStorage();
  // You can add additional cleanup here if needed
  // For example: clear other localStorage items, cancel pending requests, etc.
  return true;
};

/**
 * Get user initials for avatar
 * @param {string} name - User's full name
 * @returns {string}
 */
export const getUserInitials = (name) => {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

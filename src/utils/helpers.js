/**
 * Format number as currency (Indian Rupees)
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency symbol (default: ₹)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = "₹") => {
  if (amount === null || amount === undefined) return `${currency}0`;

  const number = parseFloat(amount);
  if (isNaN(number)) return `${currency}0`;

  return `${currency}${number.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format date string to DD/MM/YYYY format
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Format date string to YYYY-MM-DD format (for input fields)
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Format date to readable format (e.g., "Nov 15, 2025")
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateReadable = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Check if user can access a resource based on role
 * @param {string} userRole - Current user's role
 * @param {string} requiredRole - Required role for access
 * @returns {boolean} Whether user has access
 */
export const canAccess = (userRole, requiredRole) => {
  const roleHierarchy = {
    Admin: 3,
    Manager: 2,
    User: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 50) => {
  if (!text) return "";
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
};

/**
 * Format phone number to Indian format
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return "";

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }

  return phone;
};

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone an object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Sort array of objects by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array
 */
export const sortByKey = (array, key, order = "asc") => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
};

/**
 * Filter array by search term
 * @param {Array} array - Array to filter
 * @param {string} searchTerm - Search term
 * @param {Array} keys - Keys to search in
 * @returns {Array} Filtered array
 */
export const filterBySearch = (array, searchTerm, keys) => {
  if (!searchTerm) return array;

  const term = searchTerm.toLowerCase();

  return array.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(term);
    });
  });
};

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Calculate sum of array values
 * @param {Array} array - Array of numbers or objects
 * @param {string} key - Key to sum (if array of objects)
 * @returns {number} Sum
 */
export const sum = (array, key = null) => {
  if (!array || array.length === 0) return 0;

  if (key) {
    return array.reduce(
      (total, item) => total + (parseFloat(item[key]) || 0),
      0
    );
  }

  return array.reduce((total, item) => total + (parseFloat(item) || 0), 0);
};

/**
 * Calculate average of array values
 * @param {Array} array - Array of numbers or objects
 * @param {string} key - Key to average (if array of objects)
 * @returns {number} Average
 */
export const average = (array, key = null) => {
  if (!array || array.length === 0) return 0;

  const total = sum(array, key);
  return total / array.length;
};

/**
 * Convert file to base64
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Download data as JSON file
 * @param {any} data - Data to download
 * @param {string} filename - Filename
 */
export const downloadJSON = (data, filename = "data.json") => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Download data as CSV file
 * @param {Array} data - Array of objects to convert to CSV
 * @param {string} filename - Filename
 */
export const downloadCSV = (data, filename = "data.csv") => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Escape commas and quotes
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};

/**
 * Get time ago string (e.g., "2 hours ago")
 * @param {string|Date} dateString - Date to compare
 * @returns {string} Time ago string
 */
export const timeAgo = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

/**
 * Check if date is today
 * @param {string|Date} dateString - Date to check
 * @returns {boolean} Whether date is today
 */
export const isToday = (dateString) => {
  if (!dateString) return false;

  const date = new Date(dateString);
  const today = new Date();

  return date.toDateString() === today.toDateString();
};

/**
 * Get date range (start and end dates)
 * @param {string} range - Range type ('today', 'week', 'month', 'year')
 * @returns {Object} Start and end dates
 */
export const getDateRange = (range) => {
  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);

  switch (range) {
    case "today":
      break;
    case "week":
      start.setDate(today.getDate() - 7);
      break;
    case "month":
      start.setMonth(today.getMonth() - 1);
      break;
    case "year":
      start.setFullYear(today.getFullYear() - 1);
      break;
    default:
      break;
  }

  return {
    start: formatDateForInput(start),
    end: formatDateForInput(end),
  };
};

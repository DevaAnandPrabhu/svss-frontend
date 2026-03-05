/**
 * Format a number as Indian Rupee currency
 * @param {number} amount
 * @returns {string}  e.g. "₹1,200"
 */
export function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Format a date string to a readable format
 * @param {string} dateStr  ISO or "YYYY-MM-DD"
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr || dateStr === "N/A") return "N/A";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Capitalise first letter of a string
 * @param {string} str
 * @returns {string}
 */
export function capitalise(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Return the correct CSS class name for a given status badge
 * @param {string} status
 * @returns {string}
 */
export function statusClass(status) {
  return `badge badge-${status}`;
}

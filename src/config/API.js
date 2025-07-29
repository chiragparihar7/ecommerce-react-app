const seller = "/seller";
const user = "/user";
const admin = "/admin";

export const API = {
  // Seller APIs
  SELLER_LOGIN: `${seller}/login`,
  SELLER_SIGNUP: `${seller}/signup`,
  SELLER_ORDERS: `${seller}/orders`,
  SELLER_ADD_PRODUCTS: `${seller}/add-product`,
  SELLER_CATEGORY_LIST: `${seller}/category-list`,
  SELLER_PRODUCTS: `${seller}/products`,
  SELLER_PRODUCTS_DETAILS: `${seller}/products-details`,
  SELLER_ALL_ORDERS: `${seller}/allOrders`, // ✅ Fetch seller orders
  SELLER_UPDATE_ORDER_STATUS: (orderId, itemId) =>
    `${seller}/orders/${orderId}/items/${itemId}`,

  // User APIs
  USER_REGISTER: `${user}/signup`,
  USER_LOGIN: `${user}/login`,
  USER_PROFILE: `${user}/profile`,
  USER_GET_ALL_PRODUCTS: `${user}/products`,
  USER_PRODUCT_SEARCH: `${user}/products/search`,
  USER_PRODUCT_DETAILS: `${user}/products/details`, // + /:id
  USER_GET_CATEGORIES: `${user}/products/categories`,
  USER_CHANGE_PASSWORD: `${user}/profile/password`,

  // Admin APIs
  ADMIN_LOGIN: `${admin}/login`,
  ADMIN_CATEGORY_LIST: `${admin}/category-list`,
  ADMIN_CATEGORY_ADD: `${admin}/add-categories`,
  ADMIN_CATEGORY_REMOVE: `${admin}/categories`,
  ADMIN_SELLER_LIST: "/admin/allSellers",
  ADMIN_SELLER_TOGGLE_STATUS: (sellerId) =>
    `/admin/sellers/${sellerId}/toggle-status`,
  ADMIN_DELETE_SELLER: `${admin}/sellers`,
  ADMIN_ALL_USERS: `${admin}/allUsers`,
  ADMIN_PRODUCT_LIST: `${admin}/product-list`,
  ADMIN_SALES_ANALYTICS: `${admin}/analytics/sales`,
};
export default API;

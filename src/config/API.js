const seller = "/seller";
const user = "/user";
const admin = "/admin";
const cart = "/cart";
const order = "/order";

const BASE = "http://localhost:5000";
// const BASE = "http://192.168.1.105:5000";
export const API = {
  BASE_URL: BASE,
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
  SELLER_IMAGE_UPLOAD: `${seller}/image-upload`,

  // User APIs
  USER_REGISTER: `${user}/signup`,
  USER_LOGIN: `${user}/login`,
  USER_PROFILE: `${user}/profile`,
  USER_GET_ALL_PRODUCTS: `/product`,
  USER_PRODUCT_SEARCH: `${user}/products/search`,
  USER_PRODUCT_DETAILS: `/product/details`,
  USER_GET_CATEGORIES: `${user}/products/categories`,
  USER_PROFILE_UPDATE: `${user}/profile/update`,
  USER_CHANGE_PASSWORD: `${user}/profile/password`,
  USER_CART_CLEAR: `${cart}/clear`,
  USER_CART_VIEW: `${cart}/view`,
  USER_CART_ADD: `${cart}/addIn`,
  USER_CART_UPDATE: (itemId) => `${cart}/updateCart/${itemId}`,
  USER_CART_REMOVE_ITEM: (itemId) => `${cart}/deleteItems/${itemId}`,
  USER_PLACE_ORDER: `${order}/checkout`,
  USER_ORDER_HISTORY: `${order}/orderHistory`,
  USER_ORDER_CANCEL: (orderId) => `${order}/${orderId}/cancel`,

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
  ADMIN_ALL_USERS: `${admin}/allUsers`, // ✅ for user management
  ADMIN_TOGGLE_USER_STATUS: (userId) =>
    `${admin}/users/${userId}/toggle-status`, // ✅ toggle active/block
  ADMIN_PRODUCT_LIST: `${admin}/product-list`,
  ADMIN_SALES_ANALYTICS: `${admin}/analytics/sales`,
};
export default API;

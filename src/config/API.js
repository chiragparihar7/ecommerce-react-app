const seller = "/seller";
const user = "/user";
const admin = "/admin";
const cart = "/cart";
const order = "/order";

const BASE = "http://localhost:5000";

export const API = {
  BASE_URL: BASE,

  // ✅ Seller APIs
  SELLER_LOGIN: `${BASE}${seller}/login`,
  SELLER_SIGNUP: `${BASE}${seller}/signup`,
  SELLER_ORDERS: `${BASE}${seller}/orders`,
  SELLER_ADD_PRODUCTS: `${BASE}${seller}/add-product`,
  SELLER_CATEGORY_LIST: `${BASE}${seller}/category-list`,
  SELLER_PRODUCTS: `${BASE}${seller}/products`,
  SELLER_PRODUCTS_DETAILS: `${BASE}${seller}/products-details`,
  SELLER_ALL_ORDERS: `${BASE}${seller}/allOrders`,
  SELLER_UPDATE_ORDER_STATUS: (orderId, itemId) =>
    `${BASE}${seller}/orders/${orderId}/items/${itemId}`,
  SELLER_IMAGE_UPLOAD: `${BASE}${seller}/image-upload`,
  SELLER_DELETE_ORDER: (orderId) =>
    `${BASE}${seller}/orders/${orderId}`,

  // ✅ User APIs
  USER_REGISTER: `${BASE}${user}/signup`,
  USER_LOGIN: `${BASE}${user}/login`,
  USER_PROFILE: `${BASE}${user}/profile`,
  USER_PROFILE_UPDATE: `${BASE}${user}/profile/update`,
  USER_CHANGE_PASSWORD: `${BASE}${user}/profile/password`,
  USER_GET_CATEGORIES: `${BASE}${user}/products/categories`,
  USER_PRODUCT_SEARCH: `${BASE}${user}/products/search`,

  USER_GET_ALL_PRODUCTS: `${BASE}/product`,
  PRODUCT_DETAILS: `${BASE}/product/details`,

  USER_CART_ADD: `${BASE}${cart}/addIn`,
  USER_CART_VIEW: `${BASE}${cart}/view`,
  USER_CART_CLEAR: `${BASE}${cart}/clear`,
  USER_CART_UPDATE: (itemId) => `${BASE}${cart}/updateCart/${itemId}`,
  USER_CART_REMOVE_ITEM: (itemId) => `${BASE}${cart}/deleteItems/${itemId}`,

  ADD_TO_CART: `${BASE}${cart}/addIn`,
  VIEW_CART: `${BASE}${cart}/view`,
  UPDATE_CART_ITEM: `${BASE}${cart}/updateCart`,
  REMOVE_CART_ITEM: `${BASE}${cart}/deleteItems`,
  CLEAR_CART: `${BASE}${cart}/clear`,

  CREATE_ORDER: `${BASE}${order}/checkout`,
  USER_ORDER_HISTORY: `${BASE}${order}/orderHistory`,
  USER_ORDER_CANCEL: (orderId) => `${BASE}${order}/${orderId}/cancel`,

  // ✅ Admin APIs
  ADMIN_LOGIN: `${BASE}${admin}/login`,
  ADMIN_CATEGORY_LIST: `${BASE}${admin}/category-list`,
  ADMIN_CATEGORY_ADD: `${BASE}${admin}/add-categories`,
  ADMIN_CATEGORY_REMOVE: `${BASE}${admin}/categories`,

  ADMIN_SELLER_LIST: `${BASE}/admin/allSellers`,
  ADMIN_SELLER_TOGGLE_STATUS: (sellerId) =>
    `${BASE}${admin}/sellers/${sellerId}/toggle-status`,
  ADMIN_DELETE_SELLER: `${BASE}${admin}/sellers`,

  ADMIN_ALL_USERS: `${BASE}${admin}/allUsers`,
  ADMIN_TOGGLE_USER_STATUS: (userId) =>
    `${BASE}${admin}/users/${userId}/toggle-status`,

  ADMIN_PRODUCT_LIST: `${BASE}${admin}/product-list`,
  ADMIN_SALES_ANALYTICS: `${BASE}${admin}/analytics/sales`,
};

export default API;

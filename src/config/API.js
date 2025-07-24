const seller = "/seller";
const user = "/user";
const admin = "/admin";

export const API = {
  // Seller APIs
  SELLER_LOGIN: `${seller}/login`,
  SELLER_SIGNUP: `${seller}/signup`,
  SELLER_ORDERS: `${seller}/orders`,
  SELLER_PRODUCTS: `${seller}/add-product`,
  SELLER_CATEGORY_LIST: `${seller}/category-list`,

  // User APIs
  USER_REGISTER: `${user}/signup`,
  USER_LOGIN: `${user}/login`,

  // Admin APIs
  ADMIN_LOGIN: `${admin}/login`,
  ADMIN_CATEGORY_LIST: `${admin}/category-list`,
  ADMIN_CATEGORY_ADD: `${admin}/add-categories`,
  ADMIN_CATEGORY_REMOVE: `${admin}/categories`


};

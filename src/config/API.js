const seller = "/seller";
const user = "/user";
const admin = "/admin";

export const API = {
  // Seller APIs
  SELLER_LOGIN: `${seller}/login`,
  SELLER_SIGNUP: `${seller}/signup`,
  SELLER_ORDERS: `${seller}/orders`,
  SELLER_PRODUCTS: `${seller}/products`,

  // User APIs
  USER_REGISTER: `${user}/signup`,
  USER_LOGIN: `${user}/login`,

  // Admin APIs
  ADMIN_LOGIN: `${admin}/login`,
};

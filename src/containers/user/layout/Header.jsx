import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { persistor } from "../../../redux/store";
import { userLogout } from "../../../redux/slices/userSlice";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = useSelector((state) => state.user.token);
  const service = DataService(userToken);

  const handleLogout = () => {
    dispatch(userLogout());
    toast.success("Logout Successful");
    persistor.purge();
  };

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const handleCloseDropdown = () => setDropdownOpen(false);

  const fetchCartCount = async () => {
    try {
      const res = await service.get(API.USER_CART_VIEW);
      if (res.data.success) {
        const items = res.data.data.items;
        const totalItems = items.reduce(
          (sum, item) => sum + item.requestedQuantity,
          0
        );
        setCartCount(totalItems);
      }
    } catch (err) {
      console.error("❌ Error fetching cart count:", err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (userToken) fetchCartCount();

    // Listen for cart updates after checkout
    const handleCartUpdate = () => {
      if (userToken) fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [userToken]);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/">
        <div className="text-blue-600 text-xl font-bold flex items-center">
          <img
            src="/src/assets/Logo.jpg"
            className="w-12 h-15 mr-2 object-contain"
            alt="Logo"
          />
          QUICKCART
        </div>
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for Products, Brands and More"
        className="w-1/2 p-2 border rounded"
      />

      {/* Right Menu */}
      <div className="space-x-4 flex items-center relative">
        {userToken && (
          <>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="text-sm font-medium flex items-center"
              >
                <img
                  src="/src/assets/profile-icon.png"
                  alt="Profile"
                  className="h-5 w-5 mr-1 object-contain"
                />
                Profile
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
                  <div className="px-4 py-2 text-xs text-gray-500">Welcome User</div>
                  <Link to="/profile" onClick={handleCloseDropdown} className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                  <Link to="/orders" onClick={handleCloseDropdown} className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                  <Link to="/wishlist" onClick={handleCloseDropdown} className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
                  <Link to="/Change-password" onClick={handleCloseDropdown} className="block px-4 py-2 hover:bg-gray-100">Change-password</Link>
                  <Link to="/giftcards" onClick={handleCloseDropdown} className="block px-4 py-2 hover:bg-gray-100">Gift Cards</Link>
                </div>
              )}
            </div>

            {/* Cart Icon with Notification Badge */}
            <button
              onClick={() => navigate("/cart")}
              className="text-sm font-medium flex items-center relative hover:text-blue-600"
            >
              <div className="relative">
                <img
                  src="/src/assets/Cart-icon.png"
                  alt="Cart"
                  className="h-5 w-5 mr-1 object-contain"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </button>
          </>
        )}

        {/* Become a Seller */}
        <button
          onClick={() => navigate("/seller/login")}
          className="text-sm font-medium flex items-center"
        >
          <img
            src="/src/assets/Shop-icon.png"
            alt="Shop"
            className="h-5 w-5 mr-1 object-contain"
          />
          Become a Seller
        </button>

        {/* Login / Logout */}
        {userToken ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative">
      <div className="text-blue-600 text-xl font-bold flex items-center">
        <img
          src="/src/assets/Logo.jpg"
          className="w-12 h-15 mr-2 object-contain"
          alt="Logo"
        />
        QUICKCART
      </div>

      <input
        type="text"
        placeholder="Search for Products, Brands and More"
        className="w-1/2 p-2 border rounded"
      />

      <div className="space-x-4 flex items-center relative">
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
              <div className="px-4 py-2 text-xs text-gray-500">
                Welcome User
              </div>
              <Link
                to="/profile"
                onClick={handleCloseDropdown}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                onClick={handleCloseDropdown}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Orders
              </Link>
              <Link
                to="/wishlist"
                onClick={handleCloseDropdown}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Wishlist
              </Link>
              <Link
                to="/rewards"
                onClick={handleCloseDropdown}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Rewards
              </Link>
              <Link
                to="/giftcards"
                onClick={handleCloseDropdown}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Gift Cards
              </Link>
            </div>
          )}
        </div>

        <button className="text-sm font-medium flex items-center">
          <img
            src="/src/assets/Cart-icon.png"
            alt="Cart"
            className="h-5 w-5 mr-1 object-contain"
          />
          Cart
        </button>

        <button className="text-sm font-medium flex items-center">
          <img
            src="/src/assets/Shop-icon.png"
            alt="Shop"
            className="h-5 w-5 mr-1 object-contain"
          />
          Become a Seller
        </button>
      </div>
    </header>
  );
};

export default Header;

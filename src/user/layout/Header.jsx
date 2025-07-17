import React from 'react';

const Header = () => {
return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-blue-600 text-xl font-bold flex items-center">
            <img src='/src/assets/Logo.jpg' className='w-12 h-15 mr-2 object-contain' alt="Logo" />
            QUICKCART
        </div>
        <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="w-1/2 p-2 border rounded"
        />
        <div className="space-x-4 flex items-center">
            <button className="text-sm font-medium flex items-center">
                <img
                    src="/src/assets/profile-icon.png"
                    alt="Profile"
                    className="h-5 w-5 mr-1 object-contain"
                />
                Login
            </button>
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
                />Become a Seller</button>
        </div>
    </header>
);
};

export default Header;

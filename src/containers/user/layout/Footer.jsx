import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-black text-white py-8 shadow-lg">
      <div className="flex flex-col items-center justify-center space-y-6">
        
        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="#"><FaFacebook className="text-2xl hover:text-blue-600" /></a>
          <a href="#"><FaInstagram className="text-2xl hover:text-pink-500" /></a>
          <a href="#"><FaTwitter className="text-2xl hover:text-sky-400" /></a>
          <a href="#"><FaGithub className="text-2xl hover:text-gray-400" /></a>
          <a href="#"><FaYoutube className="text-2xl hover:text-red-600" /></a>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm">
          <li><a href="#" className="hover:text-blue-400">Home</a></li>
          <li><a href="#" className="hover:text-blue-400">News</a></li>
          <li><a href="#" className="hover:text-blue-400">About</a></li>
          <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
          <li><a href="#" className="hover:text-blue-400">Our Team</a></li>
        </ul>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 text-center">
          Copyright &copy; {new Date().getFullYear()} Designed by <span className="text-white font-semibold">Quickcart</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;

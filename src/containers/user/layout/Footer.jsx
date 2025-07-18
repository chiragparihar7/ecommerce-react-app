// Footer.jsx (React Component, or use in plain HTML as needed)

import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import Footer from '../layout/Footer.jsx';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Brand */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-2xl font-bold">YourSite</h1>
          <p className="text-sm text-gray-400">Building better experiences.</p>
        </div>

        {/* Navigation Links */}
        <div className="mb-4 md:mb-0">
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-400">Services</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#"><FaFacebook className="text-xl hover:text-blue-500" /></a>
          <a href="#"><FaInstagram className="text-xl hover:text-pink-500" /></a>
          <a href="#"><FaTwitter className="text-xl hover:text-sky-400" /></a>
          <a href="#"><FaGithub className="text-xl hover:text-gray-400" /></a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 border-t border-gray-700 py-4">
        &copy; {new Date().getFullYear()} QUICKCART. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

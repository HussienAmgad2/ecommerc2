import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CartContext } from '../context/Cartcontext';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItemsNo } = useContext(CartContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  

  return (
    <nav className="bg-white text-gray-800 w-full fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-6">
          <Link to="/home" className="hover:text-gray-400">
            <img src="/freshcart-logo.svg" alt="Logo" className="h-8" />
          </Link>
        </div>

        {/* Menu Icon */}
        {user && (
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {menuOpen ? (
                <i className="fa-solid fa-x text-2xl"></i>
              ) : (
                <i className="fa-solid fa-bars text-2xl"></i>
              )}
            </button>
          </div>
        )}

        {/* Navigation Links */}
        {user ? (
          <>
            <div className="hidden lg:flex flex-grow justify-center space-x-6">
              <Link to="/home" className="hover:text-gray-400 text-navbarcolor">Home</Link>
              <Link to="/cart" className="hover:text-gray-400 text-navbarcolor">Cart</Link>
              <Link to="/wish-list" className="hover:text-gray-400 text-navbarcolor">Wish list</Link>
              <Link to="/products" className="hover:text-gray-400 text-navbarcolor">Products</Link>
              <Link to="/categories" className="hover:text-gray-400 text-navbarcolor">Categories</Link>
              <Link to="/brands" className="hover:text-gray-400 text-navbarcolor">Brands</Link>
            </div>

            <div className="hidden lg:flex items-center relative">
              <Link to="/cart" className="text-gray-800 hover:text-gray-600 relative flex items-center">
                <i className="fa-solid fa-cart-shopping text-2xl pt-2 pr-2"></i>
                {cartItemsNo > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold leading-tight text-center rounded-full">
                    {cartItemsNo}
                  </span>
                )}
              </Link>
            </div>

            <button onClick={handleSignOut} className="pl-3 bg-white">
              Sign Out
            </button>
          </>
        ) : (
          <div className="flex-grow flex justify-end space-x-4">
            <Link to="/" className="hover:text-gray-400">Sign In</Link>
            <Link to="/signup" className="hover:text-gray-400">Register</Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && user && (
        <div className="flex flex-col mt-2 space-y-2">
          <Link to="/home" className="hover:text-gray-400">Home</Link>
          <Link to="/cart" className="hover:text-gray-400">Cart</Link>
          <Link to="/wish-list" className="hover:text-gray-400">Wish list</Link>
          <Link to="/products" className="hover:text-gray-400">Products</Link>
          <Link to="/categories" className="hover:text-gray-400">Categories</Link>
          <Link to="/brands" className="hover:text-gray-400">Brands</Link>
          <div className="flex items-center mt-2 relative">
            <Link to="/cart" className="text-gray-800 hover:text-gray-600 relative flex items-center">
              <i className="fa-solid fa-cart-shopping"></i>
              {cartItemsNo > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold leading-tight text-center rounded-full">
                  {cartItemsNo}
                </span>
              )}
            </Link>
          </div>
          <button onClick={handleSignOut} className="hover:text-gray-400 bg-white">
            Sign Out
          </button>
        </div>
      )}

      {/* Mobile Menu for Non-Logged-In Users */}
      {menuOpen && !user && (
        <div className="flex flex-col mt-2 space-y-2">
          <Link to="/" className="hover:text-gray-400">Sign In</Link>
          <Link to="/signup" className="hover:text-gray-400">Register</Link>
        </div>
      )}
    </nav>
  );
}

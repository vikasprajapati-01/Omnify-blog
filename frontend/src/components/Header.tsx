import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            BlogApp
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200">
              All Blogs
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/my-blogs" className="hover:text-blue-200">
                  My Blogs
                </Link>
                <Link to="/create" className="hover:text-blue-200">
                  Create Blog
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm">
                  Welcome, {user?.first_name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-200 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <nav className="md:hidden mt-3 pt-3 border-t border-blue-500">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="hover:text-blue-200">
              All Blogs
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/my-blogs" className="hover:text-blue-200">
                  My Blogs
                </Link>
                <Link to="/create" className="hover:text-blue-200">
                  Create Blog
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

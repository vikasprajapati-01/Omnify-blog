import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import type { Blog, PaginatedResponse } from '../types';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchBlogs = async (page: number, search?: string) => {
    try {
      setLoading(true);
      const response: PaginatedResponse<Blog> = await blogAPI.getBlogs(page, search);
      setBlogs(response.results);
      setTotalPages(Math.ceil(response.count / 10)); // Assuming 10 items per page
      setError('');
    } catch (err) {
      setError('Failed to fetch blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Blogs</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search blogs..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {blogs.length === 0 && !loading ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600">No blogs found</h2>
          <p className="text-gray-500 mt-2">
            {searchTerm ? 'Try a different search term.' : 'Be the first to create a blog!'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                  <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                </h2>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {blog.content_preview || blog.content}
              </p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>
                    By {blog.author.first_name} {blog.author.last_name}
                  </span>
                  <span>•</span>
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default BlogList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import type { Blog, PaginatedResponse } from '../types';

const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMyBlogs = async (page: number) => {
    try {
      setLoading(true);
      const response: PaginatedResponse<Blog> = await blogAPI.getMyBlogs(page);
      setBlogs(response.results);
      setTotalPages(Math.ceil(response.count / 10)); // Assuming 10 items per page
      setError('');
    } catch (err) {
      setError('Failed to fetch your blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs(currentPage);
  }, [currentPage]);

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
        <div className="text-lg">Loading your blogs...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
        >
          Create New Blog
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {blogs.length === 0 && !loading ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600 mb-4">You haven't created any blogs yet</h2>
          <p className="text-gray-500 mb-6">Start sharing your thoughts with the world!</p>
          <Link
            to="/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Create Your First Blog
          </Link>
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
                <div className="flex space-x-2">
                  <Link
                    to={`/blog/${blog.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {blog.content_preview || blog.content}
              </p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{formatDate(blog.created_at)}</span>
                  {blog.updated_at !== blog.created_at && (
                    <>
                      <span>•</span>
                      <span>Updated {formatDate(blog.updated_at)}</span>
                    </>
                  )}
                  <span>•</span>
                  <span className={blog.is_published ? 'text-green-600' : 'text-yellow-600'}>
                    {blog.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
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

export default MyBlogs;

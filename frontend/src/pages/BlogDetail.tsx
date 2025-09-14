import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { Blog } from '../types';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        const blogData = await blogAPI.getBlog(parseInt(id));
        setBlog(blogData);
      } catch (err) {
        setError('Blog not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!blog || !window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await blogAPI.deleteBlog(blog.id);
      navigate('/my-blogs');
    } catch (err) {
      setError('Failed to delete blog. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading blog...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Blog not found'}
        </div>
        <Link
          to="/"
          className="inline-block mt-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to all blogs
        </Link>
      </div>
    );
  }

  const isAuthor = user?.id === blog.author.id;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to all blogs
        </Link>
      </nav>

      <article className="bg-white rounded-lg shadow-lg p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-4">
              <span>
                By {blog.author.first_name} {blog.author.last_name}
              </span>
              <span>•</span>
              <span>Published {formatDate(blog.created_at)}</span>
              {blog.updated_at !== blog.created_at && (
                <>
                  <span>•</span>
                  <span>Updated {formatDate(blog.updated_at)}</span>
                </>
              )}
            </div>
          </div>

          {isAuthor && (
            <div className="flex space-x-3 mb-6">
              <Link
                to={`/blog/${blog.id}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit Blog
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete Blog'}
              </button>
            </div>
          )}
        </header>

        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {blog.content}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;

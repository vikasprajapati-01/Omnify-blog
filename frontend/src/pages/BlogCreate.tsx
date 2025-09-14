import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import type { BlogFormData } from '../types';

const BlogCreate: React.FC = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    is_published: true,
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const blog = await blogAPI.createBlog(formData);
      console.log('Created blog response:', blog);
      console.log('Blog ID:', blog.id);
      navigate(`/blog/${blog.id}`);
    } catch (err: any) {
      console.error('Blog creation error:', err);
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_errors: ['Failed to create blog. Please try again.'] });
      }
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (field: string) => {
    return errors[field] ? errors[field][0] : '';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Blog</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.non_field_errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.non_field_errors[0]}
            </div>
          )}
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                getFieldError('title') ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your blog title"
            />
            {getFieldError('title') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('title')}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Blog Content *
            </label>
            <textarea
              id="content"
              name="content"
              rows={15}
              required
              value={formData.content}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                getFieldError('content') ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Write your blog content here..."
            />
            {getFieldError('content') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('content')}</p>
            )}
          </div>
          
          {/* <div className="flex items-center">
            <input
              id="is_published"
              name="is_published"
              type="checkbox"
              checked={formData.is_published}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
              Publish immediately
            </label>
          </div> */}
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCreate;

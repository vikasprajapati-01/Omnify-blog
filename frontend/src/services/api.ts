import axios from 'axios';
import type { AuthResponse, LoginCredentials, RegisterData, Blog, BlogFormData, PaginatedResponse, User } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },
  
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },
  
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile/');
    return response.data;
  },
};

// Blog API
export const blogAPI = {
  getBlogs: async (page: number = 1, search?: string): Promise<PaginatedResponse<Blog>> => {
    const params = new URLSearchParams({ page: page.toString() });
    if (search) params.append('search', search);
    
    const response = await axios.get(`${API_BASE_URL}/blogs/?${params}`);
    return response.data;
  },
  
  getBlog: async (id: number): Promise<Blog> => {
    const response = await axios.get(`${API_BASE_URL}/blogs/${id}/`);
    return response.data;
  },
  
  createBlog: async (data: BlogFormData): Promise<Blog> => {
    const response = await api.post('/blogs/create/', data);
    return response.data;
  },
  
  updateBlog: async (id: number, data: Partial<BlogFormData>): Promise<Blog> => {
    const response = await api.patch(`/blogs/${id}/update/`, data);
    return response.data;
  },
  
  deleteBlog: async (id: number): Promise<void> => {
    await api.delete(`/blogs/${id}/delete/`);
  },
  
  getMyBlogs: async (page: number = 1): Promise<PaginatedResponse<Blog>> => {
    const response = await api.get(`/blogs/my-blogs/?page=${page}`);
    return response.data;
  },
};

export default api;

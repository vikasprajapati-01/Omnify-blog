// Environment configuration helper
export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  
  // App Configuration
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  appName: import.meta.env.VITE_APP_NAME || 'Blog App',
  
  // Helper methods
  isDevelopment: () => import.meta.env.DEV,
  isProduction: () => import.meta.env.PROD,
  
  // API URLs helper
  getApiUrl: (endpoint: string = '') => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
    return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
  },
} as const;

export default config;

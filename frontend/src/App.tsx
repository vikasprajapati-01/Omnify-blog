import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import BlogCreate from './pages/BlogCreate';
import BlogEdit from './pages/BlogEdit';
import MyBlogs from './pages/MyBlogs';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <BlogCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/:id/edit"
                element={
                  <ProtectedRoute>
                    <BlogEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-blogs"
                element={
                  <ProtectedRoute>
                    <MyBlogs />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;




import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from './components/adminComponents/AdminHeader';
import UserTable from './components/adminComponents/UserTable';
import RegisterPage from './components/userComponents/RegisterPage';
import LoginPage from './components/userComponents/LoginPage';
import HomePage from './components/userComponents/HomePage';
import AdminLoginPage from './components/adminComponents/AdminLoginPage';
import AdminBody from './components/adminComponents/AdminBody';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/auth-status', {
          withCredentials: true
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserRole(response.data.role);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const ProtectedUserRoute = () => {
    return isAuthenticated && userRole === 'user' ? <Outlet /> : <Navigate to="/login" replace />;
  };

  const ProtectedAdminRoute = () => {
    return isAuthenticated && userRole === 'admin' ? <Outlet /> : <Navigate to="/admin-login" replace />;
  };

  return (
    <Router>
      <div className='AppContainer'>
        <Routes>
          <Route path='/register' element={<RegisterPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
          <Route path='/login' element={
            isAuthenticated && userRole === 'user' ? <Navigate to="/home" replace /> : 
            <LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
          } />
          <Route path='/admin-login' element={
            isAuthenticated && userRole === 'admin' ? <Navigate to="/admin" replace /> : 
            <AdminLoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
          } />
          <Route element={<ProtectedUserRoute />}>
            <Route path='/home' element={<HomePage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
          </Route>
          <Route element={<ProtectedAdminRoute />}>
            <Route path='/admin' element={
              <>
                <AdminBody setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
                
              </>
            } />
          </Route>
          <Route path='*' element={<Navigate to={isAuthenticated ? (userRole === 'admin' ? '/admin' : '/home') : '/login'} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
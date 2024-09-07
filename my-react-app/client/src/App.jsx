// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { useEffect } from 'react';
// import RegisterPage from './components/userComponents/RegisterPage';
// import LoginPage from './components/userComponents/LoginPage';
// import HomePage from './components/userComponents/HomePage';
// import AdminLoginPage from './components/adminComponents/AdminLoginPage';
// import AdminBody from './components/adminComponents/AdminBody';
// import { Provider, useSelector, useDispatch } from 'react-redux';
// import { store } from './store';
// import { checkAuthStatus } from './slices/authSlice';

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// function AppContent() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, userRole, loading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(checkAuthStatus());
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const ProtectedUserRoute = () => {
//     return isAuthenticated && userRole === 'user' ? <Outlet /> : <Navigate to="/login" replace />;
//   };

//   const ProtectedAdminRoute = () => {
//     return isAuthenticated && userRole === 'admin' ? <Outlet /> : <Navigate to="/admin-login" replace />;
//   };

//   return (
//     <Router>
//       <div className='AppContainer'>
//         <Routes>
//           <Route path='/register' element={<RegisterPage />} />
//           <Route path='/login' element={
//             isAuthenticated && userRole === 'user' ? <Navigate to="/home" replace /> : 
//             <LoginPage />
//           } />
//           <Route path='/admin-login' element={
//             isAuthenticated && userRole === 'admin' ? <Navigate to="/admin" replace /> : 
//             <AdminLoginPage />
//           } />
//           <Route element={<ProtectedUserRoute />}>
//             <Route path='/home' element={<HomePage />} />
//           </Route>
//           <Route element={<ProtectedAdminRoute />}>
//             <Route path='/admin' element={<AdminBody />} />
//           </Route>
//           <Route path='*' element={<Navigate to={isAuthenticated ? (userRole === 'admin' ? '/admin' : '/home') : '/login'} replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterPage from './components/userComponents/RegisterPage';
import LoginPage from './components/userComponents/LoginPage';
import HomePage from './components/userComponents/HomePage';
import AdminLoginPage from './components/adminComponents/AdminLoginPage';
import AdminBody from './components/adminComponents/AdminBody';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchAuthStatus } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <div className='AppContainer'>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={
            isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin' : '/home'} replace /> : <LoginPage />
          } />
          <Route path='/admin-login' element={
            isAuthenticated && userRole === 'admin' ? <Navigate to="/admin" replace /> : <AdminLoginPage />
          } />
          <Route path='/home' element={
            isAuthenticated && userRole === 'user' ? <HomePage /> : <Navigate to="/login" replace />
          } />
          <Route path='/admin' element={
            isAuthenticated && userRole === 'admin' ? <AdminBody /> : <Navigate to="/admin-login" replace />
          } />
          <Route path='*' element={<Navigate to={isAuthenticated ? (userRole === 'admin' ? '/admin' : '/home') : '/login'} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
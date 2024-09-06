// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from './components/adminComponents/Header';
// import UserTable from './components/adminComponents/UserTable';
// import RegisterPage from './components/userComponents/RegisterPage';
// import LoginPage from './components/userComponents/LoginPage';
// import HomePage from './components/userComponents/HomePage';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/user/auth-status', {
//           withCredentials: true // Include cookies in the request
//         });
//         if (response.status === 200) {
//           setIsAuthenticated(true);
//         }
//       } catch (err) {
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuthStatus();
//   }, []);

//   console.log('Is authenticated:', isAuthenticated);

//   if (loading) {
//     return <div>Loading...</div>; // Or a spinner/loading indicator
//   }

//   return (
//     <Router>
//       <div className='AppContainer'>
//         <Routes>
//           <Route path='/register' element={<RegisterPage />} />
//           <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass setIsAuthenticated */}
//           <Route path='/home' element={isAuthenticated ? <HomePage /> : <Navigate to='/login' />} />
//           <Route path='/admin' element={
//             isAuthenticated ? (
//               <>
//                 <Header />
//                 <div className='BodyContainer'>
//                   <UserTable />
//                 </div>
//               </>
//             ) : (
//               <Navigate to='/login' />
//             )
//           } />
//           <Route path='*' element={<div>Page Not Found</div>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import AdminHeader from './components/adminComponents/AdminHeader';
// import UserTable from './components/adminComponents/UserTable';
// import RegisterPage from './components/userComponents/RegisterPage';
// import LoginPage from './components/userComponents/LoginPage';
// import HomePage from './components/userComponents/HomePage';
// import AdminLoginPage from './components/adminComponents/AdminLoginPage';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/user/auth-status', {
//           withCredentials: true
//         });
//         if (response.status === 200) {
//           setIsAuthenticated(true);
//           setUserRole(response.data.role);
//         }
//       } catch (err) {
//         setIsAuthenticated(false);
//         setUserRole(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuthStatus();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const ProtectedUserRoute = () => {
//     return isAuthenticated && userRole==='user' ? <Outlet /> : <Navigate to="/login" replace />;
//   };

//   const ProtectedAdminRoute = () => {
//     return isAuthenticated && userRole==='admin' ? <Outlet /> : <Navigate to="/admin-login" replace />;
//   };

//   return (
//     <Router>
//       <div className='AppContainer'>
//         <Routes>
//           <Route path='/register' element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
//           <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
//           <Route path='/admin-login' element={<AdminLoginPage setIsAuthenticated={setIsAuthenticated} />} />
//           <Route element={<ProtectedUserRoute />}>
//             <Route path='/home' element={<HomePage setIsAuthenticated={setIsAuthenticated} />} />
//           </Route>
//           <Route element={<ProtectedAdminRoute />}>
//           <Route path='/admin' element={
//               <>
//                 <AdminHeader />
//                 <div className='BodyContainer'>
//                   <UserTable />
//                 </div>
//               </>
//             } />
//             </Route>
//           <Route path='*' element={<Navigate to={isAuthenticated ? '/home' : '/login'} replace />} />
//           <Route path='*' element={<Navigate to={isAuthenticated ? '/home' : '/admin-login'} replace />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


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
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



import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/adminComponents/Header';
import UserTable from './components/adminComponents/UserTable';
import RegisterPage from './components/userComponents/RegisterPage';
import LoginPage from './components/userComponents/LoginPage';
import HomePage from './components/userComponents/HomePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/auth-status', {
          withCredentials: true
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const ProtectedRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className='AppContainer'>
        <Routes>
          <Route path='/register' element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<HomePage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='/admin' element={
              <>
                <Header />
                <div className='BodyContainer'>
                  <UserTable />
                </div>
              </>
            } />
          </Route>
          <Route path='*' element={<Navigate to={isAuthenticated ? '/home' : '/login'} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
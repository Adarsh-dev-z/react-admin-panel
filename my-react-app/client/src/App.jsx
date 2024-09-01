import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/adminComponents/Header';
import UserTable from './components/adminComponents/UserTable';
import RegisterPage from './components/userComponents/RegisterPage';
import LoginPage from './components/userComponents/LoginPage';
import HomePage from './components/userComponents/HomePage';

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{

    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
    }
  },[])

  return (
    <Router>
      <div className='AppContainer'>
        <Routes>
          <Route path='/user-register' element={<RegisterPage />} />
          <Route path='/user-login' element={<LoginPage/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/admin' element={
            <>
              <Header />
              <div className='BodyContainer'>
                <UserTable />
              </div>
            </>
          } />
          <Route path='*' element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
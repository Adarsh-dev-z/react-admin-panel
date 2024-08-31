import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import UserTable from './components/UserTable';
import RegisterPage from './components/RegisterPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className='AppContainer'>
        {/* Define Routes */}
        <Routes>
          {/* Route for the registration page */}
          <Route path='/user-register' element={<RegisterPage />} />

          {/* Route for the admin page */}
          <Route path='/admin' element={
            <div>
              <Header />
              <div className='BodyContainer'>
                <UserTable />
              </div>
            </div>
          } />
          
          {/* Redirect or handle other routes */}
          <Route path='*' element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

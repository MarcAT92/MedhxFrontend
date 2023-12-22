import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useauthContext';


// pages and components
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Navbar from './components/navbar';

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
      <div className='pages'>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="login" />}
          />
           <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
           <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
           <Route path="/forgot-password" 
            element={<ForgotPassword />} 
           />
           <Route path="/reset-password/:resetToken" 
            element={<ResetPassword />} 
           />
        
                 
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

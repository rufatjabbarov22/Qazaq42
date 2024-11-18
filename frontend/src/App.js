import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/SignupForm';
import AccountPage from './pages/AccountPage/AccountPage';
import './app.css';
import OrderPage from './pages/DeviceSection/OrderPage';
import OTPForm from './pages/Otp';
import AdminPanel from './pages/Admin/AdminPanel';
// import HeaderAcc from './components/HeaderAcc';
import SignOut from './pages/SignOut';
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation();

  const isAccountPage = location.pathname === '/account';
  return (
    <div className="app-wrapper">
      <Header/>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OTPForm />} />
          
          <Route path="/account" 
          
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
   
          } 
          />
          

          <Route path="/order" element={<OrderPage />} />
          <Route path="/admin" element={<AdminPanel/>} />
        </Routes>
      </div>
      {!isAccountPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

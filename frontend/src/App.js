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

function AppContent() {
  const location = useLocation();

  // Check if the current path is '/account' to hide the footer on this page
  const isAccountPage = location.pathname === '/account';

  return (
    <div className="app-wrapper">
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
      {/* Conditionally render the footer only if it's not the AccountPage */}
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

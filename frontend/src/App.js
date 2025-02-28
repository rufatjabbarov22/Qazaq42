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
import ProtectAdmin from './components/ProtectAdmin'
import TelemetryPopup from './pages/AccountPage/Telemetry';
import AiReportPage from './pages/AccountPage/AIReport';
import FieldSection from './pages/FieldSection';
import AdminLogin from './pages/Admin/AdminLogin';

function AppContent() {
  const location = useLocation();

  const isAccountPage = location.pathname === '/account';
  const isAdminPage = location.pathname === '/admin';
  return (
    <div className="app-wrapper">
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact"
            element={
              <ProtectedRoute>
                <ContactUsPage />
              </ProtectedRoute>

            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OTPForm />} />
          <Route path='/telemetry' element={<TelemetryPopup />} />
          <Route path='/ai-report' element={<AiReportPage />} />
          <Route path='/field' element={<FieldSection />} />
          <Route path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>

            }
          />


          <Route path="/order" element={<OrderPage />} />
          <Route path="/login-admin" element={<AdminLogin />} />
          <Route path='/admin'
            element={
              <ProtectAdmin>
                <AdminPanel />
              </ProtectAdmin>

            }
          />
        </Routes>
      </div>
      {!isAccountPage && !isAdminPage && <Footer />}
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

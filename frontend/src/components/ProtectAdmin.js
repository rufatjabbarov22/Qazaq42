import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectAdmin = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login-admin" replace />;
  }

  return children;
};

export default ProtectAdmin;
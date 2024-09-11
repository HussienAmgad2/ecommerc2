import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserToken } from '../context/UserTokenContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useUserToken(); 

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

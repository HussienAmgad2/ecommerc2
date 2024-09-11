import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VerificationAndResetPassword.css';

const VerificationAndResetPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = ("http://localhost:5173/home") // Redirect to home if token is present
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const verifyResponse = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetCode: code }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Invalid reset code');
      }

      toast.success('Code verified!');

      const resetResponse = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!resetResponse.ok) {
        const errorData = await resetResponse.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      toast.success('Password has been reset successfully!');
      window.location.href = ("http://localhost:5173/login")  // Redirect to login page

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="verification-container">
      <div className="form-container">
        <h1 className="title">Reset Your Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="input-field" 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="code">Verification Code</label>
            <input 
              type="text" 
              id="code" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              className="input-field" 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input 
              type="password" 
              id="newPassword" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="input-field" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="submit-button"
          >
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerificationAndResetPassword;

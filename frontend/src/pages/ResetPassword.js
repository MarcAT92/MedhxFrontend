import React, { useState } from 'react';
import { useResetPassword } from '../hooks/useresetPassword';
import { useParams } from 'react-router-dom';
//
import PasswordResetSuccess from './PasswordResetSuccess';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, error, message, isLoading, isSuccess, resetSuccess } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await resetPassword(resetToken, newPassword, confirmPassword);
  };

  return (
    //
    <div className="reset-password-container">
      {isSuccess ? (
        <PasswordResetSuccess resetSuccess={resetSuccess} />
      ) : (

    <form className="reset-password" onSubmit={handleSubmit}>
      <h3>Reset Password</h3>

      <label>New Password:</label>
      <input
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
      />
      <label>Confirm Password:</label>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />

      <button disabled={isLoading}>Reset Password</button>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </form>
    //
      )}
      </div>
  );
};

export default ResetPassword;

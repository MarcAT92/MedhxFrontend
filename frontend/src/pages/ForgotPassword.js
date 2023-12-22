import React, { useState } from 'react';
import { useForgotPassword } from '../hooks/useforgotPassword';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword, isLoading, error, isSuccess } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div>
      {!isSuccess && (
        <form className="forgot-password" onSubmit={handleSubmit}>
          <h3>Forgot Password</h3>

          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <button disabled={isLoading}>Send Reset Email</button>

          {error && <div className="error">{error}</div>}
        </form>
      )}

      {isSuccess && (
        <div className="success-message">
          <p>Email sent to {email}.</p>
          <p>Click on link send to reset password</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;

import React from 'react';
import { Link } from 'react-router-dom';

const PasswordResetSuccess = () => {
  return (
    <div className="password-reset-success">
      <h3>Password Reset Successful</h3>
      <p>Your password has been successfully reset.</p>
      <p>
        Click <Link to="/login">here</Link> to go to the login page.
      </p>
    </div>
  );
};

export default PasswordResetSuccess;

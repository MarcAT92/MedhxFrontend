import { useState } from 'react';
//
import usePasswordResetSuccess from './usePasswordResetSuccess';

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  //
  const { isSuccess, setSuccess, resetSuccess } = usePasswordResetSuccess();


  const resetPassword = async (resetToken, newPassword, confirmPassword) => {
    setIsLoading(true);
    setError(null);

      const response = await fetch('http://localhost:4000/api/reset-password/' + resetToken, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setMessage(json.message);
        setIsLoading(false);
        setSuccess();
      }
  };
//
  return { resetPassword, isLoading, error, message, isSuccess, resetSuccess };
};

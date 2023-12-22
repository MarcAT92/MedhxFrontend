import { useState } from 'react';

const usePasswordResetSuccess = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const setSuccess = () => {
    setIsSuccess(true);
  };

  const resetSuccess = () => {
    setIsSuccess(false);
  };

  return { isSuccess, setSuccess, resetSuccess };
};

export default usePasswordResetSuccess;

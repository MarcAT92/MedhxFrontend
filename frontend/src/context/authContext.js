import { createContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  // Decode the token using jwt-decode
  const decodedToken = jwtDecode(token);

  // Check if the token expiration time is in the past
  return decodedToken.exp * 1000 < Date.now();
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && !isTokenExpired(storedUser.token)) {
      // If the user is stored and the token is not expired, log in the user
      dispatch({ type: 'LOGIN', payload: storedUser });
    } else {
      // If the token is expired or no user is found, log out the user
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('user');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { InfoContextProvider } from './context/infoContext'
import { AuthContextProvider } from './context/authContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <InfoContextProvider>
        <App />
      </InfoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);



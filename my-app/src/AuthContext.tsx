import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    jwt: null,
    onLogin: (jwt: string) => {},
    onLogout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [jwt, setJwt] = useState(null);
  
    const handleLogin = (jwt: string) => {
      setIsLoggedIn(true);
      setJwt(jwt);
  
      const decodedJwt = jwtDecode(jwt);
    const expirationTime = (decodedJwt.exp as number) * 1000; // Convert to milliseconds
      const timeoutDuration = expirationTime - new Date().getTime(); // Get the duration from now until the expiration time
  
      setTimeout(() => {
        handleLogout();
      }, timeoutDuration);
  
      // You might also want to store the JWT in local storage here
    };
  
    const handleLogout = () => {
      setIsLoggedIn(false);
      setJwt(null);
      // And remove the JWT from local storage here
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, jwt, onLogin: handleLogin, onLogout: handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
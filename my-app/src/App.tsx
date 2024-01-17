import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './App.css';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onLogin}>Log in</button>
    </div>
  );
};

function CV() {
  return <h2 className="text-2xl font-bold">CV</h2>;
}

function Profile() {
  return <h2 className="text-2xl font-bold">Profile</h2>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, onLogin: handleLogin, onLogout: handleLogout }}>
      <Router>
        <div className="App">
          {isLoggedIn && (
            <nav className="p-4 bg-blue-500 text-white">
              <ul className="flex space-x-4">
                <li><Link to="/cv">CV</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </nav>
          )}
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />} />
            <Route path="/cv" element={isLoggedIn ? <CV /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
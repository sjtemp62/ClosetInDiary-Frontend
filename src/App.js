import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/signup/SignIn';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import ArticleList from './ArticleList';
import { DiarySpecityThe } from './screens/DiarySpecityThe/DiarySpecityThe';
import DiariesPage from './DiariesPage';
import DiaryCreatePage from './DiaryCreatePage';
import DiaryDetailPage from './DiaryDetailPage';
import Logout from './Logout';
import FriendsPage from './FriendsPage';
import MessagePage from './MessagePage';
import SendMessage from './SendMessage';
import { Closet } from "./screens/Closet";

// Create a context for authentication
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const value = {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          
          {/* 보호된 라우트 */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/article"
            element={isLoggedIn ? <ArticleList /> : <Navigate to="/login" />}
          />
          <Route
            path="/closet"
            element={isLoggedIn ? <Closet /> : <Navigate to="/login" />}
          />
          <Route
            path="/diaries"
            element={isLoggedIn ? <DiarySpecityThe /> : <Navigate to="/login" />}
          />
          <Route
            path="/diaries/create"
            element={isLoggedIn ? <DiaryCreatePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/diaries/:id"
            element={isLoggedIn ? <DiaryDetailPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/friends"
            element={isLoggedIn ? <FriendsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/messages"
            element={isLoggedIn ? <MessagePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/send-message/:friendId"
            element={isLoggedIn ? <SendMessage /> : <Navigate to="/login" />}
          />
          
          {/* 기본 경로 */}
          <Route path="/" element={isLoggedIn ? <Closet /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

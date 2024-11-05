// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import ArticleList from './ArticleList';
import Outfit from './Outfit';
import DiariesPage from './DiariesPage';
import DiaryCreatePage from './DiaryCreatePage';
import DiaryDetailPage from './DiaryDetailPage';
import Logout from './Logout';
import FriendsPage from './FriendsPage';
import MessagePage from './MessagePage';
import SendMessage from './SendMessage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">홈</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link">대시보드</Link>
            <Link to="/article" className="nav-link">기사 목록</Link>
            <Link to="/outfit" className="nav-link">착장</Link>
            <Link to="/diaries" className="nav-link">다이어리</Link>
            <Link to="/friends" className="nav-link">친구</Link>
            <Link to="/messages" className="nav-link">쪽지</Link>
            <Link to="/logout" className="nav-link logout-button">로그아웃</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link small-link">로그인</Link>
            <Link to="/signup" className="nav-link small-link">회원가입</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/article" element={<ArticleList />} />
        <Route path="/outfit" element={<Outfit />} />
        <Route path="/diaries" element={<DiariesPage />} />
        <Route path="/diaries/create" element={<DiaryCreatePage />} />
        <Route path="/diaries/:id" element={<DiaryDetailPage />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> {/* onLogout 콜백 전달 */}
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/messages" element={<MessagePage/>} />
        <Route path="/send-message/:friendId" element={<SendMessage />} />
      </Routes>
    </Router>
  );
}

export default App;

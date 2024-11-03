import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import ArticleList from './ArticleList';
import Outfit from './Outfit';
import DiariesPage from './DiariesPage';
import CreateDiaryPage from './CreateDiaryPage';
import DiaryDetailPage from './DiaryDetailPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    // Move navigate logic to a child component or use Navigate component
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
            <button onClick={handleLogout} className="nav-link logout-button">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link small-link">로그인</Link>
            <Link to="/signup" className="nav-link small-link">회원가입</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/article" element={<ArticleList />} />
        <Route path="/outfit" element={<Outfit />} />
        <Route path="/diaries" element={<DiariesPage />} />
        <Route path="/diaries/create" element={<CreateDiaryPage />} />
        <Route path="/diaries/:id" element={<DiaryDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
/* App.js */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
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
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/signup">회원가입</Link></li>
          <li><Link to="/">홈</Link></li>
          <li><Link to="/dashboard">대시보드</Link></li>
          <li><Link to="/article">기사 목록</Link></li>
          <li><Link to="/outfit">착장</Link></li>
          <li><Link to="/diaries">다이어리</Link></li>
        </ul>
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
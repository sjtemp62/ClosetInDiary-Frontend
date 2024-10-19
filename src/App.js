/* App.js */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
// import Article from './Article';
import ArticleList from './ArticleList';
import Outfit from './Outfit';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/article">Article-List</Link></li>
          <li><Link to="/outfit">Outfit</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/article" element={<ArticleList />}/>
        <Route path="/outfit" element={<Outfit />}/>
      </Routes>
    </Router>
  );
}

export default App;

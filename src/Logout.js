// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
    const navigate = useNavigate();

  useEffect(() => {
    // 로그아웃 시 accessToken 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    onLogout(); // isLoggedIn 상태 업데이트
    // 로그인 페이지로 이동
    navigate('/login');
  }, [navigate, onLogout]);

  return <p>Logging out...</p>;
}

export default Logout;
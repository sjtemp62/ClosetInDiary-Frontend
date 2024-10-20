// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient'; // 설정된 apiClient를 가져옵니다.
import './App.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 데이터 가져오기 요청
    const isAuthenticated = localStorage.getItem('accessToken');

    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await apiClient.get('/user-data'); // apiClient를 사용해 요청
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login', { replace: true }); // 오류 발생 시 로그인 페이지로 이동 시 경고 메시지 전달
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
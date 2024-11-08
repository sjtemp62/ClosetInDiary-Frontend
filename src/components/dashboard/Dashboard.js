import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../hooks/apiClient';
import './Dashboard.css'; // 추가된 CSS 파일 import

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
        const response = await apiClient.get('/user-data');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login', { replace: true });
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome to Your Dashboard</h2>
        {userData ? (
          <div className="user-data">
            <h3>User Information</h3>
            <div className="user-info">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              {/* 필요한 다른 정보 추가 */}
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password
      });

      // 로그인 성공 시 액세스 토큰 및 리프레시 토큰 저장
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('Login successful: ');
      onLogin(); // 로그인 상태 업데이트
      navigate('/'); // 로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="gradient-custom-login d-flex vh-100">
      <div className="container-fluid row justify-content-center align-content-center">
        <div className="card bg-dark card-custom">
          <div className="card-body card-body-custom">
            <h2 className="text-white">LOGIN</h2>
            <p className="text-white-50 mt-2 mb-5">서비스를 사용하려면 로그인을 해주세요!</p>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label text-white">Email address</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate('/signup')}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

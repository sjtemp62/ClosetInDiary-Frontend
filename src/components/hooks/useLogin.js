import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });

      // 로그인 성공 시 액세스 토큰 및 리프레시 토큰 저장
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('Login successful');
      onLogin(); // 로그인 상태 업데이트
      navigate('/'); // 로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
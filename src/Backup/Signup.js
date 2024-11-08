import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Signup() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/signup`, {
        username, // 추가된 필드
        name,     // 추가된 필드
        email,
        password
      });
      console.log('Signup successful:', response.data);
      navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="gradient-custom-signup d-flex vh-100">
      <div className="container-fluid row justify-content-center align-content-center">
        <div className="card bg-dark card-custom">
          <div className="card-body card-body-custom">
            <h2 className="text-white">SIGN UP</h2>
            <p className="text-white-50 mt-2 mb-5">서비스 사용을 위한 회원 가입</p>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label text-white">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

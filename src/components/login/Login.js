import React from 'react';
import { Button } from '../component/Button';
import CheckBoxWrapper from '../component/CheckBoxWrapper';
import { Header } from '../component/Header';
import Title from '../component/Title';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin'; // 커스텀 훅 import
import './Login.css';
import '../fonts/poppins.css';
import '../fonts/pretendard.css';

const Login = ({ onLogin }) => {
  // useLogin 훅을 사용하여 로그인 관련 상태 및 핸들러를 받아옴
  const { email, setEmail, password, setPassword, handleLogin } = useLogin(onLogin);

  return (
    <div className="login">
      <div className="div-2">
        <Header className="header-instance" />
        <div className="log-in">
          <div className="log-in-boxes">
            <Title
              className="title-instance"
              text="Log in"
              titleClassName="title-instance"
            />
            <div className="log-in-inputs-check">
              <div className="log-in-inputs">
                <div className="text-field-wrapper">
                  <div className="text-field">
                  <label className="label-2" htmlFor="input-3">
                      Email address
                    </label>
                    <input
                      className="text-field-2"
                      id="input-3"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="text-field-wrapper">
                  <div className="text-field">
                    <label className="label-2" htmlFor="input-3">
                      Password
                    </label>
                    <input
                      type="password"
                      className="text-field-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="remember-me">
                <CheckBoxWrapper className="design-component-instance-node" />
              </div>
            </div>
          </div>

          <div className="button-under">
            <form onSubmit={handleLogin} className="form-btn">
              <Button
                className="button-instance"
                state="available"
                text="Log in"
                type="submit"
              />
            </form>
            <div className="text">
              <div className="text-wrapper-2">Forget your password</div>
              <p className="don-t-have-an">
                <span className="span">Don’t have an account?&nbsp;</span>
                <Link to="/signup" className="text-wrapper-4">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

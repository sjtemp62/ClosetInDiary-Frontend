import PropTypes from "prop-types";
import React from "react";
import { MenuComponents } from "../MenuComponents";
import { useAuth } from "../../App"; // useAuth 훅을 가져옵니다.
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 가져옵니다.
import "./style.css";

export const Header = ({ className }) => {
  const { isLoggedIn, handleLogout } = useAuth(); // 현재 로그인 상태와 로그아웃 함수를 가져옵니다.
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  const handleSignOutClick = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      handleLogout(); // 사용자가 확인을 누르면 로그아웃 실행
    }
  };

  const handleProfileClick = () => {
    navigate('/dashboard'); // Profile 클릭 시 /dashboard로 이동
  };

  return (
    <div className={`header ${className}`}>
      <div className="frame">
        <img className="vector" alt="Vector" src="/img/vector-2.svg" />

        <div className="div">
          <MenuComponents
            className="menu-components-instance"
            shape="/img/shape-5.svg"
            text="CLOSET"
          />
          <MenuComponents
            className="menu-components-instance"
            shape="/img/shape-5.svg"
            text="DIARY"
          />
          <MenuComponents
            className="menu-components-instance"
            shape="/img/shape-5.svg"
            text="FRIENDS"
          />
        </div>
      </div>

      <div className="frame-2">
        <div className="frame-3">
          <div className="div-2">About Us</div>

          <div className="div-2" onClick={isLoggedIn ? handleProfileClick : null}>
            {isLoggedIn ? (
              <span>Profile</span>
            ) : (
              <span>Log in</span>
            )}
          </div>

          <div
            className="div-2"
            onClick={isLoggedIn ? handleSignOutClick : null} // 로그아웃 확인 핸들러 추가
          >
            {isLoggedIn ? (
              <span>Sign out</span>
            ) : (
              <span>Sign in</span>
            )}
          </div>
        </div>

        <div className="frame-4">
          <div className="search">
            <img className="img" alt="Search" src="/img/search-1.svg" />
          </div>

          <img
            className="notifications"
            alt="Notifications"
            src="/img/notifications-1.png"
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

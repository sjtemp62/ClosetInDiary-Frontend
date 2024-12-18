import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const MenuComponents = ({
  className,
  shape = "/img/shape-6.svg",
  text = "CLOSET",
  onClick, // 클릭 이벤트 핸들러를 추가합니다.
}) => {
  return (
    <div className={`menu-components ${className}`} onClick={onClick}> {/* onClick 핸들러 추가 */}
      <div className="CLOSET">{text}</div>
      <img className="shape" alt="Shape" src={shape} />
    </div>
  );
};

MenuComponents.propTypes = {
  shape: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func, // onClick 핸들러의 PropType을 정의합니다.
};

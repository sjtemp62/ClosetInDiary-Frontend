import PropTypes from "prop-types";
import React from "react";
import "./Button.css";

export const Button = ({ state, className, text = "Button", type = "button" }) => {
  return (
    <button type={type} className={`button ${state} ${className}`}>
      <div className="text-wrapper">{text}</div>
    </button>
  );
};

Button.propTypes = {
  state: PropTypes.oneOf(["available", "default"]),
  text: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]), // 추가된 부분
};
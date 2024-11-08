import PropTypes from "prop-types";
import React from "react";
import "./Title.css";

const Title = ({ className, titleClassName, text = "Sign in" }) => {
  return (
    <div className={`title ${className}`}>
      <div className={`text-wrapper ${titleClassName}`}>{text}</div>
    </div>
  );
};

Title.propTypes = {
  text: PropTypes.string,
};

export default Title;
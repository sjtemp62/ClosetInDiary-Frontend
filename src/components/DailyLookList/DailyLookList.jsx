/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const DailyLookList = ({
  className,
  text = "2024-11-10",
  frameClassName,
  text1 = "첫 일기. 꼬박꼬박 잘 써야지 !",
  divClassName,
}) => {
  return (
    <div className={`daily-look-list ${className}`}>
      <div className="dailylook-box" />

      <div className="ellipse" />

      <div className={`frame ${frameClassName}`}>
        <div className="element">{text}</div>

        <p className={`text-wrapper ${divClassName}`}>{text1}</p>
      </div>
    </div>
  );
};

DailyLookList.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
};

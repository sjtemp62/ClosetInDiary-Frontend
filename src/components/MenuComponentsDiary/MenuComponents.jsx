/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const MenuComponents = ({
  className,
  shape = "/img/shape-6.svg",
  text = "CLOSET",
}) => {
  return (
    <div className={`menu-components ${className}`}>
      <div className="CLOSET">{text}</div>

      <img className="shape" alt="Shape" src={shape} />
    </div>
  );
};

MenuComponents.propTypes = {
  shape: PropTypes.string,
  text: PropTypes.string,
};

/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Thumb = ({
  horizontal,
  OS,
  hidden,
  className,
  vSpacerClassName,
  text = ".. ....................",
}) => {
  return (
    <div
      className={`thumb horizontal-${horizontal} hidden-${hidden} ${OS} ${className}`}
    >
      <div className={`v-spacer ${vSpacerClassName}`}>
        {!horizontal && <>{""}</>}

        {horizontal && <>{text}</>}
      </div>
    </div>
  );
};

Thumb.propTypes = {
  horizontal: PropTypes.bool,
  OS: PropTypes.oneOf(["mac", "windows"]),
  hidden: PropTypes.bool,
  text: PropTypes.string,
};

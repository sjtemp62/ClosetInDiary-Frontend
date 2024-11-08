import React from "react";
import PropertyCheckBoxWrapper from "./PropertyCheckBoxWrapper";
import "./CheckBoxWrapper.css";
import '../fonts/poppins.css'
import '../fonts/pretendard.css'

const Box = () => {
  return (
    <div className="box">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <PropertyCheckBoxWrapper
            className="property-check-box"
            property1="check-box-1-line"
          />
        </div>
      </div>
    </div>
  );
};

export default Box;
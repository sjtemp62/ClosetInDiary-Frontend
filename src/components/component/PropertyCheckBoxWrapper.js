import PropTypes from "prop-types";
import React, { useState } from "react";
import "./PropertyCheckBoxWrapper.css";
import '../fonts/poppins.css'
import '../fonts/pretendard.css'
import uncheckedIcon from "../img/check-box.svg"; // 업로드하신 이미지 경로를 사용합니다.
import checkedIcon from "../img/checked-box.svg"; // 체크된 상태의 아이콘을 준비합니다. (필요시 새로 준비)

const PropertyCheckBoxWrapper = ({ property1 }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="property-check-box-wrapper" onClick={handleCheckboxClick}>
      <img
        src={isChecked ? checkedIcon : uncheckedIcon}
        alt={isChecked ? "Checked" : "Unchecked"}
        className="check-box"
      />
      <div className={`i-want-to-receive ${property1}`}>
        {property1 === "check-box-1-line" && <>Remember me</>}
      </div>
    </div>
  );
};

PropertyCheckBoxWrapper.propTypes = {
  property1: PropTypes.oneOf(["check-box-1-line", "check-box-2-lines"]),
};

export default PropertyCheckBoxWrapper;

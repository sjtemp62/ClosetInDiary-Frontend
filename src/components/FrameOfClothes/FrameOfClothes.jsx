import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export const FrameOfClothes = ({ className, imageUrl }) => {
  return (
    <div className={`frame-of-clothes ${className}`}>
      {imageUrl ? (
        <img src={imageUrl} alt="Clothing item" className="clothing-image" />
      ) : (
        <p>이미지가 없습니다.</p> // 이미지가 없을 때 표시할 기본 메시지
      )}
    </div>
  );
};

// PropTypes를 사용하여 전달되는 prop의 타입을 정의합니다.
FrameOfClothes.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string, // imageUrl은 문자열이어야 함
};

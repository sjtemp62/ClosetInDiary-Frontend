import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const ClosetCategory = ({ selected, className, text = "Add New", onClick }) => {
  return (
    <div className={`closet-category ${className}`} onClick={onClick}>
      <div className={`rectangle ${selected}`} />
      <div className="add-new">{text}</div>
    </div>
  );
};

ClosetCategory.propTypes = {
  selected: PropTypes.oneOf(["when-selected", "not-selected"]),
  text: PropTypes.string,
  onClick: PropTypes.func,
};
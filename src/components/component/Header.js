import React from "react";
import "./Header.css";

export const Header = ({ className }) => {
  return (
    <div className={`header ${className}`}>
      <div className="logo" />
    </div>
  );
};
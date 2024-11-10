import React from "react";
import "./Header.css";

export const Header = ({ className }) => {
  return (
    <div className={`LSheader ${className}`}>
      <div className="logo" />
    </div>
  );
};
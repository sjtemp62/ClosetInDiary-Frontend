/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { DirectionDownVariantPixelised } from "../icons/DirectionDownVariantPixelised";
import { DirectionLeftVariantPixelised } from "../icons/DirectionLeftVariantPixelised";
import { DirectionRightVariantPixelised } from "../icons/DirectionRightVariantPixelised";
import { DirectionUpVariantPixelised } from "../icons/DirectionUpVariantPixelised";
import { Thumb } from "../Thumb";
import "./style.css";

export const Scrollbar = ({
  OS,
  horizontal,
  position,
  className,
  directionDownVariantPixelisedStyleOverrideClassName,
  directionDownVariantPixelisedStyleOverrideClassNameOverride,
}) => {
  return (
    <div
      className={`scrollbar OS-0-${OS} horizontal-1-${horizontal} ${className}`}
    >
      {OS === "windows" && horizontal && position === "free" && (
        <div className="div">
          <Thumb
            OS="windows"
            className="thumb-instance"
            hidden
            horizontal
            text="........"
          />
          <Thumb
            OS="windows"
            className="thumb-instance"
            hidden={false}
            horizontal
            text=".. ...................."
          />
        </div>
      )}

      {OS === "windows" && horizontal && (
        <>
          <DirectionLeftVariantPixelised className="arrow" />
          <DirectionRightVariantPixelised className="direction-right-variant-pixelised" />
        </>
      )}

      {position === "free" &&
        (!horizontal || OS === "mac") &&
        ["mac", "windows"].includes(OS) && (
          <div className="frame-2">
            <Thumb
              OS={OS === "windows" ? "windows" : "mac"}
              className="thumb-instance"
              hidden
              horizontal={!horizontal ? false : true}
              text={horizontal ? "........" : undefined}
              vSpacerClassName={`${!horizontal && "class"}`}
            />
            <Thumb
              OS={OS === "windows" ? "windows" : "mac"}
              className="thumb-instance"
              hidden={false}
              horizontal={!horizontal ? false : true}
              text={horizontal ? ".. ...................." : undefined}
              vSpacerClassName={`${!horizontal && "class"}`}
            />
          </div>
        )}

      {OS === "windows" && !horizontal && (
        <>
          <DirectionUpVariantPixelised className="direction-up-variant-pixelised" />
          <DirectionDownVariantPixelised
            className={
              position === "free"
                ? directionDownVariantPixelisedStyleOverrideClassNameOverride
                : directionDownVariantPixelisedStyleOverrideClassName
            }
          />
        </>
      )}

      {((OS === "windows" && !horizontal && position === "end") ||
        (OS === "windows" && !horizontal && position === "middle") ||
        (OS === "windows" && !horizontal && position === "start")) && (
        <Thumb
          OS="windows"
          className={`${position === "middle" ? "class-2" : (position === "end") ? "class-3" : "class-4"}`}
          hidden={false}
          horizontal={false}
        />
      )}

      {((OS === "mac" && !horizontal && position === "end") ||
        (OS === "mac" && position === "middle") ||
        (OS === "mac" && position === "start") ||
        (OS === "windows" && horizontal && position === "middle") ||
        (OS === "windows" && horizontal && position === "start") ||
        (horizontal && position === "end")) && (
        <Thumb
          OS={OS === "windows" ? "windows" : "mac"}
          className={`${!horizontal && position === "start" ? "class-5" : (OS === "mac" && position === "middle" && horizontal) ? "class-6" : position === "end" && OS === "mac" && horizontal ? "class-7" : !horizontal && position === "middle" ? "class-8" : !horizontal && position === "end" ? "class-9" : OS === "windows" && position === "start" ? "class-10" : OS === "windows" && position === "middle" ? "class-11" : OS === "windows" && position === "end" ? "class-12" : "class-13"}`}
          hidden={false}
          horizontal={horizontal ? true : undefined}
          text={
            horizontal && ["end", "middle"].includes(position)
              ? ".. ...................."
              : undefined
          }
        />
      )}
    </div>
  );
};

Scrollbar.propTypes = {
  OS: PropTypes.oneOf(["mac", "windows"]),
  horizontal: PropTypes.bool,
  position: PropTypes.oneOf(["middle", "end", "start", "free"]),
};

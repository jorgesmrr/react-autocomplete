import React from "react";
import IconProps from "./IconProps";

// SVG source: https://heroicons.com/

const IconExclamationCircle: React.FC<IconProps> = ({
  width = "1em",
  height = "1em",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default IconExclamationCircle;

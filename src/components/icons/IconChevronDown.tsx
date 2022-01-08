import React from "react";
import IconProps from "./IconProps";

// SVG source: https://heroicons.com/

const IconChevronDown: React.FC<IconProps> = ({
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
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default IconChevronDown;

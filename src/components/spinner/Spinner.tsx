import React from "react";
import styles from "./Spinner.module.css";

// This is a simplified component from one of my side-projects
// source: https://github.com/jorgesmrr/headless-react/blob/master/src/components/progress/spinner/Spinner.tsx

export interface SpinnerProps {
  width?: string;
  height?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ width = "1em", height = "1em" }) => {
  return (
    <div style={{ width, height }}>
      <div className={styles.spin} />
    </div>
  );
};

export default Spinner;

import * as React from "react";
const Email = (props) => (
  <svg
    width={"24px"}
    height={"24px"}
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="clr-i-solid--badged clr-i-solid-path-1--badged"
      d="M26 12.34A7.49 7.49 0 0 1 22.5 6H3.92a2 2 0 0 0-.53.08l14.45 14.39Z"
    />
    <path
      className="clr-i-solid--badged clr-i-solid-path-2--badged"
      d="M30 13.5a7.5 7.5 0 0 1-2-.29l-8.71 8.68a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V12.39A7.45 7.45 0 0 1 30 13.5M5.3 28H3.91v-1.43l7.27-7.21 1.41 1.41Zm26.61 0h-1.4l-7.29-7.23 1.41-1.41 7.27 7.21Z"
    />
    <circle
      className="clr-i-solid--badged clr-i-solid-path-3--badged clr-i-badge"
      cx={30}
      cy={6}
      r={5}
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
);
export default Email;
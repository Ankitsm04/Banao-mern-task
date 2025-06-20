import { useState } from "react";

export default function Tooltip({ text, children, position = "top" }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block group"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-74 px-5 py-2 text-sm text-white bg-black rounded shadow transition-opacity duration-200
          ${position === "top" ? "bottom-full mb-2 left-1/2 -translate-x-1/2" : ""}
          ${position === "bottom" ? "top-full mt-2 left-1/2 -translate-x-1/2" : ""}
          ${position === "left" ? "right-full mr-2 top-1/2 -translate-y-1/2" : ""}
          ${position === "right" ? "left-full ml-2 top-1/2 -translate-y-1/2" : ""}
          `}
        >
          {text}
        </div>
      )}
    </div>
  );
}

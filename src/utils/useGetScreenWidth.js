import { useState } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setScreenWidth(window.innerWidth);
    }, 1000);
  });

  return screenWidth;
};

export default useScreenWidth;

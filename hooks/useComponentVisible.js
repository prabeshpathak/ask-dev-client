import { useState, useEffect, useRef } from "react";

function useComponentVisivle(initialIsVisible) {
  const [isVis, setIsVis] = useState(initialIsVisible);
  const ref = useRef(null);
  const toggleRef = useRef(null);

  const handleHide = (event) => {
    if (event.key === "Escape") {
      setIsVis(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !toggleRef?.current?.contains(event.target)
    ) {
      setIsVis(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handleHide, true);
    return () => {
      document.removeEventListener("keydown", handleHide, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return { ref, toggleRef, isVis, setIsVis };
}

export default useComponentVisivle;

import "./styles.css";
import { useState, useEffect } from "react";

import { VerticalAlignTopOutlined } from "@ant-design/icons";

const ScrollButton = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="top-button">
      {showTop && (
        <div className="icon-position">
          <VerticalAlignTopOutlined onClick={() => goToTop()} />
        </div>
      )}
    </div>
  );
};

export default ScrollButton;

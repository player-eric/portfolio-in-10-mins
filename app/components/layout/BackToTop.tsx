import { useEffect, useState } from "react";
import BackToTopIcon from "../icons/BackToTopIcon";

export default function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleBackToTopButtonVisibility = () => {
      setShowButton(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleBackToTopButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleBackToTopButtonVisibility);
    };
  }, []);

  return (
    showButton && (
      <div className="fixed bottom-4 right-4 z-10">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <BackToTopIcon />
        </button>
      </div>
    )
  );
}

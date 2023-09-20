import { setupIntersectionObserver } from "./intersectionObserver";
import { throttle } from "./throttle";

const btnUp = document.querySelector(".btn--up");

const btnVisibility = function () {
  if (window.scrollY > 500) {
    btnUp.style.opacity = "1";
    btnUp.style.transform = "translateY(-1.75rem)";
  } else {
    btnUp.style.opacity = "0";
    btnUp.style.transform = "translateY(1.75rem)";
  }
};

const scrollToTop = function () {
  document.body.scrollTop = 0; // For Safari
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const scrollUpBtn = function () {
  btnUp.addEventListener("click", scrollToTop);
  const throttledBtnVisibility = throttle(btnVisibility, 250);
  window.addEventListener("scroll", throttledBtnVisibility);

  setupIntersectionObserver(btnVisibility);
  throttledBtnVisibility();
};

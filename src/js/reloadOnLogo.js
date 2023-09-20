import { throttle } from "./throttle";

export const reloadOnLogo = function () {
  const logo = document.querySelector(".logo");

  logo.addEventListener(
    "click",
    throttle(() => {
      window.location.reload();
    }, 250)
  );
};

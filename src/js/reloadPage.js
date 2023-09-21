import { throttle } from "./throttle";

const reloadOnLogo = function () {
  const logo = document.querySelector(".logo");

  logo.addEventListener(
    "click",
    throttle(() => {
      window.location.reload();
    }, 250)
  );
};

const reloadOnHomeBtn = function () {
  const btn = document.querySelector(".btn--home");

  btn.addEventListener(
    "click",
    throttle(() => {
      window.location.reload();
    }, 250)
  );
};

export const reloadPage = function () {
  reloadOnLogo();
  reloadOnHomeBtn();
};

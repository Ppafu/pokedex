import { setupIntersectionObserver } from "./intersectionObserver";

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

const throttle = function (callee, timeout) {
  // Таймер будет определять,
  // надо ли нам пропускать текущий вызов.
  let timer = null;

  // Как результат возвращаем другую функцию.
  // Это нужно, чтобы мы могли не менять другие части кода,
  // чуть позже мы увидим, как это помогает.
  return function perform(...args) {
    // Если таймер есть, то функция уже была вызвана,
    // и значит новый вызов следует пропустить.
    if (timer) return;

    // Если таймера нет, значит мы можем вызвать функцию:
    timer = setTimeout(() => {
      // Аргументы передаём неизменными в функцию-аргумент:
      callee(...args);

      // По окончании очищаем таймер:
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
};

export const scrollUpBtn = function () {
  btnUp.addEventListener("click", scrollToTop);
  const throttledBtnVisibility = throttle(btnVisibility, 250);
  window.addEventListener("scroll", throttledBtnVisibility);

  setupIntersectionObserver(btnVisibility);
  btnVisibility();
};

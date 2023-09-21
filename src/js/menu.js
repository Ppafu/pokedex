import { throttle } from "./throttle";

const btnMenu = document.querySelector(".btn--list");
const btnClose = document.querySelector(".btn--close");
const menuEl = document.getElementById("menu");
const dialog = document.querySelector("dialog");
const body = document.querySelector("html");
const navBar = document.getElementById("nav");

const openMenu = function () {
  menuEl.classList.add("visible");
  menuEl.classList.remove("hidden");

  if (window.innerWidth < "1100") {
    navBar.style.top = "-5rem";
  }

  menuEl.style.width = `${window.innerWidth < "768" ? "100%" : "25rem"}`;
  if (menuEl.style.width == "100%") {
    body.classList.add("hidden-overflow");
  }
  setTimeout(function () {
    btnClose.focus();
  }, 1);
};

export const closeMenu = function () {
  menuEl.style.width = "0";

  if (window.innerWidth < "1100") {
    navBar.style.top = "0";
  }

  setTimeout(function () {
    btnMenu.focus();
  }, 1);

  setTimeout(function () {
    menuEl.classList.remove("visible");
  }, 501);

  setTimeout(function () {
    menuEl.classList.add("hidden");
  }, 502);

  body.classList.remove("hidden-overflow");
};

export const menu = function () {
  btnMenu.addEventListener("click", openMenu);

  btnClose.addEventListener("click", closeMenu);

  //Closing modal without closing sidenav
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (dialog.open) {
        dialog.close();
      } else {
        closeMenu();
      }
    }
  });
};

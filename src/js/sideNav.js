import Pokemon from "./Pokemon";

export const sideNav = function () {
  const btnMenu = document.querySelector(".btn--list");
  const btnClose = document.querySelector(".btn--close");
  const sideNav = document.getElementById("sidenav");
  const dialog = document.querySelector("dialog");

  btnMenu.addEventListener("click", () => {
    sideNav.style.visibility = "visible";
    sideNav.style.width = "25rem";
  });

  btnClose.addEventListener("click", () => {
    sideNav.style.visibility = "hidden";
    sideNav.style.width = "0px";
  });

  //Closing modal without closing sidenav
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (dialog.open) {
        dialog.close();
      } else {
        sideNav.style.visibility = "hidden";
        sideNav.style.width = "0px";
      }
    }
  });
};

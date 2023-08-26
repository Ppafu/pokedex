export const sideNav = function () {
  const btnMenu = document.querySelector(".btn--list");
  const btnClose = document.querySelector(".btn--close");
  const sideNav = document.getElementById("sidenav");
  btnMenu.addEventListener("click", () => {
    sideNav.style.visibility = "visible";
  });

  btnClose.addEventListener("click", () => {
    sideNav.style.visibility = "hidden";
  });
};

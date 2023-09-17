export const menu = function () {
  const btnMenu = document.querySelector(".btn--list");
  const btnClose = document.querySelector(".btn--close");
  const menu = document.getElementById("menu");
  const dialog = document.querySelector("dialog");
  const body = document.querySelector("html");

  btnMenu.addEventListener("click", () => {
    menu.style.visibility = "visible";
    menu.style.width = `${window.innerWidth < "768" ? "100%" : "25rem"}`;
    if (menu.style.width == "100%") {
      body.classList.add("hidden");
    }
  });

  btnClose.addEventListener("click", () => {
    menu.style.visibility = "hidden";
    menu.style.width = "0";
    body.classList.remove("hidden");
  });

  //Closing modal without closing sidenav
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (dialog.open) {
        dialog.close();
      } else {
        menu.style.visibility = "hidden";
      }
    }
  });
};

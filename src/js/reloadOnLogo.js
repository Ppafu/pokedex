export const reloadOnLogo = function () {
  const logo = document.querySelector(".logo");

  logo.addEventListener("click", () => {
    window.location.reload();
  });
};

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */

export const hideNav = function () {
  if (window.innerWidth > "1100") return;

  let prevScrollpos = window.scrollY;

  window.onscroll = function () {
    let currentScrollPos = window.scrollY;

    if (prevScrollpos > currentScrollPos || window.scrollY === "0") {
      document.getElementById("nav").style.top = "0";
    } else {
      document.getElementById("nav").style.top = "-5rem";
    }
    prevScrollpos = currentScrollPos;
  };
};

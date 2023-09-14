const parentElement = document.querySelector(".container");

export const renderSpinner = function () {
  if (document.getElementById("spinner")) return;

  const markup = `<i class="spinner fa-solid fa-circle-notch"></i>`;
  const spinnerElement = document.createElement("div");

  spinnerElement.setAttribute("id", "spinner");
  spinnerElement.innerHTML = markup;

  parentElement.appendChild(spinnerElement);
};

export const deleteSpinner = function () {
  const spinnerElement = document.getElementById("spinner");
  if (spinnerElement) {
    spinnerElement.parentNode.removeChild(spinnerElement);
  }
};

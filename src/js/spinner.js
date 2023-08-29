const parentElement = document.querySelector(".container");

export const renderSpinner = function () {
  const markup = `<i class="ph-bold ph-spinner"></i>`;
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

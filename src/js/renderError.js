export const renderError = function (error) {
  const parentElement = document.querySelector(".pokemon-container");
  const markup = `
    <div class="error">
        <div class="error-msg">
        <i class="warning fa-solid fa-triangle-exclamation"></i>
          <p>${error}</p>
        </div>
      <section class="img-container-error">
      <img class="img-error" src="public/error.png" alt="pikachu with stop sign">
    </div>
    `;
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("beforeend", markup);
};

export const renderError = function (error) {
  const parentElement = document.querySelector(".pokemon-container");
  const markup = `
    <div class="error">
        <div class="error-msg">
          <i class="ph-bold ph-warning"></i>
          <p>${error}</p>
        </div>
      <section class="img-container-error">
      <img class="img-error" src="./src/img/error.png" alt="pikachu with stop sign">
    </div>
    `;
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("beforeend", markup);
};

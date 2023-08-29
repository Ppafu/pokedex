import { infiniteScroll } from "./infiniteScroll";

// export const renderError = function (error) {
//   const parentElement = document.querySelector(".container");

//   const errorDiv = document.createElement("div");
//   errorDiv.className = "error";

//   const markup = `
//   <div class="error-msg">
//     <div>
//         <i class="ph-bold ph-warning"></i>
//     </div>
//     <p>${error}</p>
//    </div>
//     <section class="img-container-error">
//     <img class="img-error" src="./src/img/error.png" alt="pikachu with stop sign">

//   `;

//   errorDiv.innerHTML = markup;

//   parentElement.appendChild(errorDiv);
// };

export const renderError = function (error) {
  //   infiniteScrollActive = false;
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

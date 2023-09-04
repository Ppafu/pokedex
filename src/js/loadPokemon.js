import { NUMBER_OF_POKEMON, RES_PER_PAGE } from "./config";
import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { renderError } from "./renderError";
import { renderSpinner, deleteSpinner } from "./spinner";
import { setupIntersectionObserver } from "./intersectionObserver";

export const loadPokemon = async function (idOrNames = [], loadAll = false) {
  try {
    let page = 1;
    const itemsPerPage = RES_PER_PAGE;

    const loadPokemonPage = async () => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const fetchPromises = [];
      renderSpinner();

      for (let id = startIndex + 1; id <= endIndex; id++) {
        if (idOrNames.length === 0 || loadAll || idOrNames.includes(id)) {
          fetchPromises.push(fetchPokemon(id));
        }
      }

      // for (const idOrName of idOrNames) {
      //   fetchPromises.push(fetchPokemon(idOrName));
      // }

      const dataArray = await Promise.all(fetchPromises);

      dataArray.forEach((data) => {
        renderPokemon(data);
      });

      page++;
      deleteSpinner();
    };

    // Initial call to load the first page of Pokémon
    if (loadAll || idOrNames.length === 0) {
      loadPokemonPage();
    }

    // Set up Intersection Observer for infinite scrolling
    setupIntersectionObserver(loadPokemonPage);
  } catch (error) {
    renderError(error);
  }
};

// const parentElement = document.querySelector(".pokemon-container")
// parentElement.innerHTML =""

// const loadPokemon = async function () {
//   try {
//     let page = 1;
//     const itemsPerPage = RES_PER_PAGE;

//     const loadPokemonPage = async () => {
//       const startIndex = (page - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;

//       const fetchPromises = [];
//       renderSpinner();

//       for (
//         let id = startIndex + 1;
//         id <= endIndex && id <= NUMBER_OF_POKEMON;
//         id++
//       ) {
//         fetchPromises.push(fetchPokemon(id));
//       }

//       const dataArray = await Promise.all(fetchPromises);

//       dataArray.forEach((data) => {
//         renderPokemon(data);
//       });

//       page++;
//       deleteSpinner();
//     };

//     // Initial call to load the first page of Pokémon
//     loadPokemonPage();

//     // Set up Intersection Observer for infinite scrolling
//     setupIntersectionObserver(loadPokemonPage);
//   } catch (error) {
//     renderError(error);
//   }
// };

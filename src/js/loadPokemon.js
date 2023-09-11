import { RES_PER_PAGE } from "./config";
import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { renderError } from "./renderError";
import { renderSpinner, deleteSpinner } from "./spinner";
import { setupIntersectionObserver } from "./intersectionObserver";

let page = 1;

const loadPokemonsInRange = async function (arrayOfPokemons) {
  const startIndex = (page - 1) * RES_PER_PAGE;
  const endIndex = startIndex + RES_PER_PAGE;

  const fetchPromises = [];
  renderSpinner();

  // Determine the range of Pokémon to load
  try {
    if (!arrayOfPokemons) {
      return;
    } else {
      arrayOfPokemons = arrayOfPokemons.slice(startIndex, endIndex);
      // Fetch Pokémon based on the provided value (an array of IDs)
      for (const id of arrayOfPokemons) {
        fetchPromises.push(fetchPokemon(id));
      }
    }

    const dataArray = await Promise.all(fetchPromises);

    for (const data of dataArray) {
      renderPokemon(data);
    }
    page++;
    deleteSpinner();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
};

export const loadPokemon = async function (arrayOfPokemons) {
  try {
    // Reset the page to 1 when applying a new filter
    page = 1;
    const parentElement = document.querySelector(".pokemon-container");
    parentElement.innerHTML = '<div id="sentinel"></div>';

    if (!arrayOfPokemons) {
      return;
    } else {
      loadPokemonsInRange(arrayOfPokemons);
    }
    // Set up Intersection Observer for infinite scrolling
    setupIntersectionObserver(() => loadPokemonsInRange(arrayOfPokemons));
  } catch (error) {
    console.error(error);
    renderError(error);
  }
};

// FIRST GEN //
// const firstGen = dataArray.filter((el) => el[1].id <= NUMBER_OF_POKEMON);
// console.log(firstGen);
// for (const data of firstGen) {
//   renderPokemon(data);
// }

// AN ARRAY VERSION //
// let page = 1;
// const itemsPerPage = RES_PER_PAGE;

// const loadPokemonPage = async function (arrayOfPokemons) {
//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const fetchPromises = [];
//   renderSpinner();

//   // Determine the range of Pokémon to load
//   let pokemonRange = [];
//   if (arrayOfPokemons) {
//     pokemonRange = arrayOfPokemons.slice(startIndex, endIndex);
//   } else {
//     return;
//   }

//   try {
//     for (const nameOrId of pokemonRange) {
//       fetchPromises.push(fetchPokemon(nameOrId));
//     }

//     const dataArray = await Promise.all(fetchPromises);

//     // const firstGen = dataArray.filter((el) => el[1].id <= NUMBER_OF_POKEMON);
//     // console.log(firstGen);
//     // for (const data of firstGen) {
//     //   renderPokemon(data);
//     // }
//     for (const data of dataArray) {
//       renderPokemon(data);
//     }

//     deleteSpinner();

//     page++;
//   } catch (error) {
//     console.error(error);
//     renderError(error);
//   }
// };

// export const loadPokemon = async function (arrayOfPokemons) {
//   try {
//     const parentElement = document.querySelector(".pokemon-container");
//     parentElement.innerHTML = '<div id="sentinel"></div>';

//     if (!arrayOfPokemons) {
//       return;
//     } else {
//       loadPokemonPage(arrayOfPokemons);
//     }

//     // Set up Intersection Observer for infinite scrolling
//     setupIntersectionObserver(() => loadPokemonPage(arrayOfPokemons));
//   } catch (error) {
//     console.error(error);
//     renderError(error);
//   }
// };

/////////////////////////////////////

// Initial call to load the first page of Pokémon
// else {
//   loadPokemonPage(null);
// }

// if (!arrayOfPokemons) {
//   for (let id = startIndex + 1; id <= endIndex; id++) {
//     pokemonRange.push(id);
//   }
// }

// for (let id = startIndex + 1; id <= endIndex; id++) {
//   if (array) {
//     for (const pokemonName of array) {
//       const pokemonData = await fetchPokemon(pokemonName);
//       fetchPromises.push(pokemonData);
//     }
//   } else {
//     fetchPromises.push(fetchPokemon(id));
//   }
// }

// for (let id = startIndex + 1; id <= endIndex; id++) {
//   if (array.length === 0 || loadAll || array.includes(id)) {
//     fetchPromises.push(fetchPokemon(id));
//   }
// }

// for (const pokemonName of data) {
//         const pokemonData = await fetchPokemon(pokemonName);
//         renderPokemon(pokemonData);
//       }

// if (idOrNames.length != 0) {
//   idOrNames.map((el) => fetchPromises.push(fetchPokemon(el)));
// } else {
//   for (let id = startIndex + 1; id <= endIndex; id++) {
//     fetchPromises.push(fetchPokemon(id));
//   }
// }

// for (const idOrName of idOrNames) {
//   fetchPromises.push(fetchPokemon(idOrName));
// }

///////////////////////////////////////////////////////

// ok version

// export const loadPokemon = async function () {
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

// why should we set up Intersection Observer with an empty array?

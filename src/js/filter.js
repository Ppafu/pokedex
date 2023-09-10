import { Type } from "./Type";
import { API_URL } from "./config";
import { AJAX } from "./helpers";
import { loadPokemon } from "./loadPokemon";
import { renderError } from "./renderError";

// fetch types -> render types -> click type -> got an array of pokemons -> render them

// Get types
const fetchTypes = async function () {
  const types = await AJAX(`${API_URL}type/`);
  const typeNames = types.results
    .map((el) => el.name)
    .filter((el) => el != "unknown" && el != "shadow");

  return typeNames;
};

// Adding types to the sidenav
export const appendTypeElements = async function () {
  const typesArray = await fetchTypes();

  typesArray.forEach((element) => {
    const type = new Type(element);
    type.render();

    const typeElement = document.querySelector(`li.${element}`);

    typeElement.addEventListener("click", () => {
      loadFilteredPokemons(type.name);
    });
  });
};

// Getting an array of Pokemon of a specific type
const fetchPokemonsByType = async function (type) {
  const typeData = await AJAX(`${API_URL}type/${type}`);
  const pokemonData = typeData.pokemon;

  //SORTING
  const sortedPokemonIds = pokemonData
    .map((el) => {
      const urlParts = el.pokemon.url.split("/");
      return parseInt(urlParts[urlParts.length - 2]);
    })
    .sort((a, b) => a - b);

  return sortedPokemonIds;
};

export const loadFilteredPokemons = async function (type) {
  try {
    if (type) {
      const arrayOfPokemons = await fetchPokemonsByType(type);
      await loadPokemon(arrayOfPokemons);
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    renderError(error);
  }
};

// for (const name of arrayPokemonsOfType) {
//   await loadPokemon(name);
// }

// export const loadFilteredPokemons = async function (type) {
//   try {
//     const parentElement = document.querySelector(".pokemon-container");
//     parentElement.innerHTML = '<div id="sentinel"></div>';
//     if (type) {
//       const data = await fetchPokemonsByType(type);

//       // Fetch and render each Pokémon in the array
//       for (const pokemonName of data) {
//         const pokemonData = await fetchPokemon(pokemonName);
//         renderPokemon(pokemonData);
//       }

//       console.log(data);
//     } else {
//       loadPokemon();
//     }
//   } catch (error) {
//     console.error(error);
//     renderError(error);
//   }
// };

// Getting an array of Pokemon of a specific type
// const fetchPokemonsByType = async function (type) {
//   const typeData = await AJAX(`${API_URL}type/${type}`);
//   const arrayPokemonsOfType = typeData.pokemon.map((el) => el.pokemon.name);

//   arrayPokemonsOfType.forEach((el) => {
//     const data = fetchPokemon(el);
//     console.log();
//     data;
//   });
// };
// export const loadFilteredPokemons = function () {
//   const data = fetchPokemonsByType();
//   loadPokemon(data);
// };

// const typesArray = [
//   "normal",
//   "fighting",
//   "flying",
//   "poison",
//   "ground",
//   "rock",
//   "bug",
//   "ghost",
//   "steel",
//   "fire",
//   "water",
//   "grass",
//   "electric",
//   "psychic",
//   "ice",
//   "dragon",
//   "dark",
//   "fairy",
// ];

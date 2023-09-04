import { Type } from "./Type";
import { API_URL } from "./config";
import { AJAX } from "./helpers";
import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { loadPokemon } from "./loadPokemon";
import { renderError } from "./renderError";

// fetch types -> render types -> click type -> got an array of pokemons -> render them

// const parentElement = document.querySelector(".pokemon-container");
// parentElement.innerHTML = "";

// Get types
const fetchTypes = async function () {
  const types = await AJAX(`${API_URL}type/`);
  const typeNames = types.results
    .map((el) => el.name)
    .filter((el) => el != "unknown" && el != "shadow");

  return typeNames;
};

// Getting an array of Pokemon of a specific type

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

const fetchPokemonsByType = async function (type) {
  const typeData = await AJAX(`${API_URL}type/${type}`);
  const arrayPokemonsOfType = typeData.pokemon.map((el) => el.pokemon.name);
  return arrayPokemonsOfType;
};

export const loadFilteredPokemons = async function (type) {
  try {
    const data = await fetchPokemonsByType(type);
    console.log(data);
    // loadPokemon(data);
  } catch (error) {
    console.error(error);
    renderError(error);
  }
};

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

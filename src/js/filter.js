import { Type } from "./Type";
import { API_URL } from "./config";
import { AJAX } from "./helpers";
import { renderError } from "./renderError";
import { pokemonOrder } from "./sort";

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

  const sortedPokemonIds = pokemonData.map((el) => {
    const urlParts = el.pokemon.url.split("/");
    return parseInt(urlParts[urlParts.length - 2]);
  });

  return sortedPokemonIds;
};

export const loadFilteredPokemons = async function (type) {
  try {
    if (type) {
      const arrayOfPokemons = await fetchPokemonsByType(type);
      pokemonOrder(arrayOfPokemons);
    } else {
      return;
    }
  } catch (error) {
    console.error(`loadFilteredPokemons: ${error}`);
    renderError(error);
  }
};


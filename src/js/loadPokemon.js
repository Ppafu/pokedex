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
    console.error(`loadPokemonsInRange: ${error}`);
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
    console.error(`loadPokemon: ${error}`);
    renderError(error);
  }
};


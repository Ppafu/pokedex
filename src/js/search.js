import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { closeMenu } from "./menu";
import { renderError } from "./renderError";
import { renderSpinner, deleteSpinner } from "./spinner";
import { throttle } from "./throttle";

const parentElement = document.querySelector(".pokemon-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".btn--search");

const getQuery = function () {
  const query = search.value.toLowerCase().trim();
  search.value = "";

  return query;
};

const fetchPokemonSearch = async function () {
  try {
    const query = getQuery();
    renderSpinner();

    const data = await fetchPokemon(query);
    if (data) {
      renderPokemon(data);
    } else {
      throw new Error(
        "There is no such Pokémon. Please check the name or ID and try again."
      );
    }
  } catch (error) {
    renderError(error);
  }
  deleteSpinner();
};

const searchPokemon = async function () {
  fetchPokemonSearch();
  parentElement.innerHTML = "";
  if (window.innerWidth < "768") {
    closeMenu();
  }
};

export const triggerSearch = function () {
  search.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchPokemon();
    }
  });
  searchBtn.addEventListener("click", throttle(searchPokemon, 250));
};

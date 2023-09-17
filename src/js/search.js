import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { renderError } from "./renderError";
import { renderSpinner, deleteSpinner } from "./spinner";

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
      throw new Error("There is no such pokemon");
    }
  } catch (error) {
    renderError(error);
  }
  deleteSpinner();
};

const searchPokemon = async function () {
  fetchPokemonSearch();
  parentElement.innerHTML = "";
};

export const triggerSearch = function () {
  search.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchPokemon();
    }
  });
  searchBtn.addEventListener("click", searchPokemon);
};

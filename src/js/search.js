import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { renderError } from "./renderError";
import { renderSpinner, deleteSpinner } from "./spinner";
import { NUMBER_OF_POKEMON } from "./config";

const parentElement = document.querySelector(".pokemon-container");
const search = document.querySelector(".search");

const getQuery = function () {
  const query = search.value;
  search.value = "";

  return query;
};

const fetchPokemonSearch = async function () {
  try {
    const query = getQuery();
    renderSpinner();

    const data = await fetchPokemon(query);
    if (data[0].id <= NUMBER_OF_POKEMON) {
      renderPokemon(data);
    } else {
      throw new Error("There is no such pokemon");
    }
  } catch (error) {
    renderError(error);
  }
  deleteSpinner();
};

export const searchPokemon = async function () {
  fetchPokemonSearch();
  parentElement.innerHTML = "";
};

search.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon();
  }
});

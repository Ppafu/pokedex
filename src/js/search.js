import { fetchPokemon, renderPokemon } from "./fetchAndRender";

const parentElement = document.querySelector(".pokemon-container");
const search = document.querySelector(".search");

const getQuery = function () {
  const query = search.value;
  search.value = "";

  return query;
};

const fetchPokemonSearch = async function () {
  const query = getQuery();

  const data = await fetchPokemon(query);
  renderPokemon(data);
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

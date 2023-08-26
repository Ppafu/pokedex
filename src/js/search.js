import { fetchPokemonData, renderPokemon } from "./fetchAndRender";

const parentElement = document.querySelector(".pokemon-container");
const search = document.querySelector(".search");

const getQuery = function () {
  const query = search.value;
  search.value = "";

  return query;
};

const fetchPokemon = async function () {
  const query = getQuery();

  const data = await fetchPokemonData(query);
  renderPokemon(data);
};

export const searchPokemon = async function () {
  fetchPokemon();

  parentElement.innerHTML = "";
};

search.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon();
  }
});

// https://pokeapi.co/api/v2/type/

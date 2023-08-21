"use strict";

// import { AJAX } from "./helpers";
import { API_URL, NUMBER_OF_POKEMON } from "./config";
import { infiniteScroll } from "./infiniteScroll";
import Pokemon from "./Pokemon";

/////////////////////////////////  _generateCarousel() {
//   carousel(this.id);
// }

const arrayPokemon = Array.from({ length: NUMBER_OF_POKEMON }, (_, i) => i + 1);
const parentElement = document.querySelector(".container");

/////////////////////

const renderSpinner = function () {
  const markup = `<i class="ph-bold ph-spinner"></i>`;
  const spinnerElement = document.createElement("div");
  spinnerElement.setAttribute("id", "spinner");
  spinnerElement.innerHTML = markup;

  // parentElement.innerHTML = "";
  parentElement.appendChild(spinnerElement);
};

const deleteSpinner = function () {
  const spinnerElement = document.getElementById("spinner");
  if (spinnerElement) {
    spinnerElement.parentNode.removeChild(spinnerElement);
  }
};

//////////////////

function toObject(keys, values) {
  const obj = Object.fromEntries(
    keys.map((key, index) => [key, values[index]])
  );

  return obj;
}

const createPokemonObject = function (data, moreData) {
  const id = ("000" + data.id).slice(-4);
  const name = data.name;
  const types = data.types;

  // MODAL
  const statName = data.stats.map((el) => el.stat.name);
  const statNum = data.stats.map((el) => el.base_stat);
  const stats = toObject(statName, statNum);

  const description = moreData.flavor_text_entries.find(
    (item) => item.language.name === "en"
  ).flavor_text;
  // console.log(description);

  return new Pokemon(id, name, types, stats, description);
};

const fetchPokemon = async function (startIndex, endIndex) {
  try {
    const pokemonIds = arrayPokemon.slice(startIndex, endIndex);

    for (const id of pokemonIds) {
      const response = await fetch(`${API_URL}${id}`);
      const pokemonData = await response.json();

      const responseDescription = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const pokemonDescription = await responseDescription.json();

      const pokemon = createPokemonObject(pokemonData, pokemonDescription);
      pokemon.render();
    }
  } catch (err) {
    console.error(`${err}💥`);
    throw err;
  }
};

const loadPokemon = async function () {
  try {
    let page = 1;
    const itemsPerPage = 16;

    const loadPokemonPage = async () => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      renderSpinner();
      await fetchPokemon(startIndex, endIndex);

      const hiddenItems = document.querySelectorAll(".pokemon-preview.hidden");
      hiddenItems.forEach((item) => {
        item.classList.remove("hidden");
      });

      deleteSpinner();

      page++;
    };
    await loadPokemonPage();
    infiniteScroll(loadPokemonPage);
  } catch (err) {
    console.error(`${err}💥`);
    throw err;
  }
};

loadPokemon();

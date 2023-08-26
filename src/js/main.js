"use strict";

import { API_URL, NUMBER_OF_POKEMON } from "./config";
import { infiniteScroll } from "./infiniteScroll";
import { sideNav } from "./sideNav";
import { fetchPokemonData, renderPokemon } from "./fetchAndRender";
import { searchPokemon } from "./search";

/////////////////////////////////

const arrayPokemon = Array.from({ length: NUMBER_OF_POKEMON }, (_, i) => i + 1);
const parentElement = document.querySelector(".container");

/////////////////////////////////

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

const fetchPokemon = async function (startIndex, endIndex) {
  try {
    const pokemonIds = arrayPokemon.slice(startIndex, endIndex);

    for (const id of pokemonIds) {
      const data = await fetchPokemonData(id);
      renderPokemon(data);
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

const init = function () {
  loadPokemon();
  sideNav();
};

init();

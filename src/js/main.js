"use strict";

import { API_URL, NUMBER_OF_POKEMON, RES_PER_PAGE } from "./config";
import { infiniteScroll } from "./infiniteScroll";
import { sideNav } from "./sideNav";
import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { searchPokemon } from "./search";

/////////////////////////////////

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

const loadPokemon = async function () {
  try {
    let page = 1;
    const itemsPerPage = RES_PER_PAGE;

    const loadPokemonPage = async () => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      renderSpinner();

      const fetchPromises = [];

      for (
        let id = startIndex + 1;
        id <= endIndex && id <= NUMBER_OF_POKEMON;
        id++
      ) {
        fetchPromises.push(fetchPokemon(id));
      }

      const dataArray = await Promise.all(fetchPromises);

      dataArray.forEach((data) => {
        renderPokemon(data);
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

const init = function () {
  loadPokemon();
  sideNav();
};

init();

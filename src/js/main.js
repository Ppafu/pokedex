"use strict";

import { API_URL, NUMBER_OF_POKEMON, RES_PER_PAGE } from "./config";
import { infiniteScroll } from "./infiniteScroll";
import { sideNav } from "./sideNav";
import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { searchPokemon } from "./search";
import { renderError } from "./renderError";
import { renderSpinner, deleteSpinner } from "./spinner";

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
    if (infiniteScrollActive) {
      infiniteScroll(loadPokemonPage);
    }
  } catch (err) {
    console.error(`${err}💥`);
    renderError(err);
  }
};

const init = function () {
  loadPokemon();
  sideNav();
};

init();

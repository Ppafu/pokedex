"use strict";

import { NUMBER_OF_POKEMON, RES_PER_PAGE } from "./config";

import { sideNav } from "./sideNav";
import { fetchPokemon, renderPokemon } from "./fetchAndRender";
import { searchPokemon } from "./search";
import { renderError } from "./renderError";
import { renderSpinner, deleteSpinner } from "./spinner";
import { setupIntersectionObserver } from "./intersectionObserver";

//////////////////

const loadPokemon = async function () {
  try {
    let page = 1;
    const itemsPerPage = RES_PER_PAGE;

    const loadPokemonPage = async () => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const fetchPromises = [];
      renderSpinner();

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

      page++;
      deleteSpinner();
    };

    // Initial call to load the first page of Pokémon
    loadPokemonPage();

    // Set up Intersection Observer for infinite scrolling
    setupIntersectionObserver(loadPokemonPage);
  } catch (error) {
    renderError(error);
  }
};

const init = function () {
  loadPokemon();
  sideNav();
};

init();

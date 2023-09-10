"use strict";
import { loadPokemon } from "./loadPokemon";
import { sideNav } from "./sideNav";
import { searchPokemon } from "./search";
import { appendTypeElements, loadFilteredPokemons } from "./filter";

//////////////////

const init = function () {
  loadPokemon();
  sideNav();
  appendTypeElements();
};

init();

"use strict";
import { menu } from "./menu";
import { triggerSearch } from "./search";
import { appendTypeElements } from "./filter";
import { NUMBER_OF_POKEMONS } from "./config";
import { pokemonOrder } from "./sort";
import { arrayRange } from "./helpers";
import { scrollUpBtn } from "./scrollUpBtn";
import { reloadPage } from "./reloadPage";
import { hideNav } from "./navBar";

const initialLoad = function () {
  const arrayOfPokemons = arrayRange(1, NUMBER_OF_POKEMONS, 1);
  const arrayOfExtraPokemons = arrayRange(10001, 10271, 1); //API special forms of pokemons

  const arrayOfAllPokemons = arrayOfPokemons.concat(arrayOfExtraPokemons);
  pokemonOrder(arrayOfAllPokemons);
};
//////////////////

const init = function () {
  initialLoad();
  menu();
  triggerSearch();
  appendTypeElements();
  scrollUpBtn();
  reloadPage();
  hideNav();
};

init();

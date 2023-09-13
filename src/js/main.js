"use strict";
import { loadPokemon } from "./loadPokemon";
import { sideNav } from "./sideNav";
import { searchPokemon } from "./search";
import { appendTypeElements, loadFilteredPokemons } from "./filter";
import { NUMBER_OF_POKEMONS } from "./config";
import { pokemonOrder } from "./sort";
import { arrayRange } from "./helpers";

const initialLoad = function () {
  const arrayOfPokemons = arrayRange(1, NUMBER_OF_POKEMONS, 1);
  const arrayOfExtraPokemons = arrayRange(10001, 10271, 1); //API special forms of pokemons

  const arrayOfAllPokemons = arrayOfPokemons.concat(arrayOfExtraPokemons);
  pokemonOrder(arrayOfAllPokemons);
};

//////////////////

const init = function () {
  initialLoad();
  sideNav();
  appendTypeElements();
};

init();

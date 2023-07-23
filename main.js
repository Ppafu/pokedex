"use strict";

// import { AJAX } from "./helpers";
import { API_URL, NUMBER_OF_POKEMON } from "./config";

const pokemon = "pikachu";
const arrayPokemon = Array.from({ length: NUMBER_OF_POKEMON }, (_, i) => i + 1);
console.log(arrayPokemon);

const loadPokemon = async function () {
  try {
    const responses = await Promise.all(
      arrayPokemon.map(async (id) => {
        const response = await fetch(`${API_URL}${id}`);
        const pokemonData = await response.json();
        console.log(pokemonData.id, pokemonData.name);
      })
    );
  } catch (err) {
    console.error(`${err}💥`);
    throw err;
  }
};

loadPokemon();

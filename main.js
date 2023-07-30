"use strict";

// import { AJAX } from "./helpers";
import { API_URL, NUMBER_OF_POKEMON } from "./config";

class Pokemon {
  parentElement = document.querySelector(".pokemon-container");

  constructor(id, name, types) {
    this.id = id;
    this.name = name;
    this.types = types;
    // this.stats = stats;
  }

  _generateMarkup() {
    const nameToUpperCase = this.name[0].toUpperCase() + this.name.slice(1);

    let markup = `<li class="pokemon-preview"><div class="id"><p>#${
      this.id
    }</p></div>
    <div class="img-container"><img class="img-pokemon" src="https://img.pokemondb.net/artwork/large/${
      this.name
    }.jpg" ${this.id > 16 ? "loading = lazy" : "loading = eager"} alt="${
      this.name
    }"></div>
    <div class="name">${nameToUpperCase}</div><div class="type-container">`;

    const length = this.types.length;
    for (let i = 0; i < length; i++) {
      const value = this.types[i].type.name;
      markup += `<div class="type ${value}">${value}</div>`;
    }

    markup += "</div></li>";

    // let markup = `<div class="preview-pokemon">${this.id}, ${this.name}`;

    // for (const key in this.stats) {
    //   const value = this.stats[key];
    //   markup += ` ${key}: ${value}<br>`;
    // }
    // markup = markup.slice(0, -1); // Remove the trailing comma
    // markup += "</div>";
    return markup;
  }

  render() {
    const markup = this._generateMarkup();

    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
}

// const pokemon = "pikachu";
const arrayPokemon = Array.from({ length: NUMBER_OF_POKEMON }, (_, i) => i + 1);
// console.log(arrayPokemon);

function toObject(keys, values) {
  const obj = Object.fromEntries(
    keys.map((key, index) => [key, values[index]])
  );

  return obj;
}

const createPokemon = function (data) {
  const id = ("000" + data.id).slice(-4);
  const name = data.name;
  const types = data.types;

  // card
  const statName = data.stats.map((el) => el.stat.name);
  const statNum = data.stats.map((el) => el.base_stat);
  const stats = toObject(statName, statNum);

  return new Pokemon(id, name, types);
};

const loadPokemon = async function () {
  try {
    let page = 1; // Initialize the page number to load
    const itemsPerPage = 16; // Set the number of Pokémon to load per page
    let isLoading = false; // Flag to prevent concurrent loading

    const loadPokemonPage = async (pageNumber) => {
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pokemonIds = arrayPokemon.slice(startIndex, endIndex);

      for (const id of pokemonIds) {
        const response = await fetch(`${API_URL}${id}`);
        const pokemonData = await response.json();

        const pokemon = createPokemon(pokemonData);
        pokemon.render();
      }
      isLoading = false;
    };
    await loadPokemonPage(page);

    window.addEventListener("scroll", async () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrollThreshold = 250; //???

      // Check if the user has reached the bottom of the page
      if (
        !isLoading &&
        scrollTop + clientHeight >= scrollHeight - scrollThreshold
      ) {
        isLoading = true;
        page++;
        await loadPokemonPage(page);
      }
    });
  } catch (err) {
    console.error(`${err}💥`);
    throw err;
  }
};

loadPokemon();

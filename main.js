"use strict";

// import { AJAX } from "./helpers";
import { API_URL, NUMBER_OF_POKEMON } from "./config";
import { infiniteScroll } from "./infiniteScroll";

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

const arrayPokemon = Array.from({ length: NUMBER_OF_POKEMON }, (_, i) => i + 1);

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

/////////////////////
const fetchPokemon = async function (startIndex, endIndex) {
  try {
    const pokemonIds = arrayPokemon.slice(startIndex, endIndex);

    for (const id of pokemonIds) {
      const response = await fetch(`${API_URL}${id}`);
      const pokemonData = await response.json();

      const pokemon = createPokemon(pokemonData);
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

      await fetchPokemon(startIndex, endIndex);
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

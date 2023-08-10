"use strict";

// import { AJAX } from "./helpers";
import { API_URL, NUMBER_OF_POKEMON } from "./config";
import { infiniteScroll } from "./infiniteScroll";
import { createChart } from "./chart";

class Pokemon {
  _parentElement = document.querySelector(".pokemon-container");

  constructor(id, name, types, stats) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.stats = stats;
  }

  _createElement(markup, el, className) {
    const element = document.createElement(el);
    element.className = className;
    element.dataset.id = this.id;
    element.innerHTML = markup;
    return element;
  }
  _nameToUpperCase() {
    return `${this.name[0].toUpperCase() + this.name.slice(1)}`;
  }
  _types() {}
  _generateMarkup() {
    let markup = `<div class="id"><p>#${this.id}</p></div>
    <div class="img-container"><img class="img-pokemon" src="https://img.pokemondb.net/artwork/large/${
      this.name
    }.jpg" ${this.id > 16 ? "loading = lazy" : "loading = eager"} alt="${
      this.name
    }"></div>
    <div class="name">${this._nameToUpperCase()}</div><div class="type-container">`;

    const length = this.types.length;
    for (let i = 0; i < length; i++) {
      const value = this.types[i].type.name;
      markup += `<div class="type ${value}">${value}</div>`;
    }

    markup += "</div>";
    return markup;
  }
  _generateChart() {
    createChart(this.stats, this.id, "Pokemon stats");
  }

  _generateModalMarkup() {
    let stats = "";

    for (const key in this.stats) {
      const value = this.stats[key];
      stats += `${key}: ${value}<br>`;
    }

    let markup = `
      <form class="dialog-wrapper" method="dialog">
          <header>
            <div class="info-modal">
              <div class="id-modal"><p>#${this.id}</p></div>
              <div class="name-modal">${this._nameToUpperCase()}</div>
            </div>
             <button class="btn btn--delete">
                <ion-icon name="close-outline"></ion-icon>
             </button>
          </header>
        <article>
          <div class="img-container-modal"><img class="img-pokemon-modal" src="https://img.pokemondb.net/artwork/large/${
            this.name
          }.jpg" alt="${this.name}"></div>
   
          <div class="chart-modal">
          <canvas id="${this.id}"></canvas>
          </div>
          <div class="stats-modal">${stats}</div>
        </article>  
      </form>
   
      `;
    return markup;
  }

  _lockScroll() {
    document.body.classList.add("scroll-lock");
  }

  _returnScroll() {
    document.body.classList.remove("scroll-lock");
  }

  _closeOnBackDropClick({ currentTarget, target }) {
    const dialogElement = currentTarget;
    const isClickedOnBackDrop = target === dialogElement;
    if (isClickedOnBackDrop) {
      dialogElement.close();
    }
  }

  _renderModal() {
    const parentElement = document.querySelector("dialog");
    const markup = this._generateModalMarkup();
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("afterbegin", markup);
    this._generateChart();
    this._lockScroll();
  }

  render() {
    const markup = this._generateMarkup();
    // Create a new DOM element from the markup and add the pokemon-preview class directly
    const pokemonElement = this._createElement(markup, "li", "pokemon-preview");

    const dialog = document.querySelector("dialog");
    // Add the event listener to the new element
    pokemonElement.addEventListener("click", () => {
      this._renderModal();
      dialog.showModal();
      dialog.addEventListener("close", this._returnScroll);
      dialog.addEventListener("click", this._closeOnBackDropClick);
    });

    // Append the new element to the parent element
    this._parentElement.appendChild(pokemonElement);
  }
}

const arrayPokemon = Array.from({ length: NUMBER_OF_POKEMON }, (_, i) => i + 1);

function toObject(keys, values) {
  const obj = Object.fromEntries(
    keys.map((key, index) => [key, values[index]])
  );

  return obj;
}

const createPokemonObject = function (data) {
  const id = ("000" + data.id).slice(-4);
  const name = data.name;
  const types = data.types;

  // MODAL
  const statName = data.stats.map((el) => el.stat.name);
  const statNum = data.stats.map((el) => el.base_stat);
  const stats = toObject(statName, statNum);
  // console.log(stats);

  return new Pokemon(id, name, types, stats);
};

/////////////////////
const fetchPokemon = async function (startIndex, endIndex) {
  try {
    const pokemonIds = arrayPokemon.slice(startIndex, endIndex);

    for (const id of pokemonIds) {
      const response = await fetch(`${API_URL}${id}`);
      const pokemonData = await response.json();
      // console.log(pokemonData);

      const pokemon = createPokemonObject(pokemonData);
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

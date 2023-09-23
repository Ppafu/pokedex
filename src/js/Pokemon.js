import { createRadarChart, createBarChart } from "./chart";
import dialogPolyfill from "dialog-polyfill";

export default class Pokemon {
  _parentElement = document.querySelector(".pokemon-container");

  constructor(id, name, types, stats, description) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.stats = stats;
    this.description = description;
  }

  _imgSrc() {
    const url = "https://img.pokemondb.net/artwork/large/";
    let markup;

    if (this.name.includes("pumpkaboo") || this.name.includes("gourgeist")) {
      markup = `${url}${this.name.slice(0, 9)}.jpg`;
      return markup;
    }
    if (this.name.includes("eiscue")) {
      markup = `${url}${this.name}.jpg`;
      return markup;
    }
    if (this.name.includes("regice")) {
      markup = `${url}regice.jpg`;
      return markup;
    }
    if (this.name.includes("alola-cap")) {
      markup = `${url}${this.name}.jpg`;
      return markup;
    }
    if (this.name.includes("mimikyu" && "disguised")) {
      markup = `${url}mimikyu.jpg`;
      return markup;
    }
    if (this.name.includes("mimikyu" && "busted")) {
      markup = `https://img.pokemondb.net/artwork/vector/mimikyu-busted.png`;
      return markup;
    }
    if (this.name.includes("alola")) {
      markup = `${url}${this.name}n.jpg`;
      return markup;
    }
    if (this.name.includes("partner")) {
      markup = `${url}pikachu-lets-go.jpg`;
      return markup;
    }
    if (this.name.includes("gmax")) {
      markup = `${url}${this.name.slice(0, -4)}gigantamax.jpg`;
      return markup;
    }
    if (this.name.includes("galar")) {
      markup = `${url}${this.name}ian.jpg`;
      return markup;
    }
    if (this.name.includes("hisui")) {
      markup = `${url}${this.name}an.jpg`;
      return markup;
    }
    if (
      this.name.includes("Calyrex" && "ice") ||
      this.name.includes("Calyrex" && "shadow")
    ) {
      markup = `${url}${this.name}-rider.jpg`;
      return markup;
    } else {
      markup = `${url}${this.name}.jpg`;

      return markup;
    }
  }

  _onError() {
    let markup;
    markup = `"this.onerror=null; this.src = '/missingNo.png'"`;
    return markup;
  }
  _createElement(markup, el, className) {
    const element = document.createElement(el);
    element.innerHTML = markup;
    element.className = className;
    element.tabIndex = "0";
    return element;
  }
  _nameToUpperCase() {
    return `${
      this.name[0].toUpperCase() + this.name.slice(1).replace("-", " ")
    }`;
  }
  _nameClass() {
    if (this.name.length >= 17) {
      return `"name-preview long"`;
    } else {
      return "name-preview";
    }
  }

  _generateTypes() {
    let markup = "";
    const length = this.types.length;
    for (let i = 0; i < length; i++) {
      const value = this.types[i].type.name;
      markup += `<div class="type ${value}">${value}</div>`;
    }
    return markup;
  }

  _generateMarkup() {
    let markup = `<div class="id"><p>#${this.id}</p></div>
      <div class="img-container"><img class="img-pokemon" src=${this._imgSrc()} onerror =${this._onError()} ${
      this.id > 16 ? "loading = lazy" : "loading = eager"
    } alt="${this.name}"></div>
      <h2 class=${this._nameClass()}>${this._nameToUpperCase()}</h2>
  
      <div class="type-container">
      ${this._generateTypes()}
      </div>`;
    return markup;
  }
  _generateChart() {
    createRadarChart(this.stats, this.id, "Pokemon stats");
    createBarChart(this.stats, this.id, "Pokemon stats");
  }

  _generateModalMarkup() {
    let stats = "";

    for (const key in this.stats) {
      const value = this.stats[key];
      stats += `<li>${key}: ${value}</li>`;
    }

    //

    let markup = `
            <form class="dialog-wrapper" method="dialog">
       <header>
            <section class="info-modal" >
                <div class="id id-modal"><p>#${this.id}</p></div>
                <h2 class="name name-modal">${this._nameToUpperCase()}</h2>
                <div class="type-container">
                  ${this._generateTypes()}
                </div>
                </section>

               <button class="btn btn--close-modal" aria-label="close modal" >
               <i class="fa-solid fa-xmark"></i>
               </button>
               </header>
  

             
            <section class="img-container-modal">
            <img class="img-pokemon-modal" src=${this._imgSrc()} onerror =${this._onError()} alt="${
      this.name
    }">
            </section>
  
            <div class="info-wrapper">
              <section class = "description">
              <p>
              ${this.description.replace("", " ")}
              </p>
              </section>

              <section class="chart chart-radar">
              <div class="chart-wrapper">
              <canvas id="${this.id}-radar">
              </canvas>
              </div>
              </section>
  
              <section class="chart chart-bar">
              <div class="chart-wrapper">
             <canvas id="${this.id}-bar"></canvas></div>
             </section>
            </div>
       
        
        </form>

                `;
    return markup;
  }

  _closeOnBackDropClick({ currentTarget, target }) {
    const dialogElement = currentTarget;
    const isClickedOnBackDrop = target === dialogElement;
    if (isClickedOnBackDrop) {
      dialogElement.close();
    }
  }
  _dialogPolyfill() {
    const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;
    if (isBrowserNotSupportDialog) {
      const dialog = document.querySelector("dialog");
      dialogPolyfill.registerDialog(dialog);
    }
  }

  _renderModal() {
    const dialog = document.querySelector("dialog");

    const markup = this._generateModalMarkup();
    dialog.innerHTML = "";
    dialog.insertAdjacentHTML("afterbegin", markup);
    this._generateChart();
    dialog.showModal();

    dialog.addEventListener("click", this._closeOnBackDropClick);
    this._dialogPolyfill();
  }

  render() {
    const markup = this._generateMarkup();

    // Create a new DOM element from the markup and add the pokemon-preview class directly
    const pokemonElement = this._createElement(
      markup,
      "li",
      "pokemon-preview",
      "0"
    );

    // Append the new element to the parent element
    this._parentElement.appendChild(pokemonElement);

    // Add the event listener to the new element
    pokemonElement.addEventListener("click", () => {
      this._renderModal();
    });

    pokemonElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this._renderModal();
      }
    });
  }
}

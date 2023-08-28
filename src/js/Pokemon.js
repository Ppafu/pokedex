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
      <div class="img-container"><img class="img-pokemon" src="https://img.pokemondb.net/artwork/large/${
        this.name
      }.jpg" ${this.id > 16 ? "loading = lazy" : "loading = eager"} alt="${
      this.name
    }"></div>
      <h2 class="name">${this._nameToUpperCase()}</h2>
  
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
            <section class="info-modal">
                <div class="id id-modal"><p>#${this.id}</p></div>
                <h2 class="name name-modal">${this._nameToUpperCase()}</h2>
                <div class="type-container">
                  ${this._generateTypes()}
                </div>
                </section>

               <button class="btn btn--close-modal">
               <i class="ph-bold ph-x"></i>
               </button>
            </header>
  

          <article>
            <section class="img-container-modal">
            <img class="img-pokemon-modal" src="https://img.pokemondb.net/artwork/large/${
              this.name
            }.jpg" alt="${this.name}">
            </section>
  
    
              <section class = "description">
              <p>
              ${this.description.replace("", " ")}
              </p>
              </section>

              <section class="chart chart-radar"><canvas id="${
                this.id
              }-radar"></canvas></section>
  
              <section class="chart chart-bar">
             <canvas id="${this.id}-bar"></canvas></section>

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
    // this._lockScroll();
    // dialog.addEventListener("close", this._returnScroll);
    dialog.addEventListener("click", this._closeOnBackDropClick);
    this._dialogPolyfill();
  }

  render() {
    const markup = this._generateMarkup();
    // Create a new DOM element from the markup and add the pokemon-preview class directly
    const pokemonElement = this._createElement(
      markup,
      "li",
      "pokemon-preview hidden"
    );

    // Append the new element to the parent element
    this._parentElement.appendChild(pokemonElement);

    // Add the event listener to the new element
    pokemonElement.addEventListener("click", () => {
      this._renderModal();
    });
  }
}

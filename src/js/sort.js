import { loadPokemon } from "./loadPokemon";

const ascendingOrderBtn = document.querySelector(".ascending");
const descendingOrderBtn = document.querySelector(".descending");
let sortedArray = [];

export const pokemonOrder = function (arrayOfPokemons, order = "ascending") {
  sortedArray = [...arrayOfPokemons]; // Update the sorted array

  if (order === "ascending") {
    sortedArray.sort((a, b) => a - b);
  } else {
    sortedArray.sort((a, b) => b - a);
  }

  loadPokemon(sortedArray); // Load the sorted array
};

// Add event listeners
ascendingOrderBtn.addEventListener("click", () => {
  pokemonOrder(sortedArray, "ascending"); // Pass the current sorted array
});

descendingOrderBtn.addEventListener("click", () => {
  pokemonOrder(sortedArray, "descending"); // Pass the current sorted array
});

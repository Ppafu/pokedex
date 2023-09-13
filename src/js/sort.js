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

// export const switchPokemonOrder = function (array) {
//   // Create a copy of the array to avoid modifying the original
//   const sortedArray = [...array];

//   const ascendingOrderBtn = document.querySelector(".ph-sort-ascending");
//   const descendingOrderBtn = document.querySelector(".ph-sort-descending");

//   ascendingOrderBtn.addEventListener("click", () => {
//     sortedArray.sort((a, b) => a - b);
//     loadPokemon(sortedArray);
//   });

//   descendingOrderBtn.addEventListener("click", () => {
//     sortedArray.sort((a, b) => b - a);
//     loadPokemon(sortedArray);
//   });
// };
// export const switchPokemonOrder = function () {
//   const ascendingOrderBtn = document.querySelector(".ph-sort-ascending");
//   const descendingOrderBtn = document.querySelector(".ph-sort-descending");

//   ascendingOrderBtn.addEventListener("click", (array) => {
//     array = array.sort((a, b) => a - b);
//     loadPokemonsInRange(array);
//   });
//   descendingOrderBtn.addEventListener("click", (array) => {
//     array = array.sort((a, b) => b - a);
//     loadPokemonsInRange(array);
//   });
// };

// export const switchPokemonOrder = function (array) {
//   const ascendingOrderBtn = document.querySelector(".ph-sort-ascending");
//   const descendingOrderBtn = document.querySelector(".ph-sort-descending");

//   ascendingOrderBtn.addEventListener("click", () => {
//     array = [...array]; // Create a copy of the array
//     array.sort((a, b) => a - b);
//     console.log(array);
//     loadPokemon(array);
//   });

//   descendingOrderBtn.addEventListener("click", () => {
//     array = [...array];
//     array.sort((a, b) => b - a);
//     console.log(array);
//     console.log("hi");
//     loadPokemon(array);
//   });
// };

// const ascendingOrderBtn = document.querySelector(".ph-sort-ascending");
// const descendingOrderBtn = document.querySelector(".ph-sort-descending");

// ascendingOrderBtn.addEventListener("click", (array) => {
//   array = array.sort((a, b) => a - b);
//   loadPokemonsInRange(array);
// });
// descendingOrderBtn.addEventListener("click", (array) => {
//   array = array.sort((a, b) => b - a);
//   loadPokemonsInRange(array);
// });

import { AJAX } from "./helpers";
import { API_URL } from "./config";
import { createPokemon } from "./createPokemon";

const deleteHiddenClass = function () {
  const hiddenItems = document.querySelectorAll(".pokemon-preview.hidden");
  hiddenItems.forEach((item) => {
    item.classList.remove("hidden");
  });
};

export const fetchPokemonData = async function (value) {
  try {
    const pokemonData = await AJAX(`${API_URL}/${value}`);
    const pokemonDescriptionData = await AJAX(`${API_URL}-species/${value}`);

    const data = [pokemonData, pokemonDescriptionData];
    return data;
  } catch (err) {
    console.error(`${err}💥`);
    throw err;
  }
};

export const renderPokemon = function (data) {
  const pokemon = createPokemon(data);
  pokemon.render();
  deleteHiddenClass();
};

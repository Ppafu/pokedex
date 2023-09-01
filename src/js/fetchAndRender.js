import { AJAX } from "./helpers";
import { API_URL } from "./config";
import { createPokemonObject } from "./createPokemonObject";
import { renderError } from "./renderError";

const deleteHiddenClass = function () {
  const hiddenItems = document.querySelectorAll(".pokemon-preview.hidden");
  hiddenItems.forEach((item) => {
    item.classList.remove("hidden");
  });
};

export const fetchPokemon = async function (value) {
  try {
    const pokemonData = await AJAX(`${API_URL}/${value}`);

    if (pokemonData) {
      const pokemonDescriptionData = await AJAX(`${API_URL}-species/${value}`);
      const data = [pokemonData, pokemonDescriptionData];
      return data;
    } else {
      throw new Error("There is no such pokemon");
    }
  } catch (error) {
    console.log(`${error}`);
    renderError(error);
  }
};

export const renderPokemon = function (data) {
  const pokemon = createPokemonObject(data);
  pokemon.render();
  // deleteHiddenClass();
};

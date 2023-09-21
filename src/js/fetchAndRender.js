import { AJAX } from "./helpers";
import { API_URL } from "./config";
import { createPokemonObject } from "./createPokemonObject";
import { renderError } from "./renderError";

export const fetchPokemon = async function (value) {
  try {
    const pokemonData = await AJAX(`${API_URL}pokemon/${value}`);

    if (pokemonData) {
      const pokemonDescriptionData = await AJAX(pokemonData.species.url);

      const data = [pokemonData, pokemonDescriptionData];

      return data;
    } else {
      throw new Error(
        "There is no such Pokémon. Please check the name or ID and try again."
      );
    }
  } catch (error) {
    console.error(`fetchPokemon: ${error}`);
    renderError(error);
  }
};

export const renderPokemon = function (data) {
  const pokemon = createPokemonObject(data);
  pokemon.render();
};

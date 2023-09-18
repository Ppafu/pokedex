import Pokemon from "./Pokemon";

function toObject(keys, values) {
  const obj = Object.fromEntries(
    keys.map((key, index) => [key, values[index]])
  );

  return obj;
}

export const createPokemonObject = function (data) {
  const [pokemonData, descriptionData] = data;
  // console.log(data);

  const id = ("000" + pokemonData.id).slice(-5);
  const name = pokemonData.name;
  const types = pokemonData.types;

  // MODAL
  const statName = pokemonData.stats.map((el) => {
    if (el.stat.name === "special-defense") {
      return "sp.def.";
    } else if (el.stat.name === "special-attack") {
      return "sp.att.";
    } else {
      return el.stat.name;
    }
  });

  console.log(statName);
  const statNum = pokemonData.stats.map((el) => el.base_stat);
  const stats = toObject(statName, statNum);

  const description =
    descriptionData && descriptionData.flavor_text_entries.length > 0
      ? descriptionData.flavor_text_entries.find(
          (item) => item.language.name === "en"
        ).flavor_text
      : "Ecology under research.";

  return new Pokemon(id, name, types, stats, description);
};

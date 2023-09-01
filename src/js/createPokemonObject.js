import Pokemon from "./Pokemon";

function toObject(keys, values) {
  const obj = Object.fromEntries(
    keys.map((key, index) => [key, values[index]])
  );

  return obj;
}

export const createPokemonObject = function (data) {
  const id = ("000" + data[0].id).slice(-4);
  const name = data[0].name;
  const types = data[0].types;

  // MODAL
  const statName = data[0].stats.map((el) => el.stat.name);
  const statNum = data[0].stats.map((el) => el.base_stat);
  const stats = toObject(statName, statNum);

  const description = data[1].flavor_text_entries.find(
    (item) => item.language.name === "en"
  ).flavor_text;

  return new Pokemon(id, name, types, stats, description);
};

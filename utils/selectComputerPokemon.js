import Pokemon from '../models/PokemonModel.js';
import PokemonType from '../models/PokemonTypeModel.js';

export const selectComputerPokemon = async (playerTypes) => {
  const types = await PokemonType.find({ effective: { $in: playerTypes } });

  if (!types.length) {
    const allPokemons = await Pokemon.find();
    return allPokemons[Math.floor(Math.random() * allPokemons.length)];
  }

  const effectiveTypes = [];
  types.forEach((type) => {
    effectiveTypes.push(type.english);
  });

  const candidatePokemons = await Pokemon.find({ type: { $in: effectiveTypes } });

  if (candidatePokemons.length > 0) {
    return candidatePokemons[Math.floor(Math.random() * candidatePokemons.length)];
  }

  // якщо не вдалося знайти ефективних покемонів, вибираємо випадкового
  const allPokemons = await Pokemon.find();
  return allPokemons[Math.floor(Math.random() * allPokemons.length)];
};

import mongoose from 'mongoose';
import Pokemon from '../models/PokemonModel.js';
import PokemonType from '../models/PokemonTypeModel.js';
import fs from 'fs/promises';


const initializeData = async () => {
  try {
    const pokemonData = JSON.parse(
      await fs.readFile(new URL('../data/pokemons.json', import.meta.url))
    );

    const typeData = JSON.parse(
      await fs.readFile(new URL('../data/types.json', import.meta.url))
    );
    console.log('start init');
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Не вдалося підключитись до бази даних');
    }

    const existingPokemonCount = await Pokemon.countDocuments();
    if (existingPokemonCount) {
      console.log('Данні покемонів уже існують в базі');
    } else {
      console.log('Ініціалізація даних покемонів...');

      const filtredPokemonsArray = await pokemonData
        .filter(pokemon => {
          const hasAllFields =
            pokemon.id &&
            pokemon.name?.english &&
            pokemon.type &&
            pokemon.base?.HP &&
            pokemon.base?.Attack &&
            pokemon.base?.Defense &&
            pokemon.base?.Speed &&
            pokemon.image?.sprite &&
            pokemon.image?.thumbnail &&
            pokemon.image?.hires;

          if (!hasAllFields) {
            console.warn(`Пропускаємо покемона з ID: ${pokemon.id || 'невідомо'}, через відсутність полів.`);
          }

          return hasAllFields;
        });

      const formattedPokemons = filtredPokemonsArray.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name.english,
        type: pokemon.type,
        base: {
          HP: pokemon.base.HP,
          Attack: pokemon.base.Attack,
          Defense: pokemon.base.Defense,
          Speed: pokemon.base.Speed,
        },
        image: {
          sprite: pokemon.image.sprite,
          thumbnail: pokemon.image.thumbnail,
          hires: pokemon.image.hires,
        },
      }));

      await Pokemon.insertMany(formattedPokemons);
      console.log('Дані про покемонів успішно збережено!');
    }

    const existingTypeCount = await PokemonType.countDocuments();
    if (existingTypeCount === 0) {
      console.log('Ініціалізація даних типів покемонів...');

      const formattedTypes = await typeData.map(type => ({
        english: type.english,
        effective: type.effective,
        ineffective: type.ineffective,
        no_effect: type.no_effect,
      }));

      await PokemonType.insertMany(formattedTypes);
      console.log('Дані про типи покемонів успішно збережено!');
    } else {
      console.log('Дані типів покемонів уже існують у базі.');
    }
  } catch (error) {
    console.error('Помилка при ініціалізації даних:', error);
  }
};

export default initializeData

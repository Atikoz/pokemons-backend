import { Schema, model } from 'mongoose';

const pokemonTypeSchema = new Schema({
  english: {
    type: String,
    unique: true,
    required: true
  },
  effective: [String],
  ineffective: [String],
  no_effect: [String],
});

const PokemonType = model('Type', pokemonTypeSchema);
export default PokemonType;

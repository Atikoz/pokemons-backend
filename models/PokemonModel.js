import { model, Schema } from 'mongoose';

// характеристики можна розбити на посилання

const pokemonSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: [String],
  base: {
    HP: {
      type: Number,
      required: true
    },
    Attack: {
      type: Number,
      required: true
    },
    Defense: {
      type: Number,
      required: true
    },
    Speed: {
      type: Number,
      required: true
    },
  },
  image: {
    sprite: {
      type: String,
      required: true,
      unique: true
    },
    thumbnail: {
      type: String,
      required: true,
      unique: true
    },
    hires: {
      type: String,
      required: true,
      unique: true
    },
  }
});

const Pokemon = model('Pokemon', pokemonSchema);
export default Pokemon;

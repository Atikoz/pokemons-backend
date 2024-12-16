import { Schema, model } from 'mongoose';

const BattleHistorySchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  winner: {
    type: String,
    required: true,
  },
  pokemonPlayer: {
    type: String,
    required: true,
  },
  pokemonComputer: {
    type: String,
    required: true,
  },
  logs: {
    type: [String],
    required: true,
  },
  data: {
    type: Date,
    default: Date.now
  }
});

const BattleHistory = model('History', BattleHistorySchema);
export default BattleHistory;

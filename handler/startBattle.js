import Pokemon from "../models/PokemonModel.js";
import { determineTurn } from "../utils/determineTurn.js";
import { performAttack } from "../utils/performAttack.js";
import { selectComputerPokemon } from "../utils/selectComputerPokemon.js";

export const startBattle = async (ws, playerPokemonId) => {
  const playerPokemon = await Pokemon.findOne({ id: playerPokemonId });

  if (!playerPokemon) {
    ws.send(JSON.stringify({ error: 'Player Pokemon not found' }));
    return;
  }

  const computerPokemon = await selectComputerPokemon(playerPokemon.type);

  if (!computerPokemon) {
    ws.send(JSON.stringify({ error: 'No suitable Pokemon found for the computer' }));
    return;
  }

  const turn = determineTurn(playerPokemon, computerPokemon)

  const battleState = {
    player: { ...playerPokemon._doc, currentHP: playerPokemon.base.HP },
    computer: { ...computerPokemon._doc, currentHP: computerPokemon.base.HP },
    logs: [`The first attack is made by a ${turn}`],
    turn
  };

  ws.send(JSON.stringify({ action: 'BATTLE_STARTED', payload: battleState }));
  ws.battleState = battleState;

  if (battleState.turn === 'computer') {
    const attackResult = performAttack(battleState, 'computer');

    if (attackResult.player.currentHP > 0) {
      ws.send(JSON.stringify({ action: 'BATTLE_UPDATE', payload: attackResult }));
    } else {
      battleState.logs.push(`${battleState.computer.name} won with: ${attackResult.computer.currentHP} HP!`);
      ws.send(
        JSON.stringify({
          action: 'GAME_END',
          payload: {
            winner: 'computer',
            playerPockemon: attackResult.player.name,
            computerPockemon: attackResult.computer.name,
            playerHP: attackResult.player.currentHP,
            computerHP: attackResult.computer.currentHP,
            message: `${battleState.computer.name} won ${battleState.player.name}!`,
            logs: battleState.logs,
          },
        })
      );
    }
  } else {
    ws.send(JSON.stringify({ action: 'BATTLE_STARTED', payload: battleState }));
  }
};
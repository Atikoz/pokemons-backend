import { playerAttack } from "./playerAttack.js";
import { saveBattleOnDb } from "./saveBattleOnDb.js";
import { startBattle } from "./startBattle.js";

export default async (wss) => {
  wss.on('connection', (ws) => {
    console.log('user join to WebSocket server');
  
    ws.on('message', async (data) => {
      const { action, payload } = JSON.parse(data);
  
      if (action === 'START_BATTLE') {
        const playerPokemonId = payload.playerPokemonId;
        startBattle(ws, playerPokemonId);
      }
  
      if (action === 'PLAYER_ATTACK') {
        playerAttack(ws);
      }

      if (action === 'GAME_END') {
        playerAttack(ws);
      }

      if (action === 'BATTLE_FINISH') {
        await saveBattleOnDb(payload)
      }
    });
  
    ws.on('close', () => {
      console.log('Клієнт відключений');
    });
  });
}
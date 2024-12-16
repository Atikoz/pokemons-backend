import { performAttack } from "../utils/performAttack.js";

export const playerAttack = (ws) => {
  const { battleState } = ws;

  if (!battleState) {
    ws.send(JSON.stringify({ error: 'No active battle' }));
    return;
  }

  const attackResult = performAttack(battleState, 'player');
  ws.send(JSON.stringify({ action: 'BATTLE_UPDATE', payload: attackResult }));

  if (attackResult.computer.currentHP > 0) {
    setTimeout(() => {
      const computerAttackResult = performAttack(battleState, 'computer');
      if (computerAttackResult.player.currentHP > 0) {
        return ws.send(JSON.stringify({ action: 'BATTLE_UPDATE', payload: computerAttackResult }));
      } else {
        battleState.logs.push(`${battleState.computer.name} won with: ${computerAttackResult.computer.currentHP} HP!`)
        return ws.send(JSON.stringify({
          action: 'GAME_END',
          payload: {
            winner: 'computer',
            playerPockemon: computerAttackResult.player.name,
            computerPockemon: computerAttackResult.computer.name,
            playerHP: computerAttackResult.player.currentHP,
            computerHP: computerAttackResult.computer.currentHP,
            message: `${battleState.computer.name} won ${battleState.player.name}!`,
            logs: battleState.logs,
          }
        }));
      }
    }, 1000);
  } else {
    battleState.logs.push(`${battleState.player.name} won with: ${attackResult.player.currentHP} HP!`)
    return ws.send(JSON.stringify({
      action: 'GAME_END',
      payload: {
        winner: 'player',
        playerPockemon: attackResult.player.name,
        computerPockemon: attackResult.computer.name,
        playerHP: attackResult.player.currentHP,
        computerHP: attackResult.computer.currentHP,
        message: `${battleState.player.name} won ${battleState.computer.name}!`,
        logs: battleState.logs,
      },
    }));
  }
};
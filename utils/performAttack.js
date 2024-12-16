import { calculateDamage } from "./calculateDamage.js";

export const performAttack = (battleState, attacker) => {
  const { player, computer } = battleState;
  const attackerPokemon = attacker === 'player' ? player : computer;
  const defenderPokemon = attacker === 'player' ? computer : player;

  let damage = calculateDamage(attackerPokemon, defenderPokemon);

  defenderPokemon.currentHP = Math.max(0, defenderPokemon.currentHP - damage);

  if (!damage) damage = 'Miss!'

  const log = `${attackerPokemon.name} attacked! Damage: ${damage}. Remaining HP: ${defenderPokemon.currentHP}`;

  battleState.logs.push(log);

  return {
    player,
    computer,
    attacker,
    remainingHP: defenderPokemon.currentHP,
    logs: battleState.logs,
    turn: attacker === 'player' ? 'computer' : 'player',
  };
};
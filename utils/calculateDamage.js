export const calculateDamage = (attackerPokemon, defenderPokemon) => {
  const attackPower = attackerPokemon.base.Attack + attackerPokemon.base.Defense + attackerPokemon.base.Speed; // в базі не було параметру сила, тому розраховую її сам
  const attackStat = attackerPokemon.base.Attack;
  const defenseStat = defenderPokemon.base.Defense;

  const randomFactor = parseFloat((Math.random()).toFixed(2));

  const damage = (((2 * attackPower * (attackStat / defenseStat)) / 50) + 2) * +randomFactor;

  return parseFloat(damage.toFixed(2));
};
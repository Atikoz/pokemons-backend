export const determineTurn = (player, computer) => {
  return player.base.Speed >= computer.base.Speed ? 'player' : 'computer';
};
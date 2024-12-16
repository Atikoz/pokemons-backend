function generateId() {
  const randomPart1 = Math.random().toString(36).substring(2, 15);
  const randomPart2 = Math.random().toString(36).substring(2, 15);
  return `pkm-${randomPart1}-${randomPart2}`;
}

export default generateId
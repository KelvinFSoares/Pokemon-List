export function checkIDIsValid(ID: string) {
  const n = Math.floor(Number(ID));
  return !isNaN(n) && n > 0;
}

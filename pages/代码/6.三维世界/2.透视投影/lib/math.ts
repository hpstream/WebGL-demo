export function range(start: number, end: number, isFloat: boolean = false) {
  let value = start + (end - start) * Math.random();
  return isFloat ? value : Math.floor(value);
}
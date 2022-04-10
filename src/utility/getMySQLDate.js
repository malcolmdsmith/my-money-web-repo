export function getMySQLDate(date, sep = "/") {
  const numbers = date.split(sep);
  return numbers[2] + "-" + numbers[1] + "-" + numbers[0];
}

export function formatDate(argDate) {
  const slicedDate = argDate.slice(0, 10);
  const numbers = slicedDate.split("-");
  return numbers[2] + "-" + numbers[1] + "-" + numbers[0];
}

export function zeroToEmpty(num) {
  if (parseFloat(num) === 0) return "";
  return num;
}

export function zeroPad(num, places) {
  return String(num).padStart(places, "0");
}

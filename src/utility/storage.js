export function saveItem(key, value) {
  localStorage.setItem(key, value);
}

export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return "";
  }
}

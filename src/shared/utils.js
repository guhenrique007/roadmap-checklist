export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const toJson = content => JSON.stringify(content);

export const getItem = item => localStorage.getItem(item);

export const save = (key, content) => {
  localStorage.setItem(key, toJson(content))
}
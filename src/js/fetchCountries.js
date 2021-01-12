export default function fetchCountries(searchQuery) {
  return fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => onFilter(data, searchQuery))
    .catch(error => error.name);
}

function onFilter(arr, item) {
  return arr.filter(el => el.name.toLowerCase().includes(item.toLowerCase()));
}

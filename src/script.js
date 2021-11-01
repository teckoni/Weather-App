let now = new Date();

let h3 = document.querySelector("h3");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

h3.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
  }
  let apiKey = "f5dbd36ee03d5ec52c5fe18269ecf5a2";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial`;

  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let wholeTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let descElement = document.querySelector("#desc");
  let windElement = document.querySelector("#wind");

  temperatureElement.innerHTML = `${wholeTemp}`;
  descElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

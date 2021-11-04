let now = new Date();

let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

h3.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

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

function displayForecast(response) {
  let forecastDaily = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastDaily.forEach(function (forecastDays, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="forecast-day">${formatDay(forecastDays.dt)}</div>
      
      <img 
      src="http://openweathermap.org/img/wn/${
        forecastDays.weather[0].icon
      }@2x.png" 
      alt="forecastWeatherIcon" 
      id="forecastIcon" 
      width="60px"/>
      <div class="forecast-temp">${Math.round(forecastDays.temp.max)}°F</div>
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function showMetricTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  imperialLink.classList.remove("active");
  metricLink.classList.add("active");
  let metricTemp = ((imperialTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(metricTemp);
}

function showImperialTemp(event) {
  event.preventDefault();
  metricLink.classList.remove("active");
  imperialLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(imperialTemp);
}

function getForecast(coordinates) {
  let apiKey = "f5dbd36ee03d5ec52c5fe18269ecf5a2";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiURL}`).then(displayForecast);

  displayForecast();
}

function showTemperature(response) {
  let wholeTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let descElement = document.querySelector("#desc");
  let windElement = document.querySelector("#wind");

  imperialTemp = response.data.main.temp;

  temperatureElement.innerHTML = `${wholeTemp}`;
  descElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} MPH`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let imperialTemp = null;

let metricLink = document.querySelector("#metric-link");
metricLink.addEventListener("click", showMetricTemp);

let imperialLink = document.querySelector("#imperial-link");
imperialLink.addEventListener("click", showImperialTemp);

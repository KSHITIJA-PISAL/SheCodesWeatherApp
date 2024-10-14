let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
search("Paris");
function displayTemperature(response) {
  // cityElement.innerHTML = "Mumbai";
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  let weatherConditionElement = document.getElementById("weather-condition");
  weatherConditionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.getElementById("wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let temperatureIconElement = document.querySelector("div.icon");
  let icon = `<img src="${response.data.condition.icon_url}" alt="temperature-icon" class="current-temperature-icon"/>`;
  temperatureIconElement.innerHTML = icon;
}

function search(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

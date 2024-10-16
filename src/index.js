let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
search("Paris");
function displayTemperature(response) {
  // cityElement.innerHTML = "Mumbai";
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let weatherConditionElement = document.getElementById("weather-condition");
  let humidityElement = document.getElementById("humidity");
  let windElement = document.getElementById("wind");
  let temperatureIconElement = document.querySelector("div.icon");
  let icon = `<img src="${response.data.condition.icon_url}" alt="temperature-icon" class="current-temperature-icon"/>`;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  weatherConditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureIconElement.innerHTML = icon;

  getWeather(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function getWeather(city) {
  let apiKey = "56o2906a0t61a8ff7156f04abcebf432";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(weatherForecast);
}

function weatherForecast(response) {
  let weatherForecast = "";
  response.data.daily.forEach(function (day, index) {
    if (index != 0 && index < 6) {
      weatherForecast += `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = weatherForecast;
}

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
weatherForecast();

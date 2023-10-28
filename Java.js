function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  return days[day];
}

function dispalyForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `       <div class="col-2">
              <div class="forecastDay"> ${formatDay(forecastDay.time)} </div>
                 <img src=http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                   forecastDay.condition.icon
                 }.png  alt="" width="42" />
                <div class="forecastTemperture">
                <span class="weatherForecastMax"> ${Math.round(
                  forecastDay.temperature.maximum
                )}° </span>

                 <span class="weatherForecastMin"> ${Math.round(
                   forecastDay.temperature.minimum
                 )}° </span>

                </div>
             </div>
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "ct60b4ef8f613bo52b3607d5ab790c4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(dispalyForecast);
}

function showTemp(response) {
  let h1 = document.querySelector("#city");
  let h2 = document.querySelector("#temperture");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperture = Math.round(response.data.temperature.current);

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  h1.innerHTML = response.data.city;
  h2.innerHTML = celsiusTemperture;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForcast(response.data.coordinates);
}

function search(city) {
  let apiKey = "ct60b4ef8f613bo52b3607d5ab790c4c";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

function currentCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function getLocation(position) {
  console.log(position);

  let key = "ct60b4ef8f613bo52b3607d5ab790c4c";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&units=metric&key=${key}`;

  https: axios.get(url).then(showTemp);
}

function searchPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function fahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperture = (14 * 9) / 5 + 32;
  let tempertureElement = document.querySelector("#temperture");
  tempertureElement.innerHTML = Math.round(fahrenheitTemperture);
}

function celsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusElement = document.querySelector("#temperture");
  celsiusElement.innerHTML = celsiusTemperture;
}

let celsiusTemperture = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", currentCity);

let showLocation = document.querySelector("#current-location-button");
showLocation.addEventListener("click", searchPosition);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusTemp);

search("Tokyo");

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

function showTemp(response) {
  let h1 = document.querySelector("#city");
  let h2 = document.querySelector("#temperture");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperture = Math.round(response.data.main.temp);

  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  h1.innerHTML = response.data.name;
  h2.innerHTML = celsiusTemperture;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

function currentCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function getLocation(position) {
  let key = "6bfa54f242cbb59343d4e58db578dc61";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${key}`;

  axios.get(url).then(showTemp);
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

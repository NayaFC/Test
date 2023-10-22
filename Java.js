let now = new Date();
let currentTime = document.querySelector("#date");

let hour = now.getHours();
let minute = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let day = days[now.getDay()];

currentTime.innerHTML = `${day} ${hour}:${minute}`;

function showTemp(response) {
  let h1 = document.querySelector("#city");
  let temp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperture");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  h1.innerHTML = response.data.name;
  h2.innerHTML = `${temp} ℃`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", currentCity);

let showLocation = document.querySelector("#current-location-button");
showLocation.addEventListener("click", searchPosition);

search("Tokyo");

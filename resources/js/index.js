// Time and Date

let timeanddate = document.querySelector(".timeanddate");
console.log(timeanddate);

let now = new Date();

let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

timeanddate.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}:${seconds}`;

//----------------------------------//

//Change City & Temperature----------//

function displayWeatherCondition(response){
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML = response.data.weather[0].description;
  let temperatureElement = document.querySelector(".degrees")
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round (celsiusTemperature);
  let temperatureUnit = document.querySelector(".units");
  temperatureUnit.innerHTML = `ºC`
}

function search(city){
  let apiKey = "95f162609dd8746fc4a9169098a143e3";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function submitEvent(event){
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function displayFahrenheitTemperature (event){
  event.preventDefault();
  let temperatureElement = document.querySelector(".degrees");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let fahrenheitUnit = document.querySelector(".units");
  fahrenheitUnit.innerHTML = `ºF`;
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let celsiusUnit = document.querySelector(".units");
  celsiusUnit.innerHTML = `ºC`; 
}

let celsiusTemperature = null;

search("Barcelona");

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitEvent);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperature);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", displayCelsiusTemperature);


// Get the current location ---------//

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position){
  let apiKey = "95f162609dd8746fc4a9169098a143e3";
  let apiURL =`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", getCurrentLocation);































// Time and Date

/*let timeanddate = document.querySelector(".timeanddate");
console.log(timeanddate);

let now = new Date();

let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

let months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

timeanddate.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}:${seconds}`;
*/

//date since 1970 

function formatDate(timestamp){
 let date = new Date(timestamp);
 let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
 ];
 let day = days[date.getDay()];
 return `${day} ${formatHours(timestamp)}`;
}


function formatHours(timestamp){
 let date = new Date(timestamp);
 let hours = date.getHours();
 if (hours < 10) {
  hours = `0${hours}`;
 }
 let minutes = date.getMinutes();
 if (minutes < 10) {
   minutes = `0${minutes}`;
 }
 return `${hours}:${minutes}`;
}


//----------------------------------//

//Change City & Temperature----------//

function displayWeatherCondition(response){
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  let temperatureElement = document.querySelector(".degrees")
  dateElement = document.querySelector("#date");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round (celsiusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let temperatureUnit = document.querySelector(".units");
  temperatureUnit.innerHTML = `ºC`
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt",response.data.weather[0].description);
  dateElement.innerHTML= formatDate(response.data.dt * 1000);
}

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 3; index++) {
   forecast = response.data.list[index];
   forecastElement.innerHTML += `
    <div class="column">
      <h4 class="hour-one">
       ${formatHours(forecast.dt * 1000)}
      </h4>
      <img class="weather-icon" 
      src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
      alt=""
      >
      <strong class="boldweather">${Math.round(forecast.main.temp_max)}º</strong>
      ${Math.round(forecast.main.temp_min)}º
    </div>
  `;
 }
}

function search(city){
  let apiKey = "95f162609dd8746fc4a9169098a143e3";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function submitEvent(event){
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

//-----------------------------------------//

//-----Change from Celsius to Fahrenheit and vice versa------//

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

//----Global Variables----//

let celsiusTemperature = null;

search("Barcelona");

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitEvent);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperature);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", displayCelsiusTemperature);

//--------------------------------------------------------//

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































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
  document.querySelector(".description").innerHTML = response.data.weather[0].main;
  let temp = Math.round(response.data.main.temp);
  document.querySelector(".degrees").innerHTML = `${temp}ºC`
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

search("Barcelona");

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitEvent);

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

//testinggithub





























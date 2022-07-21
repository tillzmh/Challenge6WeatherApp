//variaubles
const apiKey = "e4ce42a714cb9c3a4f80a484e0b90750";
const daysForecast = 5;
const storageName = "cities";
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const textInput = document.querySelector("input");
const main = document.querySelector("main");
const nav = document.querySelector("nav");

//eventlistenrr
document.querySelector("aside > button").addEventListener("click", getWeather);
function getSavedWeather(event){
    let cityName = event.target.textContent;
    textInput.value=CityName;
    getWeather();
}
//the event will be the click event. -- event.target is the button thats being clicked on. -- event.target.texevent is the text that will appear 
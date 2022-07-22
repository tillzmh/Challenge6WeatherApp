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

updateNav();

async function getWeather(){
    const city = textInput.value.trim().replace(/\s{2,}/g, " ");// removes extra spaces
    if (!city) return; 
    const data = await getNameAndCoordFromCityName(city);
    if(addToData(data.name)){
        updateNav();
    }
    const weatherData = await getWeatherFromCoord(data.coord);
    updateView(data.name,weatherData);
    textInput.value="";
}

// api calls 

async function getNameAndCoordFromCityName (city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`); // get api from openweathermap
    const json = await response.json();//convert response into json
    return {name: json.name, coord: json.coord};//retuning the coords 
}
async function getWeatherFromCoord(coord){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=imperial`);
    const json = await response.json();
    return json;
}

//api output

function updateView(city, weatherData){
	console.log(city, weatherData);
	const weather = weatherData.current.weather[0].main,
		  icon = weatherData.current.weather[0].icon,
		  temp = weatherData.current.temp,
		  humidity = weatherData.current.humidity,
		  windSpeed = weatherData.current.wind_speed,
		  uvi = weatherData.current.uvi,
		  date = (new Date()).toLocaleDateString();
	let uviSeverity;
	if (uvi < 3) uviSeverity = "low";
	else if (uvi < 6) uviSeverity = "moderate";
	else if (uvi < 8) uviSeverity = "high";
	else if (uvi < 11) uviSeverity = "veryHigh";
	else uviSeverity = "extreme";
	var html = `
        <section>
            <h2>${city}, ${date}</h2>
            <h3>${weather} <img src="http://openweathermap.org/img/w/${icon}.png" /></h3>
            <p>Temp: ${temp}&deg;F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed}MPH</p>
            <p>UVI: <span class="uviSeverity ${uviSeverity}">${uvi}</span></p>
        </section>
        <section>
    `;
	for (let i=1; i<=daysForecast; i++){
		let forecast = weatherData.daily[i],
			forecastDate = (new Date(forecast.dt*1000)).toLocaleDateString(),
			forecastWeather = forecast.weather[0].main,
			forecastIcon = forecast.weather[0].icon,
			forecastTemp = forecast.temp.day,
			forecastHumidity = forecast.humidity,
			forecastWindSpeed = forecast.wind_speed;
		html += `
            <div>
                <h4>${forecastDate}</h4>
                <h3>${forecastWeather} <img src="http://openweathermap.org/img/w/${forecastIcon}.png" /></h3>
                <p>Temp: ${forecastTemp}&deg;F</p>
                <p>Humidity: ${forecastHumidity}%</p>
                <p>Wind Speed: ${forecastWindSpeed}MPH</p>
            </div>
        `;
	}
	html += "</section>";
	main.innerHTML = html;
}

function updateNav(){ // grab data from local storage 
    let cities = getData(); 
    html = "";
    for (let city of cities){ // looping through the cities 
        html += `button>${city}</button>`;
    } 

}

function getData(){
    let data = localStorage.getItem(storageName);
    if (data) return JSON.parse(data);
    return[];
}

function addToData(city){
	let data = getData();
	if (!data.includes(city)){
		data.unshift(city);
		localStorage.setItem(storageName, JSON.stringify(data));
		return true;
	}
	return false;
}


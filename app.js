//weather application

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e4a2aaf597baff95ba62b8fa2cb75e56";

weatherForm.addEventListener("submit", async event => {

  event.preventDefault();
  
  const city = cityInput.value;

  if(city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);


    }

    catch(error){
      console.error(error);
      displayError(error);



    }

  }
  else{
    displayError("Please enter a city");
  }


});

async function getWeatherData(city) {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


  const response = await fetch(apiUrl);

  if(!response.ok) {
    throw new Error("Could not Fetch Weather Data");

  }

  return await response.json();

  console.log(response);

  

}


function displayWeatherInfo(data) {

  const {name: city,
    main: {temp,humidity},
    weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("h1");
    const descriptionDisplay = document.createElement("h1");
    const weatherEmoji = document.createElement("h1");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp -273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descriptionDisplay");
    weatherEmoji.classList.add("weatherEmoji");



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherEmoji);






}

function getWeatherEmoji(weatherID) {

  switch(true) {
    case(weatherID >= 200 && weatherID < 300):
    return "⛈";

    case(weatherID >= 300 && weatherID < 400):
    return "🌧";

    case(weatherID >= 500 && weatherID < 600):
    return "🌧";

    case(weatherID >= 600 && weatherID < 700):
    return "❄️";

    case(weatherID >= 700 && weatherID < 800):
    return "☁️";

    case(weatherID === 800):
    return "☀️";

    case(weatherID >= 801 && weatherID < 810):
    return "☁️";

    default: 
    return "?";

  }

}
function displayError(message) {

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);



}

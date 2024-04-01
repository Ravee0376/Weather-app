function connect() {
    var searchTerm = document.getElementById("searchBox").value;
    document.getElementById("searchBox").value = "";
    let url = `https://restcountries.com/v3.1/name/${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayCountries(data));
}

function displayCountries(countries) {
    var container = document.getElementById("container");
    container.textContent = ""; 

    for (var i = 0; i < countries.length; i++) {
        var country = countries[i];
        var countryDiv = document.createElement("div");
        countryDiv.classList.add("innerStyle");

        countryDiv.innerHTML = `
            <p>Country Name: <b>${country.name.common}</b></p><p>Capital: ${country.capital}</p></br>
            <button class="more-details-btn" onclick="showMoreDetails('${country.name.common}')">More Details</button>
        `;

        container.appendChild(countryDiv);
    }
}

function showMoreDetails(searchTerm) {
    window.location.href = `country-details.html?countryName=${encodeURIComponent(searchTerm)}`;
}

function displayCountryDetails(searchTerm) {
    var detailsContainer = document.getElementById("details-container");
    detailsContainer.textContent = "";

    var countryinfodiv = document.createElement("div");

    fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            var country = data[0];
            countryinfodiv.innerHTML = `
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <p>Population: ${country.population.toLocaleString()}</p>
            `;
            countryinfodiv.classList.add("countrystyle");
            detailsContainer.appendChild(countryinfodiv);
        });
}

function searchWeather(searchTerm) {
    const apiKey = '15d62855a8cde5311ed5b82e995e2fd3'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}`;
   
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
          
        });
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weather-container');
    weatherDataDiv.textContent = "";
    const countryName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); 
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    
    const weatherInfo = document.createElement('div');
    weatherInfo.innerHTML = `
        <h2>${countryName}</h2>
        <p>Temperature: <span class="text-orange">${temperature}°C</span></p>
        <p>Weather: <span class="text-orange">${weatherDescription}</span></p>
        <p>Humidity: <span class="text-orange">${humidity}</span></p>
        <p>Wind Speed: <span class="text-orange">${windSpeed}</span></p>
    `;
    weatherInfo.classList.add("weather_style");
    weatherDataDiv.appendChild(weatherInfo);
}

function clearContainers() {
    var detailsContainer = document.getElementById("details-container");
    var weatherContainer = document.getElementById("weather-container");
    
    detailsContainer.textContent = "";
    weatherContainer.textContent = "";
}

function initializePage(countryName) {
    clearContainers(); 
    displayCountryDetails(countryName);
    searchWeather(countryName);
}

// Function to retrieve query parameter from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize page with country details and weather
initializePage(getQueryParam('countryName'));

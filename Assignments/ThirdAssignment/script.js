document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "1ecd1067d79b4516a5044330231009"; // Replace with your API key

    // Get references to DOM elements
    const cityElement = document.getElementById("city");
    const weatherInfoElement = document.getElementById("weather-info");
    const cityInput = document.getElementById("city-input");
    const fetchButton = document.getElementById("fetch-button");

    fetchButton.addEventListener("click", function () {
        const cityName = cityInput.value.trim();

        if (cityName === "") {
            alert("Please enter a city name.");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        // Make an XML HTTP request to fetch weather data
        const xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const weatherDescription = data.weather[0].description;
                const temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius

                // Update the DOM with weather information
                cityElement.textContent = cityName;
                weatherInfoElement.textContent = `Weather: ${weatherDescription}, Temperature: ${temperature}°C`;
            } else {
                console.error("Failed to fetch weather data");
            }
        };
        xhr.send();
    });
});

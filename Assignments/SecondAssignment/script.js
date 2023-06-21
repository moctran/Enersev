document.getElementById('weatherForm').addEventListener('submit', getWeatherForecast);

async function getWeatherForecast(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;

    if (location === '') {
        alert('Please enter a location.');
        return;
    }

    const apiKey = 'cf154ff5a10d48be88631521232106'; // Replace with your WeatherAPI API key
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeatherForecast(data);
    } catch (error) {
        console.log('Error:', error);
    }
}

function displayWeatherForecast(data) {
    const forecastDiv = document.getElementById('weatherData');
    forecastDiv.innerHTML = '';

    const forecastTitle = document.createElement('h2');
    forecastTitle.textContent = `Weather forecast for ${data.location.name}`;
    forecastDiv.appendChild(forecastTitle);

    data.forecast.forecastday.forEach(forecast => {
        const date = forecast.date;
        const condition = forecast.day.condition.text;
        const temp = forecast.day.avgtemp_c;

        const forecastItem = document.createElement('div');
        forecastItem.innerHTML = `
            <p>Date: ${date}</p>
            <p>Condition: ${condition}</p>
            <p>Temperature: ${temp}°C</p>
        `;
        forecastDiv.appendChild(forecastItem);
    });
}

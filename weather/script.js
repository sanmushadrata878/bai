// OpenWeatherMap API Configuration
const API_KEY = 'demo'; // Replace with your actual API key from openweathermap.org
const API_BASE = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherContent = document.getElementById('weatherContent');
const welcomeScreen = document.getElementById('welcomeScreen');
const recentCitiesDiv = document.getElementById('recentCities');
const citiesList = document.getElementById('citiesList');

// State
let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadRecentCities();
});

function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    locationBtn.addEventListener('click', handleLocationClick);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    }
}

function handleLocationClick() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoordinates(latitude, longitude);
            },
            () => {
                showError('Unable to get your location. Please check permissions.');
                hideLoading();
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

async function fetchWeatherByCity(city) {
    showLoading();
    clearError();

    try {
        const response = await fetch(
            `${API_BASE}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        addRecentCity(data.name, data.sys.country);
        displayWeather(data);
    } catch (error) {
        showError(`Error: ${error.message}. Please get an API key from openweathermap.org`);
        hideLoading();
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    showLoading();
    clearError();

    try {
        const response = await fetch(
            `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('Unable to fetch weather');
        }

        const data = await response.json();
        addRecentCity(data.name, data.sys.country);
        displayWeather(data);
    } catch (error) {
        showError(`Error: ${error.message}`);
        hideLoading();
    }
}

function displayWeather(data) {
    const {
        name,
        sys,
        main,
        weather,
        wind,
        clouds,
        visibility,
        dt
    } = data;

    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('lastUpdate').textContent = `Last updated: ${new Date(dt * 1000).toLocaleString()}`;
    document.getElementById('temperature').textContent = `${Math.round(main.temp)}°C`;
    document.getElementById('feelsLike').textContent = `Feels like: ${Math.round(main.feels_like)}°C`;
    document.getElementById('description').textContent = weather[0].description;
    document.getElementById('iconImage').src = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${wind.speed.toFixed(1)} m/s`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('sunrise').textContent = formatTime(sys.sunrise);
    document.getElementById('sunset').textContent = formatTime(sys.sunset);
    document.getElementById('sunriseTime').textContent = formatTime(sys.sunrise);
    document.getElementById('sunsetTime').textContent = formatTime(sys.sunset);
    document.getElementById('windDirection').textContent = getWindDirection(wind.deg || 0);
    document.getElementById('clouds').textContent = `${clouds.all}%`;

    const dewPoint = calculateDewPoint(main.temp, main.humidity);
    document.getElementById('dewPoint').textContent = `${dewPoint}°C`;

    const sunrise = new Date(sys.sunrise * 1000);
    const sunset = new Date(sys.sunset * 1000);
    const daylightHours = (sunset - sunrise) / (1000 * 60 * 60);
    document.getElementById('daylightDuration').textContent = `Daylight duration: ${Math.floor(daylightHours)}h ${Math.round((daylightHours % 1) * 60)}m`;

    updateSunPosition(sys.sunrise, sys.sunset, dt);

    welcomeScreen.style.display = 'none';
    weatherContent.style.display = 'block';
    hideLoading();
    cityInput.value = '';
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((degrees % 360) / 22.5);
    return directions[index % 16] + ` (${degrees}°)`;
}

function calculateDewPoint(temp, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return Math.round(dewPoint * 10) / 10;
}

function updateSunPosition(sunrise, sunset, currentTime) {
    const sunriseTime = sunrise * 1000;
    const sunsetTime = sunset * 1000;
    const now = currentTime * 1000;

    if (now < sunriseTime || now > sunsetTime) {
        const sunPosition = document.getElementById('sunPosition');
        sunPosition.style.left = '0%';
        return;
    }

    const totalDaylight = sunsetTime - sunriseTime;
    const elapsedTime = now - sunriseTime;
    const percentage = (elapsedTime / totalDaylight) * 100;
    const sunPosition = document.getElementById('sunPosition');
    sunPosition.style.left = `calc(${percentage}% - 15px)`;
}

function addRecentCity(city, country) {
    const cityName = `${city}, ${country}`;
    recentCities = recentCities.filter(c => c !== cityName);
    recentCities.unshift(cityName);
    recentCities = recentCities.slice(0, 10);
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    loadRecentCities();
}

function loadRecentCities() {
    if (recentCities.length === 0) {
        recentCitiesDiv.style.display = 'none';
        return;
    }

    recentCitiesDiv.style.display = 'block';
    citiesList.innerHTML = '';

    recentCities.forEach(city => {
        const tag = document.createElement('div');
        tag.className = 'city-tag';
        tag.textContent = city;
        tag.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeatherByCity(city.split(',')[0]);
        });
        citiesList.appendChild(tag);
    });
}

function showLoading() {
    loadingSpinner.style.display = 'flex';
    weatherContent.style.display = 'none';
    welcomeScreen.style.display = 'none';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}
# 🌤️ Weather Dashboard

A modern, fully-featured weather dashboard that fetches real-time data from OpenWeatherMap API. Display comprehensive weather information for any city worldwide with beautiful visualizations.

## Features

✨ **Key Features:**
- 🔍 Search weather for any city worldwide
- 📍 Auto-detect your location
- 🌡️ Real-time temperature and conditions
- 💾 Recent search history (saved locally)
- 📊 Detailed weather metrics (humidity, pressure, wind, etc.)
- 🌅 Sunrise/Sunset times with visual indicator
- 📈 Comprehensive weather data visualization
- 📱 Fully responsive design
- 🎨 Beautiful gradient UI with smooth animations
- ⚡ Fast and lightweight

## Installation & Setup

### 1. Get an API Key
- Go to [OpenWeatherMap](https://openweathermap.org/api)
- Sign up for a free account
- Get your free API key
- Copy the API key

### 2. Update API Key
Edit `script.js` and replace the API key:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace 'demo' with your key
```

### 3. Run the Application
Simply open `index.html` in your web browser. That's it!

## How to Use

### Search for a City
1. Type city name in the search box
2. Click "Search" button or press Enter
3. Weather data will load and display

### Use Your Location
1. Click the 📍 button
2. Allow geolocation permission when prompted
3. Weather for your current location will display

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and flexbox
- **JavaScript ES6+** - Async/await, fetch API
- **OpenWeatherMap API** - Real weather data
- **LocalStorage API** - Recent search persistence
- **Geolocation API** - Auto-location detection

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

## License

Open source and available for personal and commercial use.

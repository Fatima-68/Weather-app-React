import { useState, useEffect } from "react";
import { WeatherApi } from "./hooks/WeatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import RecentSearches from "./components/RecentSearches";
import WeatherBackground from "./components/WeatherBackground";

// Helper to set fallback background
const getFallbackBackground = (weatherData) => {
  if (!weatherData) return 'bg-gradient-to-tr from-sky-400 to-indigo-600';
  const desc = weatherData.weather[0].description.toLowerCase();
  if (desc.includes('cloud')) return 'bg-cloudy';
  if (desc.includes('rain')) return 'bg-rainy';
  if (desc.includes('clear') || desc.includes('sun')) return 'bg-sunny';
  if (desc.includes('snow')) return 'bg-snowy';
  if (desc.includes('fog') || desc.includes('haze') || desc.includes('mist') || desc.includes('smoke')) return 'bg-hazy';
  return 'bg-gradient-to-tr from-sky-400 to-indigo-600';
};

function App() {
  const [unit, setUnit] = useState('metric');
  const [lastCity, setLastCity] = useState('');
  const { weatherData, error, fetchWeather } = WeatherApi();

  // 🔁 Refetch weather when unit changes
  useEffect(() => {
    if (lastCity) {
      fetchWeather(lastCity, unit);
    }
  }, [unit]);

  const handleSearch = (city) => {
    setLastCity(city);
    fetchWeather(city, unit);
  };

  return (
    <div className={`min-h-screen ${getFallbackBackground(weatherData)} transition-all duration-700 relative`}>
      {weatherData && <WeatherBackground description={weatherData.weather[0].description} />}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      <div className="relative z-10 p-6 max-w-4xl mx-auto bg-white/10 rounded-xl shadow-xl backdrop-blur-lg animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Weather App</h1>
          <p className="mb-6 text-lg">Get current weather conditions for any city</p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setUnit('metric')}
            className={`px-4 py-2 rounded-full border ${unit === 'metric' ? 'bg-white text-black' : 'bg-transparent text-white border-white'} hover:bg-white hover:text-black transition`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-4 py-2 rounded-full border ${unit === 'imperial' ? 'bg-white text-black' : 'bg-transparent text-white border-white'} hover:bg-white hover:text-black transition`}
          >
            °F
          </button>
        </div>

        {error && <p className="text-red-200 mt-4 text-center">{error}</p>}

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {weatherData && <WeatherCard data={weatherData} unit={unit} />}
          <RecentSearches onSelect={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default App;

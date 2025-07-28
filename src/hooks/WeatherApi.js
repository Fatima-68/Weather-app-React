import { useState } from 'react';

const API_KEY = '460c82561ede93a60bf9684234788d70';
export const WeatherApi = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city, units = 'metric') => {
    try {
      setError(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error();
      setWeatherData(data);

      const previous = JSON.parse(localStorage.getItem('recent') || '[]');
      const updated = [city, ...previous.filter((c) => c !== city)].slice(0, 5);
      localStorage.setItem('recent', JSON.stringify(updated));
    } catch {
      setError("City not found or something went wrong.");
      setWeatherData(null);
    }
  };

  return { weatherData, error, fetchWeather };
};

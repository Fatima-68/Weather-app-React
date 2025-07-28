const WeatherCard = ({ data, unit }) => {
  const { name, main, weather, wind, visibility } = data;
  return (
    <div className="card w-full md:w-2/3">
      <h2 className="text-3xl font-bold mb-1">{name}</h2>
      <p className="text-sm text-gray-500 mb-3">Demo Region, Demo Country</p>
      <p className="text-6xl font-extrabold mb-2">{main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full inline-block font-semibold">{weather[0].description}</p>
      <p className="text-sm text-gray-600 mt-2">Feels like {main.feels_like}°{unit === 'metric' ? 'C' : 'F'}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
        <div>
          <p className="font-medium">Wind</p>
          <p>{wind.speed} {unit === 'metric' ? 'km/h' : 'mph'}</p>
        </div>
        <div>
          <p className="font-medium">Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div>
          <p className="font-medium">Visibility</p>
          <p>{visibility / 1000} km</p>
        </div>
        <div>
          <p className="font-medium">UV Index</p>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

const getWeatherIcon = (weather: string) => {
  const w = weather.toLowerCase();
  if (w.includes('sun')) return '☀️';
  if (w.includes('cloud')) return '☁️';
  if (w.includes('rain')) return '🌧️';
  if (w.includes('storm')) return '⛈️';
  if (w.includes('snow')) return '❄️';
  return '🌤️';
};

export  const Weather = ({ temperature, weather, location }: WeatherProps) => {
  const icon = getWeatherIcon(weather);

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
          🌍 Weather
        </h2>
        <span className="text-xs text-neutral-400">Live</span>
      </div>


      <div className="mb-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">
        {location}
      </div>


      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>

        <div>
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {temperature}°C
          </div>
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {weather}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-neutral-400">
        Updated just now
      </div>
    </div>
  );
};

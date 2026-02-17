export const WeatherResponse = ({ data }: any) => {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-sm text-neutral-500">Weather</div>
      <div className="text-lg font-bold">{data.location}</div>
      <div className="text-3xl">{data.temperature}°C</div>
      <div className="text-sm">{data.weather}</div>
    </div>
  );
};
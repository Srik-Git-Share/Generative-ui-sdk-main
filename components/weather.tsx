import { IfxButton, IfxCard, IfxCardHeadline, IfxCardImage, IfxCardLinks,} from '@infineon/infineon-design-system-react';


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


export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  const icon = getWeatherIcon(weather);


  return (
    <div>
      <IfxCard direction="vertical" href="" target="_blank" aria-label="Card">
        <IfxCardImage slot="img" position="" src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Latte_and_dark_coffee.jpg" alt="Coffee"></IfxCardImage>
            {weather} in {location}
          <IfxCardHeadline>
            {temperature}°C {icon}
            </IfxCardHeadline>
          <IfxCardLinks slot="buttons">
              <IfxButton variant="primary">Button</IfxButton>
              <IfxButton variant="secondary">Button</IfxButton>
          </IfxCardLinks>
      </IfxCard>
    </div>
  );
};
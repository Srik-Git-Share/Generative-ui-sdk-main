import { IfxButton, IfxCard, IfxCardHeadline, IfxCardImage, IfxCardLinks,IfxCardOverline} from '@infineon/infineon-design-system-react';
import sunny from '../public/sunny.jpg';
import Image from 'next/image';

export type WeatherProps = {
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
    <div className='bg-blue-400'>
      <IfxCard direction="vertical" href="" target="_blank" aria-label="Card">
        <div className='items-center my-auto'>
          <div className='flex flex-col w-full items-center justify-center mb-4'>
              <Image className='rounded-full' src={sunny} alt="Sunny Weather" width={200} height={200} />
          </div>
          {/* <span></span> */}
          <div className='flex flex-col items-center justify-center text-center'>
            <IfxCardOverline>
              {weather} in {location}
            </IfxCardOverline>
            <IfxCardHeadline>
                {temperature}°C {icon}
            </IfxCardHeadline>
          </div>
        </div>
      </IfxCard>
    </div>
  );
};
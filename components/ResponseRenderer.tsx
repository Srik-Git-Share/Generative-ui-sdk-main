import { ChartResponse } from './ChartResponse';
import { TableResponse } from './TableResponse';
import { CardResponse } from './CardResponse';
import { WeatherResponse } from './WeatherResponse';
import { PowerLossWidget } from './PowerLossWidget';

export const ResponseRenderer = ({ toolResult }: any) => {
  if (!toolResult?.type) return null;

  console.log('Rendering tool result of type:', toolResult.type);

  switch (toolResult.type) {
    case 'weather':
      return <WeatherResponse data={toolResult} />;

    case 'chart':
      return <ChartResponse data={toolResult} />;

    case 'table':
      return <TableResponse data={toolResult} />;

    case 'card':
      return <CardResponse data={toolResult} />;

    case 'powerLossSimulator':
      return <PowerLossWidget data={toolResult} />;

    default:
      return null;
  }
};

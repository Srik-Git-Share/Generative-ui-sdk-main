import { ChartResponse } from './ChartResponse';
import { TableResponse } from './TableResponse';
import { CardResponse } from './CardResponse';
import { WeatherResponse } from './WeatherResponse';

export const ResponseRenderer = ({ toolResult }: any) => {
  if (!toolResult?.type) return null;

  switch (toolResult.type) {
    case 'weather':
      return <WeatherResponse data={toolResult} />;

    case 'chart':
      return <ChartResponse data={toolResult} />;

    case 'table':
      return <TableResponse data={toolResult} />;

    case 'card':
      return <CardResponse data={toolResult} />;

    default:
      return null;
  }
};

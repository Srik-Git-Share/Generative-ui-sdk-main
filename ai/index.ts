import { weatherTool } from './weather.tool';
import { chartTool } from './chart.tool';
import { tableTool } from './table.tool';
import { cardTool } from './card.tool';

export const tools = {
  displayWeather: weatherTool,
  generateChart: chartTool,
  generateTable: tableTool,
  generateCard: cardTool,
};

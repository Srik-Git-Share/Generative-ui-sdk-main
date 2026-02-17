import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get weather for a location',
  inputSchema: z.object({
    location: z.string().describe("The location to get the weather"),
    // view: z.enum[['current','forecast']].describe()
    view: z.enum(['current', 'forecast']).describe('Display just current temp or 3-day forecast'),
  }),

  execute: async ({ location, view }) => {
    if (view === 'forecast') {
      return {
        view, 
        location,
        
        days: [
          { date: 'Today', temperature: 75, condition: 'Sunny' },
          { date: 'Tomorrow', temperature: 72, condition: 'Cloudy' },
          { date: 'Wed', temperature: 68, condition: 'Rainy' }
        ]
      };
    }
    
    return {
      type: 'weather',
      location,
      weather: 'Sunny',
      temperature: 32,
    };
  },
});

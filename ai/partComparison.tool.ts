import { z } from 'zod';
import { tool } from 'ai';
//import { dummyProducts } from './lib/infineon-data'; 
// Import your component (adjust path as needed)
//import PartComparisonTable from './components/PartComparisonTable'; 

export const partComparisonTool = tool({
    description: 'Render a sortable comparison table of Infineon MOSFETs. Call this when the user asks for part/MOSFET/silicon carbide switches recommendations or wants to compare components.',
    inputSchema: z.object({
      // We can ask the AI to formulate a specific recommendation message based on the user's prompt
      aiRecommendationMessage: z.string().describe('A SHORT and crisp message explaining why these IMZA120R020M1H,IMW120R040M1H, IMBG120R030M1H,IMZA120R060M1Hthese parts were chosen.'),
    }),
    execute: async ({ aiRecommendationMessage }) => {

      return {
        type: 'partComparison',
        aiRecommendationMessage,
      };
    },
});
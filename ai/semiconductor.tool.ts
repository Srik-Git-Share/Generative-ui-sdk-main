import { tool } from 'ai';
import { z } from 'zod';

export const powerLossTool = tool({
    description: 'Render a dynamic power loss simulator for a specific Infineon MOSFET. Use this when the user asks about efficiency or thermal performance.',
    inputSchema: z.object({
        productName: z.string().describe('The name of the MOSFET being simulated, e.g., IMZ120R045M1'),
        rdsOn: z.number().describe('The R_DS(on) resistance in Ohms at 25°C, e.g., 0.045'),
        eTotal: z.number().describe('Total switching energy (E_on + E_off) in milliJoules (mJ), e.g., 1.2'),
        maxCurrent: z.number().describe('The maximum current to display on the X-axis graph, e.g., 50'),
    }),

    execute: async ({ productName, rdsOn, eTotal, maxCurrent }) => {
      return {
        type: 'powerLossSimulator',
        productName,
        rdsOn,
        eTotal,
        maxCurrent,
      };
    }
});

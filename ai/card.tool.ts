import { tool } from 'ai';
import { z } from 'zod';

export const cardTool = tool({
description: `
Use this tool to display KPI metrics or summary values in card UI.
`,

  inputSchema: z.object({
    title: z.string(),
    value: z.string(),
    trend: z.string().optional(),
  }),
  execute: async ({ title, value, trend }) => {
    return {
      type: 'card',
      title,
      value,
      trend,
    };
  },
});

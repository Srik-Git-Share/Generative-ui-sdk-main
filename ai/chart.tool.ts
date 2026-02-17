import { tool } from 'ai';
import { z } from 'zod';

export const chartTool = tool({
description: `
Use this tool to display charts, graphs, or any visual analytics.
Do NOT describe charts in text.
`,

  inputSchema: z.object({
    title: z.string(),
    labels: z.array(z.string()),
    values: z.array(z.number()),
  }),
  execute: async ({ title, labels, values }) => {
    return {
      type: 'chart',
      chartType: 'bar',
      title,
      labels,
      values,
    };
  },
});

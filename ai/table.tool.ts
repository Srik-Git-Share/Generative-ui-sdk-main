import { tool } from 'ai';
import { z } from 'zod';

export const tableTool = tool({
   description: `
Use this tool to display ANY structured or list data in a table UI.
NEVER output markdown tables in text.
ALWAYS use this tool for rows and columns.
`,
  inputSchema: z.object({
    columns: z.array(z.string()),
    rows: z.array(z.array(z.union([z.string(), z.number()])))

  }),
 execute: async (args) => {
  console.log('TABLE TOOL ARGS:', JSON.stringify(args, null, 2));
  return {
    type: 'table',
    ...args,
  };
},
});

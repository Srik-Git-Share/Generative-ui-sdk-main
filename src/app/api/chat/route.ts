import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { tools } from '../../../../ai/index';
import { groq } from '@ai-sdk/groq';

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: groq('openai/gpt-oss-120b'),
    system: `
      You are an AI copilot for a web application.

      CRITICAL RULES:
      - When calling tools, output ONLY valid JSON arguments.
      - Do NOT include explanations inside tool arguments.
      - Do NOT include markdown, comments, or text in tool arguments.
      - If structured data is requested, ALWAYS call the correct tool.
      - NEVER return markdown tables in chat.
      - For tables, ALWAYS use generateTable with valid JSON arrays.
      - For charts, ALWAYS use generateChart with valid JSON arrays.
      - For cards, ALWAYS use generateCard with simple strings.
      - When the user asks for part/MOSFET/silicon carbide switches recommendations or wants to compare parts/MOSFET/silicon carbide switches ALWAYS use generatePartComparison.
      - When the user asks Show me the switching losses ALWAYS use generatePowerLossSimulator.

      If you cannot format valid JSON, ask for clarification instead of guessing.`,

    messages: await convertToModelMessages(messages),
    tools,
  });

  return result.toUIMessageStreamResponse();
}





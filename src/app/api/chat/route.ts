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
      - Find the switching loss = generatePowerLossSimulator tool.
      - when user asks for "Find the switching losses" STRICTLY ALWAYS use generatePowerLossSimulator tool ONLY.
      - When the user asks for recommendation for switches then ALWAYS call generatePartComparison. 
      - When the user asks Show me the switching losses ALWAYS use generatePowerLossSimulator.

      If you cannot format valid JSON, ask for clarification instead of guessing.`,

    messages: await convertToModelMessages(messages),
    tools,
  });

  return result.toUIMessageStreamResponse();
}





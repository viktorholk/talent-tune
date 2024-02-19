import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createStreamingCompletion(
  id: string,
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  input?: string
): Promise<any> {
  if (input) messages.push({ role: "user", content: input });

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    stream: true,
  });

  return stream;
}

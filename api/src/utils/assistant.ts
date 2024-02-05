import OpenAI from "openai";

import RedisStore from "@/utils/redis-store";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createCompletion(
  id: string,
  input: string,
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
): Promise<string> {
  messages.push({ role: "user", content: input });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  const response = completion.choices[0].message.content as string;

  messages.push({ role: "system", content: response });

  await RedisStore.client.set(`conversation:${id}`, JSON.stringify(messages));

  return completion.choices[0].message.content as string;
}

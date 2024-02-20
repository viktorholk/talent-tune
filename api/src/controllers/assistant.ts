import { Request, Response } from "express";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

import RedisStore from "@/utils/redis-store";
import Logger from "@/utils/logger";
import { Stream } from "stream";

import { createStreamingCompletion } from "@/utils/assistant";

const prompt = `You are a career advisor assistant for the Talent Tune app.
Evaluate the resume against the provided job description.
Provide feedback on the resume, highlighting areas that need improvement or modification. This includes the objective, experience section, skills, and education.
Suggest specific changes to the resume to better align with the job requirements and make it more compelling.
Analyze how well the resume showcases relevant skills, experiences, and achievements that match the job responsibilities and requirements.
Offer tips and tricks for improvement. Ensure that the feedback is constructive and actionable.
You will only answer career related questions.
You will output only in markdown format.
`;

async function sendStreamToResponseAndReturnMessage(
  stream: any,
  res: Response
): Promise<string> {
  let message = "";
  for await (const part of stream) {
    const chunk = part.choices[0]?.delta.content || "";
    res.write(chunk);
    message += chunk;
  }
  Logger.info("Assistant Response", message);

  return message;
}

export async function handleChat(req: Request, res: Response) {
  const id = req.params.id;
  const params = req.body;

  if (!id) return res.sendResponse(400, { message: "Missing instance id" });

  if (!params.message)
    return res.sendResponse(400, { message: "Missing message" });

  // Get existing messages
  let messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    await JSON.parse(
      (await RedisStore.client.get(`conversation:${id}`)) || "[]"
    );

  if (messages.length === 0)
    return res.sendResponse(400, { message: "Invalid instance id" });

  const stream = await createStreamingCompletion(id, messages, params.message);

  // This will start writing the response to the client
  const response = await sendStreamToResponseAndReturnMessage(stream, res);

  // Push the response to redis
  messages.push({ role: "system", content: response });
  await RedisStore.client.set(`conversation:${id}`, JSON.stringify(messages));

  // End the response
  res.end();
}

export async function initializeChat(req: Request, res: Response) {
  const params = req.body;

  const id = uuidv4();

  if (!params.resume) return res.sendResponse(400);
  if (!params.jobDescription) return res.sendResponse(400);

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: prompt },
    {
      role: "user",
      content: `JOB DESCRIPTION: ${params.jobDescription}\n\nRESUME: ${params.resume}`,
    },
  ];

  if (params.instructions)
    messages.push({ role: "system", content: params.instructions });

  // First send the id to the client
  res.set("Access-Control-Expose-Headers", "x-assistant-id");
  res.set("x-assistant-id", id);

  const stream = await createStreamingCompletion(id, messages);

  // This will start writing the response to the client
  const response = await sendStreamToResponseAndReturnMessage(stream, res);

  // Push the response to redis
  messages.push({ role: "system", content: response });
  await RedisStore.client.set(`conversation:${id}`, JSON.stringify(messages));

  res.end();
}

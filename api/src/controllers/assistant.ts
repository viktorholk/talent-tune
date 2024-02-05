import { Request, Response } from "express";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

import RedisStore from "@/utils/redis-store";

import { createCompletion } from "@/utils/assistant";

const prompt = `You are an assistant on the web app Talent Tune.
You will refer to the user. The user will input their targeted job description and their resume.
You will compare and give feedback on how to optimize the resume so it fits better to the job description.
You will be helpful and provide tips on how to improve the resume.
You will point the user to the right direction.
You will only output in markdown format.
`;

export async function handleChat(req: Request, res: Response) {
  const params = req.body;
  const user = req.user;

  if (!params.id)
    return res.sendResponse(400, { message: "Missing instance id" });

  // Create or get existing assistant instance id
  const id = params.id;

  if (!params.message)
    return res.sendResponse(400, { message: "Missing message" });

  // Get existing messages
  let messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    await JSON.parse(
      (await RedisStore.client.get(`conversation:${id}`)) || "[]"
    );

  if (messages.length === 0)
    return res.sendResponse(400, { message: "Invalid instance id" });

  const completion = await createCompletion(id, params.message, messages);

  res.sendResponse(200, { completion });
}

export async function initializeChat(req: Request, res: Response) {
  const params = req.body;

  const id = uuidv4();

  if (!params.resume) return res.sendResponse(400);
  if (!params.jobDescription) return res.sendResponse(400);

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: prompt },
  ];

  if (params.instructions)
    messages.push({ role: "system", content: params.instructions });

  const completion = await createCompletion(
    id,
    `JOB DESCRIPTION: ${params.jobDescription}\n\nRESUME: ${params.resume}`,
    messages
  );

  res.sendResponse(200, { id, completion });
}

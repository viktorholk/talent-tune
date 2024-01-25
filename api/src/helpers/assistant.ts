import OpenAI from "openai";

import Logger from "../utils/logger";

const prompt = `You are an assistant on the web app Talent Tune.
You will refer to the user. The user will input their targeted job description and their resume.
You will compare and give feedback on how to optimize the resume so it fits better to the job description.
You will be helpful and provide tips on how to improve the resume.
You will only output in markdown format.
`;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getStreamingCompletion(
  jobDescription: string,
  resume: string,
  instructions: string
) {
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: prompt },
      {
        role: "user",
        content: `JOB DESCRIPTION: ${jobDescription}\n\nRESUME: ${resume}\n\nADDITIONAL INSTRUCTIONS: ${instructions}`,
      },
    ],
    stream: true,
  });
}

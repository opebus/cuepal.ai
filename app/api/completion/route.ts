import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request): Promise<Response> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
    return new Response(
      'Missing OPENAI_API_KEY – make sure to add it to your .env file.',
      {
        status: 400,
      }
    );
  }

  let { prompt } = await req.json();

  if (!prompt) {
    return new Response(
      'Missing prompt – make sure to include a prompt in your request body.',
      {
        status: 400,
      }
    );
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that helps students create quiz questions and flashcards for their study materials.',
      },
      {
        role: 'user',
        content: `Given these student notes: ${prompt}, generate 5 quiz questions related to the notes to test the students on their comprehension. Each question should be formatted as a separate JSON object in a list. Each object should have the structure: {"question": "Question text", "answers": ["Answer1", "Answer2", "Answer3", "Answer4"], "correct_answer": "CorrectAnswer"}. The final output should be a JSON array of these 5 question objects.`,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

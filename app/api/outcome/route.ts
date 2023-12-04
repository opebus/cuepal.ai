import prisma from "../../../lib/prisma";

export async function POST(req: Request): Promise<Response> {
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return new Response("Invalid JSON format in request body.", {
      status: 400,
    });
  }

  const { quiz_questions, flashcards, userID, sessionID } = body;

  if (!quiz_questions || !flashcards || !userID || !sessionID) {
    return new Response("Missing required fields in request body.", {
      status: 400,
    });
  }

  try {
    // Save each quiz question
    await Promise.all(
      quiz_questions.map((q: any) =>
        prisma.question.create({
          data: {
            content: q.question,
            answer: q.correct_answer,
            userID: userID,
            classSessionID: sessionID,
          },
        })
      )
    );

    // Save each flashcard
    await Promise.all(
      flashcards.map((fc) =>
        prisma.cueCard.create({
          data: {
            content: fc.term,
            answer: fc.definition,
            userID: userID,
            classSessionID: sessionID,
            // Add other necessary fields if needed
          },
        })
      )
    );

    return new Response("Data saved successfully", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      "An error occurred while saving data to the database.",
      {
        status: 500,
      }
    );
  }
}

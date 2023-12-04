import prisma from '../../../lib/prisma';

export async function POST(req: Request): Promise<Response> {
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return new Response('Invalid JSON format in request body.', {
      status: 400,
    });
  }

  const { quiz_questions, flashcards, notes, userId, sessionId, classId } =
    body;

  if (!quiz_questions || !flashcards || !notes || !userId || !sessionId) {
    return new Response('Missing required fields in request body.', {
      status: 400,
    });
  }

  try {
    await prisma.notes.create({
      data: {
        content: notes,
        userId,
        classSessionId: sessionId,
      },
    });

    // Save each quiz question
    await Promise.all(
      quiz_questions.map((q: any) =>
        prisma.question.create({
          data: {
            content: q.question,
            correctAnswer: q.correct_answer,
            options: q.options,
            explanation: q.explanation,
            userId,
            classSessionId: sessionId,
            classId,
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
            userId,
            classSessionId: sessionId,
            classId,
          },
        })
      )
    );

    return new Response('Data saved successfully', {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      'An error occurred while saving data to the database.',
      {
        status: 500,
      }
    );
  }
}

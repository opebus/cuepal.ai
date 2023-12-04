import prisma from "../../../lib/prisma";

export async function POST(req: Request): Promise<Response> {
  let classId: string | null = null;
  let sessionId: string | null = null;

  try {
    const body = await req.json();
    classId = body.classId || null;
    sessionId = body.sessionId || null;
  } catch (error) {
    return new Response("Invalid JSON format in request body.", {
      status: 400,
    });
  }

  if (!classId && !sessionId) {
    return new Response("Missing classId or sessionId parameter", {
      status: 400,
    });
  }
  console.log(classId, sessionId);
  try {
    let classSessions;
    if (sessionId) {
      // Fetch a specific session by sessionId
      classSessions = await prisma.classSession.findUnique({
        where: { id: sessionId },
      });
    } else {
      // Fetch all sessions for a class by classId
      classSessions = await prisma.classSession.findMany({
        where: { classID: classId },
        orderBy: { date: "desc" },
      });
    }

    return new Response(JSON.stringify(classSessions), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      "An error occurred while fetching the class sessions.",
      {
        status: 500,
      }
    );
  }
}

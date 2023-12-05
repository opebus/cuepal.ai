import prisma from "../../../lib/prisma";

export async function POST(req: Request): Promise<Response> {
  let userId: string;
  let classSessionId: string;

  try {
    ({ userId, classSessionId } = await req.json());
  } catch (error) {
    return new Response("Invalid JSON format in request body.", {
      status: 400,
    });
  }

  if (!userId || !classSessionId) {
    return new Response("Missing userId or classSessionId parameter", {
      status: 400,
    });
  }

  try {
    const cueCards = await prisma.question.findMany({
      where: {
        userId,
        classSessionId,
      },
    });

    return new Response(JSON.stringify(cueCards), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while fetching the questions.", {
      status: 500,
    });
  }
}

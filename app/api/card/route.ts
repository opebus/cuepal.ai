import prisma from "../../../lib/prisma";

export async function POST(req: Request): Promise<Response> {
  let userId: string;
  let classId: string;

  try {
    const body = await req.json();
    userId = body.userId;
    classId = body.classId;
  } catch (error) {
    return new Response("Invalid JSON format in request body.", {
      status: 400,
    });
  }

  if (!userId || !classId) {
    return new Response("Missing userId or classId parameter", {
      status: 400,
    });
  }

  try {
    const cueCards = await prisma.cueCard.findMany({
      where: {
        userId,
        classId,
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
    return new Response("An error occurred while fetching the cue cards.", {
      status: 500,
    });
  }
}

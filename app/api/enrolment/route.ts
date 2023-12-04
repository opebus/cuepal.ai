import prisma from "../../../lib/prisma";

export async function POST(req: Request): Promise<Response> {
  let userID: string;

  try {
    ({ userID } = await req.json());
  } catch (error) {
    return new Response("Invalid JSON format in request body.", {
      status: 400,
    });
  }

  if (!userID) {
    return new Response(
      "Missing userID – make sure to include a userID in your request body.",
      { status: 400 }
    );
  }

  try {
    const classEnrollments = await prisma.classEnrollment.findMany({
      where: { userID },
      select: {
        class: true,
      },
    });

    const classes = classEnrollments.map((enrollment) => enrollment.class);

    return new Response(JSON.stringify(classes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      "An error occurred while fetching the class enrollments.",
      {
        status: 500,
      }
    );
  }
}

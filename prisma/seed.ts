import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const jack = await prisma.user.create({
    data: {
      name: "Jackie Chan",
      role: "TEACHER",
    },
  });

  const alonzo = await prisma.user.create({
    data: {
      name: "Alonzo",
      role: "STUDENT",
    },
  });

  const class1 = await prisma.class.create({
    data: {
      name: "Mathematics 101",
      teacherID: jack.id,
    },
  });

  const classSession1 = await prisma.classSession.create({
    data: {
      date: new Date(),
      lessonPlan: "Introduction to Algebra",
      classFeeling: 5,
      classID: class1.id,
    },
  });

  await prisma.classEnrollment.create({
    data: {
      userID: alonzo.id,
      classID: class1.id,
    },
  });

  // Create a note without the question and cueCard fields
  await prisma.notes.create({
    data: {
      content:
        "Algebra is the study of mathematical symbols and the rules for manipulating these symbols.",
      userID: alonzo.id,
      classSessionID: classSession1.id,
    },
  });

  await prisma.question.create({
    data: {
      content: "What is Algebra?",
      answer:
        "A branch of mathematics dealing with symbols and the rules for manipulating those symbols.",
      userID: alonzo.id,
      classSessionID: classSession1.id,
    },
  });

  // Create a cue card
  await prisma.cueCard.create({
    data: {
      content: "Algebra Cue Card",
      answer: "Algebra Answer",
      userID: alonzo.id,
      classSessionID: classSession1.id,
    },
  });

  await prisma.analytics.create({
    data: {
      classSessionID: classSession1.id,
      averageFeeling: 4,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      // weichun
      id: "user_2Z4vio7J3QMiaWm2BrHdgVOkUHP",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      // ben
      id: "user_2Z19fTrqYrvXDEsmsbEJh8LhVd6",
    },
  });

  // Add seed data for other models like Class, ClassSession, etc.
  // Example:
  const class1 = await prisma.class.create({
    data: {
      name: "Physics 101",
      description: "Learn about the world around you!",
      teacher: {
        connect: { id: user2.id },
      },
    },
  });

  const classSession1 = await prisma.classSession.create({
    data: {
      date: new Date(),
      lessonPlan:
        "To provide students with an understanding of Albert Einstein's contributions to physics, specifically his theory of relativity and the photoelectric effect, and how these discoveries impacted science.",
      classId: class1.id,
      transcript:
        "Today, let's explore the fascinating world of Albert Einstein, a revolutionary physicist born in 1879 in Germany. Despite early challenges in schooling, Einstein made groundbreaking contributions to physics. His most famous work, the theory of relativity, encapsulated in the equation E=mc^2, transformed our understanding of how mass and energy are interconnected. This theory also revolutionized our concepts of space and time, suggesting they are not constant but can vary. Additionally, Einstein's work on the photoelectric effect, proposing that light can behave as particles, laid the foundation for quantum mechanics. His profound insights into the nature of the universe earned him the Nobel Prize in Physics in 1921 and forever changed how we perceive the world around us.",
    },
  });

  await prisma.classEnrollment.create({
    data: {
      userId: user1.id,
      classId: class1.id,
    },
  });

  // Create a note without the question and cueCard fields
  await prisma.notes.create({
    data: {
      content:
        "Algebra is the study of mathematical symbols and the rules for manipulating these symbols.",
      userId: user1.id,
      classSessionId: classSession1.id,
    },
  });

  await prisma.question.create({
    data: {
      content: "What is Algebra?",
      answer:
        "A branch of mathematics dealing with symbols and the rules for manipulating those symbols.",
      userId: user2.id,
      classSessionId: classSession1.id,
      classId: class1.id,
    },
  });

  // Create a cue card
  await prisma.cueCard.create({
    data: {
      content: "Algebra Cue Card",
      answer: "Algebra Answer",
      userId: user1.id,
      classSessionId: classSession1.id,
      classId: class1.id,
    },
  });

  await prisma.analytics.create({
    data: {
      classSessionId: classSession1.id,
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

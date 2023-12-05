import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      // weichun
      id: 'user_2Z4vio7J3QMiaWm2BrHdgVOkUHP',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      // ben
      id: 'user_2Z19fTrqYrvXDEsmsbEJh8LhVd6',
    },
  });

  // Add seed data for other models like Class, ClassSession, etc.
  // Example:
  const class1 = await prisma.class.create({
    data: {
      name: 'Physics 101',
      description: 'Learn about the world around you!',
      teacher: {
        connect: { id: user2.id },
      },
    },
  });

  const class2 = await prisma.class.create({
    data: {
      name: 'Biology 101',
      description: 'Learn about animals and humans!',
      teacher: {
        connect: { id: user2.id }, // Assuming the same teacher
      },
    },
  });

  const classSession1 = await prisma.classSession.create({
    data: {
      date: new Date(), // Current date or a specific date for the session
      lessonPlan:
        "This lesson aims to introduce students to Sir Isaac Newton's law of universal gravitation and its significance in classical mechanics. Students will learn about Newton's groundbreaking work in understanding gravity and its effects on celestial bodies, as well as on objects on Earth.",
      classId: class1.id,
      transcript:
        "Today we delve into the work of Sir Isaac Newton, one of the most influential scientists in history, born in 1642 in England. Newton's law of universal gravitation was revolutionary. It states that every point mass attracts every other point mass by a force acting along the line intersecting both points. This force is proportional to the product of their masses and inversely proportional to the square of the distance between them. Newton's work laid the foundation for classical mechanics and profoundly impacted our understanding of the universe. His theories not only explained the motion of celestial bodies but also brought a new understanding of the forces that govern motion and physical phenomena on Earth.",
    },
  });

  await prisma.classEnrollment.createMany({
    data: [
      {
        userId: user1.id,
        classId: class1.id,
      },
      {
        userId: user1.id,
        classId: class2.id,
      },
      {
        userId: user2.id,
        classId: class1.id,
      },
      {
        userId: user2.id,
        classId: class2.id,
      },
    ],
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

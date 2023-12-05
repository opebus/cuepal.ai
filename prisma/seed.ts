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
      name: 'Newton’s Law',
      lessonPlan:
        "This lesson aims to introduce students to Sir Isaac Newton's law of universal gravitation and its significance in classical mechanics. Students will learn about Newton's groundbreaking work in understanding gravity and its effects on celestial bodies, as well as on objects on Earth.",
      classId: class1.id,
      transcript:
        "Today we delve into the work of Sir Isaac Newton, one of the most influential scientists in history, born in 1642 in England. Newton's law of universal gravitation was revolutionary. It states that every point mass attracts every other point mass by a force acting along the line intersecting both points. This force is proportional to the product of their masses and inversely proportional to the square of the distance between them. Newton's work laid the foundation for classical mechanics and profoundly impacted our understanding of the universe. His theories not only explained the motion of celestial bodies but also brought a new understanding of the forces that govern motion and physical phenomena on Earth.",
    },
  });

  const classSession2 = await prisma.classSession.create({
    data: {
      date: new Date(), // You can change this to a specific date
      name: 'Kepler’s Laws of Planetary Motion',
      lessonPlan:
        "In this session, we'll explore Johannes Kepler's laws of planetary motion. Kepler's laws describe the motion of planets around the sun. The first law, known as the Law of Ellipses, states that planets orbit the sun in an elliptical path. The second law, the Law of Equal Areas, explains that a line joining a planet and the sun sweeps equal areas during equal intervals of time. The third law, the Law of Harmonies, shows that the square of the orbital period of a planet is directly proportional to the cube of the semi-major axis of its orbit. These laws were pivotal in the advancement of heliocentric models of the solar system and significantly influenced modern astronomy.",
      classId: class1.id,
      transcript:
        "Today, we turn our attention to Johannes Kepler, a key figure in the 17th-century scientific revolution. Kepler made significant contributions to our understanding of celestial mechanics, primarily through his laws of planetary motion. These laws were critical in validating the heliocentric model proposed by Copernicus and in challenging the long-held geocentric views. Kepler's work also laid the groundwork for Isaac Newton's law of universal gravitation. We'll explore how these laws describe the motion of planets and how they were instrumental in advancing our understanding of the solar system and beyond.",
    },
  });

  const classSession3 = await prisma.classSession.create({
    data: {
      date: new Date(), // You can change this to a specific date
      name: 'The Moon',
      lessonPlan:
        "This lesson will focus on Earth's natural satellite, the Moon. We will discuss its formation, its phases, and its impact on Earth, including tidal forces. The session will also cover lunar exploration, including the Apollo missions and recent lunar probes. Students will gain an understanding of the Moon's role in Earth's ecosystem and its significance in human exploration and scientific research.",
      classId: class1.id,
      transcript:
        "In today's class, we dive into understanding the Moon, an integral part of Earth's history and a key focus in the field of space exploration. The Moon has fascinated humanity for centuries, serving as a cornerstone for numerous myths and a critical focus for scientific inquiry. We'll explore theories about its formation, its influence on Earth through tidal forces, and the phases it undergoes. Additionally, we will discuss human endeavors to explore the Moon, highlighting the Apollo missions and the ongoing efforts to understand our closest celestial neighbor better. The Moon's role in shaping our world and its potential for future exploration makes it a captivating subject for study.",
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

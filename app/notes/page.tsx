'use client';

import TipTap from '../editor/TipTap';
import Scaffold from '../components/Scaffold';

const transcript = `Teacher: "Good morning, everyone! Today's lesson is about Sir Isaac Newton and his groundbreaking work on gravity, which is a fundamental force in our universe. Newton, who lived in the 17th century, was a mathematician and physicist, and he's most famous for formulating the Law of Universal Gravitation.

Let's start with the basics of gravity. Gravity is a force that attracts objects towards each other. It's what makes an apple fall from a tree to the ground and what keeps our feet firmly planted on the Earth.

Newton's Law of Universal Gravitation explains that every object in the universe attracts every other object. The force of this attraction depends on two main factors: the masses of the objects and the distance between them. The larger the mass, the stronger the gravitational pull. Conversely, the greater the distance between two objects, the weaker the gravitational force.

This law can be observed in everyday life. For example, when you throw a ball into the air, it comes back down because Earth's gravity pulls it towards the ground. Similarly, gravity is the reason why the moon orbits the Earth.

An interesting aspect of Newton's discovery is that it applies universally. This means that the same principles of gravity apply here on Earth as well as in distant galaxies.

Now, let's discuss the formula Newton developed. The gravitational force between two objects equals the product of their masses divided by the square of the distance between their centers, multiplied by the gravitational constant. This formula lets us calculate the exact force of gravity in different situations.

Newton’s work on gravity also helped explain planetary motion. Before Newton, the movement of planets was a mystery. His Law of Universal Gravitation showed that the same force pulling an apple to the ground also keeps the planets in orbit around the sun.

In summary, Newton's insights into gravity changed our understanding of the universe. His work laid the foundation for modern physics and astronomy, helping us understand everything from why objects fall to the ground to how planets move in space."
`;

export default function Home() {
  return (
    <Scaffold>
      <TipTap content={''} />
    </Scaffold>
  );
}

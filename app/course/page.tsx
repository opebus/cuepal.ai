"use client";

import Scaffold from "../components/Scaffold";
import {
  Grid,
  Text,
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const Home = () => {
  const [courses, setCourses] = useState<any>([]);
  const toast = useToast();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch("/api/enrolment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const classEnrollments = await response.json();
        setCourses(classEnrollments);
        console.log(classEnrollments);
      } catch (error) {
        console.error("Fetching class enrollments failed", error);
        toast({
          title: "An error occurred.",
          description: "Unable to load class enrollments.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    if (userId) fetchEnrollments();
  }, [userId]);

  return (
    <Scaffold>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
        p={5}
      >
        {courses.map((course: any) => (
          <Link href={`/session/${course.id}`} key={course.id}>
            <Card maxW="sm" borderRadius="lg">
              <CardBody m="auto">
                <Image src="/waves.jpeg" borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{course.name}</Heading>
                  <Text>{course.description}</Text>
                </Stack>
              </CardBody>
            </Card>
          </Link>
        ))}
      </Grid>
    </Scaffold>
  );
};

export default Home;

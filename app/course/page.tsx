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
  Box,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const Home = () => {
  const [courses, setCourses] = useState<any>([]);
  const toast = useToast();
  const [loading, setLoading] = useState(true); // Added state for loading

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
      } finally {
        setLoading(false); // End loading
      }
    };
    if (userId) fetchEnrollments();
  }, [userId]);

  return (
    <Scaffold>
      <Box bg="white" minH="full" borderRadius="lg" shadow="md" m={1} p={5}>
        <Heading as="h1" size="lg" mb={4}>
          My Courses
        </Heading>
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={4}
          p={5}
        >
          {loading
            ? Array(4)
                .fill("")
                .map((_, index) => (
                  <Box
                    key={index}
                    maxW="sm"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Skeleton height="10rem" /> {/* For Image */}
                    <Box p={4}>
                      <SkeletonText mt="4" noOfLines={1} spacing="4" />{" "}
                      {/* For Heading */}
                      <SkeletonText noOfLines={2} spacing="4" />{" "}
                      {/* For Description */}
                    </Box>
                  </Box>
                ))
            : courses.map((course: any) => (
                <Link href={`/session/${course.id}`} key={course.id}>
                  <Card maxW="sm" borderRadius="lg">
                    <CardBody m="auto">
                      <Image alt="wave" src="/waves.jpeg" borderRadius="lg" />
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{course.name}</Heading>
                        <Text>{course.description}</Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              ))}
        </Grid>
      </Box>
    </Scaffold>
  );
};

export default Home;

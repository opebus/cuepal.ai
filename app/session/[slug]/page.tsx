"use client";

import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, useToast } from "@chakra-ui/react";
import Scaffold from "../../components/Scaffold";
import Link from "next/link";

const CourseDetail = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [sessions, setSessions] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchCourseSessions = async () => {
      console.log("fetching course sessions");
      try {
        const response = await fetch("/api/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classId: slug }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setSessions(data);
      } catch (error) {
        console.error("Error fetching course sessions:", error);
        toast({
          title: "Error",
          description: "Failed to load course sessions.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchCourseSessions();
  }, []);

  return (
    <Scaffold>
      <VStack spacing={4} p={5}>
        <Heading as="h1">Course Sessions for {slug}</Heading>
        {sessions.map((session, index) => (
          <Link href={`/notes/${session.classId}/${session.id}`} key={index}>
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              width="100%"
              p={5}
            >
              <Text fontWeight="bold">
                Session {new Date(session.date).toLocaleDateString()}
              </Text>
            </Box>
          </Link>
        ))}
      </VStack>
    </Scaffold>
  );
};

export default CourseDetail;

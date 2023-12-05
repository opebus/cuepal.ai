"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  Flex,
  IconButton,
  Heading,
  Container,
  HStack,
  Spacer,
  Select,
  useToast,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Scaffold from "../components/Scaffold";
import { useAuth } from "@clerk/nextjs";

const FlashcardsComponent = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const toast = useToast();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch("/api/card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classId: currentCourse,
            userId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        toast({
          title: "An error occurred.",
          description: "Unable to load class flashcards.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    currentCourse != "" && fetchFlashcards();
  }, [currentCourse]);

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

  const handlePrevCard = () => {
    setCurrentCardIndex((index) =>
      index > 0 ? index - 1 : flashcards.length - 1
    );
    setShowAnswer(false);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((index) =>
      index < flashcards.length - 1 ? index + 1 : 0
    );
    setShowAnswer(false);
  };

  if (testMode) {
    const flashcard = flashcards[currentCardIndex];

    return (
      <Scaffold>
        <Box bg="white" minH="full" borderRadius="lg" shadow="md" m={1} p={5}>
          <Container centerContent>
            <VStack spacing={4} align="stretch" m={4} width="full">
              <Heading as="h1" size="xl" textAlign="center">
                Test Yourself
              </Heading>

              <Text color="gray" textAlign="center">
                Click to show answers
              </Text>

              <Box
                borderRadius="lg"
                p={5}
                bg="gray.700"
                color="white"
                width="600px" // Fixed width
                height="300px" // Fixed height
                boxShadow="dark-lg"
                onClick={() => setShowAnswer(!showAnswer)}
                cursor="pointer"
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                mb={4}
              >
                <Text fontSize="2xl">
                  {showAnswer ? flashcard.answer : flashcard.content}
                </Text>
              </Box>
              <Flex alignItems="center" justifyContent="space-around">
                <IconButton
                  aria-label="Previous card"
                  icon={<ChevronLeftIcon />}
                  onClick={handlePrevCard}
                  color="white"
                  bgColor="gray.500"
                  borderRadius="full"
                  _hover={{ bgColor: "gray.600" }}
                />
                <Text fontSize="xl">
                  {currentCardIndex + 1}/{flashcards.length}
                </Text>
                <IconButton
                  aria-label="Next card"
                  icon={<ChevronRightIcon />}
                  onClick={handleNextCard}
                  color="white"
                  bgColor="gray.500"
                  borderRadius="full"
                  _hover={{ bgColor: "gray.600" }}
                />
              </Flex>
              <Spacer />
              <Button
                colorScheme="gray"
                alignSelf="center"
                onClick={() => setTestMode(false)}
              >
                Back to Flashcards List
              </Button>
            </VStack>
          </Container>
        </Box>
      </Scaffold>
    );
  }

  return (
    <Scaffold>
      <Box bg="white" minH="full" borderRadius="lg" shadow="md" p={5}>
        <VStack spacing={4} align="stretch" m={10}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h1" size="xl">
              Flashcards
            </Heading>

            <HStack>
              <Select
                width={300}
                value={currentCourse}
                placeholder="Select class"
                onChange={(e) => setCurrentCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Select>
              <Button
                width={200}
                variant="outline"
                colorScheme="blue"
                onClick={() => setTestMode(true)}
              >
                Test Myself
              </Button>
            </HStack>
          </Flex>
          {flashcards.length == 0 && (
            <Text fontSize="xl" textAlign="center" marginTop={10}>
              Select a class to view flashcards
            </Text>
          )}
          {flashcards.map((flashcard, index) => (
            <HStack
              key={index}
              spacing={8}
              justifyContent="space-between"
              alignItems="flex-start"
              p={5}
              borderWidth="1px"
              borderRadius="lg"
            >
              <VStack align="stretch" width="50%">
                <Text fontSize="md" fontWeight="bold">
                  TERM
                </Text>
                <Text fontSize="lg">{flashcard.content}</Text>
              </VStack>
              <VStack align="stretch" width="50%">
                <Text fontSize="md" fontWeight="bold">
                  DEFINITION
                </Text>
                <Text fontSize="lg">{flashcard.answer}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Scaffold>
  );
};

export default FlashcardsComponent;

"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  RadioGroup,
  Stack,
  Image,
  Center,
  Container,
  useRadio,
  useRadioGroup,
  Spacer,
  Heading,
  Badge,
  HStack,
} from "@chakra-ui/react";
import Scaffold from "../../components/Scaffold";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function RadioCard(props) {
  const { getInputProps, htmlProps } = useRadio(props);
  const input = getInputProps();
  let borderColor = "gray.200";
  if (props.isChecked) {
    borderColor = props.isCorrect ? "green.500" : "red.500";
  }

  return (
    <Box as="label" {...htmlProps}>
      <input {...input} />
      <Box
        cursor="pointer"
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        boxShadow="md"
        fontSize="xl"
        _hover={{
          bg: "gray.50",
        }}
        px={5}
        py={3}
        bg={
          props.isChecked
            ? props.isCorrect
              ? "green.100"
              : "red.100"
            : "white"
        }
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Badge>{props.index}</Badge>
        {props.children}
      </Box>
    </Box>
  );
}

const QuizComponent = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("/api/question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, classSessionId: slug }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const questions = await response.json();
        setQuiz(questions);
        console.log(questions);
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
        // setLoading(false); // End loading
      }
    };
    if (userId) fetchQuiz();
  }, [userId]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "options",
    onChange: (value) => {
      if (!attempted) {
        setSelectedOption(value);
        const correct = value === quiz[currentQuestionIndex].correct_answer;
        setIsCorrect(correct);
        setAttempted(true);

        // Update score
        setScore({
          correct: score.correct + (correct ? 1 : 0),
          incorrect: score.incorrect + (correct ? 0 : 1),
        });
      }
    },
  });

  const group = getRootProps();
  const chartSeries = [score.correct, score.incorrect];
  const chartOptions = {
    labels: ["Correct", "Incorrect"],
    colors: ["#34D399", "#EF4444"], // green for correct, red for incorrect
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setIsCorrect(null);
    setScore({ correct: 0, incorrect: 0 });
    setQuizCompleted(false);
    setAttempted(false);
  };

  const handleNextQuestion = () => {
    if (attempted) {
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
        setIsCorrect(null);
        setAttempted(false);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const question = quiz[currentQuestionIndex];

  if (quizCompleted) {
    return (
      <Scaffold>
        <Box bg="white" minH="full" borderRadius="lg" shadow="md" m={1} p={5}>
          <Container maxW="full" centerContent marginTop={10}>
            <HStack spacing="50px" maxH="full">
              <VStack w="full">
                <Heading as="h1" size="xl" marginBottom={10}>
                  {score.correct > score.incorrect
                    ? "Great work!"
                    : "Try again!"}
                </Heading>
                <Text color="gray" size="sm">
                  You got {score.correct} out of {quiz.length} questions
                  correct.
                </Text>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                  height={"100%"}
                  width={380}
                />
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={handleTryAgain}
                >
                  Try Again
                </Button>
              </VStack>
              <Spacer />
              <Center w="full">
                <Image
                  src="/done.svg"
                  alt="Vector Art"
                  objectFit="cover"
                  boxSize="500px"
                />
              </Center>
            </HStack>
          </Container>
        </Box>
      </Scaffold>
    );
  }

  if (quiz.length > 0)
    return (
      <Scaffold>
        <Box bg="white" minH="full" borderRadius="lg" shadow="md" m={1} p={5}>
          <Container maxW="full" centerContent marginTop={20}>
            <HStack spacing="50px" maxH="full">
              <VStack spacing={5} align="stretch" m={4} w="3xl">
                <Heading as="h1" size="xl">
                  Question {currentQuestionIndex + 1} of {quiz.length}
                </Heading>
                <Text fontSize="2xl" fontWeight="bold">
                  {question.content}
                </Text>
                <RadioGroup value={selectedOption} {...group}>
                  <Stack spacing={4}>
                    {question.options.map((option, index) => {
                      const radio = getRadioProps({ value: option });
                      const isChecked = selectedOption === option;
                      return (
                        <RadioCard
                          key={option}
                          {...radio}
                          isChecked={isChecked}
                          isCorrect={isCorrect}
                          index={String.fromCharCode(65 + index)}
                        >
                          {option}
                        </RadioCard>
                      );
                    })}
                  </Stack>
                </RadioGroup>
                {attempted && (
                  <Text
                    color={isCorrect ? "green.500" : "red.500"}
                    fontSize="lg"
                    noOfLines={4} // This will cap the text to a maximum of 4 lines
                  >
                    {quiz[currentQuestionIndex].explanation}
                  </Text>
                )}
                <Spacer />
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={handleNextQuestion}
                  isDisabled={!attempted}
                >
                  Next question
                </Button>
              </VStack>
              <Spacer />
              <VStack maxH="full" p={4}>
                <Text fontSize="xl" fontWeight="bold">
                  Physics 101
                </Text>
                <Text fontSize="md">Ms. Johnson's Class</Text>
                <Center w="full">
                  <Image
                    src="/newton.svg" // Replace with the path to your vector art image
                    alt="Vector Art"
                    objectFit="cover"
                    boxSize="500px"
                  />
                </Center>
              </VStack>
            </HStack>
          </Container>
        </Box>
      </Scaffold>
    );
};

export default QuizComponent;

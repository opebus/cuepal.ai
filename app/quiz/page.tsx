'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Flex,
  RadioGroup,
  Stack,
  Image,
  Center,
  Container,
  Divider,
  useRadio,
  useRadioGroup,
  Spacer,
  Heading,
  Badge,
  HStack,
} from '@chakra-ui/react';
import Scaffold from '../components/Scaffold';

const questionsData = [
  {
    question: 'Who is Sir Isaac Newton?',
    options: [
      'A 20th-century chemist',
      'A 19th-century biologist',
      'A 17th-century mathematician and physicist',
      'A 16th-century geologist',
    ],
    correct_answer: 'A 17th-century mathematician and physicist',
    explanation:
      'Sir Isaac Newton was a 17th-century mathematician and physicist who pioneered the law of universal gravitation.',
  },
  {
    question:
      "What are the two factors that determine the force of gravity according to Newton's Law of Universal Gravitation?",
    options: [
      'Size and Shape of Objects',
      'Masses of Objects and Distance Between Objects',
      'Temperature and Pressure',
      'Speed and Direction of Objects',
    ],
    correct_answer: 'Masses of Objects and Distance Between Objects',
    explanation:
      "According to Newton's Law of Universal Gravitation, the force of gravity depends on two factors: the masses of the objects and the distance between them. Larger mass and closer distance result in stronger gravitational pull.",
  },
  {
    question: "What does Newton's Formula for Gravitational Force state?",
    options: [
      'Force = (Mass1 + Mass2) / Distance',
      'Force = (Mass1 x Mass2) x Distance',
      'Force = (Mass1 x Mass2) / Distance² x Gravitational Constant',
      'Force = (Mass1 - Mass2) / Distance² x Gravitational Constant',
    ],
    correct_answer:
      'Force = (Mass1 x Mass2) / Distance² x Gravitational Constant',
    explanation:
      "Newton's formula for gravitational force states that the force is equal to the product of the two masses divided by the square of the distance between them, all multiplied by the gravitational constant.",
  },
  {
    question:
      'Which of the following is an example of the universality of gravity?',
    options: [
      'A ball thrown upwards falls back down',
      "The moon's orbit around the Earth",
      'Both a and b',
      'None of the above',
    ],
    correct_answer: 'Both a and b',
    explanation:
      "Both a thrown ball falling back down and the moon's orbit around the Earth are examples of the universality of gravity. The same principles apply on Earth and in outer space.",
  },
  {
    question: "What is the significance of Newton's work on gravity?",
    options: [
      'It laid the foundation for modern physics and astronomy',
      'It disproved the theory of relativity',
      'It proved the Earth is flat',
      'None of the above',
    ],
    correct_answer: 'It laid the foundation for modern physics and astronomy',
    explanation:
      "Newton's work on gravity laid the foundation for modern physics and astronomy. His laws and formulas continue to be used and studied in these fields.",
  },
];

function RadioCard(props) {
  const { getInputProps, htmlProps } = useRadio(props);
  const input = getInputProps();
  let borderColor = 'gray.200';
  if (props.isChecked) {
    borderColor = props.isCorrect ? 'green.500' : 'red.500';
  }

  return (
    <Box as='label' {...htmlProps}>
      <input {...input} />
      <Box
        cursor='pointer'
        borderWidth='1px'
        borderColor={borderColor}
        borderRadius='md'
        boxShadow='md'
        fontSize='xl'
        _hover={{
          bg: 'gray.50',
        }}
        px={5}
        py={3}
        bg={
          props.isChecked
            ? props.isCorrect
              ? 'green.100'
              : 'red.100'
            : 'white'
        }
        display='flex'
        alignItems='center'
        gap={2}
      >
        <Badge>{props.index}</Badge>
        {props.children}
      </Box>
    </Box>
  );
}

const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'options',
    onChange: (value) => {
      if (!attempted) {
        setSelectedOption(value);
        const correct =
          value === questionsData[currentQuestionIndex].correct_answer;
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

  const handleNextQuestion = () => {
    if (attempted) {
      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
        setIsCorrect(null);
        setAttempted(false);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const question = questionsData[currentQuestionIndex];

  if (quizCompleted) {
    return (
      <Scaffold>
        <Container centerContent>
          <VStack spacing={4} align='stretch' m={4}>
            <Text fontSize='2xl' fontWeight='bold'>
              Quiz Summary
            </Text>
            <Text>Correct Answers: {score.correct}</Text>
            <Text>Incorrect Answers: {score.incorrect}</Text>
          </VStack>
        </Container>
      </Scaffold>
    );
  }

  return (
    <Scaffold>
      <Container maxW='full' centerContent marginTop={20}>
        <HStack spacing='50px' maxH='full'>
          <VStack spacing={5} align='stretch' m={4} w='3xl'>
            <Heading as='h1' size='xl'>
              Question {currentQuestionIndex + 1} of {questionsData.length}
            </Heading>
            <Text fontSize='2xl' fontWeight='bold'>
              {question.question}
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
                color={isCorrect ? 'green.500' : 'red.500'}
                fontSize='lg'
                noOfLines={4} // This will cap the text to a maximum of 4 lines
              >
                {questionsData[currentQuestionIndex].explanation}
              </Text>
            )}
            <Spacer />
            <Button
              colorScheme='blue'
              variant='outline'
              onClick={handleNextQuestion}
              isDisabled={!attempted}
            >
              Next question
            </Button>
          </VStack>
          <Spacer />
          <VStack maxH='full' p={4}>
            <Text fontSize='xl' fontWeight='bold'>
              Physics A
            </Text>
            <Text fontSize='md'>Ms. Johnson's Class</Text>
            <Center w='full'>
              <Image
                src='newton.svg' // Replace with the path to your vector art image
                alt='Vector Art'
                objectFit='cover'
                boxSize='500px'
              />
            </Center>
          </VStack>
        </HStack>
      </Container>
    </Scaffold>
  );
};

export default QuizComponent;

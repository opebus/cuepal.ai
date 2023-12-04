'use client';
import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Scaffold from '../components/Scaffold';

const flashcardsData = [
  {
    term: 'Sir Isaac Newton',
    definition:
      '17th-century mathematician and physicist who made significant contributions to physics and mathematics.',
  },
  {
    term: 'Gravity',
    definition: 'Force that attracts objects to each other.',
  },
  {
    term: "Newton's Law of Universal Gravitation",
    definition:
      'A law stating that all objects in the universe attract each other.',
  },
  {
    term: 'Masses of Objects',
    definition:
      'One of the factors that the force of gravity depends on; larger mass means stronger gravitational pull.',
  },
  {
    term: 'Distance Between Objects',
    definition:
      'One of the factors that the force of gravity depends on; closer objects exert a stronger force, while farther objects exert a weaker force.',
  },
  {
    term: "Newton's Formula for Gravitational Force",
    definition:
      'The formula is Force = (Mass1 × Mass2) / Distance² × Gravitational Constant.',
  },
  {
    term: 'Gravity and Planetary Motion',
    definition: 'The concept that explains why planets orbit the Sun.',
  },
];

const FlashcardsComponent = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const handlePrevCard = () => {
    setCurrentCardIndex((index) =>
      index > 0 ? index - 1 : flashcardsData.length - 1
    );
    setShowAnswer(false);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((index) =>
      index < flashcardsData.length - 1 ? index + 1 : 0
    );
    setShowAnswer(false);
  };

  if (testMode) {
    const flashcard = flashcardsData[currentCardIndex];

    return (
      <Scaffold>
        <Container centerContent>
          <VStack spacing={4} align='stretch' m={4} width='full'>
            <Heading as='h1' size='xl' textAlign='center'>
              Test Yourself
            </Heading>
            <Box
              borderRadius='lg'
              p={5}
              bg='gray.700'
              color='white'
              width='600px' // Fixed width
              height='300px' // Fixed height
              boxShadow='dark-lg'
              onClick={() => setShowAnswer(!showAnswer)}
              cursor='pointer'
              display='flex'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              mb={4}
            >
              <Text fontSize='2xl'>
                {showAnswer ? flashcard.definition : flashcard.term}
              </Text>
            </Box>
            <Flex alignItems='center' justifyContent='space-around'>
              <IconButton
                aria-label='Previous card'
                icon={<ChevronLeftIcon />}
                onClick={handlePrevCard}
                color='white'
                bgColor='blue.500'
                borderRadius='full'
                _hover={{ bgColor: 'blue.600' }}
              />
              <Text fontSize='xl'>
                {currentCardIndex + 1}/{flashcardsData.length}
              </Text>
              <IconButton
                aria-label='Next card'
                icon={<ChevronRightIcon />}
                onClick={handleNextCard}
                color='white'
                bgColor='blue.500'
                borderRadius='full'
                _hover={{ bgColor: 'blue.600' }}
              />
            </Flex>
            <Spacer />
            <Button
              colorScheme='blue'
              alignSelf='center'
              onClick={() => setTestMode(false)}
            >
              Back to Flashcards List
            </Button>
          </VStack>
        </Container>
      </Scaffold>
    );
  }

  return (
    <Scaffold>
      <VStack spacing={4} align='stretch' m={20}>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading as='h1' size='xl'>
            Flashcards
          </Heading>
          <Button
            variant='outline'
            colorScheme='blue'
            onClick={() => setTestMode(true)}
          >
            Test Myself
          </Button>
        </Flex>
        {flashcardsData.map((flashcard, index) => (
          <HStack
            key={index}
            spacing={8}
            justifyContent='space-between'
            alignItems='flex-start'
            p={5}
            borderWidth='1px'
            borderRadius='lg'
          >
            <VStack align='stretch' width='50%'>
              <Text fontSize='md' fontWeight='bold'>
                TERM
              </Text>
              <Text fontSize='lg'>{flashcard.term}</Text>
            </VStack>
            <VStack align='stretch' width='50%'>
              <Text fontSize='md' fontWeight='bold'>
                DEFINITION
              </Text>
              <Text fontSize='lg'>{flashcard.definition}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Scaffold>
  );
};

export default FlashcardsComponent;

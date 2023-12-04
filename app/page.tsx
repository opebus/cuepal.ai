'use client';

import React from 'react';
import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function Hero() {
  return (
    <Box>
      <Heading
        fontWeight={600}
        fontSize='6xl'
        lineHeight={'110%'}
        marginBottom={12}
        fontFamily={'serif'}
      >
        Cuepal <br />
        <Text color={'gray.400'} fontSize='3xl' fontFamily='sans-serif'>
          AI flashcards for students
        </Text>
      </Heading>
      <SignInButton>
        <Button
          bg='green.400'
          rounded='full'
          px={6}
          _hover={{
            bg: 'green.500',
            textColor: 'white',
          }}
        >
          Get Started
        </Button>
      </SignInButton>
    </Box>
  );
}

function AnimatedBlob() {
  return (
    <Box className='relative max-w-full'>
      <Box className='absolute top-24 left-44 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob'></Box>
      <Box className='absolute top-0 -left-0 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob'></Box>
      <Box className='absolute -bottom-8 left-44 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000'></Box>
      <Box className='absolute -bottom-8 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000'></Box>
      <div className='relative'>
        {' '}
        <Image
          src='newton.svg'
          alt='Vector Art'
          objectFit='cover'
          boxSize='500px'
        />
      </div>
    </Box>
  );
}

export default function Home() {
  const { userId } = useAuth();
  const router = useRouter();

  if (userId) {
    router.push('/home');
  }

  return (
    <Flex
      align='center'
      justify='space-between'
      className='min-h-screen max-h-screen'
      px={32}
    >
      <Box width='50%' paddingX={5}>
        <Hero />
      </Box>
      <Box width='50%' paddingX={5}>
        <AnimatedBlob />
      </Box>
    </Flex>
  );
}

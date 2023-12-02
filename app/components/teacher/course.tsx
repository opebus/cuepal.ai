'use client';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface Lesson {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
}

const CoursePage: React.FC = () => {
  const lessons: Lesson[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Lesson ${i + 1}`,
  }));

  const students: Student[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
  }));

  const [inviteCode, setInviteCode] = useState('');

  return (
    <Flex direction='column' maxH='100vh'>
      <VStack
        flexShrink={0}
        spacing={6}
        align='stretch'
        justify='center'
        p={8}
        bg='gray.50'
        minH='100px'
      >
        <Text fontSize='4xl' fontWeight='bold' textAlign='center'>
          Course Name
        </Text>
        <Text fontSize='xl' textAlign='center'>
          Course description and details go here.
        </Text>
      </VStack>
      <Flex justify='flex-end' p={6} bg='gray.50'>
        <Input
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder='XXXX'
          size='md'
          w='auto'
          mr={2}
          borderColor={'black'}
        />
        <Button size='lg'>Invite Students</Button>
      </Flex>
      <Grid templateColumns='1fr 2fr 1fr' gap={6} px={6} py={6} width='full'>
        <Box
          borderWidth='2px'
          borderColor={'black'}
          borderRadius='md'
          className='bg-white shadow-md'
          overflowY='scroll'
          maxH={'calc(100vh - 400px)'}
        >
          <VStack spacing={4} p={4} overflowY='auto'>
            <HStack
              justifyContent='space-between'
              width='full'
              position='sticky'
              top={0}
              bg='white'
              zIndex={1}
            >
              <Text fontSize='3xl' fontWeight='bold'>
                Lessons
              </Text>
              <Button size='lg' borderWidth={'1px'} borderColor={'black'}>
                Edit
              </Button>
            </HStack>
            <Button
              leftIcon={<AddIcon />}
              onClick={() => console.log('Create new lesson')}
              w='full'
              fontSize={'xl'}
              height={'50px'}
              borderColor={'black'}
              borderWidth={'1px'}
              backgroundColor={'white'}
            >
              Create New Lesson
            </Button>
            {lessons.map((lesson) => (
              <Box
                key={lesson.id}
                borderWidth='1px'
                borderColor={'black'}
                backgroundColor={'gray.100'}
                borderRadius={'md'}
                p={5}
                height='100px'
                cursor='pointer'
                fontSize='xl'
                fontWeight={'bold'}
                w='full'
              >
                {lesson.name}
              </Box>
            ))}
          </VStack>
        </Box>
        <Box
          borderWidth='2px'
          borderRadius='md'
          borderColor={'black'}
          p={4}
          overflowY='scroll'
          className='bg-white shadow-md'
          maxH={'calc(100vh - 400px)'}
        >
          <Text fontSize='3xl' fontWeight='bold' mb={4}>
            Analytics
          </Text>
          <Text>This will be replaced by a chart.</Text>
        </Box>
        <Box
          borderWidth='2px'
          borderRadius='md'
          borderColor={'black'}
          overflowY='scroll'
          className='bg-white shadow-md'
          maxH={'calc(100vh - 400px)'}
        >
          <VStack spacing={4} p={4} overflowY='auto'>
            <HStack justifyContent='space-between' width='full'>
              <Text fontSize='3xl' fontWeight='bold'>
                Students
              </Text>
              <Button size='lg' borderWidth={'1px'} borderColor={'black'}>
                Edit
              </Button>
            </HStack>
            {students.map((student) => (
              <Box
                key={student.id}
                borderWidth='1px'
                borderColor={'black'}
                borderRadius={'md'}
                p={5}
                height='70px'
                cursor='pointer'
                fontSize='xl'
                fontWeight={'bold'}
                w='full'
              >
                <HStack spacing={4}>
                  <Avatar size='sm' name={student.name} />
                  <Text textAlign='left' w='full'>
                    {student.name}
                  </Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Flex>
  );
};

export default CoursePage;

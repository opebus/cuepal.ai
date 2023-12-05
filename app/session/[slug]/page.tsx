'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  useToast,
  Button,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import Scaffold from '../../components/Scaffold';
import Link from 'next/link';

const CourseDetail = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true); // Added state for loading

  const toast = useToast();

  useEffect(() => {
    const fetchCourseSessions = async () => {
      setLoading(true); // Start loading

      console.log('fetching course sessions');
      try {
        const response = await fetch('/api/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
        console.error('Error fetching course sessions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load course sessions.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchCourseSessions();
  }, []);

  return (
    <Scaffold>
      <Box bg='white' minH='full' borderRadius='lg' shadow='md' m={1} p={5}>
        <VStack spacing={4} p={5}>
          {/*<Heading as='h1'>Lessons for {sessions[0]?.class?.name}</Heading>*/}
          <Heading as='h1' marginBottom={10}>
            Lessons for Physics 101{' '}
          </Heading>
          {loading
            ? Array(3) // Assuming you want 3 skeleton sessions
                .fill('')
                .map((_, index) => (
                  <Box
                    key={index}
                    borderWidth='1px'
                    borderRadius='lg'
                    borderColor='gray'
                    overflow='hidden'
                    width='100%'
                    p={5}
                  >
                    <SkeletonText mt='4' noOfLines={1} spacing='4' />
                    <SkeletonText noOfLines={2} spacing='4' />
                    <Skeleton height='20px' width='70px' mt={10} />
                  </Box>
                ))
            : sessions.map((session, index) => (
                <Box
                  key={index}
                  borderWidth='1px'
                  borderRadius='lg'
                  overflow='hidden'
                  width='100%'
                  p={5}
                >
                  <Text fontWeight='bold'>
                    Lesson {index + 1}: {session.name}
                  </Text>
                  <Text>{new Date(session.date).toLocaleDateString()}</Text>
                  <Text marginTop={3}>{session.lessonPlan}</Text>
                  <Link
                    href={`/notes/${session.classId}/${session.id}`}
                    key={index}
                  >
                    <Button colorScheme='teal' variant='outline' marginTop={10}>
                      Take notes
                    </Button>
                  </Link>
                </Box>
              ))}
        </VStack>
      </Box>
    </Scaffold>
  );
};

export default CourseDetail;

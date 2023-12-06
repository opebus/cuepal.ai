'use client';
import {
  Box,
  Flex,
  Text,
  VStack,
  Avatar,
  Grid,
  HStack,
  Button,
  Heading,
  Icon,
} from '@chakra-ui/react';
import Scaffold from '../components/Scaffold';
import { PiCalendar } from 'react-icons/pi';
import { useUser } from '@clerk/nextjs';

import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function Dashboard() {
  const { user } = useUser();

  const deadlines = [
    { id: 1, name: "Newton's Gravity", due: '2021-10-5' },
    { id: 2, name: "Keppler's Laws", due: '2021-10-10' },
    { id: 3, name: 'The Moon', due: '2021-10-15' },
  ];

  const names = [
    'Tiffany',
    'George',
    'Lucas',
    'Alexandria',
    'John',
    'Jane',
    'Bob',
  ];
  const students = names.map((name, index) => {
    return {
      id: name,
      name: name,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&id=${index}`,
    };
  });

  const chartOptions = {
    chart: {
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
    },
  };

  const chartSeries = [
    {
      name: 'Quiz Scores',
      data: [5, 8, 3, 5, 2],
    },
  ];

  return (
    <Scaffold>
      <Box bg='white' minH='full' borderRadius='lg' shadow='md' m={1} p={5}>
        <Flex direction='column'>
          <Heading as='h1' size='lg' fontWeight='semibold' mb={4}>
            Good morning, {user?.firstName}
          </Heading>
          <Text color={'gray'}>Are you ready to learn?</Text>
          <Grid
            templateColumns='1fr 2fr 1fr'
            gap={3}
            px={3}
            py={6}
            width='full'
          >
            <Box
              borderRadius='md'
              backgroundColor='gray.50'
              overflowY='scroll'
              padding={3}
              maxH={'calc(100vh - 200px)'}
            >
              <VStack spacing={4} p={4} overflowY='auto'>
                <HStack
                  justifyContent='space-between'
                  width='full'
                  position='sticky'
                  top={0}
                  zIndex={1}
                >
                  <Icon as={PiCalendar} boxSize={10} />
                  <Text fontSize='2xl' fontWeight='bold'>
                    Deadlines
                  </Text>
                </HStack>
                {deadlines.map((deadline) => (
                  <Box
                    key={deadline.id}
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
                    {deadline.name}
                    <Text fontSize='sm' fontWeight='normal'>
                      Due: {deadline.due}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
            <Box borderRadius='md' minH='full' padding={3}>
              <Text fontSize='3xl' fontWeight='bold' mb={4}>
                Analytics
              </Text>
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type='bar'
                height={500}
                width={'100%'}
              />
            </Box>
            <Box
              borderRadius='md'
              backgroundColor='gray.50'
              overflowY='scroll'
              padding={3}
              maxH={'calc(100vh - 200px)'}
            >
              <VStack spacing={4} p={4} overflowY='auto'>
                <HStack justifyContent='space-between' width='full'>
                  <Text fontSize='2xl' fontWeight='bold'>
                    Students
                  </Text>
                </HStack>
                {students.map((student) => (
                  <Box
                    key={student.id}
                    borderRadius={'lg'}
                    borderWidth={'1px'}
                    backgroundColor='white'
                    p={2}
                    height='70px'
                    cursor='pointer'
                    fontSize='xl'
                    fontWeight={'bold'}
                    w='full'
                  >
                    <HStack spacing={2} padding={3}>
                      <Avatar
                        size='sm'
                        name={student.name}
                        src={student.avatar}
                      />
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
      </Box>
    </Scaffold>
  );
}

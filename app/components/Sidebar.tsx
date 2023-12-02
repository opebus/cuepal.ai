'use client';
import { Box, Icon, VStack, Text } from '@chakra-ui/react';
import {
  HouseSimple,
  Gear,
  Cards,
  CalendarBlank,
  GraduationCap,
} from '@phosphor-icons/react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Box
      as='nav'
      bg='white'
      boxShadow='lg'
      p={4}
      height='100vh'
      width='24'
      position='fixed'
      alignItems='center'
    >
      <VStack spacing={8}>
        <Text fontSize='3xl' marginBottom='20'>
          CuePal
        </Text>
        <Link href='/'>
          <Icon
            as={HouseSimple}
            boxSize={10}
            border='2px'
            borderColor='black'
            p={2}
            borderRadius='md'
          />
        </Link>
        <Link href='/course'>
          <Icon
            as={GraduationCap}
            boxSize={10}
            border='2px'
            borderColor='black'
            p={2}
            borderRadius='md'
          />
        </Link>
        <Link href='/schedule'>
          <Icon
            as={CalendarBlank}
            boxSize={10}
            border='2px'
            borderColor='black'
            p={2}
            borderRadius='md'
          />
        </Link>
        <Link href='/flashcards'>
          <Icon
            as={Cards}
            boxSize={10}
            border='2px'
            borderColor='black'
            p={2}
            borderRadius='md'
          />
        </Link>
        <Link href='/settings'>
          <Icon
            as={Gear}
            boxSize={10}
            border='2px'
            borderColor='black'
            p={2}
            borderRadius='md'
          />
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;

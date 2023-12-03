import React from 'react';
import {
  Box,
  VStack,
  IconButton,
  Tooltip,
  Text,
  Spacer,
} from '@chakra-ui/react';
import {
  PiHouse,
  PiGraduationCap,
  PiCards,
  PiCalendar,
  PiGear,
} from 'react-icons/pi';

import { UserButton } from '@clerk/nextjs';

const Menu = ({ label, icon }) => {
  return (
    <Tooltip label={label} placement='right'>
      <IconButton
        aria-label={label}
        icon={icon}
        variant='ghost'
        fontSize='30px'
        background='gray.100'
        _hover={{ bg: 'blue.100' }}
      />
    </Tooltip>
  );
};

export default function Navbar() {
  return (
    <VStack spacing='10' left='0' p='5' h='100%'>
      <Text fontSize='xl' marginBottom={20}>
        Cuepal
      </Text>
      <Menu label='Home' icon={<PiHouse />} />
      <Menu label='Class' icon={<PiGraduationCap />} />
      <Menu label='Cards' icon={<PiCards />} />
      <Menu label='Calendar' icon={<PiCalendar />} />
      <Menu label='Settings' icon={<PiGear />} />
      <Spacer />
      <UserButton />
    </VStack>
  );
}

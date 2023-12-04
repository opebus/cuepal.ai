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
import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';

const Menu = ({ label, icon, path }) => {
  if (path == null) {
    path = '/';
  }
  return (
    <Tooltip label={label} placement='right'>
      <Link href={path}>
        <IconButton
          aria-label={label}
          icon={icon}
          variant='ghost'
          fontSize='28px'
          className='bg-gray-200'
          _hover={{ bg: 'gray.500' }}
        />
      </Link>
    </Tooltip>
  );
};

export default function Navbar() {
  return (
    <VStack spacing='10' left='0' p='5' h='100%' shadow='xl'>
      <Text fontSize='xl' marginBottom={20} fontFamily='serif' fontStyle='bold'>
        Cuepal
      </Text>
      <Menu label='Home' icon={<PiHouse />} path='/home' />
      <Menu label='Class' icon={<PiGraduationCap />} path='/course' />
      <Menu label='Cards' icon={<PiCards />} path='/cards' />
      <Menu label='Calendar' icon={<PiCalendar />} path='/calendar' />
      <Menu label='Settings' icon={<PiGear />} path='/settings' />
      <Spacer />
      <UserButton />
    </VStack>
  );
}

import React from "react";
import {
  Box,
  VStack,
  IconButton,
  Tooltip,
  Text,
  Spacer,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCalendar,
  FiSettings,
  FiBookOpen,
  FiBriefcase,
} from "react-icons/fi";

import { UserButton } from "@clerk/nextjs";

const Menu = ({ label, icon }) => {
  return (
    <Tooltip label={label} placement="right">
      <IconButton
        aria-label={label}
        icon={icon}
        variant="ghost"
        fontSize="24px"
        background="gray.100"
        _hover={{ bg: "blue.100" }}
      />
    </Tooltip>
  );
};

export default function Navbar() {
  return (
    <VStack spacing="10" left="0" p="5" h="100%">
      <Text fontSize="xl">Cuepal</Text>
      <Menu label="Home" icon={<FiHome />} />
      <Menu label="Education" icon={<FiBookOpen />} />
      <Menu label="Work" icon={<FiBriefcase />} />
      <Menu label="Calendar" icon={<FiCalendar />} />
      <Menu label="Settings" icon={<FiSettings />} />
      <Spacer />
      <UserButton />
    </VStack>
  );
}

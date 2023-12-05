import React from "react";
import Scaffold from "../components/Scaffold";
import { Box, Button } from "@chakra-ui/react";

function page() {
  return (
    <Scaffold>
      <Box
        bg="white"
        minH="full"
        borderRadius="lg"
        shadow="md"
        m={1}
        p={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button colorScheme="red" variant="outline">
          Drop Out?
        </Button>
      </Box>
    </Scaffold>
  );
}

export default page;

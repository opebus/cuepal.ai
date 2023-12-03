import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";

export default function Scaffold({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" h="100vh" bg="gray.50">
      <Navbar />
      <Box flex="1" overflowY="auto" p="5">
        {children}
      </Box>
    </Box>
  );
}

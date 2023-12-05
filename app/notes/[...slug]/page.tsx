"use client";

import TipTap from "../../editor/TipTap";
import Scaffold from "../../components/Scaffold";
import { Box } from "@chakra-ui/react";

export default function Home({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <Scaffold>
      <Box bg="white" minH="full" borderRadius="lg" shadow="md" m={1} p={5}>
        <TipTap classId={slug[0]} sessionId={slug[1]} />
      </Box>
    </Scaffold>
  );
}

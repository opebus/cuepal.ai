"use client";

import TipTap from "../../editor/TipTap";
import Scaffold from "../../components/Scaffold";

export default function Home({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <Scaffold>
      <TipTap classId={slug[0]} sessionId={slug[1]} />
    </Scaffold>
  );
}

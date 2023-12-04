"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useCompletion } from "ai/react";
import { Button } from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import "./styles.css";
import { useAuth } from "@clerk/nextjs";

const generate_questions_prompt = (lecture: string, notes: string) => {
  return `Given the a lecture transcription and student notes, create flashcards and quiz questions. Each question should be designed to test the depth of student understanding on key concepts, facts, and principles covered in the notes. Ensure questions must be a multiple choice question to assess different aspects of learning. The flashcards should be designed to help students memorize key terms and definitions.

  The information below is provided to help you generate the questions:

  <NOTES>
  ${notes}
  </NOTES>

  <LECTURE>
  ${lecture}
  </LECTURE>

  Quiz Questions Format:
  [
    {
      "question": "Question text",
      "options": ["Option1", "Option2", ...],
      "correct_answer": "CorrectAnswer",
      "explanation": "BriefExplanationForTheAnswer"
    },
    // Four more question objects
  ]
  
  Flashcards Format:
  [
    {
      "term": "Term from notes",
      "definition": "Definition or explanation of the term"
    },
    // As many flashcard objects as possible
  ]

  The final format:
  {
    "quiz_questions": [ ... ],
    "flashcards": [ ... ]
  }

  The final output should be a JSON array of these two arrays.
  `;
};

const Tiptap = ({
  classId,
  sessionId,
}: {
  classId: string;
  sessionId: string;
}) => {
  const { userId } = useAuth();
  const { complete } = useCompletion({
    api: "/api/completion",
  });

  const editor = useEditor({
    extensions: [
      CharacterCount,
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  const fetchSession = async () => {
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching course sessions:", error);
      toast({
        title: "Error",
        description: "Failed to load course sessions.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  // Function to handle the submission
  const handleSubmit = async () => {
    const sessionData = await fetchSession();

    const c = editor?.getText();
    if (!c || c.length === 0) {
      toast.error("Please write something first!");
      return;
    }
    const toastId = toast.loading("Generating questions...");
    const completion = await complete(
      generate_questions_prompt(sessionData.transcript, c)
    );
    if (!completion) {
      console.log("Failed to generate response");
      toast.dismiss(toastId);
      toast.error("Failed to generate questions. Please try again.");
      return;
    }
    try {
      const response = JSON.parse(completion);
      if (response && response.quiz_questions && response.flashcards) {
        toast.dismiss(toastId);
        toast.success("Successfully generated questions and flashcards!");
        saveOutcome(
          userId,
          sessionId,
          classId,
          response.quiz_questions,
          response.flashcards
        );
      } else {
        console.log("Invalid format: Missing quiz_questions or flashcards");
        toast.dismiss(toastId);
        toast.error("Invalid format. Please try again.");
      }
    } catch (e) {
      console.log("Invalid JSON format", e);
      toast.dismiss(toastId);
      toast.error("Invalid JSON format. Please try again.");
    }
  };

  async function saveOutcome(
    userId,
    sessionId,
    quizQuestions,
    flashcards,
    classId
  ) {
    try {
      const response = await fetch("/api/outcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          sessionId,
          classId,
          quiz_questions: quizQuestions,
          flashcards: flashcards,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      console.log("Data saved successfully:", result);
    } catch (error) {
      console.error("Error saving quiz data:", error);
    }
  }

  useEffect(() => {
    if (editor && sessionId) {
      editor.commands.setContent("Hello World");
    }
  }, [sessionId, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <Toaster />
      <div className="min-w-[768px] w-[768px] m-auto">
        {editor.storage.characterCount.words()} words
        <EditorContent
          editor={editor}
          className="min-h-[750px] mt-4 p-12 bg-white shadow-lg rounded-xl border border-gray-200 focus:outline-none"
        />
        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          variant="outline"
          marginTop={10}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Tiptap;

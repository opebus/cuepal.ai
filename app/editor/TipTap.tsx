'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import React, { useEffect, useCallback } from 'react';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import { useCompletion } from 'ai/react';
import { Button } from '@chakra-ui/react';
import toast, { Toaster } from 'react-hot-toast';
import './styles.css';

interface TiptapProps {
  content: string;
}

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

const Tiptap: React.FC<TiptapProps> = ({ content }) => {
  const { complete } = useCompletion({
    api: '/api/completion',
  });

  const editor = useEditor({
    extensions: [
      CharacterCount,
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  });

  // Function to handle the submission
  const handleSubmit = useCallback(async () => {
    const c = editor?.getText();
    if (!c || c.length === 0) {
      toast.error('Please write something first!');
      return;
    }
    const toastId = toast.loading('Generating questions...');
    const completion = await complete(generate_questions_prompt(c, content));
    console.log(completion);
    if (!completion) {
      console.log('Failed to generate response');
      toast.dismiss(toastId);
      toast.error('Failed to generate questions. Please try again.');
      return;
    }
    try {
      const response = JSON.parse(completion);
      if (response && response.quiz_questions && response.flashcards) {
        toast.dismiss(toastId);
        toast.success('Successfully generated questions and flashcards!');
        console.log(response);
      } else {
        console.log('Invalid format: Missing quiz_questions or flashcards');
        toast.dismiss(toastId);
        toast.error('Invalid format. Please try again.');
      }
    } catch (e) {
      console.log('Invalid JSON format', e);
      toast.dismiss(toastId);
      toast.error('Invalid JSON format. Please try again.');
    }
  }, [complete]);

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='w-full'>
      <Toaster />

      <div className='min-w-[768px] w-[768px] m-auto'>
        {editor.storage.characterCount.words()} words
        <EditorContent
          editor={editor}
          className='min-h-[750px] mt-4 p-12 bg-white shadow-lg rounded-xl border border-gray-200 focus:outline-none'
        />
        <Button
          onClick={handleSubmit}
          colorScheme='blue'
          variant='outline'
          marginTop={10}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Tiptap;

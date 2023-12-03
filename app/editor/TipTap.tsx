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
    if (c.length == 0) {
      toast.error('Please write something first!');
      return;
    }
    const completion = await complete(c);
    console.log(completion);
    if (!completion) throw new Error('Failed to generate repsonse');
    try {
      const questions = JSON.parse(completion);
      toast.success('Successfully generated questions!');
      console.log(questions);
    } catch (e) {
      console.log(e);
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
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Tiptap;

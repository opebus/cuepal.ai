'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import CharacterCount from '@tiptap/extension-character-count';

interface TiptapProps {
  content: string;
}

const Tiptap: React.FC<TiptapProps> = ({ content }) => {
  const editor = useEditor({
    extensions: [CharacterCount, StarterKit],
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='max-w-3xl'>
      <div className='text-gray-400'>
        {editor.storage.characterCount.words()} words
      </div>
      <EditorContent
        editor={editor}
        className='min-w-[768px] w-[768px] min-h-[1000px] mx-auto p-12 bg-white shadow-lg rounded-lg border border-gray-200 focus:outline-none'
      />
    </div>
  );
};

export default Tiptap;

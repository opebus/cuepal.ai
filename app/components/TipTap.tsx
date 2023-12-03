"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";

interface TiptapProps {
  content: string;
}

const Tiptap: React.FC<TiptapProps> = ({ content }) => {
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

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="min-w-[768px] w-[768px] m-auto">
        {editor.storage.characterCount.words()} words
        <EditorContent
          editor={editor}
          className="min-h-[750px] mt-4 p-12 bg-white shadow-lg rounded-xl border border-gray-200 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Tiptap;

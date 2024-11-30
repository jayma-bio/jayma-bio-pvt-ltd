"use client";

import { Block, BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { SetStateAction, useCallback } from "react";

interface EditorProps {
  setBlocks: React.Dispatch<SetStateAction<Block[]>>;
  placeholder?: string;
}

const AddEditor = ({
  setBlocks,
  placeholder = "Start typing...",
}: EditorProps) => {
  // Create editor instance with default configuration
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: [],
      },
    ],
    domAttributes: {
      editor: {
        class: "min-h-[200px] px-4 py-2",
      },
    },
  });

  // Handle editor changes
  const handleChange = useCallback(() => {
    const blocks = editor.document;
    if (blocks && blocks.length > 0) {
      setBlocks(blocks);
    }
  }, [editor, setBlocks]);

  return (
    <div className="w-full border rounded-md bg-white">
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={handleChange}
        editable={true}
      />
    </div>
  );
};

export default AddEditor;

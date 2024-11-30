"use client";

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { SetStateAction, useCallback } from "react";

interface EditorProps {
  setBlocks: React.Dispatch<SetStateAction<Block[]>>;
  initialContent?: string | null;
}

const defaultContent: PartialBlock[] = [
  {
    type: "paragraph",
    content: "Nothing here yet...",
  },
];

const UpdateEditor = ({ setBlocks, initialContent }: EditorProps) => {
  // Parse initial content safely
  const parseInitialContent = useCallback((): PartialBlock[] => {
    if (!initialContent) return defaultContent;

    try {
      const parsed = JSON.parse(initialContent);

      // Validate the parsed content
      if (!Array.isArray(parsed)) {
        console.warn("Initial content must be an array of blocks");
        return defaultContent;
      }

      // Validate each block has required properties
      const isValidBlock = (block: any): block is PartialBlock => {
        return (
          typeof block === "object" &&
          block !== null &&
          typeof block.type === "string"
        );
      };

      if (!parsed.every(isValidBlock)) {
        console.warn("Some blocks in initial content are invalid");
        return defaultContent;
      }

      // Remove any potentially problematic content or empty blocks
      const sanitizedContent = parsed.filter(
        (block) =>
          (Array.isArray(block.content) && block.content.length > 0) ||
          (Array.isArray(block.children) && block.children.length > 0)
      );

      return sanitizedContent.length > 0 ? sanitizedContent : defaultContent;
    } catch (error) {
      console.warn("Error parsing initial content:", error);
      return defaultContent;
    }
  }, [initialContent]);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: parseInitialContent(),
  });

  return (
    <div className="w-full min-h-[200px] border rounded-md">
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={() => {
          setBlocks(editor.document);
        }}
      />
    </div>
  );
};

export default UpdateEditor;

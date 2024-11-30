"use client";

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useMemo } from "react";

interface ViewEditorProps {
  initialContent?: Block[] | null;
  className?: string;
}

const defaultContent: PartialBlock[] = [
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "No content available",
        styles: {},
      },
    ],
  },
];

const ViewEditor = ({ initialContent, className = "" }: ViewEditorProps) => {
  // Validate and process initial content
  const processedContent = useMemo(() => {
    if (
      !initialContent ||
      !Array.isArray(initialContent) ||
      initialContent.length === 0
    ) {
      return defaultContent;
    }

    // Filter out any invalid or empty blocks
    const validContent = initialContent.filter(
      (block) =>
        block &&
        typeof block === "object" &&
        "type" in block &&
        (block.content || block.children)
    );

    return validContent.length > 0 ? validContent : defaultContent;
  }, [initialContent]);

  // Create editor instance with read-only configuration
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: processedContent,
    domAttributes: {
      editor: {
        class: "min-h-[200px] px-4 py-2",
        role: "region",
        "aria-label": "Content viewer",
      },
      block: {
        class: "my-1",
      },
    },
  });

  return (
    <div
      className={`w-full border rounded-md bg-white ${className}`}
      role="article"
      aria-readonly="true"
    >
      <BlockNoteView
        editor={editor}
        theme="light"
        editable={false}
        sideMenu={false}
        className=""
      />
    </div>
  );
};

export default ViewEditor;

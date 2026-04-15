'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import ImagePickerModal from './ImagePickerModal';
import {
  Bold, Italic, UnderlineIcon, Strikethrough, Code, CodeSquare,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote, Minus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon, Highlighter, Undo, Redo, RemoveFormatting,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

function ToolbarButton({
  onClick, active, title, children,
}: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarSep() {
  return <span className="w-px h-5 bg-gray-700 mx-1" />;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing...', minHeight = 300 }: RichTextEditorProps) {
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: { HTMLAttributes: { class: 'bg-gray-900 rounded p-3 font-mono text-sm' } } }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Image.configure({ inline: false, HTMLAttributes: { class: 'max-w-full rounded-lg my-2' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-400 underline' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none px-4 py-3 text-sm text-gray-200 leading-relaxed',
      },
    },
  });

  // Sync value from outside (e.g., when initialData loads)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleInsertImage = (url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
  };

  const handleInsertLink = () => {
    if (linkUrl) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setLinkDialogOpen(false);
    setLinkUrl('');
  };

  const openLinkDialog = () => {
    const existingHref = editor?.getAttributes('link').href ?? '';
    setLinkUrl(existingHref);
    setLinkDialogOpen(true);
    setTimeout(() => linkInputRef.current?.focus(), 50);
  };

  if (!editor) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-700 bg-gray-900/60">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (Ctrl+U)">
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
          <Highlighter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline Code">
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarSep />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarSep />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
          <CodeSquare className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Horizontal Rule">
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarSep />

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify">
          <AlignJustify className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarSep />

        <ToolbarButton onClick={openLinkDialog} active={editor.isActive('link')} title="Insert Link">
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => setImagePickerOpen(true)} active={false} title="Insert Image">
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarSep />

        <ToolbarButton onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} active={false} title="Clear Formatting">
          <RemoveFormatting className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo (Ctrl+Z)">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo (Ctrl+Y)">
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Link Dialog */}
      {linkDialogOpen && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-700 bg-gray-900/40">
          <input
            ref={linkInputRef}
            type="url"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleInsertLink(); if (e.key === 'Escape') setLinkDialogOpen(false); }}
            placeholder="https://example.com"
            className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" onClick={handleInsertLink}
            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700">
            Insert
          </button>
          {editor.isActive('link') && (
            <button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); setLinkDialogOpen(false); }}
              className="px-3 py-1.5 bg-red-600/20 text-red-400 text-xs font-medium rounded-lg hover:bg-red-600/30">
              Remove
            </button>
          )}
          <button type="button" onClick={() => setLinkDialogOpen(false)}
            className="text-gray-500 hover:text-gray-300 text-xs">Cancel</button>
        </div>
      )}

      {/* Editor Content */}
      <div style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>

      <ImagePickerModal
        open={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={handleInsertImage}
        title="Insert Image"
      />
    </div>
  );
}

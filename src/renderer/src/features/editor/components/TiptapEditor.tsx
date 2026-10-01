import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Quote,
  Strikethrough
} from 'lucide-react'
import { useTranslation } from '@/shared/hooks'

interface TiptapEditorProps {
  content: string
  onContentChange: (html: string) => void
}

export const TipTapEditor = ({ content, onContentChange }: TiptapEditorProps) => {
  const { t } = useTranslation()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: t('Editor placeholder')
      })
    ],
    content: content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class:
          'w-full min-h-full flex-1 resize-none border-none outline-none text-neutral-700 leading-relaxed placeholder:text-neutral-300 bg-transparent text-base'
      }
    },
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML())
    }
  })

  return (
    <div className="flex-1 w-full overflow-y-auto cursor-text">
      {editor && (
        <BubbleMenu
          editor={editor}
          className="flex items-center gap-0.5 bg-neutral-900/90 backdrop-blur-md text-white p-1 rounded-lg shadow-xl border border-neutral-700/60"
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('bold')
                ? 'bg-neutral-800 text-blue-400 font-bold'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={t('Bold (Ctrl+B)')}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('italic')
                ? 'bg-neutral-800 text-blue-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={t('Italic (Ctrl+I)')}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('strike')
                ? 'bg-neutral-800 text-blue-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={t('Strikethrough')}
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('code')
                ? 'bg-neutral-800 text-blue-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={t('Inline code')}
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-neutral-700 my-auto mx-0.5" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-neutral-800 text-blue-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={t('Heading 1')}
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-neutral-800 text-blue-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={t('Heading 2')}
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>{' '}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-neutral-800 text-blue-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={t('Heading 3')}
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('blockquote')
                ? 'bg-neutral-800 text-blue-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={t('Blockquote')}
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

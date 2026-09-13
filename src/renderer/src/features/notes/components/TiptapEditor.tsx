import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

interface TiptapEditorProps {
  content: string
  onContentChange: (html: string) => void
}

export const TipTapEditor = ({ content, onContentChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Gõ nội dung hoặc dùng Markdown (# Tiêu đề, - Danh sách, > Trích dẫn)...'
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
      <EditorContent editor={editor} />
    </div>
  )
}

# HƯỚNG DẪN TỰ TAY PHÁT TRIỂN SERAMUSE DESKTOP (STEP-BY-STEP ROADMAP)
> **Mục tiêu:** Giúp bạn làm chủ 100% codebase, tự tay xây dựng một ứng dụng ghi chú cá nhân (PKM - Personal Knowledge Management) chuyên nghiệp trên nền tảng Electron + React + TypeScript + Redux Toolkit.
> **Phương châm:** *Không vibe coding. Code từng dòng, hiểu từng hàm, kiểm thử từng tính năng.*

---

## MÔ HÌNH KIẾN TRÚC TỔNG THỂ (THE BIG PICTURE)

Trước khi viết bất kỳ dòng code nào, bạn cần nắm rõ luồng dữ liệu 1 chiều (Unidirectional Data Flow) của ứng dụng:

```mermaid
flowchart TD
    Store["Redux Store<br/>(Dữ liệu tập trung: notes, activeNoteId)"]
    Sidebar["Sidebar Component<br/>(Xem danh sách, bấm chọn note, bấm tạo note)"]
    Editor["Editor Component<br/>(Hiển thị và sửa tiêu đề, nội dung của activeNote)"]

    Store -->|"1. Đọc dữ liệu (useAppSelector)"| Sidebar
    Store -->|"1. Đọc activeNote (useAppSelector)"| Editor

    Sidebar -->|"2. Gửi lệnh (dispatch action:<br/>selectNote, createNote)"| Store
    Editor -->|"2. Gửi lệnh (dispatch action:<br/>updateTitle, updateContent)"| Store
```

---

## LỘ TRÌNH 6 GIAI ĐOẠN (6-PHASE ROADMAP)

```
Phase 1: Quản lý Dữ liệu Cốt lõi (Types & Redux Store)
   │
   ▼
Phase 2: Bố cục 2 Cột (Sidebar Danh sách + Vùng Soạn thảo Đơn giản)
   │
   ▼
Phase 3: Đồng bộ Soạn thảo Real-time (Title Input + Textarea)
   │
   ▼
Phase 4: Tích hợp Rich-text Editor (Tiptap v3 StarterKit)
   │
   ▼
Phase 5: Cấu trúc Thư mục & Tổ chức Tri thức (Folder Tree & Tags)
   │
   ▼
Phase 6: Tính năng Nâng cao (Obsidian Graph View & Notion Kanban)
```

---

## GIAI ĐOẠN 1: QUẢN LÝ DỮ LIỆU CỐT LÕI (CORE DATA & STORE)

Mọi ứng dụng ghi chú đều bắt đầu từ **Mô hình Dữ liệu (Data Model)**. Bạn cần trả lời: Một ghi chú gồm những thông tin gì?

### 1.1. Định nghĩa Type Interfaces (`src/renderer/src/features/notes/types.ts`)
* **Mục tiêu:** Tạo hợp đồng kiểu dữ liệu rõ ràng, ngăn chặn lỗi typo.
* **Cấu trúc tối giản cần tạo:**
  ```typescript
  export interface Note {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
  }

  export interface NotesState {
    notes: Record<string, Note> // Lưu dạng Key-Value (Dictionary) để tìm kiếm O(1)
    activeNoteId: string | null // ID của note đang được mở
  }
  ```
  > **Tại sao dùng `Record<string, Note>` thay vì mảng `Note[]`?**  
  > Khi ứng dụng có hàng nghìn ghi chú, việc tìm một note theo ID trong mảng tốn $O(N)$. Dùng object key-value `state.notes[id]` tốn $O(1)$ tức thời.

### 1.2. Viết Redux Slice (`src/renderer/src/features/notes/notesSlice.ts`)
* **Mục tiêu:** Định nghĩa các hành vi thay đổi dữ liệu (Reducers).
* **Các action tối thiểu cần có:**
  1. `createNote`: Thêm một ghi chú rỗng với ID ngẫu nhiên (`Date.now().toString()`), đặt tiêu đề mặc định là "Ghi chú mới", và tự động gán `activeNoteId` trỏ vào note vừa tạo.
  2. `selectNote`: Nhận vào `id: string` và cập nhật `activeNoteId`.
  3. `updateNoteTitle`: Nhận vào `{ id: string; title: string }`.
  4. `updateNoteContent`: Nhận vào `{ id: string; content: string }`.
  5. `deleteNote`: Nhận vào `id: string`, xóa note đó khỏi state và reset `activeNoteId` nếu note đang bị xóa chính là note đang mở.

### 1.3. Đăng ký vào Root Store (`src/renderer/src/app/store.ts`)
* Gắn `notesReducer` vào object reducers của `configureStore`.

**Tiêu chí nghiệm thu Giai đoạn 1:**
- Chạy `npm run typecheck` không có lỗi.
- Mở Redux DevTools (F12) thấy state khởi tạo thành công với `notes` và `activeNoteId`.

---

## GIAI ĐOẠN 2: BỐ CỤC 2 CỘT (SPLIT-PANE LAYOUT)

Xây dựng bộ khung giao diện để người dùng nhìn thấy danh sách và không gian làm việc.

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│  SIDEBAR        │  MAIN CONTENT AREA                                     │
│                 │                                                        │
│  [+ Ghi chú mới]│  Tiêu đề ghi chú...                                    │
│                 │  ────────────────────────────────────────────────────  │
│  • Ghi chú 1    │  Nội dung văn bản ghi chú...                           │
│  • Ghi chú 2    │                                                        │
│  • Ghi chú 3    │                                                        │
│                 │                                                        │
└─────────────────┴────────────────────────────────────────────────────────┘
```

### 2.1. Component `Sidebar` (`features/notes/components/Sidebar.tsx`)
* Sử dụng `useAppSelector` để lấy danh sách `Object.values(notes)` và `activeNoteId`.
* Sử dụng `useAppDispatch` để gửi action:
  * Nút bấm `+ Ghi chú mới`: gọi `dispatch(createNote())`.
  * Click vào từng dòng note trong danh sách: gọi `dispatch(selectNote(note.id))`.
  * Highlight dòng note đang được chọn bằng màu nền khác biệt (ví dụ `bg-neutral-200` hoặc `bg-blue-50`).

### 2.2. Ghép vào Layout Trang Chủ (`features/home/Home.tsx`)
* Dùng Flexbox: `<div className="flex h-screen w-screen overflow-hidden">`.
* Cột trái: `<Sidebar />` với chiều rộng cố định (ví dụ `w-64` ~ 256px).
* Cột phải: Vùng hiển thị chính với `flex-1 flex flex-col`.

**Tiêu chí nghiệm thu Giai đoạn 2:**
- Bấm nút "+ Ghi chú mới" -> danh sách ở Sidebar xuất hiện thêm 1 dòng.
- Bấm vào các dòng khác nhau -> trạng thái highlight chuyển đổi chính xác.

---

## GIAI ĐOẠN 3: ĐỒNG BỘ SOẠN THẢO (TITLE & CONTENT SYNC)

Trước khi dùng các thư viện soạn thảo phức tạp như Tiptap, hãy làm chủ việc đồng bộ dữ liệu bằng **thẻ HTML chuẩn (`<input>` và `<textarea>`)**. Điều này giúp bạn hiểu rõ cơ chế State Management mà không bị phân tâm bởi plugin bên thứ ba.

### 3.1. Component `NoteEditor` (`features/notes/components/NoteEditor.tsx`)
* Lấy `activeNote` từ Redux Store: `state.notes[state.activeNoteId]`.
* Nếu `!activeNote`: Hiển thị màn hình trống *"Chọn hoặc tạo một ghi chú để bắt đầu"*.
* Nếu có `activeNote`:
  * `<input>` cho tiêu đề: `value={activeNote.title}`, `onChange={(e) => dispatch(updateNoteTitle({ id: activeNote.id, title: e.target.value }))}`.
  * `<textarea>` cho nội dung: `value={activeNote.content}`, `onChange={(e) => dispatch(updateNoteContent({ id: activeNote.id, content: e.target.value }))}`.

> **Bài học quan trọng về Controlled Components & In-Memory Sync:**  
> Bạn sẽ quan sát thấy rằng khi gõ vào `<input>`, tiêu đề ở Sidebar cũng lập tức thay đổi theo thời gian thực! Đó là sức mạnh của Single Source of Truth trong Redux khi dữ liệu đang được lưu trữ trực tiếp trên RAM.

> [!TIP]
> **Kinh nghiệm & Hướng dẫn kỹ thuật: Debounce khi tích hợp Lưu trữ (Persistence / SQLite / IPC)**  
> * **Vấn đề:** Hiện tại việc cập nhật diễn ra tức thời vì chỉ lưu trên RAM (Redux Store). Sau này khi chuyển sang lưu trữ bền vững (ghi file Markdown/JSON vào ổ cứng hoặc gửi qua Electron IPC tới Main process / SQLite Database), nếu mỗi phím gõ (`onChange`) đều gọi ghi đĩa sẽ gây nghẽn I/O (Disk thrashing), giảm giật lag và hao pin.
> * **Giải pháp tối ưu:**
>   1. **Giao diện (UI State):** Tiếp tục cập nhật tức thời trên Redux RAM để Sidebar & Editor luôn phản hồi mượt mà không có độ trễ.
>   2. **Tầng lưu trữ (Persistence Layer):** Áp dụng kỹ thuật **Debounce** (thông qua custom hook `useDebounce` hoặc Redux listener middleware) đợi người dùng ngưng gõ khoảng 300ms – 500ms mới kích hoạt lệnh ghi đĩa/gửi IPC.
>   3. **Cơ chế an toàn (Safety Flush):** Tự động ép lưu ngay lập tức (flush) khi người dùng chuyển sang ghi chú khác hoặc khi đóng ứng dụng để không bị mất dữ liệu.
> * **Lộ trình:** AI sẽ chủ động nhắc nhở và hướng dẫn bạn tự tay code chi tiết kỹ thuật này khi bước vào giai đoạn kết nối Lưu trữ/IPC.

**Tiêu chí nghiệm thu Giai đoạn 3:**
- Gõ đổi tên ở ô tiêu đề -> Tiêu đề ở danh sách Sidebar đổi theo ngay lập tức.
- Chuyển qua lại giữa các ghi chú khác nhau -> Nội dung hiển thị tương ứng không bị lẫn lộn.

---

## GIAI ĐOẠN 4: TÍCH HỢP RICH-TEXT VỚI TIPTAP V3

Sau khi luồng Redux đã hoạt động hoàn hảo, thay thế `<textarea>` bằng trình soạn thảo khối chuyên nghiệp **Tiptap**.

### 4.1. Kiến thức cốt lõi về Tiptap
Tiptap là một Headless Editor bọc quanh ProseMirror. Nó không quản lý DOM như React thông thường mà có hệ thống Document Model riêng.

### 4.2. Khởi tạo Editor cơ bản
```typescript
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  extensions: [StarterKit],
  content: activeNote.content,
  onUpdate: ({ editor }) => {
    dispatch(updateNoteContent({ id: activeNote.id, content: editor.getHTML() }))
  }
})
```

### 4.3. Bẫy lỗi kinh điển cần tránh (Pitfall Alert ⚠️)
* **Lỗi con trỏ nhảy về đầu dòng khi gõ:**  
  * Nguyên nhân: Do dùng `useEffect` gọi `editor.setContent(content)` mỗi khi Redux state thay đổi.
  * Cách khắc phục: Chỉ gọi `setContent` khi `id` của ghi chú thay đổi (chuyển sang note khác), không gọi lại khi nội dung thay đổi do chính người dùng gõ.
  ```typescript
  useEffect(() => {
    if (editor && activeNote) {
      // Chỉ cập nhật lại editor nếu nội dung khác biệt hoàn toàn (đổi note)
      if (editor.getHTML() !== activeNote.content) {
        editor.commands.setContent(activeNote.content)
      }
    }
  }, [activeNote?.id]) // Chỉ lắng nghe id!
  ```

---

## GIAI ĐOẠN 5: TỔ CHỨC CÂY THƯ MỤC & TAGS (NOTION-LIKE)

Nâng cấp Sidebar từ danh sách phẳng (Flat List) thành cây thư mục (Hierarchical Tree).

1. Thêm `Folder` vào `types.ts`:
   ```typescript
   export interface Folder {
     id: string
     name: string
     isOpen: boolean
   }
   // Trong Note, thêm trường: folderId?: string
   ```
2. Thêm action `createFolder`, `toggleFolder` vào slice.
3. Render thư mục lồng ghi chú: Lọc các ghi chú có `folderId === folder.id` để render bên trong thư mục tương ứng.

---

## GIAI ĐOẠN 6: GÓC NHÌN ĐA CHIỀU (KANBAN & KNOWLEDGE GRAPH)

Đây là lúc ứng dụng đạt tầm vóc của Notion và Obsidian kết hợp.

### 6.1. Notion Kanban View
* Mỗi ghi chú có thêm thuộc tính `status: 'To Do' | 'In Progress' | 'Done'`.
* Chia màn hình thành 3 cột.
* Cột 1 render các note có status `To Do`, cột 2 render `In Progress`, cột 3 render `Done`.
* Bấm đổi trạng thái hoặc kéo thả để dispatch `updateNoteStatus`.

### 6.2. Obsidian Knowledge Graph (SVG Canvas)
* Quét toàn bộ nội dung HTML/Markdown của các ghi chú để tìm liên kết dạng `[[Tên trang]]`.
* Tạo danh sách các cặp kết nối: `Edge = { source: NoteA, target: NoteB }`.
* Dùng thẻ `<svg>` và tính toán tọa độ để vẽ các điểm tròn (`<circle>`) và đường nối (`<line>`).
* Thêm sự kiện `onMouseEnter` vào `<circle>` để làm sáng các liên kết liên quan!

---

## NGUYÊN TẮC LÀM VIỆC CÙNG AI TRONG SUỐT QUÁ TRÌNH NÀY

1. **Tôi (AI) sẽ làm gì:**  
   * Hướng dẫn bạn từng bước nhỏ theo đúng lộ trình này.
   * Giải thích tại sao lại viết code như vậy.
   * Soi lỗi cú pháp, type error và logic bug khi bạn viết xong.
2. **Bạn sẽ làm gì:**  
   * Tự tay tạo file và gõ code theo chỉ dẫn.
   * Tự đặt câu hỏi nếu có khái niệm nào chưa thông (ví dụ: *Redux slice là gì?*, *tại sao dùng useCallback ở đây?*).
   * Kiểm tra trực tiếp trên app để cảm nhận thành quả của từng dòng code chính mình tạo ra!

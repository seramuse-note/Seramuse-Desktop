# 📓 NHẬT KÝ HỌC TẬP & ĐÚC KẾT KIẾN THỨC KỸ THUẬT (ENGINEERING LEARNING JOURNAL)

> **Dự án:** Seramuse Desktop  
> **Mục đích:** Ghi lại toàn bộ hành trình tích lũy kiến thức, tư duy kỹ thuật (engineering mindset), các mẫu thiết kế (design patterns) và những khoảnh khắc "Aha!" từ đầu dự án đến nay.  
> **Giá trị:** Đây là bản hồ sơ năng lực (Technical Retrospective / Portfolio) chứng minh khả năng tư duy giải quyết vấn đề thực chiến của kỹ sư phần mềm.

---

## 📑 MỤC LỤC KIẾN THỨC THEO CHỦ ĐỀ & CHỨC NĂNG

1. [Tư duy Mô hình hóa Dữ liệu & Kiểu Dữ Liệu TypeScript (`types.ts`)](#1-tư-duy-mô-hình-hóa-dữ-liệu--kiểu-dữ-liệu-typescript-typests)
   * [1.1. Enum vs String Literal: Tại sao nên dùng Enum cho trạng thái?](#11-enum-vs-string-literal-tại-sao-nên-dùng-enum-cho-trạng-thái)
   * [1.2. Chuẩn hóa State (Normalized State): Tại sao chọn `Record<string, T>` thay vì Mảng `T[]`?](#12-chuẩn-hóa-state-normalized-state-tại-sao-chọn-recordstring-t-thay-vì-mảng-t)
   * [1.3. Kiểu dữ liệu Phòng vệ (Defensive Typing) & Optional Chaining](#13-kiểu-dữ-liệu-phòng-vệ-defensive-typing--optional-chaining)
2. [Kiến trúc Clean Redux Slice & Quản lý State Chuẩn Mực (`notesSlice.ts`)](#2-kiến-trúc-clean-redux-slice--quản-lý-state-chuẩn-mực-notesslicets)
   * [2.1. Tìm kiếm và Cập nhật $O(1)$ thay vì $O(N)$](#21-tìm-kiếm-và-cập-nhật-o1-thay-vì-on)
   * [2.2. Xử lý an toàn con trỏ Active Note (Tránh lỗi mồ côi ID)](#22-xử-lý-an-toàn-con-trỏ-active-note-tránh-lỗi-mồ-côi-id)
   * [2.3. Single Source of Truth cho Chế độ Xem (View Mode)](#23-single-source-of-truth-cho-chế-độ-xem-view-mode)
3. [Thiết kế Clean Component & Phân tách Trách nhiệm trong React](#3-thiết-kế-clean-component--phân-tách-trách-nhiệm-trong-react)
   * [3.1. Container Component (Smart) vs Presentational Component (Dumb)](#31-container-component-smart-vs-presentational-component-dumb)
   * [3.2. Controlled Component vs Uncontrolled Component](#32-controlled-component-vs-uncontrolled-component)
   * [3.3. Type-Safe Redux Hooks (`useAppDispatch`, `useAppSelector`)](#33-type-safe-redux-hooks-useappdispatch-useappselector)
4. [Tích hợp Trình Soạn Thảo Rich-Text Tiptap (`TiptapEditor.tsx`)](#4-tích-hợp-trình-soạn-thảo-rich-text-tiptap-tiptapeditortsx)
   * [4.1. Kiến trúc Headless v3: Tự do hoàn toàn về UI với Tailwind CSS](#41-kiến-trúc-headless-v3-tự-do-hoàn-toàn-về-ui-với-tailwind-css)
   * [4.2. Tuyệt chiêu "Key Remounting Pattern" (`key={activeNote.id}`)](#42-tuyệt-chiêu-key-remounting-pattern-keyactivenoteid)
   * [4.3. Đồng bộ hai chiều (Two-Way Sync) và Autofocus mượt mà](#43-đồng-bộ-hai-chiều-two-way-sync-và-autofocus-mượt-mà)
5. [Kỹ thuật Kéo Thả (Drag & Drop) Native trong Bảng Kanban (`kanban/`)](#5-kỹ-thuật-kéo-thả-drag--drop-native-trong-bảng-kanban-kanban)
   * [5.1. HTML5 Drag and Drop API thuần: Zero Dependency, siêu nhẹ](#51-html5-drag-and-drop-api-thuần-zero-dependency-siêu-nhẹ)
   * [5.2. Chỉ truyền `id` qua `dataTransfer` (Tối ưu bộ nhớ)](#52-chỉ-truyền-id-qua-datatransfer-tối-ưu-bộ-nhớ)
   * [5.3. Bắt buộc `e.preventDefault()` trong `onDragOver` (Cái bẫy kinh điển)](#53-bắt-buộc-epreventdefault-trong-ondragover-cái-bẫy-kinh-điển)
   * [5.4. Trạng thái phản hồi thị giác `isOver` cho trải nghiệm UX đỉnh cao](#54-trạng-thái-phản-hồi-thị-giác-isover-cho-trải-nghiệm-ux-đỉnh-cao)
6. [Lượng giác & Đồ họa SVG trong Đồ Thị Tri Thức (Knowledge Graph)](#6-lượng-giác--đồ-họa-svg-trong-đồ-thị-tri-thức-knowledge-graph)
   * [6.1. Tại sao X dùng Cos, Y dùng Sin? (Tam giác vuông chiếu 2 trục)](#61-tại-sao-x-dùng-cos-y-dùng-sin-tam-giác-vuông-chiếu-2-trục)
   * [6.2. Trực giác đời thường vs Quy ước Toán học Quốc tế (Trục X dương)](#62-trực-giác-đời-thường-vs-quy-ước-toán-học-quốc-tế-trục-x-dương)
   * [6.3. Kỹ thuật bù góc `- Math.PI / 2` để đưa nốt về đỉnh 12 giờ](#63-kỹ-thuật-bù-góc---mathpi--2-để-đưa-nốt-về-đỉnh-12-giờ)
   * [6.4. Thuật toán tìm và nối dây liên kết (`graphEdges`): Tại sao `j = i + 1`?](#64-thuật-toán-tìm-và-nối-dây-liên-kết-graphedges-tại-sao-j--i--1)
   * [6.5. Bản chất xếp lớp trong SVG: Tại sao `<line>` phải vẽ trước `<circle>`?](#65-bản-chất-xếp-lớp-trong-svg-tại-sao-line-phải-vẽ-trước-circle)
   * [6.6. Tương tác Mạng Lưới (Ego-Network Hover & Click Navigation)](#66-tương-tác-mạng-lưới-ego-network-hover--click-navigation)
   * [6.7. Kỹ thuật Nền Lưới Điểm (Dot Matrix Grid) & Cái bẫy thẻ `<defs>`](#67-kỹ-thuật-nền-lưới-điểm-dot-matrix-grid--cái-bẫy-thẻ-defs)
   * [6.8. Kỹ thuật Dây Nối Laser Đa Lớp (Dual-Layer Glow Lines) & Bộ Lọc Neon](#68-kỹ-thuật-dây-nối-laser-đa-lớp-dual-layer-glow-lines--bộ-lọc-neon)
7. [Lưu Trữ Dữ Liệu Ổ Cứng (Local-First Persistence) & Cầu Nối IPC trong Electron](#7-lưu-trữ-dữ-liệu-ổ-cứng-local-first-persistence--cầu-nối-ipc-trong-electron)
   * [7.1. Tại sao chọn Local-First Ổ Cứng cho Người Dùng Thật?](#71-tại-sao-chọn-local-first-ổ-cứng-cho-người-dùng-thật)
   * [7.2. Kiến Trúc 2 Thế Giới trong Electron: Main Process vs Renderer Process](#72-kiến-trúc-2-thế-giới-trong-electron-main-process-vs-renderer-process)
   * [7.3. Cầu Nối IPC (Inter-Process Communication) & Preload Script](#73-cầu-nối-ipc-inter-process-communication--preload-script)
   * [7.4. Hai Kỹ Thuật Bắt Buộc: Debounced Auto-Save & Store Hydration](#74-hai-kỹ-thuật-bắt-buộc-debounced-auto-save--store-hydration)
   * [7.5. Phương Pháp "3 Không - 3 Bước" để Giữ Não Kỹ Sư khi Học Cùng AI](#75-phương-pháp-3-không---3-bước-để-giữ-não-kỹ-sư-khi-học-cùng-ai)
8. [Phản Tỉnh Kỹ Thuật (Gibbs' Reflective Cycle): Thiết Kế IconPicker & Ranh Giới Smart vs Dumb Component](#8-phản-tỉnh-kỹ-thuật-gibbs-reflective-cycle-thiết-kế-iconpicker--ranh-giới-smart-vs-dumb-component)
   * [8.1. Mô tả Thực tế (Description)](#81-mô-tả-thực-tế-description)
   * [8.2. Cảm xúc Ban đầu (Feelings)](#82-cảm-xúc-ban-đầu-feelings)
   * [8.3. Đánh giá Khách quan (Evaluation)](#83-đánh-giá-khách-quan-evaluation)
   * [8.4. Phân tích Cốt lõi (Analysis)](#84-phân-tích-cốt-lõi-analysis)
   * [8.5. Kết luận Rút ra (Conclusion)](#85-kết-luận-rút-ra-conclusion)
   * [8.6. Kế hoạch Hành động (Action Plan)](#86-kế-hoạch-hành-động-action-plan)
9. [Phản Tỉnh Kỹ Thuật (Gibbs' Reflective Cycle): Cạm Bẫy State Cục Bộ (`useState`) vs Global Store (Single Source of Truth)](#9-phản-tỉnh-kỹ-thuật-gibbs-reflective-cycle-cạm-bẫy-state-cục-bộ-usestate-vs-global-store-single-source-of-truth)
   * [9.1. Mô tả Thực tế (Description)](#91-mô-tả-thực-tế-description)
   * [9.2. Cảm xúc Ban đầu (Feelings)](#92-cảm-xúc-ban-đầu-feelings)
   * [9.3. Đánh giá Khách quan (Evaluation)](#93-đánh-giá-khách-quan-evaluation)
   * [9.4. Phân tích Cốt lõi (Analysis)](#94-phân-tích-cốt-lõi-analysis)
   * [9.5. Kết luận Rút ra (Conclusion)](#95-kết-luận-rút-ra-conclusion)
   * [9.6. Kế hoạch Hành động (Action Plan)](#96-kế-hoạch-hành-động-action-plan)
10. [Kiến Trúc Định Tuyến TanStack Router & Phân Tầng Feature-Based](#10-kiến-trúc-định-tuyến-tanstack-router--phân-tầng-feature-based)
   * [10.1. Phân biệt Bản chất: Route ID vs. Navigation Path trong TanStack Router](#101-phân-biệt-bản-chất-route-id-vs-navigation-path-trong-tanstack-router)
   * [10.2. Dispatcher / Gatekeeper Pattern tại Route Gốc (`/`)](#102-dispatcher--gatekeeper-pattern-tại-route-gốc-)
   * [10.3. Bộ đệm Phân giải Module (Module Resolution Cache) của TypeScript Server](#103-bộ-đệm-phân-giải-module-module-resolution-cache-của-typescript-server)
11. [Mẫu ghi nhật ký cho các tính năng tiếp theo (Template)](#11-mẫu-ghi-nhật-ký-cho-các-tính-năng-tiếp-theo-template)

---

## 1. Tư duy Mô hình hóa Dữ liệu & Kiểu Dữ Liệu TypeScript (`types.ts`)

* **File:** [`src/renderer/src/features/notes/types.ts`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/features/notes/types.ts)

### 1.1. Enum vs String Literal: Tại sao nên dùng Enum cho trạng thái?
* **Vấn đề:** Nếu dùng chuỗi tự do (`status: string`), lập trình viên rất dễ gõ sai chính tả (`'in_progress'` vs `'In Progress'`), dẫn đến bug ngầm lúc runtime mà compiler không bắt được.
* **Giải pháp:** Sử dụng `TypeScript Enum`:
  ```ts
  export enum NoteStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done'
  }

  export enum ViewMode {
    DOCUMENT = 'Document',
    KANBAN = 'Kanban',
    GRAPH = 'Graph'
  }
  ```
* **Lợi ích:** 
  1. Hỗ trợ tự động gợi ý (IntelliSense autocomplete).
  2. Khi đổi tên trạng thái, chỉ cần sửa ở 1 nơi duy nhất (Single Source of Truth).
  3. Trình biên dịch báo lỗi ngay lập tức nếu truyền giá trị không hợp lệ.

### 1.2. Chuẩn hóa State (Normalized State): Tại sao chọn `Record<string, T>` thay vì Mảng `T[]`?
* **Thói quen thông thường:** Lưu danh sách ghi chú dạng mảng `notes: Note[]`.
  * Muốn tìm 1 note theo ID: phải chạy `notes.find(n => n.id === id)` $\rightarrow$ Độ phức tạp thời gian là **$O(N)$**. Khi có hàng ngàn ghi chú, app sẽ bị giật lag!
  * Muốn cập nhật 1 note: phải dùng `notes.map(...)` để tạo mảng mới $\rightarrow$ Tốn CPU duyệt qua toàn bộ danh sách.
* **Tư duy Kiến trúc sư (Normalized State):** Lưu dưới dạng Từ điển / Hash Map:
  ```ts
  export interface NoteState {
    notes: Record<string, Note>
    folders: Record<string, Folder>
    activeNoteId: string | null
    activeView: ViewMode
  }
  ```
* **Khoảnh khắc "Aha!":**
  * Lấy note bất kỳ: `notes[id]` $\rightarrow$ Tốc độ tức thì **$O(1)$**!
  * Cập nhật note: `notes[id].title = newTitle` $\rightarrow$ Tức thì **$O(1)$**!
  * Xóa note: `delete notes[id]` $\rightarrow$ Tức thì **$O(1)$**!

### 1.3. Kiểu dữ liệu Phòng vệ (Defensive Typing) & Optional Chaining
* Các trường có thể chưa có giá trị được đánh dấu rõ bằng dấu `?`:
  ```ts
  export interface Note {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    folderId?: string // 👈 Note có thể không thuộc thư mục nào
    status: NoteStatus
    tags: string[]
  }
  ```
* Trong code component, luôn xử lý phòng vệ để app không bao giờ bị crash trắng trang:
  ```ts
  const safeTags = note.tags || []
  const title = note.title.trim() || 'Untitled Note'
  ```

---

## 2. Kiến trúc Clean Redux Slice & Quản lý State Chuẩn Mực (`notesSlice.ts`)

* **File:** [`src/renderer/src/features/notes/notesSlice.ts`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/features/notes/notesSlice.ts)

### 2.1. Tìm kiếm và Cập nhật $O(1)$ thay vì $O(N)$
Nhờ cấu trúc `Record<string, Note>` và thư viện **Immer** tích hợp sẵn trong Redux Toolkit, code cập nhật cực kỳ ngắn gọn, dễ đọc và đạt hiệu năng tối đa:
```ts
updateNoteTitle(state, action: PayloadAction<{ id: string; title: string }>) {
  const { id, title } = action.payload
  if (state.notes[id]) {
    state.notes[id].title = title
    state.notes[id].updatedAt = new Date().toISOString()
  }
}
```

### 2.2. Xử lý an toàn con trỏ Active Note (Tránh lỗi mồ côi ID)
* **Kịch bản nguy hiểm:** Người dùng đang mở ghi chú A để soạn thảo, sau đó bấm nút **Xóa ghi chú A**. Nếu chỉ xóa `delete state.notes[id]`, biến `activeNoteId` vẫn trỏ vào ID vừa bị xóa $\rightarrow$ Màn hình soạn thảo sẽ văng lỗi `undefined`!
* **Cách xử lý Clean trong Redux:**
  ```ts
  deleteNote(state, action: PayloadAction<string>) {
    const id = action.payload
    delete state.notes[id]

    // Nếu xóa đúng note đang mở -> Chuyển active sang note đầu tiên còn lại hoặc null
    if (state.activeNoteId === id) {
      const remainingIds = Object.keys(state.notes)
      state.activeNoteId = remainingIds.length > 0 ? remainingIds[0] : null
    }
  }
  ```

### 2.3. Single Source of Truth cho Chế độ Xem (View Mode)
Khi người dùng bấm vào 1 ghi chú trên Sidebar hoặc Kanban hoặc Graph, ta muốn ứng dụng tự động mở ghi chú đó trong màn hình tài liệu. Action `selectNote` đảm nhiệm 2 việc cùng lúc:
```ts
selectNote(state, action: PayloadAction<string>) {
  state.activeNoteId = action.payload
  state.activeView = ViewMode.DOCUMENT // Tự động chuyển về giao diện soạn thảo
}
```

---

## 3. Thiết kế Clean Component & Phân tách Trách nhiệm trong React

### 3.1. Container Component (Smart) vs Presentational Component (Dumb)
* **Nguyên lý Đơn nhiệm (Single Responsibility Principle):**
  * `NoteEditor.tsx` (Container): Chịu trách nhiệm kết nối Redux Store, dispatch action `updateNoteContent`, quản lý layout chung.
  * `TipTapEditor.tsx` (Presentational / Dumb): Chỉ nhận `content` và callback `onContentChange` qua Props. Nó không cần biết Redux là gì!
* **Lợi ích:** `TipTapEditor` trở nên độc lập, dễ test và có thể tái sử dụng ở bất kỳ nơi nào trong dự án.

### 3.2. Controlled Component vs Uncontrolled Component
* **Controlled (Tiêu đề Note):** Thẻ `<input>` nhận `value={activeNote.title}` và gọi `onChange` đẩy thẳng lên Redux. Mọi ký tự gõ vào đều được Redux kiểm soát.
* **Hybrid / Uncontrolled (Tiptap Editor):** Trình soạn thảo văn bản phong phú cần DOM nội bộ để xử lý con trỏ (selection/caret), format in đậm/nghiêng... Nếu bắt Tiptap thành Controlled component thuần túy thì mỗi lần gõ phím sẽ gây re-render toàn bộ DOM, làm giật lag và nhảy con trỏ. Ta dùng sự kiện `onUpdate` của Tiptap để đồng bộ HTML ra ngoài.

### 3.3. Type-Safe Redux Hooks (`useAppDispatch`, `useAppSelector`)
Thay vì dùng `useDispatch` và `useSelector` thuần của react-redux (vốn không biết kiểu dữ liệu của RootState):
```ts
// src/renderer/src/app/hooks.ts
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```
👉 Khi component gọi `useAppSelector((state) => state.notes.notes)`, TypeScript tự động hiểu `notes` là kiểu `Record<string, Note>`, hỗ trợ gõ code siêu nhanh và không lo lỗi runtime.

---

## 4. Tích hợp Trình Soạn Thảo Rich-Text Tiptap (`TiptapEditor.tsx`)

* **File:** [`src/renderer/src/features/notes/components/TiptapEditor.tsx`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/features/notes/components/TiptapEditor.tsx)

### 4.1. Kiến trúc Headless v3: Tự do hoàn toàn về UI với Tailwind CSS
* Các editor truyền thống (như TinyMCE, CKEditor) áp đặt sẵn giao diện, toolbar, stylesheet rất khó can thiệp.
* **Tiptap là Headless Editor:** Nó chỉ cung cấp logic soạn thảo ngầm bên dưới (dựa trên ProseMirror). Giao diện bên ngoài hoàn toàn do lập trình viên thiết kế bằng Tailwind CSS qua `editorProps.attributes`:
  ```ts
  editorProps: {
    attributes: {
      class: 'w-full min-h-full flex-1 resize-none border-none outline-none text-neutral-700 leading-relaxed placeholder:text-neutral-300 bg-transparent text-base'
    }
  }
  ```

### 4.2. Tuyệt chiêu "Key Remounting Pattern" (`key={activeNote.id}`)
* **Vấn đề cực kỳ đau đầu:** Tiptap khởi tạo instance editor một lần duy nhất lúc mount. Khi người dùng click chọn một ghi chú khác trên Sidebar, Prop `content` thay đổi nhưng editor bên trong **không tự động cập nhật nội dung mới**! (Nó vẫn giữ nội dung ghi chú cũ hoặc làm lệch vị trí con trỏ).
* **Giải pháp Senior ("Aha!" Moment):** Thêm thuộc tính `key` bằng ID của ghi chú:
  ```tsx
  // Trong NoteEditor.tsx
  <TipTapEditor
    key={activeNote.id}
    content={activeNote.content}
    onContentChange={handleContentChange}
  />
  ```
* **Cơ chế:** Khi `activeNote.id` thay đổi, React hiểu đây là một component hoàn toàn khác $\rightarrow$ React sẽ tự động hủy (unmount) instance cũ và dựng (mount) instance mới toanh với nội dung của ghi chú vừa chọn. Đơn giản mà giải quyết triệt để 100% bug đồng bộ!

### 4.3. Đồng bộ hai chiều (Two-Way Sync) và Autofocus mượt mà
* Lắng nghe sự kiện `onUpdate` để phát ra HTML:
  ```ts
  onUpdate: ({ editor }) => {
    onContentChange(editor.getHTML())
  }
  ```
* Thiết lập `autofocus: 'end'` giúp người dùng vừa mở note là có thể gõ tiếp ngay ở cuối văn bản mà không cần click chuột thêm lần nữa.

---

## 5. Kỹ thuật Kéo Thả (Drag & Drop) Native trong Bảng Kanban (`kanban/`)

* **Files:** [`KanbanCard.tsx`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/features/notes/components/kanban/KanbanCard.tsx), [`KanbanColumn.tsx`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/features/notes/components/kanban/KanbanColumn.tsx)

### 5.1. HTML5 Drag and Drop API thuần: Zero Dependency, siêu nhẹ
Không cần cài đặt thư viện nặng nề hàng chục KB như `react-dnd` hay `dnd-kit`, ta tận dụng trực tiếp API kéo thả có sẵn của trình duyệt.

### 5.2. Chỉ truyền `id` qua `dataTransfer` (Tối ưu bộ nhớ)
* **Kỹ thuật tại Card (`KanbanCard.tsx`):**
  1. Đặt thuộc tính `draggable={true}` lên thẻ bao bọc card.
  2. Bắt sự kiện `onDragStart`:
     ```ts
     const handleDragStart = (e: React.DragEvent) => {
       e.dataTransfer.setData('text/plain', note.id) // 👈 Chỉ truyền duy nhất ID của note
       e.dataTransfer.effectAllowed = 'move'
     }
     ```
  * *Tại sao không truyền cả Object note?* $\rightarrow$ Dữ liệu Redux đã nằm tập trung trong Store. Truyền nguyên object qua `dataTransfer` gây tốn bộ nhớ, serialize chậm và dễ sinh lỗi dữ liệu cũ (stale data).

### 5.3. Bắt buộc `e.preventDefault()` trong `onDragOver` (Cái bẫy kinh điển)
* **Cột tiếp nhận (`KanbanColumn.tsx`):**
  ```ts
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // 👈 BẮT BUỘC!
    e.dataTransfer.dropEffect = 'move'
    if (!isOver) setIsOver(true)
  }
  ```
* **Cái bẫy:** Mặc định của trình duyệt là **KHÔNG CHO PHÉP DROP**. Nếu quên gọi `e.preventDefault()` trong hàm `onDragOver`, sự kiện `onDrop` sẽ **KHÔNG BAO GIỜ ĐƯỢC KÍCH HOẠT**!
* Khi thả tay ra (`handleDrop`):
  ```ts
  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    setIsOver(false)
    const noteId = e.dataTransfer.getData('text/plain')
    if (noteId) {
      dispatch(updateNoteStatus({ id: noteId, status }))
    }
  }
  ```

### 5.4. Trạng thái phản hồi thị giác `isOver` cho trải nghiệm UX đỉnh cao
Sử dụng state `isOver` kết hợp `onDragOver` và `onDragLeave` để đổi màu viền, nền cột khi card lướt qua:
```tsx
className={`... ${
  isOver
    ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-md'
    : 'border-neutral-200/80 bg-neutral-100/70 shadow-none'
}`}
```

---

## 6. Lượng giác & Đồ họa SVG trong Đồ Thị Tri Thức (Knowledge Graph)

* **File:** [`GraphView.tsx`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/features/notes/components/graph/GraphView.tsx)
* **Tài liệu chuyên sâu:** [`RADIAL_LAYOUT_AND_GRAPH_MATH.md`](file:///d:/seramuse/Seramuse-Desktop/docs/RADIAL_LAYOUT_AND_GRAPH_MATH.md)

### 6.1. Tại sao X dùng Cos, Y dùng Sin? (Tam giác vuông chiếu 2 trục)
Chiếu điểm nốt $M(x, y)$ lên 2 trục tọa độ tạo tam giác vuông $\Delta OHM$:
* Đoạn nằm ngang $\Delta x$ là **CẠNH KỀ** với góc $\alpha$:
  $$\cos(\alpha) = \frac{\text{Cạnh kề}}{\text{Cạnh huyền}} = \frac{\Delta x}{R} \implies \mathbf{\Delta x = R \times \cos(\alpha)}$$
* Đoạn dựng đứng $\Delta y$ là **CẠNH ĐỐI** diện nhìn thẳng vào góc $\alpha$:
  $$\sin(\alpha) = \frac{\text{Cạnh đối}}{\text{Cạnh huyền}} = \frac{\Delta y}{R} \implies \mathbf{\Delta y = R \times \sin(\alpha)}$$

### 6.2. Trực giác đời thường vs Quy ước Toán học Quốc tế (Trục X dương)
* **Trực giác:** Con người quen với đồng hồ (số 12 ở đỉnh $Y$) và la bàn (hướng Bắc $0^\circ$ ở trên), nên bản năng luôn nghĩ góc xuất phát từ trục $Y$.
* **Toán học & Máy tính (`Math.cos`, `Math.sin`):** Lấy trục số thực 1D nằm ngang làm gốc, quy ước tia xuất phát $0$ radian nằm ở **trục hoành dương $Ox$ (hướng 3 giờ)**.
  * `Math.cos(0) = 1` ($x=1$)
  * `Math.sin(0) = 0` ($y=0$)
* **Quy tắc vàng:** *"Góc xuất phát từ trục nào, thì trục đó là cạnh kề ($\cos$). Trục còn lại là cạnh đối ($\sin$)".*

### 6.3. Kỹ thuật bù góc `- Math.PI / 2` để đưa nốt về đỉnh 12 giờ
Để thỏa mãn thị giác con người (nốt đầu tiên nằm ở đỉnh 12h như đồng hồ), ta chỉ việc lấy góc trừ đi $90^\circ$ ($\frac{\pi}{2}$ radians):
```ts
const angle = (index / total) * 2 * Math.PI - Math.PI / 2
const x = centerX + radius * Math.cos(angle)
const y = centerY + radius * Math.sin(angle)
```
*(Cộng thêm `centerX, centerY` để dời tâm đồ thị từ góc trên bên trái $(0, 0)$ ra chính giữa màn hình).*

### 6.4. Thuật toán tìm và nối dây liên kết (`graphEdges`): Tại sao `j = i + 1`?
* **Bài toán:** Cho danh sách các nốt, tìm xem nốt nào có quan hệ với nốt nào để vẽ đường nối:
  * Hai nốt có chung thư mục (`noteA.folderId === noteB.folderId`), hoặc
  * Có ít nhất 1 thẻ tag chung (`noteA.tags.some(t => noteB.tags.includes(t))`).
* **Kỹ thuật tối ưu $O(1)$ với `nodeMap`:**
  * Dùng `new Map(graphNodes.map(n => [n.id, n]))` để tạo danh bạ tra cứu tọa độ nhanh $O(1)$ thay vì dùng `.find()` quét mảng chậm chạp.
* **Cú "Aha!" về 2 vòng lặp lồng nhau:**
  ```ts
  for (let i = 0; i < graphNodes.length; i++) {
    for (let j = i + 1; j < graphNodes.length; j++) { // 👈 Bắt đầu từ i + 1
  ```
  * **Nếu $j = 0$:**
    1. Khi $j = i$: Nốt $A$ trùng với nốt $B \rightarrow$ tự thấy mình chung folder với chính mình $\rightarrow$ sinh ra **đường nối tự thân (self-loop)** lãng phí!
    2. Khi $j < i$: Đồ thị là vô hướng (A nối B cũng là B nối A), chạy từ $j = 0$ sẽ sinh ra **2 đường kẻ đè khít lên nhau** $\rightarrow$ tốn gấp đôi DOM và GPU render.
  * **Giải pháp:** Cho $j = i + 1$ vừa **triệt tiêu self-loop**, vừa **đảm bảo mỗi cặp nốt chỉ xét đúng 1 lần duy nhất**!

### 6.5. Bản chất xếp lớp trong SVG: Tại sao `<line>` phải vẽ trước `<circle>`?
* **Điểm khác biệt chí mạng giữa HTML/CSS và SVG:**
  * Trong CSS thông thường, ta có thể dùng `z-index: 10` để ép phần tử nổi lên trên.
  * Trong SVG: **Không có thuộc tính `z-index`!** Thứ tự khai báo trong code quyết định thứ tự vẽ lên màn hình (Painter's Algorithm): **Cái gì viết trước sẽ nằm ở đáy, cái gì viết sau sẽ đè lên trên.**
* **Ứng dụng thực tế:**
  * Ta bắt buộc phải đặt `<g className="edges">` (vẽ các đường `<line>`) **TRƯỚC** `<g className="node">` (vẽ các nốt `<circle>`).
  * Nhờ đó, các đường dây nối sẽ luồn ra phía sau lưng các nốt tròn, không bao giờ bị gạch ngang qua mặt nốt!

### 6.6. Tương tác Mạng Lưới (Ego-Network Hover & Click Navigation)
* **Nhận diện dây nối khi Hover một nốt:**
  ```tsx
  const isHovered = hoveredNoteId && (edge.sourceId === hoveredNoteId || edge.targetId === hoveredNoteId)
  ```
  * Khi di chuột vào một nốt, toàn bộ các đường liên kết nối trực tiếp với nốt đó (Ego-Network) sẽ bừng sáng (`stroke="#818cf8"`, dày hơn, opacity cao), còn các dây khác mờ đi. Giúp người dùng nhìn rõ cấu trúc liên kết tri thức cục bộ.
* **Click mở ghi chú:**
  * Bắt sự kiện `onClick`: dùng `e.stopPropagation()` để tránh nổi bọt sự kiện, sau đó dispatch action `selectNote(node.id)`.
  * Redux Store lập tức cập nhật `activeNoteId` và chuyển view sang `ViewMode.DOCUMENT`, tạo trải nghiệm liền mạch từ lúc khám phá mạng đồ thị đến lúc bắt tay vào soạn thảo văn bản!

### 6.7. Kỹ thuật Nền Lưới Điểm (Dot Matrix Grid) & Cái bẫy thẻ `<defs>`
* **Mục tiêu:** Tạo không gian canvas vô cực với các chấm ma trận tinh xảo giống Figma và Linear.
* **Cú pháp định nghĩa trong `<defs>`:**
  ```xml
  <defs>
    <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#404040" opacity="0.4" />
    </pattern>
  </defs>
  ```
* **Vẽ nền lên màn hình:**
  ```xml
  <rect width="100%" height="100%" fill="url(#dot-grid)" />
  ```
* **Cái bẫy kinh điển (SVG Pitfall):**
  * Thẻ `<defs>` (definitions) chỉ là **kho chứa các định nghĩa trừu tượng** (patterns, filters, gradients). Bất kỳ phần tử nào nằm BÊN TRONG `<defs>` đều bị trình duyệt ẩn đi, không bao giờ được vẽ ra màn hình!
  * 👉 **Quy tắc:** Thẻ `<rect fill="url(#dot-grid)">` **bắt buộc phải nằm NGOÀI `<defs>`** thì lưới điểm mới hiển thị.
  * **Lưu ý cú pháp:** `id` khai báo và `url(#id)` gọi ra phải khớp nhau từng ký tự, mã màu hex phải luôn có dấu thăng `#` (`fill="#404040"` thay vì `"404040"`).

### 6.8. Kỹ thuật Dây Nối Laser Đa Lớp (Dual-Layer Glow Lines) & Bộ Lọc Neon
* **Bí kíp đồ họa Cyberpunk / Game UI:** Để một đường kẻ trông như một sợi dây laser phát sáng, ta không chỉ đổi màu đơn thuần mà vẽ **2 lớp đè lên nhau (Dual-Layer)**:
  1. **Lớp hào quang bên ngoài (Outer Glow):** Nét dày (`strokeWidth={6}`), mờ (`strokeOpacity={0.35}`), áp dụng `filter="url(#glow)"` để tạo quầng khói phát quang sương mù.
  2. **Lớp lõi năng lượng bên trong (Inner Core):** Nét mảnh (`strokeWidth={2}`), màu sáng rực (`strokeOpacity={1}`) tạo độ sắc nét trung tâm.
* **Đoạn code minh họa:**
  ```tsx
  {isHovered && (
    <line
      x1={edge.sourceX} y1={edge.sourceY}
      x2={edge.targetX} y2={edge.targetY}
      stroke="#818cf8" strokeWidth={6} strokeOpacity={0.35}
      filter="url(#glow)"
    />
  )}
  <line
    x1={edge.sourceX} y1={edge.sourceY}
    x2={edge.targetX} y2={edge.targetY}
    stroke={isHovered ? '#a5b4fc' : '#334155'}
    strokeWidth={isHovered ? 2 : 1}
    strokeOpacity={isHovered ? 1 : 0.4}
  />
  ```
* **Bản chất của SVG Filter (`feGaussianBlur` & `feMerge`):**
  * `<feGaussianBlur stdDeviation="6" result="blur" />`: Làm nhòe đối tượng gốc ra 6px theo mọi hướng.
  * `<feMerge>`: Ghép lớp ảnh nhòe (`blur`) và ảnh gốc (`SourceGraphic`) đè lên nhau $\rightarrow$ Vật thể vừa có quầng hào quang vừa giữ được độ sắc cạnh ở tâm.
* **Quầng sáng nốt tròn (Halo Circle):** Đặt thêm một `<circle>` to hơn (`node.radius + 8`) có `opacity={0.3}` và `filter="url(#glow)"` ngay sau nốt tròn khi active hoặc hover.

---

## 7. Lưu Trữ Dữ Liệu Ổ Cứng (Local-First Persistence) & Cầu Nối IPC trong Electron

* **File liên quan:** `src/main/index.ts`, `src/preload/index.ts`, `src/renderer/src/app/store.ts`
* **Vấn đề cốt lõi:** Làm sao để ứng dụng Desktop lưu trữ dữ liệu vĩnh viễn trên máy người dùng mà không cần thuê server backend, không bị giới hạn dung lượng, và bảo mật tuyệt đối?

### 7.1. Tại sao chọn Local-First Ổ Cứng cho Người Dùng Thật?

Khi xây dựng sản phẩm đưa đến tay người dùng thật, ta phải cân nhắc 4 phương án:

| Phương án | Đặc điểm | Phân tích lý do Chọn / Loại |
| :--- | :--- | :--- |
| **`localStorage`** | Lưu trong sandbox trình duyệt | ❌ **LOẠI BỎ NGAY:** Giới hạn ngặt nghèo ~5MB. Viết vài chục bài là tràn bộ nhớ (`QuotaExceededError`). Xóa cache trình duyệt là mất sạch dữ liệu. |
| **Cloud Server** (PostgreSQL/NodeJS) | Dữ liệu lưu trên đám mây | ❌ **CHƯA NÊN DÙNG:** Chi phí server hàng tháng tăng theo số lượng người dùng (dễ phá sản khi chưa có doanh thu). Mất mạng Internet là ứng dụng tê liệt. |
| **Embedded DB** (SQLite) | 1 file database `.sqlite` trên máy | ⚠️ **CÂN NHẮC SAU:** Rất mạnh nhưng việc compile native addon C++ (`better-sqlite3`) trong Electron cực kỳ dễ lỗi khi đóng gói `.exe` đa nền tảng. |
| **Local-First File System** (JSON / Markdown) | Lưu trực tiếp vào ổ cứng máy tính | ✅ **LỰA CHỌN TỐI ƯU SỐ 1 (Chuẩn Obsidian):**<br>1. **Chi phí $0:** Máy người dùng là server, 1 triệu người dùng tiền server vẫn là 0đ.<br>2. **Dung lượng vô hạn:** Thoải mái lưu hàng trăm ngàn ghi chú theo dung lượng ổ cứng.<br>3. **Quyền riêng tư & Tin cậy:** Dữ liệu thuộc về người dùng, có thể tự backup vào Google Drive/USB.<br>4. **Tốc độ 0.1s & Offline 100%:** Không có vòng xoay chờ mạng. |

### 7.2. Kiến Trúc 2 Thế Giới trong Electron: Main Process vs Renderer Process

Electron chia ứng dụng thành 2 tiến trình độc lập được ngăn cách bởi bức tường bảo mật:

```
┌──────────────────────────────────────┐               ┌──────────────────────────────────────┐
│       RENDERER PROCESS (React)       │               │        MAIN PROCESS (Node.js)        │
│                                      │   CẦU NỐI IPC │                                      │
│ • Chạy giao diện, Redux, sự kiện DOM │ ────────────► │ • Chạy môi trường Node.js đầy đủ     │
│ • BỊ CẤM chạm trực tiếp vào ổ cứng   │ ◄──────────── │ • Có chìa khóa đọc/ghi ổ cứng (fs)   │
│   (để hacker không đọc trộm máy tính)│  (Bất đồng bộ)│ • Quản lý cửa sổ sổ hệ điều hành     │
└──────────────────────────────────────┘               └──────────────────────────────────────┘
                   ▲                                                      │
                   │           ┌──────────────────────────────┐           │
                   └────────── │ PRELOAD SCRIPT (Hải quan)    │ ──────────┘
                               │ • contextBridge              │
                               │ • Chỉ mở các API an toàn     │
                               └──────────────────────────────┘
```

1. **Renderer Process (`src/renderer`):** Nơi React chạy. Vì chạy trong môi trường Chromium webview, Renderer **không có quyền** gọi `fs.writeFile` trực tiếp.
2. **Main Process (`src/main`):** Tiến trình cha chạy bằng Node.js thật. Có toàn quyền truy cập hệ điều hành qua `fs` và `app.getPath('userData')`.
3. **Preload Script (`src/preload`):** Đóng vai trò là "cửa khẩu hải quan" an toàn. Dùng `contextBridge.exposeInMainWorld` để chỉ cho phép React gọi những hàm được cấp phép.

### 7.3. Cầu Nối IPC (Inter-Process Communication) & Preload Script

* **Gửi yêu cầu từ React:**
  ```ts
  // Renderer gọi
  const result = await window.api.saveNotes(notesData)
  ```
* **Chuyển tiếp qua Preload:**
  ```ts
  // preload/index.ts
  contextBridge.exposeInMainWorld('api', {
    saveNotes: (data) => ipcRenderer.invoke('notes:save', data),
    loadNotes: () => ipcRenderer.invoke('notes:load')
  })
  ```
* **Main đón nhận và ghi ổ cứng:**
  ```ts
  // main/index.ts
  ipcMain.handle('notes:save', async (_, data) => {
    const filePath = join(app.getPath('userData'), 'seramuse-data.json')
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return { success: true }
  })
  ```
* 👉 **Kết luận:** File `seramuse-data.json` chính là **Database** của ứng dụng! Không cần bất kỳ backend server hay database engine riêng biệt nào.

### 7.4. Hai Kỹ Thuật Bắt Buộc: Debounced Auto-Save & Store Hydration

1. **Kỹ thuật Debounced Auto-Save (Chống nghẽn ổ đĩa):**
   * Người dùng gõ 1 câu văn dài có thể nhấn phím 50 lần trong 5 giây.
   * Nếu mỗi lần nhấn phím mà ép ổ SSD ghi file 1 lần $\rightarrow$ App sẽ bị giật lag và hao mòn ổ cứng.
   * **Giải pháp:** Sử dụng hàm Debounce (500ms – 1000ms). Người dùng gõ liên tục thì Redux cứ nhận trên RAM, chỉ khi họ **ngừng gõ 500ms** thì mới gom toàn bộ dữ liệu ghi xuống ổ cứng một lần duy nhất!
2. **Kỹ thuật Store Hydration (Hồi sinh dữ liệu lúc khởi động):**
   * Khi app vừa bật lên: Main Process đọc file `seramuse-data.json`.
   * Gửi dữ liệu về cho React $\rightarrow$ Dispatch action `setInitialState(data)` vào Redux.
   * Toàn bộ cây thư mục, danh sách ghi chú, trạng thái Kanban và đồ thị Graph hiện lên nguyên vẹn 100%.

### 7.5. Phương Pháp "3 Không - 3 Bước" để Giữ Não Kỹ Sư khi Học Cùng AI

1. **Không tự bơi mù quáng trên Google:** Tránh lạc vào các bài viết lỗi thời (như dùng `remote module` đã bị Electron khai tử vì lỗ hổng bảo mật).
2. **Không chép code máy móc từ AI:** Luôn nắm bản đồ luồng đi (Ai gửi $\rightarrow$ Qua đâu $\rightarrow$ Ai nhận) trước khi gõ phím.
3. **Thực hành có kiểm chứng & Cố tình làm hỏng để hiểu (Deliberate Debugging):**
   * Gõ thử `console.log` ở cả 2 cửa sổ (DevTools của React và Terminal của Electron) để tận mắt thấy gói tin bay qua bức tường IPC.
   * Mở thư mục Windows Explorer (`%APPDATA%/seramuse`) sờ tận tay file `seramuse-data.json`.

---

## 8. Phản Tỉnh Kỹ Thuật (Gibbs' Reflective Cycle): Thiết Kế IconPicker & Ranh Giới Smart vs Dumb Component

* **Ngày thực hiện:** 22/09/2026
* **File liên quan:** `src/renderer/src/features/notes/components/IconPicker.tsx`, `NoteEditor.tsx`
* **Chủ đề:** Tái cấu trúc tư duy thiết kế Component (Component Architecture, Reusability & Single Responsibility Principle)

### 8.1. Mô tả Thực tế (Description)
Khi xây dựng tính năng chọn biểu tượng cho ghi chú (`IconPicker`), tôi đã chủ động đề xuất giải pháp: để `IconPicker` tự kết nối thẳng vào Redux Store (đọc `activeNoteId` và tự dispatch action thêm/xóa icon). Ý định ban đầu của tôi là muốn "đóng gói toàn bộ logic vào component con" để component cha (`NoteEditor`) hoàn toàn rảnh tay và sạch sẽ. Tuy nhiên, sau khi được Mentor / AI code review, giải pháp này bị chỉ ra nhiều điểm trừ nghiêm trọng về mặt kiến trúc.

### 8.2. Cảm xúc Ban đầu (Feelings)
* **Trước khi review:** Rất tự tin vì nghĩ rằng cách làm của mình đã đạt chuẩn "Clean Code" (ai làm việc nấy).
* **Sau khi review:** Ban đầu có chút hụt hẫng vì giải pháp tâm đắc bị bác bỏ. Nhưng sau khi nghe giải thích về bài toán mở rộng trong tương lai, tôi cảm thấy hoàn toàn bị thuyết phục và có một khoảnh khắc "Aha!" mở rộng tư duy kiến trúc.

### 8.3. Đánh giá Khách quan (Evaluation)
* **Mặt tích cực (Cái được):**
  * Đã có ý thức về tính đóng gói (Encapsulation) và chủ động đưa ra giải pháp thay vì thụ động chờ AI viết hộ.
  * Quá trình phản biện giúp phát hiện lỗ hổng kiến trúc ngay từ giai đoạn thiết kế, tiết kiệm hàng giờ debug và refactor sau này.
* **Mặt hạn chế (Cái chưa tốt):**
  * **Gắn kết quá chặt (Tight Coupling):** Component bị trói cứng vào `activeNoteId` của Redux.
  * **Khả năng tái sử dụng bằng 0 (Zero Reusability):** Không thể dùng lại bộ chọn này cho Thư mục (Folder), Nhãn dán (Tag) hay Profile User.
  * **Vi phạm nguyên lý đơn nhiệm (Single Responsibility Principle):** Biến một UI Widget thuần túy thành một component ôm đồm nghiệp vụ (Business Logic).
  * **Rủi ro lỗi runtime (Edge Case):** Nếu `activeNoteId` bị `null` (khi xóa hết ghi chú), component sẽ truy cập thuộc tính của `null` và làm sập (crash) trắng ứng dụng.

### 8.4. Phân tích Cốt lõi (Analysis)
* **Nguyên nhân gốc rễ:** Tôi đã nhầm lẫn giữa **"Gom gọn code"** và **"Phân tách trách nhiệm (Separation of Concerns)"**. Tôi chưa phân biệt rạch ròi ranh giới giữa **Smart Component (Container)** và **Dumb Component (Presentational)**.
* **Bản chất vấn đề:** Các thư viện picker nổi tiếng (như DatePicker, ColorPicker) không bao giờ tự ý lưu dữ liệu vào database hay Redux. Nhiệm vụ duy nhất của một "Picker" là: **Hiển thị giao diện và trả về giá trị người dùng vừa chọn qua sự kiện `onChange`**. Việc dùng giá trị đó làm gì phải do component cha quyết định.

### 8.5. Kết luận Rút ra (Conclusion)
1. **Thiết kế UI Widget phải có tính trừu tượng:** Đã là "Picker" dùng chung thì tuyệt đối không được phụ thuộc vào dữ liệu của một đối tượng cụ thể (như `activeNoteId`).
2. **Tư duy Dumb Component:** Nhận dữ liệu qua `props` (`currentIcon`) và phát sự kiện ra ngoài qua `callback` (`onSelectIcon`, `onRemoveIcon`). Nhờ đó, sau này tính năng đổi icon cho Thư mục hay Kanban có thể tái sử dụng 100% component này mà không phải viết lại 1 dòng code nào.
3. **Cảnh giác với Edge Cases:** Phải luôn lường trước các trường hợp state rỗng (`null` / `undefined`) khi gắn kết component với Global State.

### 8.6. Kế hoạch Hành động (Action Plan)
* **Hành động tức thì:** Áp dụng ngay kiến trúc **Dumb Component** cho `IconPicker.tsx`: chỉ nhận `props` và phát `callback`, đưa logic dispatch Redux về đúng vị trí của nó tại component cha (`NoteEditor.tsx`).
* **Nguyên tắc cho các tính năng tiếp theo:** Trước khi tạo bất kỳ component mới nào, luôn tự vấn bộ 3 câu hỏi:
  1. *Component này là Smart (xử lý logic) hay Dumb (chỉ hiển thị UI)?*
  2. *Nó có thể tái sử dụng cho đối tượng khác trong tương lai không?*
  3. *Nó có đang ôm đồm việc của component cha không?*

---

## 9. Phản Tỉnh Kỹ Thuật (Gibbs' Reflective Cycle): Cạm Bẫy State Cục Bộ (`useState`) vs Global Store (Single Source of Truth)

* **Ngày thực hiện:** 22/09/2026
* **File liên quan:** [`src/renderer/src/features/notes/components/NoteEditor.tsx`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/features/notes/components/NoteEditor.tsx), [`src/renderer/src/features/notes/notesSlice.ts`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/features/notes/notesSlice.ts)
* **Chủ đề:** Quản lý State trong React & Redux Toolkit (Local State vs Global State, Single Source of Truth, React Component Lifecycle & Re-render Trap)

### 9.1. Mô tả Thực tế (Description)
Khi tích hợp `IconPicker` vào giao diện của `NoteEditor.tsx`, ban đầu tôi đã sử dụng hook `useState` cục bộ bên trong `NoteEditor` để quản lý biểu tượng được chọn. 
**Hiện tượng lỗi phát sinh:** Khi chuyển qua lại giữa các ghi chú khác nhau (ví dụ từ Note A sang Note B), biểu tượng không hề được lưu lại đúng theo từng ghi chú. Biểu tượng của ghi chú này bị rò rỉ (state bleeding) sang ghi chú kia, hoặc khi chọn icon mới rồi chuyển sang note khác quay lại thì icon bị mất/reset, không giữ được dữ liệu riêng biệt của từng note.

### 9.2. Cảm xúc Ban đầu (Feelings)
* **Trước review:** Cảm thấy tự tin vì đã tự tay gõ xong code, thấy picker bật lên và chọn được icon thì đinh ninh là mình đã hoàn thành tốt mà không cần đến review hay trợ giúp.
* **Sau review & kiểm thử chuyển note:** Có một thoáng giật mình và nhận ra sự thiếu sót lớn. Tôi nhận ra mình đã quá vội vã dùng `useState` theo thói quen phản xạ mà quên mất rằng dự án đã có sẵn Redux Store và action `updateNoteIcon` được thiết kế chuyên biệt để quản lý dữ liệu toàn cục.

### 9.3. Đánh giá Khách quan (Evaluation)
* **Mặt tích cực (Cái được):**
  * **Tư duy độc lập (Autonomous Mindset):** Tự suy nghĩ và tự code theo tư duy cá nhân, không hình thành thói quen thụ động dựa dẫm hay copy-paste mù quáng từ AI.
  * **Học từ phản biện thực tế (Deliberate Practice):** Nhờ có quy trình review và góc nhìn kiểm thử ca biên (Edge Case: chuyển đổi qua lại giữa các items), tôi lập tức nhìn thấy ngay lỗi sai, hiểu được tại sao lỗi xuất hiện và sửa lại kịp thời.
* **Mặt hạn chế (Cái chưa tốt):**
  * **Thiếu chú ý về vòng đời Component (Component Lifecycle):** Chưa tính đến việc khi người dùng đổi ghi chú, component `NoteEditor` không hề bị unmount/mount lại mà chỉ nhận `props` mới. Dẫn đến `useState` cục bộ bị "kẹt" giá trị cũ (Stale State).
  * **Vi phạm nguyên lý nguồn chân lý duy nhất (Dual State / Split-Brain):** Vô tình duy trì 2 nguồn dữ liệu cho cùng 1 thuộc tính: một ở Redux và một ở `useState`.

### 9.4. Phân tích Cốt lõi (Analysis)
* **Bản chất kỹ thuật (Mental Model):**
  * **State UI tạm thời (Ephemeral / Transient UI State):** Chỉ nên dùng `useState` cho những trạng thái hiển thị mang tính nhất thời, không gắn liền với bản ghi dữ liệu (ví dụ: menu/popover đang mở hay đóng `isOpen`, tab nào đang focus, con trỏ đang hover). Vòng đời của chúng gắn chặt với component UI.
  * **State Dữ liệu Thực thể (Persistent Domain / Entity State):** Thuộc tính của một ghi chú (`title`, `content`, `icon`, `status`, `tags`) thuộc về **Mô hình Dữ liệu (Data Model)**. Chúng bắt buộc phải nằm trong Redux Store (hoặc Database), được định danh bởi `id` của bản ghi để đảm bảo tính độc lập và bền vững (Persistence).
* **Cái bẫy React Lifecycle kinh điển:**
  * Khi người dùng click chọn một ghi chú khác, Redux cập nhật `activeNoteId`. `NoteEditor` nhận `activeNote` mới nhưng **DOM node của `NoteEditor` vẫn được giữ nguyên (không unmount)**.
  * Trong React, `useState(initialValue)` **chỉ khởi tạo đúng một lần duy nhất** khi component mount lần đầu. Khi component re-render với props mới, React sẽ hoàn toàn **bỏ qua** đối số `initialValue` đó! Kết quả là state cục bộ tiếp tục giữ giá trị của note trước đó, gây ra lỗi "rò rỉ icon" giữa các note.

### 9.5. Kết luận Rút ra (Conclusion)
1. **Dữ liệu thuộc về Model phải luôn có Single Source of Truth:** Bất kỳ thuộc tính nào của `Note` đều phải được đọc trực tiếp từ `activeNote` trong Redux Store (`activeNote.icon || ''`). Không bao giờ tạo bản sao trung gian bằng `useState`.
2. **Luồng dữ liệu một chiều rõ ràng (Unidirectional Data Flow):**
   * **Đọc:** `activeNote.icon` từ Redux Store $\rightarrow$ truyền làm `currentIcon` cho `IconPicker`.
   * **Ghi:** Khi người dùng chọn/xóa icon $\rightarrow$ `dispatch(updateNoteIcon({ id: activeNote.id, icon }))` cập nhật thẳng vào Redux $O(1)$.
3. **Phân biệt rạch ròi trước khi code:** Dữ liệu này có cần tồn tại sau khi chuyển note hoặc đóng mở popup không? Nếu CÓ $\rightarrow$ Redux Store. Nếu KHÔNG $\rightarrow$ `useState`.

### 9.6. Kế hoạch Hành động (Action Plan)
* **Hành động đã hoàn thành:** Đã chỉnh sửa lại `NoteEditor.tsx`, loại bỏ hoàn toàn `useState` dư thừa, kết nối trực tiếp `activeNote.icon` và `dispatch(updateNoteIcon)`. Kiểm thử thực tế chuyển qua lại giữa 5 ghi chú khác nhau: icon hiển thị chính xác, lưu độc lập và mượt mà 100%!
* **Nguyên tắc rèn luyện:**
  * **Quy tắc 30 giây:** Luôn dừng lại 30 giây để phân tích phạm vi lưu trữ state (Local vs Global) trước khi quyết định viết `useState`.
  * **Bài test chuyển đổi thực tế (Multi-item Switch Test):** Sau khi hoàn thành bất kỳ trường dữ liệu mới nào, luôn tạo ít nhất 2 items và chuyển đổi qua lại để kiểm tra tính toàn vẹn dữ liệu trước khi coi là hoàn thành.

## 10. Kiến Trúc Định Tuyến TanStack Router & Phân Tầng Feature-Based

* **Ngày thực hiện:** 30/09/2026
* **File liên quan:** [`src/renderer/src/routes/index.tsx`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/routes/index.tsx), [`src/renderer/src/routes/home/index.tsx`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/routes/home/index.tsx), [`src/renderer/src/routes/__root.tsx`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/routes/__root.tsx), [`routeTree.gen.ts`](file:///d:/seramuse/Seramuse-Desktop/src/renderer/src/routeTree.gen.ts), [`tsconfig.web.json`](file:///d:/seramuse/Seramuse-Desktop/tsconfig.web.json)
* **Chủ đề:** Type-Safe Routing (TanStack Router), File-based Routing, Gatekeeper / Dispatcher Pattern & Separation of Concerns trong Desktop App.

### 10.1. Phân biệt Bản chất: Route ID vs. Navigation Path trong TanStack Router

* **Rào cản / Bối rối ban đầu:**
  Khi tạo file route `routes/home/index.tsx`, file sinh tự động `routeTree.gen.ts` xuất hiện đoạn khai báo gây nhầm lẫn:
  - `id: '/home/'` (kèm dấu gạch chéo cuối).
  - `path: '/home'` (không kèm dấu gạch chéo).
  - Thuộc tính `to` của `<Link to="...">` chỉ chấp nhận `'/home'` mà từ chối `'/home/'`.
* **Bản chất kỹ thuật (Mental Model):**
  1. **Route ID nội bộ (`createFileRoute('/home/')`):** Gắn liền với cấu trúc cây thư mục file-system. Trong TanStack Router, bất kỳ file `index.tsx` nào nằm trong thư mục con đều được gán route ID kết thúc bằng dấu `/` để phân biệt với route lá thông thường.
  2. **Navigation Path (`to: '/home'`):** Là chuỗi URL ngữ nghĩa dùng để điều hướng. TanStack Router loại bỏ trailing slash mặc định khi tạo Type cho `FileRoutesByTo`. Nếu gõ nhầm `<Link to="/home/">`, hệ thống type-safe sẽ chặn ngay ở lúc compile để tránh phân mảnh URL.
  3. **Nguyên tắc vàng:** File `routeTree.gen.ts` là **Auto-generated artifact**. Tuyệt đối không sửa tay vào file này vì Vite Router Plugin sẽ tự động ghi đè mỗi khi lưu code route.

### 10.2. Dispatcher / Gatekeeper Pattern tại Route Gốc (`/`)

* **Bối cảnh kiến trúc:** 
  Dự án áp dụng mô hình phân tầng:
  - `features/`: Nghiệp vụ độc lập (`editor`, `kanban`, `graph`, `login`).
  - `pages/`: Hợp thành giao diện màn hình hoàn chỉnh (`pages/home/HomePage.tsx`, `pages/auth/LoginPage.tsx`).
  - `routes/`: **Tầng mỏng nhất (Thinnest layer)**, chỉ chịu trách nhiệm định tuyến, gom route guards và nhúng Page.
* **Vấn đề khi xóa route `"/"` để chuyển sang `routes/home/index.tsx`:**
  - Ứng dụng Desktop khi khởi động luôn trỏ về URL gốc `"/"`. Nếu không có route `"/"`, app sẽ rơi vào Not Found / màn hình trắng.
  - Các liên kết `<Link to="/">` trên thanh điều hướng bị gãy và báo lỗi TypeScript (`Type '"/"' is not assignable to type ...`).
* **Khoảnh khắc "Aha!" - Áp dụng Gatekeeper Pattern:**
  Thay vì biến route `"/"` thành một trang hiển thị cụ thể, ta biến `src/renderer/src/routes/index.tsx` thành một **Trạm điều phối giao thông (Dispatcher / Gatekeeper)** không render UI:
  ```tsx
  // src/renderer/src/routes/index.tsx
  import { createFileRoute, redirect } from '@tanstack/react-router'

  export const Route = createFileRoute('/')({
    beforeLoad: () => {
      // 1. Kiểm tra trạng thái đăng nhập đồng bộ từ Local Storage (Chuẩn Local-First Desktop)
      const isAuthenticated = Boolean(localStorage.getItem('token'))

      // 2. Chuyển hướng tức thì trước khi render DOM
      if (!isAuthenticated) {
        throw redirect({ to: '/login' })
      }
      throw redirect({ to: '/home' })
    }
  })
  ```
* **Lợi ích kiến trúc:**
  - **Zero Latency & Tránh FOUC (Flash of Unauthenticated Content):** Hook `beforeLoad` chặn render và chuyển hướng ngay trong micro-giây, giao diện mượt mà không nhấp nháy.
  - **Single Responsibility:** `HomePage` và `LoginPage` hoàn toàn trong sạch (pure), không bị ô nhiễm logic "tự kiểm tra auth rồi tự redirect".

### 10.3. Bộ đệm Phân giải Module (Module Resolution Cache) của TypeScript Server

* **Rào cản:** 
  Sau khi di chuyển file sang thư mục mới `src/renderer/src/shared/note/types.ts`, dòng lệnh `tsc` và `eslint` báo kết quả pass 100% nhưng trên IDE vẫn hiện vạch đỏ:
  `Cannot find module '@/shared/note/types' or its corresponding type declarations`.
* **Bản chất kỹ thuật:**
  - TypeScript Language Server chạy ngầm trong IDE duy trì một bảng băm (In-memory Cache Map) các đường dẫn file.
  - Khi xóa/tạo mới thư mục trong lúc IDE đang mở, cache này chưa tự động cập nhật alias `@/*` tới các file mới tạo.
* **Cách xử lý chuẩn:**
  1. Sử dụng lệnh `Ctrl + Shift + P` $\rightarrow$ `TypeScript: Restart TS Server` để làm mới bộ đệm phân giải module.
  2. Đảm bảo cấu hình JSON chuẩn (loại bỏ trailing comma trong `tsconfig.web.json`).

---

## 11. MẪU GHI NHẬT KÝ CHO CÁC TÍNH NĂNG TIẾP THEO (TEMPLATE)

```markdown
## [Số]. Ngày DD/MM/YYYY: Chức năng [Tên chức năng]

* **File liên quan:** `src/...`
* **Vấn đề cần giải quyết:** ...

### [Số].1. [Vấn đề / Thắc mắc gặp phải]
* **Rào cản / Câu hỏi:** ...
* **Bản chất kỹ thuật ("Aha!" moment):** ...
* **Đoạn code minh họa:** ...
```

---

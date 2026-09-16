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
7. [Mẫu ghi nhật ký cho các tính năng tiếp theo (Template)](#7-mẫu-ghi-nhật-ký-cho-các-tính-năng-tiếp-theo-template)

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

---

## 7. MẪU GHI NHẬT KÝ CHO CÁC TÍNH NĂNG TIẾP THEO (TEMPLATE)

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

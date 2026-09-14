# NHẬT KÝ TIẾN ĐỘ & CHECKLIST PHÁT TRIỂN (DEV LOG)

> **Dự án:** Seramuse Desktop
> **Mục tiêu:** Tự tay xây dựng hệ thống quản lý tri thức cá nhân (PKM) trên Electron + React + TypeScript + Redux Toolkit.
> **Cập nhật lần cuối:** 12/09/2026

---

## BẢNG TIẾN ĐỘ TỔNG THỂ (OVERVIEW TRACKER)

|  Giai đoạn  | Tên Phase                                   | Số bước |    Trạng thái     | Đánh giá / Ghi chú                                        |
| :---------: | :------------------------------------------ | :-----: | :---------------: | :-------------------------------------------------------- |
| **Phase 1** | **Quản lý Dữ liệu Cốt lõi (Store & Slice)** |    3    | 🟢 **Hoàn thành** | Đã định nghĩa types, slice reducers và kết nối root store |
| **Phase 2** | **Bố cục 2 Cột (Split-Pane Layout)**        |    2    | 🟢 **Hoàn thành** | Sidebar danh sách + Vùng hiển thị chính                   |
| **Phase 3** | **Đồng bộ Soạn thảo Cơ bản**                |    1    | 🟢 **Hoàn thành** | Controlled Components (Title Input & Content Textarea)    |
| **Phase 4** | **Tích hợp Tiptap Rich-Text Editor**        |    3    | 🟢 **Hoàn thành** | Headless Editor v3 + key remounting + autofocus           |
| **Phase 5** | **Cây Thư mục & Bảng Thuộc tính Tri thức**  |    2    | 🟢 **Hoàn thành** | Folder Tree + Status Enum + Notion Properties Table + Tags |
| **Phase 6** | **Tính năng Nâng cao (Kanban & Graph)**     |    3    | 🟡 **Tiếp theo**  | Notion Kanban board + Obsidian SVG Knowledge Graph        |

---

## CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 🟢 PHASE 1: QUẢN LÝ DỮ LIỆU CỐT LÕI (CORE DATA & STORE)

- [x] **Bước 1.1: Định nghĩa Data Model (`types.ts`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/types.ts`
  - **Kết quả:** Đã định nghĩa interface `Note` và `NoteState` với cấu trúc `Record<string, Note>` tối ưu $O(1)$.

---

- [x] **Bước 1.2: Xây dựng Redux Slice (`notesSlice.ts`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/notesSlice.ts`
  - **Kết quả:** Đã hoàn thành các actions: `createNote`, `selectNote`, `updateNoteTitle`, `updateNoteContent`, `deleteNote` kèm xử lý an toàn `activeNoteId`.

---

- [x] **Bước 1.3: Đăng ký Slice vào Root Store (`store.ts`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/app/store.ts`
  - **Kết quả:** Đã đăng ký `notesReducer` vào Root Store, `typecheck` vượt qua 100%.

---

### 🟢 PHASE 2: BỐ CỤC 2 CỘT (SPLIT-PANE LAYOUT)

- [x] **Bước 2.1: Xây dựng Component Sidebar (`Sidebar.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/components/Sidebar.tsx`
  - **Kết quả:** Đã lấy danh sách ghi chú từ Store, tạo mới note, chọn note, xóa note có stopPropagation và highlight note active.

---

- [x] **Bước 2.2: Ghép vào Layout Trang Chủ (`Home.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/home/Home.tsx`
  - **Kết quả:** Đã thiết lập Split-Pane 2 cột: Sidebar cố định bên trái, Main Area bên phải hiển thị NoteEditor hoặc màn hình trống.

---

### 🟢 PHASE 3: ĐỒNG BỘ SOẠN THẢO CƠ BẢN (CONTROLLED COMPONENTS)

- [x] **Bước 3.1: Xây dựng Component NoteEditor (`NoteEditor.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/components/NoteEditor.tsx`
  - **Kết quả:** Đã đồng bộ real-time Title input và Content textarea với Redux Store.
  - **Ghi chú kỹ thuật:** Đã ghi nhận tip về **Debounce khi tích hợp Persistence/IPC** vào `STEP_BY_STEP_GUIDE.md` để áp dụng khi làm tính năng lưu đĩa/database.

---

### 🟢 PHASE 4: TÍCH HỢP RICH-TEXT VỚI TIPTAP V3

- [x] **Bước 4.1: Cấu hình Headless Tiptap Editor (`TiptapEditor.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/components/TiptapEditor.tsx`
  - **Kết quả:** Đã tích hợp `@tiptap/react`, `StarterKit` và extension `Placeholder`. Hỗ trợ đầy đủ các cú pháp Markdown (Headings, Lists, Blockquote, Code block).

---

- [x] **Bước 4.2: Cơ chế Reset Vòng đời & Giải quyết Triệt để Bẫy Con trỏ Nhảy (`NoteEditor.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/components/NoteEditor.tsx`
  - **Kết quả:** Áp dụng kỹ thuật `key={activeNote.id}` để unmount/mount sạch sẽ giữa các ghi chú, loại bỏ hoàn toàn bẫy lỗi con trỏ nhảy và cô lập lịch sử Undo/Redo cho từng bài viết.

---

- [x] **Bước 4.3: Tối ưu Trải nghiệm Soạn thảo (Autofocus & UX)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/components/TiptapEditor.tsx`
  - **Kết quả:** Kích hoạt `autofocus: 'end'` giúp con trỏ tự động nhấp nháy sẵn sàng ở cuối ghi chú khi chuyển note mà không cần click chuột.

---

### 🟢 PHASE 5: CÂY THƯ MỤC & BẢNG THUỘC TÍNH TRI THỨC (NOTION PROPERTIES)

- [x] **Bước 5.1: Xây dựng Cây Thư mục Phân cấp (`FolderItem.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/components/FolderItem.tsx`, `notesSlice.ts`
  - **Kết quả:** Đã hoàn thành tạo thư mục, đóng/mở thư mục, đổi tên inline khi double-click, xóa thư mục và lọc hiển thị ghi chú theo `folderId`.

---

- [x] **Bước 5.2: Xây dựng Bảng Thuộc tính Chuẩn Notion (`NoteProperties.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/notes/components/NoteProperties.tsx`, `types.ts`, `notesSlice.ts`
  - **Kết quả:** 
    - Đã định nghĩa enum `NoteStatus` (`To Do`, `In Progress`, `Done`) và trường `tags: string[]`.
    - Custom Dropdown bo tròn (`rounded-md`, `shadow-lg`) với logic bắt sự kiện click outside thông minh qua `useRef` và `useEffect` + cleanup function.
    - Áp dụng cơ chế phòng vệ dữ liệu `safeTags` / `safeStatus` chống sập app khi mở note cũ.
    - Quản lý nhãn dán (tags) dạng pill tag, thêm nhanh bằng `Enter`, xóa thẻ tức thời và tối ưu chiều cao chống đẩy vùng soạn thảo.
  - **Tài liệu nghiên cứu:** Đã lưu trữ chuyên đề **"Bóc tách Inline Hashtags chuẩn Obsidian & Hóa giải 6 Bẫy Regex"** vào `STEP_BY_STEP_GUIDE.md` để làm tư liệu nâng cấp.

---

### 🟡 PHASE 6: TÍNH NĂNG NÂNG CAO (KANBAN & GRAPH VIEW)

- [x] **Bước 6.1: Xây dựng Bảng Kanban Chuẩn Notion (`KanbanView.tsx`, `KanbanColumn.tsx`, `KanbanCard.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `KanbanView.tsx`, `KanbanColumn.tsx`, `KanbanCard.tsx`, `notesSlice.ts`, `types.ts`
  - **Kết quả:**
    - Tích hợp enum `ViewMode` (`DOCUMENT`, `KANBAN`, `GRAPH`) và chuyển đổi góc nhìn mượt mà trên Sidebar.
    - Cấu trúc 3 cột trực quan (`TODO`, `IN_PROGRESS`, `DONE`) với cơ chế phòng vệ dữ liệu `(n.status || NoteStatus.TODO)` tương thích ngược 100%.
    - Tạo ghi chú mới trực tiếp tại từng cột mà không bị nhảy giao diện (giữ nguyên mạch tư duy lên kế hoạch).
    - Tích hợp **Native HTML5 Drag & Drop (Zero-Dependency)**: Sử dụng `dataTransfer` với `effectAllowed = 'move'` và `dropEffect = 'move'`.
    - Xử lý triệt để bẫy xung đột CSS Class bằng toán tử điều kiện và hiệu ứng viền phát sáng (`ring-2 ring-blue-500/20`) khi kéo thả qua cột.
    - Click vào bất kỳ thẻ nào để chuyển mượt sang chế độ soạn thảo tài liệu (`selectNote`).

---

- [ ] **Bước 6.2: Xây dựng Bản đồ Tri thức Obsidian SVG Knowledge Graph (`GraphView.tsx`)**
  - **Trạng thái:** 🟡 **TIẾP THEO**
  - **Mục tiêu:** Quét liên kết 2 chiều Wiki-links (`[[Tên trang]]`), dựng sơ đồ đồ thị mạng lưới bằng SVG Canvas thuần, hỗ trợ rê chuột làm sáng liên kết và click để điều hướng nhanh.

---

## TÀI LIỆU THAM KHẢO TRONG THƯ MỤC `/docs`

- 📖 [CURRENT_STATE.md](file:///d:/seramuse/Seramuse-Desktop/docs/CURRENT_STATE.md): Lưu trữ toàn bộ tính năng, UI và logic của bản vibe-code để tham khảo ý tưởng.
- 📋 [STEP_BY_STEP_GUIDE.md](file:///d:/seramuse/Seramuse-Desktop/docs/STEP_BY_STEP_GUIDE.md): Bản phân tích lộ trình chi tiết từng giai đoạn và các lưu ý kỹ thuật.

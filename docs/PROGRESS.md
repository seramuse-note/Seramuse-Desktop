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
| **Phase 4** | **Tích hợp Tiptap Rich-Text Editor**        |    3    | 🟡 **Tiếp theo**  | Headless Editor v3 + Xử lý bẫy con trỏ nhảy               |
| **Phase 5** | **Cây Thư mục & Tổ chức Tri thức**          |    2    |  ⚪ Chưa bắt đầu  | Folder Tree + Quản lý tags & status                       |
| **Phase 6** | **Tính năng Nâng cao (Kanban & Graph)**     |    3    |  ⚪ Chưa bắt đầu  | Notion Kanban board + Obsidian SVG Knowledge Graph        |

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

---

## TÀI LIỆU THAM KHẢO TRONG THƯ MỤC `/docs`

- 📖 [CURRENT_STATE.md](file:///d:/seramuse/Seramuse-Desktop/docs/CURRENT_STATE.md): Lưu trữ toàn bộ tính năng, UI và logic của bản vibe-code để tham khảo ý tưởng.
- 📋 [STEP_BY_STEP_GUIDE.md](file:///d:/seramuse/Seramuse-Desktop/docs/STEP_BY_STEP_GUIDE.md): Bản phân tích lộ trình chi tiết từng giai đoạn và các lưu ý kỹ thuật.

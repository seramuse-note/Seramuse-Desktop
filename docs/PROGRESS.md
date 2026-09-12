# NHẬT KÝ TIẾN ĐỘ & CHECKLIST PHÁT TRIỂN (DEV LOG)
> **Dự án:** Seramuse Desktop  
> **Mục tiêu:** Tự tay xây dựng hệ thống quản lý tri thức cá nhân (PKM) trên Electron + React + TypeScript + Redux Toolkit.  
> **Cập nhật lần cuối:** 12/09/2026

---

## BẢNG TIẾN ĐỘ TỔNG THỂ (OVERVIEW TRACKER)

| Giai đoạn | Tên Phase | Số bước | Trạng thái | Đánh giá / Ghi chú |
| :---: | :--- | :---: | :---: | :--- |
| **Phase 1** | **Quản lý Dữ liệu Cốt lõi (Store & Slice)** | 3 | 🟡 **Đang thực hiện** | Bắt đầu từ Type Definitions và Redux Slice |
| **Phase 2** | **Bố cục 2 Cột (Split-Pane Layout)** | 2 | ⚪ Chưa bắt đầu | Sidebar danh sách + Vùng hiển thị chính |
| **Phase 3** | **Đồng bộ Soạn thảo Cơ bản** | 2 | ⚪ Chưa bắt đầu | Controlled Components (Title Input & Content Textarea) |
| **Phase 4** | **Tích hợp Tiptap Rich-Text Editor** | 3 | ⚪ Chưa bắt đầu | Headless Editor v3 + Xử lý bẫy con trỏ nhảy |
| **Phase 5** | **Cây Thư mục & Tổ chức Tri thức** | 2 | ⚪ Chưa bắt đầu | Folder Tree + Quản lý tags & status |
| **Phase 6** | **Tính năng Nâng cao (Kanban & Graph)** | 3 | ⚪ Chưa bắt đầu | Notion Kanban board + Obsidian SVG Knowledge Graph |

---

## CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 🟢 PHASE 1: QUẢN LÝ DỮ LIỆU CỐT LÕI (CORE DATA & STORE)

- [ ] **Bước 1.1: Định nghĩa Data Model (`types.ts`)**
  - **Trạng thái:** 🟡 **ĐANG THỰC HIỆN (IN PROGRESS)**
  - **File:** `src/renderer/src/features/notes/types.ts`
  - **Mục tiêu:** 
    - Định nghĩa interface `Note` (id, title, content, createdAt, updatedAt).
    - Định nghĩa interface `NotesState` dùng `Record<string, Note>` để tối ưu $O(1)$.
  - **Tiêu chí nghiệm thu (AC):** File tồn tại, không có lỗi TypeScript cú pháp.

---

- [ ] **Bước 1.2: Xây dựng Redux Slice (`notesSlice.ts`)**
  - **Trạng thái:** ⚪ Chưa bắt đầu (Kế tiếp sau Bước 1.1)
  - **File:** `src/renderer/src/features/notes/notesSlice.ts`
  - **Mục tiêu:**
    - Khởi tạo initial state với một vài ghi chú mẫu (seed note).
    - Viết các action reducers: `createNote`, `selectNote`, `updateNoteTitle`, `updateNoteContent`, `deleteNote`.
  - **Tiêu chí nghiệm thu (AC):** Export đầy đủ actions và reducer.

---

- [ ] **Bước 1.3: Đăng ký Slice vào Root Store (`store.ts`)**
  - **Trạng thái:** ⚪ Chưa bắt đầu
  - **File:** `src/renderer/src/app/store.ts`
  - **Mục tiêu:**
    - Import `notesReducer` và gắn vào `configureStore({ reducer: { counter, notes } })`.
  - **Tiêu chí nghiệm thu (AC):** `npm run typecheck` vượt qua 100%, Redux DevTools nhận diện slice `notes`.

---

## TÀI LIỆU THAM KHẢO TRONG THƯ MỤC `/docs`
* 📖 [CURRENT_STATE.md](file:///d:/seramuse/Seramuse-Desktop/docs/CURRENT_STATE.md): Lưu trữ toàn bộ tính năng, UI và logic của bản vibe-code để tham khảo ý tưởng.
* 📋 [STEP_BY_STEP_GUIDE.md](file:///d:/seramuse/Seramuse-Desktop/docs/STEP_BY_STEP_GUIDE.md): Bản phân tích lộ trình chi tiết từng giai đoạn và các lưu ý kỹ thuật.

# NHẬT KÝ TIẾN ĐỘ & CHECKLIST PHÁT TRIỂN (DEV LOG)

> **Dự án:** Seramuse Desktop
> **Mục tiêu:** Tự tay xây dựng hệ thống quản lý tri thức cá nhân (PKM) trên Electron + React + TypeScript + Redux Toolkit.
> **Cập nhật lần cuối:** 12/09/2026

---

## BẢNG TIẾN ĐỘ TỔNG THỂ (OVERVIEW TRACKER)

|  Giai đoạn  | Tên Phase                                    | Số bước |    Trạng thái     | Đánh giá / Ghi chú                                         |
| :---------: | :------------------------------------------- | :-----: | :---------------: | :--------------------------------------------------------- |
| **Phase 1** | **Quản lý Dữ liệu Cốt lõi (Store & Slice)**  |    3    | 🟢 **Hoàn thành** | Đã định nghĩa types, slice reducers và kết nối root store  |
| **Phase 2** | **Bố cục 2 Cột (Split-Pane Layout)**         |    2    | 🟢 **Hoàn thành** | Sidebar danh sách + Vùng hiển thị chính                    |
| **Phase 3** | **Đồng bộ Soạn thảo Cơ bản**                 |    1    | 🟢 **Hoàn thành** | Controlled Components (Title Input & Content Textarea)     |
| **Phase 4** | **Tích hợp Tiptap Rich-Text Editor**         |    3    | 🟢 **Hoàn thành** | Headless Editor v3 + key remounting + autofocus            |
| **Phase 5** | **Cây Thư mục & Bảng Thuộc tính Tri thức**   |    2    | 🟢 **Hoàn thành** | Folder Tree + Status Enum + Notion Properties Table + Tags |
| **Phase 6** | **Tính năng Nâng cao (Kanban & Graph)**      |    2    | 🟢 **Hoàn thành** | Notion Kanban board + Obsidian SVG Knowledge Graph         |
| **Phase 7** | **Lưu Trữ Cục Bộ (Local-First Persistence)** |    3    | 🟢 **Hoàn thành** | Electron IPC + Debounced Auto-Save + Store Hydration       |
| **Phase 8** | **Đa Ngôn Ngữ & Native Desktop Polish**      |    3    | 🟢 **Hoàn thành** | i18n (VI/EN) + ConfirmModal + WelcomeDashboard + App Icon  |
| **Phase 9** | **Kanban Level 2 (Exact Reordering $O(1)$)** |    4    | 🟢 **Hoàn thành** | Fractional Indexing + Drop Indicator Line + Data Migration |

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

- [x] **Bước 6.2: Xây dựng Bản đồ Tri thức Obsidian SVG Knowledge Graph (`GraphView.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `GraphView.tsx`, `notesSlice.ts`, `types.ts`
  - **Kết quả:**
    - Tự tay cài đặt thuật toán bố trí tỏa tròn (Radial Layout) thuần lượng giác ($\Delta x = R \cdot \cos(\alpha), \Delta y = R \cdot \sin(\alpha)$).
    - Áp dụng kỹ thuật bù góc `- Math.PI / 2` để đưa nốt đầu tiên về hướng 12 giờ chuẩn thị giác con người.
    - Xây dựng thuật toán ghép cặp tự động tìm đường nối (`graphEdges`) theo chung thư mục hoặc chung tag, dùng `Map` tra cứu $O(1)$ và kỹ thuật vòng lặp `j = i + 1` triệt tiêu self-loop và duplicate edges.
    - Sử dụng SVG thuần xếp lớp (Edges trước, Nodes sau) không phụ thuộc D3 hay thư viện ngoài.
    - Hoàn thành tương tác làm sáng mạng lưới liên kết cục bộ khi hover (`isHovered`) và click mở ghi chú tức thời qua Redux `selectNote`.
    - Đúc kết toàn bộ kiến thức vào `RADIAL_LAYOUT_AND_GRAPH_MATH.md` và `LEARNING_JOURNAL.md`.

---

### 🟢 PHASE 7: LƯU TRỮ CỤC BỘ (LOCAL-FIRST PERSISTENCE & IPC)

- [x] **Bước 7.1: Xây dựng IPC Handlers & File System ở Main Process (`src/main/index.ts`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/main/index.ts`
  - **Kết quả:**
    - Sử dụng `fs/promises` bất đồng bộ để tránh chặn Event Loop.
    - Định vị thư mục an toàn qua `app.getPath('userData')` trỏ tới `%APPDATA%/seramuse-desktop`.
    - Xử lý ca biên Cold Start (người dùng mở app lần đầu, file chưa tồn tại) bằng `try...catch` trả về `null` an toàn.
    - Định dạng `JSON.stringify(data, null, 2)` hỗ trợ đọc và sao lưu thủ công dễ dàng.

---

- [x] **Bước 7.2: Mở Cổng Hải Quan Preload Script & Type Definitions (`preload`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/preload/index.ts`, `src/preload/index.d.ts`
  - **Kết quả:**
    - Tuân thủ nguyên lý đặc quyền tối thiểu (Least Privilege), chỉ mở 2 hàm `loadNotes` và `saveNotes` qua `contextBridge`.
    - Khai báo Type-safe `loadNotes: () => Promise<NoteState | null>` và `saveNotes: (data: NoteState) => Promise<{ success: boolean; error?: string }>`.

---

- [x] **Bước 7.3: Kỹ Thuật Store Hydration & Debounced Auto-Save (`useAutoSave.ts`, `notesSlice.ts`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/shared/hooks/useAutoSave.ts`, `notesSlice.ts`, `HomePage.tsx`
  - **Kết quả:**
    - Thêm reducer `hasLoaded` với `Partial<NoteState>` và kiểm tra phòng thủ `!== undefined` chống mất `null` và chống ô nhiễm `undefined`.
    - Triển khai cờ hiệu `isHydrated` chặn đứng bẫy "Ghi đè dữ liệu rỗng" (Empty State Overwrite Trap).
    - Sử dụng `useRef(true)` làm cờ hiệu dùng 1 lần (Single-use flag) bỏ qua lần ghi đĩa thừa ngay sau khi vừa nạp dữ liệu, không gây re-render UI.
    - Cài đặt Debounce 1000ms thuần React với `setTimeout` & `clearTimeout` giúp gom cụm thao tác ghi, bảo vệ tuổi thọ ổ SSD và loại bỏ nghẽn đĩa (Disk Thrashing).

---

### 🟢 PHASE 8: ĐA NGÔN NGỮ & NATIVE DESKTOP POLISH (I18N & POLISH)

- [x] **Bước 8.1: Thiết Kế App Icon Độc Quyền & Đóng Gói Resource**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `resources/icon.png`, `build/icon.png`, `build/icon.ico`
  - **Kết quả:** Biểu tượng Seramuse phong cách Neon Constellation "S" sắc nét, đa kích thước chuẩn Windows `.ico`.

---

- [x] **Bước 8.2: Hộp Thoại Xác Nhận Xóa Tùy Biến (`ConfirmModal.tsx`) & Màn Hình Chào Mừng (`WelcomeDashboard.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/shared/components/ui/ConfirmModal.tsx`, `src/renderer/src/features/home/components/WelcomeDashboard.tsx`
  - **Kết quả:**
    - Thay thế hoàn toàn `window.confirm` xấu xí của trình duyệt bằng Custom ConfirmModal có backdrop-blur, lắng nghe phím `Esc` và click-outside.
    - Xây dựng WelcomeDashboard với 4 Quick Action Cards và phím tắt tiện ích khi không có note nào đang active.

---

- [x] **Bước 8.3: Hệ Thống Đa Ngôn Ngữ i18n Chuẩn 2-Tier Fallback (`LanguageSwitcher.tsx`, `locales/`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/locales/vi/`, `src/renderer/src/locales/en/`, `src/renderer/src/shared/components/ui/LanguageSwitcher.tsx`
  - **Kết quả:**
    - Chuẩn hóa 100% tất cả các màn hình, tiêu đề, nút bấm, menu sang Tiếng Việt 🇻🇳 và English 🇬🇧.
    - Nút chuyển đổi ngôn ngữ cố định tại góc dưới thanh Sidebar, đổi ngôn ngữ tức thì trong micro-giây.

---

### 🟢 PHASE 9: KANBAN CẤP ĐỘ 2 (EXACT REORDERING & FRACTIONAL INDEXING $O(1)$)

- [x] **Bước 9.1: Nâng Cấp Model Dữ Liệu & Khởi Tạo Order (`types.ts`, `notesSlice.ts`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/shared/note/types.ts`, `src/renderer/src/shared/note/notesSlice.ts`
  - **Kết quả:** Thêm trường `order?: number` vào interface `Note` và tự động cấp phát `maxOrder + 1000` khi tạo ghi chú mới.

---

- [x] **Bước 9.2: Reducer `reOrderNote` Với Thuật Toán Fractional Indexing $O(1)$**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/shared/note/notesSlice.ts`
  - **Kết quả:**
    - Tính toán vị trí chèn mới bằng trung bình cộng $\frac{\text{prev} + \text{next}}{2}$, độ phức tạp $O(1)$ chỉ cập nhật đúng 1 note.
    - Xử lý phòng vệ 2 tầng cho dữ liệu cũ (Legacy Data) với `getOrder(idx)` và auto-migration trong `hasLoaded`.

---

- [x] **Bước 9.3: Bắt Tọa Độ Chuột Nửa Trên/Dưới & Vạch Chỉ Báo Trực Quan (`KanbanCard.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/kanban/components/KanbanCard.tsx`
  - **Kết quả:**
    - So sánh `e.clientY` với đường phân giác `midY` của thẻ để phân biệt `before` vs `after`.
    - Vẽ vạch xanh phát sáng với thuộc tính `pointer-events-none` chống lỗi cướp sự kiện chuột (Drop cancellation trap).

---

- [x] **Bước 9.4: Sắp Xếp Bất Biến & Xử Lý Thả Vào Khoảng Trống Cột (`KanbanColumn.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/kanban/components/KanbanColumn.tsx`
  - **Kết quả:**
    - Sử dụng `[...notes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))` bảo vệ tính bất biến của Redux.
    - Hỗ trợ thả thẻ vào vùng trống hoặc cột rỗng để đưa thẻ xuống cuối cột.

---

### 🟢 PHASE 10: WORKSPACE DASHBOARD & ĐIỀU HƯỚNG TƯƠNG TÁC SỐNG

- [x] **Bước 10.1: Nâng Cấp Welcome Screen Thành Dynamic Workspace Dashboard (`WelcomeDashboard.tsx`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `src/renderer/src/features/home/components/WelcomeDashboard.tsx`
  - **Kết quả:**
    - Tự động rẽ nhánh: Workspace rỗng (`totalNotes === 0`) hiển thị Onboarding hướng dẫn; Workspace đã có dữ liệu hiển thị Hub làm việc cá nhân.
    - Thanh **Momentum Bar** tinh giản (Tổng note, Đang làm, Đã xong) với tương tác sống: Click vào thẻ `In Progress` hoặc `Done` để chuyển mượt sang Kanban.
    - Hợp nhất dòng chảy thành **Recent Notes Stream** (Top 3 note gần nhất) với Badge trạng thái (`NoteStatus`: In Progress 🟡, Done 🟢, To Do ⚪).
    - Khối **Top Topics** tự động gom 3 tag phổ biến nhất theo triết lý "Tàng hình khi lười, tỏa sáng khi chăm", chuẩn bị cho tính năng lọc tìm kiếm.

---

- [x] **Bước 10.2: Tái Cấu Trúc Điều Hướng Chuẩn Mực Trên Sidebar (`Sidebar.tsx`, `types.ts`, `notesSlice.ts`)**
  - **Trạng thái:** 🟢 **HOÀN THÀNH**
  - **File:** `Sidebar.tsx`, `types.ts`, `notesSlice.ts`
  - **Kết quả:**
    - Thay thế nút `Document` mơ hồ bằng `Dashboard` (`ViewMode.DASHBOARD`) với icon `LayoutDashboard`.
    - Phân định rõ ràng: Mục `Views` chứa 3 góc nhìn toàn cảnh (`Dashboard`, `Kanban`, `Graph`); còn tài liệu cụ thể nằm ở cây thư mục `Folders` bên dưới.
    - Đưa `searchQuery: string` vào Redux store `notesSlice`, sẵn sàng cho tính năng tìm kiếm theo thẻ tag.
    - Đồng bộ 100% từ điển đa ngôn ngữ (VI 🇻🇳 / EN 🇬🇧) cho toàn bộ Dashboard.

---

## TÀI LIỆU THAM KHẢO TRONG THƯ MỤC `/docs`

- 📖 [CURRENT_STATE.md](file:///d:/seramuse/Seramuse-Desktop/docs/CURRENT_STATE.md): Lưu trữ toàn bộ tính năng, UI và logic của bản vibe-code để tham khảo ý tưởng.
- 📋 [STEP_BY_STEP_GUIDE.md](file:///d:/seramuse/Seramuse-Desktop/docs/STEP_BY_STEP_GUIDE.md): Bản phân tích lộ trình chi tiết từng giai đoạn và các lưu ý kỹ thuật.

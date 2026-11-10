# LMS Monorepo Frontend Architecture & Development Rules

Tài liệu này là chỉ dẫn cao nhất (Root Guidelines) cho các nhà phát triển và AI Assistant khi làm việc trong repository **LMS Frontend Monorepo**. Mọi đóng góp mã nguồn mới bắt buộc phải tuân theo các quy tắc và cẩm nang bên dưới.

---

## 1. Bản Đồ Hệ Thống (Repository Map)

Dự án được quản lý dưới dạng Monorepo sử dụng **Turborepo** và **pnpm workspaces**:

```
lms-system-fe/
├── apps/
│   ├── web/                     # Cổng Học Viên (Port 5173) - Học bài, tiến độ, catalog
│   └── admin/                   # Cổng Quản Trị & Nhân Sự (Port 5174) - Khóa học, học viên, phân quyền RBAC
│
├── packages/
│   ├── shared/                  # Shared Design System & Utils (Buttons, Badges, Cards, Inputs, Avatar, cn utility)
│   ├── business/                # LMS Domain Package: Models/Enums, RTK Query Services & Domain UI Components dùng chung
│   ├── tailwind-config/         # Design Tokens dùng chung (Màu sắc, phông chữ, spacing)
│   └── typescript-config/       # Base, React và Node tsconfig dùng chung
│
└── .agents/                     # Quy chuẩn mã nguồn & Hướng dẫn phát triển
    ├── AGENTS.md                # Tài liệu tổng quan (file hiện tại)
    ├── rules/                   # Các quy tắc kiến trúc và code bắt buộc
    └── guides/                  # Các bài hướng dẫn chi tiết từng bước
```

---

## 2. Nguyên Tắc Vàng (Golden Rules)

1. **Kiến Trúc Phân Tầng Tuyệt Đối**:
   - `src/routes/`: Quản lý định tuyến TanStack Router (File-Based Routing).
   - `src/pages/<domain>/`: Page Orchestrators kết hợp các components từ features vào view hoàn chỉnh.
   - `src/features/<feature-name>/`: Domain vertical slices, chỉ chứa UI components & hooks riêng của feature.
   - `src/shared/`: Khung sườn layout (`AdminLayout`, `Header`), modals và hooks dùng chung nội bộ portal.
   - **Cấm nguyên khối**: Không gom code thành các trang 200-300 dòng; luôn chia nhỏ thành sub-components.
2. **Nguồn Chân Lý Duy Nhất (SSOT) & Ranh Giới Monorepo**:
   - **Kỹ thuật & UI Primitives (0% nghiệp vụ)**: Nằm tại `@lms/shared` (`Button`, `Input`, `cn`, `useDebounce`).
   - **Nghiệp vụ LMS (Types, API RTK Query, Domain UI)**: Nằm tại `@lms/business` (`Course`, `useGetCoursesQuery`, `CourseCard`).
   - **Cấm Tuyệt Đối Proxy & Backward-Compatibility Re-export**: Không tạo file trung gian re-export bắc cầu; khi di dời module phải cập nhật toàn bộ import về Nguồn Thật mới. Tuyệt đối không import chéo giữa `apps/admin` và `apps/web`.
3. **Quản Lý Trạng Thái Qua RTK Query**:
   - Mọi truy vấn và thay đổi dữ liệu phải thông qua hook sinh bởi RTK Query từ `@lms/business`.
   - Khai báo đầy đủ `providesTags` và `invalidatesTags` để tự động làm mới cache. Không dùng `fetch` hay `axios` tùy tiện trong components.
4. **Strict Typing - Nói Không Với `any`**:
   - Luôn sử dụng kiểu dữ liệu rõ ràng từ `@lms/business`. Cấm dùng `any`.
   - Sử dụng path alias `@/*` cho mọi import nội bộ trong từng ứng dụng.

---

## 3. Danh Mục Quy Tắc Chi Tiết (Rules Index - Single Source of Truth)

Vui lòng đọc kỹ các quy tắc chuyên biệt trước khi viết mã:
- 📐 [rules/architecture.md](file:///d:/lms/lms-system-fe/.agents/rules/architecture.md): Quy định chi tiết cấu trúc thư mục Feature-based, Layout components, ranh giới package và nguyên tắc SSOT tổng quát.
- 💻 [rules/coding-standards.md](file:///d:/lms/lms-system-fe/.agents/rules/coding-standards.md): Chuẩn mực viết code TypeScript, React 19 functional components, cú pháp import và Tailwind CSS.
- 🔄 [rules/state-and-api.md](file:///d:/lms/lms-system-fe/.agents/rules/state-and-api.md): Quy ước inject endpoints RTK Query, gắn thẻ cache tags và quản lý Redux store.

---

## 4. Danh Mục Cẩm Nang Hướng Dẫn (Guides Index)

Tham khảo quy trình thực hiện các tác vụ phổ biến:
- 🚀 [guides/create-new-feature.md](file:///d:/lms/lms-system-fe/.agents/guides/create-new-feature.md): Hướng dẫn 5 bước thêm mới một Feature hoàn chỉnh từ Models đến Router.
- 🎨 [guides/add-shared-ui-component.md](file:///d:/lms/lms-system-fe/.agents/guides/add-shared-ui-component.md): Hướng dẫn tạo mới một UI Component trong `@lms/shared` hoặc `@lms/business`.
- 🛠️ [guides/monorepo-workflow.md](file:///d:/lms/lms-system-fe/.agents/guides/monorepo-workflow.md): Hướng dẫn lệnh chạy dev server, mở host LAN, build và quản lý dependencies monorepo.


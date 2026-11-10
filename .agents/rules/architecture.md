# Quy Tắc Kiến Trúc: Routes, Pages, Feature-Based & Monorepo Boundaries

Tài liệu này quy định cấu trúc tổ chức mã nguồn và các ranh giới kiến trúc bắt buộc cho toàn bộ dự án.

---

## 1. Kiến Trúc 3 Tầng: Routes, Pages & Feature Slices

Cả hai ứng dụng `apps/web` và `apps/admin` tuân thủ mô hình phân tầng chặt chẽ nhằm tối ưu hóa tính độc lập, khả năng tái sử dụng và kiểm tra kiểu tĩnh (Type Safety):

```text
src/
├── routes/               # [Tầng 1] TanStack Router File-Based Routing (Nested Directories)
│   ├── __root.tsx        # Layout gốc & Outlet
│   ├── index.tsx         # Route /
│   ├── <domain>/         # Thư mục theo domain (courses, students, staff, learning...)
│   │   ├── index.tsx     # Route /<domain>
│   │   └── $id.tsx       # Dynamic sub-route /<domain>/$id
│   └── ...
├── pages/                # [Tầng 2] Page Orchestrators (Domain-Grouped)
│   ├── <domain>/         # Thư mục trang theo domain
│   │   ├── DomainPage.tsx
│   │   └── index.ts
│   └── index.ts          # Root barrel export tổng hợp
├── features/             # [Tầng 3] Domain Slices (Components & Logic độc lập)
│   ├── <feature-name>/
│   │   ├── components/   # Sub-components giao diện của feature
│   │   ├── hooks/        # Custom hooks cục bộ
│   │   └── index.ts      # Public API của feature
├── shared/               # [Tầng Dùng Chung Nội Bộ] Layouts, reusable components, hooks & utils
│   ├── components/       # Layouts (Header, Sidebar, Footer), app-level modals
│   │   ├── layout/       # Khung sườn ứng dụng
│   │   └── index.ts
│   ├── hooks/            # App-level custom hooks (useDebounce, UI hooks...)
│   ├── utils/            # Tiện ích nội bộ app
│   └── index.ts          # Barrel export thuận tiện (@/shared)
└── store/                # Redux Toolkit store cấu hình tích hợp
```

### 1.1. Tầng Định Tuyến (`src/routes/`)
- Sử dụng **TanStack Router (File-Based Routing)** với `@tanstack/router-plugin/vite`.
- **Cấm đặt flat các route files**: Các tuyến đường thuộc cùng một nhóm phải được đặt trong thư mục riêng (ví dụ: `src/routes/courses/index.tsx` thay vì `courses.tsx`, `src/routes/learn/$courseId/lesson/$lessonId.tsx`).
- Tự động sinh `src/routeTree.gen.ts` đảm bảo 100% Type-Safe Links (`<Link to="..." params={{ ... }} />`) và Type-Safe Params (`useParams({ from: ... })`).

### 1.2. Tầng Ghép Nối Giao Diện (`src/pages/`)
- Đóng vai trò **Page Orchestrators**: Lấy dữ liệu qua RTK Query hooks và lắp ráp các components từ một hoặc nhiều feature (`src/features/*`).
- **Cấm đặt flat các page files ở root `pages/`**: Bắt buộc phân chia theo thư mục domain con (ví dụ: `src/pages/courses/CoursesManagementPage.tsx`, `src/pages/dashboard/DashboardPage.tsx`). Mỗi domain folder có barrel `index.ts` và được re-export tại `src/pages/index.ts`.
- **Không** nhồi nhét trực tiếp logic DOM hoặc bảng biểu phức tạp vào file page; toàn bộ giao diện chuyên biệt phải nằm trong `components/` của từng feature tương ứng.
- Độ dài lý tưởng của file Page: 30 - 80 dòng.

### 1.3. Tầng Tính Năng Nghiệp Vụ (`src/features/<feature-name>/`)
- Đại diện cho từng lát cắt nghiệp vụ (Domain Vertical Slices) như `courses`, `learning`, `students`, `staff`, `dashboard`.
- **Chỉ chứa** `components/`, `hooks/` và xuất khẩu thông qua barrel `index.ts`.
- **Không chứa** thư mục `pages/` bên trong feature. Khi cần xây dựng một trang mới hoặc bổ sung vào trang có sẵn, lập trình viên tạo/sửa file trong `src/pages/<domain>/`.

---

## 2. Quy Tắc Layout & Shared Components Trong Ứng Dụng

Các thành phần giao diện toàn cục (khung sườn ứng dụng) và hooks dùng chung phải nằm trong `src/shared/`:

- `apps/admin/src/shared/components/layout/`:
  - `AdminLayout.tsx`: Khung bao bọc chính chứa Sidebar, Header và `<Outlet />`.
  - `AdminSidebar.tsx`: Thanh điều hướng menu bên trái và Role Switcher.
  - `AdminHeader.tsx`: Thanh header hiển thị badge vai trò, thông báo, avatar.
  - `index.ts`: Barrel export.
- `apps/web/src/shared/components/layout/`:
  - `Header.tsx`: Thanh điều hướng của học viên.
  - `Footer.tsx`: Chân trang hệ thống.
  - `index.ts`: Barrel export.

---

## 3. Quy Tắc Ranh Giới Monorepo (Package Boundaries)

### 3.1. `@lms/shared` (Technical & Design System Primitives)
- Chỉ chứa các UI components nguyên tử (Primitive UI), tiện ích kỹ thuật (`cn`) và custom hooks kỹ thuật thuần túy (`useDebounce`) tái sử dụng ở bất kỳ ứng dụng nào: `Button`, `Card`, `Badge`, `Input`, `Avatar`, `ProgressBar`, `cn`, `useDebounce`.
- **Tuyệt đối không** chứa logic nghiệp vụ LMS, không import models hay gọi API, không phụ thuộc vào `@tanstack/react-router`.

### 3.2. `@lms/business` (LMS Domain: Types, API & Business UI)
- Là Single Source of Truth cho toàn bộ nghiệp vụ LMS dùng chung cho cả Web và Admin:
  - **`types/`**: Enums (`UserRole`), Entities (`Course`, `Lesson`, `UserProfile`...), API response formats.
  - **`api/`**: RTK Query base API, mock data và các injected services (`courseApi`, `userApi`, `enrollmentApi`, `dashboardApi`).
  - **`components/`**: **Nơi đặt UI components dính nghiệp vụ dùng chung** (ví dụ: `CourseCard`, `UserRoleBadge`, `StudentProgressRow`...).
- Được phép phụ thuộc vào `@lms/shared` để xây dựng UI components.

### 3.3. Cấm Phụ Thuộc Chéo (No Cross-App Dependencies)
- `apps/web` **không bao giờ** được import file từ `apps/admin` và ngược lại.
- Nếu cả 2 app đều cần dùng chung:
  - Nếu là UI Component nguyên tử / tiện ích kỹ thuật $\rightarrow$ Đặt vào **`packages/shared`**.
  - Nếu là Entity, API Endpoint, hoặc UI Component dính nghiệp vụ $\rightarrow$ Đặt vào **`packages/business`**.

### 3.4. Nguyên Tắc Nguồn Chân Lý Duy Nhất (SSOT) & Cấm Tuyệt Đối Proxy / Backward-Compatibility Re-export

Mọi thành phần mã nguồn (Component, Hook, Util, Type, API Endpoint, Constant) phải có **duy nhất một Nguồn Thật (True Origin)** và bắt buộc phải được tham chiếu trực tiếp từ nguồn đó:

1. **Cấm Tuyệt Đối Re-export Ủy Quyền (No Proxy / Bridge Re-exports)**:
   - Tuyệt đối không tạo file trung gian chỉ để import rồi re-export lại module từ một package hoặc thư mục khác (ví dụ: không re-export `@lms/shared` hoặc `@lms/business` thông qua `apps/*/src/shared/`, không re-export chéo giữa các `features/`).
   - Thư mục `src/shared/` của từng ứng dụng chỉ chứa các thành phần thực sự độc quyền nội bộ của ứng dụng đó (như `AdminLayout`, `AdminSidebar`).
   - Tuyệt đối không gom các module không thuộc phạm vi trách nhiệm của mình vào file barrel `index.ts`.

2. **Cấm Giữ Lại Re-export Để "Tương Thích Ngược" (No Backward-Compatibility Shim Re-exports)**:
   - Khi một hàm, component, hook hoặc type được di dời (move), đổi tên, hoặc thăng hạng (promote từ local lên shared package): **Bắt buộc phải cập nhật toàn bộ các file đang sử dụng trỏ thẳng về Nguồn Thật mới**.
   - Tuyệt đối không giữ lại file cũ với nội dung `export * from 'new-location'` chỉ để code cũ không bị lỗi tạm thời. Hành vi này làm mờ nguồn gốc thực tế, gây khó khăn cho việc tìm kiếm code, phá vỡ tree-shaking và tích lũy nợ kỹ thuật (Technical Debt).

3. **Luôn Import Trực Tiếp Từ Gốc (Direct Origin Imports)**:
   - Tiện ích kỹ thuật, Design System Primitives & Technical Hooks: `import { Button, useDebounce, cn } from '@lms/shared';`
   - Business Models, RTK Query API & Domain UI: `import { Course, useGetCoursesQuery, CourseCard } from '@lms/business';`
   - Khung sườn và tiện ích nội bộ của ứng dụng: `import { AdminLayout } from '@/shared';`
   - **Nội bộ trong từng package / ứng dụng**:
     - Trong ứng dụng (`apps/admin`, `apps/web`): dùng `@/*`.
     - Trong package nghiệp vụ (`packages/business`): dùng `@business/*` (ví dụ: `import { Course } from '@business/types';`).
     - Trong package dùng chung (`packages/shared`): dùng `@shared/*` (ví dụ: `import { cn } from '@shared/lib/utils';`).
     - **Quy tắc độ sâu tương đối**: Chỉ cho phép `./` hoặc tối đa **1 cấp** `../` cho quan hệ cục bộ trực tiếp. **Cấm tuyệt đối** `../../` và sâu hơn (`../../../`). Chi tiết tại [rules/coding-standards.md](file:///d:/lms/lms-system-fe/.agents/rules/coding-standards.md#12-tieu-chuan-duong-dan-tuong-doi--he-thong-path-alias-).

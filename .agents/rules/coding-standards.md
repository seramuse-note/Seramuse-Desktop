# Chuẩn Mực Viết Code: TypeScript, React 19 & Tailwind CSS

Tài liệu này quy định các tiêu chuẩn kỹ thuật khi viết code trong dự án LMS Frontend Monorepo.

---

## 1. Tiêu Chuẩn TypeScript

### 1.1. Strict Typing - Cấm Sử Dụng `any`
- Tuyệt đối **không dùng `any`** trong khai báo type, parameters hoặc return types.
- Nếu gặp kiểu dữ liệu chưa xác định, dùng `unknown` kết hợp type narrowing (type guards) hoặc định nghĩa interface chi tiết.
- Tái sử dụng tối đa các type có sẵn từ `@lms/business` (ví dụ `UserProfile`, `Course`, `Lesson`).

### 1.2. Tiêu Chuẩn Đường Dẫn Tương Đối & Hệ Thống Path Alias `@`
- **Quy tắc độ sâu đường dẫn tương đối (Import Depth Rule)**:
  - **Được phép (Shallow Relative)**: Chỉ cho phép `./` (cùng thư mục) hoặc tối đa **1 cấp** `../` (thư mục cha trực tiếp) cho các file có quan hệ cục bộ trực tiếp (ví dụ: `import { baseApi } from '../base-api';`).
  - **Cấm tuyệt đối (Deep Relative)**: Nghiêm cấm dùng `../../` hoặc sâu hơn (`../../../`). Khi cần nhảy cấp hoặc gọi sang module khác, bắt buộc dùng **Path Alias `@`**.
- **Hệ thống Scoped `@` Alias theo phân hệ**:
  - **Trong `apps/admin` và `apps/web`**:
    - Dùng `@/*` cho nội bộ ứng dụng: `import { AdminLayout } from '@/shared';`, `import { ... } from '@/features/<name>';`.
  - **Trong `packages/business`**:
    - Dùng `@business/*` cho nội bộ package: `import { Course } from '@business/types';`, `import { baseApi } from '@business/api/base-api';`.
  - **Trong `packages/shared`**:
    - Dùng `@shared/*` cho nội bộ package: `import { cn } from '@shared/lib/utils';`.
- **Nhập khẩu giữa các package / ứng dụng (Cross-package Imports)**:
  - Luôn sử dụng tên package chuẩn hóa của Monorepo: `import { ... } from '@lms/business';`, `import { Button } from '@lms/shared';`.

### 1.3. Chuẩn Mực Import: Tuân Thủ Triệt Để SSOT (Single Source of Truth)
- **Luôn import trực tiếp từ Nguồn Thật**:
  - UI Primitives & Technical Hooks: `import { Button, useDebounce } from '@lms/shared';`
  - Domain Types, RTK Query Services & Domain UI: `import { Course, useGetCoursesQuery } from '@lms/business';`
  - Modules nội bộ ứng dụng: `import { AdminLayout } from '@/shared';` hoặc `import { ... } from '@/features/<name>';`
- **Tuyệt đối không dùng Proxy Re-export**: Không re-export module của package khác hoặc feature khác nhằm mục đích "tương thích ngược" hay "tiện tay gom chung" (chi tiết tại [rules/architecture.md](file:///d:/lms/lms-system-fe/.agents/rules/architecture.md#34-nguyen-tac-nguon-chan-ly-duy-nhat-ssot--cam-tuyet-doi-proxy--backward-compatibility-re-export)).

### 1.4. Cấu Trúc Khai Báo Props
- Định nghĩa rõ ràng interface cho props của mỗi component và sử dụng `FC`, `ReactNode` trực tiếp:
```typescript
import { FC, ReactNode } from 'react';
import { Course } from '@lms/business';

interface CourseCardProps {
  course: Course;
  onSelect?: (courseId: string) => void;
  children?: ReactNode;
  className?: string;
}

export const CourseCard: FC<CourseCardProps> = ({
  course,
  onSelect,
  children,
  className,
}) => {
  // ...
};
```

---

## 2. Tiêu Chuẩn React 19 Components

### 2.1. Cấm Tuyệt Đối Namespace `React.` (Bắt Buộc Dùng Named Imports)
- **Tuyệt đối không sử dụng tiền tố `React.`**: Cấm `React.FC`, `React.ReactNode`, `React.StrictMode`, `React.useState`, `React.useMemo`, `React.forwardRef`...
- **Luôn import trực tiếp các elements / types tương ứng**:
  - `import { FC, ReactNode, StrictMode, useState, useMemo, forwardRef } from 'react';`
  - Kiểu dữ liệu con: `children: ReactNode;`
  - Khai báo component: `export const MyComponent: FC<MyComponentProps> = ...`
- **Không import `React` mặc định**: Với React 19 và JSX Transform hiện đại, không viết `import React from 'react';` dư thừa nếu không sử dụng trực tiếp đối tượng `React`.

### 2.2. Functional Components & Hooks
- Tất cả components phải được viết dưới dạng Functional Components.
- Tuân thủ nghiêm ngặt **Rules of Hooks**: không gọi hook bên trong vòng lặp, điều kiện rẽ nhánh hoặc nested function.
- Đặt tên custom hooks bắt đầu bằng tiền tố `use` (ví dụ: `useCourseFilters`).

### 2.3. Trách Nhiệm Đơn Lẻ (Single Responsibility)
- Mỗi file chỉ nên chứa 1 component chính.
- Nếu một component cần render nhiều khối phức tạp, hãy tách các khối đó thành sub-components riêng trong cùng thư mục `components/` của feature.

### 2.4. Tránh Logic Dồn Toàn Bộ Vào JSX
- Các hàm format dữ liệu (ví dụ format tiền tệ VND, định dạng ngày tháng) nên được viết thành helper functions rõ ràng thay vì tính toán phức tạp trực tiếp bên trong thẻ JSX.

---

## 3. Tiêu Chuẩn Styling & Tailwind CSS

### 3.1. Nhất Quán Màu Sắc & Design Tokens
- Dự án sử dụng hệ thống màu dùng chung từ `@lms/tailwind-config`:
  - **Primary**: Gam màu chủ đạo (`primary-50` đến `primary-900`).
  - **Slate**: Màu nền và văn bản trung tính (`slate-50`, `slate-100`, `slate-600`, `slate-900`).
  - **Semantic Badges**: `emerald` (Success), `amber` (Warning), `rose`/`red` (Danger), `purple` (Role/Accent).
- Không tự ý định nghĩa mã hex tùy tiện hoặc viết inline styles (`style={{ ... }}`) trừ khi tính toán tọa độ dynamic không thể làm bằng class.

### 3.2. Tiện Ích Merge ClassName `cn()`
- Khi cần nối chuỗi className hoặc ghi đè style qua props, luôn sử dụng hàm `cn()` từ `@lms/shared`:
```tsx
import { FC, ReactNode } from 'react';
import { cn } from '@lms/shared';

export const CustomBox: FC<{ className?: string; children?: ReactNode }> = ({ className, children }) => {
  return (
    <div className={cn('rounded-2xl bg-white p-6 shadow-sm border border-slate-100', className)}>
      {children}
    </div>
  );
};
```

---

## 4. Biểu Tượng (Icons)

- Hệ thống sử dụng thư viện **`lucide-react`** làm biểu tượng chuẩn.
- Đặt kích thước icon đồng bộ: `h-4 w-4` cho nút bấm/thẻ nhỏ, `h-5 w-5` cho tiêu đề, `h-6 w-6` cho hero/banner.

# Cẩm Nang: Thêm Component Dùng Chung Vào `@lms/shared` hoặc `@lms/business`

Tài liệu này hướng dẫn quy trình tạo Component giao diện dùng chung trong Monorepo và cách phân biệt đúng nơi lưu trữ.

---

## 1. Nguyên Tắc Phân Loại: Đặt ở đâu?

Trước khi tạo component mới dùng chung cả 2 app, hãy kiểm tra:

1. **Component là UI nguyên tử (UI Primitive) & hoàn toàn phi nghiệp vụ (Domain-agnostic)**:
   - Ví dụ: `Modal`, `Tooltip`, `Dropdown`, `Tabs`, `Switch`, `Tag`, `Drawer`...
   - Không chứa models (`Course`, `UserRole`), không gọi API.
   - $\rightarrow$ Đặt vào **`packages/shared/src/components/`** (thuộc `@lms/shared`).
2. **Component có dính nghiệp vụ LMS (Domain-specific / Smart UI Component)**:
   - Ví dụ: `CourseCard`, `UserRoleBadge`, `StudentProgressRow`, `CertificateCard`...
   - Nhận prop là models từ LMS hoặc gọi RTK Query.
   - $\rightarrow$ Đặt vào **`packages/business/src/components/`** (thuộc `@lms/business`).

---

## 2. Quy Trình Thêm Primitive UI Vào `@lms/shared`

### Bước 1: Tạo File Component
Tạo file tại `packages/shared/src/components/<ComponentName>.tsx` (ví dụ `Modal.tsx`):

```tsx
// packages/shared/src/components/Modal.tsx
import { FC, ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          'relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100',
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          {title && <h3 className="text-lg font-bold text-slate-900">{title}</h3>}
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};
```

### Bước 2: Export Trong Barrel File
Mở `packages/shared/src/index.ts` và thêm export:
```typescript
export * from './components/Modal';
```

### Bước 3: Xác Minh & Sử Dụng
Kiểm tra type-check:
```bash
pnpm --filter @lms/shared type-check
```

Sau khi hoàn tất, sử dụng ngay trong các ứng dụng:
```tsx
import { Modal, Button } from '@lms/shared';
```

---

## 3. Quy Trình Thêm Domain UI Vào `@lms/business`

Tạo file tại `packages/business/src/components/<ComponentName>.tsx` (ví dụ `UserRoleBadge.tsx`):
```tsx
// packages/business/src/components/UserRoleBadge.tsx
import { FC } from 'react';
import { Badge } from '@lms/shared';
import { UserRole, ROLE_LABELS } from '../types';

export interface UserRoleBadgeProps {
  role: UserRole;
}

export const UserRoleBadge: FC<UserRoleBadgeProps> = ({ role }) => {
  const variant =
    role === UserRole.ADMIN ? 'primary' :
    role === UserRole.INSTRUCTOR ? 'success' : 'default';

  return <Badge variant={variant}>{ROLE_LABELS[role]}</Badge>;
};
```

Export tại `packages/business/src/components/index.ts` và sử dụng:
```tsx
import { UserRoleBadge } from '@lms/business';
```

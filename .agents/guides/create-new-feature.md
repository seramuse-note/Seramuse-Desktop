# Cẩm Nang: Hướng Dẫn Thêm Tính Năng Mới (Create New Feature)

Tài liệu này hướng dẫn quy trình 5 bước chuẩn hóa để tạo một tính năng mới theo kiến trúc **3 Tầng: Routes, Pages & Feature Slices** trong `apps/web` hoặc `apps/admin`.

---

## Bước 1: Khai Báo Data Models & Types (nếu cần)

Nếu tính năng có thực thể dữ liệu mới, khai báo kiểu dữ liệu trong **`packages/business/src/types/`**:

1. Thêm hoặc cập nhật file trong `packages/business/src/types/` (ví dụ `certificate.ts`).
2. Export kiểu dữ liệu ra ngoài tại `packages/business/src/types/index.ts`.
3. Kiểm tra tính hợp lệ:
   ```bash
   pnpm --filter @lms/business type-check
   ```

---

## Bước 2: Khai Báo RTK Query Service (nếu có API)

1. Mở `packages/business/src/api/services/` và tạo file service mới (ví dụ `certificate.api.ts`).
2. Sử dụng `baseApi.injectEndpoints`:
   ```typescript
   import { baseApi } from '../base-api';
   import { Certificate } from '../../types';

   export const certificateApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
       getMyCertificates: builder.query<Certificate[], void>({
         queryFn: async () => {
           return { data: [] };
         },
         providesTags: ['Certificate'],
       }),
     }),
   });

   export const { useGetMyCertificatesQuery } = certificateApi;
   ```
3. Export service và các hooks tại `packages/business/src/api/index.ts`.
4. Nếu có tag mới, thêm vào mảng `tagTypes` trong `packages/business/src/api/base-api.ts`.

---

## Bước 3: Tạo Feature Domain Slices

Xác định ứng dụng cần thêm (`apps/web` hoặc `apps/admin`), sau đó tạo thư mục tính năng trong `src/features/`:

```text
src/features/certificates/
├── components/
│   ├── CertificateCard.tsx       # Thẻ chứng chỉ giao diện
│   └── CertificateToolbar.tsx    # Bộ lọc hoặc tìm kiếm
└── index.ts                      # Barrel export các components & hooks
```

### Triển khai `index.ts` của Feature:
```typescript
// src/features/certificates/index.ts
export * from './components/CertificateCard';
export * from './components/CertificateToolbar';
```

---

## Bước 4: Tạo Page Orchestrator & Đăng Ký Route Trong TanStack Router

### 4.1. Tạo Page Orchestrator theo Domain trong `src/pages/<domain>/`
Tạo thư mục domain tương ứng và đặt file page (ví dụ `src/pages/certificates/CertificatesPage.tsx`):
```tsx
// src/pages/certificates/CertificatesPage.tsx
import { FC } from 'react';
import { useGetMyCertificatesQuery } from '@lms/business';
import { CertificateCard, CertificateToolbar } from '@/features/certificates';

export const CertificatesPage: FC = () => {
  const { data: certs = [], isLoading } = useGetMyCertificatesQuery();

  return (
    <div className="space-y-6">
      <CertificateToolbar />
      <div className="grid gap-6 sm:grid-cols-2">
        {certs.map(c => <CertificateCard key={c.id} certificate={c} />)}
      </div>
    </div>
  );
};
```
Tạo barrel export `src/pages/certificates/index.ts` và re-export tại `src/pages/index.ts`.

### 4.2. Đăng ký Tuyến đường Nested trong `src/routes/<domain>/`
Tạo file route endpoint (ví dụ `src/routes/certificates/index.tsx`):
```tsx
// src/routes/certificates/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { CertificatesPage } from '@/pages';

export const Route = createFileRoute('/certificates/')({
  component: CertificatesPage,
});
```
Vite plugin sẽ tự động cập nhật `src/routeTree.gen.ts`. Bạn có thể sử dụng `<Link to="/certificates" />` hoàn toàn Type-Safe trong `Header.tsx` hoặc `AdminSidebar.tsx`.

---

## Bước 5: Kiểm Thử & Xác Minh

Chạy các lệnh xác minh bắt buộc trước khi commit:
```bash
# 1. Kiểm tra không có lỗi kiểu dữ liệu
pnpm type-check

# 2. Đảm bảo ứng dụng đóng gói thành công
pnpm build
```
Khởi động dev server và kiểm tra trực quan trên trình duyệt:
```bash
pnpm dev
```

# Quy Ước Quản Lý Trạng Thái & Dữ Liệu: RTK Query & Redux Toolkit

Tài liệu này quy định cách quản lý state, kết nối dữ liệu mạng và đồng bộ cache trong toàn bộ hệ thống.

---

## 1. Nguyên Tắc Cốt Lõi: RTK Query Tập Trung

Mọi hoạt động fetching dữ liệu và mutation (thêm, sửa, xóa) trong dự án phải được thực hiện thông qua **Redux Toolkit Query (RTK Query)** tại package `@lms/business`.

### 1.1. Cấu Trúc Khai Báo API Service
Mỗi miền nghiệp vụ có một file service tương ứng trong `packages/business/src/api/services/` và được tiêm vào `baseApi` qua `injectEndpoints`:

```typescript
// packages/business/src/api/services/course.api.ts
import { baseApi } from '../base-api';
import { Course } from '../../types';

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      queryFn: async () => {
        // Xử lý lấy dữ liệu
        return { data: courses };
      },
      providesTags: ['Course'],
    }),
    createCourse: builder.mutation<Course, Partial<Course>>({
      queryFn: async (newCourse) => {
        // Xử lý tạo mới
        return { data: createdCourse };
      },
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
} = courseApi;
```

---

## 2. Quy Tắc Gắn Thẻ Cache (Tags Caching & Invalidation)

RTK Query tự động duy trì tính nhất quán của dữ liệu trên toàn bộ giao diện nhờ hệ thống Cache Tags:

1. **`providesTags`**:
   - Mọi Query lấy dữ liệu phải khai báo `providesTags` phù hợp với đối tượng dữ liệu (ví dụ: `['Course']`, `['User']`, `['Enrollment']`, `['Dashboard']`).
2. **`invalidatesTags`**:
   - Mọi Mutation làm thay đổi dữ liệu phải khai báo `invalidatesTags` tương ứng.
   - Khi mutation thành công, tất cả các Query đang lắng nghe tag đó sẽ tự động refetch ngầm trong nền, đảm bảo UI tức thì cập nhật số liệu mới nhất mà không cần tải lại trang.
3. **Đăng ký Tag Types trong `base-api.ts`**:
   - Khi thêm một loại tag mới, bắt buộc phải khai báo trong mảng `tagTypes` của `baseApi` tại `packages/business/src/api/base-api.ts`.

---

## 3. Quy Tắc Sử Dụng Trong Components

1. **Chỉ Dùng Generated Hooks**:
   - Component chỉ được gọi các hook sinh tự động bởi RTK Query:
     ```tsx
     import { useGetCoursesQuery } from '@lms/business';

     export const CourseGrid: React.FC = () => {
       const { data: courses = [], isLoading, isError } = useGetCoursesQuery();
       // ...
     };
     ```
2. **Xử Lý Đầy Đủ Trạng Thái Giao Diện**:
   - Luôn xử lý ít nhất 3 trạng thái:
     - `isLoading`: Hiển thị loading indicator (`Loader2` spinner).
     - `isError` hoặc empty list: Hiển thị thông báo thân thiện.
     - `data`: Render danh sách dữ liệu.
3. **Cấm Dùng Fetch/Axios Đơn Lẻ**:
   - Tuyệt đối không dùng `fetch()` hoặc `axios.get()` trực tiếp bên trong `useEffect()` của component.

---

## 4. Quản Lý Redux Store Của Từng Ứng Dụng

Mỗi app (`apps/web` và `apps/admin`) sở hữu Redux store riêng biệt tại `src/store/index.ts`, đăng ký reducer của `baseApi` và middleware:

```typescript
// apps/admin/src/store/index.ts hoặc apps/web/src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@lms/business';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

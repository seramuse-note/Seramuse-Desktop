# Cẩm Nang: Vận Hành Monorepo (Workflows, Scripts & Dependencies)

Tài liệu này tổng hợp toàn bộ quy trình làm việc với **Turborepo** và **pnpm workspaces** trong hệ thống LMS Frontend.

---

## 1. Khởi Chạy Môi Trường Phát Triển (Dev Server)

### 1.1. Chạy Cả 2 App Song Song (Khuyến Nghị)
```bash
# Chạy chuẩn (localhost)
pnpm dev

# Chạy mở mạng LAN (Hiển thị Network IP cho thiết bị di động truy cập)
pnpm dev:host
```
- Cổng Học Viên (`apps/web`): [http://localhost:5173](http://localhost:5173)
- Cổng Quản Trị (`apps/admin`): [http://localhost:5174](http://localhost:5174)

### 1.2. Chạy Riêng Lẻ Từng Ứng Dụng
```bash
# Chỉ chạy Cổng Học Viên
pnpm --filter @lms/web dev

# Chỉ chạy Cổng Quản Trị
pnpm --filter @lms/admin dev

# Chạy riêng với cờ host LAN
pnpm --filter @lms/web dev -- --host
```

---

## 2. Kiểm Tra Chất Lượng Mã Nguồn (Validation)

Luôn chạy các lệnh kiểm tra sau trước khi tạo commit hoặc pull request:

```bash
# 1. Kiểm tra toàn bộ lỗi TypeScript trên cả 7 packages/apps
pnpm type-check

# 2. Biên dịch toàn bộ mã nguồn ra bundle production (qua Turbo Cache)
pnpm build

# 3. Format mã nguồn với Prettier
pnpm lint
```

---

## 3. Quản Lý Dependencies (Thêm / Xóa Thư Viện)

Trong môi trường Monorepo, **không dùng `npm install`** và **không đứng nhầm thư mục**. Luôn đứng tại thư mục gốc và dùng cờ `--filter`:

### 3.1. Thêm Thư Viện Vào Một Ứng Dụng Cụ Thể
```bash
# Cài đặt vào apps/admin
pnpm add <package-name> --filter @lms/admin

# Cài đặt dạng devDependencies vào apps/web
pnpm add -D <package-name> --filter @lms/web
```

### 3.2. Thêm Thư Viện Vào Packages Dùng Chung
```bash
# Cài vào packages/shared
pnpm add <package-name> --filter @lms/shared

# Cài vào packages/business
pnpm add <package-name> --filter @lms/business
```

### 3.3. Thêm Thư Viện Toàn Cục (Root Monorepo)
Chỉ dùng cho các công cụ tooling dùng chung cho cả repo (như Turbo, Prettier, Typescript):
```bash
pnpm add -D -w <tool-name>
```

---

## 4. Xóa Cache Khi Gặp Lỗi Bất Thường (Troubleshooting)

Nếu gặp sự cố xung đột node_modules hoặc cache của Turborepo:
```bash
# Xóa cache build của turbo
pnpm clean

# Xóa toàn bộ node_modules và cài lại sạch
# (PowerShell trên Windows)
powershell -Command "Get-ChildItem -Path . -Include node_modules,dist,.turbo -Recurse -Directory | Remove-Item -Recurse -Force"
pnpm install
```

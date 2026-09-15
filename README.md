# FinScope Data Console

Frontend dành cho BA đọc dự án, xem dữ liệu, thử API và tra cứu PostgreSQL Physical ERD của hệ thống phân tích tài chính.

## Chức năng chính

- Dashboard tổng quan pipeline và trạng thái hệ thống.
- Project brief song ngữ Anh - Việt theo 12 khu trong ERD.
- Data Explorer cho companies, securities, data sources, ingestion runs và validation results.
- Data Dictionary gồm 43 bảng với field, type, constraint và mô tả.
- API Playground cho các endpoint Spring Boot đang có trong backend.
- Database viewer có zoom, fullscreen, PDF embed và file tải xuống.
- Checklist nghiệm thu cho BA.

## Chạy local

```bash
pnpm install
pnpm dev
```

Mặc định FE gọi backend tại `https://hardened-taekwondo-likewise.ngrok-free.dev`. Có thể đổi bằng biến môi trường:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

Hoặc thay trực tiếp trong phần Cấu hình API ở góc trên giao diện.

## Bảo mật

- Không commit `.env`, token, API key hoặc mật khẩu.
- API base URL được lưu cục bộ trong trình duyệt; request body của Playground không được lưu.
- Raw payload body mặc định không được yêu cầu bởi FE.
- Báo cáo Word nguồn không được đưa vào repository vì có thông tin cá nhân; website chỉ dùng phần mô tả nghiệp vụ và schema đã trích lọc.

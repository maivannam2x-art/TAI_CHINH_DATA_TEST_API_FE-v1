# Security and privacy

## Data handling

- Repository này không chứa nội dung chat, token, API key, mật khẩu hoặc file `.env`.
- Báo cáo Word nguồn không được commit vì có thông tin cá nhân. Chỉ phần mô tả nghiệp vụ và data dictionary đã trích lọc được dùng trong FE.
- Database ERD được đưa vào `public/documents` theo yêu cầu để BA có thể zoom và xem PDF.
- API Playground không lưu request body. API base URL chỉ được lưu trong local storage của trình duyệt.
- Raw payload body không được FE yêu cầu theo mặc định.

## Deployment headers

Vercel được cấu hình với CSP, `nosniff`, `SAMEORIGIN`, referrer policy và permissions policy để hạn chế script/frame ngoài ý muốn và tắt camera, microphone, geolocation.

## Reporting

Không commit thông tin đăng nhập khi báo lỗi. Chỉ cung cấp endpoint, HTTP status và message đã loại bỏ dữ liệu nhạy cảm.

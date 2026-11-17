# Trạng thái triển khai Sử Đồ

Giai đoạn hiện tại: C đã có luồng hoàn chỉnh; D có bản đầu của chín chương; E có khung thời kỳ đến 1900.

## Đã triển khai

- Next.js/TypeScript xuất tĩnh, atlas responsive, chọn thời kỳ/mốc/chương, bản đồ SVG tải chậm và danh sách thay thế.
- Nhân vật, quan hệ phân loại, chuỗi người giữ ngôi có Dương Nhật Lễ, tách Trần Thừa khỏi hoàng đế trị vì.
- Tìm kiếm có/không dấu, liên kết trạng thái và Back/forward; chú thích nguồn mở tại chỗ, dữ kiện và diễn giải có phân loại.
- Dữ liệu địa lý, ảnh hiện vật và font lưu cục bộ kèm nguồn/quyền sử dụng; thiếu dữ liệu ranh giới được thông báo.

## Kiểm tra đã thực hiện

- TypeScript: đạt.
- Audit tham chiếu dữ liệu: đạt.
- 9 kiểm thử logic/dữ liệu: đạt.
- Build Next.js static export: đạt.
- Playwright desktop/mobile: 20/20 đạt trên Microsoft Edge (1440×960 và giả lập iPhone 13); ảnh atlas đại diện đã được mở xem trên hai kích thước. Chưa kiểm tra Safari/Firefox hoặc thiết bị cảm ứng thật.

## Còn thiếu

- Chưa có người biên tập chuyên môn duyệt; chưa đối chiếu bản in cho mọi sử liệu.
- Chưa có polygon lịch sử hoặc tuyến hành quân đủ căn cứ; không nội suy hoặc dùng lãnh thổ hiện đại thay thế.
- Một số mốc/biến thể tên giữa các tài liệu cần bổ sung so sánh trước khi mở rộng nội dung.
- Chuyên đề đời sống, đê điều, văn học, kiến trúc và quan hệ khu vực chưa đạt chiều sâu mong muốn; các thời kỳ ngoài nhà Trần chưa biên soạn sâu.

Bước tiếp theo: rà các trạng thái thời kỳ chưa biên soạn và ngữ cảnh năm/địa điểm, bổ sung ảnh nguồn và phả hệ, rồi chốt tài liệu bàn giao. Chưa push hoặc triển khai.

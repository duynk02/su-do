# Trạng thái triển khai Sử Đồ

Giai đoạn hiện tại: đã bàn giao bản local chạy được. A/B có hồ sơ nguồn, schema và thiết kế; C có luồng hoàn chỉnh; D có bản đầu của chín chương, chưa hoàn tất biên tập chuyên sâu; E có khung thời kỳ đến 1900.

## Đã triển khai

- Next.js/TypeScript xuất tĩnh, atlas responsive, chọn thời kỳ/mốc/chương, bản đồ SVG tải chậm và danh sách thay thế.
- Nhân vật, quan hệ phân loại, chuỗi người giữ ngôi có Dương Nhật Lễ, tách Trần Thừa khỏi hoàng đế trị vì.
- Tìm kiếm có/không dấu và theo năm, liên kết trạng thái và Back/forward; chú thích nguồn mở tại chỗ, dữ kiện và diễn giải có phân loại.
- Dữ liệu địa lý, ảnh hiện vật và font lưu cục bộ kèm nguồn/quyền sử dụng; thiếu dữ liệu ranh giới được thông báo.
- 25 hồ sơ nguồn đã đọc, 37 khẳng định, 47 dẫn nguồn; bản biên niên được đối chiếu với Thế thứ, hồ sơ di sản và phần Toàn thư đã tiếp cận. Không coi số lượng nguồn là thước đo chất lượng lịch sử.
- Danh mục nhân vật/sự kiện trống đúng thời kỳ chưa biên soạn; địa điểm giữ từ bài đọc khi lệch năm có ghi chú ngữ cảnh. Nút chọn nhân vật cập nhật năm giữ vai trò/sự kiện liên quan.
- Chọn một bài/nhân vật/sự kiện mới đưa vùng đọc về đầu; mở chú thích hoặc dịch/zoom bản đồ giữ điểm đọc. Không dùng cuộn bài để tự đổi năm/camera.
- Bộ tài liệu yêu cầu đã có; ảnh thực tế atlas desktop/mobile, bản đồ mobile, phả hệ, hiện vật và hộp nguồn trong `docs/screenshots/`.

## Kiểm tra đã thực hiện

Sửa lỗi hydration và khả năng đọc:
- Đã tái hiện đúng cảnh báo bằng cách chèn thuộc tính cursor trước hydration trên dev server.
- Đã giới hạn xử lý tại `html`/`body`: 4/4 ca development desktop/mobile đạt, gồm đối chứng sai khác trong bài đọc vẫn được phát hiện.
- Playwright dùng cổng riêng 3100 cho bản xuất tĩnh; phiên này giữ nguyên dev server có sẵn ở cổng 3000.
- Đang hoàn thiện kiểm tra cỡ chữ và bố cục ở năm độ rộng 1920/1440/1024/390/360px.

- TypeScript: đạt.
- Audit tham chiếu dữ liệu: đạt.
- 10 kiểm thử logic/dữ liệu: đạt.
- Build Next.js static export: đạt.
- Playwright desktop/mobile: 24/24 đạt trên Microsoft Edge (1440×960 và giả lập iPhone 13); bao gồm các trường hợp nghiệm thu chính, không có cuộn ngang ở màn hình đại diện, nguồn/khôi phục focus, URL/Back/forward, thiếu bản đồ, giảm chuyển động, phím dịch bản đồ và trạng thái chưa biên soạn.
- Ảnh atlas, hiện vật, phả hệ và bản đồ mobile đã được mở xem; sửa các nhãn/mũi tên sơ đồ bị che. Chưa kiểm tra Safari/Firefox, thiết bị cảm ứng thật hoặc đánh giá WCAG đầy đủ.
- Build HTTP cục bộ được Playwright xác nhận thành công. Server kiểm thử được tự đóng sau mỗi lượt; dùng `npm start` hoặc `npm run dev` để mở lại.

## Còn thiếu

- Chưa có người biên tập chuyên môn duyệt; chưa đối chiếu bản in cho mọi sử liệu.
- Chưa có polygon lịch sử hoặc tuyến hành quân đủ căn cứ; không nội suy hoặc dùng lãnh thổ hiện đại thay thế.
- Một số mốc/biến thể tên giữa các tài liệu cần bổ sung so sánh trước khi mở rộng nội dung.
- Chuyên đề đời sống, đê điều, văn học, kiến trúc và quan hệ khu vực chưa đạt chiều sâu mong muốn; các thời kỳ ngoài nhà Trần chưa biên soạn sâu.

Bước tiếp theo về nội dung: người biên tập đối chiếu bản in cho các mốc còn khác nhau, bổ sung chuyên đề đời sống và vai trò Thượng hoàng còn thiếu, rồi duyệt từng khẳng định. Giữ cấu trúc atlas địa điểm cho đến khi có dữ liệu ranh giới đủ căn cứ. Phiên này chỉ tạo local commit, không push hoặc triển khai.

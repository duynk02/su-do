# Trạng thái triển khai Sử Đồ

Giai đoạn hiện tại: đã bàn giao bản local chạy được. A/B có hồ sơ nguồn, schema và thiết kế; C có luồng hoàn chỉnh; D có bản đầu của chín chương, chưa hoàn tất biên tập chuyên sâu; E có khung thời kỳ đến 1900.

## Đã triển khai

- Next.js/TypeScript xuất tĩnh, atlas responsive, chọn thời kỳ/mốc/chương, bản đồ SVG tải chậm và danh sách thay thế.
- Nhân vật, quan hệ phân loại, chuỗi người giữ ngôi có Dương Nhật Lễ, tách Trần Thừa khỏi hoàng đế trị vì.
- 23 hồ sơ có đoạn tiểu sử giới thiệu; Nhân Tông và Nhật Lễ có các phần nội dung chi tiết. Bổ sung niên đại sống có căn cứ, danh xưng Phật hoàng, niên hiệu, 12 quan hệ cha–con và sáu sự kiện liên quan có thể mở trực tiếp từ hồ sơ.
- Tìm kiếm có/không dấu và theo năm, liên kết trạng thái và Back/forward; chú thích nguồn mở tại chỗ, dữ kiện và diễn giải có phân loại.
- Dữ liệu địa lý, ảnh hiện vật và font lưu cục bộ kèm nguồn/quyền sử dụng; thiếu dữ liệu ranh giới được thông báo.
- 29 hồ sơ nguồn đã đọc, 68 khẳng định, 93 dẫn nguồn; bản biên niên được đối chiếu với Thế thứ, hồ sơ di sản và phần Toàn thư đã tiếp cận. Không coi số lượng nguồn là thước đo chất lượng lịch sử.
- Danh mục nhân vật/sự kiện trống đúng thời kỳ chưa biên soạn; địa điểm giữ từ bài đọc khi lệch năm có ghi chú ngữ cảnh. Nút chọn nhân vật cập nhật năm giữ vai trò/sự kiện liên quan.
- Chọn một bài/nhân vật/sự kiện mới đưa vùng đọc về đầu; mở chú thích hoặc dịch/zoom bản đồ giữ điểm đọc. Không dùng cuộn bài để tự đổi năm/camera.
- Bộ tài liệu yêu cầu đã có; ảnh thực tế atlas desktop/mobile, bản đồ mobile, phả hệ, hiện vật và hộp nguồn trong `docs/screenshots/`.

## Kiểm tra đã thực hiện

Mở rộng tiểu sử nhân vật:
- Cả 23 hồ sơ có đoạn giới thiệu được dẫn nguồn. Nhân Tông có xuất thân/lên ngôi, kháng chiến và giai đoạn Thượng hoàng–tu hành; Nhật Lễ có nguyên nhân được chọn, vị trí trong chuỗi vua và biến động cung đình 1369–1370. Không sao chép nguyên văn đoạn Wikipedia được đưa làm ví dụ.
- Bổ sung sáu sự kiện và 12 quan hệ cha–con có nguồn; danh mục sự kiện được xếp theo năm. Tìm “Phật hoàng” mở được Nhân Tông. Đã phân biệt đời sống, trị vì, mang tôn hiệu Thượng hoàng và xuất gia.
- Đã sửa xung đột giữa khôi phục cuộn của trình duyệt và điều hướng bài đọc khi Back từ sự kiện về tiểu sử dài trên mobile.
- TypeScript/build xuất tĩnh, audit 68 Claim/93 Citation/29 Source và 10 kiểm thử logic đều đạt. Lượt Playwright cuối: 32 ca production đạt, 2 ca đối chứng hydration development được bỏ qua đúng cấu hình. Bao gồm bốn ca tiểu sử/nguồn/sự kiện/Back mới trên desktop/mobile và kiểm tra cỡ chữ ở năm độ rộng.
- Đã mở xem ảnh Nhân Tông desktop, Nhật Lễ mobile và phả hệ; ảnh bốn hồ sơ nằm tại `docs/screenshots/nhan-tong-*.png` và `nhat-le-*.png`. Tệp `next-env.d.ts` có sẵn được giữ ngoài commit.

Tinh gọn nội dung giao diện:
- Đã bỏ phần Phương pháp, thông tin tính tọa độ/kiểu vị trí, ghi chú tỷ lệ/nội suy, giới hạn dựng sơ đồ, hướng dẫn đọc và thông tin biên tập lặp lại. Phương pháp và hồ sơ giới hạn nguồn vẫn được lưu trong tài liệu/dữ liệu dự án.
- Giữ dẫn nguồn, thông tin xuất bản, chú giải cần để đọc bản đồ, trạng thái thiếu dữ liệu và những điểm bất định lịch sử. Danh mục tư liệu mở trực tiếp; trang Thăng Long không còn hai khối kỹ thuật được yêu cầu bỏ.
- TypeScript, build, 10 kiểm thử logic/dữ liệu và audit tham chiếu đều đạt. 26 ca giao diện production đạt trong lượt toàn bộ; 2 ca cỡ chữ được cập nhật vì ghi chú năm đã xóa và chạy lại đạt trên cả năm độ rộng. Hai ca đối chứng hydration chỉ dành cho development được bỏ qua trên production.
- Đã mở riêng trang Thăng Long trên desktop/mobile, kiểm tra danh mục 25 nguồn và liên kết bằng chứng; không có lỗi runtime. Ảnh giao diện trong `docs/screenshots/` được cập nhật.
- Thay đổi có sẵn trong `next-env.d.ts` được giữ nguyên, ngoài commit của phiên này.

Sửa lỗi hydration và khả năng đọc:
- Đã tái hiện đúng cảnh báo bằng cách chèn thuộc tính cursor trước hydration trên dev server.
- Đã giới hạn xử lý tại `html`/`body`: 4/4 ca development desktop/mobile đạt, gồm đối chứng sai khác trong bài đọc vẫn được phát hiện.
- Playwright dùng cổng riêng 3100 cho bản xuất tĩnh; phiên này giữ nguyên dev server có sẵn ở cổng 3000.
- Đã nâng chữ phụ/chú thích lên 13–14px và chữ bài đọc 16px, tăng tương phản, điều chỉnh hàng điều khiển để xuống dòng khi cần.
- Nhãn địa điểm giữ cỡ 14px khi zoom; bố trí riêng trên màn hình hẹp và chừa khoảng cho nút lớp, zoom, chú giải. Năm độ rộng 1920/1440/1024/390/360px đã được đo và mở ảnh kiểm tra.
- TypeScript và build bản xuất tĩnh đạt. Lượt kiểm thử cuối có 28/28 ca phù hợp production đạt; 2 ca đối chứng cảnh báo chỉ chạy ở development được bỏ qua trên production và đã đạt trong lượt dev 4/4.
- Đã mở xem ảnh mới trên desktop 1920px và mobile 390/360px. Kiểm tra cỡ chữ hiển thị, va chạm nhãn với nút bản đồ/chú giải và cuộn ngang ở cả năm độ rộng đều đạt.
- Giữ nguyên thay đổi `next-env.d.ts` đã có trước phiên sửa; không gộp tệp tự sinh này vào commit.

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

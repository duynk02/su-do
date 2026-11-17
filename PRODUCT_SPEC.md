# Sử Đồ — đặc tả sản phẩm

## Nhu cầu

Kết nối thời gian, địa điểm, con người và nguyên nhân–diễn biến–hệ quả để người đọc phổ thông hiểu lịch sử Việt Nam trước năm 1900. Không yêu cầu đăng nhập hoặc kiến thức chuyên ngành.

## Phiên bản hiện tại

Khung thời kỳ từ dựng nước đến 1900; tập trung nhà Trần với bối cảnh cuối Lý và chuyển Hồ. Chín phần có câu hỏi dẫn, đoạn biên khảo, trực quan phù hợp, liên kết người/sự kiện/địa điểm và nguồn mở tại chỗ. Giao diện giữ những điểm bất định lịch sử và trạng thái nội dung chưa có; phương pháp triển khai, hướng dẫn biên tập và quy tắc thiết kế nằm trong tài liệu dự án.

Luồng chính: chọn Trần → đọc cuối Lý → mở Trần Cảnh từ chương chuyển ngôi hoặc bộ máy → xem quan hệ với Trần Thừa và Lý Chiêu Hoàng → mở sự kiện chuyển triều → xem địa điểm và nguồn.

## Tương tác

- Khám phá: tự chọn thời kỳ, năm, sự kiện, người hoặc địa điểm; cuộn bài không đổi bản đồ.
- Câu chuyện: vùng đọc rộng hơn, chọn chương hoặc Trước/Tiếp theo để đổi mốc/địa điểm; không tự phát.
- Dải thời kỳ là thứ tự chương, không theo tỷ lệ năm. Giai đoạn Lê–Mạc/Trịnh–Nguyễn hiển thị làn đồng thời.
- Bản đồ: pan bằng kéo/phím mũi tên, zoom bằng nút hoặc +/−, Home khôi phục. Nền hiện đại, biên giới hiện đại mặc định tắt. Không có polygon lịch sử.
- Nguồn: nút số cạnh khẳng định mở hộp thoại; Escape đóng và khôi phục focus. Danh mục nguồn mở trực tiếp từ đầu trang hoặc cuối bài.
- Tìm kiếm: không phân biệt dấu, hỗ trợ tên húy, miếu hiệu, tên thường gọi; có trạng thái không kết quả.
- URL lưu thời kỳ, chương, năm, chế độ, loại bài và thực thể; reload, Back/forward khôi phục lựa chọn. Không hứa lưu vị trí cuộn hoặc góc camera.
- Mobile: bộ chọn thời kỳ + mục lục; hai vùng Bản đồ/Bài đọc, một luồng cuộn trang. Nội dung không phụ thuộc WebGL.

## Trạng thái bằng chứng

Các Period/Claim có bốn trạng thái. Chưa có nội dung `editor-approved`; nguồn đơn lẻ không tự trở thành đối chiếu độc lập. Diễn giải và câu hỏi kết nối được gắn loại riêng. Địa điểm hiện đại/tưởng niệm/đại diện/chưa xác định phải đọc phân biệt.

## Chấp nhận

Các trường hợp bắt buộc từ prompt được đưa vào `tests/history.test.ts` và `tests/e2e/atlas.spec.ts`: vai trò Trần Thừa, Dương Nhật Lễ trong chuỗi vua, nguồn/vị trí dẫn, thiếu ranh giới, làn đồng thời, URL, tìm kiếm, giảm chuyển động, lỗi bản đồ và ảnh hiện vật. Chưa dùng minh họa AI; nếu bổ sung tái dựng phải có nhãn thường trực.

## Ngoài phạm vi

Tài khoản, mạng xã hội, chat, thanh toán, gamification, CMS, backend, tái dựng chiến thuật chi tiết và triển khai công khai.

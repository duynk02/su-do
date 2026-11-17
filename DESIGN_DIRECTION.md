# Sử Đồ — định hướng thiết kế

Atlas lịch sử kết hợp sách biên khảo tương tác. Người đọc vào thẳng không gian khám phá, mặc định ở cuối Lý – sự hình thành triều Trần.

## Hai phương án đã đánh giá

1. **Atlas mở:** dải thời kỳ hẹp bên trái, bản đồ lớn ở giữa, trang đọc bên phải. Chọn mốc hoặc chương cập nhật địa điểm, năm và chú thích. Phù hợp việc đối chiếu khi nào / ở đâu / ai.
2. **Sách theo hành trình:** bài đọc một cột làm trung tâm, bản đồ thu nhỏ cố định và mục lục chương nằm ngang. Dễ đọc liên tục nhưng khó so sánh nhiều thời kỳ và nhận diện thiếu dữ liệu không gian.

Chọn phương án 1, với vùng đọc mở rộng khi bật chế độ câu chuyện. Mobile có bộ chọn thời kỳ và hai nút Bản đồ / Bài đọc, chỉ một luồng cuộn trang.

## Năm quyết định tạo bản sắc

- Dải niên đại như mục lục atlas, ghi rõ không theo tỷ lệ năm; các chính quyền đồng thời dùng làn song song.
- Bản đồ nền xanh xám nhạt và đất trung tính, không tô lãnh thổ lịch sử khi chưa có tư liệu.
- Chương có số thứ tự, câu hỏi dẫn và chú thích nguồn ngay bên cạnh khẳng định.
- Phả hệ dùng đường có nhãn; trị vì và thượng hoàng là hai làn riêng.
- Màu son đất dành cho lựa chọn, kết nối trực tiếp mốc thời gian, điểm bản đồ và bài đọc.

## Quy tắc thị giác

- Hai họ chữ: Noto Serif cho tiêu đề/đoạn dẫn, Be Vietnam Pro cho nội dung và điều khiển; lưu font cục bộ với giấy phép OFL.
- Nền #f6f4ed, giấy đọc #fbfaf6, mực #25362f, son #a13d2d; chữ hỗ trợ phải đủ tương phản.
- Lưới khoảng cách 4/8/12/16/24/32px, không đóng từng đoạn thành card. Chữ nội dung tối thiểu 15–16px, dòng 1.7, không quá 65 ký tự khi có thể.
- Kinh đô: hình vuông bên trong vòng; địa điểm: chấm tròn; vị trí tương đối: vòng nét đứt. Tên và loại điểm có trong danh sách văn bản.
- Dữ liệu địa lý hiện đại luôn có chú thích. Lớp tham chiếu biên giới hiện đại mặc định tắt, có nhãn riêng.
- Nhãn nguồn là nút số; mở hộp thoại có vị trí tra cứu, phạm vi hỗ trợ và giới hạn. Escape đóng, focus được giữ và khôi phục.

Tránh hero quảng cáo, dashboard, bento, họa tiết giả cổ, gradient, chân dung AI và chuyển động trang trí. Không tự di chuyển bản đồ khi cuộn bài.

## Kiểm tra thiết kế

Ảnh màn hình và kết quả QA sẽ được ghi trong IMPLEMENTATION_STATUS.md sau khi ứng dụng chạy. Chưa có chuyên gia lịch sử duyệt nội dung; các điểm bất đồng phải luôn mở được trên giao diện.

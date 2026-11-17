# Sử Đồ — định hướng thiết kế

Atlas lịch sử kết hợp sách biên khảo tương tác. Người đọc vào thẳng không gian khám phá, mặc định ở cuối Lý – sự hình thành triều Trần.

## Hai phương án đã đánh giá

1. **Atlas mở:** dải thời kỳ hẹp bên trái, bản đồ lớn ở giữa, trang đọc bên phải. Chọn mốc hoặc chương cập nhật địa điểm, năm và chú thích. Phù hợp việc đối chiếu khi nào / ở đâu / ai.
2. **Sách theo hành trình:** bài đọc một cột làm trung tâm, bản đồ thu nhỏ cố định và mục lục chương nằm ngang. Dễ đọc liên tục nhưng khó so sánh nhiều thời kỳ và nhận diện thiếu dữ liệu không gian.

Chọn phương án 1, với vùng đọc mở rộng khi bật chế độ câu chuyện. Mobile có bộ chọn thời kỳ và hai nút Bản đồ / Bài đọc, chỉ một luồng cuộn trang.

## Năm quyết định tạo bản sắc

- Dải niên đại như mục lục atlas; các chính quyền đồng thời dùng làn song song.
- Bản đồ nền xanh xám nhạt và đất trung tính, không tô lãnh thổ lịch sử khi chưa có tư liệu.
- Chương có số thứ tự, câu hỏi dẫn và chú thích nguồn ngay bên cạnh khẳng định.
- Phả hệ dùng đường có nhãn; trị vì và thượng hoàng là hai làn riêng.
- Màu son đất dành cho lựa chọn, kết nối trực tiếp mốc thời gian, điểm bản đồ và bài đọc.

## Quy tắc thị giác

- Hai họ chữ: Noto Serif cho tiêu đề/đoạn dẫn, Be Vietnam Pro cho nội dung và điều khiển; lưu font cục bộ với giấy phép OFL.
- Nền #f6f4ed, giấy đọc #fbfaf6, mực #25362f, son #a13d2d; chữ hỗ trợ phải đủ tương phản.
- Lưới khoảng cách 4/8/12/16/24/32px, không đóng từng đoạn thành card. Chữ nội dung tối thiểu 15–16px, dòng 1.7, không quá 65 ký tự khi có thể.
- Kinh đô: biểu tượng cổng thành trong vòng màu son, giữ kích thước thực khi zoom; địa điểm: chấm tròn; vị trí tương đối: vòng nét đứt. Cùng biểu tượng cổng thành xuất hiện trong chú giải; tên và loại điểm có trong danh sách văn bản.
- Dữ liệu địa lý hiện đại luôn có chú thích. Lớp tham chiếu biên giới hiện đại mặc định tắt, có nhãn riêng.
- Nhãn nguồn là nút số; mở hộp thoại có vị trí tra cứu, phạm vi hỗ trợ và xuất xứ. Escape đóng, focus được giữ và khôi phục.

Chỉ hiển thị nội dung phục vụ việc học và điều hướng. Phương pháp tính tọa độ, quy tắc tỷ lệ/nội suy, giới hạn dựng sơ đồ và hướng dẫn biên tập được lưu trong tài liệu dự án. Giao diện giữ dẫn nguồn, chú giải bản đồ, trạng thái chưa có dữ liệu và các điểm bất định lịch sử liên quan trực tiếp đến bài đọc. Danh mục nguồn mở trực tiếp, không kèm trang hướng dẫn sử dụng.

Tránh hero quảng cáo, dashboard, bento, họa tiết giả cổ, gradient, chân dung AI và chuyển động trang trí. Không tự di chuyển bản đồ khi cuộn bài.

## Kiểm tra thiết kế

Ảnh thực tế trong `docs/screenshots/`: `atlas-desktop.png` (1440×960), `atlas-mobile.png` (390×844), `map-mobile.png`, `genealogy-desktop.png`, `artifact-desktop.png`, `evidence-desktop.png` và `evidence-mobile.png`. Atlas, trang đọc mobile, ảnh hiện vật, phả hệ và bản đồ mobile đã được mở xem; kết quả các kiểm thử được ghi trong IMPLEMENTATION_STATUS.md.

Đã sửa nhãn và đầu mũi tên sơ đồ bị che bởi nút, tăng độ tách giữa các nút, tăng cỡ chữ vùng đọc/chú thích nguồn. Mobile được thiết kế với một vùng đọc hoặc bản đồ, không xếp ba cột thành ba ô cuộn.

Giới hạn còn lại: nhãn địa điểm có thể chen nhau khi zoom/pan tùy ý; sơ đồ gia đình rộng cần cuộn ngang hoặc dùng thu phóng trong khung riêng. Chưa kiểm tra thiết bị cảm ứng thật, Safari/Firefox hoặc đánh giá WCAG đầy đủ. Chưa có chuyên gia lịch sử duyệt nội dung; điểm bất đồng mở được trên giao diện. Không dùng chuyển động trang trí, hero, thống kê quảng cáo hoặc chân dung AI.

## Cỡ chữ và khoảng trống cho nhãn

- Thang chữ: `--text-body: 16px`, `--text-ui: 14px`, `--text-note: 13px`. Chú giải, chữ nguồn, thanh năm, mục lục, mô tả thương hiệu và ghi chú biên khảo dùng tối thiểu 13px trên các breakpoint đã kiểm tra.
- Tăng độ tương phản của chữ hỗ trợ và mở rộng chiều cao/độ rộng vùng chứa. Mobile cho các hàng điều khiển xuống dòng và tăng chiều cao bản đồ để dành chỗ cho chú giải.
- Nhãn địa điểm hiển thị 14px, nhãn phụ kinh đô 13px theo kích thước thực trên màn hình; cỡ chữ không bị thu theo camera. Ở góc nhìn hẹp, bản đồ giảm nhãn khi zoom nhỏ hoặc khi tập trung một địa điểm; danh sách văn bản vẫn truy cập được.
- Đo kích thước chân bản đồ bằng ResizeObserver để các nút zoom nằm phía trên chú giải. Nhãn chừa khoảng cho điều khiển và chú thích cuối bản đồ.
- Kiểm tra bằng trình duyệt ở 1920×1080, 1440×960, 1024×768, 390×844 và 360×800; ảnh `docs/screenshots/readability-<chiều rộng>.png` ghi trạng thái thực tế.

## Phả hệ và các loại quan hệ

Tách ba chế độ Gia đình / Kế vị / Chính trị. Gia đình dùng bố cục theo tầng cha mẹ–con và đặt người phối ngẫu cạnh nhau; quan hệ cha mẹ nối từ từng người có nguồn, không nối con vào giữa đường hôn nhân. Kế vị là chuỗi riêng với niên đại trị vì, không bị hiểu thành huyết thống. Chính trị giữ nhãn mô tả trực tiếp.

Mở rộng thêm một bậc theo loại quan hệ đang xem và hiển thị các liên kết đã biết giữa những người trong phạm vi đó. Bỏ giới hạn cứng chín nút. Chữ tên giữ 14px ở mức 100%; sơ đồ rộng cuộn ngang trong khung, có nút thu nhỏ/phóng to, về 100% và vừa khung. Mỗi ô có thể mở hồ sơ bằng chuột hoặc bàn phím. Danh sách văn bản và nguồn vẫn đọc được dưới sơ đồ.

Các cuộc hôn nhân nối tiếp được bố trí để mỗi cặp nằm cạnh nhau khi có thể, với nhãn chỉ giai đoạn. Cạnh mẹ–con là dữ liệu riêng, không sinh từ đường hôn nhân. Nhãn chính trị đi theo nhánh đích để các nhánh nhiếp chính/cất nhắc không đè chữ lên nhau.

## Hình trong hồ sơ

Ảnh đặt bên phải tên và danh xưng khi vùng đọc đủ rộng; vùng hẹp xếp ảnh xuống dưới tiêu đề. Giữ trọn ảnh bằng `object-fit: contain`, không cắt đầu tượng hoặc phần nhận diện di tích. Chú thích ngắn gọi đúng tượng/di tích, kèm tác giả và liên kết giấy phép tối thiểu 13px. Nhấn ảnh mở trang mô tả nguồn. Không có ảnh phù hợp thì dùng bố cục chữ gọn, không để khung trống.

Các lần thêm bài sau cần xem xét tư liệu trực quan có ích cho việc học, theo `HISTORICAL_EDITORIAL_POLICY.md`. Biểu tượng kinh đô là ký hiệu bản đồ, không phải bản vẽ phục dựng kiến trúc của một cung điện cụ thể.

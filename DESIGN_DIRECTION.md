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
- Kinh đô: hình vuông bên trong vòng; địa điểm: chấm tròn; vị trí tương đối: vòng nét đứt. Tên và loại điểm có trong danh sách văn bản.
- Dữ liệu địa lý hiện đại luôn có chú thích. Lớp tham chiếu biên giới hiện đại mặc định tắt, có nhãn riêng.
- Nhãn nguồn là nút số; mở hộp thoại có vị trí tra cứu, phạm vi hỗ trợ và xuất xứ. Escape đóng, focus được giữ và khôi phục.

Chỉ hiển thị nội dung phục vụ việc học và điều hướng. Phương pháp tính tọa độ, quy tắc tỷ lệ/nội suy, giới hạn dựng sơ đồ và hướng dẫn biên tập được lưu trong tài liệu dự án. Giao diện giữ dẫn nguồn, chú giải bản đồ, trạng thái chưa có dữ liệu và các điểm bất định lịch sử liên quan trực tiếp đến bài đọc. Danh mục nguồn mở trực tiếp, không kèm trang hướng dẫn sử dụng.

Tránh hero quảng cáo, dashboard, bento, họa tiết giả cổ, gradient, chân dung AI và chuyển động trang trí. Không tự di chuyển bản đồ khi cuộn bài.

## Kiểm tra thiết kế

Ảnh thực tế trong `docs/screenshots/`: `atlas-desktop.png` (1440×960), `atlas-mobile.png` (390×844), `map-mobile.png`, `genealogy-desktop.png`, `artifact-desktop.png`, `evidence-desktop.png` và `evidence-mobile.png`. Atlas, trang đọc mobile, ảnh hiện vật, phả hệ và bản đồ mobile đã được mở xem; kết quả các kiểm thử được ghi trong IMPLEMENTATION_STATUS.md.

Đã sửa nhãn và đầu mũi tên sơ đồ bị che bởi nút, tăng độ tách giữa các nút, tăng cỡ chữ vùng đọc/chú thích nguồn. Mobile được thiết kế với một vùng đọc hoặc bản đồ, không xếp ba cột thành ba ô cuộn.

Giới hạn còn lại: nhãn địa điểm có thể chen nhau khi zoom/pan tùy ý; sơ đồ mở rộng giới hạn 9 nút và vẫn cần danh sách văn bản khi nhiều cạnh. Chưa kiểm tra thiết bị cảm ứng thật, Safari/Firefox hoặc đánh giá WCAG đầy đủ. Chưa có chuyên gia lịch sử duyệt nội dung; điểm bất đồng mở được trên giao diện. Không dùng chuyển động trang trí, hero, thống kê quảng cáo hoặc chân dung AI.

## Cỡ chữ và khoảng trống cho nhãn

- Thang chữ: `--text-body: 16px`, `--text-ui: 14px`, `--text-note: 13px`. Chú giải, chữ nguồn, thanh năm, mục lục, mô tả thương hiệu và ghi chú biên khảo dùng tối thiểu 13px trên các breakpoint đã kiểm tra.
- Tăng độ tương phản của chữ hỗ trợ và mở rộng chiều cao/độ rộng vùng chứa. Mobile cho các hàng điều khiển xuống dòng và tăng chiều cao bản đồ để dành chỗ cho chú giải.
- Nhãn địa điểm hiển thị 14px, nhãn phụ kinh đô 13px theo kích thước thực trên màn hình; cỡ chữ không bị thu theo camera. Ở góc nhìn hẹp, bản đồ giảm nhãn khi zoom nhỏ hoặc khi tập trung một địa điểm; danh sách văn bản vẫn truy cập được.
- Đo kích thước chân bản đồ bằng ResizeObserver để các nút zoom nằm phía trên chú giải. Nhãn chừa khoảng cho điều khiển và chú thích cuối bản đồ.
- Kiểm tra bằng trình duyệt ở 1920×1080, 1440×960, 1024×768, 390×844 và 360×800; ảnh `docs/screenshots/readability-<chiều rộng>.png` ghi trạng thái thực tế.

## Nhãn trên sơ đồ quan hệ

Các cạnh cùng một cặp nhân vật được tách bằng đường cong riêng, kể cả khi hai cạnh có hướng ngược nhau. Vị trí nhãn được tính theo từng cặp, kiểm tra khoảng trống với các nhãn khác và ô nhân vật. Nhãn cần dịch khỏi đường nối có một đường dẫn mảnh trở lại cạnh tương ứng. Lớp đường nối được vẽ trước ô nhân vật và chữ, tránh đường đi xuyên qua chữ. Kiểu nét, hướng mũi tên và nguồn của từng quan hệ được giữ riêng.

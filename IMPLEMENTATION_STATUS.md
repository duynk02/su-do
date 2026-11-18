# Trạng thái triển khai Sử Đồ

Giai đoạn hiện tại: đã có bộ Lý, Trần và Hồ trên khung dữ liệu theo thời kỳ. Bản local xuất tĩnh; chưa push hoặc triển khai công khai. Database/CMS, góp ý và dashboard vẫn dành cho giai đoạn sau khi phần lớn các triều đại được biên soạn.

Quy trình Git: mỗi nhóm công việc mới dùng một nhánh tạo từ `master`, chỉnh sửa và commit trên nhánh đó. Người dùng tự tạo pull request trên GitHub; phản hồi sau commit cung cấp tiêu đề, tóm tắt và kiểm tra để dùng cho PR. Hướng dẫn được lưu tại `AGENTS.md`.

## Điều chỉnh câu chữ và danh sách vua · 18/11/2026

- Viết đầy đủ “cuối thời Lý”, “cuối thời Trần”, “đầu thời Hồ” trong tiêu đề, mục lục, tổng quan, tiểu sử, chú thích và nhãn thời gian; chuyển triều ghi rõ “từ nhà … sang nhà …”. Quy ước được lưu trong HISTORICAL_EDITORIAL_POLICY.md để áp dụng khi mở rộng các thời kỳ sau. Giữ nguyên ID, đường dẫn và nhan đề gốc của nguồn.
- Bỏ cờ emphasis gắn riêng cho Dương Nhật Lễ, thuộc tính trong schema và CSS tương ứng. Các dòng vua cùng kiểu trình bày; Nhật Lễ vẫn nằm giữa Dụ Tông và Nghệ Tông. Nhãn lớp tham chiếu địa lý hiện đại dùng được cho mọi thời kỳ.
- Build/TypeScript, audit và 28 unit test đạt. 12 ca Playwright liên quan đạt trên desktop/mobile qua lượt chạy chính và chạy lại hai ca dùng nhãn bản đồ mới. Đã so sánh nền, viền và căn lề ba dòng Dụ Tông–Nhật Lễ–Nghệ Tông trên cả hai viewport; các giá trị giống nhau. Ảnh kiểm tra tại docs/screenshots/atlas-* và ruler-list-*.

## Kết quả hiện tại

- Nhà Lý: 10 chương, 23 nhân vật liên quan, 14 sự kiện, chín người giữ ngôi. Nhà Trần: giữ chín chương, 30 nhân vật liên quan, 18 sự kiện, 13 người giữ ngôi; hai hồ sơ mới và ba sự kiện cải cách giao thời được dùng chung với bộ Hồ.
- Nhà Hồ: tám chương, tám nhân vật liên quan, 15 sự kiện. Có hai hoàng đế và vai trò Thượng hoàng riêng của Quý Ly; phân biệt nhận ngôi cuối 1400 và niên hiệu Thiệu Thành từ 1401.
- Tám chương Hồ gồm chuyển triều/Đại Ngu; Tây Đô; tiền giấy và hạn điền; gia đình và hai vua; nhân lực–học tập–giới hạn thực thi; Champa/ngoại giao; chiến tranh 1406–1407; kết thúc vương triều và hậu vận.
- Thêm bốn hồ sơ có phần chi tiết: Hồ Hán Thương, Hồ Nguyên Trừng, Nguyễn Phi Khanh, Nguyễn Trãi thời Hồ. Quý Ly được nối thêm giai đoạn Thượng hoàng và hậu vận vào hồ sơ cũ. Phả hệ xác nhận Quý Ly là cha hai người con trai, Huy Ninh là mẹ Hán Thương; không suy bà là mẹ Nguyên Trừng. Liên kết Khâm Thánh–Thiếu Đế vẫn dùng bản ghi chung.
- Các cải cách được trình bày cùng giới hạn: tiền giấy và lòng tin, hạn điền và kiểm kê, hạn nô và thân phận lệ thuộc, kho thường bình không thực hiện được, quy chế thi 1404 bị chiến tranh cản trở. Không biến mục tiêu ban hành thành thành công đã chứng minh.
- Có năm sự kiện quân sự từ tiến công 1406 đến Đa Bang, Hàm Tử, rút về Thanh Hóa và bắt giữ 1407. Ghi khác biệt cách đặt mốc Đa Bang; không tự đổi ngày âm, không dựng trận vây Tây Đô có ngày chính xác hoặc giai thoại ải Nam Quan.
- Thêm bốn ảnh nhân vật và ba ảnh bài đọc: Cổng Nam, Hội Sao phục dựng, Nam Giao. Cả hai vua Hồ có hình (Quý Ly dùng ảnh cũ); tổng 39/47 hồ sơ, đủ 24/24 người giữ ngôi Lý–Trần–Hồ có hình. Tranh phục chế Nguyễn Trãi và bản vẽ tiền giấy không được gán thành tư liệu nguyên gốc đương thời.
- Bản đồ dùng lại Tây Đô, thêm Nam Giao theo tọa độ UNESCO 1358-003. Đa Bang, Hàm Tử, Kỳ La/Cao Vọng giữ tọa độ null. Thăng Long/Đông Đô dùng chung hồ sơ; các điểm ngoài khoảng liên hệ chỉ giữ khi bài đọc cần tham chiếu.
- Bộ Hồ nằm trong periods/ho, hồ sơ ở shared/ho-people.ts, catalog ảnh ở public/images/people/ho/provenance.json. Sự kiện nha-ho-1400 chuyển nơi khai báo nhưng giữ ID và phạm vi Trần/Hồ; các liên kết cũ hoạt động. Không thêm dữ kiện nhà Hồ vào component. Thông báo năm chạm ranh thời kỳ diễn đạt là mốc chuyển tiếp.
- Kho dữ liệu có 289 Claim, 481 Citation, 127 Source. Sổ nguồn, kiểm toán và độ phủ ảnh được xuất từ dữ liệu; README, DATA_MODEL và hồ sơ bản đồ đã cập nhật.

## Kiểm tra

- Build xuất tĩnh/TypeScript đạt; audit kiểm tra nguồn, ID, phạm vi thời kỳ và cấu hình minh họa đạt.
- 28 unit test đạt, gồm đủ hai vua Hồ, tách Thượng hoàng, một hồ sơ Quý Ly/một sự kiện chuyển triều, phả hệ mẹ–con đúng và liên kết địa điểm tồn tại khi tải lại. Bộ sơ đồ kiểm tra mọi hồ sơ ở ba loại/hai phạm vi; ảnh cục bộ có metadata và định dạng hợp lệ.
- Lượt Playwright đầy đủ: 69 ca đạt, một ca mở liên tiếp 33 trang Lý vượt giới hạn 30 giây, hai ca development bỏ qua đúng cấu hình. Đã tăng riêng ca duyệt hàng loạt lên 60 giây và chạy lại desktop/mobile:2/2 đạt; giữ nguyên mọi kiểm tra nội dung và ảnh. Tất cả 70 ca production đã đạt qua lượt đầy đủ và chạy lại.
- Kiểm tra lại nhãn bản đồ cuối: 2/2 ca desktop/mobile đạt; nhãn Tây Đô tránh biểu tượng kinh đô và tách khỏi Nam Giao trên mobile.
- Đã mở xem gallery ảnh Hồ, tổng quan, bản đồ và phả hệ Hán Thương. Ảnh QA tại docs/screenshots/ho-*; sơ đồ rộng giữ cỡ chữ và có cuộn/thu phóng.
- Giữ ngoài commit các chỉnh sửa riêng trong next-env.d.ts, mô tả trang ở src/app/layout.tsx, danh xưng Trần Thị Dung ở biographies.ts và riêng hunk câu chữ Hải Ấp trong shared/places.ts.

## Giới hạn và bước tiếp theo

- Đây là các bản biên soạn có nguồn, chưa có chuyên gia lịch sử duyệt. Chiều sâu chưa đều, nhất là đời sống dân thường. Không công bố đã hoàn tất mọi khía cạnh hoặc mọi triều đại.
- Năm mất Quý Ly/Hán Thương chưa xác định trong nguồn đang dẫn; không coi 1407 là năm mất. Một số nguồn là bản chuyển dạng hoặc bài đăng lại; thông tin tác giả/ấn bản chưa rõ được ghi đúng giới hạn. Nguồn ảnh có thể chưa xác định giấy phép, không tự gán giấy phép mở.
- Chưa có hình học lãnh thổ đủ căn cứ; không lấy biên giới hiện đại làm ranh giới lịch sử hoặc gộp các lần bắt giữ thành một tọa độ.
- Chưa triển khai database, CMS, đăng nhập, góp ý hay dashboard. Góp ý tương lai cần lưu riêng cùng nguồn, trạng thái xử lý, bản nháp và lịch sử biên tập trước xuất bản.
- Bước tiếp theo: rà bộ Hồ trên website với người dùng; sau đó mở thời kỳ tiếp theo bằng bộ nội dung riêng, giữ các ID dùng chung ổn định.

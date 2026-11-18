# Trạng thái triển khai Sử Đồ

Giai đoạn hiện tại: đã có bộ Ngô–Đinh–Tiền Lê, Lý, Trần và Hồ trên khung dữ liệu theo thời kỳ. Bản local xuất tĩnh; nhánh công việc hiện tại chưa push hoặc triển khai công khai. Database/CMS, góp ý và dashboard vẫn dành cho giai đoạn sau khi phần lớn các triều đại được biên soạn.

Quy trình Git: mỗi nhóm công việc mới dùng một nhánh tạo từ `master`, chỉnh sửa và commit trên nhánh đó. Người dùng tự tạo pull request trên GitHub; phản hồi sau commit cung cấp tiêu đề, tóm tắt và kiểm tra để dùng cho PR. Hướng dẫn được lưu tại `AGENTS.md`.

## Bộ Ngô–Đinh–Tiền Lê · 18/11/2026

- Nhánh `feat/ngo-dinh-tien-le-content` được tạo từ `master` sau khi fetch và fast-forward tới `a63baba`; dự án không có nhánh main. Giữ Period ID `the-ky-x`, khoảng biên tập hiển thị 939–1009, có bối cảnh Bạch Đằng 938.
- 11 chương, 25 nhân vật liên quan, 20 sự kiện và chín người giữ ngôi. Các chương đi từ Bạch Đằng–Cổ Loa, kế vị và phân tranh, Hoa Lư–Đại Cồ Việt, cột kinh–sứ bộ đến chuyển ngôi 980, chiến tranh 981–982, việc nước và chuyển triều 1009.
- Danh sách vua chia ba nhóm từ dữ liệu dynastyId. Giữ đồng trị Xương Ngập–Xương Văn; không coi Xương Xí hoặc Đinh Liễn là vua trực tiếp trị vì. Danh vị các vua thời Ngô đọc từ roleLabel, không gán thành hoàng đế.
- Dùng chung Lý Công Uẩn, sự kiện lên ngôi 1009 và Hoa Lư. Khuông Việt, Vạn Hạnh, Đào Cam Mộc liên quan cả bộ mới và bộ Lý. Tổng kho có 71 hồ sơ; bộ Lý hiện có 26 nhân vật liên quan.
- Phả hệ tách Dương hoàng hậu nhà Ngô khỏi Dương Vân Nga, quan hệ nhận nuôi khỏi huyết thống. Dương Vân Nga nối với Đinh Tiên Hoàng, Đinh Toàn và Lê Hoàn; không suy bà là mẹ Long Việt/Long Đĩnh hoặc con Dương Tam Kha. Có nhánh Liễn–Hạng Lang giải thích tranh ngôi và minh văn cột kinh.
- Đọc chính sử số hóa, Thế thứ, công trình Viện Sử học, nghiên cứu Phật giáo và hồ sơ di sản tại vị trí dẫn. Giữ các dị biệt 897/898 (Ngô Quyền), 991/1001 (Đinh Phế Đế), 1018/1025 (Vạn Hạnh) và cách đếm niên hiệu Tiền Lê; không tự đổi lịch hoặc lặp chuyện bệnh tật/sấm báo như sự thật đã xác minh.
- 16 ảnh hồ sơ và ba ảnh bài đọc, lưu cục bộ kèm catalog. Cả chín người giữ ngôi có hình: bảy tranh/tượng nhân vật, hai ảnh di tích cho Xương Văn và Trung Tông khi chưa tìm được chân dung đủ căn cứ. Tổng 55/71 hồ sơ có hình, 33/33 người giữ ngôi trong bốn bộ có hình.
- Cổ Loa dùng tọa độ hồ sơ UNESCO dự kiến 7056; Hoa Lư dùng lại điểm di tích đã có. Bạch Đằng 938/981/1288 là các hồ sơ không gian riêng, tọa độ null; không dựng đường hành quân hay ranh giới cho các chiến dịch. Nhãn Cổ Loa được tách khỏi biểu tượng trên mobile.
- Sơ đồ giới hạn chữ theo chiều rộng ô, giữ cỡ chữ và thông tin đầy đủ trong hồ sơ/chú thích, tránh dòng niên đại dài tràn sang các quan hệ.

## Điều chỉnh câu chữ và danh sách vua · 18/11/2026

- Viết đầy đủ “cuối thời Lý”, “cuối thời Trần”, “đầu thời Hồ” trong tiêu đề, mục lục, tổng quan, tiểu sử, chú thích và nhãn thời gian; chuyển triều ghi rõ “từ nhà … sang nhà …”. Quy ước được lưu trong HISTORICAL_EDITORIAL_POLICY.md để áp dụng khi mở rộng các thời kỳ sau. Giữ nguyên ID, đường dẫn và nhan đề gốc của nguồn.
- Bỏ cờ emphasis gắn riêng cho Dương Nhật Lễ, thuộc tính trong schema và CSS tương ứng. Các dòng vua cùng kiểu trình bày; Nhật Lễ vẫn nằm giữa Dụ Tông và Nghệ Tông. Nhãn lớp tham chiếu địa lý hiện đại dùng được cho mọi thời kỳ.
- Build/TypeScript, audit và 28 unit test đạt. 12 ca Playwright liên quan đạt trên desktop/mobile qua lượt chạy chính và chạy lại hai ca dùng nhãn bản đồ mới. Đã so sánh nền, viền và căn lề ba dòng Dụ Tông–Nhật Lễ–Nghệ Tông trên cả hai viewport; các giá trị giống nhau. Ảnh kiểm tra tại docs/screenshots/atlas-* và ruler-list-*.

## Kết quả hiện tại

- Nhà Lý: 10 chương, 26 nhân vật liên quan, 14 sự kiện, chín người giữ ngôi. Nhà Trần: giữ chín chương, 30 nhân vật liên quan, 18 sự kiện, 13 người giữ ngôi; hai hồ sơ mới và ba sự kiện cải cách giao thời được dùng chung với bộ Hồ.
- Nhà Hồ: tám chương, tám nhân vật liên quan, 15 sự kiện. Có hai hoàng đế và vai trò Thượng hoàng riêng của Quý Ly; phân biệt nhận ngôi cuối 1400 và niên hiệu Thiệu Thành từ 1401.
- Tám chương Hồ gồm chuyển triều/Đại Ngu; Tây Đô; tiền giấy và hạn điền; gia đình và hai vua; nhân lực–học tập–giới hạn thực thi; Champa/ngoại giao; chiến tranh 1406–1407; kết thúc vương triều và hậu vận.
- Thêm bốn hồ sơ có phần chi tiết: Hồ Hán Thương, Hồ Nguyên Trừng, Nguyễn Phi Khanh, Nguyễn Trãi thời Hồ. Quý Ly được nối thêm giai đoạn Thượng hoàng và hậu vận vào hồ sơ cũ. Phả hệ xác nhận Quý Ly là cha hai người con trai, Huy Ninh là mẹ Hán Thương; không suy bà là mẹ Nguyên Trừng. Liên kết Khâm Thánh–Thiếu Đế vẫn dùng bản ghi chung.
- Các cải cách được trình bày cùng giới hạn: tiền giấy và lòng tin, hạn điền và kiểm kê, hạn nô và thân phận lệ thuộc, kho thường bình không thực hiện được, quy chế thi 1404 bị chiến tranh cản trở. Không biến mục tiêu ban hành thành thành công đã chứng minh.
- Có năm sự kiện quân sự từ tiến công 1406 đến Đa Bang, Hàm Tử, rút về Thanh Hóa và bắt giữ 1407. Ghi khác biệt cách đặt mốc Đa Bang; không tự đổi ngày âm, không dựng trận vây Tây Đô có ngày chính xác hoặc giai thoại ải Nam Quan.
- Thêm bốn ảnh nhân vật và ba ảnh bài đọc: Cổng Nam, Hội Sao phục dựng, Nam Giao. Cả hai vua Hồ có hình (Quý Ly dùng ảnh cũ); tổng 39/47 hồ sơ, đủ 24/24 người giữ ngôi Lý–Trần–Hồ có hình. Tranh phục chế Nguyễn Trãi và bản vẽ tiền giấy không được gán thành tư liệu nguyên gốc đương thời.
- Bản đồ dùng lại Tây Đô, thêm Nam Giao theo tọa độ UNESCO 1358-003. Đa Bang, Hàm Tử, Kỳ La/Cao Vọng giữ tọa độ null. Thăng Long/Đông Đô dùng chung hồ sơ; các điểm ngoài khoảng liên hệ chỉ giữ khi bài đọc cần tham chiếu.
- Bộ Hồ nằm trong periods/ho, hồ sơ ở shared/ho-people.ts, catalog ảnh ở public/images/people/ho/provenance.json. Sự kiện nha-ho-1400 chuyển nơi khai báo nhưng giữ ID và phạm vi Trần/Hồ; các liên kết cũ hoạt động. Không thêm dữ kiện nhà Hồ vào component. Thông báo năm chạm ranh thời kỳ diễn đạt là mốc chuyển tiếp.
- Kho dữ liệu có 446 Claim, 737 Citation, 163 Source. Sổ nguồn, kiểm toán và độ phủ ảnh được xuất từ dữ liệu; README, DATA_MODEL và hồ sơ bản đồ đã cập nhật.

## Kiểm tra

- Build xuất tĩnh/TypeScript đạt; audit kiểm tra nguồn, ID, phạm vi thời kỳ và cấu hình minh họa đạt.
- 32 unit test đạt, gồm kiểm tra đồng trị, người không trực tiếp trị vì, hồ sơ/sự kiện giao thời duy nhất, phả hệ Dương hậu và ba bản ghi không gian Bạch Đằng. Bộ sơ đồ kiểm tra mọi hồ sơ ở ba loại/hai phạm vi; ảnh cục bộ có metadata và định dạng hợp lệ.
- Lượt Playwright đầy đủ: 77 ca đạt, hai ca development bỏ qua theo cấu hình, ba ca mới chưa đạt (hai bộ định vị nút chuyển triều và một nhãn Cổ Loa mobile). Sau khi sửa bộ định vị, vị trí nhãn và chữ tràn trong ô phả hệ, cả 26 ca liên quan đạt trên desktop/mobile, gồm toàn bộ bộ mới và các sơ đồ Trần–Lý–Hồ. Tất cả 80 ca production đã đạt qua lượt đầy đủ và lượt chạy lại; không bỏ kiểm tra nội dung hoặc hình ảnh để đạt kết quả.
- Đã mở xem gallery hình Ngô–Đinh–Tiền Lê, tổng quan, bản đồ và phả hệ. Ảnh QA mới lưu tại docs/screenshots/early-*; sơ đồ rộng giữ cỡ chữ và có cuộn/thu phóng. Tệp chuẩn bị ảnh và gallery tạm đã được dọn khỏi public.

## Giới hạn và bước tiếp theo

- Đây là các bản biên soạn có nguồn, chưa có chuyên gia lịch sử duyệt. Chiều sâu chưa đều, nhất là đời sống dân thường. Không công bố đã hoàn tất mọi khía cạnh hoặc mọi triều đại.
- Năm mất Quý Ly/Hán Thương chưa xác định trong nguồn đang dẫn; không coi 1407 là năm mất. Một số nguồn là bản chuyển dạng hoặc bài đăng lại; thông tin tác giả/ấn bản chưa rõ được ghi đúng giới hạn. Nguồn ảnh có thể chưa xác định giấy phép, không tự gán giấy phép mở.
- Chưa có hình học lãnh thổ đủ căn cứ; không lấy biên giới hiện đại làm ranh giới lịch sử hoặc gộp các lần bắt giữ thành một tọa độ.
- Chưa triển khai database, CMS, đăng nhập, góp ý hay dashboard. Góp ý tương lai cần lưu riêng cùng nguồn, trạng thái xử lý, bản nháp và lịch sử biên tập trước xuất bản.
- Bước tiếp theo: rà bộ Ngô–Đinh–Tiền Lê trên website với người dùng; sau đó mở thời kỳ tiếp theo bằng bộ nội dung riêng, giữ các ID dùng chung ổn định. Một số nhân vật ngoài nhóm vua chưa có hình đủ căn cứ nhận diện; không dùng ảnh của người khác để lấp chỗ trống.

# Nhà Hồ: nhân vật, kế vị và chiến tranh 1406–1407

Ngày đọc và tích hợp: **18/11/2026**. Phạm vi là các nhân vật gắn với triều Hồ và cuộc chiến kết thúc vương triều. Không mở rộng nội dung khởi nghĩa Lam Sơn, Hậu Trần hay Lê sơ từ những trang có chứa các phần đó.

Hai module dữ liệu:

- `src/data/shared/ho-people.ts`: 4 hồ sơ mới; phần bổ sung cho hồ sơ Hồ Quý Ly đã tồn tại.
- `src/data/periods/ho/people-war.ts`: 11 hồ sơ nguồn, 5 sự kiện chiến tranh, 3 khoảng giữ vai trò, 9 liên kết quan hệ.

Các khẳng định mới được giữ trạng thái `draft`. Các bản chuyển dạng của cùng Toàn thư không được xem là những nguồn độc lập. Phần phân tích tác phẩm văn học hoặc diễn giải về chiến lược được đánh dấu `interpretation` thay vì giả làm lời sử liệu.

## Nguồn đã thực đọc

| ID | Nguồn và vị trí đã đọc | Công dụng và giới hạn |
| --- | --- | --- |
| `ho-annals-viii` | [Đại Việt sử ký toàn thư, Bản kỷ VIII](https://thuvien.vietnamthuquan.eu/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-24), tờ24b;36b–40b;49a–54a | Phả hệ, kế vị, học sĩ, khoa thi, hộ tịch và chuẩn bị chiến tranh. Bản đánh máy có lỗi như ghi Tân Tỵ1401 thành1410; chưa xác định đủ ấn bản/dịch giả. Dẫn tờ để có thể truy nguyên. |
| `ho-annals-ix` | [Toàn thư, Bản kỷ IX](https://thuvien.vietnamthuquan.eu/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-25), phần đầu1407, tờ1a–4b | Hàm Tử, rút quân, nơi bắt các nhân vật. Chỉ dùng phần trước khởi binh Giản Định. Không lấy những con số quân, lời thoại hay nhận xét đạo lý làm sự kiện đã đối chiếu. |
| `the-thu` (đã có) | Nguyễn Khắc Thuần, [Thế thứ các triều vua Việt Nam](https://se.ctu.edu.vn/hoat-dong-su/tu-lieu-lich-su/677-the-thu-cac-trieu-vua-viet-nam.html), Chương6, phầnI.a–b | Xác nhận hai vua, nhường ngôi cuối1400 và Hán Thương chưa rõ năm mất. Không dùng nhận định ở mục Quý Ly để khẳng định ông chắc chắn chết ngay1407. |
| `ho-han-thuong-chronology` | [Hồ Hán Thương (1401–1407)](https://scov.gov.vn/dat-nuoc-con-nguoi/con-nguoi-viet-nam/ho-han-thuong-1401-1407-.html), Quê Hương/Ủy ban Nhà nước về người Việt Nam ở nước ngoài,3/4/2007 | Đã đọc phần Đa Bang, rút về Thanh Hóa, Kỳ La. Tiêu đề dùng1401 theo niên hiệu. Không lặp cách giải thích chỉ do lòng dân hoặc các số quân lớn chưa đối chiếu. |
| `ho-military-history` | [Lịch sử tư tưởng quân sự Việt Nam, tập1](https://tulieuvankien.dangcongsan.vn/van-kien-tu-lieu-ve-dang/book/sach-chinh-tri/lich-su-tu-tuong-quan-su-viet-nam-tap-1-tu-the-ky-iii-tr-cn-den-the-ky-xv-324), bản điện tử NXB Chính trị Quốc gia–Sự thật trên cổng Tư liệu–Văn kiện Đảng | Đã đọc các phần nhà Hồ: chuyển ngôi; quan hệ Minh; phòng thủ Đa Bang–Đông Đô; Hoàng Giang, Muộn Hải, Hàm Tử; rút về Tây Đô. Phân biệt đánh giá chiến lược với sự kiện. Metadata trang ghi2025, chưa đối chiếu trang tên bản in. |
| `ho-nguyen-trung-abstract` | Ngô Thị Xinh, [Cuộc đời của Hồ Nguyên Trừng](https://hnmu.edu.vn/upload/user/tin-bai/tap-chi/tckh-45_khxh_24022021-tt.pdf), Tạp chí Khoa học ĐH Thủ đô Hà Nội45/2020, **trang9 của bản tóm tắt** | PDF chỉ16trang gồm mục lục/tóm tắt. Đã đọc abstract, không gọi là đọc toàn bài53–60. Dùng tên tự, niên đại, chức vụ, việc bị đưa sang Minh. Không biến tiêu đề về súng thành khẳng định phát minh súng đầu tiên thế giới. |
| `ho-nguyen-trung-biography` | [Nhà kỹ nghệ, nhà văn Hồ Nguyên Trừng](https://daibieunhandan.vn/nha-ky-nghe-nha-van-ho-nguyen-trung-10014451.html), Báo Đại biểu Nhân dân,15/7/2007 | Đã đọc gia đình, chiến đấu, hỏa khí, Bộ Công, tác phẩm và lời tựa1438. Bài tôn vinh; không nhập lời coi ông là tổ mọi súng Trung Quốc. |
| `ho-nam-ong-research` | Nguyễn Hữu Sơn, [Mối quan hệ văn–sử nhìn từ Nam Ông mộng lục và Toàn thư](https://hannom.vass.gov.vn/nghien-cuu-van-ban/moi-quan-he-van-su-nhin-tu-tuong-quan-nam-ong-mong-luc-va-dai-viet-su-ky-toan-thu-tap-chi-han-nom-s-506447), Tạp chí Hán Nôm6(97)/2009,tr.3–9 | Toàn văn bài trên trang viện, mở đầu ghi1374–1446 và31thiên. Các nhận xét về cách kể/giá trị ký ức là phân tích văn học; nội dung tác phẩm không mặc nhiên là chính sử. |
| `ho-phi-khanh-research` | Vũ Văn Long, [Nhà nho Nguyễn Phi Khanh với khát vọng thực hiện lý tưởng hành đạo giúp đời](https://hnmu.edu.vn/upload/user/tin-bai/tap-chi/tckh-so-9-kh-xa-hoi-va-giao-duc-dh-thu-do-10-2016.pdf), số9/2016,tr.28–38 | Đã đọc tr.28–29 và34: tên cũ, khoa1374, gia đình, ra làm quan1401, khoa thi của Trãi và biến cố1407. Các suy luận từ thơ văn phải ghi là diễn giải. |
| `ho-phi-khanh-poetry` | Vũ Văn Long, [Thơ văn Nguyễn Phi Khanh — nỗi niềm trăn trở về bản thân, thời đại và cuộc sống của nhân dân](https://hnmu.edu.vn/upload/user/tin-bai/tap-chi/tckh-so-12-kh-xa-hoi-va-giao-duc-dh-thu-do-02-2017.pdf), số13/2017,tr.32–43 | Trang PDF và mục lục xác nhận số13 dù tên file ghi số12. Cùng tác giả bài2016, không tính thành hai khảo chứng độc lập về niên đại. |
| `ho-trai-museum` | [Nguyen Trai — a national hero, world cultural celebrity](https://baotanglichsu.vn/en/Articles/3183/68497/nguyen-trai-a-national-hero-world-cultural-celebrity-1380-1442.html), Bảo tàng Lịch sử Quốc gia,12/12/2017 | Chỉ dùng hai đoạn đầu về gia đình,1380–1442,thi1400,làm quan Hồ. Phần sau có lỗi mốc minh oan và giản lược biến cố sau1407; không dùng các đoạn đó. |
| `ho-trai-hannom` | Trịnh Khắc Mạnh, [Nguyễn Trãi với các thế hệ người Việt Nam](https://hannom.vass.gov.vn/web/tchn/data/0204v.htm), Tạp chí Hán Nôm4/2002 | Đã đọc đúng mục có tác giả trong trang gộp nhiều bài. Dùng thân thế, hiệu Ức Trai, đỗ1400 và chức Chính chưởng Ngự sử đài; không mở Lam Sơn hoặc nhập lời tiễn cha từ các bài khác trên trang. |

## Quyết định về niên đại và phả hệ

- **Hán Thương nhận ngôi cuối1400:** Toàn thư VIII38b đặt sự kiện trong tháng chạp năm Canh Thìn; Thế thứ Chương6I.b cũng ghi nhận ngôi tháng12/1400. Thiệu Thành bắt đầu1401 là niên hiệu, không phải một lần đăng cơ khác. Khoảng trị vì lưu1400–1407, nhãn “Cuối1400–1407”.
- **Quý Ly trực tiếp giữ ngôi1400, Thượng hoàng1400–1407:** hai vai trò lưu riêng. Không nhân đôi người trong registry. Cùng một khẳng định về chuyển ngôi được các bản ghi nhiệm kỳ tham chiếu.
- **Hán Thương chưa rõ năm sinh/mất:** bị bắt1407 không đồng nghĩa chết1407. Mục Hán Thương trong Thế thứ nói rõ chưa rõ năm mất. Không gán mốc mất tùy tiện từ tiêu đề bài phổ thông.
- **Nguyên Trừng1374–1446:** đã đọc ở tóm tắt Ngô Thị Xinh và bài Nguyễn Hữu Sơn. Bài báo Đại biểu Nhân dân để năm sinh chưa rõ, được ghi trong giới hạn nguồn.
- **Mẹ Hán Thương là Huy Ninh:** Toàn thư VIII38b. Cùng đoạn ghi Khâm Thánh và Hán Thương là con Huy Ninh với Quý Ly. Không suy ra Huy Ninh là mẹ Nguyên Trừng.
- **Phi Khanh:** hồ sơ chọn mức “thế kỷXIV–XV” cho niên đại sống vì chưa khảo chứng riêng đầy đủ các mốc thường dùng1355–1428. Mốc làm Hàn lâm học sĩ1401 đã đọc trực tiếp ở Toàn thư VIII40a–40b.
- **Trãi:** có hồ sơ chung mới gắn với thời Hồ, chưa thêm vai trò hoặc nội dung thời Lê. Trần Thị Thái và Nguyên Đán được nêu trong văn bản có dẫn nguồn; không tạo cạnh tới những nhân vật chưa có ID.

## Trình tự chiến tranh và độ chính xác

Năm1406 có hai lớp sự kiện cần phân biệt: việc nhà Minh đem Thiêm Bình về cùng quân đội, và cuộc tiến công lớn của Trương Phụ–Mộc Thạnh về cuối năm. Lý lẽ khôi phục Trần được ghi là cách phía Minh biện minh cho can thiệp; không dùng làm nguyên nhân khách quan trung lập.

Đa Bang trong Toàn thư nằm ở cuối năm Bính Tuất, các nghiên cứu hiện đại đặt vào tháng1/1407. Nguồn có khác nhau ở ngày thành thất thủ, nên sự kiện chỉ ghi **đầu1407**. Các bản ghi tiếp theo là phản công Hàm Tử; rút về Thanh Hóa và thất bại tại Lỗi Giang; rồi bị truy đuổi đến vùng Kỳ La–Cao Vọng.

Đối với Tây Đô, gói này không dựng một trận vây thành cụ thể khi những đoạn sử liệu đã đọc tập trung vào cuộc rút quân, Lỗi Giang và đường ven biển. Tây Đô dùng điểm di sản đã có để liên kết bối cảnh kinh đô; các nơi **Đa Bang, Hàm Tử, Kỳ La–Cao Vọng** chờ registry địa điểm của root, không tự thêm tọa độ hoặc tuyến hành quân.

Toàn thư IX3a–3b phân biệt nơi bắt Quý Ly, Nguyên Trừng và Hán Thương. Chỉ biểu diễn vùng liên quan, không gom họ thành một lần bắt ở một chấm bản đồ. Nguyễn Trãi trong danh sách nhân vật liên quan sự kiện là vì biến cố gia đình; văn bản không nói ông bị bắt ở Kỳ La.

## Những điều không nhập thành dữ kiện

- Không khẳng định Hồ Nguyên Trừng phát minh súng đầu tiên trên thế giới hoặc mọi kỹ thuật súng nhà Minh đều do ông tạo ra.
- Không biến giai thoại tiễn cha ở ải Nam Quan thành lời thoại xác thực. Các bản đời sau kể khác nhau, gói này không cần giai thoại ấy để trình bày quan hệ cha–con hoặc khoa bảng.
- Giữ ghi chép Toàn thư rằng Phi Khanh đã đầu hàng trước khi họ Hồ bị bắt, có dẫn đúng nguồn, đồng thời trình bày thông tin nghiên cứu về việc bị đưa sang Trung Quốc. Không thay bằng cảnh chiến đấu hoặc một cuộc bắt giữ tưởng tượng.
- Không quy thất bại chiến tranh chỉ cho một nhân tố “lòng dân”. Bộ sự kiện trình bày phòng tuyến, chủ động chiến trường, phản công, tổn thất và truy đuổi; các đánh giá chiến lược là diễn giải có nguồn.

## Kiểm tra module riêng

Đã kiểm tra kiểu riêng hai module: **0 lỗi**. Kiểm tra liên kết nội bộ tại thời điểm bàn giao: **41Claim,81Citation**, không trùng IDClaim, không thiếu IDClaim được tham chiếu, không thiếu Source mới hoặc Source `the-thu` đã tồn tại. Root chịu trách nhiệm kiểm tra registry tổng hợp, vị trí các địa điểm, đường dẫn hình ảnh và các luồng trình duyệt sau tích hợp.

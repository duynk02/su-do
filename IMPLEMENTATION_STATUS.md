# Trạng thái triển khai Sử Đồ

Giai đoạn hiện tại: đã bàn giao bản local chạy được. A/B có hồ sơ nguồn, schema và thiết kế; C có luồng hoàn chỉnh; D có bản đầu của chín chương, chưa hoàn tất biên tập chuyên sâu; E có khung thời kỳ đến 1900.

## Đã triển khai

- Next.js/TypeScript xuất tĩnh, atlas responsive, chọn thời kỳ/mốc/chương, bản đồ SVG tải chậm và danh sách thay thế.
- Nhân vật, quan hệ phân loại, chuỗi người giữ ngôi có Dương Nhật Lễ, tách Trần Thừa khỏi hoàng đế trị vì.
- 28 hồ sơ có đoạn giới thiệu; Nhân Tông, Nhật Lễ, Thiếu Đế, Thuận Tông, Nghệ Tông, Quý Ly và Quốc Tuấn có các phần nội dung chi tiết. Có nhánh bên ngoại Thiếu Đế, nhánh An Sinh–Bảo Thánh và Thuận Thiên; thêm các sự kiện 1237, 1398, 1399 mở được từ hồ sơ.
- Tìm kiếm có/không dấu và theo năm, liên kết trạng thái và Back/forward; chú thích nguồn mở tại chỗ, dữ kiện và diễn giải có phân loại.
- Dữ liệu địa lý, ảnh hiện vật, 23 hình tranh/tượng nhân vật và font lưu cục bộ. Cả 13 người giữ ngôi thời Trần có hình; danh mục Nhân vật có ảnh thu nhỏ. Kinh đô dùng biểu tượng cổng thành giữ cỡ khi zoom.
- 58 hồ sơ nguồn (gồm 23 mục nguồn ảnh), 82 khẳng định, 125 dẫn nguồn; nguồn ảnh chỉ dùng để nhận diện/minh họa, không thay nguồn sử liệu. Bản biên niên được đối chiếu với Thế thứ, hồ sơ di sản và phần Toàn thư đã tiếp cận. Không coi số lượng nguồn là thước đo chất lượng lịch sử.
- Danh mục nhân vật/sự kiện trống đúng thời kỳ chưa biên soạn; địa điểm giữ từ bài đọc khi lệch năm có ghi chú ngữ cảnh. Nút chọn nhân vật cập nhật năm giữ vai trò/sự kiện liên quan.
- Chọn một bài/nhân vật/sự kiện mới đưa vùng đọc về đầu; mở chú thích hoặc dịch/zoom bản đồ giữ điểm đọc. Không dùng cuộn bài để tự đổi năm/camera.
- Bộ tài liệu yêu cầu đã có; ảnh thực tế atlas desktop/mobile, bản đồ mobile, phả hệ, hiện vật và hộp nguồn trong `docs/screenshots/`.

## Kiểm tra đã thực hiện

Mở rộng bộ hình cho vua và nhân vật:
- Thêm 17 hình, nâng độ phủ từ 6 lên 23/28 hồ sơ. Bổ sung đủ Anh/Minh/Hiến/Dụ/Nghệ/Duệ/Phế/Thuận/Thiếu Đế và Dương Nhật Lễ; thêm Thừa, Thủ Độ, Thị Dung, Chiêu Hoàng, Liễu, Thuận Thiên, Bảo Thánh. Tranh/tượng được gắn nhãn; không tự thêm thông tin lịch sử từ bài nguồn ảnh.
- Danh mục Nhân vật có ảnh thu nhỏ và lưới theo chiều rộng cột, giữ điều hướng cũ. Ảnh hồ sơ giữ nguyên khung bên phải trên desktop, xếp xuống dưới trên mobile. Dòng ghi công rút gọn, không lặp giấy phép đã có liên kết riêng. Ảnh JPEG/PNG lưu cục bộ, danh sách `IMAGE_COVERAGE.md` xuất cùng sổ nguồn.
- Build/TypeScript, audit và 18 kiểm thử dữ liệu/bố cục đạt, gồm đủ ảnh cho 13 người giữ ngôi, tồn tại tệp và chữ ký định dạng, tham chiếu nguồn đúng. Đã mở xem bảng tổng hợp đủ 23 ảnh và hồ sơ đại diện. Không chọn hình cho Trần Lý, Trần Tự Khánh, Chế Mân, Huy Ninh, Khâm Thánh vì chưa có ứng viên phù hợp; giữ chữ, không gán hình của người khác.
- Lượt Playwright đầy đủ: 52 ca production đạt, 2 đối chứng development bỏ qua đúng cấu hình. Sau khi rút gọn ghi công, bản build cuối đạt và 8 ca liên quan chạy lại đạt: kiểm tra từng ảnh trong cả 23 hồ sơ, lưới danh mục, mở/trở lại hồ sơ trên desktop/mobile; không tràn ngang. Ảnh `all-portrait-images.png`, `portrait-directory-*`, `profile-image-*` và hồ sơ Nhật Lễ cập nhật.
- Không thay nội dung sử học; giữ `next-env.d.ts` có sẵn ngoài commit.

Ưu tiên hình nhân vật:
- Thay ảnh lăng của Trần Cảnh bằng tranh minh họa Thái Tông từ Phật giáo Việt Nam; thay ảnh lăng Thánh Tông bằng ảnh tượng thờ có chú thích rõ trên Hội Nhà văn Việt Nam. Đổi ảnh thành trong hồ sơ Quý Ly thành tranh của Hoàng Hoa Mai đăng trên Thế giới Di sản, đối chiếu tác giả với báo Nhân Dân. Hai hình Thái Tông/Thánh Tông thể hiện người và có nội dung khác nhau.
- Cập nhật thứ tự biên tập chân dung/tranh nhân vật → hình tượng/tượng thờ → di tích/hiện vật. Nguồn ảnh hỗ trợ đúng cơ quan đăng; có dòng ghi công riêng, không gán nguồn đăng thành họa sĩ. Giấy phép chưa rõ được lưu trong hồ sơ, giao diện chỉ hiện nguồn; không tự gán CC/Public Domain. Đã xác định video YouTube PyxTNdNqC30 trùng ví dụ người dùng, lưu làm tham khảo thị giác.
- Build/TypeScript và 18 kiểm thử dữ liệu/bố cục đạt; có kiểm tra hai vua không dùng ảnh lăng hoặc cùng nội dung ảnh. Nội dung sử học và 82 Claim/125 Citation không đổi. Giữ `next-env.d.ts` có sẵn ngoài phạm vi commit.
- Sáu kiểm thử trình duyệt liên quan đạt trên desktop/mobile: cả sáu ảnh tải đủ, nguồn/tác giả hiển thị, bố cục co giãn theo cột và mở được trang nguồn; phả hệ và điều hướng bản đồ trong luồng hồ sơ vẫn đạt. Đã mở xem ảnh chụp Thái Tông/Thánh Tông trên desktop và các hình gốc trước khi chọn; ảnh `profile-image-tran-canh-*`, `profile-image-tran-thanh-tong-*`, `profile-image-ho-quy-ly-*` cập nhật bản hiện tại.

Phả hệ có bối cảnh lịch sử và ảnh trong hồ sơ:
- Bổ sung Huy Ninh, Khâm Thánh, Trần Liễu, Thuận Thiên, Bảo Thánh và 19 liên kết gia đình/chính trị/kế vị có nguồn. Thiếu Đế có ba phần về phả hệ, nhiếp chính và mất ngôi; Quý Ly/Thuận Tông/Nghệ Tông/Quốc Tuấn/Thái Tông có thêm bối cảnh. Giữ đúng ông bà ngoại, hai cuộc hôn nhân Thuận Thiên và việc Thiếu Đế được tha chết khi phế ngôi; năm mất chưa biết.
- Sáu ảnh cho Cảnh, Thánh Tông, Nhân Tông, Quốc Tuấn, Huyền Trân, Quý Ly: 626KB tổng, tải cục bộ; xem được trang mô tả và giấy phép, có ghi công 13px. Ảnh nằm cạnh tên ở vùng rộng và dưới tên ở vùng hẹp; không có ảnh thì không tạo khung rỗng. Đã mở xem ảnh thực trên desktop/mobile. Thiếu Đế, Thủ Độ chưa có hình đủ nhận diện/quyền; không gắn hình tùy ý.
- Biểu tượng cổng thành và chú giải đồng bộ, kích thước không đổi khi zoom; chừa khoảng cho nhãn di sản gần kinh đô. Bộ xếp phả hệ giữ các cặp hôn nhân nối tiếp cạnh nhau khi có thể và tách nhãn chính trị theo nhánh đích.
- Build/TypeScript và audit đạt: 17 kiểm thử logic/dữ liệu đạt, gồm 28 hồ sơ ở từng chế độ/phạm vi, mẹ–con đúng, ảnh JPEG cục bộ và hồ sơ quyền đầy đủ. Tài liệu nguồn/kiểm chứng đã xuất lại; yêu cầu chủ động xem xét minh họa và nhánh gia đình quan trọng được ghi vào chính sách biên tập.
- Lượt Playwright cuối: 50 ca production đạt, 2 ca đối chứng development bỏ qua đúng cấu hình. Đã kiểm tra sáu ảnh tải đủ, tín dụng/giấy phép, bố cục theo chiều rộng cột, mở rộng phả hệ Thiếu Đế, tách nhiếp chính với huyết thống, icon giữ cỡ khi zoom, mở địa điểm bằng bàn phím và nhãn không chạm điều khiển ở 360/390/1024/1440/1920px. Ảnh `profile-image-*`, `family-thieu-de-*`, `capital-marker-*` và ảnh chuẩn có liên quan đã cập nhật.
- Giữ `next-env.d.ts` có sẵn ngoài phạm vi commit. Chưa có chuyên gia lịch sử duyệt hoặc kiểm tra thiết bị cảm ứng thật/Safari/Firefox.

Phả hệ phân tầng và tách loại quan hệ:
- Đã thay bố cục vòng tròn bằng Gia đình theo tầng cha mẹ–con, đặt người phối ngẫu cùng hàng; Kế vị và Chính trị có chế độ riêng. Đường con nối từ đúng người có nguồn, không suy cha mẹ từ đường hôn nhân. Danh sách nguồn đi theo loại đang xem.
- Mở rộng theo liên kết của chế độ đang chọn, giữ đủ các nhân vật/liên kết trong phạm vi và bỏ giới hạn cứng chín nút. Sơ đồ mặc định giữ tên 14px, cuộn ngang trong khung; có thu/phóng, về 100%, vừa khung cả hai chiều và mở hồ sơ từ ô bằng chuột/bàn phím.
- Build và TypeScript đạt. 14 kiểm thử logic/dữ liệu đạt, gồm tách loại quan hệ, giữ đúng cha mẹ, đủ nút, không va chạm nhãn/ô ở cả 23 hồ sơ và trường hợp 12 người. Lượt Playwright cuối: 42 ca production đạt, 2 ca đối chứng hydration development bỏ qua đúng cấu hình; bao gồm đổi chế độ, mở rộng, cỡ chữ thực, vừa khung và điều hướng từ sơ đồ trên desktop/mobile.
- Đã mở xem ảnh phả hệ Trần Cảnh và chuỗi kế vị riêng ở cỡ 100%, cùng sơ đồ Minh Tông mở rộng. Ảnh `family-tran-canh-expanded-*.png`, `succession-tran-canh-expanded-wide.png` và các ảnh quan hệ/hồ sơ được cập nhật. Giữ nguyên `next-env.d.ts` có sẵn ngoài commit.

Thứ bậc mốc thời gian:
- Các mốc con của Nhà Trần được thụt thêm một cấp, có trục nhánh riêng và đường nối ngang tới từng mốc; nhánh dừng tại mốc cuối. Mốc con đang chọn có nền nhấn, đường nhánh màu son và `aria-current`.
- Build/TypeScript đạt. Đã kiểm tra ở 1920×1080, 1440×960 và 1024×768: chữ mốc con vẫn tối thiểu 13px, thụt sâu hơn mốc cha ít nhất 22px, cả năm nút mở đúng sự kiện và không có cuộn ngang/lỗi runtime. Mobile 390×844 vẫn chọn thời kỳ bằng bộ chọn sẵn có.
- Đã mở xem ảnh sidebar ở 1440/1024px; ảnh trong `docs/screenshots/timeline-hierarchy-*.png`. Giữ nguyên thay đổi có sẵn trong `next-env.d.ts` ngoài commit.

Sao chép liên kết và thông báo:
- Thay biểu tượng chia sẻ bằng biểu tượng hai trang chồng nhau cho thao tác sao chép. Thông báo đặt cố định ở góc trên bên phải, chữ 14px, tự tắt sau 4 giây; bấm lại sẽ tính lại thời gian và vẫn có nút đóng ngay.
- Build/TypeScript đạt. Đã kiểm tra trình duyệt desktop 1440×960 và mobile 390×844: biểu tượng, URL gửi tới Clipboard API, vị trí thông báo, tự tắt, bấm lại, đóng thủ công và phản hồi khi clipboard bị từ chối đều đạt; không có lỗi runtime hoặc cuộn ngang.
- Clipboard API được giả lập trong bước kiểm tra để giữ nguyên clipboard của người dùng. Đã mở xem hai ảnh `docs/screenshots/copy-feedback-*.png`. Không chạy lại bộ dữ liệu/sơ đồ vì phần đó không thay đổi; `next-env.d.ts` có sẵn được giữ ngoài commit.

Sửa chồng nhãn quan hệ:
- Đã tách các quan hệ cùng cặp nhân vật sang các đường cong riêng, giữ loại nét và chiều mũi tên. Vị trí nhãn được kiểm tra với ô nhân vật và các nhãn đã đặt; đường dẫn mảnh nối nhãn phải dịch xa với cạnh tương ứng. Chữ được vẽ trên cùng để đường nối không che nội dung.
- 12/12 kiểm thử logic/dữ liệu đạt, gồm kiểm tra cặp cạnh ngược chiều và toàn bộ 23 hồ sơ ở cả chế độ gần/mở rộng. Build và TypeScript đạt.
- Playwright cuối: 40 ca production đạt, 2 ca đối chứng hydration development được bỏ qua đúng cấu hình. Tám ca mới đo hộp chữ thực sau khi tải font trên desktop/mobile cho Nhân Tông, Minh Tông, Trần Cảnh và Nhật Lễ ở cả hai chế độ sơ đồ; không có chữ chồng chữ hoặc ô nhân vật.
- Đã mở xem ảnh Nhân Tông và sơ đồ Minh Tông mở rộng; ảnh hồi quy `docs/screenshots/relations-*.png` cùng ảnh phả hệ và hồ sơ mobile được cập nhật. Giữ nguyên thay đổi có sẵn trong `next-env.d.ts` ngoài commit.

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

# Trạng thái triển khai Sử Đồ

Giai đoạn hiện tại: nội dung nhà Trần tạm chốt; đã mở rộng sang nhà Lý trên khung dữ liệu dùng chung. Bản local xuất tĩnh, chưa push hoặc triển khai công khai. Database/CMS, góp ý và dashboard dành cho giai đoạn sau khi phần lớn triều đại đã được biên soạn.

## Kết quả

- Mỗi bộ `PeriodContent` gồm metadata tổng quan, chương, sự kiện và nhiệm kỳ; đăng ký tại `src/data/periods/index.ts`. `history.ts` chỉ tổng hợp dữ liệu, các hồ sơ chuẩn nằm trong `shared/`. Cấu hình minh họa chỉ định ID và nhãn; component không chứa dữ kiện riêng của một triều đại.
- Chương có `periodId`, nhân vật/sự kiện có `periodIds`, nhiệm kỳ có thời kỳ/triều đại/chính thể. Bộ chọn, mục lục, bộ đếm chương, mốc con và điều hướng đọc từ dữ liệu. Hồ sơ/sự kiện giao thời dùng một ID, giữ thời kỳ đang đọc khi phù hợp. URL sai phạm vi được sửa về nội dung hợp lệ; URL thiếu năm lấy ngữ cảnh chương/nhân vật/sự kiện.
- Nhà Lý có 10 chương, 23 nhân vật liên quan, 14 sự kiện (13 mới và sự kiện chuyển Lý–Trần dùng chung), đủ chín người giữ ngôi. Thêm 15 hồ sơ có các phần tiểu sử; bổ sung Chiêu Hoàng trong hồ sơ cũ. Có các nhánh gia đình và liên kết phụ chính; Sùng Hiền hầu là cha đẻ Thần Tông, Nhân Tông là người bác nhận nuôi. Tôn vị Thượng hoàng của Sùng Hiền hầu không xếp vào hoàng đế trị vì.
- Nội dung gồm lập triều, dời đô, Hình thư, quốc hiệu, chiến dịch 1069, kháng Tống, Văn Miếu/khoa thi/Quốc Tử Giám, phụ chính, kế vị, Vân Đồn, biến loạn 1209 và chuyển triều. Giữ khác biệt đăng cơ/niên hiệu; không tự chuyển ngày âm hay coi giai thoại là dữ kiện.
- Nhà Trần giữ chín chương và liên kết cũ; trang mặc định vẫn mở bộ Trần. Nhân vật giao thời bổ sung liên kết nhà Lý trong cùng hồ sơ, không tạo bản sao. Các thời kỳ chưa có nội dung giữ danh mục trống của chính mình.
- Thêm 12 ảnh nhân vật Lý và hai ảnh di tích, lưu cục bộ; 35/43 hồ sơ có hình, đủ 22/22 người giữ ngôi Lý–Trần. Có nhãn tranh, tượng, tái dựng và nguồn ảnh; không coi là chứng cứ diện mạo đương thời. Chiêu Hoàng dùng hình đã có.
- Bản đồ Lý dùng điểm Hoa Lư, Văn Miếu, Đền Đô và điểm UNESCO Thăng Long dùng chung. Như Nguyệt/Vân Đồn giữ tọa độ null. Nhãn Văn Miếu đã tránh điều khiển; biểu tượng kinh đô vẫn đọc được khi zoom.
- Sơ đồ tự cấp làn cho các nhãn hội tụ và nới khoảng cách tầng/khung theo nhãn dài; niên đại chưa rõ được rút gọn trong ô, giữ đầy đủ ở hồ sơ; không bỏ người hoặc quan hệ, không gắn riêng ID Lý/Trần.
- Kho hiện có 209 Claim, 339 Citation, 103 Source. Sổ nguồn/kiểm toán/độ phủ ảnh xuất từ dữ liệu. `DATA_MODEL.md` mô tả cách thêm bộ mới và lộ trình adapter database/CMS; README và hồ sơ bản đồ đã cập nhật.

## Kiểm tra

- Build xuất tĩnh và TypeScript đạt; audit tham chiếu, nguồn, dữ liệu thời kỳ và cấu hình minh họa đạt.
- 24 unit test đạt: dữ liệu, thời gian, URL, phạm vi thời kỳ, hồ sơ dùng chung, đủ vua Lý, quan hệ nhận nuôi, ảnh cục bộ và bố cục mọi hồ sơ ở ba loại/hai phạm vi. Có regression nhiều nhãn dài cùng đích.
- Lượt Playwright đầy đủ đạt 60 ca production; hai ca đối chứng development được bỏ qua đúng cấu hình. Bao gồm luồng Trần cũ và mở toàn bộ chương/hồ sơ Lý, tải hình, nguồn, danh mục, điều hướng, cỡ chữ và lịch sử trình duyệt.
- Lượt bổ sung nhãn bản đồ/quan hệ Lý đạt sáu ca desktop/mobile. Sau khi sửa năm ngữ cảnh cho URL không có năm, trọn bộ Lý chạy lại đạt 10 ca desktop/mobile.
- Sau khi rút gọn niên đại dài trong ô nhân vật, 12 ca quan hệ Lý–Trần chạy lại đạt; có đo hộp chữ thật để bảo đảm không chồng nhãn và không tràn ô.
- Đã mở xem gallery ảnh Lý, tổng quan, bản đồ và hồ sơ Thần Tông thực tế. Ảnh QA tại `docs/screenshots/ly-*` và ảnh hồi quy có liên quan.
- Thay đổi có sẵn ở `next-env.d.ts` được giữ ngoài phạm vi commit.

## Giới hạn và bước sau

- Chưa có biên tập viên chuyên môn duyệt. Các bộ Lý/Trần là bản biên soạn có nguồn, chiều sâu chưa đều, nhất là đời sống dân thường và kinh tế–xã hội; không công bố đã hoàn tất mọi khía cạnh.
- Chưa có hình học lãnh thổ đủ căn cứ; không dùng ranh hiện đại thay ranh lịch sử. Một số ảnh chỉ có thông tin nguồn, chưa xác định tác giả/giấy phép; hồ sơ ghi đúng giới hạn.
- Chưa triển khai database, CMS, đăng nhập, góp ý hay dashboard. Góp ý tương lai lưu riêng, có nguồn đính kèm, trạng thái xử lý, bản nháp và lịch sử biên tập trước xuất bản; không sửa trực tiếp nội dung đã công bố.
- Bước tiếp theo: rà biên tập bộ Lý với người dùng, sau đó tiếp tục triều đại được chọn bằng bộ nội dung riêng trên cùng schema; giữ ID ổn định để chuyển kho lưu trữ sau này.

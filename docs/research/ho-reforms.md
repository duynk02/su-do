# Nhà Hồ: cải cách, chính sách và việc thực hiện

Nguồn được đọc trực tiếp ngày 17–18/11/2026; dữ liệu ghi ngày truy cập 2026-11-18. Tệp dữ liệu: `src/data/periods/ho/reforms.ts`. Nội dung là bản biên soạn có dẫn nguồn, chưa được biên tập viên chuyên môn duyệt.

## Phạm vi bàn giao

Chín sự kiện: tiền giấy1396, hạn điền1397, Tây Đô1397, khoa thi1400, hạn nô1401, hộ tịch1401, Champa1402, Quảng tế1403, quy chế thi1404. Ba sự kiện1396–1397 thuộc cả `tran` và `ho` vì chính sách bắt đầu trước cuộc chuyển triều. Không tạo thêm bản ghi trùng với `nha-ho-1400`.

Các phần bổ sung có thể dùng trong chương: quốc hiệu Đại Ngu, quan chế và hình luật1401, kho thường bình, thuế1402, đo lường1403, dịch sách chữ Nôm và chiếu học quan1397. `hoReformClaimIds` xuất riêng từng đoạn để component chỉ hiển thị dữ liệu.

## Nguồn đã đọc và nơi lưu

| Source ID | Nguồn | Phần sử dụng |
| --- | --- | --- |
| `ho-unesco-citadel` | [UNESCO: Citadel of the Ho Dynasty](https://whc.unesco.org/en/list/1358/) | Description; Brief synthesis; Integrity; mốc khởi dựng1397, cảnh quan và ba thành phần di sản |
| `ho-reform-overview` | [Bảo tàng Lịch sử Quốc gia: Những cải cách…](https://baotanglichsu.vn/vi/Articles/3098/14720/nhung-cai-cach-cua-ho-quy-ly-cuoi-the-ky-xiv-djau-the-ky-xv.html) — Lê Khiêm,2013 | Các mục tiền giấy, hạn điền, hạn nô, khoa cử |
| `ho-socio-economic-study` | [Trần Thuận: Vài nét về chính sách cải cách kinh tế–xã hội của Hồ Quý Ly](https://ssh.vnuhcmjournal.com.vn/index.php/ssh/article/download/614/996/1804),2020, tr.574–584 | Tr.577–579 về chính sách; tr.580–582 về hiệu quả, giới hạn và các cách đánh giá |
| `ho-reform-monograph` | [Phan Đăng Thanh–Trương Thị Hòa: Cải cách Hồ Quý Ly](https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/2/838/UserFiles/Cai-cach-Ho-Quy-Li-e85a5e1c-47f7-469e-9c5e-486964e484af.pdf) — bản chuyển dạng | PDF57–59 bộ máy/khoa thi;75 hộ tịch;107–112 xã hội/y tế;117–118 giới hạn |
| `ho-education-heritage` | [Ban Quản lý Thành Nhà Hồ: cải cách văn hóa, giáo dục](https://thanhnhaho.vn/NewsDetail.aspx?Id=7658) | Vô dật, Thi nghĩa, chữ Nôm; chiếu học quan1397; thể thức thi1404 |
| `ho-reforms` — có sẵn | [Dương Tuấn: Hồ Quý Ly và những cải cách lớn về kinh tế](https://baotanglichsu.vn/VI/Articles/3098/13166/ho-quy-ly-va-nhung-cai-cach-lon-ve-kinh-te.html),2012 | Tiền giấy1396; hạn điền1397; đo đạc và lập sổ từ1398 |
| `ho-chronology` — có sẵn | [Ủy ban Nhà nước về người Việt Nam ở nước ngoài: Nhà Hồ](https://scov.gov.vn/dat-nuoc-con-nguoi/tom-tat-bien-nien-su-vn/xv.-nha-ho-1400-1407-quoc-hieu-dai-ngu-kinh-do-tay-do-thanh-hoa-.html) | Quốc hiệu, kinh đô, khung niên đại |
| `toan-thu-family` — có sẵn | [Đại Việt sử ký toàn thư, bản chuyển dạng](https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/1/1213/UserFiles/Dai-Viet-Su-Ky-Toan-Thu---nhieu-tac-gia-53877159-cc78-40e2-8157-c64e7f4e90a7.pdf) | Bản kỷ VIII:26a–26b,28b–31b,36b–46a; cần mở rộng readLocation ở registry nguồn |

Trang giới thiệu bài Trần Thuận chỉ có abstract; toàn văn đã đọc qua link PDF có hậu tố `/1804`. DOI10.32508/stdjssh.v4i4.614. Không dùng một abstract chung để chứng minh từng chính sách.

## Các phân biệt ảnh hưởng trực tiếp tới nội dung

- **Ban hành khác với thực thi.** Toàn thư VIII40a ghi đặt kho thường bình1401 nhưng việc không làm được do thay đổi quan lại địa phương. Không mô tả kho như một hệ thống đã hoạt động thành công chỉ dựa vào mục tiêu dự trữ.
- **Quy chế thi khác với mọi kỳ thi đã tổ chức.** VIII45b–46a ghi quy định năm1404 và việc mới thi tại bộ Lễ thì gặp chiến tranh, phải dừng. Không nói mọi vòng có toán đã hoàn tất.
- **Mở trường1397 có lời bình riêng.** VIII30a–30b lưu chiếu học quan/học điền rồi lời Ngô Sĩ Liên rằng không thấy thi hành. Giữ lời nhận xét là đánh giá của sử gia, không nhập nó vào nội dung chiếu hoặc biến thành kết luận thống kê về toàn bộ trường lớp.
- **Hạn nô không xóa nô tì.** Việc gia nô chuyển thành quan nô đổi chủ thể kiểm soát, chưa làm họ thành dân tự do. Diễn giải về mục tiêu và hiệu quả được lưu với `kind: interpretation`.
- **Hạn điền không đồng nghĩa chia ruộng cho dân nghèo.** Chuyển ruộng vượt hạn thành quan điền là một kết quả pháp lý khác với phân phối ruộng và cải thiện đời sống.
- **Hộ tịch không chứng minh dân số tăng vọt.** Số dân đinh được ghi nhận nhiều hơn sau kiểm kê phản ánh khả năng quản lý và huy động; không coi là tăng dân số tự nhiên trong một năm.
- **Thành không hoàn tất mọi phần trong ba tháng.** Toàn thư ghi công việc năm1397 và các đợt xây sửa sau đó. UNESCO ghi khởi dựng1397, vai trò kinh đô1398–1407, trong khi sử Việt ghi chuyển đô cuối1397; hai cách định mốc được lưu trong giới hạn nguồn.
- **Quảng tế không đồng nhất với bệnh viện/Bộ Y tế hiện đại.** VIII44b ghi việc đặt quan và bổ Nguyễn Đại Năng; chưa có số liệu đủ để dựng mạng lưới hoặc tỷ lệ dân được chữa bệnh.
- **Chữ Nôm không thay thế chữ Hán trong khoa cử.** Hoạt động dịch sách và viết sách quốc âm được ghi riêng với quy chế thi.
- **Champa không chỉ là chuyển tên địa danh.** VIII40b–41a và42b–43a được dùng cho chuyển giao, quản lý và di cư. Không có geometry, không vẽ đường biên bốn châu từ các tên gọi.

## Độc lập nguồn và các chi tiết không sử dụng

Mỗi claim mới giữ trạng thái `draft`. Hai bản chuyển dạng của Toàn thư không phải hai nguồn độc lập; bài Ban Quản lý Thành Nhà Hồ dẫn sách Phan Đăng Thanh–Trương Thị Hòa, nên cũng không được đếm thành hai nghiên cứu độc lập. Nghiên cứu hiện đại có thể diễn giải khác nhau dù cùng dựa một ghi chép cổ.

Không sử dụng tỷ lệ đổi tiền vì các bản phổ thông ghi không thống nhất. Không lấy những lời phán xét vua tốt/xấu, tiến bộ tuyệt đối hoặc mất lòng dân làm một nguyên nhân duy nhất của thành bại. Không dùng năm mất1407 cho Hồ Quý Ly từ các bài giới thiệu. Bài tổng hợp2013 có lỗi tiểu sử về vua Dụ Tông năm1371 và năm Nghệ Tông mất; chỉ dùng những mục chính sách đã đối chiếu.

Trong bản Toàn thư chuyển dạng, dòng đầu năm Tân Tỵ bị gõ thành `[1410]` trong khi niên hiệu Thiệu Thành1 và bối cảnh là1401. Dùng1401 sau đối chiếu; lưu tờ gốc và niên hiệu thay vì sao chép lỗi số.

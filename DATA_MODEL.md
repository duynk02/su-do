# Mô hình dữ liệu

Các interface TypeScript tại `src/data/schema.ts`. Nội dung và liên kết tại `history.ts`, tiểu sử tại `biographies.ts`, nguồn tại `sources.ts`; component không là nơi lưu các đoạn biên khảo.

| Thực thể | Vai trò |
|---|---|
| Period | Khung thời kỳ biên tập; có thể gồm nhiều chính quyền và thời gian chồng lấn |
| Polity | Chính quyền/thực thể chính trị, độc lập với tên triều |
| Dynasty | Triều đại, trỏ Polity; phiên bản này dùng Đại Việt cho phạm vi cuối Lý đang biên soạn, không khẳng định quốc hiệu này áp dụng cho toàn bộ đầu triều Lý |
| Person | ID duy nhất; tên húy, miếu hiệu, niên hiệu, niên đại sống, tên thường gọi, đoạn giới thiệu và các phần tiểu sử trỏ Claim |
| RoleTenure | Giữ một chức vị trong một khoảng thời gian; vua và thượng hoàng có thể chồng lấn |
| Relationship | Cạnh có hướng với loại cha/mẹ–con, hôn nhân, anh/em, kế vị hoặc chính trị; không suy ra các cạnh khác |
| Event | Bối cảnh, diễn biến, kết quả trỏ Claim; hệ quả gợi mở là câu hỏi biên tập riêng |
| Place | Tên theo thời gian, kiểu vị trí, tọa độ hoặc null, nguồn tọa độ, giới hạn và phạm vi liên hệ |
| TerritorySnapshot | Mốc riêng của hình học chính trị; hiện chỉ có bản ghi thiếu dữ liệu, geometry null |
| StoryChapter | Câu hỏi, trình tự, loại trực quan, và liên kết Claim/Person/Event/Place |
| Claim | Khẳng định nguyên tử có loại bằng chứng, trạng thái và cờ xuất bản |
| Source | URL thật, tác giả/năm/ấn bản nullable, cơ quan, loại, nguồn gốc đăng lại, ngày truy cập, giới hạn |
| Citation | Claim ID + Source ID + vị trí tra cứu thật + phần được hỗ trợ |
| MediaAsset | Đường dẫn, tác giả, niên đại, loại tư liệu và giấy phép |
| ReviewRecord | Hành động đối chiếu/đọc nguồn và người/công cụ thực hiện; chưa có duyệt chuyên gia |

## Quy ước thời gian

- Dùng số năm thiên văn nội bộ: `0 = 1 TCN`, `-1 = 2 TCN`; UI luôn qua `formatYear`, không hiển thị năm 0.
- Khoảng `[start,end)`, điểm đơn `start === end`. Độ chính xác năm không dùng để khẳng định đúng ngày chuyển vai trò.
- `original` lưu cách ghi trong nguồn, `calendar` lưu hệ lịch hoặc tình trạng chưa biết, `precision` phân biệt ngày/tháng/năm/khoảng.
- Chỉ có `normalized` khi có `conversion.method` và `conversion.sourceId`. Không dùng JavaScript Date để đổi niên đại cổ.
- Các Period có thể giao nhau: cuối Lý–đầu Trần, Tây Sơn–cuối Lê. Không suy sự kế vị duy nhất từ thứ tự mảng.
- Ranh 1901 nội bộ dùng cho phạm vi đọc bao gồm năm 1900, không phải năm kết thúc nhà Nguyễn. Mốc cổ đại là khung biên tập, không phải ngày lập quốc.

## Tiểu sử nhân vật

`biographies.ts` lưu đoạn giới thiệu và các phần tiểu sử cùng vị trí nguồn của từng đoạn. `history.ts` chuyển chúng thành Claim/Citation, gắn `summaryClaimIds` và `biographySections` vào Person. Mỗi mục sự kiện vẫn dùng Event ID; mở từ hồ sơ sẽ cập nhật năm, URL và bài đọc theo cùng luồng điều hướng. Audit kiểm tra cả Claim trong các phần tiểu sử.

`life` là cách ghi có nguồn, có thể gồm phần chưa biết như “Chưa rõ năm sinh – 1370”. Không lấy năm bắt đầu hoặc kết thúc trị vì thay cho năm sinh/mất. Vai trò Thượng hoàng của Nhân Tông 1293–1308 ghi thời gian mang tôn hiệu; mốc xuất gia Yên Tử 1299 là sự kiện riêng. Dị biệt của Thế thứ về giai đoạn 1293–1299 được lưu tại Claim vai trò.

## Trình bày quan hệ

Gia đình dùng cạnh `parent` để phân tầng, `marriage`/`sibling` để bố trí cùng hàng. Chỉ hiển thị các cạnh đã có, không tạo liên kết cha mẹ từ một hôn nhân. Các cạnh `succession` và `political` có chế độ xem riêng. Khi mở rộng, lấy các nhân vật trong hai bước liên kết của loại đang chọn và giữ các cạnh đã biết giữa họ; không cắt danh sách ở chín nút. Bố cục là thông tin trình bày, không thêm khẳng định lịch sử mới vào dữ liệu.

## Thêm thời kỳ mà không sửa logic cốt lõi

1. Thêm Source đã đọc, Claim và Citation vào dữ liệu; chưa đủ nguồn thì giữ chưa xuất bản.
2. Thêm Polity/Dynasty phù hợp, không đồng nhất chúng với Period. Thêm Period với ID mới; bộ chọn thời kỳ đọc trực tiếp từ mảng.
3. Thêm Person/RoleTenure/Relationship/Event/Place bằng ID duy nhất. Dữ liệu không đủ tọa độ dùng null.
4. Đối với bài đọc tổng quan, Period.claimIds đủ để giao diện hoạt động mà không sửa component. Khung câu chuyện chín chương hiện dành riêng cho Trần; mở nhiều bộ chương cần bổ sung `periodId` trên StoryChapter và bỏ các chỗ kiểm tra `period === tran`.
5. Nếu có hình học: mở rộng schema đang giới hạn geometry null, bổ sung nguồn không gian, giấy phép, phương pháp, độ chính xác, mốc hiệu lực và review trước khi render.
6. Chạy typecheck, audit, unit test và các kiểm thử trình duyệt liên quan. Test không thay việc đọc nguồn của người biên tập.

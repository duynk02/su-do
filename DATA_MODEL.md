# Mô hình dữ liệu

Các interface TypeScript tại `src/data/schema.ts`. Nội dung và liên kết tại `history.ts`, tiểu sử tại `biographies.ts`, nguồn tại `sources.ts`; component không là nơi lưu các đoạn biên khảo.

| Thực thể | Vai trò |
|---|---|
| Period | Khung thời kỳ biên tập; có thể gồm nhiều chính quyền và thời gian chồng lấn |
| Polity | Chính quyền/thực thể chính trị, độc lập với tên triều |
| Dynasty | Triều đại, trỏ Polity; phiên bản này dùng Đại Việt cho phạm vi cuối Lý đang biên soạn, không khẳng định quốc hiệu này áp dụng cho toàn bộ đầu triều Lý |
| Person | ID duy nhất; tên húy, miếu hiệu, niên hiệu, niên đại sống, tên thường gọi, đoạn giới thiệu và các phần tiểu sử trỏ Claim; ảnh trỏ MediaAsset |
| RoleTenure | Giữ một chức vị trong một khoảng thời gian; vua và thượng hoàng có thể chồng lấn |
| Relationship | Cạnh có hướng với loại cha/mẹ–con, hôn nhân, anh/em, kế vị hoặc chính trị; không suy ra các cạnh khác |
| Event | Bối cảnh, diễn biến, kết quả trỏ Claim; hệ quả gợi mở là câu hỏi biên tập riêng |
| Place | Tên theo thời gian, kiểu vị trí, tọa độ hoặc null, nguồn tọa độ, giới hạn và phạm vi liên hệ |
| TerritorySnapshot | Mốc riêng của hình học chính trị; hiện chỉ có bản ghi thiếu dữ liệu, geometry null |
| StoryChapter | Câu hỏi, trình tự, loại trực quan, và liên kết Claim/Person/Event/Place |
| Claim | Khẳng định nguyên tử có loại bằng chứng, trạng thái và cờ xuất bản |
| Source | URL thật, tác giả/năm/ấn bản nullable, cơ quan, loại, nguồn gốc đăng lại, ngày truy cập, giới hạn |
| Citation | Claim ID + Source ID + vị trí tra cứu thật + phần được hỗ trợ |
| MediaAsset | Đường dẫn, tác giả, niên đại, loại tư liệu, giấy phép/liên kết, alt và kích thước; ảnh có thể gắn các Person ID |
| ReviewRecord | Hành động đối chiếu/đọc nguồn và người/công cụ thực hiện; chưa có duyệt chuyên gia |

## Quy ước thời gian

- Dùng số năm thiên văn nội bộ: `0 = 1 TCN`, `-1 = 2 TCN`; UI luôn qua `formatYear`, không hiển thị năm 0.
- Khoảng `[start,end)`, điểm đơn `start === end`. Độ chính xác năm không dùng để khẳng định đúng ngày chuyển vai trò.
- `original` lưu cách ghi trong nguồn, `calendar` lưu hệ lịch hoặc tình trạng chưa biết, `precision` phân biệt ngày/tháng/năm/khoảng.
- Chỉ có `normalized` khi có `conversion.method` và `conversion.sourceId`. Không dùng JavaScript Date để đổi niên đại cổ.
- Các Period có thể giao nhau: cuối Lý–đầu Trần, Tây Sơn–cuối Lê. Không suy sự kế vị duy nhất từ thứ tự mảng.
- Ranh 1901 nội bộ dùng cho phạm vi đọc bao gồm năm 1900, không phải năm kết thúc nhà Nguyễn. Mốc cổ đại là khung biên tập, không phải ngày lập quốc.

## Tiểu sử nhân vật

Hồ sơ chuẩn nằm trong `shared/people.ts` và các module nhân vật được tổng hợp tại đó; mỗi Person ID xuất hiện đúng một lần. `periodIds` liên kết một người với nhiều thời kỳ. `biographies.ts` giữ các đoạn nhà Trần hiện có; `claim-store.ts` chuyển đoạn có nguồn thành Claim/Citation. Mỗi mục sự kiện vẫn dùng Event ID; audit kiểm tra cả Claim trong các phần tiểu sử.

`life` là cách ghi có nguồn, có thể gồm phần chưa biết như “Chưa rõ năm sinh – 1370”. Không lấy năm bắt đầu hoặc kết thúc trị vì thay cho năm sinh/mất. Vai trò Thượng hoàng của Nhân Tông 1293–1308 ghi thời gian mang tôn hiệu; mốc xuất gia Yên Tử 1299 là sự kiện riêng. Dị biệt của Thế thứ về giai đoạn 1293–1299 được lưu tại Claim vai trò.

`contextYear` là năm ngữ cảnh đã có trong tiểu sử, dùng khi mở hồ sơ người không có nhiệm kỳ: ví dụ Huy Ninh 1371, Khâm Thánh 1389, Bảo Thánh 1274. Không phải năm sinh. Các nhân vật và liên kết gia đình bổ sung ở `families.ts`; nội dung vẫn ở `biographies.ts` với Claim/Citation.

Ảnh nhân vật đăng ký từ `public/images/people/provenance.json` qua `person-media.ts`, tạo đồng thời MediaAsset và Source. `Person.mediaAssetId` chọn hình đại diện cho phần đầu hồ sơ; `kind` phân biệt ảnh tượng, ảnh di tích, tranh, hiện vật và tái dựng. Nguồn có thể là Commons, trang cơ quan hoặc báo chí; `publisher`/`sourceId`/`readLocation` trong catalog ghi đúng nơi đăng. `credit` là dòng ghi công ngắn để không gán cơ quan đăng thành họa sĩ. Audit kiểm tra ảnh trỏ đúng nguồn/người, có hồ sơ quyền, alt và kích thước; `licenseUrl` có thể trống khi chưa rõ giấy phép, không gán giấy phép mở. Ảnh không dùng thay bằng chứng cho nhận định lịch sử.

Catalog nhà Lý bổ sung tại `public/images/people/ly/provenance.json`, gồm `assets` cho hồ sơ và `illustrations` cho bài đọc. Hai catalog được tổng hợp cùng lớp; không cần thêm nhánh nhân vật trong component để hiện hình. Chiêu Hoàng vẫn dùng asset cũ và cùng Person ID. `shared/ly-early-people.ts`/`ly-late-people.ts` lưu tiểu sử mới; các cập nhật hồ sơ giao thời được hợp nhất vào bản ghi chuẩn thay vì nhân bản.

## Trình bày quan hệ

Gia đình dùng cạnh `parent` để phân tầng, `marriage`/`sibling` để bố trí cùng hàng. Chỉ hiển thị các cạnh đã có, không tạo liên kết cha mẹ từ một hôn nhân. Các cạnh `succession` và `political` có chế độ xem riêng. Khi mở rộng, lấy các nhân vật trong hai bước liên kết của loại đang chọn và giữ các cạnh đã biết giữa họ; không cắt danh sách ở chín nút. Bố cục là thông tin trình bày, không thêm khẳng định lịch sử mới vào dữ liệu.

## Kho nội dung theo thời kỳ

`history.ts` là bộ tổng hợp dữ liệu tĩnh, không chứa nội dung bài đọc. `periods/index.ts` đăng ký các `PeriodContent`, mỗi bộ gồm `period`, `chapters`, `events`, `tenures`. Nhà Trần được tách thành `periods/tran/{claims,chapters,events,tenures,index}.ts`; nhà Lý và Hồ có bộ riêng. Các hồ sơ chuẩn dùng chung nằm trong `shared/`: nhân vật, quan hệ, địa điểm, chính thể, hình ảnh và hồ sơ đối chiếu.

`StoryChapter.periodId`, `HistoricalEvent.periodIds`, `Person.periodIds` và `RoleTenure.periodId` xác định phạm vi nội dung. Vai trò có thêm `dynastyId`/`polityId`; không suy triều đại từ tên người hoặc điều kiện năm trong component. Sự kiện chuyển triều chỉ có một bản ghi nhưng có thể thuộc hai thời kỳ.

`ChapterVisual` là cấu hình có kiểu: chuỗi, quan hệ, so sánh vai trò, chuỗi vua, sự kiện, hiện vật, chuyển ngôi, ngoại giao hoặc các mốc. Cấu hình chỉ định ID nhân vật/sự kiện/hình ảnh và nội dung nhãn. Component chỉ dựng cách trình bày. Tổng chương, mục lục, mốc con timeline và thông tin tổng quan đều đọc từ bộ dữ liệu được chọn.

Các bộ chọn `chaptersForPeriod`, `peopleForPeriod`, `eventsForPeriod`, `tenuresForPeriod` và các hàm ngữ cảnh trong `lib/history.ts` là điểm truy cập cho giao diện. URL cũ chứa chương hoặc hồ sơ không thuộc thời kỳ được sửa về nội dung hợp lệ; thời kỳ chưa có chương giữ tổng quan trống. Khi mở hồ sơ giao thời, ưu tiên giữ thời kỳ đang đọc nếu có liên quan.

## Thêm thời kỳ mà không sửa logic cốt lõi

1. Thêm Source đã đọc, Claim và Citation vào dữ liệu; chưa đủ nguồn thì giữ chưa xuất bản.
2. Thêm Polity/Dynasty phù hợp, không đồng nhất chúng với Period. Thêm Period với ID mới; bộ chọn thời kỳ đọc trực tiếp từ mảng.
3. Thêm Person/RoleTenure/Relationship/Event/Place bằng ID duy nhất. Dữ liệu không đủ tọa độ dùng null.
4. Tạo `periods/<id>/index.ts` xuất `PeriodContent`, đăng ký tại `periods/index.ts`. Khai báo chương có `periodId`, cấu hình trực quan và ID tham chiếu; metadata chứa `defaultYear`, `overviewFacts`, `milestones`. Nhân vật có sẵn chỉ thêm liên kết thời kỳ và nội dung, không tạo bản sao. Không sửa component để thêm tên triều đại, mốc hoặc số chương.
5. Nếu có hình học: mở rộng schema đang giới hạn geometry null, bổ sung nguồn không gian, giấy phép, phương pháp, độ chính xác, mốc hiệu lực và review trước khi render.
6. Chạy typecheck, audit, unit test và các kiểm thử trình duyệt liên quan. Test không thay việc đọc nguồn của người biên tập.

## Hướng chuyển sang database/CMS

Giai đoạn hiện tại dùng TypeScript/JSON lưu trong Git và xuất tĩnh. Sau khi phần lớn nội dung triều đại đã có, có thể thay lớp tổng hợp `history.ts` bằng adapter database/CMS trả cùng schema, giữ ID và quan hệ tham chiếu. Các bảng tương lai tương ứng Person, Period, liên kết Person–Period, Chapter, Event, RoleTenure, Relationship, Claim, Citation, Source và MediaAsset.

Góp ý của người dùng sẽ là thực thể riêng, có đối tượng được góp ý, nội dung đề xuất, nguồn đính kèm và trạng thái xử lý. Dashboard biên tập cần bản nháp, lịch sử phiên bản và quy trình duyệt trước khi xuất bản; góp ý không tự sửa dữ kiện đang hiển thị. Chưa triển khai database, đăng nhập, góp ý hoặc dashboard trong giai đoạn này.

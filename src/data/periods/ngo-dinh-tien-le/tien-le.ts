import {
  date,
  type Claim,
  type HistoricalEvent,
  type Person,
  type Relationship,
  type RoleTenure,
  type Source,
} from "../../schema";
import { claim, type Ref } from "../../claim-store";

const source = (
  entry: Pick<
    Source,
    "id" | "title" | "publisher" | "url" | "type" | "readLocation" | "limits"
  > & Partial<Pick<Source, "author" | "year" | "edition" | "upstream">>,
): Source => ({
  accessed: "2026-11-18",
  author: null,
  year: null,
  edition: null,
  upstream: null,
  ...entry,
});

export const tienLeSources: Source[] = [
  source({
    id: "tl-annals",
    title: "Đại Việt sử ký toàn thư — Bản kỷ I, kỷ nhà Tiền Lê",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vietnamthuquan.eu/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-11",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển I, phần b",
    readLocation:
      "Tờ 13a–19a: thân thế Lê Hoàn, chiến tranh 981–982, Dương hậu, tịch điền và tiếp Lý Giác; tờ 24a–34b: kế vị 1005, quan chế 1006, thỉnh kinh 1007 và chuyển triều 1009.",
    limits:
      "Bản đánh máy có lỗi và chưa xác nhận đủ ấn bản/dịch giả; phần mở đầu ghi 1006 nhưng mục năm Ất Tỵ ghi Lê Hoàn mất 1005. Địa điểm và diễn biến trận 981 có những cách giải thích khác nhau. Giữ niên đại theo quy ước Toàn thư, không tự đổi lịch; lời bình đạo đức, chuyện bệnh tật và sấm báo không được dùng làm kết luận khoa học.",
  }),
  source({
    id: "tl-dai-hanh-museum",
    title: "Lê Đại Hành (941–1005), vị vua đầu tiên của nhà Tiền Lê",
    publisher: "Bảo tàng Lịch sử Quốc gia",
    author: "Lê Thị Huệ (tổng hợp)",
    year: 2013,
    url: "https://baotanglichsu.vn/VI/Articles/3098/14759/le-djai-hanh-941-1005-vi-vua-djau-tien-cua-nha-tien-le.html",
    type: "museum",
    readLocation:
      "Toàn bài; trọng tâm các đoạn từ chức Thập đạo tướng quân đến chuyển ngôi 980, chiến tranh 981–982, kinh đô Hoa Lư, nông nghiệp và quan hệ với nhà Tống.",
    limits:
      "Bài tổng hợp có cả truyền thuyết sinh nở và thuật trận 981 khác bài cùng bảo tàng năm 2014. Không dùng số quân, chi tiết cọc hay tên cha mẹ/quê quán như đã được đối chiếu. Bài gọi Đại Hành là miếu hiệu, trong khi chính sử có lời bàn riêng về danh xưng này.",
  }),
  source({
    id: "tl-war-981-museum",
    title: "Mùa xuân năm 981 — Kháng chiến chống quân Tống lần thứ nhất thắng lợi",
    publisher: "Bảo tàng Lịch sử Quốc gia",
    author: "Nguyễn Thúy (tổng hợp)",
    year: 2014,
    url: "https://baotanglichsu.vn/vi/Articles/2002/68137/mua-xuan-nam-981-khang-chien-chong-quan-tong-lan-thu-nhat-thang-loi.html",
    type: "museum",
    readLocation:
      "Các đoạn về chuẩn bị chiến tranh 980, quân thủy và bộ năm 981, Bạch Đằng, cái chết Hầu Nhân Bảo và quân Tống rút về.",
    limits:
      "Bài phổ thông tổng hợp từ sách; không phải báo cáo khảo cổ chiến trường. Vị trí Hầu Nhân Bảo chết và cách phối hợp các trận khác các cách thuật khác; không gán tọa độ hay ngày chính xác cho trận quyết định và không đồng nhất ảnh bãi cọc minh họa với di tích đã định niên đại 981.",
  }),
  source({
    id: "tl-tich-dien-research",
    title: "Lê Hoàn, nhà vua đầu tiên cày tịch điền",
    author: "Tam Mai",
    publisher: "Tạp chí Di sản văn hóa — Cục Di sản văn hóa",
    edition: "Số 20; bài hai trang, trang in 56–57",
    url: "https://dsvh.gov.vn/Upload/files/Tap%20chi%20DSVH/So%2020/2013_Le%20Hoan%20nha%20vua%20dau%20tien%20cay%20tich%20dien.pdf",
    type: "research",
    readLocation:
      "Trang đầu: đối chiếu Việt sử lược, Toàn thư và Đại Nam nhất thống chí về tịch điền năm 987 ở Đọi Sơn; phần cuối về ý nghĩa khuyến nông và việc tiếp nối dưới thời Lý.",
    limits:
      "Tên tệp có 2013 nhưng không xác nhận đây là năm phát hành bài. Bài có những nhận định khác về quê Lê Hoàn và một số niên đại thời Lý, chỉ sử dụng phần tịch điền đã đối chiếu. Chuyện tìm được vàng/bạc là ghi chép sử liệu, không coi là phát hiện khảo cổ; không suy toàn bộ nghi thức lễ hội phục dựng là nghi thức thế kỷ X.",
  }),
  source({
    id: "tl-phap-thuan-research",
    title: "Đỗ Pháp Thuận — một tăng sĩ tiêu biểu thời Tiền Lê",
    author: "Nguyễn Quang Khải",
    publisher: "Tạp chí Nghiên cứu Phật học",
    year: 2016,
    edition: "Số tháng 11/2016; bản điện tử đăng 16/12/2016",
    url: "https://tapchinghiencuuphathoc.vn/do-phap-thuan-mot-tang-si-tieu-bieu-thoi-tien-le.html",
    type: "research",
    readLocation:
      "Mục 1 Hành trạng Thiền sư Đỗ Pháp Thuận: trích và so sánh bản dịch Thiền uyển tập anh, niên đại 915–990, văn thư ngoại giao, tiếp sứ và Quốc tộ.",
    limits:
      "Tác giả lưu ý quê quán chưa rõ, tên sứ thần Nguyễn Giác/Lý Giác khác giữa truyền bản. Không đồng nhất niên hiệu trong Thiền uyển với cách đếm của Toàn thư; không tự gắn một năm sáng tác chính xác cho Quốc tộ hoặc gán Nam quốc sơn hà cho Pháp Thuận.",
  }),
  source({
    id: "tl-khuong-viet-research",
    title:
      "Khuông Việt Quốc sư đối với đất nước trong buổi đầu độc lập tự chủ và văn bản bài từ khúc điệu Nguyễn lang quy",
    author: "Nguyễn Công Lý",
    publisher: "Tạp chí Khoa học Trường Đại học Sư phạm TP Hồ Chí Minh",
    year: 2017,
    edition: "Tập 14, số 8, tr.12–27",
    url: "https://journal.hcmue.edu.vn/index.php/hcmuejos/article/download/278/270",
    type: "research",
    readLocation:
      "Trang 12–16: hành trạng, các phương án năm sinh và vai trò dưới triều Đinh–Tiền Lê; phần sau đối chiếu văn bản bài từ tiễn sứ Lý Giác.",
    limits:
      "Năm sinh và quan hệ với dòng Ngô còn tranh luận; không vẽ một nhánh huyết thống từ các gia phả được bài dẫn lại. Không nhận các lời kể cầu đảo hoặc sấm truyền thành nguyên nhân thắng trận. Chỉ ghi cuối thế kỷ X–1011 khi chưa chọn được năm sinh chắc chắn.",
  }),
  source({
    id: "tl-chronology-discussion",
    title: "Niên biểu lịch sử Việt Nam không thể chỉ dựa trên một bộ sử",
    author: "Mỹ Hạnh",
    publisher: "Tạp chí Tia Sáng",
    url: "https://tiasang.com.vn/nien-bieu-lich-su-viet-nam-khong-the-chi-dua-tren-mot-bo-su-5025561.html",
    type: "reference",
    readLocation:
      "Các mục Cần đính chính lại niên biểu và nguyên tắc du niên cải nguyên: tường thuật nghiên cứu Phạm Lê Huy về niên hiệu Thiên Phúc, Hưng Thống, Ứng Thiên.",
    limits:
      "Bài báo tường thuật một hướng khảo chứng, chưa phải toàn văn nghiên cứu gốc và cũng nêu còn tranh luận. Lưu để công bố giới hạn niên đại, không tự hiệu đính mọi mốc Tiền Lê theo một quy tắc duy nhất.",
  }),
  source({
    id: "tl-ly-annals",
    title: "Đại Việt sử ký toàn thư — Bản kỷ II, phần Lý Thái Tổ",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vietnamthuquan.eu/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-12",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển II, phần a",
    readLocation:
      "Tờ 1a–1b: Công Uẩn, Khánh Văn, Vạn Hạnh và chức vụ trong triều Tiền Lê; tờ 6b–7a, mục 1015: Đào Cam Mộc mất; tờ 10a, mục 1025: Vạn Hạnh mất.",
    limits:
      "Bản chuyển dạng chưa xác nhận đủ ấn bản/dịch giả. Giữ những đoạn có thể tra theo tờ và mục năm; truyện sinh nở, sấm báo thuộc lớp truyền thuyết. Mốc Vạn Hạnh mất 1025 khác cách ghi 1018 trong một số bản nghiên cứu Thiền uyển tập anh.",
  }),
  source({
    id: "tl-van-hanh-research",
    title: "Như giọt sương đọng trên đầu ngọn cỏ",
    author: "Nguyễn Công Lý",
    publisher: "Khoa Văn học — Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TP Hồ Chí Minh",
    year: 2021,
    upstream: "Nguyệt san Giác Ngộ số 304, tháng 7/2021",
    url: "https://www.khoavanhoc-ngonngu.edu.vn/nghien-cuu/v%C4%83n-h%E1%BB%8Dc-vi%E1%BB%87t-nam/8031-nh%C6%B0-gi%E1%BB%8Dt-s%C6%B0%C6%A1ng-%C4%91%E1%BB%8Dng-tr%C3%AAn-%C4%91%E1%BA%A7u-ng%E1%BB%8Dn-c%E1%BB%8F.html",
    type: "research",
    readLocation:
      "Mục 2: hành trạng Vạn Hạnh, cố vấn dưới thời Tiền Lê, tôn phò Công Uẩn, các cách ghi năm mất 1018/1025 và đối chiếu Thiền uyển tập anh với Việt sử lược, Toàn thư.",
    limits:
      "Tác giả lập luận theo mốc 1025; hồ sơ giữ cả phương án 1018 được bài giải thích là hiệu đính của Trần Văn Giáp, chưa khẳng định đã giải quyết bất đồng. Không dùng phỏng đoán họ Lý/họ Nguyễn để tạo quan hệ huyết thống; không coi sấm báo là bằng chứng tiên tri.",
  }),
];

const annals = (location: string): Ref => ["tl-annals", location];
const genealogy = (location: string): Ref => [
  "the-thu",
  `Chương 3, phần V — Thế thứ triều Tiền Lê: ${location}`,
];
const passage = (
  id: string,
  text: string,
  refs: Ref[],
  kind: Claim["kind"] = "chronicle",
  note?: string,
) => claim(id, text, refs, { kind, ...(note ? { note } : {}) });

export const tienLeClaimIds = {
  accessionContext: passage(
    "tl-accession-context",
    "Sau khi Đinh Tiên Hoàng và Đinh Liễn bị giết năm 979, Đinh Toàn còn nhỏ lên ngôi. Lê Hoàn giữ quyền nhiếp chính trong lúc triều đình chia rẽ; nhà Tống chuẩn bị tiến quân, khiến việc tổ chức chỉ huy trở thành vấn đề cấp bách.",
    [["nd-annals-dinh", "Bản kỷ I, tờ 7b–10a: Phế Đế, nhiếp chính và chuẩn bị của nhà Tống"], ["tl-dai-hanh-museum", "Các đoạn từ biến cố 979 đến đề nghị của Phạm Cự Lạng"]],
  ),
  accession: passage(
    "tl-accession-development",
    "Năm 980, Phạm Cự Lạng cùng các tướng đề nghị tôn Lê Hoàn lên ngôi trước khi xuất quân. Toàn thư chép Dương thái hậu chấp thuận và cho khoác áo long cổn lên Lê Hoàn; Đinh Toàn bị giáng làm Vệ vương. Cuộc thay ngôi đưa người đang nắm quân đội lên đứng đầu triều đình.",
    [["nd-annals-dinh", "Tờ 9b–10a: Phạm Cự Lạng, Dương hậu và áo long cổn"], genealogy("Lê Hoàn được tôn lập năm Canh Thìn 980")],
  ),
  accessionResult: passage(
    "tl-accession-result",
    "Nhà Tiền Lê bắt đầu năm 980. Lê Hoàn tiếp tục dùng quốc hiệu Đại Cồ Việt và đóng đô ở Hoa Lư; thay đổi dòng vua không đồng nghĩa với việc đặt quốc hiệu hoặc kinh đô mới.",
    [["tl-dai-hanh-museum", "Đoạn nhà Tiền Lê thành lập, quốc hiệu và kinh đô"], annals("Tờ 13a–13b: chức vụ thời Đinh và định đô Hoa Lư")],
  ),
  warContext: passage(
    "tl-war-981-context",
    "Nhà Tống muốn khai thác biến động trong triều Đinh để đưa Đại Cồ Việt vào vòng kiểm soát. Sau khi lên ngôi, Lê Hoàn vừa chuẩn bị quân đội vừa dùng thư từ ngoại giao để ứng phó; chiến tranh diễn ra năm 981, sau cuộc chuyển ngôi năm 980.",
    [["nd-annals-dinh", "Tờ 9a–12b: kế hoạch nhà Tống và thư qua lại"], ["tl-war-981-museum", "Các đoạn chuẩn bị 980 và tiến công mùa xuân 981"]],
  ),
  warCampaign: passage(
    "tl-war-981-development",
    "Quân Tống tiến theo các đường thủy và bộ; sử cũ nhắc tới Bạch Đằng, Lạng Sơn và Tây Kết. Lê Hoàn trực tiếp chỉ huy chống giữ. Hầu Nhân Bảo bị giết, các cánh quân Tống không đạt được mục tiêu; vị trí và trình tự một số trận đánh còn được giải thích khác nhau trong các tài liệu.",
    [annals("Tờ 14a–15b: các cánh quân Tống, Hầu Nhân Bảo và việc rút quân"), ["tl-war-981-museum", "Các đoạn Bạch Đằng, Bình Lỗ và kết thúc chiến tranh"], ["tl-dai-hanh-museum", "Đoạn thuật trận 981 theo một cách đặt địa điểm khác"]],
  ),
  warResult: passage(
    "tl-war-981-result",
    "Cuộc tiến công của nhà Tống thất bại, nền tự chủ của Đại Cồ Việt được giữ vững. Quan hệ giữa hai bên sau chiến tranh dần trở lại qua sứ bộ và phong tước; thắng lợi quân sự và hoạt động ngoại giao là hai phần nối tiếp của quá trình bảo vệ chính quyền độc lập.",
    [annals("Tờ 15b và các mục bang giao tiếp theo"), ["tl-war-981-museum", "Đoạn kết quả quân Tống rút về và quan hệ đối ngoại"]],
  ),
  champaContext: passage(
    "tl-champa-982-context",
    "Sau chiến tranh với nhà Tống, triều đình Hoa Lư tiếp tục phải xử lý quan hệ với Champa ở phía nam. Toàn thư ghi một sứ bộ do Lê Hoàn cử đi bị phía Champa giữ lại; sử Việt đặt việc này trong bối cảnh chiến dịch năm 982.",
    [annals("Mục Nhâm Ngọ 982, tờ 16a–16b: sứ Từ Mục, Ngô Tử Canh và việc đánh Chiêm Thành"), ["tl-dai-hanh-museum", "Đoạn sứ bộ bị giữ và chiến dịch 982"]],
  ),
  champa: passage(
    "tl-champa-982-development",
    "Năm 982, Lê Hoàn đích thân chỉ huy chiến dịch đánh Champa. Nguồn sử Việt thuật việc vua Champa tử trận, kinh thành bị phá và nhiều người cùng tài sản bị đưa về. Đây là một cuộc chiến gây tổn thất cho phía Champa, cần được nhìn cả từ những hệ quả đối với cư dân và quan hệ hai nước.",
    [annals("Tờ 16a–16b: chiến dịch và những người bị bắt"), ["tl-dai-hanh-museum", "Đoạn năm 982"]],
  ),
  champaResult: passage(
    "tl-champa-982-result",
    "Chiến dịch giúp triều Tiền Lê thể hiện sức mạnh ở phía nam, nhưng quan hệ với Champa còn tiếp tục qua xung đột, sứ bộ và những nhóm người qua lại. Không thể lấy riêng cuộc tiến quân năm 982 để suy ra một đường biên giới mới đã được xác định.",
    [annals("Tờ 16a–18a: chiến dịch 982, việc Lưu Kế Tông và sứ bộ những năm sau")],
    "interpretation",
  ),
  agricultureContext: passage(
    "tl-tich-dien-context",
    "Sản xuất nông nghiệp là nền tảng nuôi sống cư dân và cung cấp nguồn lực cho triều đình. Bên cạnh tổ chức quân đội và cung điện, thời Lê Hoàn còn được sử liệu ghi lại qua việc cày tịch điền, khơi sông và mở đường.",
    [["tl-dai-hanh-museum", "Đoạn hoạt động xây dựng, nông nghiệp, đường sá"], ["tl-tich-dien-research", "Trang đầu: ý nghĩa khuyến nông của tịch điền"]],
    "interpretation",
  ),
  agriculture: passage(
    "tl-tich-dien-development",
    "Mùa xuân năm 987 theo Toàn thư, Lê Hoàn cày ruộng tịch điền ở núi Đọi. Việc nhà vua trực tiếp xuống ruộng vừa là nghi lễ của vương quyền vừa thể hiện sự quan tâm tới nông nghiệp; Việt sử lược cũng ghi sự kiện nhưng đếm năm niên hiệu khác.",
    [annals("Tờ 18a: Đinh Hợi 987, tịch điền ở núi Đọi"), ["tl-tich-dien-research", "Trang đầu: so sánh ghi chép 987 giữa Việt sử lược và Toàn thư"]],
  ),
  agricultureResult: passage(
    "tl-tich-dien-result",
    "Các triều sau còn tiếp tục nghi thức tịch điền với địa điểm và cách tổ chức khác nhau. Lễ hội Đọi Sơn ngày nay gợi nhớ một truyền thống lâu dài; hình ảnh phục dựng giúp hình dung nghi lễ nhưng không phải bằng chứng về toàn bộ nghi thức thời Lê Hoàn.",
    [["tl-tich-dien-research", "Trang cuối: tịch điền thời Lý và ý nghĩa khuyến nông"]],
    "interpretation",
  ),
  diplomacyContext: passage(
    "tl-diplomacy-context",
    "Giữ nền tự chủ còn cần giao tiếp với các nước lân bang. Trong triều Tiền Lê, những tăng sĩ thông hiểu chữ Hán và văn chương như Pháp Thuận, Khuông Việt tham gia văn thư, cố vấn và tiếp sứ, bên cạnh các chức vụ chính thức của triều đình.",
    [["tl-phap-thuan-research", "Mục 1: giao việc văn hàn cho Pháp Thuận"], ["tl-khuong-viet-research", "Trang 15–16 và phần bài từ tiễn sứ"]],
  ),
  diplomacy: passage(
    "tl-diplomacy-development",
    "Toàn thư đặt cuộc đón sứ Tống Lý Giác vào năm 987: Pháp Thuận tham gia đón tiếp và đối đáp văn chương, còn Khuông Việt được vua giao soạn bài từ tiễn sứ. Cùng một chuyến đi sứ cho thấy nhiều người đảm nhiệm những phần khác nhau của hoạt động bang giao.",
    [annals("Tờ 18a–19a: Thuận đón Giác, Khuông Việt xem thơ và làm bài hát tiễn"), ["tl-phap-thuan-research", "Mục 1: so sánh tên Lý Giác/Nguyễn Giác"], ["tl-khuong-viet-research", "Phần đối chiếu bài từ điệu Nguyễn lang quy"]],
  ),
  diplomacyResult: passage(
    "tl-diplomacy-result",
    "Văn chương trở thành một phương tiện giao tiếp chính trị của triều đình Hoa Lư. Những ghi chép về cuộc tiếp sứ đồng thời bảo lưu dấu tích sáng tác chữ Hán sớm; cách chép tên sứ thần và văn bản thơ, từ có dị biệt giữa các truyền bản.",
    [["tl-phap-thuan-research", "Phần so sánh bản dịch và chú thích về tên sứ thần"], ["tl-khuong-viet-research", "Tóm tắt và phần khảo dị bài từ"]],
    "interpretation",
  ),
  successionContext: passage(
    "tl-succession-1005-context",
    "Lê Hoàn có nhiều con trai được phong vương. Long Việt được lập làm thái tử năm 1004, nhưng sau khi vua cha mất năm 1005, các hoàng tử vẫn tranh giành quyền lực; việc đã có người được chọn kế vị không bảo đảm chuyển ngôi yên ổn.",
    [annals("Mục 1004 và tờ 24b–26a về việc Đại Hành mất, tranh ngôi"), genealogy("Lê Trung Tông, được lập thái tử 1004")],
  ),
  succession: passage(
    "tl-succession-1005-development",
    "Trong năm 1005, Long Việt lên ngôi giữa cuộc tranh chấp của các anh em. Toàn thư chép ông chỉ giữ ngôi ba ngày rồi bị Long Đĩnh, người em cùng mẹ, giết. Long Đĩnh tiếp tục đánh các vương chống đối để củng cố ngôi vua.",
    [annals("Tờ 25b–27b: Trung Tông, Long Đĩnh và các vương"), genealogy("Mục Lê Trung Tông và Lê Ngọa Triều")],
  ),
  successionResult: passage(
    "tl-succession-1005-result",
    "Lê Long Đĩnh là người giữ ngôi cuối cùng của nhà Tiền Lê, trị vì từ 1005 đến 1009. Chuỗi ba đời vua vì vậy gồm Lê Hoàn, Lê Long Việt và Lê Long Đĩnh; thời gian cầm quyền của họ rất khác nhau.",
    [genealogy("Ba đời vua 980–1009"), annals("Các mục Đại Hành, Trung Tông và Ngọa Triều")],
  ),
  institutionsContext: passage(
    "tl-institutions-context",
    "Sau tranh chấp kế vị, Long Đĩnh vừa đối phó những lực lượng chống đối vừa tổ chức lại triều đình. Những hoạt động ấy hiện diện trong sử cũ bên cạnh nhiều lời phê phán về cách ông giành và sử dụng quyền lực.",
    [annals("Tờ 27a–28a: đánh các vương và sửa quan chế")],
    "interpretation",
  ),
  institutions: passage(
    "tl-institutions-development",
    "Toàn thư ghi năm 1006, Lê Long Đĩnh sửa quan chế và triều phục của quan văn, quan võ cùng tăng đạo theo thể thức nhà Tống. Việc học một số hình thức tổ chức từ bên ngoài diễn ra trong một triều đình vẫn giữ chính quyền riêng.",
    [annals("Tờ 27b, mục Bính Ngọ 1006: quan chế và triều phục")],
  ),
  institutionsResult: passage(
    "tl-institutions-result",
    "Ghi chép này cho thấy những hoạt động tổ chức nhà nước dưới thời Long Đĩnh, dù triều đại ngắn ngủi. Nó không đủ để đánh giá kết quả thực thi của toàn bộ quan chế; cũng không xóa bỏ các biến cố bạo lực được ghi trong cùng nguồn.",
    [annals("Tờ 27b–30b: quan chế, bang giao và cách cai trị")],
    "interpretation",
  ),
  scripturesContext: passage(
    "tl-scriptures-context",
    "Bang giao thời Long Đĩnh không chỉ có việc xin phong tước. Triều đình còn quan tâm tới kinh sách và quan hệ Phật giáo; các sứ bộ là một con đường đưa văn bản từ nhà Tống về Đại Cồ Việt.",
    [annals("Tờ 28b–29a: sứ bộ và xin kinh Đại Tạng")],
    "interpretation",
  ),
  scriptures: passage(
    "tl-scriptures-development",
    "Năm 1007 theo Toàn thư, Lê Long Đĩnh sai em là Minh Xưởng cùng một viên chưởng thư ký sang nhà Tống, trong đó có việc xin kinh Đại Tạng. Cùng năm, nhà Tống phong ông làm Giao Chỉ quận vương và ban tên Chí Trung.",
    [annals("Tờ 28b–29a, mục Đinh Mùi 1007: sứ bộ, kinh và sắc phong")],
  ),
  scripturesResult: passage(
    "tl-scriptures-result",
    "Đến mục năm 1009, Toàn thư ghi Minh Xưởng từ nhà Tống trở về và xin được kinh Đại Tạng. Đây là một dấu vết giao lưu văn hóa cuối thời Tiền Lê; ghi chép ấy chưa đủ để xác định số bộ kinh nhận được hoặc gán một hiện vật hiện còn thành chính bản của sứ bộ này.",
    [annals("Tờ 28b–29b: xin kinh năm 1007 và Minh Xưởng về năm 1009")],
    "interpretation",
  ),
  dynastyEnd: passage(
    "tl-dynasty-ending",
    "Năm 1009, Lê Long Đĩnh mất khi người con nối còn nhỏ. Lý Công Uẩn, đang giữ quyền chỉ huy quân bảo vệ cung đình, được tôn lên ngôi với sự ủng hộ của Đào Cam Mộc và Vạn Hạnh. Nhà Lý bắt đầu ngay tại Hoa Lư, trước cuộc dời đô năm 1010.",
    [annals("Tờ 30b–34b: Long Đĩnh mất, Công Uẩn, Cam Mộc và Vạn Hạnh"), ["the-thu", "Chương 4, phần I: Công Uẩn lên ngôi 1009, dời đô 1010"]],
  ),
  faith: passage(
    "tl-buddhist-participation",
    "Khuông Việt và Pháp Thuận cho thấy tăng sĩ có thể tham gia việc nước qua học thức, văn thư và ngoại giao. Hành trạng của họ được lưu trong cả chính sử và Thiền uyển tập anh; những lời kể linh ứng trong truyền thống Phật giáo cần được đọc riêng với hoạt động chính trị có thể đối chiếu.",
    [["tl-phap-thuan-research", "Mục 1: việc nước, văn hàn và tiếp sứ"], ["tl-khuong-viet-research", "Trang 12–16: vai trò dưới các vương triều và lớp truyền thuyết"]],
    "interpretation",
  ),
};

const section = (
  id: string,
  title: string,
  text: string,
  refs: Ref[],
  kind: Claim["kind"] = "chronicle",
) => ({ title, claimIds: [passage(id, text, refs, kind)] });

export const tienLePeople: Person[] = [
  {
    id: "le-dai-hanh",
    periodIds: ["the-ky-x"],
    name: "Lê Đại Hành",
    personalName: "Lê Hoàn",
    aliases: ["Lê Hoàn", "Đại Hành hoàng đế"],
    eraNames: ["Thiên Phúc", "Hưng Thống", "Ứng Thiên"],
    title: "Người mở đầu nhà Tiền Lê · Hoàng đế Đại Cồ Việt",
    life: "941–1005",
    contextYear: 980,
    summaryClaimIds: [passage(
      "tl-bio-dai-hanh-summary",
      "Lê Đại Hành, tên húy Lê Hoàn, là vị vua mở đầu nhà Tiền Lê. Từ chức Thập đạo tướng quân dưới triều Đinh, ông giữ quyền nhiếp chính khi Đinh Toàn còn nhỏ rồi được tôn lên ngôi năm 980. Ông tiếp tục đóng đô tại Hoa Lư, lãnh đạo cuộc kháng chiến chống Tống năm 981 và chiến dịch đánh Champa năm 982. Trong thời gian trị vì đến năm 1005, triều đình mở rộng bang giao, quan tâm nông nghiệp và tổ chức đất nước; sau khi ông mất, tranh chấp kế vị làm hoàng tộc phân hóa.",
      [genealogy("Mục Lê Hoàn: niên đại và thời gian giữ ngôi"), ["tl-dai-hanh-museum", "Các đoạn sự nghiệp quân sự, chuyển ngôi, nông nghiệp và bang giao"]],
    )],
    biographySections: [
      section("tl-bio-dai-hanh-origin", "Từ tướng triều Đinh đến ngôi vua", "Sử cũ ghi Lê Hoàn xuất thân ở Ái Châu, sớm mồ côi và được một người cùng họ nhận nuôi. Ông phục vụ nhà Đinh rồi nắm lực lượng quân sự quan trọng. Sau biến cố 979, quyền nhiếp chính của ông gặp sự phản đối của Nguyễn Bặc, Đinh Điền và Phạm Hạp. Việc được tôn lập năm 980 vì thế vừa gắn với nhu cầu chống quân Tống vừa là kết quả một cuộc tranh chấp quyền lực trong nước.", [annals("Tờ 13a–13b: thân thế và chức vụ"), ["nd-annals-dinh", "Tờ 8a–10a: nhiếp chính, khởi binh và tôn lập"]]),
      { title: "Chống Tống, quan hệ với Champa", claimIds: [tienLeClaimIds.warCampaign, tienLeClaimIds.warResult, tienLeClaimIds.champa] },
      { title: "Nông nghiệp và ngoại giao", claimIds: [tienLeClaimIds.agriculture, tienLeClaimIds.diplomacy] },
      section("tl-bio-dai-hanh-title", "Danh xưng Đại Hành và cuối đời", "Lê Hoàn mất năm 1005. Danh xưng Đại Hành trở thành tên gọi quen thuộc của ông, nhưng chính Toàn thư có lời bàn rằng đây vốn là cách gọi hoàng đế mới qua đời trước khi định thụy. Vì thế không nên mặc nhiên hiểu Đại Hành là một miếu hiệu được xác lập giống Thái Tổ hay Thái Tông. Các con tranh ngôi sau khi ông mất, mở đầu biến động kế vị năm 1005.", [annals("Tờ 24b–26a và lời bàn Lê Văn Hưu về danh xưng Đại Hành"), genealogy("Mục Lê Hoàn và Lê Trung Tông")]),
    ],
    eventIds: ["le-len-ngoi-980", "le-chong-tong-981", "le-champa-982", "le-tich-dien-987", "le-ngoai-giao-987", "le-ke-vi-1005"],
  },
  {
    id: "le-trung-tong",
    periodIds: ["the-ky-x"],
    name: "Lê Trung Tông",
    personalName: "Lê Long Việt",
    templeName: "Trung Tông",
    aliases: ["Lê Long Việt", "Nam Phong vương"],
    title: "Vị vua ở ngôi ngắn ngủi giữa biến động kế vị năm 1005",
    life: "983–1005",
    contextYear: 1005,
    summaryClaimIds: [passage("tl-bio-trung-tong-summary", "Lê Trung Tông, tên húy Lê Long Việt, là con Lê Hoàn và người được sử cũ gọi là Chi hậu Diệu Nữ. Ông được chọn làm thái tử năm 1004. Sau khi Lê Hoàn mất, các anh em tranh giành quyền lực; trong năm 1005, Long Việt lên ngôi nhưng theo Toàn thư chỉ được ba ngày thì bị người em cùng mẹ là Long Đĩnh giết. Thời gian trị vì rất ngắn khiến ông không kịp đặt niên hiệu riêng, nhưng vẫn là một người giữ ngôi thực sự trong chuỗi vua Tiền Lê.", [genealogy("Mục Lê Trung Tông: mẹ, năm sinh, thái tử và ba ngày giữ ngôi"), annals("Tờ 25b–26a: Trung Tông")])],
    biographySections: [
      { title: "Người được chọn nối ngôi", claimIds: [tienLeClaimIds.successionContext] },
      section("tl-bio-trung-tong-ly-cong-uan", "Lý Công Uẩn trong biến cố cung đình", "Toàn thư thuật rằng khi Long Việt bị giết, các bề tôi bỏ chạy, còn người giữ quân điện tiền Lý Công Uẩn ôm thi thể vua mà khóc. Sau đó Long Đĩnh vẫn bổ dụng Công Uẩn. Chi tiết này cho thấy Công Uẩn đã có vị trí trong triều Tiền Lê trước khi lên ngôi năm 1009; đó là quan hệ phục vụ triều đình, không phải chứng cứ về huyết thống với hoàng gia.", [annals("Tờ 26a: Trung Tông bị giết, Công Uẩn và chức Tứ sương quân phó chỉ huy sứ")]),
    ],
    eventIds: ["le-ke-vi-1005"],
  },
  {
    id: "le-long-dinh",
    periodIds: ["the-ky-x"],
    name: "Lê Long Đĩnh",
    personalName: "Lê Long Đĩnh",
    aliases: ["Lê Ngọa Triều", "Lê Chí Trung", "Khai Minh vương"],
    eraNames: ["Ứng Thiên", "Cảnh Thụy"],
    title: "Vị vua cuối cùng của nhà Tiền Lê",
    life: "986–1009",
    contextYear: 1005,
    summaryClaimIds: [passage("tl-bio-long-dinh-summary", "Lê Long Đĩnh là con Lê Hoàn, em cùng mẹ của Lê Long Việt. Ông giành ngôi năm 1005 sau khi Trung Tông bị giết, rồi trị vì đến năm 1009. Dưới thời ông, sử cũ ghi việc sửa quan chế, thay triều phục và cử sứ xin kinh Đại Tạng từ nhà Tống. Ông cũng được biết đến qua tên gọi Ngọa Triều và nhiều lời phê phán trong sử sách. Khi ông mất, Lý Công Uẩn được tôn lên ngôi, kết thúc nhà Tiền Lê.", [genealogy("Mục Lê Ngọa Triều: tên, cha mẹ, thời gian trị vì"), annals("Tờ 26b–34b: Long Đĩnh, quan chế, sứ bộ và chuyển triều")])],
    biographySections: [
      { title: "Giành ngôi và củng cố quyền lực", claimIds: [tienLeClaimIds.succession, tienLeClaimIds.institutionsContext] },
      { title: "Quan chế và giao lưu kinh sách", claimIds: [tienLeClaimIds.institutions, tienLeClaimIds.scriptures] },
      section("tl-bio-long-dinh-historiography", "Tên gọi Ngọa Triều trong sử liệu", "Toàn thư gọi Long Đĩnh là Ngọa Triều và giải thích tên gọi bằng một câu chuyện về bệnh khiến vua nằm coi chầu. Nguồn còn lưu nhiều lời lên án đạo đức và các chuyện về hình phạt. Những ghi chép ấy là một phần hình ảnh nhân vật do sử quan truyền lại; chúng không đủ để xác lập chẩn đoán y khoa, cũng không nên thay thế việc xem xét từng hoạt động chính trị được ghi trong cùng thời gian.", [annals("Tờ 30a–31a: hành vi, cách gọi Ngọa Triều và lời bình sử quan")], "interpretation"),
      { title: "Kết thúc triều đại tại Hoa Lư", claimIds: [tienLeClaimIds.dynastyEnd] },
    ],
    eventIds: ["le-ke-vi-1005", "le-doi-quan-che-1006", "le-thinh-kinh-1007", "ly-lap-trieu-1009"],
  },
  {
    id: "duong-van-nga",
    periodIds: ["the-ky-x"],
    name: "Dương Vân Nga",
    aliases: ["Dương thái hậu", "Dương hậu", "Đại Thắng Minh hoàng hậu"],
    title: "Thái hậu thời Đinh · Hoàng hậu thời Tiền Lê",
    life: "Thế kỷ X · chưa xác định chắc năm sinh và năm mất",
    contextYear: 980,
    summaryClaimIds: [passage("tl-bio-duong-hau-summary", "Dương Vân Nga là tên gọi quen thuộc của Dương hậu, người vợ của Đinh Tiên Hoàng và là mẹ Đinh Toàn. Khi con lên ngôi còn nhỏ sau biến cố 979, bà giữ ngôi thái hậu. Năm 980, bà chấp thuận việc tôn Lê Hoàn lên làm hoàng đế trong bối cảnh quân Tống chuẩn bị tiến đánh. Toàn thư ghi đến năm 982, Lê Hoàn lập bà làm Đại Thắng Minh hoàng hậu. Vai trò của bà nối hai triều đại và gắn trực tiếp với cuộc chuyển giao quyền lực tại Hoa Lư.", [["nd-annals-dinh", "Tờ 7b–10a: Phế Đế và vai trò Dương thái hậu"], annals("Tờ 15b–16a: Dương thị, vợ Tiên Hoàng, mẹ Toàn và lập hậu 982")])],
    biographySections: [
      { title: "Thái hậu và cuộc thay ngôi năm 980", claimIds: [tienLeClaimIds.accessionContext, tienLeClaimIds.accession] },
      section("tl-bio-duong-hau-two-courts", "Hai cuộc hôn nhân và lời bình sử quan", "Bản kỷ ghi rõ hai mối liên hệ: Dương hậu từng là vợ Đinh Tiên Hoàng và sau đó được Lê Hoàn lập làm hoàng hậu. Sử quan đời sau phê phán cuộc hôn nhân này theo quan niệm đạo đức đương thời. Có thể nhận diện hành động chính trị năm 980 từ ghi chép ấy mà không cần biến lời phê phán thành kết luận về phẩm hạnh hoặc tự đoán tâm tư của bà.", [annals("Tờ 15b–16a: việc lập hậu và lời bàn Ngô Sĩ Liên")], "interpretation"),
      section("tl-bio-duong-hau-names", "Tên gọi và những quan hệ chưa thể khẳng định", "Trong đoạn chính sử đang dẫn, nhân vật được gọi là Dương thị hoặc Dương thái hậu. Tên Vân Nga được dùng ở đây theo cách gọi quen thuộc trong các bài giới thiệu hiện nay. Các đoạn nguồn này không xác định cha mẹ của bà; vì thế hồ sơ không nối bà với Dương Tam Kha hoặc Dương Đình Nghệ chỉ dựa vào cùng họ Dương. Bà cũng không được gán làm mẹ Long Việt hay Long Đĩnh, vì sử cũ ghi mẹ hai vua là Chi hậu Diệu Nữ.", [annals("Tờ 15b–16a: Dương thị; tờ 25b–26b: mẹ Long Việt, Long Đĩnh"), ["tl-dai-hanh-museum", "Đoạn dùng tên Dương Vân Nga"]], "interpretation"),
    ],
    eventIds: ["dinh-bien-co-979", "le-len-ngoi-980"],
  },
  {
    id: "pham-cu-luong",
    periodIds: ["the-ky-x"],
    name: "Phạm Cự Lạng",
    personalName: "Phạm Cự Lạng",
    aliases: ["Phạm Cự Lượng"],
    title: "Vị tướng tham gia tôn lập Lê Hoàn",
    life: "Thế kỷ X",
    contextYear: 980,
    summaryClaimIds: [passage("tl-bio-pham-cu-lang-summary", "Phạm Cự Lạng, còn được gọi là Phạm Cự Lượng, là tướng có vai trò nổi bật trong việc đưa Lê Hoàn lên ngôi năm 980. Toàn thư ghi khi triều đình chuẩn bị chống quân Tống, ông được chọn làm đại tướng quân rồi cùng các tướng đề nghị tôn người đang giữ quyền chỉ huy quân đội làm hoàng đế. Sự tham gia của ông cho thấy cuộc thay ngôi không chỉ là quyết định của Dương thái hậu mà còn có sự thúc đẩy của lực lượng quân sự.", [["nd-annals-dinh", "Tờ 9b–10a: Phạm Cự Lạng và đề nghị tôn lập"], ["tl-dai-hanh-museum", "Đoạn cuộc họp bàn xuất quân và đề nghị của Phạm Cự Lạng"]])],
    biographySections: [
      section("tl-bio-pham-cu-lang-army", "Quân đội trong cuộc chuyển giao quyền lực", "Lập luận được sử cũ thuật lại của Phạm Cự Lạng đặt việc chỉ huy, thưởng công và xử phạt trong chiến tranh bên cạnh tình trạng vua nhỏ. Đây là lời nói được người biên soạn chính sử ghi lại, không phải biên bản đối thoại đương thời. Dù vậy, việc ông cùng các tướng xuất hiện ở Nội phủ là chi tiết quan trọng để hiểu vai trò chính trị của quân đội Hoa Lư.", [["nd-annals-dinh", "Tờ 9b–10a: lời đề nghị và phản ứng quân sĩ"]], "interpretation"),
      section("tl-bio-pham-cu-lang-family", "Nhánh gia đình ở hai phía tranh chấp", "Chú giải của bản Toàn thư được dẫn ghi Phạm Hạp, người cùng Nguyễn Bặc và Đinh Điền chống Lê Hoàn, là anh của Phạm Cự Lạng. Nếu theo ghi chép này, hai anh em đã có lựa chọn chính trị khác nhau. Chi tiết ấy nhắc rằng quan hệ ruột thịt không tự động đồng nghĩa với cùng phe trong các biến động cuối thời Đinh.", [["nd-annals-dinh", "Chú thích 271 về Phạm Cự Lạng, dẫn Đại Việt sử ký tiền biên"]], "interpretation"),
    ],
    eventIds: ["le-len-ngoi-980", "le-chong-tong-981"],
  },
  {
    id: "do-phap-thuan",
    periodIds: ["the-ky-x"],
    name: "Đỗ Pháp Thuận",
    aliases: ["Pháp Thuận", "Đỗ Pháp sư"],
    title: "Thiền sư tham gia văn thư và bang giao thời Tiền Lê",
    life: "915–990 theo Thiền uyển tập anh",
    contextYear: 987,
    summaryClaimIds: [passage("tl-bio-phap-thuan-summary", "Đỗ Pháp Thuận là một thiền sư được ghi nhận có tài văn chương và tham gia việc nước trong buổi đầu nhà Tiền Lê. Theo Thiền uyển tập anh, Lê Hoàn kính trọng ông và giao việc văn thư. Toàn thư ghi ông tham gia đón sứ Tống năm 987, còn truyền thống Phật giáo lưu bài Quốc tộ như lời đáp khi vua hỏi về vận nước. Hình ảnh Pháp Thuận cho thấy học thức của tăng sĩ có vị trí trong đời sống chính trị và ngoại giao thế kỷ X.", [["tl-phap-thuan-research", "Mục 1: hành trạng, năm sinh/mất, văn hàn và Quốc tộ"], annals("Tờ 18a–18b và chú thích 294: pháp sư Thuận đón sứ")])],
    biographySections: [
      { title: "Văn chương trong cuộc tiếp sứ", claimIds: [tienLeClaimIds.diplomacy, tienLeClaimIds.diplomacyResult] },
      section("tl-bio-phap-thuan-quoc-to", "Quốc tộ và mối quan tâm đến hòa bình", "Bài Quốc tộ được Thiền uyển tập anh gắn với câu hỏi của Lê Hoàn về vận nước, đặt sự yên ổn và việc giảm đao binh ở trung tâm lời khuyên. Văn bản có giá trị trong lịch sử tư tưởng và văn học; nguồn đang dẫn không đủ để ấn định một ngày hoặc một năm sáng tác chính xác. Các giả thuyết về quê quán Pháp Thuận cũng cần phân biệt với dữ kiện chắc chắn.", [["tl-phap-thuan-research", "Mục 1: Quốc tộ, hành trạng và phần bàn về quê quán"]], "interpretation"),
    ],
    eventIds: ["le-ngoai-giao-987"],
  },
  {
    id: "ngo-chan-luu",
    periodIds: ["the-ky-x", "ly"],
    name: "Khuông Việt",
    personalName: "Ngô Chân Lưu",
    aliases: ["Ngô Chân Lưu", "Khuông Việt đại sư", "Khuông Việt thái sư"],
    title: "Tăng sĩ tham gia việc nước thời Đinh và Tiền Lê",
    life: "Thế kỷ X–1011 · năm sinh còn khác biệt",
    contextYear: 987,
    summaryClaimIds: [passage("tl-bio-khuong-viet-summary", "Khuông Việt, tên Ngô Chân Lưu, là tăng sĩ nổi bật dưới triều Đinh và Tiền Lê, còn sống đến đầu thời Lý. Thiền uyển tập anh ghi ông được Đinh Tiên Hoàng phong chức và ban hiệu Khuông Việt. Dưới triều Lê Hoàn, ông tiếp tục tham gia việc triều đình; Toàn thư kể việc ông xem thơ của sứ Tống và được giao làm bài từ tiễn sứ năm 987. Ông mất năm 1011, trong khi năm sinh vẫn có những cách giải thích khác nhau giữa các văn bản và nghiên cứu.", [["tl-khuong-viet-research", "Trang 12–16: hành trạng và tranh luận năm sinh"], annals("Tờ 18b–19a, chú thích 298: Khuông Việt và bài tiễn sứ")])],
    biographySections: [
      section("tl-bio-khuong-viet-dinh", "Từ triều Đinh đến triều Tiền Lê", "Khuông Việt được ghi là người có học thức được Đinh Tiên Hoàng mời vào triều, phong Tăng thống và ban hiệu vào năm Thái Bình thứ hai. Tên hiệu mang ý nghĩa giúp nước Việt, thể hiện sự gắn bó giữa một tăng sĩ và vương quyền. Việc ông tiếp tục xuất hiện trong hoạt động triều Lê Hoàn cho thấy nhân sự có thể đi qua một cuộc thay đổi dòng vua.", [["tl-khuong-viet-research", "Trang 14–16: chức Tăng thống, danh hiệu và tham gia việc nước"]]),
      { title: "Bài từ tiễn sứ Lý Giác", claimIds: [tienLeClaimIds.diplomacy, tienLeClaimIds.diplomacyResult] },
      section("tl-bio-khuong-viet-dates", "Hành trạng và truyền bản", "Thiền uyển tập anh đặt việc Khuông Việt viên tịch vào năm Thuận Thiên thứ hai, tức 1011. Những con số về tuổi thọ và năm sinh không thống nhất; nghiên cứu còn bàn lại cả cách đọc một số chữ trong truyền bản. Hồ sơ vì vậy không chọn một năm sinh duy nhất, cũng không vẽ quan hệ huyết thống cụ thể với Ngô Quyền chỉ từ các giả thuyết gia phả được dẫn lại.", [["tl-khuong-viet-research", "Trang 13–15: các phương án tuổi thọ, năm sinh và chú thích gia phả"]], "interpretation"),
    ],
    eventIds: ["le-ngoai-giao-987"],
  },
  {
    id: "van-hanh",
    periodIds: ["the-ky-x", "ly"],
    name: "Vạn Hạnh",
    aliases: ["Thiền sư Vạn Hạnh", "Quốc sư Vạn Hạnh"],
    title: "Thiền sư gắn với cuộc chuyển từ nhà Tiền Lê sang nhà Lý",
    life: "Chưa rõ năm sinh · năm mất có cách ghi 1018/1025",
    contextYear: 1009,
    summaryClaimIds: [passage("tl-bio-van-hanh-summary", "Vạn Hạnh là thiền sư ở vùng Cổ Pháp, có quan hệ gần gũi với Lý Công Uẩn và tham gia đời sống chính trị cuối thời Tiền Lê, đầu thời Lý. Sử cũ thuật việc ông khuyến khích Công Uẩn nhận ngôi năm 1009; ông được nhìn nhận là một trong những người tôn phò triều đại mới, bên cạnh Đào Cam Mộc và các quan trong triều. Năm sinh của ông chưa rõ; năm mất có hai cách ghi 1018 và 1025 trong những truyền bản, hiệu đính và nghiên cứu khác nhau.", [annals("Tờ 31a–33a: Vạn Hạnh và Công Uẩn"), ["tl-ly-annals", "Tờ 1a–1b: Vạn Hạnh với Công Uẩn thời nhỏ"], ["tl-van-hanh-research", "Mục 2: hành trạng và bất đồng năm mất"]])],
    biographySections: [
      section("tl-bio-van-hanh-courts", "Một tăng sĩ qua hai triều đại", "Nghiên cứu về Vạn Hạnh ghi nhận vai trò cố vấn của ông dưới thời Lê Hoàn. Với Lý Công Uẩn, sử liệu đặt ông trong mạng lưới Phật giáo Cổ Pháp từ trước cuộc thay ngôi. Mối liên hệ giữa thiền sư và người giữ quân điện tiền là một phần bối cảnh giúp giải thích việc các tăng sĩ hiện diện bên cạnh quan lại trong quá trình nhà Lý hình thành.", [["tl-van-hanh-research", "Mục 2: cố vấn triều Tiền Lê, Cổ Pháp và tôn phò Công Uẩn"], ["tl-ly-annals", "Tờ 1a–1b: Khánh Văn, Vạn Hạnh và Công Uẩn"]], "interpretation"),
      section("tl-bio-van-hanh-oracles", "Sấm báo và việc tôn phò Công Uẩn", "Toàn thư kể vai trò Vạn Hạnh thông qua những lời khuyên và chuyện sấm báo họ Lý thay họ Lê. Những câu chuyện ấy cho thấy cách sử sách diễn đạt tính chính danh của cuộc chuyển triều. Có thể ghi nhận sự ủng hộ chính trị của Vạn Hạnh mà không coi chữ sấm, điềm lạ hoặc dự đoán linh nghiệm là nguyên nhân siêu nhiên đã được chứng minh.", [annals("Tờ 31a–33a: sấm, lời khuyên của Vạn Hạnh và đối thoại Công Uẩn–Cam Mộc")], "interpretation"),
      section("tl-bio-van-hanh-death", "Vì sao hồ sơ giữ hai mốc năm mất?", "Một số bản nghiên cứu dùng năm 1018, gắn với cách hiệu đính Thiền uyển tập anh của Trần Văn Giáp. Nguyễn Công Lý đối chiếu lại với Việt sử lược và mục Thuận Thiên thứ mười sáu trong Toàn thư để chọn năm 1025. Hồ sơ giữ rõ hai phương án và nguồn lập luận, không tự quyết định một ngày mất hoặc quy đổi một ngày âm lịch thành ngày dương lịch.", [["tl-van-hanh-research", "Mục 2: lập luận 1018 và 1025"], ["tl-ly-annals", "Tờ 10a, mục Ất Sửu 1025: sư Vạn Hạnh mất"]], "interpretation"),
    ],
    eventIds: ["ly-lap-trieu-1009"],
  },
  {
    id: "dao-cam-moc",
    periodIds: ["the-ky-x", "ly"],
    name: "Đào Cam Mộc",
    personalName: "Đào Cam Mộc",
    aliases: ["Nghĩa Tín hầu", "Thái sư Á vương Đào Cam Mộc"],
    title: "Đại thần góp phần tôn lập Lý Công Uẩn",
    life: "Chưa rõ năm sinh – 1015",
    contextYear: 1009,
    summaryClaimIds: [passage("tl-bio-cam-moc-summary", "Đào Cam Mộc là quan giữ chức Chi hậu cuối thời Tiền Lê, có vai trò trực tiếp trong việc tôn Lý Công Uẩn lên ngôi năm 1009. Theo Toàn thư, sau khi Long Đĩnh mất, ông khuyên Công Uẩn nhận ngôi và vận động các quan cùng suy tôn. Sang thời Lý, ông được phong Nghĩa Tín hầu và kết hôn với công chúa An Quốc, con gái trưởng của Lý Thái Tổ. Ông mất năm 1015, được truy tặng Thái sư Á vương.", [annals("Tờ 32b–34b: Chi hậu Cam Mộc, tôn lập, phong hầu và hôn nhân"), ["tl-ly-annals", "Mục Ất Mão 1015: Đào Cam Mộc chết, tặng Thái sư Á vương"]])],
    biographySections: [
      section("tl-bio-cam-moc-accession", "Vai trò trong cuộc thay ngôi năm 1009", "Khi ngôi vua để lại cho người con còn nhỏ của Long Đĩnh, Đào Cam Mộc đã khuyến khích Công Uẩn nhận ngôi rồi bàn với các quan để tổ chức suy tôn. Cách thuật của sử cũ nhấn mạnh vai trò vận động và quyết định của con người trong triều đình. Những lời đối thoại dài là lời được sử gia truyền lại, không phải biên bản cuộc họp năm 1009.", [annals("Tờ 32b–33b: khuyên Công Uẩn và vận động khanh sĩ, trăm quan")], "interpretation"),
      section("tl-bio-cam-moc-ly", "Địa vị dưới triều Lý", "Toàn thư ghi Lý Thái Tổ gả công chúa An Quốc cho Đào Cam Mộc và phong ông làm Nghĩa Tín hầu. Quan hệ hôn nhân với công chúa được ghi riêng với việc ông ủng hộ tôn lập nhà vua; không thể từ sự gắn bó chính trị mà suy thành quan hệ cha con. Khi ông mất năm 1015, tước Thái sư Á vương là sự truy tặng sau khi qua đời.", [annals("Tờ 34b: gả An Quốc và phong Nghĩa Tín hầu"), ["tl-ly-annals", "Tờ 6b–7a, mục 1015: mất và truy tặng"]]),
    ],
    eventIds: ["ly-lap-trieu-1009"],
  },
];

const event = (
  id: string,
  name: string,
  year: number,
  places: string[],
  persons: string[],
  context: string,
  development: string,
  result: string,
  consequence: string,
  precisionNote: string,
): HistoricalEvent => ({
  id,
  periodIds: ["the-ky-x"],
  name,
  date: date(year, year, String(year)),
  placeIds: places,
  personIds: persons,
  contextClaimIds: [context],
  developmentClaimIds: [development],
  resultClaimIds: [result],
  consequence,
  consequenceKind: "editorial-question",
  precisionNote,
});

const c = tienLeClaimIds;
export const tienLeEvents: HistoricalEvent[] = [
  event("le-len-ngoi-980", "Lê Hoàn lên ngôi, nhà Tiền Lê bắt đầu", 980, ["hoa-lu"], ["le-dai-hanh", "duong-van-nga", "dinh-phe-de", "pham-cu-luong"], c.accessionContext, c.accession, c.accessionResult, "Vì sao nhu cầu chỉ huy chiến tranh có thể làm thay đổi ngôi vua?", "Mốc năm 980 theo các bảng thế thứ và Toàn thư; phân biệt việc nhận ngôi với tranh luận về năm đầu niên hiệu Thiên Phúc."),
  event("le-chong-tong-981", "Lê Hoàn lãnh đạo kháng chiến chống Tống", 981, ["le-bach-dang-981", "le-chi-lang-981"], ["le-dai-hanh", "pham-cu-luong"], c.warContext, c.warCampaign, c.warResult, "Bảo vệ nền tự chủ cần kết hợp chiến trường và ngoại giao như thế nào?", "Dùng mốc năm 981. Các nguồn giải thích khác về địa điểm Hầu Nhân Bảo chết và trình tự trận đánh; không đặt một tọa độ quyết chiến hoặc lấy trận 938 thay cho diễn biến 981."),
  event("le-champa-982", "Chiến dịch của Lê Hoàn vào Champa", 982, ["bien-gioi-champa-982"], ["le-dai-hanh"], c.champaContext, c.champa, c.champaResult, "Chiến tranh ảnh hưởng thế nào tới cư dân, triều đình và giao lưu giữa hai nước?", "Năm 982 theo sử Việt. Địa bàn chiến dịch chưa được xác định thành một điểm hoặc đường hành quân trong dữ liệu; không suy một thay đổi biên giới chính xác."),
  event("le-tich-dien-987", "Lê Hoàn cày tịch điền ở Đọi Sơn", 987, ["doi-son"], ["le-dai-hanh"], c.agricultureContext, c.agriculture, c.agricultureResult, "Một nghi lễ của nhà vua có thể gửi gắm thông điệp gì về việc làm ruộng?", "Năm 987 được giữ theo Toàn thư và nghiên cứu đối chiếu; cách đếm năm Thiên Phúc khác giữa truyền bản. Ảnh lễ hội ngày nay là phục dựng."),
  event("le-ngoai-giao-987", "Pháp Thuận và Khuông Việt tham gia tiếp sứ", 987, ["hoa-lu"], ["le-dai-hanh", "do-phap-thuan", "ngo-chan-luu"], c.diplomacyContext, c.diplomacy, c.diplomacyResult, "Văn chương có thể trở thành một hình thức bang giao như thế nào?", "Năm 987 và tên Lý Giác theo Toàn thư; Thiền uyển tập anh có cách chép tên, niên hiệu khác. Hoa Lư biểu thị triều đình tổ chức tiếp sứ, không phải tọa độ bến đò trong câu chuyện."),
  event("le-ke-vi-1005", "Tranh ngôi sau khi Lê Hoàn mất", 1005, ["hoa-lu"], ["le-dai-hanh", "le-trung-tong", "le-long-dinh", "ly-thai-to"], c.successionContext, c.succession, c.successionResult, "Vì sao việc chọn thái tử chưa đủ để bảo đảm chuyển giao quyền lực yên ổn?", "Ba ngày giữ ngôi Trung Tông và cuộc tranh chấp kéo dài trong năm 1005 là cách thuật của sử liệu; không tự quy đổi thành ngày dương lịch."),
  event("le-doi-quan-che-1006", "Long Đĩnh điều chỉnh quan chế và triều phục", 1006, ["hoa-lu"], ["le-long-dinh"], c.institutionsContext, c.institutions, c.institutionsResult, "Tiếp nhận thể thức bên ngoài khác gì với từ bỏ quyền tự chủ?", "Năm 1006 theo mục Bính Ngọ của Toàn thư. Các niên biểu thời Tiền Lê có vấn đề về niên hiệu; không tự sửa mọi mốc sang cùng một hệ."),
  event("le-thinh-kinh-1007", "Sứ bộ thời Long Đĩnh xin kinh Đại Tạng", 1007, ["hoa-lu"], ["le-long-dinh"], c.scripturesContext, c.scriptures, c.scripturesResult, "Qua sứ bộ, kinh sách có thể đi vào đời sống văn hóa Đại Cồ Việt ra sao?", "Mốc xin kinh 1007 và mục Minh Xưởng trở về 1009 theo Toàn thư. Không tự khẳng định số bộ kinh nhận đủ hoặc gán một hiện vật hiện còn cho sứ bộ này."),
];

const reigns: [string, string, number, number, string, string][] = [
  ["le-dai-hanh", "Lê Đại Hành", 980, 1005, "980–1005", c.accessionResult],
  ["le-trung-tong", "Lê Trung Tông", 1005, 1005, "1005 · ba ngày theo sử liệu", c.succession],
  ["le-long-dinh", "Lê Long Đĩnh", 1005, 1009, "1005–1009", c.successionResult],
];
export const tienLeTenures: RoleTenure[] = reigns.map(([personId, name, start, end, label, reignClaim]) => ({
  id: `tl-tenure-${personId}`,
  periodId: "the-ky-x",
  dynastyId: "tien-le-dynasty",
  polityId: "dai-co-viet",
  personId,
  role: "reigning",
  label: `Hoàng đế · ${name}`,
  date: date(start, end, label),
  claimIds: [reignClaim],
}));

const relationship = (
  id: string,
  from: string,
  to: string,
  type: Relationship["type"],
  label: string,
  text: string,
  refs: Ref[],
  at?: Relationship["date"],
): Relationship => ({
  id,
  from,
  to,
  type,
  label,
  claimIds: [passage(`${id}-claim`, text, refs)],
  status: refs.length > 1 ? "cross-referenced" : "draft",
  ...(at ? { date: at } : {}),
});

export const tienLeRelationships: Relationship[] = [
  relationship("tl-rel-dinh-duong-marriage", "dinh-bo-linh", "duong-van-nga", "marriage", "Hôn nhân thời Đinh", "Dương hậu là vợ Đinh Tiên Hoàng và mẹ Đinh Toàn. Quan hệ này được Toàn thư ghi lại khi thuật việc Lê Hoàn lập bà làm hoàng hậu năm 982.", [annals("Tờ 15b–16a: Dương thị, vợ Tiên Hoàng và mẹ Vệ vương Toàn")]),
  relationship("tl-rel-duong-toan", "duong-van-nga", "dinh-phe-de", "parent", "Mẹ – con", "Dương thái hậu là mẹ đẻ của Đinh Toàn. Khi Toàn lên ngôi sau biến cố 979, bà trở thành thái hậu; bà sau đó chấp thuận việc tôn Lê Hoàn năm 980.", [annals("Tờ 15b: Dương thị là mẹ Vệ vương Toàn"), ["nd-annals-dinh", "Tờ 7b–10a: vua nhỏ và thái hậu"]]),
  relationship("tl-rel-le-duong-marriage", "le-dai-hanh", "duong-van-nga", "marriage", "Lập hoàng hậu · 982", "Toàn thư ghi năm 982 Lê Hoàn lập Dương thị, nguyên là hoàng thái hậu nhà Đinh, làm Đại Thắng Minh hoàng hậu. Đây là mốc lập hậu được sử chép, không dùng để suy một ngày cưới chính xác.", [annals("Tờ 15b–16a, Nhâm Ngọ 982")], date(982, 982, "Lập hoàng hậu năm 982")),
  relationship("tl-rel-le-trung-tong-parent", "le-dai-hanh", "le-trung-tong", "parent", "Cha – con", "Lê Long Việt là con Lê Hoàn, mẹ là Chi hậu Diệu Nữ theo Toàn thư và Thế thứ; không gán Dương hậu làm mẹ Long Việt.", [annals("Tờ 25b: Trung Tông"), genealogy("Mục Lê Trung Tông")]),
  relationship("tl-rel-le-long-dinh-parent", "le-dai-hanh", "le-long-dinh", "parent", "Cha – con", "Lê Long Đĩnh là con Lê Hoàn, em cùng mẹ của Lê Long Việt. Nguồn Thế thứ ghi mẹ hai người là Chi hậu Diệu Nữ.", [annals("Tờ 25b–26b: Trung Tông và Long Đĩnh"), genealogy("Mục Lê Trung Tông và Lê Ngọa Triều")]),
  relationship("tl-rel-le-brothers", "le-trung-tong", "le-long-dinh", "sibling", "Anh em cùng mẹ", "Long Việt và Long Đĩnh là anh em cùng mẹ; quan hệ ruột thịt không ngăn được cuộc tranh chấp kế vị năm 1005.", [annals("Tờ 25b–26a"), genealogy("Mục Lê Trung Tông")]),
  relationship("tl-rel-dinh-le-succession", "dinh-phe-de", "le-dai-hanh", "succession", "Thay ngôi · 980", "Năm 980, Lê Hoàn được tôn lên ngôi, còn Đinh Toàn bị giáng làm Vệ vương. Đây là chuyển giao từ nhà Đinh sang nhà Tiền Lê, không phải quan hệ cha con.", [["nd-annals-dinh", "Tờ 10a: tôn Lê Hoàn và giáng Vệ vương"], genealogy("Mục Lê Hoàn")], date(980, 980, "980")),
  relationship("tl-rel-hoan-viet-succession", "le-dai-hanh", "le-trung-tong", "succession", "Kế vị · 1005", "Long Việt giữ ngôi sau khi Lê Hoàn mất năm 1005, giữa lúc các hoàng tử tranh quyền.", [annals("Tờ 24b–26a"), genealogy("Mục Lê Trung Tông")], date(1005, 1005, "1005")),
  relationship("tl-rel-viet-dinh-succession", "le-trung-tong", "le-long-dinh", "succession", "Giành ngôi · 1005", "Toàn thư chép Long Đĩnh giết Long Việt rồi lên ngôi năm 1005. Cạnh kế vị này chỉ trình tự giữ ngôi, không biểu thị một cuộc truyền ngôi tự nguyện.", [annals("Tờ 26a–26b"), genealogy("Mục Lê Ngọa Triều")], date(1005, 1005, "1005")),
  relationship("tl-rel-le-ly-succession", "le-long-dinh", "ly-thai-to", "succession", "Chuyển triều · 1009", "Sau khi Long Đĩnh mất năm 1009, Lý Công Uẩn được tôn lên ngôi. Cuộc chuyển từ nhà Tiền Lê sang nhà Lý diễn ra ở Hoa Lư.", [annals("Tờ 30b–34b"), ["the-thu", "Chương 4, phần I: mở đầu triều Lý 1009"]], date(1009, 1009, "1009")),
  relationship("tl-rel-pham-hoan", "pham-cu-luong", "le-dai-hanh", "political", "Ủng hộ tôn lập", "Phạm Cự Lạng cùng các tướng đề nghị tôn Lê Hoàn lên ngôi trước khi xuất quân chống Tống năm 980.", [["nd-annals-dinh", "Tờ 9b–10a"], ["tl-dai-hanh-museum", "Đoạn Phạm Cự Lạng đề nghị tôn lập"]], date(980, 980, "980")),
  relationship("tl-rel-duong-hoan", "duong-van-nga", "le-dai-hanh", "political", "Chấp thuận tôn lập", "Dương thái hậu chấp thuận đề nghị của các tướng và cho khoác áo long cổn lên Lê Hoàn trong cuộc thay ngôi năm 980.", [["nd-annals-dinh", "Tờ 10a"], ["tl-dai-hanh-museum", "Đoạn Dương thái hậu chấp thuận"]], date(980, 980, "980")),
  relationship("tl-rel-phap-thuan-hoan", "do-phap-thuan", "le-dai-hanh", "political", "Văn thư và bang giao", "Pháp Thuận được Lê Hoàn giao việc văn hàn và tham gia tiếp sứ; ông là một tăng sĩ giúp việc triều đình, không phải thành viên hoàng tộc.", [["tl-phap-thuan-research", "Mục 1: văn hàn, tiếp sứ và việc nước"], annals("Tờ 18a–18b")]),
  relationship("tl-rel-khuong-viet-dinh", "ngo-chan-luu", "dinh-bo-linh", "political", "Tăng thống triều Đinh", "Thiền uyển tập anh ghi Khuông Việt được Đinh Tiên Hoàng phong làm Tăng thống và ban hiệu. Quan hệ này là chức vụ và sự cộng tác trong việc nước.", [["tl-khuong-viet-research", "Trang 14–16: chức Tăng thống và danh hiệu"]]),
  relationship("tl-rel-khuong-viet-hoan", "ngo-chan-luu", "le-dai-hanh", "political", "Tham gia tiếp sứ", "Lê Hoàn giao Khuông Việt xem thơ sứ Tống và soạn bài từ tiễn sứ, theo mục năm 987 của Toàn thư.", [annals("Tờ 18b–19a"), ["tl-khuong-viet-research", "Phần về văn bản tiễn Lý Giác"]]),
  relationship("tl-rel-long-dinh-cong-uan", "le-long-dinh", "ly-thai-to", "political", "Bổ dụng quân điện tiền", "Long Đĩnh bổ dụng Lý Công Uẩn sau biến cố Trung Tông năm 1005. Cuối triều Tiền Lê, Công Uẩn giữ chức Tả thân vệ điện tiền chỉ huy sứ.", [annals("Tờ 26a và 32a–32b"), ["ly-toan-thu-thai-to", "Bản kỷ II, tờ 1a–1b: chức vụ của Công Uẩn dưới thời Tiền Lê"]]),
  relationship("tl-rel-van-hanh-cong-uan", "van-hanh", "ly-thai-to", "political", "Ủng hộ tôn lập", "Vạn Hạnh khuyến khích Lý Công Uẩn nhận ngôi; mối quan hệ này thể hiện sự tôn phò và cố vấn, không xác nhận huyết thống giữa hai người.", [annals("Tờ 31a–33a: Vạn Hạnh và lời khuyên Công Uẩn"), ["the-thu", "Chương 4, phần I: Vạn Hạnh và Cam Mộc tôn phò 1009"]], date(1009, 1009, "1009")),
  relationship("tl-rel-cam-moc-cong-uan", "dao-cam-moc", "ly-thai-to", "political", "Vận động tôn lập", "Đào Cam Mộc khuyên Lý Công Uẩn nhận ngôi và vận động các quan tổ chức suy tôn năm 1009.", [annals("Tờ 32b–33b"), ["the-thu", "Chương 4, phần I: Cam Mộc và Vạn Hạnh"]], date(1009, 1009, "1009")),
  relationship("tl-rel-van-hanh-hoan", "van-hanh", "le-dai-hanh", "political", "Cố vấn triều Tiền Lê", "Nghiên cứu về Vạn Hạnh ghi nhận thiền sư tham gia cố vấn dưới thời Lê Hoàn; những chuyện dự đoán chiến tranh trong hành trạng không được coi là bằng chứng tiên tri.", [["tl-van-hanh-research", "Mục 2: Vạn Hạnh dưới triều Tiền Lê"]]),
];

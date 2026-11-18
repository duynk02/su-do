import {
  date,
  type HistoricalEvent,
  type Relationship,
  type RoleTenure,
  type Source,
} from "../../schema";
import { claim, type Ref } from "../../claim-store";

const source = (
  entry: Pick<
    Source,
    "id" | "title" | "publisher" | "url" | "type" | "readLocation" | "limits"
  > &
    Partial<Pick<Source, "author" | "year" | "upstream">>,
): Source => ({
  author: null,
  year: null,
  edition: null,
  upstream: null,
  accessed: "2026-11-17",
  ...entry,
});

export const lyEarlySources: Source[] = [
  source({
    id: "ly-toan-thu-thai-to",
    title: "Đại Việt sử ký toàn thư — Lý Thái Tổ hoàng đế",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/29-Thai-To-Hoang-De?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ, quyển II",
    readLocation:
      "Tờ 1a: tên Công Uẩn, Cổ Pháp, mẹ họ Phạm, việc làm quan Tiền Lê và được Khánh Văn nuôi dạy.",
    limits:
      "Chưa xác nhận đủ ấn bản và dịch giả của phần dịch trên trang. Chuyện thần nhân và điềm sinh nở thuộc lớp truyền thuyết; không dùng để xác định cha đẻ. Không tự chuyển lịch.",
  }),
  source({
    id: "ly-toan-thu-thai-tong",
    title: "Đại Việt sử ký toàn thư — Lý Thái Tông hoàng đế",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/30-Thai-Tong-Hoang-De?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ, quyển II",
    readLocation:
      "Tờ 18a: Phật Mã/Đức Chính, con Thái Tổ và hoàng hậu họ Lê; sinh năm 1000, nối ngôi năm 1028, mất năm 1054.",
    limits:
      "Chỉ dùng quan hệ và mốc năm đã đọc. Không suy họ tên đầy đủ của mẹ từ chữ Lê thị. Tuổi trong sử không đồng nhất với tuổi dương lịch; chưa xác nhận đủ ấn bản bản dịch.",
  }),
  source({
    id: "ly-toan-thu-thanh-tong",
    title: "Đại Việt sử ký toàn thư — Lý Thánh Tông hoàng đế",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/31-Thanh-Tong-Hoang-De?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ, quyển III",
    readLocation:
      "Tờ 1a: Nhật Tôn, cha Thái Tông, mẹ Kim Thiên thái hậu họ Mai, sinh năm 1023, làm thái tử năm 1028.",
    limits:
      "Thứ bậc con của Thái Tông khác nhau giữa Toàn thư và Việt sử lược; hồ sơ chỉ dùng quan hệ cha–con. Chuyện mơ thấy trăng là truyền thuyết. Chưa xác nhận đủ ấn bản bản dịch.",
  }),
  source({
    id: "ly-toan-thu-nhan-tong",
    title: "Đại Việt sử ký toàn thư — Lý Nhân Tông hoàng đế",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/32-Nhan-Tong-Hoang-De?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ, quyển III",
    readLocation:
      "Tờ 6b: Càn Đức, cha Thánh Tông, mẹ Linh Nhân; đầu triều Thượng Dương thái hậu và Lý Đạo Thành giúp việc chính sự.",
    limits:
      "Không lược bỏ vai trò Thượng Dương để coi Ỷ Lan là người duy nhất phụ chính từ đầu. Niên đại dùng quy ước nguồn, không tự đổi ngày âm sang Tây lịch. Chưa xác nhận đủ ấn bản bản dịch.",
  }),
  source({
    id: "ly-thang-long-exhibition",
    title: "Kinh đô mãi muôn đời — quê hương nhà Lý và quyết định dời đô",
    publisher: "Trung tâm Bảo tồn Di sản Thăng Long–Hà Nội",
    url: "https://trungbayonline.hoangthanhthanglong.vn/GpThuDo/Index",
    type: "heritage",
    readLocation:
      "Các mục Quê hương nhà Lý; Đức vua Lý Công Uẩn và quyết định dời đô.",
    limits:
      "Trưng bày có cả truyền thuyết về gia thế. Chỉ dùng việc dời đô năm 1010 và đổi Đại La thành Thăng Long; ảnh hiện trạng không phải nguyên trạng công trình thời Lý.",
  }),
  source({
    id: "ly-thanh-tong-vanmieu",
    title: "Vua Lý Thánh Tông (1023–1072)",
    publisher: "Trung tâm Hoạt động Văn hóa Khoa học Văn Miếu–Quốc Tử Giám",
    url: "https://vanmieu.gov.vn/vi/ly-thanh-tong",
    type: "heritage",
    readLocation:
      "Toàn bộ phần tiểu sử ngắn: Nhật Tôn, ngôi vua 1054–1072, quốc hiệu Đại Việt, Văn Miếu 1070 và tượng thờ năm 2003.",
    limits:
      "Những nhận xét vua sáng là diễn giải giới thiệu di sản. Tượng ở Hậu đường được đúc năm 2003, không phải chân dung đương thời.",
  }),
  source({
    id: "ly-vanmieu-history",
    title: "Lịch sử di tích Văn Miếu–Quốc Tử Giám",
    publisher: "Trung tâm Hoạt động Văn hóa Khoa học Văn Miếu–Quốc Tử Giám",
    url: "https://www.vanmieu.gov.vn/vi/introduction/site-history",
    type: "heritage",
    readLocation:
      "Mục Thời Lý (1009–1225): Văn Miếu 1070, khoa thi 1075, Quốc Tử Giám 1076.",
    limits:
      "Dùng ba mốc riêng biệt. Không đồng nhất Quốc Tử Giám thời trung đại với mô hình đại học hiện nay.",
  }),
  source({
    id: "ly-vanmieu-dsvh",
    title: "Di tích lịch sử và kiến trúc nghệ thuật Văn Miếu–Quốc Tử Giám",
    publisher: "Cục Di sản văn hóa",
    url: "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953",
    type: "heritage",
    readLocation:
      "Các đoạn mở đầu: dựng Văn Miếu năm 1070, lập Quốc Tử Giám năm 1076; kiến trúc thời Lê–Nguyễn và khu Thái Học phục dựng.",
    limits:
      "Di tích đã thay đổi qua nhiều thời kỳ. Không dùng ảnh Khuê Văn Các hay nhà Thái Học hiện nay để phục dựng nguyên dạng thế kỷ XI.",
  }),
  source({
    id: "ly-institutions",
    title: "Thể chế chính trị ở Việt Nam thế kỷ XI–XIII dưới thời Lý",
    author: "Trần Thị Vinh",
    publisher: "Bảo tàng Lịch sử Quốc gia — tham luận của Viện Sử học",
    year: 2010,
    url: "https://baotanglichsu.vn/vi/Articles/3096/7063/the-che-chinh-tri-o-viet-nam-the-ky-xi-xiii-duoi-thoi-ly.html",
    type: "research",
    upstream:
      "Tham luận Hội thảo Quốc tế Việt Nam học lần thứ ba; Bảo tàng Nhân học",
    readLocation:
      "Mở đầu về nhà Lý năm 1009; mục 3 Xây dựng nền pháp chế quốc gia, chú thích 86–91 về Hình thư năm 1042.",
    limits:
      "Hình thư đã thất truyền. Chỉ mô tả việc san định và ban hành năm 1042; không khẳng định mọi thời kỳ trước không có luật thành văn hoặc dựng lại các điều luật đã mất.",
  }),
  source({
    id: "ly-nhan-tong-museum",
    title: "Lý Nhân Tông — ông vua có nhiều kỷ lục",
    author: "Tiến Đức",
    publisher: "Bảo tàng Lịch sử Quốc gia — bài đăng lại",
    year: 2010,
    url: "https://baotanglichsu.vn/vi/Articles/2001/65227/ly-nhan-tong-ong-vua-co-nhieu-ky-luc.html",
    type: "reference",
    upstream: "baodatviet.vn",
    readLocation:
      "Đoạn Càn Đức sinh năm 1066, cha mẹ, lên ngôi khi nhỏ; khoa thi 1075 và chiến tranh thời Nhân Tông.",
    limits:
      "Bài gộp Văn Miếu và Quốc Tử Giám vào năm 1076; dùng niên đại riêng của đơn vị di tích thay cho chỗ đó. Không gán học vị Trạng nguyên của các thời sau cho khoa thi 1075.",
  }),
  source({
    id: "ly-y-lan-vass",
    title: "Nguyên phi Ỷ Lan với vương triều Lý",
    publisher: "Viện Hàn lâm Khoa học xã hội Việt Nam",
    year: 2026,
    url: "https://vass.gov.vn/nghien-cuu-khoa-hoc/nguyen-phi-y-lan-voi-vuong-trieu-ly-583776",
    type: "research",
    readLocation:
      "Các đoạn thân thế, việc điều hành năm 1069, triều Nhân Tông, bảo vệ sức kéo năm 1117; chú thích 1 về năm sinh chưa rõ.",
    limits:
      "Không coi năm sinh 1044 trên tượng đài là niên đại chắc chắn. Chỉ dùng việc coi triều năm 1069, không dùng đoạn có trình tự bắt Chế Củ thiếu nhất quán hoặc số tù binh. Không dùng để kết luận riêng vụ Thượng Dương.",
  }),
  source({
    id: "ly-thuong-kiet-hien-than",
    title: "Hiền thần Lý Thường Kiệt",
    author: "Lan Châu",
    publisher: "Bảo tàng Lịch sử Quốc gia — bài đăng lại",
    year: 2010,
    url: "https://baotanglichsu.vn/VI/Articles/3096/6644/hien-than-ly-thuong-kiet.html",
    type: "reference",
    upstream: "Hà Nội Mới",
    readLocation:
      "Các đoạn tên Ngô Tuấn, ban quốc tính; chiến dịch 1069, 1075–1077 và giảng hòa; mất năm 1105.",
    limits:
      "Nguồn phổ thông. Không suy phả hệ với Ngô Quyền chỉ từ tên họ, không khẳng định tác giả Nam quốc sơn hà. Những số quân và ngày chuyển lịch không được dùng trong nội dung hiện tại.",
  }),
  source({
    id: "ly-thuong-kiet-campaign",
    title:
      "Lý Thường Kiệt, người chỉ huy kiệt xuất của cuộc kháng chiến chống quân Tống lần thứ hai",
    author: "Lê Thị Huệ (tổng hợp)",
    publisher: "Bảo tàng Lịch sử Quốc gia",
    year: 2014,
    url: "https://baotanglichsu.vn/VI/Articles/3098/16192/ly-thuong-kiet-nguoi-chi-huy-kiet-xuat-cua-cuoc-khang-chien-chong-quan-tong-lan-thu-hai.html",
    type: "museum",
    upstream:
      "Bài tổng hợp dẫn các sách của Đỗ Đức Hùng, Đinh Xuân Lâm, Nguyễn Lân và NXB Giáo Dục",
    readLocation:
      "Các đoạn chiến dịch 1069, Nhân Tông lên ngôi 1072, tiến công 1075, phòng tuyến 1076–1077, giảng hòa và hoạt động cuối đời.",
    limits:
      "Bài có lỗi Thái Tổ nhận con nuôi năm 1041; không sử dụng chi tiết đó. Chỉ dùng trình tự chiến dịch được đối chiếu; không lấy lời quy tác giả bài thơ làm kết luận chắc chắn.",
  }),
  source({
    id: "ly-hxh",
    title: "Lý Thường Kiệt: Lịch sử ngoại giao và tông giáo triều Lý",
    author: "Hoàng Xuân Hãn",
    publisher: "Bản chuyển dạng lưu tại cổng Quản lý giáo dục",
    url: "https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/1/1222/UserFiles/Ly-Thuong-Kiet---Lich-Su-Ngoai-Giao-Va-Tong-Giao-Trieu-Ly---Hoang-Xuan-Han-3ba47d31-d3c5-438f-bb5d-bb3223612a3e.pdf",
    type: "research",
    readLocation:
      "Tựa, trang PDF 1–3 về chiến tranh và ngoại giao; trang PDF 154–155 về truyền thống bài thơ thần.",
    limits:
      "Chưa xác nhận đủ ấn bản của bản chuyển dạng. Không lặp lại phán xét văn hóa trong lời tựa; không dựng ranh giới ba châu từ mô tả văn bản. Đánh giá nguyên nhân là luận giải của tác giả.",
  }),
  source({
    id: "ly-le-van-thinh",
    title: "Đệ nhất khai khoa của Việt Nam",
    author: "Đinh Văn Niêm",
    publisher: "Bảo tàng Lịch sử Quốc gia — bài đăng lại",
    year: 2010,
    url: "https://baotanglichsu.vn/vi/Articles/2001/65112/dje-nhat-khai-khoa-cua-viet-nam.html",
    type: "reference",
    upstream: "bee.net.vn",
    readLocation:
      "Các đoạn khoa thi 1075, hầu vua học, đàm phán Vĩnh Bình 1084, chức Thái sư 1085 và vụ án Hồ Tây 1096.",
    limits:
      "Chuyện hóa hổ là yếu tố truyền thuyết. Bài ghi mất năm 1096 nhưng chưa đủ đối chiếu nên hồ sơ không chốt năm mất. Không dùng danh hiệu Trạng nguyên như học vị chính thức của khoa thi 1075.",
  }),
  source({
    id: "ly-nam-quoc-research",
    title:
      "Bài thơ Nam quốc sơn hà là bản tuyên ngôn độc lập đầu tiên của nước Việt Nam ta",
    author: "Lê Văn Quán",
    publisher: "Tạp chí Hán Nôm — Viện Nghiên cứu Hán Nôm",
    year: 2006,
    url: "https://hannom.vass.gov.vn/nghien-cuu-van-ban/bai-tho-nam-quoc-son-ha-la-ban-tuyen-ngon-doc-lap-dau-tien-cua-nuoc-viet-nam-ta-tap-chi-han-nom-so--504984",
    type: "research",
    upstream: "Tạp chí Hán Nôm, số 1 (74), 2006, trang 3–8",
    readLocation:
      "Phần mở đầu về bài thơ khuyết danh và hai dị bản; đoạn bàn việc không xác định được trình tự hình thành các bản.",
    limits:
      "Tác giả nêu các giả thuyết về quá trình truyền tụng; không coi chúng là diễn biến đã xác lập. Chỉ dùng tính khuyết danh và sự tồn tại của nhiều dị bản.",
  }),
  source({
    id: "ly-dao-thanh",
    title: "Tác giả của kỳ thi tuyển hiền tài đầu tiên nước Việt",
    publisher: "Ủy ban Nhà nước về người Việt Nam ở nước ngoài — Quê hương",
    year: 2010,
    url: "https://scov.gov.vn/dat-nuoc-con-nguoi/con-nguoi-viet-nam/tac-gia-cua-ky-thi-tuyen-hien-tai-dau-tien-nuoc-viet.html",
    type: "reference",
    upstream: "Đại Đoàn Kết",
    readLocation:
      "Các đoạn Thái sư thời Thánh Tông, vào Nghệ An, trở lại coi nội trị thời Nhân Tông, mất tháng 10 năm Tân Dậu (1081).",
    limits:
      "Năm sinh 1009/1010 và giả thuyết chính ông tổ chức khoa thi 1075 là suy đoán của tác giả bài, không dùng làm dữ kiện đã xác lập.",
  }),
];

const references = {
  foundation: [
    [
      "the-thu",
      "Chương 4, phần II.1: lên ngôi tháng 10 năm Kỷ Dậu (1009), niên hiệu từ 1010",
    ],
    ["ly-institutions", "Mở đầu: triều Lý thành lập năm 1009"],
  ] as Ref[],
  capital: [
    ["ly-thang-long-exhibition", "Đức vua Lý Công Uẩn và quyết định dời đô"],
    ["the-thu", "Chương 4, phần I: dời đô ra Thăng Long"],
  ] as Ref[],
  law: [
    [
      "ly-institutions",
      "Mục 3, chú thích 86–88: Hình thư năm 1042 và văn bản đã thất truyền",
    ],
  ] as Ref[],
  name: [
    ["ly-thanh-tong-vanmieu", "Tiểu sử: đặt quốc hiệu Đại Việt"],
    ["the-thu", "Chương 4, phần I: quốc hiệu Đại Việt từ năm 1054"],
  ] as Ref[],
  champa: [
    ["ly-hxh", "Tựa, trang PDF 2: Thánh Tông, Thường Kiệt, Chế Củ và ba châu"],
    ["ly-thuong-kiet-campaign", "Đoạn về chiến dịch năm 1069"],
  ] as Ref[],
  education: [
    ["ly-vanmieu-history", "Thời Lý: các mốc 1070, 1075, 1076"],
    ["ly-vanmieu-dsvh", "Mở đầu: Văn Miếu 1070 và Quốc Tử Giám 1076"],
  ] as Ref[],
  war: [
    [
      "ly-thuong-kiet-campaign",
      "Các đoạn tiến công Ung–Khâm–Liêm, phòng tuyến Như Nguyệt và giảng hòa",
    ],
    ["ly-hxh", "Tựa, trang PDF 1–3: tiến công, phòng thủ và ngoại giao"],
  ] as Ref[],
};

export const lyEarlyClaimIds = {
  foundationContext: claim(
    "ly-foundation-context",
    "Lý Công Uẩn từng giữ chức Điện tiền chỉ huy sứ trong triều Tiền Lê. Khi Lê Long Đĩnh qua đời, việc chọn người nối ngôi mở ra một cuộc chuyển giao quyền lực.",
    [
      [
        "ly-toan-thu-thai-to",
        "Quyển II, tờ 1a: chức vụ và việc lên ngôi sau Ngọa Triều",
      ],
      ...references.foundation,
    ],
  ),
  foundationDevelopment: claim(
    "ly-foundation-development",
    "Năm 1009, Lý Công Uẩn được tôn lên ngôi, mở đầu triều Lý. Sang năm 1010, ông đặt niên hiệu Thuận Thiên; vì thế một số bảng niên đại lấy 1010 làm năm đầu đời vua.",
    references.foundation,
  ),
  foundationResult: claim(
    "ly-foundation-result",
    "Triều đại mới ban đầu vẫn đặt trung tâm tại Hoa Lư, tiếp nhận bộ máy của nhà Tiền Lê trước khi xây dựng kinh đô mới.",
    [
      ["ly-institutions", "Các đoạn mở đầu về tiếp nhận thể chế cũ tại Hoa Lư"],
      ["ly-thang-long-exhibition", "Đức vua Lý Công Uẩn và quyết định dời đô"],
    ],
  ),
  capitalContext: claim(
    "ly-capital-context",
    "Sau khi lên ngôi tại Hoa Lư, Lý Thái Tổ chọn Đại La làm nơi đặt triều đình. Vị trí đồng bằng, sông ngòi và khả năng mở rộng được nêu trong Chiếu dời đô như những lý do của sự lựa chọn này.",
    [["ly-thang-long-exhibition", "Đức vua Lý Công Uẩn và quyết định dời đô"]],
  ),
  capitalDevelopment: claim(
    "ly-capital-development",
    "Mùa thu năm 1010, triều đình chuyển từ Hoa Lư đến Đại La và đổi tên kinh đô mới là Thăng Long.",
    references.capital,
  ),
  capitalResult: claim(
    "ly-capital-result",
    "Thăng Long từ đây trở thành trung tâm của vương triều Lý. Quyết định định đô gắn việc củng cố triều đại với một không gian phát triển rộng hơn vùng núi Hoa Lư.",
    [
      [
        "ly-thang-long-exhibition",
        "Phần về quyết định định đô và vai trò kinh đô mới",
      ],
    ],
    { kind: "interpretation" },
  ),
  lawContext: claim(
    "ly-law-context",
    "Sử liệu được nghiên cứu dẫn lại mô tả việc kiện tụng trước đó phức tạp, có trường hợp quan xét xử quá khắc nghiệt. Triều đình muốn sắp xếp luật lệnh để việc xét án có căn cứ rõ hơn.",
    references.law,
    { kind: "chronicle" },
  ),
  lawDevelopment: claim(
    "ly-law-development",
    "Năm 1042, Lý Thái Tông cho san định luật lệnh và ban hành Hình thư. Đây là một dấu mốc xây dựng pháp luật của triều Lý.",
    references.law,
  ),
  lawResult: claim(
    "ly-law-result",
    "Hình thư đã thất truyền. Những hiểu biết hiện nay về pháp luật thời Lý chủ yếu phải dựa vào các ghi chép và luật lệnh còn được sử sách dẫn lại.",
    references.law,
  ),
  nameContext: claim(
    "ly-name-context",
    "Năm 1054, Lý Nhật Tôn nối ngôi Lý Thái Tông, trở thành vua Lý Thánh Tông.",
    [
      ["the-thu", "Chương 4, phần II.3: Lý Thánh Tông"],
      ["ly-thanh-tong-vanmieu", "Đoạn đầu tiểu sử"],
    ],
  ),
  nameDevelopment: claim(
    "ly-name-development",
    "Khi lên ngôi năm 1054, Lý Thánh Tông đặt quốc hiệu Đại Việt, thay cho tên Đại Cồ Việt.",
    references.name,
  ),
  nameResult: claim(
    "ly-name-result",
    "Đại Việt là quốc hiệu được sử dụng trong phần còn lại của thời Lý và tiếp tục dưới triều Trần. Quốc hiệu và tên triều đại vì thế không phải hai cách gọi tương đương.",
    [
      [
        "the-thu",
        "Chương 4, phần I; chương 5, phần I: quốc hiệu thời Lý và Trần",
      ],
    ],
  ),
  champaContext: claim(
    "ly-champa-context",
    "Dưới thời Lý Thánh Tông, quan hệ với Champa ở phía nam bao gồm cả giao thiệp lẫn chiến tranh. Năm 1069, nhà vua tổ chức một cuộc tiến quân lớn.",
    references.champa,
  ),
  champaDevelopment: claim(
    "ly-champa-development",
    "Lý Thánh Tông thân chinh, Lý Thường Kiệt chỉ huy quân trong chiến dịch năm 1069. Vua Champa Chế Củ bị bắt; trong thời gian vua đi xa, Ỷ Lan trông coi việc triều chính.",
    [
      ...references.champa,
      ["ly-y-lan-vass", "Đoạn việc điều hành triều chính năm 1069"],
    ],
  ),
  champaResult: claim(
    "ly-champa-result",
    "Sau chiến dịch, Chế Củ nhượng ba châu Địa Lý, Ma Linh và Bố Chính để được trở về. Sự chuyển giao này làm thay đổi quan hệ và không gian biên giới phía nam của Đại Việt.",
    [
      [
        "ly-hxh",
        "Tựa, trang PDF 2: vua Champa được tha và Đại Việt nhận ba châu",
      ],
      [
        "ly-y-lan-vass",
        "Đoạn tháng 7 năm 1069: ba châu Địa Lý, Ma Linh, Bố Chính",
      ],
    ],
  ),
  templeContext: claim(
    "ly-temple-context",
    "Lý Thánh Tông coi trọng việc học và đưa Nho học vào hoạt động của triều đình, bên cạnh đời sống Phật giáo đang phát triển.",
    [["ly-thanh-tong-vanmieu", "Đoạn lý do dựng Văn Miếu và giao lưu văn hóa"]],
  ),
  templeDevelopment: claim(
    "ly-temple-development",
    "Năm 1070, vua Lý Thánh Tông cho dựng Văn Miếu, nơi thờ Khổng Tử và các bậc tiên hiền; hoàng thái tử đến học tại đây.",
    references.education,
  ),
  templeResult: claim(
    "ly-temple-result",
    "Việc dựng Văn Miếu tạo một cơ sở thờ tự và học tập của triều đình. Quốc Tử Giám được lập ở mốc sau, năm 1076, chứ không phải cùng một sự kiện năm 1070.",
    references.education,
  ),
  examContext: claim(
    "ly-exam-context",
    "Lý Nhân Tông lên ngôi khi còn nhỏ, được các thái hậu và đại thần giúp điều hành. Trong thời kỳ này, triều đình tổ chức thêm con đường tuyển chọn người có học vào làm việc.",
    [
      ["ly-toan-thu-nhan-tong", "Quyển III, tờ 6b: vua trẻ và phụ chính"],
      [
        "ly-le-van-thinh",
        "Đoạn khoa thi Minh kinh bác học và Nho học tam trường",
      ],
    ],
  ),
  examDevelopment: claim(
    "ly-exam-development",
    "Năm 1075, triều Lý mở khoa Minh kinh bác học và Nho học tam trường. Lê Văn Thịnh đỗ đầu và được vào hầu vua học.",
    [
      ["ly-le-van-thinh", "Đoạn năm Ất Mão, Thái Ninh 4 (1075)"],
      ["ly-vanmieu-history", "Thời Lý: khoa thi Nho học đầu tiên năm 1075"],
    ],
  ),
  examResult: claim(
    "ly-exam-result",
    "Khoa thi năm 1075 là mốc mở đầu truyền thống khoa cử Nho học của Việt Nam. Người đỗ đầu được tuyển dụng vào triều, cho thấy việc học có thể trở thành một con đường tham gia công việc của nhà nước.",
    [
      ["ly-vanmieu-history", "Mốc 1075"],
      ["ly-le-van-thinh", "Đoạn đỗ đầu và vào hầu vua học"],
    ],
  ),
  academyContext: claim(
    "ly-academy-context",
    "Sau khi Văn Miếu được dựng và khoa thi Nho học đầu tiên được tổ chức, triều đình tiếp tục xây dựng cơ sở đào tạo người có học.",
    [["ly-vanmieu-history", "Thứ tự các mốc 1070, 1075 và 1076"]],
  ),
  academyDevelopment: claim(
    "ly-academy-development",
    "Năm 1076, dưới triều Lý Nhân Tông, Quốc Tử Giám được thành lập tại kinh đô Thăng Long.",
    references.education,
  ),
  academyResult: claim(
    "ly-academy-result",
    "Văn Miếu và Quốc Tử Giám gắn việc tôn vinh đạo học với đào tạo trí thức của nhà nước. Di tích được thay đổi và xây dựng lại qua nhiều triều đại, nên kiến trúc hiện còn không hoàn toàn thuộc thời Lý.",
    [
      [
        "ly-vanmieu-dsvh",
        "Các đoạn chức năng di tích, kiến trúc Lê–Nguyễn và khu Thái Học phục dựng",
      ],
    ],
  ),
  warContext: claim(
    "ly-war-context",
    "Trong thập niên 1070, quan hệ Đại Việt–Tống căng thẳng và các căn cứ quân sự ở vùng biên được chuẩn bị cho chiến tranh. Triều Lý giao cho Lý Thường Kiệt tổ chức đối phó.",
    references.war,
  ),
  warDevelopment: claim(
    "ly-war-development",
    "Năm 1075, quân Đại Việt tiến đánh các căn cứ Ung, Khâm và Liêm của nhà Tống rồi rút về phòng thủ. Cuối năm 1076–đầu năm 1077, quân Tống tiến vào Đại Việt và bị chặn ở phòng tuyến Như Nguyệt, trên sông Cầu.",
    references.war,
  ),
  warResult: claim(
    "ly-war-result",
    "Lý Thường Kiệt kết hợp chiến đấu với giảng hòa; quân Tống rút khỏi chiến trường năm 1077. Việc giải quyết đất đai ở biên giới còn tiếp tục bằng ngoại giao trong những năm sau.",
    references.war,
  ),
  poem: claim(
    "ly-nam-quoc-son-ha",
    "Nam quốc sơn hà gắn với truyền thống kể chuyện về cuộc kháng chiến chống Tống và thần sông Như Nguyệt. Bài thơ có nhiều dị bản, chưa xác định được tác giả; mối liên hệ với Lý Thường Kiệt không đồng nghĩa với bằng chứng chắc chắn về quyền tác giả.",
    [
      ["ly-hxh", "Trang PDF 154–155: bài thơ trong chuyện thần Trương Hát"],
      ["ly-nam-quoc-research", "Phần mở đầu: bài thơ vô danh và nhiều dị bản"],
    ],
    { kind: "interpretation" },
  ),
};

const event = (
  id: string,
  name: string,
  start: number,
  end: number,
  placeIds: string[],
  personIds: string[],
  context: string,
  development: string,
  result: string,
  consequence: string,
): HistoricalEvent => ({
  id,
  periodIds: id === "ly-lap-trieu-1009" ? ["the-ky-x", "ly"] : ["ly"],
  name,
  date: date(start, end, start === end ? String(start) : `${start}–${end}`),
  placeIds,
  personIds,
  contextClaimIds: [context],
  developmentClaimIds: id === "ly-lap-trieu-1009" ? [development, "tl-dynasty-ending"] : [development],
  resultClaimIds: [result],
  consequence,
  consequenceKind: "editorial-question",
  precisionNote:
    "Mốc năm theo quy ước của nguồn; không tự chuyển đổi ngày âm lịch và không suy ra ranh giới lãnh thổ.",
});

export const lyEarlyEvents: HistoricalEvent[] = [
  event(
    "ly-lap-trieu-1009",
    "Lý Công Uẩn lên ngôi",
    1009,
    1009,
    ["hoa-lu"],
    ["ly-thai-to", "le-long-dinh", "van-hanh", "dao-cam-moc"],
    lyEarlyClaimIds.foundationContext,
    lyEarlyClaimIds.foundationDevelopment,
    lyEarlyClaimIds.foundationResult,
    "Việc đổi người giữ ngôi dẫn tới những thay đổi nào trong trung tâm và cách tổ chức quyền lực?",
  ),
  event(
    "ly-doi-do-1010",
    "Dời đô từ Hoa Lư đến Thăng Long",
    1010,
    1010,
    ["hoa-lu", "thang-long"],
    ["ly-thai-to"],
    lyEarlyClaimIds.capitalContext,
    lyEarlyClaimIds.capitalDevelopment,
    lyEarlyClaimIds.capitalResult,
    "Vị trí của một kinh đô có thể mở ra những khả năng phát triển nào cho triều đại mới?",
  ),
  event(
    "ly-hinh-thu-1042",
    "Ban hành Hình thư",
    1042,
    1042,
    ["thang-long"],
    ["ly-thai-tong"],
    lyEarlyClaimIds.lawContext,
    lyEarlyClaimIds.lawDevelopment,
    lyEarlyClaimIds.lawResult,
    "Khi văn bản luật đã mất, có thể tìm hiểu việc xét xử thời Lý qua những loại bằng chứng nào?",
  ),
  event(
    "ly-quoc-hieu-1054",
    "Đặt quốc hiệu Đại Việt",
    1054,
    1054,
    ["thang-long"],
    ["ly-thanh-tong"],
    lyEarlyClaimIds.nameContext,
    lyEarlyClaimIds.nameDevelopment,
    lyEarlyClaimIds.nameResult,
    "Vì sao một quốc hiệu có thể tồn tại qua nhiều triều đại khác nhau?",
  ),
  event(
    "ly-champa-1069",
    "Chiến dịch Champa và việc chuyển giao ba châu",
    1069,
    1069,
    [],
    ["ly-thanh-tong", "ly-thuong-kiet", "y-lan"],
    lyEarlyClaimIds.champaContext,
    lyEarlyClaimIds.champaDevelopment,
    lyEarlyClaimIds.champaResult,
    "Sự thay đổi biên giới ảnh hưởng ra sao tới cư dân và quan hệ giữa hai quốc gia?",
  ),
  event(
    "ly-van-mieu-1070",
    "Dựng Văn Miếu",
    1070,
    1070,
    ["van-mieu"],
    ["ly-thanh-tong", "ly-nhan-tong"],
    lyEarlyClaimIds.templeContext,
    lyEarlyClaimIds.templeDevelopment,
    lyEarlyClaimIds.templeResult,
    "Một cơ sở tôn vinh đạo học liên quan như thế nào đến việc đào tạo người làm việc cho triều đình?",
  ),
  event(
    "ly-khoa-thi-1075",
    "Mở khoa thi Nho học",
    1075,
    1075,
    ["thang-long"],
    ["ly-nhan-tong", "le-van-thinh"],
    lyEarlyClaimIds.examContext,
    lyEarlyClaimIds.examDevelopment,
    lyEarlyClaimIds.examResult,
    "Khoa cử mở thêm cơ hội vào triều cho những người có học ra sao?",
  ),
  event(
    "ly-quoc-tu-giam-1076",
    "Lập Quốc Tử Giám",
    1076,
    1076,
    ["van-mieu"],
    ["ly-nhan-tong"],
    lyEarlyClaimIds.academyContext,
    lyEarlyClaimIds.academyDevelopment,
    lyEarlyClaimIds.academyResult,
    "Từ Văn Miếu, khoa thi đến Quốc Tử Giám, việc học đang được tổ chức lại như thế nào?",
  ),
  {
    ...event(
      "ly-khang-tong-1075",
      "Chiến tranh Đại Việt–Tống (1075–1077)",
      1075,
      1077,
      ["nhu-nguyet"],
      ["ly-nhan-tong", "ly-thuong-kiet", "y-lan", "ly-dao-thanh"],
      lyEarlyClaimIds.warContext,
      lyEarlyClaimIds.warDevelopment,
      lyEarlyClaimIds.warResult,
      "Vì sao chiến thắng quân sự vẫn cần đi cùng thương lượng và ngoại giao sau chiến tranh?",
    ),
    date: date(1075, 1078, "1075–1077"),
    additionalClaimIds: [lyEarlyClaimIds.poem],
  },
];

const reignRows: [string, string, number, number, string][] = [
  ["ly-thai-to", "Lý Thái Tổ", 1009, 1028, "dai-co-viet"],
  ["ly-thai-tong", "Lý Thái Tông", 1028, 1054, "dai-co-viet"],
  ["ly-thanh-tong", "Lý Thánh Tông", 1054, 1072, "dai-viet"],
  ["ly-nhan-tong", "Lý Nhân Tông", 1072, 1127, "dai-viet"],
];

export const lyEarlyTenures: RoleTenure[] = reignRows.map(
  ([personId, name, start, end, polityId]) => ({
    id: `reign-${personId}`,
    personId,
    periodId: "ly",
    dynastyId: "ly-dynasty",
    polityId,
    role: "reigning",
    label: `Hoàng đế · ${name}`,
    date: date(start, end, `${start}–${end}`),
    claimIds: [
      claim(
        `${personId}-reign`,
        `${name} ở ngôi trong những năm ${start}–${end}${personId === "ly-thai-to" ? "; niên hiệu Thuận Thiên bắt đầu từ năm 1010" : ""}.`,
        [["the-thu", `Chương 4, phần II: mục ${name}`]],
      ),
    ],
  }),
);

const relation = (
  id: string,
  from: string,
  to: string,
  type: Relationship["type"],
  label: string,
  text: string,
  refs: Ref[],
): Relationship => ({
  id,
  from,
  to,
  type,
  label,
  status: refs.length > 1 ? "cross-referenced" : "draft",
  claimIds: [claim(`${id}-claim`, text, refs)],
});

export const lyEarlyRelationships: Relationship[] = [
  relation(
    "ly-thai-to-thai-tong",
    "ly-thai-to",
    "ly-thai-tong",
    "parent",
    "Cha – con",
    "Lý Thái Tông, tên Phật Mã, là con của Lý Thái Tổ.",
    [
      ["ly-toan-thu-thai-tong", "Quyển II, tờ 18a"],
      ["the-thu", "Chương 4, phần II.2"],
    ],
  ),
  relation(
    "ly-thai-tong-thanh-tong",
    "ly-thai-tong",
    "ly-thanh-tong",
    "parent",
    "Cha – con",
    "Lý Thánh Tông, tên Nhật Tôn, là con của Lý Thái Tông.",
    [
      ["ly-toan-thu-thanh-tong", "Quyển III, tờ 1a"],
      ["ly-thanh-tong-vanmieu", "Đoạn đầu tiểu sử"],
    ],
  ),
  relation(
    "ly-thanh-tong-nhan-tong",
    "ly-thanh-tong",
    "ly-nhan-tong",
    "parent",
    "Cha – con",
    "Lý Nhân Tông, tên Càn Đức, là con của Lý Thánh Tông.",
    [
      ["ly-toan-thu-nhan-tong", "Quyển III, tờ 6b"],
      ["the-thu", "Chương 4, phần II.4"],
    ],
  ),
  relation(
    "ly-y-lan-nhan-tong",
    "y-lan",
    "ly-nhan-tong",
    "parent",
    "Mẹ – con",
    "Linh Nhân thái hậu, tức Ỷ Lan, là mẹ của Lý Nhân Tông.",
    [
      ["ly-toan-thu-nhan-tong", "Quyển III, tờ 6b"],
      ["ly-nhan-tong-museum", "Đoạn tên Càn Đức và cha mẹ"],
    ],
  ),
  relation(
    "ly-thanh-tong-y-lan",
    "ly-thanh-tong",
    "y-lan",
    "marriage",
    "Hôn nhân",
    "Ỷ Lan là vợ của Lý Thánh Tông và là mẹ của người nối ngôi, Lý Nhân Tông.",
    [
      [
        "ly-y-lan-vass",
        "Phần thân thế và vai trò trong triều Thánh Tông, Nhân Tông",
      ],
    ],
  ),
  relation(
    "ly-thuong-kiet-nhan-tong",
    "ly-thuong-kiet",
    "ly-nhan-tong",
    "political",
    "Phò tá · chỉ huy quân đội",
    "Lý Thường Kiệt giữ binh quyền, phò tá Lý Nhân Tông và chỉ huy việc chống quân Tống.",
    [
      [
        "ly-thuong-kiet-campaign",
        "Các đoạn Nhân Tông lên ngôi năm 1072 và cuộc kháng chiến 1075–1077",
      ],
    ],
  ),
  relation(
    "ly-dao-thanh-nhan-tong",
    "ly-dao-thanh",
    "ly-nhan-tong",
    "political",
    "Đại thần phụ chính",
    "Lý Đạo Thành là đại thần giúp việc chính sự khi Lý Nhân Tông lên ngôi còn nhỏ.",
    [
      ["ly-toan-thu-nhan-tong", "Quyển III, tờ 6b"],
      ["ly-dao-thanh", "Các đoạn vua nhỏ, phụ chính và việc nội trị"],
    ],
  ),
  relation(
    "ly-le-van-thinh-nhan-tong",
    "le-van-thinh",
    "ly-nhan-tong",
    "political",
    "Giúp vua học · đại thần",
    "Sau khi đỗ đầu khoa thi năm 1075, Lê Văn Thịnh được vào hầu vua Lý Nhân Tông học; về sau ông làm việc ngoại giao và giữ chức Thái sư.",
    [["ly-le-van-thinh", "Các đoạn 1075, 1084 và 1085"]],
  ),
  ...reignRows
    .slice(0, -1)
    .map(([from, name], index) =>
      relation(
        `ly-succession-early-${index + 1}`,
        from,
        reignRows[index + 1][0],
        "succession",
        "Kế vị",
        `${reignRows[index + 1][1]} nối ngôi ${name}.`,
        [["the-thu", `Chương 4, phần II: mục ${reignRows[index + 1][1]}`]],
      ),
    ),
];

import {
  date,
  type Claim,
  type HistoricalEvent,
  type Relationship,
  type RoleTenure,
  type Source,
} from "../../schema";
import { claim, type Ref } from "../../claim-store";

const source = (
  record: Omit<
    Source,
    "accessed" | "edition" | "year" | "author" | "upstream"
  > &
    Partial<Pick<Source, "edition" | "year" | "author" | "upstream">>,
): Source => ({
  accessed: "2026-11-18",
  edition: null,
  year: null,
  author: null,
  upstream: null,
  ...record,
});

export const hoPersonWarSources: Source[] = [
  source({
    id: "ho-annals-viii",
    title:
      "Đại Việt sử ký toàn thư — Bản kỷ VIII, các mục cuối Trần và thời Hồ",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vietnamthuquan.eu/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-24",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển VIII",
    readLocation:
      "Tờ 24b (1394); 36b–40b (1400–1402): kế vị, mẹ Hán Thương, khoa thi, hộ tịch, Nguyễn Phi Khanh; 49a–54a (1405–1406): chuẩn bị, quân Minh tiến vào, Đa Bang.",
    limits:
      "Bản đánh máy có lỗi, trong đó Tân Tỵ 1401 bị ghi 1410. Chưa xác nhận đủ ấn bản và dịch giả. Phân biệt lời bình sử quan, lời nói được thuật lại và dữ kiện; không coi các bản chép cùng Toàn thư là nguồn độc lập. Không tự chuyển ngày âm lịch sang dương lịch.",
  }),
  source({
    id: "ho-annals-ix",
    title: "Đại Việt sử ký toàn thư — Bản kỷ IX, phần đầu năm 1407",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vietnamthuquan.eu/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-25",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển IX",
    readLocation:
      "Tờ 1a–4b, mục Đinh Hợi 1407 trước khi Giản Định khởi binh: phản công Hàm Tử, rút về Thanh Hóa, Kỳ La, bãi Chỉ Chỉ, Cao Vọng và việc bắt các nhân vật họ Hồ.",
    limits:
      "Chỉ dùng phần chiến tranh nhà Hồ năm 1407, không mở nội dung Hậu Trần từ cùng trang. Không sử dụng số quân hay lời thoại như dữ kiện đã đối chiếu. Phân biệt địa danh nguồn cổ với vị trí hiện đại; việc bị bắt không xác nhận năm mất của Quý Ly hay Hán Thương.",
  }),
  source({
    id: "ho-han-thuong-chronology",
    title: "Hồ Hán Thương (1401–1407)",
    publisher: "Ủy ban Nhà nước về người Việt Nam ở nước ngoài — Quê Hương",
    year: 2007,
    url: "https://scov.gov.vn/dat-nuoc-con-nguoi/con-nguoi-viet-nam/ho-han-thuong-1401-1407-.html",
    type: "chronology",
    upstream: "quehuongonline.vn",
    readLocation:
      "Các đoạn đầu về niên hiệu; từ phòng tuyến Đa Bang đến việc rút về Thanh Hóa, Kỳ La và nhà Hồ kết thúc năm 1407.",
    limits:
      "Tiêu đề bắt đầu 1401 theo niên hiệu, khác mốc nhận ngôi cuối 1400 trong Toàn thư và Thế thứ. Không dùng số quân hoặc nhận định lòng dân làm giải thích duy nhất; không lấy các ngày quy đổi riêng của bài để chuẩn hóa toàn bộ sử liệu.",
  }),
  source({
    id: "ho-military-history",
    title:
      "Lịch sử tư tưởng quân sự Việt Nam — tập 1, phần kháng chiến chống Minh của nhà Hồ",
    publisher:
      "Nhà xuất bản Chính trị Quốc gia–Sự thật; bản điện tử trên cổng Tư liệu–Văn kiện Đảng",
    year: 2025,
    edition:
      "Năm theo thông tin xuất bản trên trang; chưa đối chiếu trang tên bản in",
    url: "https://tulieuvankien.dangcongsan.vn/van-kien-tu-lieu-ve-dang/book/sach-chinh-tri/lich-su-tu-tuong-quan-su-viet-nam-tap-1-tu-the-ky-iii-tr-cn-den-the-ky-xv-324",
    type: "research",
    readLocation:
      "Phần đầu thế kỷXV về nhà Hồ: chuyển ngôi cuối 1400, tổ chức quốc phòng, phòng tuyến Đa Bang–Đông Đô, Hoàng Giang, Muộn Hải, phản công Hàm Tử và rút về Tây Đô.",
    limits:
      "Dùng để bổ sung bối cảnh và phân tích chiến lược; nhận định về đường lối tác chiến được lưu là diễn giải. Ngày thất thủ Đa Bang có cách ghi khác nguồn phổ thông, nên chỉ hiển thị đầu 1407; không lấy con số quân đội hoặc tuyệt đối hóa một nguyên nhân thất bại.",
  }),
  source({
    id: "ho-nguyen-trung-abstract",
    title: "Cuộc đời của Hồ Nguyên Trừng — tóm tắt bài nghiên cứu",
    author: "Ngô Thị Xinh",
    publisher: "Tạp chí Khoa học Trường Đại học Thủ đô Hà Nội, số 45/2020",
    year: 2020,
    edition: "Bản mục lục và tóm tắt, PDF 16 trang; tóm tắt bài ở trang 9",
    url: "https://hnmu.edu.vn/upload/user/tin-bai/tap-chi/tckh-45_khxh_24022021-tt.pdf",
    type: "research",
    readLocation:
      "Trang 9 của bản PDF tóm tắt: tên tự Mạnh Nguyên, hiệu Nam Ông, niên đại 1374–1446, con Quý Ly, bị bắt 1407 và công việc Bộ Công nhà Minh.",
    limits:
      "Chỉ tiếp cận và đọc phần tóm tắt; chưa đọc toàn bài ở trang 53–60 theo mục lục. Không dùng tiêu đề bài để khẳng định ông phát minh súng đầu tiên trên thế giới; chỉ dùng những dữ kiện có trong tóm tắt và đã đối chiếu.",
  }),
  source({
    id: "ho-nguyen-trung-biography",
    title: "Nhà kỹ nghệ, nhà văn Hồ Nguyên Trừng",
    publisher: "Báo Đại biểu Nhân dân",
    year: 2007,
    url: "https://daibieunhandan.vn/nha-ky-nghe-nha-van-ho-nguyen-trung-10014451.html",
    type: "reference",
    readLocation:
      "Các đoạn mở đầu về gia đình, chức Tả tướng quốc; việc chiến đấu và bị bắt; hỏa khí, Bộ Công, Nam Ông mộng lục và lời tựa 1438.",
    limits:
      "Bài giới thiệu có sắc thái tôn vinh. Không dùng lời coi ông là tổ toàn bộ súng Trung Quốc; không sao chép các lời dẫn dài. Năm sinh ở bài này để chưa rõ, nên mốc 1374 được dẫn từ nghiên cứu Hán Nôm và tóm tắt Ngô Thị Xinh.",
  }),
  source({
    id: "ho-nam-ong-research",
    title:
      "Mối quan hệ văn–sử nhìn từ tương quan Nam Ông mộng lục và Đại Việt sử ký toàn thư",
    author: "Nguyễn Hữu Sơn",
    publisher: "Tạp chí Hán Nôm, số 6(97)/2009; Viện Nghiên cứu Hán Nôm",
    year: 2009,
    edition: "Tạp chí Hán Nôm, số 6(97), tr.3–9; đăng điện tử 7/12/2010",
    url: "https://hannom.vass.gov.vn/nghien-cuu-van-ban/moi-quan-he-van-su-nhin-tu-tuong-quan-nam-ong-mong-luc-va-dai-viet-su-ky-toan-thu-tap-chi-han-nom-s-506447",
    type: "research",
    readLocation:
      "Phần mở đầu: Nguyên Trừng 1374–1446 và 31 thiên; phần so sánh văn bản và kết luận về quan hệ văn–sử.",
    limits:
      "Nghiên cứu về tác phẩm văn học và sử liệu, không đồng nhất toàn bộ tình tiết trong Nam Ông mộng lục với sự kiện được chính sử xác nhận. Các đoạn bình luận giá trị ký ức được xem là diễn giải.",
  }),
  source({
    id: "ho-phi-khanh-research",
    title:
      "Nhà nho Nguyễn Phi Khanh với khát vọng thực hiện lý tưởng hành đạo giúp đời",
    author: "Vũ Văn Long",
    publisher: "Tạp chí Khoa học Trường Đại học Thủ đô Hà Nội, số 9/2016",
    year: 2016,
    edition: "Bài ở trang in 28–38",
    url: "https://hnmu.edu.vn/upload/user/tin-bai/tap-chi/tckh-so-9-kh-xa-hoi-va-giao-duc-dh-thu-do-10-2016.pdf",
    type: "research",
    readLocation:
      "Trang in 28–29: Nguyễn Ứng Long, khoa 1374, quan hệ Trần Nguyên Đán và biến cố 1407; trang 34: làm quan nhà Hồ, khoa thi của Nguyễn Trãi và các chức vụ.",
    limits:
      "Những kết luận về tâm tư chủ yếu rút từ thơ văn, được lưu là diễn giải. Niên đại đời người có cách ghi khác trong tư liệu, nên hồ sơ dùng thế kỷXIV–XV. Không dùng lời tiễn cha ở ải Nam Quan như lời thoại xác thực.",
  }),
  source({
    id: "ho-phi-khanh-poetry",
    title:
      "Thơ văn Nguyễn Phi Khanh — nỗi niềm trăn trở về bản thân, thời đại và cuộc sống của nhân dân",
    author: "Vũ Văn Long",
    publisher: "Tạp chí Khoa học Trường Đại học Thủ đô Hà Nội, số 13/2017",
    year: 2017,
    edition: "Bài ở trang in 32–43; tên file lưu cũ ghi số 12",
    url: "https://hnmu.edu.vn/upload/user/tin-bai/tap-chi/tckh-so-12-kh-xa-hoi-va-giao-duc-dh-thu-do-02-2017.pdf",
    type: "research",
    readLocation:
      "Trang in 32–33 và phần 2: bối cảnh chờ được bổ dụng, việc làm quan 1401, thơ văn trước đời sống nhân dân.",
    limits:
      "Cùng tác giả với bài 2016, không tính thành nguồn độc lập thứ hai cho dữ kiện đời người. Chỉ dùng cho phân tích thơ văn và mối quan tâm đến thời cuộc; không dựng thêm hoạt động chính trị không có sử liệu.",
  }),
  source({
    id: "ho-trai-museum",
    title:
      "Nguyen Trai — a national hero, world cultural celebrity (1380–1442)",
    publisher: "Bảo tàng Lịch sử Quốc gia",
    year: 2017,
    url: "https://baotanglichsu.vn/en/Articles/3183/68497/nguyen-trai-a-national-hero-world-cultural-celebrity-1380-1442.html",
    type: "museum",
    readLocation:
      "Hai đoạn mở đầu: niên đại, cha Nguyễn Phi Khanh, mẹ Trần Thị Thái, ông ngoại Trần Nguyên Đán, đỗ và làm quan thời Hồ năm 1400.",
    limits:
      "Bài tiếng Anh có lỗi ở các mốc về sau, gồm năm minh oan, và giản lược quá trình sau 1407. Chỉ dùng thân thế và mốc 1400 đã đối chiếu, không dùng đoạn sai để biên soạn Lam Sơn hay Lê sơ.",
  }),
  source({
    id: "ho-trai-hannom",
    title: "Nguyễn Trãi với các thế hệ người Việt Nam",
    author: "Trịnh Khắc Mạnh",
    publisher: "Tạp chí Hán Nôm, số 4/2002; Viện Nghiên cứu Hán Nôm",
    year: 2002,
    url: "https://hannom.vass.gov.vn/web/tchn/data/0204v.htm",
    type: "research",
    readLocation:
      "Mục Nguyễn Trãi với các thế hệ người Việt Nam, đoạn mở đầu: tên hiệu Ức Trai, gia đình, đỗ Thái học sinh 1400, chức Chính chưởng Ngự sử đài.",
    limits:
      "Trang gộp nhiều bài cùng số tạp chí, chỉ dùng mục ghi đúng tác giả. Quãng đời sau 1407 còn có vấn đề niên đại cần nghiên cứu riêng; không nhập các giai thoại hoặc nội dung Lam Sơn từ phần còn lại vào giai đoạn Hồ.",
  }),
];

const passage = (
  id: string,
  text: string,
  refs: Ref[],
  kind: Claim["kind"] = "chronicle",
  note?: string,
) =>
  claim(id, text, refs, { kind, status: "draft", ...(note ? { note } : {}) });

passage(
  "ho-war-invasion-context",
  "Nhà Minh dựa vào vấn đề chuyển ngôi Trần–Hồ và người tự nhận thuộc hoàng tộc Trần để can thiệp. Năm 1406, việc đưa Trần Thiêm Bình về nước bằng lực lượng quân sự làm xung đột tiếp tục leo thang.",
  [
    ["ho-annals-viii", "Mục Bính Tuất 1406, tờ 50a–50b"],
    [
      "ho-military-history",
      "Các đoạn quan hệ bang giao trước cuộc tiến công 1406",
    ],
  ],
);
passage(
  "ho-war-invasion-development",
  "Cuối năm 1406, quân Minh do Trương Phụ và Mộc Thạnh chỉ huy tiến vào theo hai hướng. Quân nhà Hồ chống giữ rồi tập trung về hệ thống phòng tuyến sông ở phía bắc đồng bằng.",
  [
    ["ho-annals-viii", "Mục 1406, tờ 52b–53a"],
    [
      "ho-military-history",
      "Các đoạn hai cánh quân tiến qua Lạng Sơn, Hà Giang và phòng tuyến Đa Bang–Đông Đô",
    ],
  ],
);
passage(
  "ho-war-invasion-result",
  "Cuộc đối đầu đã trở thành một cuộc chiến tranh xâm lược và kháng chiến trên quy mô lớn. Khẩu hiệu khôi phục nhà Trần là cách nhà Minh tuyên bố để biện minh cho can thiệp, trong khi kết cục 1407 là thiết lập bộ máy cai trị trực tiếp.",
  [
    ["ho-annals-viii", "Các mục 1406 về Thiêm Bình và việc quân Minh tiến vào"],
    ["ho-annals-ix", "Mục 1407, tờ 2b–3a: thiết lập các ty cai trị"],
    ["ho-military-history", "Phân tích bối cảnh và mục tiêu chiến tranh"],
  ],
  "interpretation",
);

passage(
  "ho-war-da-bang-context",
  "Đa Bang là cứ điểm quan trọng trong phòng tuyến bảo vệ Đông Đô. Nhà Hồ dựa vào thành, cọc chắn sông, chiến thuyền và quân đóng dọc bờ để ngăn bước tiến của quân Minh.",
  [
    ["ho-military-history", "Các đoạn hệ thống phòng thủ và cứ điểm Đa Bang"],
    ["ho-annals-viii", "Mục 1405–1406, tờ 49b, 52b–53a"],
  ],
);
passage(
  "ho-war-da-bang-development",
  "Đầu năm 1407, quân Minh vượt sông và tập trung đánh thành Đa Bang. Quân giữ thành chống trả bằng hỏa khí, cung tên và voi chiến nhưng không giữ được thành.",
  [
    ["ho-military-history", "Các đoạn 19–21/1/1407: đánh thành Đa Bang"],
    ["ho-annals-viii", "Cuối năm Bính Tuất, tờ 53b–54a"],
  ],
);
passage(
  "ho-war-da-bang-result",
  "Đa Bang thất thủ kéo theo sự tan vỡ của các cụm quân trên phòng tuyến; quân Minh tiếp tục chiếm Đông Đô. Quân nhà Hồ rút về phía hạ lưu, tiếp tục tổ chức chống giữ.",
  [
    [
      "ho-han-thuong-chronology",
      "Đoạn Đa Bang, Đông Đô và cuộc rút về hạ lưu đầu 1407",
    ],
    [
      "ho-military-history",
      "Các đoạn hậu quả của thất bại Đa Bang và phòng tuyến Hoàng Giang",
    ],
  ],
);

passage(
  "ho-war-ham-tu-context",
  "Sau các cuộc giao tranh ở hạ lưu, quân Minh tập trung tại Hàm Tử. Phía nhà Hồ đưa lực lượng từ Hoàng Giang lên, tìm cách phản công để thay đổi tình thế.",
  [["ho-annals-ix", "Mục Đinh Hợi 1407, tờ 1b–2a"]],
);
passage(
  "ho-war-ham-tu-development",
  "Hồ Nguyên Trừng cùng các tướng chỉ huy quân thủy và quân bộ tiến đánh Hàm Tử. Quân Minh đã chuẩn bị phòng bị trên sông và hai bờ, khiến cuộc tiến công của nhà Hồ thất bại.",
  [
    ["ho-annals-ix", "Tờ 2a–2b: trận tháng ba năm Đinh Hợi"],
    ["ho-military-history", "Các đoạn phản công chiến lược Hàm Tử"],
  ],
);
passage(
  "ho-war-ham-tu-result",
  "Nhà Hồ tổn thất nặng về quân và thuyền, không khôi phục được thế chủ động. Hai cha con Quý Ly–Hán Thương cùng các tướng và quan lại tiếp tục rút về Thanh Hóa.",
  [["ho-annals-ix", "Tờ 2b–3a: sau trận Hàm Tử, vượt biển về Thanh Hóa"]],
);

passage(
  "ho-war-tay-do-context",
  "Tây Đô ở Thanh Hóa là kinh đô và căn cứ quan trọng của triều Hồ. Sau những thất bại trên các phòng tuyến phía bắc, việc chống giữ dồn về khu vực Thanh Hóa và đường rút xuống phía nam.",
  [
    [
      "ho-military-history",
      "Các đoạn vị thế phòng thủ Tây Đô và rút quân sau thất bại Đa Bang",
    ],
    ["ho-han-thuong-chronology", "Đoạn chạy về Thanh Hóa và Lỗi Giang"],
  ],
);
passage(
  "ho-war-tay-do-development",
  "Quý Ly và Hán Thương trở lại Thanh Hóa, nhưng lực lượng tiếp tục tan vỡ khi quân Minh đánh tới Lỗi Giang. Những cuộc rút quân nối tiếp khiến họ không giữ được một trung tâm chỉ huy ổn định tại kinh đô.",
  [
    [
      "ho-annals-ix",
      "Mục tháng tư 1407, tờ 3a: về Thanh Hóa, đánh Lỗi Giang và cửa Điển Canh",
    ],
  ],
  "interpretation",
  "Không coi đây là bản tường thuật một trận vây thành Tây Đô có ngày xác định; chỉ trình bày trình tự rút quân và mất khả năng chống giữ.",
);
passage(
  "ho-war-tay-do-result",
  "Những người đứng đầu nhà Hồ rời khu vực Thanh Hóa, tiếp tục theo đường ven biển vào phía nam. Cuộc kháng chiến chuyển sang giai đoạn rút lui và truy đuổi, trước khi các nhân vật chủ chốt bị bắt.",
  [
    ["ho-annals-ix", "Tờ 3a–3b: Điển Canh, Kỳ La và việc bắt người"],
    ["ho-han-thuong-chronology", "Các đoạn cuối về cuộc truy đuổi đến Kỳ La"],
  ],
);

passage(
  "ho-war-capture-context",
  "Sau khi rời Thanh Hóa, Quý Ly, Hán Thương, Nguyên Trừng cùng lực lượng còn lại rút về vùng ven biển phía nam. Quân Minh tiếp tục truy đuổi tới khu vực Kỳ La và núi Cao Vọng.",
  [["ho-annals-ix", "Mục tháng tư–tháng năm 1407, tờ 3a–3b"]],
);
passage(
  "ho-war-capture-development",
  "Toàn thư ghi Quý Ly bị bắt ở bãi Chỉ Chỉ, Nguyên Trừng ở cửa biển Kỳ La, rồi Hán Thương và thái tử Nhuế ở núi Cao Vọng. Nhiều tướng và quan lại cũng bị bắt hoặc đã đầu hàng trước đó.",
  [["ho-annals-ix", "Tờ 3a–3b, ngày 11–12 tháng năm Đinh Hợi theo sử liệu"]],
);
passage(
  "ho-war-capture-result",
  "Việc những người đứng đầu triều đình bị bắt chấm dứt sự cai trị của nhà Hồ năm 1407. Nhà Minh đặt bộ máy cai trị trực tiếp, mở đầu một giai đoạn đô hộ mới.",
  [
    ["ho-annals-ix", "Tờ 2b–3b: các ty cai trị và bắt người"],
    ["ho-han-thuong-chronology", "Đoạn kết: nhà Hồ kết thúc năm 1407"],
  ],
);

export const hoWarEvents: HistoricalEvent[] = [
  {
    id: "ho-minh-tien-cong-1406",
    periodIds: ["ho"],
    name: "Quân Minh tiến vào Đại Ngu",
    date: date(1406, 1406, "1406"),
    placeIds: ["da-bang"],
    personIds: ["ho-quy-ly", "ho-han-thuong", "ho-nguyen-trung"],
    contextClaimIds: ["ho-war-invasion-context"],
    developmentClaimIds: ["ho-war-invasion-development"],
    resultClaimIds: ["ho-war-invasion-result"],
    consequence:
      "Một khẩu hiệu can thiệp của nước ngoài khác với kết quả cai trị thực tế như thế nào?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Mốc 1406 gồm việc đưa Thiêm Bình về nước và cuộc tiến công lớn cuối năm. Đa Bang là đầu mối phòng thủ của Đại Ngu.",
  },
  {
    id: "ho-da-bang-1407",
    periodIds: ["ho"],
    name: "Đa Bang thất thủ, Đông Đô bị chiếm",
    date: date(
      1407,
      1407,
      "Đầu 1407",
      "Cuối năm Bính Tuất theo Toàn thư; tháng 1/1407 theo nghiên cứu quân sự",
    ),
    placeIds: ["da-bang", "thang-long"],
    personIds: ["ho-quy-ly", "ho-han-thuong", "ho-nguyen-trung"],
    contextClaimIds: ["ho-war-da-bang-context"],
    developmentClaimIds: ["ho-war-da-bang-development"],
    resultClaimIds: ["ho-war-da-bang-result"],
    consequence:
      "Vì sao mất một cứ điểm then chốt có thể làm lung lay cả hệ thống phòng thủ?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Sử liệu đặt trận đánh ở cuối năm Bính Tuất; các nghiên cứu hiện đại ghi tháng 1/1407, với những khác biệt về ngày.",
  },
  {
    id: "ho-ham-tu-1407",
    periodIds: ["ho"],
    name: "Nhà Hồ phản công ở Hàm Tử",
    date: date(1407, 1407, "1407", "Tháng ba năm Đinh Hợi theo Toàn thư"),
    placeIds: ["ham-tu"],
    personIds: ["ho-nguyen-trung", "ho-quy-ly", "ho-han-thuong"],
    contextClaimIds: ["ho-war-ham-tu-context"],
    developmentClaimIds: ["ho-war-ham-tu-development"],
    resultClaimIds: ["ho-war-ham-tu-result"],
    consequence:
      "Cuộc phản công cho thấy nhà Hồ còn những khả năng nào sau khi mất Đa Bang?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Toàn thư ghi trận đánh vào tháng ba năm Đinh Hợi. Vị trí chiến trường Hàm Tử chưa được xác định tới một tọa độ cụ thể trong dữ liệu đang dẫn.",
  },
  {
    id: "ho-rut-ve-tay-do-1407",
    periodIds: ["ho"],
    name: "Rút về Thanh Hóa, rời căn cứ Tây Đô",
    date: date(1407, 1407, "1407"),
    placeIds: ["tay-do"],
    personIds: ["ho-quy-ly", "ho-han-thuong"],
    contextClaimIds: ["ho-war-tay-do-context"],
    developmentClaimIds: ["ho-war-tay-do-development"],
    resultClaimIds: ["ho-war-tay-do-result"],
    consequence:
      "Một kinh thành kiên cố cần những điều kiện nào ngoài thành lũy để tiếp tục chống giữ?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Sự kiện gồm cuộc rút về Thanh Hóa và thất bại tại Lỗi Giang; thời điểm một trận vây thành Tây Đô riêng biệt chưa được xác định từ các nguồn đang dẫn.",
  },
  {
    id: "ho-bat-ho-ho-1407",
    periodIds: ["ho"],
    name: "Họ Hồ bị bắt, vương triều kết thúc",
    date: date(
      1407,
      1407,
      "1407",
      "Ngày 11–12 tháng năm Đinh Hợi theo Toàn thư; các lần bắt giữ ở nhiều địa điểm",
    ),
    placeIds: ["ky-la-cao-vong"],
    personIds: [
      "ho-quy-ly",
      "ho-han-thuong",
      "ho-nguyen-trung",
      "nguyen-phi-khanh",
      "nguyen-trai",
    ],
    contextClaimIds: ["ho-war-capture-context"],
    developmentClaimIds: ["ho-war-capture-development"],
    resultClaimIds: ["ho-war-capture-result"],
    consequence:
      "Sau khi triều đình tan rã, số phận của hoàng tộc, quan lại và người dân thay đổi ra sao?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Nguồn cổ ghi việc bắt người ở nhiều địa điểm trong tháng năm Đinh Hợi. Đây là năm Quý Ly và Hán Thương bị bắt, còn năm mất của họ chưa rõ. Nguyễn Trãi liên quan qua biến cố gia đình.",
  },
];

const hoSuccessionClaim = passage(
  "ho-royal-succession-1400",
  "Hồ Quý Ly trực tiếp giữ ngôi vua trong năm 1400, rồi cuối năm ấy nhường ngôi cho Hán Thương và tiếp tục cùng coi chính sự với tư cách Thái thượng hoàng. Hán Thương dùng niên hiệu Thiệu Thành từ 1401, giữ ngôi đến khi nhà Hồ kết thúc năm 1407.",
  [
    [
      "ho-annals-viii",
      "Tờ 38b–39a: nhường ngôi, cùng coi chính sự và niên hiệu",
    ],
    ["the-thu", "Chương 6, phần I.a–b: tháng 12/1400 đến 1407"],
  ],
);

export const hoTenures: RoleTenure[] = [
  {
    id: "ho-tenure-quy-ly-reigning",
    periodId: "ho",
    dynastyId: "ho-dynasty",
    polityId: "dai-ngu",
    personId: "ho-quy-ly",
    role: "reigning",
    label: "Hoàng đế · Hồ Quý Ly",
    date: date(1400, 1400, "1400"),
    claimIds: [hoSuccessionClaim],
  },
  {
    id: "ho-tenure-han-thuong-reigning",
    periodId: "ho",
    dynastyId: "ho-dynasty",
    polityId: "dai-ngu",
    personId: "ho-han-thuong",
    role: "reigning",
    label: "Hoàng đế · Hồ Hán Thương",
    date: date(1400, 1407, "Cuối 1400–1407"),
    claimIds: [hoSuccessionClaim],
  },
  {
    id: "ho-tenure-quy-ly-retired",
    periodId: "ho",
    dynastyId: "ho-dynasty",
    polityId: "dai-ngu",
    personId: "ho-quy-ly",
    role: "retired",
    label: "Thái thượng hoàng",
    date: date(1400, 1407, "Cuối 1400–1407"),
    claimIds: [hoSuccessionClaim],
  },
];

const link = (
  id: string,
  from: string,
  to: string,
  type: Relationship["type"],
  label: string,
  text: string,
  refs: Ref[],
  at?: ReturnType<typeof date>,
): Relationship => ({
  id,
  from,
  to,
  type,
  label,
  claimIds: [passage(`${id}-claim`, text, refs)],
  status: "draft",
  ...(at ? { date: at } : {}),
});

export const hoRelationships: Relationship[] = [
  link(
    "ho-family-quy-ly-han-thuong",
    "ho-quy-ly",
    "ho-han-thuong",
    "parent",
    "Cha–con",
    "Hồ Hán Thương là con Hồ Quý Ly và công chúa Huy Ninh, con gái Trần Minh Tông.",
    [
      [
        "ho-annals-viii",
        "Tờ 38b: mẹ Hán Thương là Huy Ninh, sinh Khâm Thánh và Hán Thương",
      ],
    ],
  ),
  link(
    "ho-family-quy-ly-nguyen-trung",
    "ho-quy-ly",
    "ho-nguyen-trung",
    "parent",
    "Cha–con",
    "Hồ Nguyên Trừng là con trai cả của Hồ Quý Ly.",
    [
      ["ho-nguyen-trung-abstract", "Tóm tắt bài Ngô Thị Xinh, trang 9 PDF"],
      ["ho-nguyen-trung-biography", "Đoạn mở đầu"],
    ],
  ),
  link(
    "ho-family-huy-ninh-han-thuong",
    "huy-ninh",
    "ho-han-thuong",
    "parent",
    "Mẹ–con",
    "Công chúa Huy Ninh là mẹ của Hồ Hán Thương và Khâm Thánh hoàng hậu.",
    [["ho-annals-viii", "Tờ 38b: con cái Huy Ninh"]],
  ),
  link(
    "ho-sibling-nguyen-trung-han-thuong",
    "ho-nguyen-trung",
    "ho-han-thuong",
    "sibling",
    "Anh–em",
    "Hồ Nguyên Trừng là anh Hồ Hán Thương; Hán Thương là người nhận ngôi từ Quý Ly.",
    [
      ["the-thu", "Chương 6, phần I.b"],
      ["ho-nguyen-trung-biography", "Đoạn đầu: Hán Thương là em Nguyên Trừng"],
    ],
  ),
  link(
    "ho-sibling-kham-thanh-han-thuong",
    "kham-thanh",
    "ho-han-thuong",
    "sibling",
    "Cùng cha mẹ",
    "Khâm Thánh hoàng hậu và Hồ Hán Thương là con của Hồ Quý Ly với công chúa Huy Ninh. Qua Khâm Thánh, Hán Thương là cậu của Trần Thiếu Đế.",
    [
      [
        "ho-annals-viii",
        "Tờ 38b: con cái Huy Ninh; đối chiếu hồ sơ Khâm Thánh và Thiếu Đế",
      ],
    ],
  ),
  link(
    "ho-family-phi-khanh-trai",
    "nguyen-phi-khanh",
    "nguyen-trai",
    "parent",
    "Cha–con",
    "Nguyễn Phi Khanh, tên cũ Nguyễn Ứng Long, là cha Nguyễn Trãi; mẹ Trãi là Trần Thị Thái.",
    [
      ["ho-trai-museum", "Đầu bài về cha mẹ Nguyễn Trãi"],
      [
        "ho-trai-hannom",
        "Mục Nguyễn Trãi với các thế hệ người Việt Nam, đoạn đầu",
      ],
    ],
  ),
  {
    id: "ho-succession-quy-ly-han-thuong",
    from: "ho-quy-ly",
    to: "ho-han-thuong",
    type: "succession",
    label: "Nhường ngôi",
    claimIds: [hoSuccessionClaim],
    status: "draft",
    date: date(1400, 1400, "Cuối 1400"),
  },
  link(
    "ho-political-han-thuong-nguyen-trung",
    "ho-han-thuong",
    "ho-nguyen-trung",
    "political",
    "Tả tướng quốc",
    "Trong thời Hán Thương giữ ngôi, Nguyên Trừng là Tả tướng quốc và tham gia chỉ huy kháng chiến.",
    [
      ["ho-nguyen-trung-biography", "Đoạn mở đầu và cuộc kháng chiến"],
      ["ho-annals-viii", "Mục 1405–1406: Tả tướng quốc Trừng"],
    ],
  ),
  link(
    "ho-political-han-thuong-phi-khanh",
    "ho-han-thuong",
    "nguyen-phi-khanh",
    "political",
    "Bổ dụng ·1401",
    "Năm 1401, Hồ Hán Thương bổ dụng Nguyễn Phi Khanh làm Hàn lâm học sĩ.",
    [["ho-annals-viii", "Tờ 40a–40b, mùa đông tháng 12 năm Tân Tỵ"]],
    date(1401, 1401, "1401"),
  ),
];

import {
  date,
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
  accessed: "2026-11-17",
  edition: null,
  year: null,
  author: null,
  upstream: null,
  ...record,
});

export const lyLateSources: Source[] = [
  source({
    id: "ly-annals-than-tong",
    title: "Đại Việt sử ký toàn thư — Lý Thần Tông hoàng đế",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/33-Than-Tong-Hoang-De?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển III",
    readLocation:
      "Tờ 28a, mở đầu kỷ Thần Tông; Hán văn, phiên âm và bản dịch Việt.",
    limits:
      "Chưa xác nhận đầy đủ ấn bản và dịch giả trên trang. Tuổi theo lối tính của sử liệu; không coi lời bình về đạo Phật hay điềm lành là sự kiện khách quan.",
  }),
  source({
    id: "ly-annals-anh-tong",
    title: "Đại Việt sử ký toàn thư — Lý Anh Tông hoàng đế",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/34-Anh-Tong-Hoang-De?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển IV",
    readLocation:
      "Tờ 1a, mở đầu kỷ Anh Tông: tên Thiên Tộ, cha Thần Tông, mẹ họ Lê, niên đại sinh và giữ ngôi.",
    limits:
      "Chưa xác nhận đầy đủ thông tin ấn bản của phần dịch. Phân biệt mẹ Anh Tông họ Lê với mẹ Thần Tông họ Đỗ; không chép con số tuổi mụ thành tuổi theo lịch hiện đại.",
  }),
  source({
    id: "ly-annals-cao-tong",
    title: "Đại Việt sử ký toàn thư — Lý Cao Tông hoàng đế",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/35-Cao-Tong-Hoang-De?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển IV",
    readLocation:
      "Tờ 17b: Long Trát nối ngôi trước linh cữu, mẹ họ Đỗ, năm sinh 1173; đầu niên hiệu Trinh Phù 1176.",
    limits:
      "Dòng tổng kết nhiệm kỳ ghi 1176–1210, nhưng đoạn trước và mục 1175 ghi việc lên ngôi năm 1175. Dùng năm đăng cơ 1175, không đồng nhất với năm đổi niên hiệu 1176.",
  }),
  source({
    id: "ly-annals-hue-tong",
    title: "Đại Việt sử ký toàn thư — Lý Huệ Tông hoàng đế",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/36-Hue-Tong-Hoang-De?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển IV",
    readLocation:
      "Tờ 27b: thái tử Sảm nối ngôi Cao Tông, cha mẹ, năm sinh 1194, cùng Đàm thái hậu nghe chính sự.",
    limits:
      "Nối ngôi sau khi Cao Tông mất năm 1210; niên hiệu Kiến Gia bắt đầu 1211. Không tự chuyển ngày tháng âm lịch. Mô tả bệnh trạng trong sử liệu không phải chẩn đoán y khoa hiện đại.",
  }),
  source({
    id: "ly-annals-chieu-hoang",
    title: "Đại Việt sử ký toàn thư — Lý Chiêu Hoàng",
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/37-Chieu-Hoang?uiLang=en",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển IV",
    readLocation:
      "Tờ 32b: Hán văn và phiên âm về tên Phật Kim, Thiên Hinh, quan hệ với Huệ Tông và việc truyền ngôi.",
    limits:
      "Đã đọc Hán văn và phiên âm; bản dịch Việt không hiện đầy đủ trên trang. Cách đánh giá nữ chủ trong lời bình là quan điểm sử quan, không dùng làm kết luận hiện đại.",
  }),
  source({
    id: "ly-annals-iii-b",
    title: "Đại Việt sử ký toàn thư — Bản kỷ III(b), thời Lý Thần Tông",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vnthuquan.net/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-15",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển III",
    readLocation:
      "Các mục 1128 (29b–32a), 1129 (32b), 1130 (35a), 1132 (37a–37b), 1136 (39b–40a), 1138 (42a–42b).",
    limits:
      "Bản đánh máy có lỗi; chưa xác nhận đủ ấn bản và người dịch. Chuyện thác sinh, phép thuật và lời bình sử quan cần phân biệt với ghi chép chính sự. Không coi bản chép lại là nguồn độc lập với trang Nôm Foundation.",
  }),
  source({
    id: "ly-annals-iv-a",
    title: "Đại Việt sử ký toàn thư — Bản kỷ IV(a), Anh Tông và đầu Cao Tông",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vnthuquan.net/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-16",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển IV",
    readLocation:
      "1140–1141 (1b–3a), 1149 (6b), 1150 (7a–9b), 1158 (12b–13a), 1164, 1171–1172 (15a–15b), 1175 (16b–17b), 1176 (18a), 1179 (18b–19a).",
    limits:
      "Có lỗi đánh máy, tên và số năm; dẫn vị trí quyển/tờ để truy nguyên. Đối thoại và nhận xét về người cầm quyền là lời được sử liệu truyền lại. Không coi bản chép lại là nguồn độc lập với Nôm Foundation.",
  }),
  source({
    id: "ly-annals-iv-b",
    title:
      "Đại Việt sử ký toàn thư — Bản kỷ IV(b), cuối Cao Tông đến Chiêu Hoàng",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vnthuquan.net/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-17",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển IV",
    readLocation:
      "1208–1209 (25a–26a), 1210 (26b–27b), 1216 (29a), 1217–1218 (30a), 1223–1224 (31a–32a), 1225 (32b–35a).",
    limits:
      "Có lỗi số hóa ghi 1125 ở mục Ất Dậu 1225. Giữ năm và hệ lịch theo nguồn; không tự chuẩn hóa ngày dương. Bệnh trạng và lời bình không dùng để chẩn đoán hiện đại hay quy kết một nguyên nhân duy nhất cho việc chuyển triều.",
  }),
  source({
    id: "ly-to-hien-thanh-research",
    title:
      "Đôi điều hiểu thêm về Tô Hiến Thành qua văn bản Tô tướng công thực lục",
    author: "Đỗ Thị Hảo",
    publisher: "Viện Nghiên cứu Hán Nôm — Thông báo Hán Nôm học 1998",
    year: 1998,
    edition: "Thông báo Hán Nôm học 1998, tr.146–151; đăng lại 27/9/2007",
    url: "https://hannom.vass.gov.vn/tong-muc-luc/18-doi-dieu-hieu-them-ve-to-hien-thanh-qua-van-ban-to-tuong-cong-thuc-luc-tbhnh-1998-505627",
    type: "research",
    readLocation:
      "Các đoạn đối chiếu Toàn thư IV17a, IV19a; mục quê quán Hạ Mỗ, ngày sinh và vấn đề khoa bảng.",
    limits:
      "Tác giả phân biệt truyện ký địa phương với chính sử, nêu nhiều điều còn cần nghiên cứu. Không coi năm sinh hoặc việc đỗ khoa 1138 là đã được xác lập; chính sử xác nhận mất tháng sáu năm 1179.",
  }),
  source({
    id: "ly-to-hien-thanh-heritage",
    title: "Tô Hiến Thành — Vì nước tiến cử người hiền, không vì ơn riêng",
    publisher: "Trung tâm Bảo tồn Di sản Thăng Long–Hà Nội",
    year: 2013,
    url: "https://hoangthanhthanglong.vn/to-hien-thanh-vi-nuoc-tien-cu-nguoi-hien-khong-vi-on-rieng/",
    type: "heritage",
    readLocation:
      "Các đoạn Anh Tông ủy thác Long Cán, Chiêu Linh thái hậu muốn phục lập Long Xưởng, tiến cử Trần Trung Tá và năm mất 1179.",
    limits:
      "Bài phổ thông kể mở rộng; chỉ dùng các nội dung đã đối chiếu chính sử. Không dùng chi tiết thi 1138 hoặc cách quy việc suy vong nhà Lý cho một người phụ chính.",
  }),
  source({
    id: "ly-van-don-heritage",
    title: "Di tích thương cảng Vân Đồn",
    author: "T.H",
    publisher: "Ủy ban Nhà nước về người Việt Nam ở nước ngoài — Quê Hương",
    year: 2012,
    url: "https://scov.gov.vn/dat-nuoc-con-nguoi/dat-nuoc-viet-nam/di-tich-thuong-cang-van-don.html",
    type: "heritage",
    upstream: "quehuongonline.vn; bài dẫn Toàn thư và mô tả dấu tích khảo cổ",
    readLocation:
      "Đầu bài về mốc 1149; đoạn dẫn Toàn thư Kỷ Tỵ 1149 và các bến bãi trên đảo Cống Đông, Cống Hẹp, Cống Yên, Ngọc Vừng, Quan Lạn.",
    limits:
      "Không dùng đoạn nhầm năm1667 ở thời Lê Thánh Tông. Vân Đồn là hệ thống bến nhiều đảo, không một tọa độ duy nhất; tránh khẳng định tuyệt đối cảng ngoại thương đầu tiên.",
  }),
];

const evidence = (id: string, text: string, refs: Ref[], note?: string) =>
  claim(id, text, refs, {
    kind: "chronicle",
    status: "draft",
    ...(note ? { note } : {}),
  });

evidence(
  "ly-van-don-context",
  "Thời Lý Anh Tông, hoạt động trao đổi bằng đường biển gắn Đại Việt với các thương nhân bên ngoài. Năm 1149, thuyền buôn nước ngoài đến Hải Đông và xin được cư trú, buôn bán.",
  [
    ["ly-annals-iv-a", "Bản kỷ IV, mục Kỷ Tỵ 1149, tờ 6b"],
    ["ly-van-don-heritage", "Đầu bài và đoạn dẫn Toàn thư về 1149"],
  ],
);
evidence(
  "ly-van-don-establishment",
  "Triều đình cho lập một trang trên vùng hải đảo, đặt tên Vân Đồn, làm nơi mua bán hàng hóa và tiếp nhận sản vật. Việc tập trung thuyền buôn vào một đầu mối cũng đặt giao thương trong sự quản lý của nhà nước.",
  [["ly-annals-iv-a", "Mục 1149: cho lập trang ở hải đảo, gọi là Vân Đồn"]],
  "Câu thứ hai là cách giải thích ý nghĩa việc tập trung giao thương; không suy ra bộ máy thuế quan cụ thể.",
);
evidence(
  "ly-van-don-traces",
  "Các dấu tích của thương cảng cổ phân bố ở nhiều bến trên quần đảo Vân Hải. Đồ gốm và tiền đồng được phát hiện tại các bến cho thấy hoạt động giao thương tiếp tục qua nhiều triều đại.",
  [
    [
      "ly-van-don-heritage",
      "Đoạn bến Cống Đông, Cống Hẹp, Cống Yên, Ngọc Vừng, Minh Châu, Quan Lạn; gốm và tiền đồng",
    ],
  ],
);

evidence(
  "ly-succession-1175-context",
  "Trước khi mất, Lý Anh Tông đã phế thái tử Long Xưởng và chọn người con còn nhỏ là Long Trát kế vị. Năm 1175, ông giao Tô Hiến Thành giúp đỡ thái tử và gánh việc triều chính.",
  [["ly-annals-iv-a", "Các mục 1174–1175, tờ 16a–16b"]],
);
evidence(
  "ly-succession-1175-dispute",
  "Khi Anh Tông mất, Chiêu Linh thái hậu tìm cách đưa Long Xưởng trở lại vị trí kế thừa. Tô Hiến Thành giữ di mệnh, từ chối việc thay đổi người nối ngôi.",
  [
    ["ly-annals-iv-a", "Mục 1175, tờ 16b–17a"],
    [
      "ly-to-hien-thanh-heritage",
      "Đoạn Chiêu Linh thái hậu muốn phục lập Long Xưởng",
    ],
  ],
);
evidence(
  "ly-succession-1175-result",
  "Long Trát lên ngôi năm 1175, tức Lý Cao Tông; Tô Hiến Thành tiếp tục phò giúp nhà vua nhỏ tuổi. Niên hiệu Trinh Phù được đặt vào đầu năm 1176, sau thời điểm lên ngôi.",
  [
    ["ly-annals-cao-tong", "Bản kỷ IV17b"],
    [
      "ly-annals-iv-a",
      "Mục 1176, tờ 18a, lời giải thích lên ngôi từ tháng bảy năm trước",
    ],
  ],
);

evidence(
  "ly-quach-boc-context",
  "Năm 1209, xung đột giữa Phạm Du và Phạm Bỉnh Di kéo đến triều đình. Cao Tông bắt giam Bỉnh Di cùng con trai, khiến thuộc tướng của Bỉnh Di là Quách Bốc đem quân vào kinh thành.",
  [["ly-annals-iv-b", "Mục 1209, tờ 25a–25b"]],
);
evidence(
  "ly-quach-boc-development",
  "Quân Quách Bốc phá cửa thành, triều đình tan tác và Cao Tông phải lánh đi. Quách Bốc đưa hoàng tử Thầm lên ngôi, trong khi thái tử Sảm đến vùng Hải Ấp và kết hôn với con gái Trần Lý.",
  [["ly-annals-iv-b", "Mục 1209, tờ 25b–26a"]],
);
evidence(
  "ly-quach-boc-result",
  "Lực lượng họ Trần tham gia đánh dẹp và đưa Cao Tông trở lại kinh thành. Trong biến động ấy, quan hệ giữa thái tử Sảm với gia đình Trần Lý trở thành một mắt xích của quyền lực cuối triều Lý.",
  [["ly-annals-iv-b", "Mục 1209–1210, tờ 26a–26b"]],
  "Sự kiện ghi nhận trong sử liệu; ý nghĩa của liên minh hôn nhân là diễn giải từ trình tự các sự kiện, không phải lời tuyên bố về ý định của mọi người tham gia.",
);

evidence(
  "ly-chieu-hoang-accession-context",
  "Đến năm 1224, Huệ Tông có bệnh, không có con trai kế vị; các con gái được chia những lộ làm ấp. Lực lượng quân điện tiền bảo vệ cung đình nằm dưới quyền Trần Thủ Độ.",
  [["ly-annals-iv-b", "MụcGiápThân 1224, tờ 31b–32a"]],
);
evidence(
  "ly-chieu-hoang-accession",
  "Tháng mười năm Giáp Thân 1224, Huệ Tông lập công chúa Chiêu Thánh làm hoàng thái tử rồi truyền ngôi. Chiêu Thánh trở thành Lý Chiêu Hoàng, đặt niên hiệu Thiên Chương Hữu Đạo; Huệ Tông xuất gia tại chùa Chân Giáo.",
  [
    ["ly-annals-iv-b", "Mục 1224, tờ 32a"],
    ["the-thu", "Chương4, phầnII, mục8–9"],
  ],
);
evidence(
  "ly-chieu-hoang-power",
  "Chiêu Hoàng nhận ngôi khi còn nhỏ, trong lúc các nhân vật họ Trần đã giữ những vị trí trọng yếu. Cuộc hôn nhân với Trần Cảnh và việc nhường ngôi cuối năm Ất Dậu 1225 đánh dấu kết thúc triều Lý.",
  [["ly-annals-iv-b", "KỷChiêuHoàng 1225, tờ 32b–35a"]],
  "Giữ mốc 1225/1226 theo cách ghi lịch của dữ liệu chuyển triều; không tạo một sự kiện thứ hai cho năm 1226.",
);

export const lyLateEvents: HistoricalEvent[] = [
  {
    id: "ly-thuong-cang-1149",
    periodIds: ["ly"],
    name: "Lập thương cảng Vân Đồn",
    date: date(1149, 1149, "1149"),
    placeIds: ["van-don"],
    personIds: ["ly-anh-tong"],
    contextClaimIds: ["ly-van-don-context"],
    developmentClaimIds: ["ly-van-don-establishment"],
    resultClaimIds: ["ly-van-don-traces"],
    consequence:
      "Giao thương bằng đường biển mở thêm những kết nối nào cho Đại Việt thời Lý?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Mốc năm theo sử liệu; thương cảng gồm nhiều bến trên các đảo, không đồng nhất với một bến hiện đại.",
  },
  {
    id: "ly-ke-vi-1175",
    periodIds: ["ly"],
    name: "Tô Hiến Thành và việc kế vị năm 1175",
    date: date(1175, 1175, "1175"),
    placeIds: ["thang-long"],
    personIds: ["ly-anh-tong", "ly-cao-tong", "to-hien-thanh"],
    contextClaimIds: ["ly-succession-1175-context"],
    developmentClaimIds: ["ly-succession-1175-dispute"],
    resultClaimIds: ["ly-succession-1175-result"],
    consequence:
      "Khi người kế vị còn nhỏ, điều gì giữ cho quyết định truyền ngôi được thực hiện?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Đăng cơ 1175, đổi niên hiệu 1176; không coi đó là hai lần lên ngôi.",
  },
  {
    id: "ly-quach-boc-1209",
    periodIds: ["ly"],
    name: "Loạn Quách Bốc và bước ngoặt Hải Ấp",
    date: date(1209, 1210, "1209–1210"),
    placeIds: ["thang-long", "hai-ap"],
    personIds: [
      "ly-cao-tong",
      "ly-hue-tong",
      "tran-ly",
      "tran-thi-dung",
      "tran-tu-khanh",
    ],
    contextClaimIds: ["ly-quach-boc-context"],
    developmentClaimIds: ["ly-quach-boc-development"],
    resultClaimIds: ["ly-quach-boc-result"],
    consequence:
      "Vì sao một biến động trong kinh thành lại mở đường cho thế lực ở Hải Ấp tiến vào triều đình?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Loạn nổ ra năm 1209; mục 1210 còn ghi việc đón thái tử và hoạt động của Trần Tự Khánh. Hải Ấp giữ vị trí tương đối.",
  },
  {
    id: "ly-chieu-hoang-1224",
    periodIds: ["ly"],
    name: "Lý Chiêu Hoàng lên ngôi",
    date: date(1224, 1224, "1224"),
    placeIds: ["thang-long"],
    personIds: [
      "ly-hue-tong",
      "ly-chieu-hoang",
      "tran-thi-dung",
      "tran-thu-do",
    ],
    contextClaimIds: ["ly-chieu-hoang-accession-context"],
    developmentClaimIds: ["ly-chieu-hoang-accession"],
    resultClaimIds: ["ly-chieu-hoang-power"],
    consequence:
      "Ngôi vua được truyền lại, nhưng quyền điều hành thực tế khi ấy thuộc về những ai?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Tháng mười nămGiápThân theo sử liệu; không tự chuyển sang ngày dương lịch.",
  },
];

const reignRows: [string, string, number, number, string, string, string][] = [
  [
    "ly-than-tong",
    "Lý Thần Tông",
    1127,
    1138,
    "1127/1128–1138",
    "ly-annals-than-tong",
    "Bản kỷ III28a; đăng cơ cuối nămĐinhMùi, niên hiệuThiênThuận bắt đầu 1128",
  ],
  [
    "ly-anh-tong",
    "Lý Anh Tông",
    1138,
    1175,
    "1138–1175",
    "ly-annals-anh-tong",
    "Bản kỷ IV1a",
  ],
  [
    "ly-cao-tong",
    "Lý Cao Tông",
    1175,
    1210,
    "1175–1210",
    "ly-annals-cao-tong",
    "Bản kỷ IV17b; đăng cơ 1175, TrinhPhù từ 1176",
  ],
  [
    "ly-hue-tong",
    "Lý Huệ Tông",
    1210,
    1224,
    "1210–1224",
    "ly-annals-hue-tong",
    "Bản kỷ IV27b; nối ngôi khi CaoTông mất 1210, KiếnGia từ 1211",
  ],
  [
    "ly-chieu-hoang",
    "Lý Chiêu Hoàng",
    1224,
    1226,
    "1224–1225/1226",
    "ly-annals-chieu-hoang",
    "Bản kỷ IV32b; đối chiếuThếthứChương4II.9 vàsựkiệnchuyểngôi 1225/1226",
  ],
];

export const lyLateTenures: RoleTenure[] = reignRows.map(
  ([personId, name, start, end, label, sourceId, location]) => ({
    id: `ly-tenure-${personId}`,
    periodId: "ly",
    dynastyId: "ly-dynasty",
    polityId: "dai-viet",
    personId,
    role: "reigning",
    label: `Hoàng đế · ${name}`,
    date: date(start, end, label),
    claimIds: [
      evidence(
        `ly-reign-${personId}`,
        `${name} giữ ngôi trong khoảng ${label}.`,
        [
          [sourceId, location],
          ["the-thu", `Chương4, phầnII, mục${name}`],
        ],
      ),
    ],
  }),
);

const relationship = (
  id: string,
  from: string,
  to: string,
  type: Relationship["type"],
  label: string,
  text: string,
  refs: Ref[],
  relationshipDate?: ReturnType<typeof date>,
): Relationship => ({
  id,
  from,
  to,
  type,
  label,
  claimIds: [evidence(`${id}-claim`, text, refs)],
  status: "draft",
  ...(relationshipDate ? { date: relationshipDate } : {}),
});

export const lyLateRelationships: Relationship[] = [
  relationship(
    "ly-family-sung-hien-than-tong",
    "sung-hien-hau",
    "ly-than-tong",
    "parent",
    "Cha–con",
    "Sùng Hiền hầu là cha ruột của Lý Dương Hoán, tức Lý Thần Tông; mẹ Dương Hoán là phu nhân họ Đỗ.",
    [["ly-annals-than-tong", "Bản kỷ III28a"]],
  ),
  relationship(
    "ly-family-nhan-tong-sung-hien",
    "ly-nhan-tong",
    "sung-hien-hau",
    "sibling",
    "Anh–em",
    "Sùng Hiền hầu là em của Lý Nhân Tông; Dương Hoán gọi Nhân Tông bằng bác.",
    [
      ["ly-annals-than-tong", "Bản kỷ III28a"],
      ["the-thu", "Chương4, phầnII.5, LýThầnTông"],
    ],
  ),
  relationship(
    "ly-adoption-nhan-than-tong",
    "ly-nhan-tong",
    "ly-than-tong",
    "political",
    "Nhận làm con nuôi",
    "Lý Nhân Tông nhận Dương Hoán làm con nuôi, nuôi trong cung và lập làm hoàng thái tử. Người kế vị ấy là con Sùng Hiền hầu, không phải con ruột Nhân Tông.",
    [
      ["ly-annals-than-tong", "Bản kỷ III28a"],
      ["the-thu", "Chương4, phầnII.5"],
    ],
  ),
  relationship(
    "ly-family-than-anh-tong",
    "ly-than-tong",
    "ly-anh-tong",
    "parent",
    "Cha–con",
    "Lý Anh Tông, tên Thiên Tộ, là con Lý Thần Tông và hoàng hậu họ Lê.",
    [["ly-annals-anh-tong", "Bản kỷ IV1a"]],
  ),
  relationship(
    "ly-family-anh-cao-tong",
    "ly-anh-tong",
    "ly-cao-tong",
    "parent",
    "Cha–con",
    "Lý Cao Tông, tên Long Trát, là con thứ sáu của Lý Anh Tông và hoàng hậu họ Đỗ.",
    [["ly-annals-cao-tong", "Bản kỷ IV17b"]],
  ),
  relationship(
    "ly-family-cao-hue-tong",
    "ly-cao-tong",
    "ly-hue-tong",
    "parent",
    "Cha–con",
    "Lý Huệ Tông, tên Sảm, là con trưởng của Lý Cao Tông và hoàng hậu họ Đàm.",
    [["ly-annals-hue-tong", "Bản kỷ IV27b"]],
  ),
  relationship(
    "ly-family-hue-chieu-hoang",
    "ly-hue-tong",
    "ly-chieu-hoang",
    "parent",
    "Cha–con",
    "Lý Chiêu Hoàng là con gái thứ của Lý Huệ Tông và Trần Thị Dung.",
    [
      ["ly-annals-chieu-hoang", "Bản kỷ IV32b"],
      ["the-thu", "Chương4, phầnII.9"],
    ],
  ),
  relationship(
    "ly-family-hue-thuan-thien",
    "ly-hue-tong",
    "thuan-thien",
    "parent",
    "Cha–con",
    "Thuận Thiên là con gái đầu của Lý Huệ Tông và Trần Thị Dung, sinh năm 1216.",
    [["ly-annals-iv-b", "MụcBínhTý 1216, tờ 29a"]],
  ),
  relationship(
    "ly-marriage-hue-dung",
    "ly-hue-tong",
    "tran-thi-dung",
    "marriage",
    "Hôn nhân",
    "Thái tử Sảm kết hôn với con gái Trần Lý khi đến Hải Ấp trong loạn 1209. Trần thị được lập làm hoàng hậu của Huệ Tông năm 1216.",
    [["ly-annals-iv-b", "Mục 1209, tờ 26a; mục 1216, tờ 29a"]],
    date(1209, 1224, "Kết hôn 1209 · hoàng hậu từ 1216"),
  ),
  relationship(
    "ly-political-to-hien-thanh-cao-tong",
    "to-hien-thanh",
    "ly-cao-tong",
    "political",
    "Phụ chính",
    "Tô Hiến Thành nhận di mệnh của Lý Anh Tông giúp Long Trát, bảo vệ quyết định kế vị và phò giúp Cao Tông cho đến khi mất năm 1179.",
    [
      ["ly-annals-iv-a", "Mục 1175–1179, tờ 16b–19a"],
      ["ly-to-hien-thanh-research", "Đối chiếu chính sửIV17a,IV19a"],
    ],
    date(1175, 1179, "1175–1179"),
  ),
  relationship(
    "ly-political-do-anh-vu-anh-tong",
    "do-anh-vu",
    "ly-anh-tong",
    "political",
    "Phụ chính",
    "Đỗ Anh Vũ là đại thần giữ quyền quyết định nhiều việc triều chính khi Lý Anh Tông còn nhỏ; năm 1140 được giao coi chính sự trong ngoài.",
    [["ly-annals-iv-a", "Mục 1140, tờ 1b; mục 1150, tờ 7a"]],
  ),
  relationship(
    "ly-political-tu-khanh-hue-tong",
    "tran-tu-khanh",
    "ly-hue-tong",
    "political",
    "Phụ chính",
    "Năm 1216, Lý Huệ Tông phong Trần Tự Khánh làm thái úy phụ chính. Tự Khánh giữ vai trò quân sự và chính trị trọng yếu cho đến khi mất năm 1223.",
    [["ly-annals-iv-b", "Mục 1216, tờ 29a; mục 1223, tờ 31a"]],
    date(1216, 1223, "1216–1223"),
  ),
  ...[
    ["ly-nhan-tong", "ly-than-tong", 1127, "1127/1128", "Lý Thần Tông"],
    ["ly-than-tong", "ly-anh-tong", 1138, "1138", "Lý Anh Tông"],
    ["ly-anh-tong", "ly-cao-tong", 1175, "1175", "Lý Cao Tông"],
    ["ly-cao-tong", "ly-hue-tong", 1210, "1210", "Lý Huệ Tông"],
    ["ly-hue-tong", "ly-chieu-hoang", 1224, "1224", "Lý Chiêu Hoàng"],
  ].map(([from, to, year, label, name]) =>
    relationship(
      `ly-succession-${from}-${to}`,
      String(from),
      String(to),
      "succession",
      "Kế vị",
      `${name} nối ngôi vào mốc ${label}.`,
      [
        [
          "the-thu",
          "Chương 4, phần II, thứ tự các vua thời Lý; đối chiếu các mục Toàn thư tương ứng",
        ],
      ],
      date(Number(year), Number(year), String(label)),
    ),
  ),
];

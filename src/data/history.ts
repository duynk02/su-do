import {
  date,
  type Claim,
  type Citation,
  type Period,
  type Person,
  type RoleTenure,
  type Relationship,
  type Place,
  type StoryChapter,
  type HistoricalEvent,
  type Polity,
  type Dynasty,
  type TerritorySnapshot,
  type MediaAsset,
  type ReviewRecord,
} from "./schema";
export { sources } from "./sources";

export const claims: Claim[] = [];
export const citations: Citation[] = [];
type Ref = [sourceId: string, location: string, supports?: string];
function claim(
  id: string,
  text: string,
  refs: Ref[],
  options: Partial<Claim> = {},
) {
  claims.push({
    id,
    text,
    kind: "evidence",
    status: refs.length > 1 ? "cross-referenced" : "draft",
    published: true,
    ...options,
  });
  refs.forEach(([sourceId, location, supports], i) =>
    citations.push({
      id: `${id}-ref-${i + 1}`,
      claimId: id,
      sourceId,
      location,
      supports:
        supports ??
        "Hỗ trợ phần nội dung được nêu trong khẳng định; không mở rộng sang các chi tiết ngoài vị trí dẫn.",
    }),
  );
  return id;
}

claim(
  "late-ly",
  "Đầu thế kỷ XIII, quyền lực triều Lý suy yếu trong khi các lực lượng địa phương cạnh tranh. Họ Trần ở Hải Ấp là một trong những lực lượng quân sự có ảnh hưởng; Trần Tự Khánh và Trần Thừa dần giữ vị trí quan trọng trong triều.",
  [["ly-study", "Trang in 347–355, các đoạn về Hải Ấp và thế lực địa phương"]],
  { kind: "interpretation" },
);
claim(
  "tran-origins",
  "Tài liệu nghiên cứu mô tả Trần Lý là hào trưởng vùng Hải Ấp, gia đình gắn với nghề đánh cá. Nền tảng địa phương, lực lượng quân sự và quan hệ với triều đình cùng giúp họ Trần gia tăng ảnh hưởng.",
  [["ly-study", "Trang in 347–355, đoạn Trần Lý và phần kết cuối triều Lý"]],
  { kind: "interpretation" },
);
claim(
  "family",
  "Trần Lý là cha của Trần Thừa, Trần Tự Khánh và Trần Thị Dung. Trần Thừa là cha Trần Cảnh. Các nguồn thống nhất các quan hệ này nhưng khác cách xếp thứ bậc anh em; sơ đồ không gán thứ bậc.",
  [
    ["tran-chronology", "Mục 1. Trần Thái Tông, đoạn gia tộc"],
    ["tran-thua", "Đoạn ‘Từ phận ngư, tiều’"],
  ],
);
claim(
  "transition",
  "Lý Chiêu Hoàng nhường ngôi cho Trần Cảnh sau cuộc hôn nhân do những người nắm quyền trong cung đình sắp đặt. Trần Thủ Độ và Trần Thị Dung có vai trò trong quá trình chuyển giao. Hôn nhân nằm trong bối cảnh họ Trần đã nắm nhiều vị trí quyền lực.",
  [
    [
      "ly-transition",
      "Đoạn về Điện tiền chỉ huy sứ, việc kiểm soát cung đình và chiếu nhường ngôi",
    ],
    ["ly-study", "Trang in 355–356, đoạn chuyển ngôi"],
  ],
);
claim(
  "date-disagreement",
  "Mốc mở đầu triều Trần thường được ghi 1225 hoặc 1226. Bài về chiếu nhường ngôi ghi ngày 11 tháng Chạp năm Ất Dậu; bài biên niên ghi ngày 21 tháng 10 năm Ất Dậu. Sử Đồ giữ dị biệt này và chưa quy đổi sang ngày dương lịch.",
  [
    [
      "ly-transition",
      "Đoạn ‘ngày 11 tháng Chạp năm Ất Dậu (1225)’",
      "Cách ghi ngày trong bài về chiếu nhường ngôi",
    ],
    [
      "tran-chronology",
      "Mục 1, đoạn ‘ngày 21 tháng 10 năm Ất Dậu’",
      "Cách ghi khác trong bài biên niên; không xác lập hai sự kiện khác nhau",
    ],
  ],
  {
    note: "Khác quy ước năm có thể liên quan hệ lịch; riêng hai cách ghi ngày trong các bài còn cần đối chiếu bản sử và nghiên cứu lịch pháp. Không chỉ dựa vào năm 1225/1226 để kết luận.",
  },
);
claim(
  "thua-role",
  "Trần Thừa được tôn làm Thái thượng hoàng để cùng lo việc triều chính; ông không trực tiếp ở ngôi hoàng đế. Thái Tổ là miếu hiệu được truy tôn, không phải một đời vua trị vì trước Trần Thái Tông.",
  [
    ["tran-thua", "Mục ‘Trở thành Thái tổ’, đoạn dẫn Danh tướng Việt Nam"],
    ["tran-chronology", "Mục 1, đoạn tôn Trần Thừa làm Thượng hoàng"],
  ],
);
claim(
  "thua-dates",
  "Bài giới thiệu ghi Trần Thừa được tôn làm Thái thượng hoàng năm 1226 và mất năm 1234. Bài cũng ghi việc đổi miếu hiệu từ Huy Tông thành Thái Tổ vào năm 1248.",
  [["tran-thua", "Mục ‘Trở thành Thái tổ’, các đoạn 1226, 1234, 1248"]],
  { kind: "chronicle" },
);
claim(
  "thu-do",
  "Trần Thủ Độ giữ chức Điện tiền chỉ huy sứ cuối Lý, nắm lực lượng bảo vệ cung đình và tham gia tổ chức chuyển ngôi. Chức vụ và ảnh hưởng chính trị cần được đọc riêng với ngôi vua của Trần Cảnh.",
  [
    [
      "ly-transition",
      "Các đoạn về chức Điện tiền chỉ huy sứ và kiểm soát cung cấm",
    ],
  ],
);
claim(
  "chieu-hoang",
  "Lý Chiêu Hoàng là người đứng đầu triều Lý trước khi nhường ngôi cho Trần Cảnh; bà còn được gọi là Chiêu Thánh. Trần Thị Dung là mẹ của bà.",
  [
    [
      "ly-transition",
      "Đoạn công chúa Chiêu Thánh lên ngôi và đoạn về Thái hậu Trần Thị Dung",
    ],
  ],
);
claim(
  "war-1258",
  "Năm 1258, quân Mông Cổ tiến vào Đại Việt. Triều Trần rút khỏi Thăng Long rồi phản công ở Đông Bộ Đầu; cuộc tiến công của quân Mông Cổ bị đẩy lui.",
  [
    ["wars-education", "Mục I, phần diễn biến và kết quả"],
    ["tran-society", "Phần kháng chiến lần thứ nhất, trước trang in 518"],
  ],
);
claim(
  "war-1285",
  "Năm 1285, nhà Nguyên mở cuộc xâm lược. Quân Trần bảo toàn lực lượng rồi phản công ở Hàm Tử, Chương Dương và các địa điểm khác, giành lại Thăng Long. Đây là cuộc chiến khác với cuộc tiến công của Mông Cổ năm 1258.",
  [["wars-education", "Mục II, phần diễn biến và kết quả"]],
);
claim(
  "war-1288",
  "Cuộc xâm lược tiếp theo của nhà Nguyên diễn ra trong 1287–1288. Chiến thắng trên sông Bạch Đằng năm 1288 gắn với Trần Quốc Tuấn, vua Trần Nhân Tông và Thượng hoàng Trần Thánh Tông.",
  [
    ["wars-education", "Mục III, phần diễn biến và kết quả"],
    ["bach-dang-2019", "Đoạn mở đầu về người chỉ huy trận Bạch Đằng"],
  ],
);
claim(
  "bach-dang-uncertainty",
  "Vị trí và cách bố trí các bãi cọc vẫn có những diễn giải khác nhau. Bài năm 2013 không ủng hộ việc cắm cọc ngang dòng chính hiện nay; bài năm 2019 nêu khả năng đó khi xét biến đổi địa mạo. Chưa thể dựng một trận địa chính xác từ hai bài này.",
  [
    ["bach-dang-2013", "Đoạn về địa hình, dòng chảy cổ và ba bãi cọc"],
    ["bach-dang-2019", "Đoạn về dòng chủ lưu và thay đổi vùng cửa sông"],
  ],
  { kind: "interpretation" },
);
claim(
  "education",
  "Năm 1247, triều Trần tổ chức khoa thi và đặt danh hiệu Tam khôi: Trạng nguyên, Bảng nhãn, Thám hoa. Giáo dục và tuyển quan là một phần đời sống thời Trần, bên cạnh những câu chuyện chiến tranh.",
  [["tran-society", "Trang in 567, đoạn khoa thi năm 1247"]],
);
claim(
  "rural-life",
  "Nông dân thời Trần làm việc trong làng xã, thái ấp và điền trang, với địa vị và nghĩa vụ khác nhau. Nghiên cứu phân biệt nông dân có ruộng, tá điền và nông nô, nô tỳ; không thể xem tất cả người dân có cùng một trải nghiệm.",
  [["tran-society", "Trang in 611–614, các mục nông dân và nông nô, nô tỳ"]],
  { kind: "interpretation" },
);
claim(
  "truc-lam",
  "Quần thể Yên Tử, Vĩnh Nghiêm, Côn Sơn–Kiếp Bạc gắn với di sản triều Trần và truyền thống Phật giáo Trúc Lâm. Di tích, văn bia và khảo cổ giúp mở rộng câu chuyện ra ngoài lịch sử cung đình.",
  [["unesco-yen-tu", "Description, đoạn về Trúc Lâm và các loại hình di tích"]],
);
claim(
  "huyen-marriage",
  "Năm 1306, Huyền Trân kết hôn với vua Champa Chế Mân, gắn với việc chuyển hai châu Ô, Lý cho Đại Việt. Nguồn giới thiệu sự kiện này không cung cấp đường biên đủ chi tiết để dựng polygon lịch sử.",
  [["huyen-tran", "Đoạn mở đầu ghi năm 1306 và hai châu Ô, Lý"]],
);
claim(
  "ho-reform-dates",
  "Tiền giấy Thông bảo hội sao được phát hành năm 1396; chính sách hạn điền được ban hành năm 1397. Những thay đổi do Hồ Quý Ly thúc đẩy này bắt đầu khi triều Trần vẫn tồn tại, trước khi nhà Hồ được thành lập.",
  [["ho-reforms", "Đoạn tiền giấy và mục ‘Chính sách hạn điền’"]],
);
claim(
  "tran-ending",
  "Cuối thế kỷ XIV, triều Trần trải qua xung đột cung đình và chiến tranh với Champa. Hồ Quý Ly dần nắm quyền, ép chuyển ngôi năm 1400. Nhà Hồ là triều đại kế tiếp, với quốc hiệu Đại Ngu và kinh đô Tây Đô.",
  [
    ["tran-chronology", "Các mục Nghệ Tông đến Thiếu Đế"],
    [
      "ho-chronology",
      "Tiêu đề và mục Hồ Quý Ly",
      "Quốc hiệu, kinh đô và phạm vi nhà Hồ",
    ],
  ],
);
claim(
  "nhat-le-reign",
  "Dương Nhật Lễ ở ngôi trong 1369–1370, giữa Trần Dụ Tông và Trần Nghệ Tông. Dù thường được tách khỏi số các vua họ Trần, ông vẫn phải có mặt trong chuỗi người giữ ngôi. Ghi chép về xuất thân là lời của sử liệu, không phải suy luận từ họ tên.",
  [
    [
      "nhat-le",
      "Đầu bài; các đoạn Cương mục quyển 10 về việc lập và phế Nhật Lễ",
    ],
  ],
  { kind: "chronicle" },
);
claim(
  "thang-long",
  "Khu trung tâm Hoàng thành Thăng Long lưu giữ dấu tích của một trung tâm quyền lực lâu dài ở châu thổ sông Hồng. Điểm trên bản đồ là tọa độ di sản hiện nay, dùng để định hướng không gian kinh thành.",
  [["unesco-thang-long", "Description và tọa độ di sản"]],
);
claim(
  "dong-bo-place",
  "Đông Bộ Đầu là bến sông ở phía đông Thăng Long, gắn với cuộc phản công năm 1258. Nguồn chỉ giúp xác định tương đối; Sử Đồ không đặt một chấm chính xác cho chiến trường.",
  [
    [
      "dong-bo-dau",
      "Các đoạn giải nghĩa địa danh và cuộc kháng chiến năm 1258",
    ],
  ],
);
claim(
  "met-artifact",
  "Chiếc bát gốm trang trí hoa nâu trong bộ sưu tập The Met được ghi niên đại thế kỷ XIV–đầu XV, xuất xứ vùng sông Hồng. Đây là ảnh hiện vật, không phải hình tái dựng; không gán chắc hiện vật cho riêng một triều vua.",
  [
    [
      "met-bowl",
      "Artwork Details: Date, Culture, Medium và Object Number 2021.182",
    ],
  ],
);

const rulerRows: [string, string, string, number, number, string?][] = [
  ["tran-canh", "Trần Thái Tông", "Trần Cảnh", 1225, 1258, "1225/1226–1258"],
  ["tran-thanh-tong", "Trần Thánh Tông", "Trần Hoảng", 1258, 1278],
  ["tran-nhan-tong", "Trần Nhân Tông", "Trần Khâm", 1278, 1293],
  ["tran-anh-tong", "Trần Anh Tông", "Trần Thuyên", 1293, 1314],
  ["tran-minh-tong", "Trần Minh Tông", "Trần Mạnh", 1314, 1329],
  ["tran-hien-tong", "Trần Hiến Tông", "Trần Vượng", 1329, 1341],
  ["tran-du-tong", "Trần Dụ Tông", "Trần Hạo", 1341, 1369],
  ["duong-nhat-le", "Dương Nhật Lễ", "Dương Nhật Lễ", 1369, 1370],
  ["tran-nghe-tong", "Trần Nghệ Tông", "Trần Phủ", 1370, 1372],
  ["tran-due-tong", "Trần Duệ Tông", "Trần Kính", 1372, 1377],
  ["tran-phe-de", "Trần Phế Đế", "Trần Hiện", 1377, 1388],
  ["tran-thuan-tong", "Trần Thuận Tông", "Trần Nhung", 1388, 1398],
  ["tran-thieu-de", "Trần Thiếu Đế", "Trần An", 1398, 1400],
];
export const people: Person[] = rulerRows.map(
  ([id, name, personalName, start, end, label]) => {
    const refs: Ref[] = [
      ["the-thu", `Phần II – Thế thứ các vua thời Trần, mục ${name}`],
    ];
    if (id === "tran-nhan-tong")
      refs.push([
        "nhan-tong-heritage",
        "Đoạn giới thiệu niên đại trị vì 1278–1293",
      ]);
    if (id === "tran-phe-de")
      refs.push([
        "toan-thu-phe-de",
        "Quyển VIII, tờ 1a, tên húy Hiện",
        "Hỗ trợ tên húy, không thay thế nguồn nhiệm kỳ",
      ]);
    const cid =
      id === "duong-nhat-le"
        ? "nhat-le-reign"
        : claim(
            `reign-${id}`,
            `${name} (${personalName}): ở ngôi ${label ?? `${start}–${end}`}.`,
            refs,
            id === "tran-nhan-tong"
              ? {
                  note: "Bài biên niên scov.gov.vn ghi 1279, trong khi Thế thứ và Trung tâm Bảo tồn Di sản Thăng Long ghi 1278. Dùng 1278 cho làn nhiệm kỳ; chưa tự quy đổi ngày hoặc gộp hai quy ước.",
                }
              : {},
          );
    const variants: Record<string, string[]> = {
      "tran-phe-de": ["Trần Hiệu"],
      "tran-thuan-tong": ["Trần Ngung"],
      "tran-thieu-de": ["Trần Án"],
    };
    return {
      id,
      name: id === "tran-canh" ? "Trần Cảnh" : name,
      aliases: [name, personalName, ...(variants[id] ?? [])],
      personalName,
      templeName:
        id === "duong-nhat-le" ||
        id.includes("phe-de") ||
        id.includes("thieu-de")
          ? undefined
          : name.replace("Trần ", ""),
      summaryClaimIds: [cid],
      eventIds:
        id === "tran-canh"
          ? ["chuyen-trieu", "khang-chien-1258"]
          : id === "tran-nhan-tong" || id === "tran-thanh-tong"
            ? ["khang-chien-1285", "bach-dang-1288"]
            : [],
      note:
        id === "duong-nhat-le"
          ? "Tên thường dùng trong sử liệu; việc có mặt trong chuỗi ngôi vua không xác định quan hệ huyết thống."
          : variants[id]
            ? "Tên húy dùng cách ghi trong Thế thứ; bài biên niên có biến thể được giữ trong tìm kiếm. Hai cách ghi không tạo hai nhân vật riêng."
            : undefined,
    };
  },
);
people.push(
  {
    id: "tran-thua",
    name: "Trần Thừa",
    aliases: ["Trần Thái Tổ", "Huy Tông"],
    templeName: "Thái Tổ (truy tôn)",
    title: "Thái thượng hoàng",
    summaryClaimIds: ["thua-role", "thua-dates"],
    eventIds: ["chuyen-trieu"],
    note: "Không có nhiệm kỳ hoàng đế trực tiếp trị vì. Không đặt Trần Thừa vào trước Trần Cảnh trong danh sách các vua đang ở ngôi.",
  },
  {
    id: "ly-chieu-hoang",
    name: "Lý Chiêu Hoàng",
    aliases: ["Chiêu Thánh"],
    title: "Vua cuối triều Lý",
    summaryClaimIds: ["chieu-hoang", "transition"],
    eventIds: ["chuyen-trieu"],
  },
  {
    id: "tran-thu-do",
    name: "Trần Thủ Độ",
    aliases: [],
    title: "Người tổ chức chuyển giao quyền lực",
    summaryClaimIds: ["thu-do"],
    eventIds: ["chuyen-trieu"],
  },
  {
    id: "tran-thi-dung",
    name: "Trần Thị Dung",
    aliases: ["Linh Từ quốc mẫu"],
    title: "Thái hậu cuối triều Lý",
    summaryClaimIds: ["chieu-hoang", "family", "transition"],
    eventIds: ["chuyen-trieu"],
  },
  {
    id: "tran-ly",
    name: "Trần Lý",
    aliases: [],
    title: "Hào trưởng vùng Hải Ấp",
    summaryClaimIds: ["tran-origins", "family"],
    eventIds: [],
  },
  {
    id: "tran-tu-khanh",
    name: "Trần Tự Khánh",
    aliases: [],
    title: "Nhân vật cuối triều Lý",
    summaryClaimIds: ["late-ly", "family"],
    eventIds: [],
  },
  {
    id: "tran-quoc-tuan",
    name: "Trần Quốc Tuấn",
    aliases: ["Trần Hưng Đạo", "Hưng Đạo đại vương"],
    title: "Người chỉ huy quân sự",
    summaryClaimIds: ["war-1288"],
    eventIds: ["khang-chien-1285", "bach-dang-1288"],
  },
  {
    id: "huyen-tran",
    name: "Huyền Trân",
    aliases: ["Công chúa Huyền Trân"],
    title: "Công chúa triều Trần",
    summaryClaimIds: ["huyen-marriage"],
    eventIds: ["hon-nhan-1306"],
  },
  {
    id: "che-man",
    name: "Chế Mân",
    aliases: [],
    title: "Vua Champa",
    summaryClaimIds: ["huyen-marriage"],
    eventIds: ["hon-nhan-1306"],
  },
  {
    id: "ho-quy-ly",
    name: "Hồ Quý Ly",
    aliases: ["Lê Quý Ly"],
    title: "Người nắm quyền cuối Trần, lập nhà Hồ",
    summaryClaimIds: ["ho-reform-dates", "tran-ending"],
    eventIds: ["nha-ho-1400"],
  },
);
export const tenures: RoleTenure[] = rulerRows.map(
  ([id, name, , start, end, label]) => ({
    id: `role-${id}`,
    personId: id,
    role: "reigning",
    label: `Hoàng đế · ${name}`,
    date: date(start, end, label ?? `${start}–${end}`),
    claimIds: [id === "duong-nhat-le" ? "nhat-le-reign" : `reign-${id}`],
  }),
);
tenures.push(
  {
    id: "retired-thua",
    personId: "tran-thua",
    role: "retired",
    label: "Thái thượng hoàng",
    date: date(1226, 1234, "1226–1234"),
    claimIds: ["thua-dates"],
  },
  {
    id: "retired-thai-tong",
    personId: "tran-canh",
    role: "retired",
    label: "Thái thượng hoàng",
    date: date(1258, 1277, "1258–1277"),
    claimIds: [
      claim(
        "retired-thai-tong",
        "Trần Thái Tông nhường ngôi năm 1258 và làm Thượng hoàng đến khi mất năm 1277.",
        [
          [
            "tran-chronology",
            "Mục 1 và mục 2, các đoạn nhường ngôi và năm mất",
          ],
        ],
      ),
    ],
  },
  {
    id: "retired-thanh-tong",
    personId: "tran-thanh-tong",
    role: "retired",
    label: "Thái thượng hoàng",
    date: date(1278, 1290, "1278–1290"),
    claimIds: [
      claim(
        "retired-thanh-tong",
        "Trần Thánh Tông nhường ngôi năm 1278; làm Thượng hoàng và mất năm 1290.",
        [["tran-chronology", "Mục 2. Trần Thánh Tông"]],
      ),
    ],
  },
);

export const relationships: Relationship[] = [
  ...["tran-thua", "tran-tu-khanh", "tran-thi-dung"].map((to) => ({
    id: `rel-ly-${to}`,
    from: "tran-ly",
    to,
    type: "parent" as const,
    label: "Cha – con",
    claimIds: ["family"],
    status: "cross-referenced" as const,
  })),
  {
    id: "rel-thua-canh",
    from: "tran-thua",
    to: "tran-canh",
    type: "parent",
    label: "Cha – con",
    claimIds: ["family"],
    status: "cross-referenced",
  },
  {
    id: "rel-dung-chieu",
    from: "tran-thi-dung",
    to: "ly-chieu-hoang",
    type: "parent",
    label: "Mẹ – con",
    claimIds: ["chieu-hoang"],
    status: "draft",
  },
  {
    id: "rel-chieu-canh",
    from: "ly-chieu-hoang",
    to: "tran-canh",
    type: "marriage",
    label: "Hôn nhân",
    date: date(1225, 1226, "Gắn với chuyển ngôi 1225/1226"),
    claimIds: ["transition"],
    status: "cross-referenced",
    note: "Khoảng thời gian của ngữ cảnh đang thể hiện, không phải toàn bộ thời gian hôn nhân.",
  },
  {
    id: "rel-chieu-canh-succession",
    from: "ly-chieu-hoang",
    to: "tran-canh",
    type: "succession",
    label: "Nhường ngôi",
    date: date(1225, 1226, "1225/1226"),
    claimIds: ["transition"],
    status: "cross-referenced",
  },
  {
    id: "rel-thudo-canh",
    from: "tran-thu-do",
    to: "tran-canh",
    type: "political",
    label: "Tổ chức chuyển ngôi",
    claimIds: ["thu-do"],
    status: "draft",
  },
  {
    id: "rel-huyen-cheman",
    from: "huyen-tran",
    to: "che-man",
    type: "marriage",
    label: "Hôn nhân · 1306",
    date: date(1306, 1306, "1306"),
    claimIds: ["huyen-marriage"],
    status: "draft",
  },
  ...rulerRows
    .slice(0, -1)
    .map((row, i) => ({
      id: `succession-${i}`,
      from: row[0],
      to: rulerRows[i + 1][0],
      type: "succession" as const,
      label: "Kế vị",
      claimIds: [
        row[0] === "duong-nhat-le" || rulerRows[i + 1][0] === "duong-nhat-le"
          ? "nhat-le-reign"
          : `reign-${rulerRows[i + 1][0]}`,
      ],
      status: "draft" as const,
    })),
];

const dms = (d: number, m: number, s: number) => d + m / 60 + s / 3600;
export const places: Place[] = [
  {
    id: "thang-long",
    name: "Thăng Long",
    names: [
      { label: "Khu trung tâm Hoàng thành Thăng Long (di sản hiện nay)" },
    ],
    type: "capital",
    locationType: "representative",
    coordinates: [dms(105, 50, 19.043), dms(21, 2, 15.072)],
    coordinateSourceId: "unesco-thang-long",
    coordinateMethod: "Đổi DMS sang độ thập phân, không hiệu chỉnh vị trí",
    precision: "Điểm di sản đại diện kinh thành; không định vị điện Thiên An",
    claimIds: ["thang-long"],
    periodIds: ["ly", "tran"],
    validFrom: 1009,
    validTo: 1397,
  },
  {
    id: "thai-mieu",
    name: "Thái Miếu, Đông Triều",
    names: [{ label: "Thai Mieu — UNESCO component 1732-001" }],
    type: "heritage",
    locationType: "historical-site",
    coordinates: [dms(106, 33, 1.44), dms(21, 7, 49.63)],
    coordinateSourceId: "unesco-yen-tu-map",
    coordinateMethod: "Đổi DMS từ bảng UNESCO component 1732-001",
    precision: "Vị trí khu di tích hiện nay; không tái dựng mặt bằng thời Trần",
    claimIds: ["truc-lam"],
    periodIds: ["tran"],
    validFrom: 1225,
    validTo: 1400,
  },
  {
    id: "kiep-bac",
    name: "Kiếp Bạc",
    names: [{ label: "Kiep Bac Temple — UNESCO component 1732-002" }],
    type: "heritage",
    locationType: "modern-memorial",
    coordinates: [dms(106, 19, 39.2), dms(21, 9, 3.8)],
    coordinateSourceId: "unesco-yen-tu-map",
    coordinateMethod: "Đổi DMS từ bảng UNESCO component 1732-002",
    precision: "Điểm đền tưởng niệm hiện nay; không phải tọa độ trận đánh",
    claimIds: ["truc-lam"],
    periodIds: ["tran"],
    validFrom: 1225,
    validTo: 1400,
  },
  {
    id: "yen-tu",
    name: "Yên Tử · chùa Lân",
    names: [{ label: "Chua Lan Pagoda — UNESCO component 1732-003" }],
    type: "heritage",
    locationType: "historical-site",
    coordinates: [dms(106, 43, 38.56), dms(21, 6, 38.44)],
    coordinateSourceId: "unesco-yen-tu-map",
    coordinateMethod: "Đổi DMS từ bảng UNESCO component 1732-003",
    precision: "Điểm chùa Lân; không đại diện chính xác toàn dãy Yên Tử",
    claimIds: ["truc-lam"],
    periodIds: ["tran"],
    validFrom: 1225,
    validTo: 1400,
  },
  {
    id: "tay-do",
    name: "Tây Đô",
    names: [{ label: "Thành nhà Hồ · Inner Citadel 1358-001" }],
    type: "capital",
    locationType: "historical-site",
    coordinates: [dms(105, 36, 17), dms(20, 4, 41)],
    coordinateSourceId: "unesco-ho",
    coordinateMethod: "Đổi DMS từ bảng UNESCO component 1358-001",
    precision:
      "Điểm nội thành di tích hiện nay; không phải ranh giới chính quyền",
    claimIds: ["tran-ending"],
    periodIds: ["tran", "ho"],
    validFrom: 1397,
    validTo: 1407,
  },
  {
    id: "hai-ap",
    name: "Hải Ấp",
    names: [
      { label: "Không gian hoạt động của họ Trần trong tư liệu cuối Lý" },
    ],
    type: "regional",
    locationType: "uncertain",
    coordinates: null,
    coordinateSourceId: null,
    coordinateMethod: "Không đặt tọa độ khi chưa đối chiếu địa lý lịch sử",
    precision: "Chỉ xác định tương đối; chưa đặt điểm",
    claimIds: ["tran-origins"],
    periodIds: ["ly", "tran"],
    validFrom: 1200,
    validTo: 1400,
  },
  {
    id: "dong-bo-dau",
    name: "Đông Bộ Đầu",
    names: [{ label: "Bến phía đông kinh thành Thăng Long" }],
    type: "event",
    locationType: "uncertain",
    coordinates: null,
    coordinateSourceId: null,
    coordinateMethod: "Chỉ lưu mô tả vị trí trong nguồn",
    precision: "Tương đối · không đồng nhất bến cổ với một tọa độ phố hiện đại",
    claimIds: ["dong-bo-place"],
    periodIds: ["tran"],
    validFrom: 1258,
    validTo: 1259,
  },
  {
    id: "bach-dang",
    name: "Sông Bạch Đằng",
    names: [{ label: "Không gian chiến trường năm 1288" }],
    type: "event",
    locationType: "uncertain",
    coordinates: null,
    coordinateSourceId: null,
    coordinateMethod: "Chưa đủ dữ liệu địa mạo để số hóa chiến trường",
    precision: "Vùng cửa sông · chưa xác lập phạm vi chiến trường",
    claimIds: ["war-1288", "bach-dang-uncertainty"],
    periodIds: ["tran"],
    validFrom: 1288,
    validTo: 1289,
  },
];

export const events: HistoricalEvent[] = [
  {
    id: "chuyen-trieu",
    name: "Từ triều Lý sang triều Trần",
    date: {
      ...date(
        1225,
        1226,
        "1225 / 1226",
        "11 tháng Chạp năm Ất Dậu (theo bài về chiếu nhường ngôi)",
      ),
      calendar: "lunisolar",
      precision: "range",
    },
    placeIds: ["thang-long"],
    personIds: [
      "ly-chieu-hoang",
      "tran-canh",
      "tran-thua",
      "tran-thu-do",
      "tran-thi-dung",
    ],
    contextClaimIds: ["late-ly"],
    developmentClaimIds: ["transition"],
    resultClaimIds: ["thua-role"],
    consequence:
      "Khi tách ngôi vua khỏi người thực sự điều hành, bạn thấy cơ chế quyền lực đầu triều Trần như thế nào?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Cung đình Thăng Long; điểm bản đồ chỉ là đại diện kinh thành. Ngày và quy ước niên đại còn cần đối chiếu.",
  },
  {
    id: "khang-chien-1258",
    name: "Kháng chiến chống Mông Cổ",
    date: date(1258, 1258, "1258"),
    placeIds: ["thang-long", "dong-bo-dau"],
    personIds: ["tran-canh"],
    contextClaimIds: ["war-1258"],
    developmentClaimIds: [],
    resultClaimIds: [],
    consequence:
      "Việc tạm rời kinh đô và giữ được lực lượng có thể thay đổi cách hiểu về một cuộc phòng thủ ra sao?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Chỉ dùng năm; không quy đổi ngày âm lịch. Vị trí Đông Bộ Đầu là tương đối.",
  },
  {
    id: "khang-chien-1285",
    name: "Kháng chiến chống Nguyên lần thứ hai",
    date: date(1285, 1285, "1285"),
    placeIds: ["thang-long"],
    personIds: ["tran-nhan-tong", "tran-thanh-tong", "tran-quoc-tuan"],
    contextClaimIds: ["war-1285"],
    developmentClaimIds: [],
    resultClaimIds: [],
    consequence:
      "Đặt cuộc phản công trong toàn bộ diễn biến giúp hiểu vai trò của bảo toàn lực lượng như thế nào?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Không dựng tuyến hành quân chi tiết hoặc dùng quân số gây tranh luận.",
  },
  {
    id: "bach-dang-1288",
    name: "Chiến thắng Bạch Đằng",
    date: date(1288, 1288, "1288"),
    placeIds: ["bach-dang", "kiep-bac"],
    personIds: ["tran-quoc-tuan", "tran-nhan-tong", "tran-thanh-tong"],
    contextClaimIds: ["war-1288"],
    developmentClaimIds: ["bach-dang-uncertainty"],
    resultClaimIds: [],
    consequence:
      "Một chiến thắng được xác lập có đồng nghĩa mọi chi tiết chiến thuật đều đã được biết chắc?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Không dùng đền Kiếp Bạc làm tọa độ trận Bạch Đằng. Chiến trường chưa được số hóa.",
  },
  {
    id: "hon-nhan-1306",
    name: "Huyền Trân và Chế Mân",
    date: date(1306, 1306, "1306"),
    placeIds: [],
    personIds: ["huyen-tran", "che-man"],
    contextClaimIds: ["huyen-marriage"],
    developmentClaimIds: [],
    resultClaimIds: [],
    consequence:
      "Vì sao cần đặt hôn nhân trong cả quan hệ ngoại giao và bối cảnh khu vực?",
    consequenceKind: "editorial-question",
    precisionNote:
      "Chưa đối chiếu vị trí hôn lễ và ranh giới hai châu Ô, Lý; không đặt điểm giả định.",
  },
  {
    id: "nha-ho-1400",
    name: "Chuyển từ Trần sang Hồ",
    date: date(1400, 1400, "1400"),
    placeIds: ["tay-do"],
    personIds: ["ho-quy-ly", "tran-thieu-de"],
    contextClaimIds: ["ho-reform-dates"],
    developmentClaimIds: ["tran-ending"],
    resultClaimIds: [],
    consequence:
      "Một chính sách bắt đầu trước năm 1400 nên được đặt trong bối cảnh cuối Trần hay chỉ kể trong nhà Hồ?",
    consequenceKind: "editorial-question",
    precisionNote: "Mốc năm theo nguồn; không quy đổi ngày tháng chuyển triều.",
  },
];

export const chapters: StoryChapter[] = [
  {
    id: "cuoi-ly",
    number: "01",
    title: "Cuối Lý, một trật tự đổi thay",
    question: "Vì sao quyền lực dần chuyển về tay họ Trần?",
    date: date(1200, 1226, "Đầu thế kỷ XIII"),
    placeIds: ["thang-long", "hai-ap"],
    personIds: ["tran-tu-khanh", "tran-thua", "tran-thi-dung"],
    eventIds: ["chuyen-trieu"],
    claimIds: ["late-ly", "tran-origins"],
    visual: "context",
    takeaway:
      "Đọc việc chuyển triều như một quá trình: thế lực địa phương → vị trí trong triều → chuyển ngôi.",
  },
  {
    id: "gia-toc",
    number: "02",
    title: "Từ một gia tộc ven sông",
    question: "Quan hệ gia đình kết nối với quyền lực ra sao?",
    date: date(1200, 1226, "Đầu thế kỷ XIII"),
    placeIds: ["hai-ap", "thang-long"],
    personIds: [
      "tran-ly",
      "tran-tu-khanh",
      "tran-thua",
      "tran-thi-dung",
      "tran-thu-do",
    ],
    eventIds: ["chuyen-trieu"],
    claimIds: ["tran-origins", "family"],
    visual: "relations",
    takeaway:
      "Cùng họ không tự chứng minh quan hệ cha con. Mỗi đường nối cần có căn cứ riêng.",
    editorialNote:
      "Chưa dựng nguồn gốc xa. Thứ bậc anh em Trần Thừa–Trần Tự Khánh khác nhau giữa các bài, nên không gắn vai anh/em.",
  },
  {
    id: "nhuong-ngoi",
    number: "03",
    title: "Một cuộc chuyển ngôi",
    question: "Điều gì nằm phía sau cuộc hôn nhân trong cung đình?",
    date: date(1225, 1226, "1225 / 1226"),
    placeIds: ["thang-long"],
    personIds: ["ly-chieu-hoang", "tran-canh", "tran-thu-do", "tran-thi-dung"],
    eventIds: ["chuyen-trieu"],
    claimIds: ["transition", "date-disagreement"],
    visual: "transition",
    takeaway:
      "Phân biệt sự kiện chuyển ngôi với những câu chuyện được kể lại về tình cảm của hai nhân vật.",
    editorialNote:
      "Không dựng lời thoại hoặc tâm trạng. Chưa xác lập ngày dương lịch và chưa gọi hai mốc 1225/1226 là hai sự kiện riêng.",
  },
  {
    id: "dau-trieu",
    number: "04",
    title: "Ngôi vua và người giữ quyền",
    question: "Thái Tổ, Thái Tông và Thái thượng hoàng khác nhau thế nào?",
    date: date(1226, 1234, "1226–1234"),
    placeIds: ["thang-long"],
    personIds: ["tran-canh", "tran-thua", "tran-thu-do"],
    eventIds: ["chuyen-trieu"],
    claimIds: ["thua-role", "thua-dates", "thu-do"],
    visual: "roles",
    takeaway:
      "Miếu hiệu gọi một người; chức vị mô tả vai trò. Hai người có thể cùng tham gia chính sự mà không cùng ở ngôi vua.",
  },
  {
    id: "ngoi-vua",
    number: "05",
    title: "Những người giữ ngôi",
    question: "Kế vị có luôn là quan hệ cha truyền con nối?",
    date: date(1225, 1400, "1225/1226–1400"),
    placeIds: ["thang-long"],
    personIds: ["tran-canh", "duong-nhat-le", "tran-nghe-tong"],
    eventIds: [],
    claimIds: ["nhat-le-reign"],
    visual: "rulers",
    takeaway:
      "Đọc hai làn trị vì và thượng hoàng riêng biệt. Đường kế vị không biểu thị huyết thống.",
    editorialNote:
      "Chuỗi gồm cả Dương Nhật Lễ. Nhiệm kỳ hiển thị ở độ chính xác năm; các năm chuyển giao không mô tả ngày nhường ngôi.",
  },
  {
    id: "mong-nguyen",
    number: "06",
    title: "Ba cuộc chiến, ba bối cảnh",
    question: "Vì sao không nên gộp cả ba lần thành một trận đánh?",
    date: date(1258, 1289, "1258 · 1285 · 1287–1288"),
    placeIds: ["thang-long", "dong-bo-dau", "bach-dang", "kiep-bac"],
    personIds: [
      "tran-canh",
      "tran-thanh-tong",
      "tran-nhan-tong",
      "tran-quoc-tuan",
    ],
    eventIds: ["khang-chien-1258", "khang-chien-1285", "bach-dang-1288"],
    claimIds: ["war-1258", "war-1285", "war-1288", "bach-dang-uncertainty"],
    visual: "wars",
    takeaway:
      "Mông Cổ năm 1258 và nhà Nguyên trong hai lần sau thuộc những bối cảnh khác nhau. Quân số và bố trí chi tiết chưa được dùng để dựng hoạt cảnh.",
  },
  {
    id: "doi-song",
    number: "07",
    title: "Một thời đại ngoài chiến trận",
    question: "Lịch sử còn để lại dấu vết trong đời sống nào?",
    date: date(1225, 1400, "Thế kỷ XIII–XIV"),
    placeIds: ["yen-tu", "thai-mieu"],
    personIds: ["tran-nhan-tong"],
    eventIds: [],
    claimIds: ["rural-life", "education", "truc-lam", "met-artifact"],
    visual: "artifact",
    takeaway:
      "Đọc hiện vật cùng niên đại và xuất xứ. Một chiếc bát không thể đại diện cho toàn bộ đời sống người dân.",
    editorialNote:
      "Chuyên đề đê điều, văn học và kiến trúc còn cần biên soạn sâu; tư liệu cung đình không đại diện đầy đủ cho tiếng nói người dân.",
  },
  {
    id: "khu-vuc",
    number: "08",
    title: "Đại Việt trong không gian khu vực",
    question:
      "Ngoại giao và hôn nhân thay đổi quan hệ giữa các chính quyền thế nào?",
    date: date(1306, 1307, "1306"),
    placeIds: [],
    personIds: ["huyen-tran", "che-man"],
    eventIds: ["hon-nhan-1306"],
    claimIds: ["huyen-marriage"],
    visual: "diplomacy",
    takeaway:
      "Chuyển giao hai địa danh không đủ để suy ra một đường biên chính xác. Quan hệ triều cống cũng không đồng nghĩa với quản lý trực tiếp.",
    editorialNote:
      "Mới có tóm lược sự kiện 1306; lịch sử quan hệ với Champa, các triều phương Bắc và giao lưu còn cần khảo cứu sâu.",
  },
  {
    id: "cuoi-tran",
    number: "09",
    title: "Khi một triều đại khép lại",
    question: "Những thay đổi nào đã bắt đầu trước khi nhà Hồ xuất hiện?",
    date: date(1396, 1401, "1396–1400"),
    placeIds: ["tay-do"],
    personIds: ["ho-quy-ly", "tran-thieu-de"],
    eventIds: ["nha-ho-1400"],
    claimIds: ["ho-reform-dates", "tran-ending"],
    visual: "ending",
    takeaway:
      "Ranh giới triều đại giúp định hướng thời gian; các quá trình chính trị và xã hội có thể đi qua ranh giới đó.",
  },
];

export const periods: Period[] = [
  {
    id: "co-dai",
    name: "Dựng nước & Bắc thuộc",
    date: date(-699, 939, "Trước thế kỷ X"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary:
      "Khung chương cho thời cổ đại và những giai đoạn trước thế kỷ X. Nội dung đang chờ biên soạn; không coi truyền thuyết về thời dựng nước là niên đại đã được xác lập.",
  },
  {
    id: "the-ky-x",
    name: "Ngô · Đinh · Tiền Lê",
    date: date(939, 1009, "Thế kỷ X–đầu XI"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary:
      "Khung biên tập cho thế kỷ X và đầu thế kỷ XI. Chưa xuất bản câu chuyện hoặc lớp lãnh thổ của từng chính quyền.",
  },
  {
    id: "ly",
    name: "Nhà Lý",
    date: date(1009, 1226, "1009–1225/1226"),
    status: "draft",
    polityIds: ["dai-viet"],
    dynastyIds: ["ly-dynasty"],
    claimIds: ["late-ly", "transition"],
    summary:
      "Hiện có phần bối cảnh cuối Lý để đọc cùng chương nhà Trần. Toàn bộ lịch sử triều Lý chưa được biên soạn đầy đủ.",
  },
  {
    id: "tran",
    name: "Nhà Trần",
    date: date(1225, 1400, "1225/1226–1400"),
    status: "draft",
    polityIds: ["dai-viet"],
    dynastyIds: ["tran-dynasty"],
    claimIds: [
      "late-ly",
      "transition",
      "thua-role",
      "war-1288",
      "truc-lam",
      "tran-ending",
    ],
    summary:
      "Triều Trần hình thành khi thế lực họ Trần đã gia tăng trong triều đình cuối Lý. Việc Lý Chiêu Hoàng nhường ngôi cho Trần Cảnh mở ra một cơ chế quyền lực có cả vua và Thái thượng hoàng. Ba cuộc kháng chiến trong thế kỷ XIII là những dấu mốc nổi bật, bên cạnh đời sống nông nghiệp, khoa cử và Phật giáo Trúc Lâm. Cuối thế kỷ XIV, quyền lực chuyển dần sang Hồ Quý Ly; năm 1400 mở đầu triều Hồ. Chương này kết nối bối cảnh, nhân vật và địa điểm qua chín phần đọc có nguồn.",
  },
  {
    id: "ho",
    name: "Nhà Hồ",
    date: date(1400, 1407, "1400–1407"),
    status: "draft",
    polityIds: ["dai-ngu"],
    dynastyIds: ["ho-dynasty"],
    claimIds: ["ho-reform-dates", "tran-ending"],
    summary:
      "Phần nối từ cuối Trần: cải cách do Hồ Quý Ly thúc đẩy và việc chuyển triều năm 1400. Quốc hiệu Đại Ngu, kinh đô Tây Đô; nội dung giai đoạn sau chuyển triều chưa được nghiên cứu sâu.",
  },
  {
    id: "minh-lam-son",
    name: "Thời Minh & Lam Sơn",
    date: date(1407, 1428, "Đầu thế kỷ XV"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary:
      "Chưa biên soạn. Khung thời kỳ này tách khỏi nhà Hồ và Lê sơ; chưa có nội dung sự kiện hay địa điểm được xuất bản.",
  },
  {
    id: "le-so",
    name: "Lê sơ",
    date: date(1428, 1527, "Thế kỷ XV–đầu XVI"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary:
      "Chưa biên soạn nội dung chuyên sâu. Chọn nhà Trần để khám phá luồng học đã triển khai.",
  },
  {
    id: "le-mac",
    name: "Lê–Mạc · Trịnh–Nguyễn",
    date: date(1527, 1789, "Thế kỷ XVI–XVIII"),
    status: "draft",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    lanes: [
      { name: "Mạc", date: "1527–1592 tại Thăng Long; tiếp tục ở Cao Bằng" },
      { name: "Lê trung hưng", date: "Đồng thời với Mạc từ thế kỷ XVI" },
      { name: "Trịnh · Đàng Ngoài", date: "Cùng thời với chính quyền Nguyễn" },
      { name: "Nguyễn · Đàng Trong", date: "Cùng thời với chính quyền Trịnh" },
    ],
    summary:
      "Khung nhiều làn cho các chính quyền đồng thời. Đường nối thời gian không biểu thị quan hệ kế vị giữa Lê–Mạc hoặc Trịnh–Nguyễn; lịch sử chi tiết của từng chính quyền chưa biên soạn.",
  },
  {
    id: "tay-son",
    name: "Tây Sơn",
    date: date(1771, 1802, "Cuối thế kỷ XVIII"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary:
      "Khung thời kỳ có giao nhau với cuối giai đoạn trước. Chưa xuất bản câu chuyện; không trình bày đây là một chuỗi kế vị đơn giản của mọi chính quyền đương thời.",
  },
  {
    id: "nguyen",
    name: "Nhà Nguyễn",
    date: date(1802, 1901, "1802–1900 · phạm vi đọc"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary:
      "Phạm vi Sử Đồ dừng ở năm 1900, không phải năm kết thúc triều Nguyễn. Nội dung thế kỷ XIX đang chờ biên soạn.",
  },
];

export const polities: Polity[] = [
  { id: "dai-viet", name: "Đại Việt", claimIds: ["transition", "tran-ending"] },
  { id: "dai-ngu", name: "Đại Ngu", claimIds: ["tran-ending"] },
];
export const dynasties: Dynasty[] = [
  {
    id: "ly-dynasty",
    name: "Triều Lý",
    polityId: "dai-viet",
    date: date(1009, 1226, "1009–1225/1226"),
  },
  {
    id: "tran-dynasty",
    name: "Triều Trần",
    polityId: "dai-viet",
    date: date(1225, 1400, "1225/1226–1400"),
  },
  {
    id: "ho-dynasty",
    name: "Triều Hồ",
    polityId: "dai-ngu",
    date: date(1400, 1407, "1400–1407"),
  },
];
export const territorySnapshots: TerritorySnapshot[] = [
  {
    id: "tran-territory-unavailable",
    polityId: "dai-viet",
    date: date(1225, 1400, "1225/1226–1400"),
    geometry: null,
    representation: "unavailable",
    sourceIds: [],
    method:
      "Không số hóa vì chưa có atlas/bộ dữ liệu có nguồn và quyền sử dụng phù hợp",
    uncertainty: "Chưa có lớp ranh giới được đối chiếu cho mốc này.",
    license: null,
    status: "unwritten",
  },
];
export const mediaAssets: MediaAsset[] = [
  {
    id: "bowl",
    src: "/media/bowl-met.jpg",
    title: "Bát gốm trang trí hoa nâu",
    date: "Thế kỷ XIV–đầu XV",
    kind: "artifact-photo",
    creator: "The Metropolitan Museum of Art · Richard Greenbaum Fund, 2021",
    license: "Public Domain",
    sourceId: "met-bowl",
    note: "Ảnh hiện vật 2021.182; không xác định chắc riêng triều vua. Nhãn Period của bảo tàng ghi ‘Tran or Ly Dynasty’.",
  },
];
export const reviews: ReviewRecord[] = [
  {
    id: "initial-reading",
    entityIds: [
      "transition",
      "thua-role",
      "date-disagreement",
      "bach-dang-uncertainty",
    ],
    action: "cross-reference",
    reviewer:
      "Trợ lý biên soạn có hỗ trợ AI; chưa có biên tập viên chuyên môn duyệt",
    date: "2026-11-17",
    note: "Đọc nguồn và so sánh các phần được dẫn. Đối chiếu nguồn không phải xác nhận của chuyên gia hoặc kết luận chắc chắn về mọi chi tiết.",
  },
];

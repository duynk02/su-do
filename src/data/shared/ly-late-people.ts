import type { Person } from "../schema";
import { claim, type Ref } from "../claim-store";

const passage = (id: string, text: string, refs: Ref[]) =>
  claim(id, text, refs, { kind: "chronicle", status: "draft" });

export const lyLatePeople: Person[] = [
  {
    id: "ly-than-tong",
    periodIds: ["ly"],
    name: "Lý Thần Tông",
    aliases: ["Lý Dương Hoán"],
    personalName: "Lý Dương Hoán",
    templeName: "Thần Tông",
    eraNames: ["Thiên Thuận", "Thiên Chương Bảo Tự"],
    life: "1116–1138",
    title: "Vị vua thứ năm của nhà Lý",
    contextYear: 1128,
    summaryClaimIds: [
      passage(
        "ly-bio-than-tong-summary",
        "Lý Thần Tông, tên húy Dương Hoán, là con Sùng Hiền hầu và phu nhân họ Đỗ. Vì Lý Nhân Tông không có con trai nối ngôi, Dương Hoán được nhận làm con nuôi và lập làm thái tử. Ông kế vị vào cuối năm Đinh Mùi 1127, mở niên hiệu Thiên Thuận từ 1128, rồi trị vì đến khi mất năm 1138.",
        [
          ["ly-annals-than-tong", "Bản kỷ III28a: thânthế, nhậnnuôi vànhiệmkỳ"],
          ["the-thu", "Chương4, phầnII.5: đăngcơ cuối 1127, niênhiệu từ 1128"],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Một cuộc kế vị qua nhận nuôi",
        claimIds: [
          passage(
            "ly-bio-than-tong-family",
            "Dương Hoán gọi Nhân Tông bằng bác, nên sự kế vị này giữ ngôi trong hoàng tộc nhưng chuyển sang một nhánh gia đình khác. Thân phụ ông là Sùng Hiền hầu, không phải một vị vua trực tiếp trị vì trước ông. Năm 1129, Thần Tông tôn cha làm Thái thượng hoàng và mẹ làm hoàng thái hậu.",
            [
              ["ly-annals-than-tong", "Bản kỷ III28a"],
              ["ly-annals-iii-b", "Mục 1129, tờ 32b, tônthânphụ/thânmẫu"],
            ],
          ),
        ],
      },
      {
        title: "Chính sự và người nối ngôi",
        claimIds: [
          passage(
            "ly-bio-than-tong-reign",
            "Khi nhà vua còn nhỏ, các đại thần tiếp tục giúp điều hành triều đình. Dưới triều ông, quân Đại Việt đánh lui những đợt tiến quân của Chân Lạp và Chiêm Thành ở Nghệ An, trong đó có các cuộc giao tranh 1128 và 1132. Năm 1136, hoàng tử Thiên Tộ ra đời; đến năm 1138 được chọn làm thái tử và nối ngôi khi Thần Tông mất, tức Lý Anh Tông.",
            [
              [
                "ly-annals-iii-b",
                "Mục 1128, tờ 30a–32a;1132, tờ 37a–37b;1136, tờ 40a;1138, tờ 42a–42b",
              ],
              ["ly-annals-anh-tong", "Bản kỷ IV1a, ThiênTộ kếvị"],
            ],
          ),
        ],
      },
    ],
    eventIds: [],
  },
  {
    id: "ly-anh-tong",
    periodIds: ["ly"],
    name: "Lý Anh Tông",
    aliases: ["Lý Thiên Tộ"],
    personalName: "Lý Thiên Tộ",
    templeName: "Anh Tông",
    eraNames: [
      "Thiệu Minh",
      "Đại Định",
      "Chính Long Bảo Ứng",
      "Thiên Cảm Chí Bảo",
    ],
    life: "1136–1175",
    title: "Hoàng đế Đại Việt · mở thương cảng Vân Đồn",
    contextYear: 1149,
    summaryClaimIds: [
      passage(
        "ly-bio-anh-tong-summary",
        "Lý Anh Tông, tên húy Thiên Tộ, là con Lý Thần Tông và hoàng hậu họ Lê. Ông lên ngôi năm 1138 khi còn rất nhỏ và giữ ngôi đến 1175. Trong thời gian trị vì, triều đình mở đầu mối giao thương Vân Đồn, đồng thời trải qua những tranh chấp quyền lực của các đại thần và việc lựa chọn người kế vị.",
        [
          ["ly-annals-anh-tong", "Bản kỷ IV1a: thânthế,nhiệmkỳ"],
          ["ly-annals-iv-a", "Mục 1149,1150,1174–1175"],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Từ triều vua nhỏ tuổi đến giao thương biển",
        claimIds: [
          passage(
            "ly-bio-anh-tong-government",
            "Trong những năm đầu, Đỗ Anh Vũ nắm nhiều việc chính sự của triều đình. Năm 1149, nhà Lý cho thuyền buôn nước ngoài tập trung ở Vân Đồn để mua bán hàng hóa. Các bến đảo về sau còn để lại nhiều dấu tích gốm và tiền đồng, phản ánh vai trò của thương cảng qua nhiều triều đại.",
            [
              ["ly-annals-iv-a", "Mục 1140, tờ 1b;1149, tờ 6b"],
              ["ly-van-don-heritage", "Các đoạnmởđầu vàkhảocổbếnbãi"],
            ],
          ),
        ],
      },
      {
        title: "Giữ nước và gửi gắm việc kế vị",
        claimIds: [
          passage(
            "ly-bio-anh-tong-succession",
            "Những năm 1171–1172, Anh Tông đi xem các hải đảo, cho ghi lại địa thế và phong vật. Cuối đời, sau khi phế Long Xưởng, ông chọn Long Trát còn nhỏ làm thái tử. Trước lúc mất năm 1175, ông giao Tô Hiến Thành phò giúp người kế vị; Long Trát lên ngôi, trở thành Lý Cao Tông.",
            [
              [
                "ly-annals-iv-a",
                "Mục 1171–1172, tờ 15a–15b;1174–1175, tờ 16a–17b",
              ],
              [
                "ly-to-hien-thanh-heritage",
                "Đoạn AnhTôngủy thácLongCán/LongTrát",
              ],
            ],
          ),
        ],
      },
    ],
    eventIds: ["ly-thuong-cang-1149", "ly-ke-vi-1175"],
  },
  {
    id: "ly-cao-tong",
    periodIds: ["ly"],
    name: "Lý Cao Tông",
    aliases: ["Lý Long Trát", "Lý Long Cán"],
    personalName: "Lý Long Trát",
    templeName: "Cao Tông",
    eraNames: [
      "Trinh Phù",
      "Thiên Tư Gia Thụy",
      "Thiên Gia Bảo Hựu",
      "Trị Bình Long Ứng",
    ],
    life: "1173–1210",
    title: "Hoàng đế Đại Việt giữa những biến động cuối thế kỷ XII",
    contextYear: 1175,
    summaryClaimIds: [
      passage(
        "ly-bio-cao-tong-summary",
        "Lý Cao Tông, tên húy Long Trát, còn có tên Long Cán, là con thứ sáu của Lý Anh Tông và hoàng hậu họ Đỗ. Ông được đưa lên ngôi năm 1175 khi còn nhỏ, dưới sự phò giúp của Tô Hiến Thành. Triều đại của ông kéo dài đến 1210, chứng kiến nhiều cuộc nổi dậy và cuộc biến loạn Quách Bốc ngay trong kinh thành.",
        [
          ["ly-annals-cao-tong", "Bản kỷ IV17b"],
          ["the-thu", "Chương4, phầnII.7:biếntểnhúy"],
          ["ly-annals-iv-b", "Mục 1209–1210"],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Ngôi vua nhỏ tuổi và người phụ chính",
        claimIds: [
          passage(
            "ly-bio-cao-tong-regency",
            "Sau khi Anh Tông mất, việc nối ngôi từng bị phản đối bởi người muốn phục lập Long Xưởng. Tô Hiến Thành giữ di mệnh của vua trước và bảo vệ ngôi Long Trát. Nhà vua đổi niên hiệu Trinh Phù vào 1176, còn Tô Hiến Thành tiếp tục giúp việc nước cho đến khi mất năm 1179.",
            [
              ["ly-annals-iv-a", "Mục 1175–1179, tờ 16b–19a"],
              ["ly-to-hien-thanh-research", "Đối chiếu ToànthưIV17a vàIV19a"],
            ],
          ),
        ],
      },
      {
        title: "Biến loạn 1209 và thế lực họ Trần",
        claimIds: [
          passage(
            "ly-bio-cao-tong-crisis",
            "Năm 1209, vụ xung đột Phạm Du–Phạm Bỉnh Di dẫn tới việc Quách Bốc đem quân đánh vào kinh thành. Cao Tông phải lánh nạn, còn thái tử Sảm đến Hải Ấp và kết hôn với con gái Trần Lý. Lực lượng họ Trần tham gia khôi phục kinh thành, rồi Sảm nối ngôi khi Cao Tông mất năm 1210, trong một triều đình ngày càng phải dựa vào các thế lực quân sự bên ngoài hoàng tộc.",
            [["ly-annals-iv-b", "Mục 1209–1210, tờ 25b–27b"]],
          ),
        ],
      },
    ],
    eventIds: ["ly-ke-vi-1175", "ly-quach-boc-1209"],
  },
  {
    id: "ly-hue-tong",
    periodIds: ["ly"],
    name: "Lý Huệ Tông",
    aliases: ["Lý Hạo Sảm", "Lý Sảm", "Huệ Quang thiền sư"],
    personalName: "Lý Hạo Sảm",
    templeName: "Huệ Tông",
    eraNames: ["Kiến Gia"],
    life: "1194–1226",
    title: "Vua cha của Lý Chiêu Hoàng · vị vua thứ tám nhà Lý",
    contextYear: 1210,
    summaryClaimIds: [
      passage(
        "ly-bio-hue-tong-summary",
        "Lý Huệ Tông, tên húy Sảm, thường được gọi Lý Hạo Sảm, là con trưởng Lý Cao Tông và hoàng hậu họ Đàm. Ông kế vị cuối năm 1210, đặt niên hiệu Kiến Gia từ 1211. Cuộc hôn nhân với Trần Thị Dung và việc dựa vào lực lượng họ Trần đặt ông ở trung tâm sự chuyển dịch quyền lực cuối nhà Lý.",
        [
          ["ly-annals-hue-tong", "Bản kỷ IV27b"],
          ["the-thu", "Chương4, phầnII.8"],
          ["ly-annals-iv-b", "Mục 1209,1216–1217"],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Hoàng tộc Lý và gia đình họ Trần",
        claimIds: [
          passage(
            "ly-bio-hue-tong-tran-family",
            "Khi còn là thái tử, Sảm đến Hải Ấp trong loạn 1209 và lấy con gái Trần Lý. Năm 1216, Trần thị được lập làm hoàng hậu, Trần Tự Khánh giữ chức thái úy phụ chính và Trần Thừa làm nội thị phán thủ. Hai con gái của Huệ Tông và Trần Thị Dung là Thuận Thiên và Chiêu Thánh, người sau trở thành Lý Chiêu Hoàng.",
            [
              [
                "ly-annals-iv-b",
                "Mục 1209, tờ 26a;1216, tờ 29a;1218, tờ 30a;1224, tờ 32a",
              ],
            ],
          ),
        ],
      },
      {
        title: "Truyền ngôi và kết thúc cuộc đời",
        claimIds: [
          passage(
            "ly-bio-hue-tong-abdication",
            "Năm 1224, khi Huệ Tông có bệnh và không có con trai kế vị, quân bảo vệ cung đình đã do Trần Thủ Độ quản lĩnh. Tháng mười năm ấy, ông truyền ngôi cho công chúa Chiêu Thánh rồi xuất gia tại chùa Chân Giáo. Ông còn sống sau khi nhà Lý kết thúc; sử liệu ghi năm 1226 ông bị nhà Trần bức tử.",
            [
              ["ly-annals-iv-b", "Mục 1224, tờ 31b–32a"],
              ["the-thu", "Chương4, phầnII.8: xuấtgia vàbứctử 1226"],
            ],
          ),
        ],
      },
    ],
    eventIds: ["ly-quach-boc-1209", "ly-chieu-hoang-1224", "chuyen-trieu"],
  },
  {
    id: "to-hien-thanh",
    periodIds: ["ly"],
    name: "Tô Hiến Thành",
    aliases: [],
    title: "Đại thần phụ chính dưới triều Anh Tông–Cao Tông",
    life: "Chưa rõ năm sinh–1179",
    contextYear: 1175,
    summaryClaimIds: [
      passage(
        "ly-bio-to-hien-thanh-summary",
        "Tô Hiến Thành là đại thần nhà Lý, hoạt động qua hai đời vua Anh Tông và Cao Tông. Ông được Anh Tông giao phò giúp thái tử Long Trát, giữ quyết định kế vị năm 1175 khi có người muốn phục lập Long Xưởng. Trong chính sử, ông còn được nhắc đến qua việc tiến cử Trần Trung Tá trước khi mất năm 1179.",
        [
          ["ly-annals-iv-a", "Mục 1175–1179, tờ 16b–19a"],
          ["ly-to-hien-thanh-research", "Đoạn đốichiếu chínhsửIV17a,IV19a"],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Từ việc quân đến việc phụ chính",
        claimIds: [
          passage(
            "ly-bio-to-hien-thanh-office",
            "Toàn thư ghi Tô Hiến Thành bắt Thân Lợi năm 1141 và được giao nhiều việc quân dưới thời Anh Tông. Đến năm 1175, ông nhận di mệnh giúp vua nhỏ tuổi, từ chối việc thay đổi ngôi kế thừa. Quyền phụ chính của ông vì vậy gắn với cả sự ủy thác của vua trước lẫn việc giữ ổn định triều đình sau khi vua mất.",
            [["ly-annals-iv-a", "Mục 1141, tờ 3a;1175, tờ 16b–17b"]],
          ),
        ],
      },
      {
        title: "Tiến cử người lo việc nước",
        claimIds: [
          passage(
            "ly-bio-to-hien-thanh-recommendation",
            "Khi bệnh nặng năm 1179, ông đề nghị Trần Trung Tá thay mình, dù người thường túc trực chăm sóc ông là Vũ Tán Đường. Lời chép này làm nổi bật sự phân biệt giữa ơn riêng và năng lực gánh việc quốc gia. Tư liệu về quê quán, ngày sinh và đường khoa bảng của ông vẫn còn những điểm cần đối chiếu; chính sử xác nhận ông mất trong năm 1179.",
            [
              ["ly-annals-iv-a", "Mục 1179, tờ 18b–19a"],
              ["ly-to-hien-thanh-research", "Mục quêquán,ngàysinh,khoabảng"],
            ],
          ),
        ],
      },
    ],
    eventIds: ["ly-ke-vi-1175"],
  },
  {
    id: "do-anh-vu",
    periodIds: ["ly"],
    name: "Đỗ Anh Vũ",
    aliases: [],
    title: "Đại thần nắm nhiều việc chính sự đầu thời Anh Tông",
    life: "Chưa rõ năm sinh–1158",
    contextYear: 1140,
    summaryClaimIds: [
      passage(
        "ly-bio-do-anh-vu-summary",
        "Đỗ Anh Vũ là đại thần có ảnh hưởng lớn khi Lý Anh Tông lên ngôi còn nhỏ. Năm 1140, ông được giao trông coi việc cung điện và chính sự trong ngoài. Vai trò của ông gắn với hoạt động quân sự, sự tranh giành trong cung đình và cuộc xung đột với một nhóm quan lại năm 1150.",
        [["ly-annals-iv-a", "Mục 1140,tờ 1b;1141,tờ 2b–3a;1150,tờ 7a–9b"]],
      ),
    ],
    biographySections: [
      {
        title: "Quyền lực và tranh chấp trong triều",
        claimIds: [
          passage(
            "ly-bio-do-anh-vu-conflict",
            "Năm 1141, Anh Vũ chỉ huy quân chống lực lượng Thân Lợi. Theo lời chép trong Toàn thư, đến 1150 một nhóm quan lại và thân vương tổ chức bắt ông, khiến ông có lúc bị giáng làm người cày ruộng công. Sau khi được phục chức, ông truy xét những người tham gia vụ bắt giữ.",
            [["ly-annals-iv-a", "Mục 1141,tờ 2b–3a;1150,tờ 7a–9b"]],
          ),
        ],
      },
      {
        title: "Một nhân vật cần đọc trong bối cảnh",
        claimIds: [
          passage(
            "ly-bio-do-anh-vu-context",
            "Sự kiện 1150 cho thấy quyền lực dưới triều vua nhỏ tuổi còn phụ thuộc vào các nhóm quan lại và người có ảnh hưởng trong cung. Các lời kể về Anh Vũ trong sử liệu đi kèm nhiều phán xét của người biên soạn đời sau. Toàn thư ghi ông mất vào mùa thu năm 1158.",
            [
              [
                "ly-annals-iv-a",
                "Mục 1150,tờ 7a–9b;lời bìnhsửquan;1158,tờ 13a",
              ],
            ],
          ),
        ],
      },
    ],
    eventIds: [],
  },
  {
    id: "sung-hien-hau",
    periodIds: ["ly"],
    name: "Sùng Hiền hầu",
    aliases: ["Sùng Hiền"],
    title: "Thân phụ Lý Thần Tông · được tôn làm Thái thượng hoàng",
    life: "Chưa rõ năm sinh–1130",
    contextYear: 1129,
    summaryClaimIds: [
      passage(
        "ly-bio-sung-hien-summary",
        "Sùng Hiền hầu là em Lý Nhân Tông và là cha ruột của Lý Dương Hoán, tức Lý Thần Tông. Khi Nhân Tông không có con trai nối ngôi, Dương Hoán được đưa vào cung, nhận làm con nuôi và chọn kế vị. Năm 1129, sau khi con lên ngôi, Sùng Hiền hầu được tôn làm Thái thượng hoàng dù không phải người trực tiếp trị vì trước đó.",
        [
          ["ly-annals-than-tong", "Bản kỷ III28a"],
          ["ly-annals-iii-b", "Mục 1129,tờ 32b"],
          ["the-thu", "Chương4,phầnII.5"],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Nhánh gia đình của người kế vị",
        claimIds: [
          passage(
            "ly-bio-sung-hien-family",
            "Mẹ Dương Hoán là phu nhân họ Đỗ, được tôn làm hoàng thái hậu cùng dịp Sùng Hiền hầu nhận tôn vị. Nhân Tông giữ vai trò người bác và người nhận nuôi, còn Sùng Hiền hầu là cha sinh. Việc chọn Dương Hoán kế vị đưa nhánh gia đình này vào trung tâm quyền lực của hoàng tộc.",
            [
              ["ly-annals-than-tong", "Bản kỷ III28a"],
              ["ly-annals-iii-b", "Mục 1129,tờ 32b"],
            ],
          ),
        ],
      },
      {
        title: "Tôn vị và niên đại",
        claimIds: [
          passage(
            "ly-bio-sung-hien-title",
            "Sùng Hiền hầu nhận tôn vị Thái thượng hoàng từ người con đang trị vì. Ông không có nhiệm kỳ hoàng đế riêng trong chuỗi các vua nhà Lý. Toàn thư ghi ông mất năm 1130, sau lần được tôn vị năm 1129.",
            [
              ["ly-annals-iii-b", "Mục 1129,tờ 32b;1130,tờ 35a"],
              ["the-thu", "Chương4,phầnII.5: SùngHiềnhầuchỉcótônvị"],
            ],
          ),
        ],
      },
    ],
    eventIds: [],
  },
];

export const lySharedPersonUpdates: ({ personId: string } & Partial<
  Pick<
    Person,
    | "personalName"
    | "life"
    | "title"
    | "summaryClaimIds"
    | "biographySections"
    | "eventIds"
  >
>)[] = [
  {
    personId: "ly-chieu-hoang",
    personalName: "Lý Phật Kim",
    biographySections: [
      {
        title: "Lên ngôi giữa quyền lực chuyển dịch",
        claimIds: [
          passage(
            "ly-bio-chieu-hoang-accession",
            "Lý Chiêu Hoàng là con gái thứ của Huệ Tông và Trần Thị Dung, có tên Phật Kim, sau đổi Thiên Hinh. Tháng mười năm 1224, bà được lập làm thái tử rồi nhận ngôi từ vua cha, đặt niên hiệu Thiên Chương Hữu Đạo. Bà lên ngôi khi còn nhỏ, trong lúc Trần Thủ Độ nắm quân điện tiền và họ Trần đã giữ các vị trí quan trọng trong triều.",
            [
              ["ly-annals-chieu-hoang", "Bản kỷ IV32b"],
              ["ly-annals-iv-b", "Mục 1224,tờ 31b–32a"],
              ["the-thu", "Chương4,phầnII.9"],
            ],
          ),
        ],
      },
      {
        title: "Từ nữ hoàng đến Chiêu Thánh",
        claimIds: [
          passage(
            "ly-bio-chieu-hoang-after-throne",
            "Sau cuộc hôn nhân do họ Trần tổ chức, Chiêu Hoàng nhường ngôi cho Trần Cảnh cuối năm Ất Dậu, mốc chuyển triều thường ghi 1225/1226. Bà trở thành Chiêu Thánh hoàng hậu, rồi bị giáng làm công chúa năm 1237 khi Thuận Thiên được đưa vào ngôi hoàng hậu. Năm 1258, bà kết hôn với Lê Tần, tức Lê Phụ Trần, và mất năm 1278.",
            [
              ["ly-annals-iv-b", "KỷChiêuHoàng 1225,tờ 33a–35a"],
              ["the-thu", "Chương4,phầnII.9:1237,1258,1278"],
            ],
          ),
        ],
      },
    ],
    eventIds: ["ly-chieu-hoang-1224", "chuyen-trieu"],
  },
  {
    personId: "tran-thi-dung",
    eventIds: ["ly-quach-boc-1209", "ly-chieu-hoang-1224", "chuyen-trieu"],
  },
  { personId: "tran-ly", eventIds: ["ly-quach-boc-1209"] },
  { personId: "tran-tu-khanh", eventIds: ["ly-quach-boc-1209"] },
  {
    personId: "tran-thu-do",
    eventIds: ["ly-chieu-hoang-1224", "chuyen-trieu"],
  },
];

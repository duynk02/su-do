import type { Claim, Person } from "./schema";

interface BiographyClaim {
  text: string;
  refs: [sourceId: string, location: string, supports?: string][];
  kind?: Claim["kind"];
  note?: string;
}
interface BiographyProfile {
  title?: string;
  life?: string;
  aliases?: string[];
  eraNames?: string[];
  summary: BiographyClaim;
  sections?: { title: string; claims: BiographyClaim[] }[];
  relatedClaimIds?: string[];
  eventIds?: string[];
}

const genealogy = (name: string): BiographyClaim["refs"] => [
  ["the-thu", `Chương 5, phần II – Thế thứ các vua thời Trần, mục ${name}`],
];

// Prose is kept with its evidence; the reader renders the same structure for every person.
export const biographies: Record<Person["id"], BiographyProfile> = {
  "tran-canh": {
    title: "Hoàng đế đầu tiên của nhà Trần",
    life: "1218–1277",
    summary: {
      text: "Trần Thái Tông, tên húy Trần Cảnh, là con Trần Thừa và là người mở đầu triều Trần. Ông nhận ngôi từ Lý Chiêu Hoàng sau cuộc hôn nhân gắn với việc chuyển triều năm 1225/1226. Năm 1258, sau cuộc kháng chiến chống Mông Cổ, ông nhường ngôi cho con là Trần Hoảng, tức Trần Thánh Tông, rồi làm Thái thượng hoàng đến khi mất năm 1277.",
      refs: [
        ...genealogy("Trần Thái Tông"),
        ["ly-transition", "Các đoạn về hôn nhân và chiếu nhường ngôi"],
      ],
    },
    relatedClaimIds: ["war-1258", "education"],
    sections: [
      {
        title: "Biến động hôn nhân và việc nối ngôi",
        claims: [
          {
            text: "Năm 1237, Thuận Thiên, vốn là vợ của Trần Liễu và là chị Lý Chiêu Hoàng, được đưa vào cung làm hoàng hậu của Trần Thái Tông. Liễu là anh của Thái Tông; việc đổi hôn nhân dẫn tới cuộc nổi dậy của ông. Về sau, Thuận Thiên sinh Trần Hoảng, người kế vị với miếu hiệu Thánh Tông. Những quan hệ này giải thích vì sao nhánh Trần Cảnh và nhánh Trần Liễu cùng xuất hiện trong phả hệ đầu triều.",
            refs: [
              [
                "tran-marriages",
                "Các mục Liễu–Thuận Thiên và Thái Tông–Thuận Thiên",
              ],
              ["toan-thu-thanh-tong", "Quyển V, tờ 25a: mẹ Thánh Tông"],
            ],
            kind: "chronicle",
          },
        ],
      },
    ],
    eventIds: ["chuyen-trieu", "hon-nhan-1237", "khang-chien-1258"],
  },
  "tran-thanh-tong": {
    title: "Hoàng đế Đại Việt · Thái thượng hoàng",
    life: "1240–1290",
    summary: {
      text: "Trần Thánh Tông, tên húy Trần Hoảng, là con trưởng của Trần Thái Tông và hoàng hậu Thuận Thiên. Ông lên ngôi năm 1258, trị vì đến năm 1278 rồi truyền ngôi cho Trần Khâm, tức Trần Nhân Tông. Trên cương vị Thái thượng hoàng, ông tiếp tục tham gia chính sự và cùng vua Nhân Tông lãnh đạo Đại Việt trong hai cuộc kháng chiến chống Nguyên năm 1285 và 1287–1288.",
      refs: [
        ...genealogy("Trần Thánh Tông"),
        [
          "tran-chronology",
          "Mục 2 và mục 3, vai trò Thánh Tông trong kháng chiến",
        ],
      ],
    },
    relatedClaimIds: ["war-1285", "war-1288"],
  },
  "tran-nhan-tong": {
    title: "Hoàng đế Đại Việt · Phật hoàng Trúc Lâm",
    life: "1258–1308",
    aliases: ["Phật hoàng", "Trúc Lâm Đại sĩ", "Hương Vân Đại Đầu Đà"],
    eraNames: ["Thiệu Bảo", "Trùng Hưng"],
    summary: {
      text: "Trần Nhân Tông, tên húy Trần Khâm, là vị hoàng đế thứ ba của nhà Trần, thường được biết đến với danh xưng Phật hoàng. Ông trị vì Đại Việt trong những năm 1278–1293, sau đó nhường ngôi cho Trần Anh Tông và làm Thái thượng hoàng. Cuộc đời ông gắn với hai cuộc kháng chiến chống Nguyên và việc sáng lập Thiền phái Trúc Lâm Yên Tử sau khi xuất gia.",
      refs: [
        [
          "nhan-tong-heritage",
          "Đoạn giới thiệu về vua thứ ba, niên đại trị vì và Thiền phái Trúc Lâm",
        ],
        ...genealogy("Trần Nhân Tông"),
      ],
    },
    sections: [
      {
        title: "Xuất thân và lên ngôi",
        claims: [
          {
            text: "Ông sinh năm 1258 tại Thăng Long, là con trưởng của Trần Thánh Tông và Nguyên Thánh Thiên Cảm hoàng hậu. Được lập làm thái tử năm 1274, Trần Khâm nhận ngôi từ vua cha năm 1278. Thánh Tông lui về làm Thái thượng hoàng và tiếp tục cùng con giải quyết việc nước.",
            refs: genealogy("Trần Nhân Tông"),
          },
        ],
      },
      {
        title: "Lãnh đạo kháng chiến chống Nguyên",
        claims: [
          {
            text: "Trong các cuộc xâm lược năm 1285 và 1287–1288, Nhân Tông cùng Thượng hoàng Trần Thánh Tông và Quốc công tiết chế Trần Quốc Tuấn lãnh đạo việc kháng chiến. Triều đình rời Thăng Long để giữ lực lượng, sau đó phản công; chiến thắng Bạch Đằng năm 1288 là một dấu mốc kết thúc cuộc xâm lược lần thứ ba.",
            refs: [
              [
                "wars-education",
                "Mục II và III: diễn biến, kết quả kháng chiến",
              ],
              [
                "nhan-tong-journey",
                "Đoạn về Bình Than, Diên Hồng và các chiến thắng 1285, 1288",
              ],
            ],
          },
        ],
      },
      {
        title: "Nhường ngôi và tu hành ở Yên Tử",
        claims: [
          {
            text: "Năm 1293, ông truyền ngôi cho con là Trần Thuyên, tức Trần Anh Tông, rồi lui về Thiên Trường. Năm 1299, ông xuất gia tại Yên Tử, mang hiệu Hương Vân Đại Đầu Đà, sau đổi là Trúc Lâm Đại sĩ. Ông trở thành vị tổ đầu tiên của Thiền phái Trúc Lâm; năm 1308 truyền tổ vị cho Pháp Loa và qua đời tại am Ngọa Vân.",
            refs: [
              [
                "nhan-tong-journey",
                "Các đoạn nhường ngôi 1293, xuất gia 1299, truyền thừa và am Ngọa Vân năm 1308",
              ],
            ],
            note: "Nguồn di sản ghi ngày mất là 1 tháng 11 năm Mậu Thân; Thế thứ ghi 3 tháng 11. Hai nguồn cùng ghi năm 1308.",
          },
        ],
      },
    ],
    eventIds: [
      "nhan-tong-ke-vi",
      "khang-chien-1285",
      "bach-dang-1288",
      "nhan-tong-nhuong-ngoi",
      "nhan-tong-yen-tu",
      "hon-nhan-1306",
    ],
  },
  "tran-anh-tong": {
    title: "Hoàng đế Đại Việt · Thái thượng hoàng",
    life: "1276–1320",
    summary: {
      text: "Trần Anh Tông, tên húy Trần Thuyên, là con trưởng của Trần Nhân Tông và Bảo Thánh hoàng hậu. Ông nhận ngôi năm 1293, dùng niên hiệu Hưng Long trong suốt thời gian trị vì. Triều đại của ông có cuộc hôn nhân Huyền Trân–Chế Mân năm 1306. Năm 1314, ông truyền ngôi cho Trần Minh Tông, tiếp tục làm Thái thượng hoàng đến khi mất năm 1320.",
      refs: [
        ...genealogy("Trần Anh Tông"),
        ["huyen-tran", "Đoạn mở đầu về cuộc hôn nhân năm 1306"],
      ],
    },
    relatedClaimIds: ["huyen-marriage"],
    eventIds: ["nhan-tong-nhuong-ngoi", "hon-nhan-1306"],
  },
  "tran-minh-tong": {
    title: "Hoàng đế Đại Việt · Thái thượng hoàng",
    life: "1300–1357",
    summary: {
      text: "Trần Minh Tông, tên húy Trần Mạnh, là con của Trần Anh Tông. Được lập làm thái tử năm 1305, ông kế vị năm 1314 và trị vì đến năm 1329 với hai niên hiệu Đại Khánh, Khai Thái. Sau khi truyền ngôi cho Trần Hiến Tông, ông tiếp tục giữ vai trò Thái thượng hoàng cho đến khi mất năm 1357, qua các đời Hiến Tông và Dụ Tông.",
      refs: genealogy("Trần Minh Tông, Trần Hiến Tông và Trần Dụ Tông"),
    },
  },
  "tran-hien-tong": {
    title: "Hoàng đế Đại Việt · niên hiệu Khai Hựu",
    life: "1319–1341",
    summary: {
      text: "Trần Hiến Tông, tên húy Trần Vượng, là con Trần Minh Tông và Minh Từ hoàng thái phi. Ông được lập làm thái tử rồi nhận ngôi năm 1329, khi vua cha lui về làm Thái thượng hoàng. Hiến Tông dùng niên hiệu Khai Hựu, ở ngôi đến khi mất năm 1341; người kế vị là em ông, Trần Dụ Tông.",
      refs: genealogy("Trần Hiến Tông và Trần Dụ Tông"),
    },
  },
  "tran-du-tong": {
    title: "Hoàng đế Đại Việt",
    life: "1336–1369",
    eraNames: ["Thiệu Phong", "Đại Trị"],
    summary: {
      text: "Trần Dụ Tông, tên húy Trần Hạo, là con Trần Minh Tông và Hiến Từ hoàng hậu, em của Trần Hiến Tông. Ông được đưa lên ngôi năm 1341 và trị vì đến năm 1369. Khi ông mất mà không có con nối ngôi, Dương Nhật Lễ được chọn kế vị, mở đầu cuộc khủng hoảng kế vị 1369–1370 trong hoàng tộc Trần.",
      refs: [
        ...genealogy("Trần Dụ Tông"),
        ["nhat-le", "Đoạn mở đầu và mục tháng 6 năm 1369"],
      ],
    },
    eventIds: ["nhat-le-len-ngoi"],
  },
  "duong-nhat-le": {
    title: "Hoàng đế Đại Việt · niên hiệu Đại Định",
    life: "Chưa rõ năm sinh – 1370",
    eraNames: ["Đại Định"],
    summary: {
      text: "Dương Nhật Lễ giữ ngôi hoàng đế Đại Việt từ năm 1369 đến năm 1370, sau Trần Dụ Tông và trước Trần Nghệ Tông, với niên hiệu Đại Định. Ông được đưa lên ngôi với tư cách con của Cung Túc vương Trần Nguyên Dục. Xuất thân được sử liệu ghi lại và cuộc xung đột với tôn thất họ Trần khiến việc kế vị của ông trở thành một biến động lớn cuối triều Trần.",
      refs: [["nhat-le", "Đầu bài, mục tháng 6 năm 1369 và tháng 11 năm 1370"]],
      kind: "chronicle",
    },
    sections: [
      {
        title: "Xuất thân và nguyên nhân lên ngôi",
        claims: [
          {
            text: "Theo ghi chép trong Cương mục được Hồ Bạch Thảo dẫn lại, mẹ Nhật Lễ đã mang thai với người làm nghề diễn xướng tên Dương Khương trước khi trở thành vợ Cung Túc vương Trần Nguyên Dục; Nguyên Dục nhận Nhật Lễ làm con. Khi Dụ Tông mất năm 1369 mà không có con kế tự, di chiếu của vua cùng sự ủng hộ của Hiến Từ Thái hậu đưa Nhật Lễ lên ngôi với danh nghĩa thuộc nhánh Cung Túc vương.",
            refs: [
              [
                "nhat-le",
                "Mục tháng 6 năm 1369, đoạn dẫn Cương mục, Chính biên, quyển 10 về Nguyên Dục và Hiến Từ",
              ],
            ],
            kind: "chronicle",
          },
        ],
      },
      {
        title: "Vì sao có mặt trong chuỗi vua Trần?",
        claims: [
          {
            text: "Nhật Lễ thực sự đã giữ ngôi vua và điều hành triều đình trong giai đoạn 1369–1370. Vì vậy, chuỗi người nối ngôi thời Trần có vị trí của ông giữa Dụ Tông và Nghệ Tông, dù sử liệu không coi ông là người mang huyết thống họ Trần. Thế thứ các triều vua Việt Nam cũng liệt kê Dương Nhật Lễ thành một mục riêng trong phần các vua thời Trần.",
            refs: genealogy(
              "Dương Nhật Lễ, giữa mục Trần Dụ Tông và Trần Nghệ Tông",
            ),
          },
        ],
      },
      {
        title: "Xung đột cung đình và mất ngôi",
        claims: [
          {
            text: "Sử liệu chép việc Nhật Lễ giết Hiến Từ Thái hậu cuối năm 1369 và có ý định trở lại họ Dương. Tháng 9 năm 1370, âm mưu lật đổ ông của Trần Nguyên Trác thất bại, dẫn đến việc nhiều người trong phe chống đối bị giết. Xung đột tiếp tục khi Trần Phủ, Trần Kính, Trần Nguyên Đán và công chúa Thiên Ninh tập hợp lực lượng chống Nhật Lễ.",
            refs: [
              [
                "nhat-le-court",
                "Các đoạn cuối năm 1369, âm mưu tháng 9 và việc hội quân của tôn thất năm 1370",
              ],
            ],
            kind: "chronicle",
          },
          {
            text: "Tháng 11 năm 1370, phe tôn thất phế Nhật Lễ xuống làm Hôn Đức công và tôn Trần Phủ lên ngôi, tức Trần Nghệ Tông. Nhật Lễ bị bắt giam; theo sử liệu được bài nghiên cứu dẫn lại, sau khi giết Ngô Lang trong nơi giam giữ, ông cùng con là Liễu bị xử chết. Năm sinh của Nhật Lễ chưa được xác định.",
            refs: [
              [
                "nhat-le",
                "Mục tháng 11 năm 1370, đoạn dẫn Cương mục về phế truất, Ngô Lang và cái chết của Nhật Lễ",
              ],
            ],
            kind: "chronicle",
          },
        ],
      },
    ],
    eventIds: ["nhat-le-len-ngoi", "nhat-le-bien-dong", "nhat-le-bi-phe"],
  },
  "tran-nghe-tong": {
    title: "Hoàng đế Đại Việt · Thái thượng hoàng",
    life: "1321–1394",
    summary: {
      text: "Trần Nghệ Tông, tên húy Trần Phủ, là con Trần Minh Tông. Ông lên ngôi năm 1370 sau khi cùng các thành viên hoàng tộc lật đổ Dương Nhật Lễ. Năm 1372, Nghệ Tông truyền ngôi cho em là Trần Kính, tức Trần Duệ Tông, rồi giữ vai trò Thái thượng hoàng đến năm 1394. Ảnh hưởng của ông kéo dài qua nhiều đời vua cuối thời Trần.",
      refs: genealogy("Trần Nghệ Tông"),
    },
    sections: [
      {
        title: "Cất nhắc Quý Ly và quan hệ thông gia",
        claims: [
          {
            text: "Năm 1371, Nghệ Tông trao chức vụ trong Khu mật viện cho Hồ Quý Ly và gả em gái Huy Ninh cho ông. Về sau, con Nghệ Tông là Thuận Tông lấy Khâm Thánh, con gái Quý Ly và Huy Ninh. Hai nhánh con của Minh Tông vì thế gặp lại nhau trong gia đình Trần Thiếu Đế, trong khi Quý Ly ngày càng có ảnh hưởng lớn trong triều.",
            refs: [
              [
                "toan-thu-family",
                "Quyển VII, tờ 38a: cất nhắc Quý Ly, gả Huy Ninh năm 1371; VIII tờ 38b: con cái Huy Ninh",
              ],
              [
                "toan-thu-thuan-tong",
                "Quyển VIII, tờ 14a: lập con gái Quý Ly làm hoàng hậu",
              ],
            ],
            kind: "chronicle",
          },
        ],
      },
    ],
    eventIds: ["nhat-le-bien-dong", "nhat-le-bi-phe"],
  },
  "tran-due-tong": {
    title: "Hoàng đế Đại Việt · niên hiệu Long Khánh",
    life: "1337–1377",
    summary: {
      text: "Trần Duệ Tông, tên húy Trần Kính, là con Trần Minh Tông và em Trần Nghệ Tông. Sau khi tham gia việc chống Dương Nhật Lễ, ông được lập làm thái tử rồi nhận ngôi từ Nghệ Tông năm 1372. Ông dùng niên hiệu Long Khánh và mất trong cuộc tiến quân đánh Champa năm 1377; con ông là Trần Hiện được đưa lên ngôi sau đó.",
      refs: [
        ...genealogy("Trần Duệ Tông và Trần Phế Đế"),
        [
          "nhat-le-court",
          "Các đoạn về Cung Tuyên vương Trần Kính trong biến động 1370",
        ],
      ],
    },
    eventIds: ["nhat-le-bien-dong", "nhat-le-bi-phe"],
  },
  "tran-phe-de": {
    title: "Hoàng đế Đại Việt · niên hiệu Xương Phù",
    life: "1361–1388",
    summary: {
      text: "Trần Phế Đế, tên húy Trần Hiện, là con trưởng của Trần Duệ Tông. Ông lên ngôi năm 1377 sau khi vua cha mất trong chiến dịch đánh Champa, trong khi Thượng hoàng Trần Nghệ Tông vẫn có ảnh hưởng lớn đến triều chính. Đến năm 1388, ông bị phế và bị bức tử; Trần Thuận Tông là người kế vị.",
      refs: genealogy("Trần Phế Đế và Trần Thuận Tông"),
    },
  },
  "tran-thuan-tong": {
    title: "Hoàng đế Đại Việt · niên hiệu Quang Thái",
    life: "1378–1399",
    summary: {
      text: "Trần Thuận Tông, tên húy Trần Nhung, là con út của Trần Nghệ Tông và là con rể Hồ Quý Ly. Ông lên ngôi năm 1388, trong giai đoạn quyền lực của Hồ Quý Ly ngày càng tăng. Năm 1398, ông phải nhường ngôi cho con là Trần An, tức Trần Thiếu Đế. Năm sau, ông bị Hồ Quý Ly sai người bức tử.",
      refs: genealogy("Trần Thuận Tông và Trần Thiếu Đế"),
    },
    relatedClaimIds: ["ho-reform-dates"],
    sections: [
      {
        title: "Gia đình và quyền lực của Hồ Quý Ly",
        claims: [
          {
            text: "Hoàng hậu của Thuận Tông là Khâm Thánh, con gái trưởng Hồ Quý Ly, được lập làm hoàng hậu năm 1389. Năm 1398, Quý Ly thúc ép Thuận Tông rời ngôi; con nhỏ Trần An lên thay, còn Quý Ly trực tiếp nắm quyền nhiếp chính. Sau khi đã rời ngôi, Thuận Tông tiếp tục bị giám sát và bị giết theo lệnh Quý Ly năm 1399.",
            refs: [
              [
                "toan-thu-thuan-tong",
                "Quyển VIII, tờ 14a: lập hoàng hậu năm 1389",
              ],
              [
                "thieu-de-court",
                "Các mục tháng 3/1398 và tháng 4/1399, dẫn Cương mục quyển 11",
              ],
            ],
            kind: "chronicle",
          },
        ],
      },
    ],
    eventIds: ["thieu-de-len-ngoi", "thuan-tong-bi-hai", "nha-ho-1400"],
  },
  "tran-thieu-de": {
    title: "Vị vua cuối cùng của nhà Trần",
    life: "1396 – chưa rõ năm mất",
    summary: {
      text: "Trần Thiếu Đế, tên húy Trần An, là con Trần Thuận Tông và Khâm Thánh hoàng hậu, cháu ngoại Hồ Quý Ly. Ông được đưa lên ngôi khi còn nhỏ vào năm 1398. Năm 1400, Hồ Quý Ly thay ngôi, lập nhà Hồ và giáng ông làm Bảo Ninh Đại vương. Năm mất của Trần Thiếu Đế chưa được xác định trong nguồn đang dẫn.",
      refs: genealogy("Trần Thiếu Đế"),
    },
    eraNames: ["Kiến Tân"],
    sections: [
      {
        title: "Phả hệ nối hai họ Trần và Hồ",
        claims: [
          {
            text: "Cha Thiếu Đế là Trần Thuận Tông, ông nội là Trần Nghệ Tông. Mẹ ông là Khâm Thánh hoàng hậu, con gái Hồ Quý Ly và công chúa Huy Ninh; Huy Ninh là con Trần Minh Tông, em gái Nghệ Tông. Vì vậy, Quý Ly là ông ngoại của vị vua cuối triều Trần, còn quan hệ hoàng tộc của Thiếu Đế đi qua cả hai nhánh nội và ngoại.",
            refs: [
              ...genealogy("Trần Thiếu Đế"),
              [
                "toan-thu-family",
                "Quyển VII tờ 38a: Huy Ninh là em Nghệ Tông; VIII tờ 38b: Huy Ninh là con Minh Tông, mẹ Khâm Thánh",
              ],
            ],
            kind: "chronicle",
          },
        ],
      },
      {
        title: "Lên ngôi khi quyền lực ở tay ông ngoại",
        claims: [
          {
            text: "Năm 1398, Thuận Tông rời ngôi và Trần An được đưa lên làm vua khi còn rất nhỏ, lấy niên hiệu Kiến Tân. Hồ Quý Ly lấy danh nghĩa ông ngoại của vua để nhiếp chính, nắm việc nước. Năm 1399, Thuận Tông bị giết; cùng năm, âm mưu chống Quý Ly của một nhóm đại thần tại hội thề Đốn Sơn thất bại, dẫn tới một đợt trấn áp trong triều.",
            refs: [
              [
                "thieu-de-court",
                "Các mục tháng 3/1398, tháng 4/1399 và đoạn hội thề Đốn Sơn, dẫn Cương mục quyển 11",
              ],
            ],
            kind: "chronicle",
          },
        ],
      },
      {
        title: "Mất ngôi và việc lập nhà Hồ",
        claims: [
          {
            text: "Năm 1400, Hồ Quý Ly phế Thiếu Đế, tự lên ngôi, đổi quốc hiệu thành Đại Ngu và lập nhà Hồ. Thiếu Đế bị giáng làm Bảo Ninh Đại vương. Sử liệu được dẫn ghi ông được tha chết vì là cháu ngoại Quý Ly; không có căn cứ từ những nguồn này để nói ông bị giết ngay khi nhà Trần chấm dứt. Cuộc đời của ông sau đó và năm mất chưa được xác định.",
            refs: [
              ["thieu-de-court", "Mục tháng 2/1400 và chú thích 4"],
              [
                "toan-thu-family",
                "Quyển VIII, tờ 37b: giáng làm Bảo Ninh Đại vương, được tha vì là cháu ngoại",
              ],
              ...genealogy("Trần Thiếu Đế"),
            ],
            kind: "chronicle",
          },
        ],
      },
    ],
    eventIds: ["thieu-de-len-ngoi", "thuan-tong-bi-hai", "nha-ho-1400"],
  },
  "tran-thua": {
    title: "Thái thượng hoàng · Trần Thái Tổ được truy tôn",
    summary: {
      text: "Trần Thừa là con Trần Lý, anh em với Trần Tự Khánh và Trần Thị Dung, đồng thời là cha của Trần Cảnh. Ông tham gia thế lực họ Trần cuối triều Lý và được tôn làm Thái thượng hoàng sau khi con lên ngôi. Trần Thừa không trực tiếp ở ngôi hoàng đế; Thái Tổ là miếu hiệu được truy tôn. Ông mất năm 1234.",
      refs: [
        ["tran-thua", "Các phần về gia đình và ‘Trở thành Thái tổ’"],
        ["tran-chronology", "Mục Trần Thái Tông, vai trò Trần Thừa"],
      ],
    },
    relatedClaimIds: ["thua-dates"],
  },
  "ly-chieu-hoang": {
    title: "Vị vua cuối cùng của nhà Lý",
    life: "1218–1278",
    summary: {
      text: "Lý Chiêu Hoàng, còn gọi Chiêu Thánh, là con Lý Huệ Tông và Trần Thị Dung. Bà được đưa lên ngôi khi còn nhỏ, trở thành vị vua cuối cùng của nhà Lý. Sau cuộc hôn nhân với Trần Cảnh, bà nhường ngôi trong mốc chuyển triều 1225/1226. Sự kiện này kết thúc triều Lý và mở đầu nhà Trần, trong bối cảnh họ Trần đã nắm quyền lực trong cung đình.",
      refs: [
        [
          "the-thu",
          "Chương 4, mục 9 – Lý Chiêu Hoàng: cha mẹ, năm sinh và năm mất",
        ],
        [
          "ly-transition",
          "Các đoạn Chiêu Thánh lên ngôi, hôn nhân và nhường ngôi",
        ],
      ],
    },
    relatedClaimIds: ["date-disagreement"],
  },
  "tran-thu-do": {
    title: "Người tổ chức việc chuyển từ nhà Lý sang nhà Trần",
    summary: {
      text: "Trần Thủ Độ giữ chức Điện tiền chỉ huy sứ dưới triều Lý và nắm lực lượng bảo vệ cung đình. Ông cùng những người trong họ Trần tổ chức việc kết hôn giữa Lý Chiêu Hoàng và Trần Cảnh, rồi chuyển giao ngôi vua. Quyền lực của ông gắn với bộ máy cung đình và việc hình thành triều Trần, trong khi người trực tiếp nhận ngôi hoàng đế là Trần Cảnh.",
      refs: [
        [
          "ly-transition",
          "Các đoạn Điện tiền chỉ huy sứ, việc cung cấm và hôn nhân chuyển ngôi",
        ],
      ],
    },
    relatedClaimIds: ["transition"],
  },
  "tran-thi-dung": {
    title: "Thái hậu cuối thời Lý · Linh Từ quốc mẫu",
    summary: {
      text: "Trần Thị Dung là con Trần Lý, anh em với Trần Thừa và Trần Tự Khánh. Bà là mẹ Lý Chiêu Hoàng và giữ vị trí Thái hậu trong giai đoạn cuối triều Lý. Quan hệ hoàng tộc đặt bà vào trung tâm việc kiểm soát cung đình; bà cùng Trần Thủ Độ tham gia quá trình dẫn tới hôn nhân của Chiêu Hoàng với Trần Cảnh và việc chuyển ngôi sang nhà Trần.",
      refs: [
        ["tran-thua", "Đoạn về gia đình Trần Lý"],
        [
          "ly-transition",
          "Các đoạn về Thái hậu Trần Thị Dung và quá trình chuyển ngôi",
        ],
      ],
    },
    relatedClaimIds: ["transition"],
  },
  "tran-ly": {
    title: "Hào trưởng Hải Ấp · thế hệ đầu của họ Trần",
    summary: {
      text: "Trần Lý là hào trưởng ở Hải Ấp, thuộc một gia đình gắn với nghề đánh cá và có thế lực địa phương. Ông là cha của Trần Thừa, Trần Tự Khánh và Trần Thị Dung, ông nội Trần Cảnh. Hoạt động của gia đình ông nằm trong bối cảnh quyền lực triều Lý suy yếu và các lực lượng địa phương tham gia tranh giành ảnh hưởng đầu thế kỷ XIII.",
      refs: [
        ["ly-study", "Trang in 347–355, đoạn Hải Ấp và Trần Lý"],
        ["tran-thua", "Đoạn gia tộc ‘Từ phận ngư, tiều’"],
      ],
    },
    relatedClaimIds: ["late-ly"],
  },
  "tran-tu-khanh": {
    title: "Người nắm lực lượng họ Trần cuối triều Lý",
    summary: {
      text: "Trần Tự Khánh là con Trần Lý, anh em với Trần Thừa và Trần Thị Dung. Trong những biến động cuối triều Lý, ông là một nhân vật quân sự quan trọng của họ Trần. Cùng Trần Thừa, ông góp phần mở rộng ảnh hưởng từ căn cứ địa phương đến triều đình, tạo nên bối cảnh quyền lực trước khi Trần Cảnh nhận ngôi vua.",
      refs: [
        ["ly-study", "Trang in 347–355, các đoạn về lực lượng Trần Tự Khánh"],
        ["tran-thua", "Đoạn về các con của Trần Lý"],
      ],
    },
    relatedClaimIds: ["late-ly"],
  },
  "tran-quoc-tuan": {
    title: "Hưng Đạo Đại vương · Quốc công tiết chế",
    life: "Khoảng 1228–1300",
    summary: {
      text: "Trần Quốc Tuấn, thường gọi Trần Hưng Đạo, là một vương hầu và người chỉ huy quân sự của triều Trần, con của An Sinh vương Trần Liễu. Ông giữ vai trò Quốc công tiết chế trong kháng chiến chống Nguyên, gắn với các chiến dịch năm 1285 và 1287–1288, đặc biệt là chiến thắng Bạch Đằng. Ông còn được biết đến với Hịch tướng sĩ và di sản quân sự thời Trần.",
      refs: [
        [
          "quoc-tuan-biography",
          "Các đoạn mở đầu, quyền tiết chế và Hịch tướng sĩ",
        ],
        ["wars-education", "Mục II và III: vai trò Trần Quốc Tuấn"],
      ],
    },
    relatedClaimIds: ["war-1288", "bach-dang-uncertainty"],
    sections: [
      {
        title: "Nhánh An Sinh và quan hệ với hoàng gia",
        claims: [
          {
            text: "Trần Quốc Tuấn là con Trần Liễu, thuộc nhánh An Sinh. Liễu là anh Trần Thái Tông nên Quốc Tuấn và Trần Thánh Tông thuộc hai nhánh con của Trần Thừa. Con gái Quốc Tuấn là Bảo Thánh được gả cho thái tử Trần Khâm năm 1274; bà trở thành hoàng hậu của Nhân Tông và là mẹ Trần Anh Tông. Gia đình ông vì thế có quan hệ trực tiếp với các vua cùng thời bên cạnh vai trò quân sự.",
            refs: [
              [
                "quoc-tuan-biography",
                "Đoạn xuất thân, cha là An Sinh vương Trần Liễu",
              ],
              ["tran-marriages", "Các mục Trần Liễu và Nhân Tông–Bảo Thánh"],
              ["toan-thu-family", "Quyển V, tờ 34a: hôn nhân thái tử năm 1274"],
              ["toan-thu-anh-tong", "Quyển VI, tờ 1a: mẹ Anh Tông"],
            ],
          },
        ],
      },
    ],
  },
  "huyen-tran": {
    title: "Công chúa triều Trần · cuộc hôn nhân Việt–Champa",
    summary: {
      text: "Huyền Trân là con gái Trần Nhân Tông, gắn với cuộc hôn nhân với vua Champa Chế Mân năm 1306. Sự kiện đi cùng việc chuyển hai châu Ô và Lý cho Đại Việt. Cuộc đời bà thường được nhắc đến trong lịch sử quan hệ giữa hai nước, nơi hôn nhân hoàng gia, ngoại giao và biến đổi không gian chính trị có liên hệ chặt chẽ với nhau.",
      refs: [
        [
          "huyen-tran",
          "Đoạn mở đầu về công chúa, Chế Mân, mốc 1306 và hai châu Ô, Lý",
        ],
      ],
    },
    relatedClaimIds: ["huyen-marriage"],
  },
  "che-man": {
    title: "Vua Champa · quan hệ với Đại Việt",
    summary: {
      text: "Chế Mân là vua Champa và là người kết hôn với công chúa Huyền Trân của Đại Việt năm 1306. Cuộc hôn nhân được ghi nhận cùng việc chuyển hai châu Ô và Lý cho Đại Việt. Ông là nhân vật liên quan trực tiếp đến lịch sử ngoại giao và quan hệ giữa Champa với triều Trần đầu thế kỷ XIV.",
      refs: [
        ["huyen-tran", "Đoạn về vua Champa Chế Mân và cuộc hôn nhân năm 1306"],
      ],
    },
  },
  "ho-quy-ly": {
    title: "Người nắm quyền cuối thời Trần · người lập nhà Hồ",
    summary: {
      text: "Hồ Quý Ly, còn mang họ Lê trong một giai đoạn, là nhân vật nắm quyền lực ngày càng lớn vào cuối triều Trần. Ông thúc đẩy các chính sách như tiền giấy năm 1396 và hạn điền năm 1397, trước khi thay ngôi nhà Trần năm 1400. Triều Hồ được thành lập với quốc hiệu Đại Ngu, đặt kinh đô ở Tây Đô.",
      refs: [
        ["ho-reforms", "Các đoạn tiền giấy và hạn điền"],
        ["ho-chronology", "Mục Hồ Quý Ly, quốc hiệu và kinh đô"],
      ],
    },
    relatedClaimIds: ["ho-reform-dates", "tran-ending"],
    sections: [
      {
        title: "Quan hệ với hoàng tộc Trần",
        claims: [
          {
            text: "Năm 1371, Trần Nghệ Tông cất nhắc Quý Ly và gả em gái là công chúa Huy Ninh cho ông. Huy Ninh là con Trần Minh Tông; bà cùng Quý Ly có con gái Khâm Thánh. Khâm Thánh trở thành hoàng hậu của Trần Thuận Tông và sinh Trần Thiếu Đế. Do đó, Quý Ly vừa là người trong mạng lưới hôn nhân hoàng tộc, vừa là ông ngoại của vua cuối triều Trần.",
            refs: [
              [
                "toan-thu-family",
                "Quyển VII, tờ 38a: cất nhắc và hôn nhân năm 1371; VIII, tờ 38b: con cái Huy Ninh",
              ],
              [
                "toan-thu-thuan-tong",
                "Quyển VIII, tờ 14a: con gái trưởng Quý Ly làm hoàng hậu",
              ],
              ...genealogy("Trần Thiếu Đế"),
            ],
            kind: "chronicle",
          },
        ],
      },
      {
        title: "Từ nhiếp chính đến thay ngôi",
        claims: [
          {
            text: "Quý Ly ép Thuận Tông nhường ngôi cho Thiếu Đế năm 1398 rồi nắm quyền nhiếp chính. Sau cái chết của Thuận Tông và biến động Đốn Sơn năm 1399, ông tiếp tục củng cố quyền lực. Năm 1400, ông phế cháu ngoại, lập nhà Hồ. Quan hệ gia đình giải thích vị trí của ông trong triều, còn quá trình chuyển triều gắn với những hành động chính trị diễn ra trong nhiều năm.",
            refs: [
              ["thieu-de-court", "Các mục 1398–1400"],
              ["ho-chronology", "Mục Hồ Quý Ly: lập nhà Hồ năm 1400"],
            ],
            kind: "interpretation",
          },
        ],
      },
    ],
    eventIds: ["thieu-de-len-ngoi", "thuan-tong-bi-hai", "nha-ho-1400"],
  },
  "huy-ninh": {
    title: "Công chúa triều Trần · vợ Hồ Quý Ly",
    summary: {
      text: "Huy Ninh là con gái Trần Minh Tông và là em gái Trần Nghệ Tông. Năm 1371, Nghệ Tông gả bà cho Hồ Quý Ly. Bà là mẹ Khâm Thánh hoàng hậu và Hồ Hán Thương, vì vậy cũng là bà ngoại của Trần Thiếu Đế. Nhánh gia đình này kết nối hoàng tộc Trần với những người đứng đầu triều Hồ.",
      refs: [
        [
          "toan-thu-family",
          "Quyển VII, tờ 38a (1371); VIII, tờ 38b: thân thế và con cái Huy Ninh",
        ],
      ],
      kind: "chronicle",
    },
  },
  "kham-thanh": {
    title: "Hoàng hậu của Thuận Tông · mẹ Trần Thiếu Đế",
    aliases: ["Thánh Ngâu", "Thánh Ngẫu"],
    summary: {
      text: "Khâm Thánh là con gái trưởng Hồ Quý Ly và công chúa Huy Ninh. Bà được lập làm hoàng hậu của Trần Thuận Tông năm 1389 và là mẹ Trần Thiếu Đế. Khi con lên ngôi năm 1398, bà được tôn làm hoàng thái hậu. Qua bà, Thiếu Đế là cháu ngoại Hồ Quý Ly; đây là quan hệ gia đình trực tiếp của hai người ở thời điểm chuyển triều năm 1400.",
      refs: [
        [
          "toan-thu-thuan-tong",
          "Quyển VIII, tờ 14a: Thánh Ngâu/Thánh Ngẫu và việc lập hoàng hậu",
        ],
        ["toan-thu-family", "Quyển VIII, tờ 38b: mẹ Khâm Thánh là Huy Ninh"],
        ["thieu-de-court", "Mở đầu năm 1398 và chú thích 4"],
      ],
      kind: "chronicle",
    },
  },
  "tran-lieu": {
    title: "An Sinh vương · cha Trần Quốc Tuấn",
    summary: {
      text: "Trần Liễu là con Trần Thừa, anh của Trần Thái Tông và là cha Trần Quốc Tuấn. Năm 1237, việc triều đình đưa vợ ông là Thuận Thiên sang làm hoàng hậu của Thái Tông dẫn tới cuộc nổi dậy của Liễu; sau đó ông được tha. Nhánh An Sinh của ông có người con Quốc Tuấn giữ vai trò quan trọng trong các cuộc kháng chiến chống Nguyên.",
      refs: [
        ["tran-marriages", "Các mục Liễu–Thuận Thiên và Thái Tông–Thuận Thiên"],
        [
          "quoc-tuan-biography",
          "Đoạn cha Quốc Tuấn là An Sinh vương Trần Liễu",
        ],
      ],
      kind: "chronicle",
    },
  },
  "thuan-thien": {
    title: "Hoàng hậu · mẹ Trần Thánh Tông",
    summary: {
      text: "Thuận Thiên là con Lý Huệ Tông và Trần Thị Dung, chị của Lý Chiêu Hoàng. Bà từng là vợ Trần Liễu, sau đó được đưa sang làm hoàng hậu của Trần Thái Tông năm 1237. Bà là mẹ Trần Hoảng, tức Trần Thánh Tông. Hai cuộc hôn nhân của bà thuộc những giai đoạn khác nhau và gắn với biến động trong hoàng tộc đầu triều Trần.",
      refs: [
        ["tran-marriages", "Các mục Liễu–Thuận Thiên và Thái Tông–Thuận Thiên"],
        [
          "toan-thu-thanh-tong",
          "Quyển V, tờ 25a: mẹ Thánh Tông là Hiển Từ Thuận Thiên Lý thị",
        ],
      ],
      kind: "chronicle",
    },
  },
  "bao-thanh": {
    title: "Hoàng hậu của Nhân Tông · mẹ Trần Anh Tông",
    summary: {
      text: "Bảo Thánh là con gái của Hưng Đạo vương Trần Quốc Tuấn. Năm 1274, bà được gả cho thái tử Trần Khâm, về sau là vua Trần Nhân Tông. Bà là mẹ Trần Anh Tông, được sử ghi với tôn hiệu Khâm Từ Bảo Thánh. Quan hệ này nối nhánh An Sinh của Quốc Tuấn với nhánh các vua Nhân Tông và Anh Tông.",
      refs: [
        [
          "toan-thu-family",
          "Quyển V, tờ 34a: gả con gái trưởng Hưng Đạo cho thái tử năm 1274",
        ],
        ["tran-marriages", "Mục Nhân Tông–Bảo Thánh"],
        ["toan-thu-anh-tong", "Quyển VI, tờ 1a: mẹ Anh Tông"],
      ],
      kind: "chronicle",
    },
  },
};

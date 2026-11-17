import type { Claim, Person } from "../schema";
import { claim, type Ref } from "../claim-store";

const genealogy = (name: string): Ref[] => [
  ["the-thu", `Chương 4, phần II — mục ${name}`],
];
const section = (
  id: string,
  title: string,
  text: string,
  refs: Ref[],
  kind?: Claim["kind"],
) => ({
  title,
  claimIds: [claim(id, text, refs, kind ? { kind } : {})],
});

export const lyEarlyPeople: Person[] = [
  {
    id: "ly-thai-to",
    periodIds: ["ly"],
    name: "Lý Thái Tổ",
    personalName: "Lý Công Uẩn",
    templeName: "Thái Tổ",
    aliases: ["Lý Công Uẩn"],
    eraNames: ["Thuận Thiên"],
    title: "Người mở đầu triều Lý · Người định đô Thăng Long",
    life: "974–1028",
    contextYear: 1010,
    summaryClaimIds: [
      claim(
        "bio-ly-thai-to-summary",
        "Lý Thái Tổ, tên húy Lý Công Uẩn, là người mở đầu triều Lý. Ông sinh năm 974 ở vùng Cổ Pháp, từng làm quan trong triều Tiền Lê và lên ngôi năm 1009. Năm 1010, ông đặt niên hiệu Thuận Thiên, dời đô từ Hoa Lư đến Đại La và đổi tên kinh đô thành Thăng Long. Ông giữ ngôi đến khi mất năm 1028, để lại một trung tâm chính trị được nhiều triều đại tiếp tục sử dụng.",
        [
          ...genealogy("Lý Thái Tổ"),
          [
            "ly-toan-thu-thai-to",
            "Quyển II, tờ 1a: Công Uẩn, Cổ Pháp, năm sinh và chức vụ",
          ],
          [
            "ly-thang-long-exhibition",
            "Đức vua Lý Công Uẩn và quyết định dời đô",
          ],
        ],
      ),
    ],
    biographySections: [
      section(
        "bio-ly-thai-to-origin",
        "Cổ Pháp và môi trường Phật giáo",
        "Sử cũ ghi mẹ Công Uẩn là người họ Phạm, ông được Lý Khánh Văn nhận nuôi và được Vạn Hạnh chú ý dạy dỗ. Những mối liên hệ ấy cho thấy môi trường nhà chùa gắn với tuổi trẻ của người sáng lập triều Lý. Gia thế của ông cũng được bao phủ bởi nhiều chuyện sinh nở và điềm lạ; đó là lớp truyền thuyết, khác với bằng chứng xác định quan hệ huyết thống.",
        [
          [
            "ly-toan-thu-thai-to",
            "Quyển II, tờ 1a: mẹ họ Phạm, Khánh Văn và Vạn Hạnh",
          ],
          [
            "ly-thang-long-exhibition",
            "Quê hương nhà Lý: các truyền thuyết về thân thế",
          ],
        ],
        "chronicle",
      ),
      section(
        "bio-ly-thai-to-capital",
        "Một kinh đô cho triều đại mới",
        "Khi tiếp nhận quyền lực từ Tiền Lê, nhà Lý vẫn đóng tại Hoa Lư và sử dụng bộ máy có trước. Quyết định chuyển tới Đại La đưa triều đình đến một không gian đồng bằng có mạng lưới sông ngòi thuận lợi. Chiếu dời đô trình bày sự lựa chọn ấy bằng những lý lẽ về địa thế và khả năng phát triển lâu dài, nên đây vừa là việc chuyển nơi ở của vua, vừa là một lựa chọn tổ chức quốc gia.",
        [
          [
            "ly-institutions",
            "Mở đầu: tiếp nhận thể chế tại Hoa Lư trước khi chuyển ra Thăng Long",
          ],
          [
            "ly-thang-long-exhibition",
            "Phần quyết định dời đô và xây dựng kinh đô mới",
          ],
        ],
        "interpretation",
      ),
    ],
    eventIds: ["ly-lap-trieu-1009", "ly-doi-do-1010"],
  },
  {
    id: "ly-thai-tong",
    periodIds: ["ly"],
    name: "Lý Thái Tông",
    personalName: "Lý Phật Mã",
    templeName: "Thái Tông",
    aliases: ["Lý Phật Mã", "Lý Đức Chính"],
    eraNames: [
      "Thiên Thành",
      "Thông Thụy",
      "Càn Phù Hữu Đạo",
      "Minh Đạo",
      "Thiên Cảm Thánh Vũ",
      "Sùng Hưng Đại Bảo",
    ],
    title: "Hoàng đế Đại Cồ Việt · Củng cố phép nước",
    life: "1000–1054",
    contextYear: 1042,
    summaryClaimIds: [
      claim(
        "bio-ly-thai-tong-summary",
        "Lý Thái Tông, tên húy Phật Mã, còn có tên Đức Chính, là con của Lý Thái Tổ và hoàng hậu họ Lê. Ông sinh năm 1000, kế ngôi năm 1028 sau biến động trong hoàng tộc. Trong thời gian trị vì, ông củng cố quyền lực của triều Lý và cho ban hành Hình thư năm 1042. Ông mất năm 1054; con là Lý Nhật Tôn nối ngôi, tức Lý Thánh Tông.",
        [
          ...genealogy("Lý Thái Tông"),
          [
            "ly-toan-thu-thai-tong",
            "Quyển II, tờ 18a: tên, cha mẹ, năm sinh và nhiệm kỳ",
          ],
          ["ly-institutions", "Mục 3: Hình thư năm 1042"],
        ],
      ),
    ],
    biographySections: [
      section(
        "bio-ly-thai-tong-succession",
        "Vượt qua biến động nối ngôi",
        "Phật Mã được lập làm thái tử khi cha còn trị vì. Khi Thái Tổ qua đời, việc kế vị gặp chống đối trong hoàng tộc; Lê Phụng Hiểu giúp ông vượt qua biến động và giữ ngôi. Việc kế tục triều đại vì thế không chỉ phụ thuộc vào địa vị thái tử mà còn vào lực lượng ủng hộ trong triều.",
        [
          [
            "ly-toan-thu-thai-tong",
            "Quyển II, tờ 18a: thái tử và vai trò Phụng Hiểu",
          ],
          ...genealogy("Lý Thái Tông"),
        ],
        "chronicle",
      ),
      section(
        "bio-ly-thai-tong-law",
        "Hình thư và việc xét xử",
        "Năm 1042, triều đình san định luật lệnh thành Hình thư để việc xét xử có điều khoản rõ hơn. Nghiên cứu dẫn sử cũ cho biết việc này nhằm hạn chế tình trạng áp dụng luật quá khắc nghiệt và kiện tụng phiền nhiễu. Bộ sách đã thất truyền, nên các ghi chép còn lại giúp nhận biết một dấu mốc pháp chế, nhưng không cho phép phục dựng đầy đủ nội dung từng điều luật.",
        [
          [
            "ly-institutions",
            "Mục 3: ban hành Hình thư và giới hạn do văn bản thất truyền",
          ],
        ],
      ),
    ],
    eventIds: ["ly-hinh-thu-1042"],
  },
  {
    id: "ly-thanh-tong",
    periodIds: ["ly"],
    name: "Lý Thánh Tông",
    personalName: "Lý Nhật Tôn",
    templeName: "Thánh Tông",
    aliases: ["Lý Nhật Tôn"],
    eraNames: [
      "Long Thụy Thái Bình",
      "Chương Thánh Gia Khánh",
      "Long Chương Thiên Tự",
      "Thiên Huống Bảo Tượng",
      "Thần Vũ",
    ],
    title: "Hoàng đế đặt quốc hiệu Đại Việt · Người dựng Văn Miếu",
    life: "1023–1072",
    contextYear: 1054,
    summaryClaimIds: [
      claim(
        "bio-ly-thanh-tong-summary",
        "Lý Thánh Tông, tên húy Lý Nhật Tôn, là con của Lý Thái Tông và thái hậu họ Mai. Ông sinh năm 1023, lên ngôi năm 1054 và đặt quốc hiệu Đại Việt. Thời ông có chiến dịch Champa năm 1069 và việc dựng Văn Miếu năm 1070. Ông mất năm 1072, để lại ngôi vua cho con là Lý Càn Đức, tức Lý Nhân Tông, khi người kế vị còn nhỏ.",
        [
          ["ly-toan-thu-thanh-tong", "Quyển III, tờ 1a: Nhật Tôn và cha mẹ"],
          ["ly-thanh-tong-vanmieu", "Tiểu sử và việc dựng Văn Miếu"],
          ["ly-thuong-kiet-campaign", "Chiến dịch Champa năm 1069"],
          ...genealogy("Lý Thánh Tông"),
        ],
      ),
    ],
    biographySections: [
      section(
        "bio-ly-thanh-tong-education",
        "Quốc hiệu và việc học",
        "Nhật Tôn được lập làm thái tử từ năm 1028, trước khi nhận ngôi năm 1054. Quốc hiệu Đại Việt đi cùng thời kỳ nhà Lý tiếp tục xây dựng bộ máy và đời sống văn hóa. Năm 1070, Văn Miếu được dựng để thờ Khổng Tử và các bậc tiên hiền, hoàng thái tử đến học; Quốc Tử Giám là mốc khác, được lập sau thời ông.",
        [
          ["ly-toan-thu-thanh-tong", "Quyển III, tờ 1a: thái tử năm 1028"],
          ["ly-thanh-tong-vanmieu", "Đoạn quốc hiệu và Văn Miếu 1070"],
          ["ly-vanmieu-history", "Các mốc 1070 và 1076"],
        ],
      ),
      section(
        "bio-ly-thanh-tong-champa",
        "Chiến dịch phía nam và vai trò của Ỷ Lan",
        "Năm 1069, Thánh Tông thân chinh đánh Champa cùng Lý Thường Kiệt; vua Chế Củ bị bắt. Việc nhượng ba châu Địa Lý, Ma Linh và Bố Chính sau chiến dịch làm thay đổi không gian biên giới phía nam. Trong lúc nhà vua đi xa, Ỷ Lan trông coi triều chính, cho thấy hoạt động quân sự và việc duy trì điều hành trong nước gắn chặt với nhau.",
        [
          ["ly-hxh", "Tựa, trang PDF 2: chiến dịch Champa và ba châu"],
          [
            "ly-y-lan-vass",
            "Đoạn Thánh Tông đi đánh Champa và Ỷ Lan coi triều",
          ],
        ],
      ),
    ],
    eventIds: ["ly-quoc-hieu-1054", "ly-champa-1069", "ly-van-mieu-1070"],
  },
  {
    id: "ly-nhan-tong",
    periodIds: ["ly"],
    name: "Lý Nhân Tông",
    personalName: "Lý Càn Đức",
    templeName: "Nhân Tông",
    aliases: ["Lý Càn Đức"],
    eraNames: [
      "Thái Ninh",
      "Anh Vũ Chiêu Thắng",
      "Quảng Hựu",
      "Hội Phong",
      "Long Phù",
      "Hội Tường Đại Khánh",
      "Thiên Phù Duệ Vũ",
      "Thiên Phù Khánh Thọ",
    ],
    title: "Hoàng đế Đại Việt · Thời kỳ khoa cử và kháng Tống",
    life: "1066–1127",
    contextYear: 1075,
    summaryClaimIds: [
      claim(
        "bio-ly-nhan-tong-summary",
        "Lý Nhân Tông, tên húy Lý Càn Đức, là con của Lý Thánh Tông và Ỷ Lan, tức Linh Nhân thái hậu. Ông sinh năm 1066 và lên ngôi năm 1072 khi còn nhỏ. Triều ông gắn với khoa thi Nho học năm 1075, việc lập Quốc Tử Giám năm 1076 và cuộc chiến chống Tống do Lý Thường Kiệt chỉ huy. Theo quy ước niên đại của nguồn Việt được dẫn, ông giữ ngôi đến năm 1127; việc chọn người kế vị dẫn tới Lý Dương Hoán, con Sùng Hiền hầu.",
        [
          ["ly-toan-thu-nhan-tong", "Quyển III, tờ 6b: Càn Đức và cha mẹ"],
          ["ly-nhan-tong-museum", "Các đoạn năm sinh, lên ngôi và khoa thi"],
          ["ly-vanmieu-history", "Thời Lý: Quốc Tử Giám 1076"],
          ...genealogy("Lý Nhân Tông; Lý Thần Tông"),
        ],
      ),
    ],
    biographySections: [
      section(
        "bio-ly-nhan-tong-court",
        "Vua nhỏ và những người giúp việc nước",
        "Khi Càn Đức lên ngôi, Thượng Dương thái hậu và Thái sư Lý Đạo Thành tham gia điều hành. Về sau, Linh Nhân thái hậu Ỷ Lan có vai trò lớn trong triều chính, còn Lý Thường Kiệt nắm việc quân. Nhìn vào những người cùng giữ trách nhiệm sẽ giúp hiểu hoạt động của triều đình, thay vì quy tất cả quyết định cho vị vua còn nhỏ.",
        [
          [
            "ly-toan-thu-nhan-tong",
            "Quyển III, tờ 6b: Thượng Dương và Đạo Thành",
          ],
          [
            "ly-thuong-kiet-campaign",
            "Đoạn đầu triều Nhân Tông và binh quyền Thường Kiệt",
          ],
          ["ly-y-lan-vass", "Phần sau năm 1072"],
        ],
        "chronicle",
      ),
      section(
        "bio-ly-nhan-tong-learning",
        "Tuyển người có học vào triều",
        "Khoa Minh kinh bác học và Nho học tam trường năm 1075 chọn Lê Văn Thịnh đỗ đầu, sau đó ông được hầu vua học. Việc lập Quốc Tử Giám năm 1076 tiếp nối quá trình xây dựng cơ sở học tập và tuyển dụng của nhà nước. Đây là hai bước khác nhau: một bên là kỳ tuyển chọn, một bên là cơ sở đào tạo.",
        [
          ["ly-le-van-thinh", "Đoạn khoa thi 1075 và hầu vua học"],
          ["ly-vanmieu-history", "Các mốc 1075 và 1076"],
        ],
      ),
      section(
        "bio-ly-nhan-tong-succession",
        "Việc chọn người nối ngôi",
        "Nhân Tông không có con trai nối ngôi và nhận Lý Dương Hoán làm con nuôi. Dương Hoán là con Sùng Hiền hầu, em của Nhân Tông, nên người kế vị thuộc nhánh cháu gọi vua bằng bác. Quan hệ này khác với quan hệ cha đẻ–con, dù Dương Hoán nối ngôi với miếu hiệu Thần Tông.",
        genealogy("Lý Nhân Tông; Lý Thần Tông"),
      ),
    ],
    eventIds: [
      "ly-van-mieu-1070",
      "ly-khoa-thi-1075",
      "ly-quoc-tu-giam-1076",
      "ly-khang-tong-1075",
    ],
    note: "Mốc 1127 giữ theo năm Đinh Mùi trong nguồn Việt; một số tài liệu chuyển sang lịch Tây ghi 1128.",
  },
  {
    id: "ly-thuong-kiet",
    periodIds: ["ly"],
    name: "Lý Thường Kiệt",
    personalName: "Ngô Tuấn",
    aliases: ["Ngô Tuấn", "Việt Quốc công"],
    title: "Thái úy · Người chỉ huy kháng chiến chống Tống",
    life: "1019–1105",
    contextYear: 1077,
    summaryClaimIds: [
      claim(
        "bio-ly-thuong-kiet-summary",
        "Lý Thường Kiệt là đại thần và tướng lĩnh phục vụ qua ba đời vua Lý Thái Tông, Lý Thánh Tông và Lý Nhân Tông. Ông thường được ghi có tên Ngô Tuấn, được ban quốc tính họ Lý, sống trong những năm 1019–1105. Sau chiến dịch Champa năm 1069, ông giữ vai trò chỉ huy nổi bật trong cuộc chiến Đại Việt–Tống năm 1075–1077. Sự nghiệp của ông gắn cả với việc dùng binh, tổ chức phòng thủ và thương lượng để kết thúc chiến tranh.",
        [
          [
            "ly-thuong-kiet-hien-than",
            "Đoạn tên, ban quốc tính, ba triều vua và sự nghiệp",
          ],
          ["ly-thuong-kiet-campaign", "Các đoạn 1069 và 1075–1077"],
        ],
      ),
    ],
    biographySections: [
      section(
        "bio-ly-thuong-kiet-war",
        "Từ tiến công tới phòng tuyến và giảng hòa",
        "Năm 1075, quân Đại Việt đánh các căn cứ Ung, Khâm và Liêm của nhà Tống rồi rút về. Khi quân Tống tiến xuống, Thường Kiệt tổ chức ngăn chặn tại phòng tuyến Như Nguyệt, trên sông Cầu. Sau giao tranh, ông chủ động giảng hòa để quân Tống rút; những vấn đề biên giới tiếp tục được giải quyết qua ngoại giao.",
        [
          [
            "ly-thuong-kiet-campaign",
            "Phần tiến công, phòng tuyến và giảng hòa",
          ],
          ["ly-hxh", "Tựa, trang PDF 1–3: kết hợp quân sự và ngoại giao"],
        ],
      ),
      section(
        "bio-ly-thuong-kiet-poem",
        "Danh tướng và bài thơ được truyền tụng",
        "Tên Thường Kiệt thường xuất hiện cùng Nam quốc sơn hà trong câu chuyện về kháng chiến. Tuy nhiên, nghiên cứu văn bản cho thấy bài thơ có nhiều dị bản và không lưu tên tác giả. Chuyện thần sông đọc thơ là một lớp truyền tụng về sức mạnh tinh thần của cuộc chiến; nó không tự chứng minh ai đã sáng tác bài thơ.",
        [
          [
            "ly-nam-quoc-research",
            "Phần mở đầu: vô danh, nhiều dị bản và giới hạn việc xác định thời điểm",
          ],
          ["ly-hxh", "Trang PDF 154–155: chuyện thần Trương Hát đọc thơ"],
        ],
        "interpretation",
      ),
    ],
    eventIds: ["ly-champa-1069", "ly-khang-tong-1075"],
  },
  {
    id: "y-lan",
    periodIds: ["ly"],
    name: "Ỷ Lan",
    aliases: ["Nguyên phi Ỷ Lan", "Linh Nhân hoàng thái hậu", "Bà Tấm"],
    title: "Nguyên phi thời Thánh Tông · Hoàng thái hậu thời Nhân Tông",
    life: "Chưa rõ năm sinh–1117",
    contextYear: 1072,
    summaryClaimIds: [
      claim(
        "bio-y-lan-summary",
        "Ỷ Lan là vợ của Lý Thánh Tông và mẹ của Lý Nhân Tông, được biết đến với danh xưng Linh Nhân hoàng thái hậu. Bà xuất thân từ vùng Thổ Lỗi, sau gọi Siêu Loại, và mất năm 1117; năm sinh chưa được xác định chắc chắn. Khi Thánh Tông đi đánh Champa năm 1069, bà trông coi công việc trong nước. Đến thời Nhân Tông, bà tiếp tục giữ vai trò quan trọng trong triều chính và đời sống Phật giáo.",
        [
          [
            "ly-y-lan-vass",
            "Phần thân thế, vai trò năm 1069 và thời Nhân Tông; chú thích 1 về năm sinh",
          ],
          [
            "ly-toan-thu-nhan-tong",
            "Quyển III, tờ 6b: Linh Nhân là mẹ Càn Đức",
          ],
        ],
      ),
    ],
    biographySections: [
      section(
        "bio-y-lan-court",
        "Giữa hoàng gia và việc điều hành triều đình",
        "Vị trí của Ỷ Lan thay đổi qua hai đời vua: từ nguyên phi của Thánh Tông sang mẹ của người kế vị. Thời Nhân Tông còn nhỏ, việc nước liên quan tới cả các thái hậu và đại thần như Đạo Thành, Thường Kiệt. Các quan hệ ấy giải thích vì sao vai trò của bà gắn với cả phả hệ lẫn cơ cấu phụ chính của triều đình.",
        [
          ["ly-y-lan-vass", "Các đoạn 1069, 1072 và vai trò trong triều"],
          ["ly-toan-thu-nhan-tong", "Quyển III, tờ 6b: phụ chính đầu triều"],
        ],
        "interpretation",
      ),
      section(
        "bio-y-lan-religion",
        "Phật giáo và đời sống nông nghiệp",
        "Ỷ Lan góp phần xây dựng chùa và hoạt động Phật giáo dưới triều Nhân Tông. Nguồn sử được nghiên cứu dẫn lại còn ghi việc bà lên tiếng năm 1117 trước nạn giết trâu, trong bối cảnh nhiều hộ nông dân phải dùng chung sức kéo. Hai mặt hoạt động này cho thấy mối liên hệ giữa đời sống tôn giáo, hoàng gia và việc chăm lo sản xuất của triều đình.",
        [
          [
            "ly-y-lan-vass",
            "Các đoạn xây chùa và bảo vệ trâu sức kéo năm 1117",
          ],
        ],
      ),
    ],
    eventIds: ["ly-champa-1069", "ly-khang-tong-1075"],
  },
  {
    id: "le-van-thinh",
    periodIds: ["ly"],
    name: "Lê Văn Thịnh",
    personalName: "Lê Văn Thịnh",
    aliases: ["Thái sư Lê Văn Thịnh"],
    title: "Người đỗ đầu khoa thi 1075 · Đại thần ngoại giao",
    life: "Chưa rõ năm sinh và năm mất",
    contextYear: 1075,
    summaryClaimIds: [
      claim(
        "bio-le-van-thinh-summary",
        "Lê Văn Thịnh là người đỗ đầu khoa Minh kinh bác học và Nho học tam trường năm 1075 dưới triều Lý Nhân Tông. Sau khi được vào hầu vua học, ông tham gia công việc triều đình, nổi bật với việc thương lượng biên giới tại Vĩnh Bình năm 1084 và được phong Thái sư năm 1085. Năm 1096, ông bị đày trong vụ án Hồ Tây. Chưa đủ căn cứ để xác định chắc chắn năm sinh và năm mất của ông.",
        [
          [
            "ly-le-van-thinh",
            "Các đoạn khoa thi 1075, ngoại giao 1084, chức Thái sư 1085 và vụ án 1096",
          ],
        ],
      ),
    ],
    biographySections: [
      section(
        "bio-le-van-thinh-career",
        "Từ khoa cử tới ngoại giao",
        "Con đường của Lê Văn Thịnh cho thấy ý nghĩa của việc triều đình mở khoa thi để chọn người có học. Trong việc thương lượng với nhà Tống, ông góp phần giải quyết những vấn đề đất đai còn lại sau chiến tranh. Hoạt động này nối câu chuyện khoa cử với nhu cầu nhân sự thực tế của một nhà nước đang củng cố biên giới.",
        [
          [
            "ly-le-van-thinh",
            "Các đoạn vào hầu vua học và thương lượng Vĩnh Bình",
          ],
          ["ly-hxh", "Tựa, trang PDF 2–3: ngoại giao đòi đất sau chiến tranh"],
        ],
        "interpretation",
      ),
      section(
        "bio-le-van-thinh-case",
        "Vụ án Hồ Tây và lớp truyện hóa hổ",
        "Vụ án năm 1096 được lưu truyền cùng chuyện Lê Văn Thịnh hóa hổ. Yếu tố hóa hổ thuộc lớp truyện kỳ dị, không phải bằng chứng rằng một người thực sự biến thành thú. Điều có thể tách ra khỏi câu chuyện là việc một đại thần từng có công bị kết tội và đày đi; động cơ và diễn biến đầy đủ của vụ án vẫn khó xác định từ những ghi chép ngắn còn lại.",
        [["ly-le-van-thinh", "Phần vụ án Hồ Tây và việc đày Thao Giang"]],
        "chronicle",
      ),
    ],
    eventIds: ["ly-khoa-thi-1075"],
  },
  {
    id: "ly-dao-thanh",
    periodIds: ["ly"],
    name: "Lý Đạo Thành",
    personalName: "Lý Đạo Thành",
    aliases: ["Thái sư Lý Đạo Thành"],
    title: "Đại thần phụ chính qua hai triều vua Lý",
    life: "Chưa rõ năm sinh–1081",
    contextYear: 1074,
    summaryClaimIds: [
      claim(
        "bio-ly-dao-thanh-summary",
        "Lý Đạo Thành là đại thần giữ chức Thái sư thời Lý Thánh Tông và tham gia phụ chính khi Lý Nhân Tông lên ngôi còn nhỏ. Ông từng rời triều vào Nghệ An, sau đó trở lại giúp việc nước và trông coi nội trị trong thời kỳ chuẩn bị chống Tống. Ông mất năm 1081, chưa rõ năm sinh. Vai trò của ông cho thấy việc củng cố triều đình cần cả người lo chính sự lẫn người chỉ huy quân đội.",
        [
          [
            "ly-dao-thanh",
            "Các đoạn thời Thánh Tông, Nghệ An, trở lại triều và mất năm 1081",
          ],
          [
            "ly-toan-thu-nhan-tong",
            "Quyển III, tờ 6b: Thái sư Đạo Thành giúp việc đầu triều",
          ],
        ],
      ),
    ],
    biographySections: [
      section(
        "bio-ly-dao-thanh-regency",
        "Một người lo việc nội trị",
        "Sau khi Thánh Tông mất, Đạo Thành cùng Thượng Dương thái hậu giúp xử lý công việc của triều đình. Nguồn kể về thời chuẩn bị kháng Tống ghi việc ông trở lại làm Thái phó, Bình chương quân quốc trọng sự để trông coi chính sự. Việc phối hợp giữa Đạo Thành và Thường Kiệt giúp nhìn rõ hai mặt của công việc giữ nước: duy trì điều hành bên trong và tổ chức đối phó quân sự.",
        [
          ["ly-toan-thu-nhan-tong", "Quyển III, tờ 6b"],
          [
            "ly-thuong-kiet-campaign",
            "Đoạn mời Đạo Thành trở lại trông coi nội trị",
          ],
        ],
        "chronicle",
      ),
      section(
        "bio-ly-dao-thanh-learning",
        "Tên tuổi gắn với việc tuyển người tài",
        "Một số bài nghiên cứu phổ thông đề xuất Đạo Thành có vai trò tổ chức khoa thi năm 1075. Tuy nhiên, chính bài viết nêu đó là giả thuyết của tác giả vì sử sách không ghi trực tiếp ai tổ chức. Dữ kiện chắc hơn là triều Nhân Tông đã mở khoa thi, còn việc quy toàn bộ sáng kiến cho một cá nhân cần thêm bằng chứng.",
        [
          [
            "ly-dao-thanh",
            "Các đoạn tác giả tự nêu giả thuyết về người tổ chức khoa thi 1075",
          ],
        ],
        "hypothesis",
      ),
    ],
    eventIds: ["ly-khang-tong-1075"],
  },
];

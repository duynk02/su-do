import { date, type StoryChapter } from "../../schema";
import { claim } from "../../claim-store";
import { lyEarlyClaimIds as early } from "./early";

const pagoda = claim(
  "ly-pagoda-1049",
  "Diên Hựu được khởi dựng năm 1049 dưới thời Lý Thái Tông; phần kiến trúc thường gọi chùa Một Cột chỉ là một bộ phận của quần thể. Công trình đã được mở rộng, trùng tu và phục dựng qua nhiều thời kỳ. Hình dáng hiện nay vì vậy giúp hình dung một truyền thống kiến trúc Phật giáo, không thể xem là toàn bộ chùa nguyên trạng thế kỷ XI.",
  [
    [
      "image-source-ly-chua-mot-cot",
      "Bài Chùa Một Cột: các đoạn mở đầu năm 1049, quần thể Diên Hựu, mở rộng 1106 và phục dựng sau 1954",
    ],
  ],
);

export const lyChapters: StoryChapter[] = [
  {
    id: "ly-khoi-dau",
    periodId: "ly",
    number: "01",
    title: "Một triều đại bắt đầu từ Hoa Lư",
    question: "Vì sao Lý Công Uẩn trở thành người mở đầu một triều đại mới?",
    date: date(1009, 1010, "1009–1010"),
    anchorYear: 1009,
    placeIds: ["hoa-lu"],
    personIds: ["ly-thai-to"],
    eventIds: ["ly-lap-trieu-1009"],
    claimIds: [
      early.foundationContext,
      early.foundationDevelopment,
      early.foundationResult,
    ],
    visual: {
      type: "chain",
      label: "Từ quan triều Tiền Lê đến người mở triều Lý",
      items: [
        "Điện tiền chỉ huy sứ dưới triều Tiền Lê",
        "Được tôn lên ngôi năm 1009",
        "Mở niên hiệu Thuận Thiên năm 1010",
      ],
    },
    takeaway:
      "Việc lên ngôi và năm bắt đầu niên hiệu là hai mốc cần phân biệt.",
  },
  {
    id: "ly-doi-do",
    periodId: "ly",
    number: "02",
    title: "Từ Hoa Lư đến Thăng Long",
    question:
      "Một lựa chọn kinh đô có thể thay đổi hướng phát triển của đất nước như thế nào?",
    date: date(1010, 1010, "1010"),
    placeIds: ["hoa-lu", "thang-long"],
    personIds: ["ly-thai-to"],
    eventIds: ["ly-doi-do-1010"],
    claimIds: [
      early.capitalContext,
      early.capitalDevelopment,
      early.capitalResult,
    ],
    visual: {
      type: "timeline",
      items: [
        { date: "1009", label: "Lên ngôi tại Hoa Lư" },
        { date: "1010", label: "Dời đến Đại La" },
        { date: "1010", label: "Đổi tên Thăng Long" },
      ],
    },
    takeaway:
      "Định đô là quyết định về tổ chức quyền lực và không gian phát triển, vượt ra ngoài việc đổi tên một địa điểm.",
  },
  {
    id: "ly-the-che",
    periodId: "ly",
    number: "03",
    title: "Luật nước và dấu ấn Phật giáo",
    question:
      "Triều Lý củng cố việc cai trị và để lại những dấu tích văn hóa nào?",
    date: date(1028, 1054, "Thời Lý Thái Tông · 1028–1054"),
    anchorYear: 1042,
    placeIds: ["thang-long", "den-do"],
    personIds: ["ly-thai-tong"],
    eventIds: ["ly-hinh-thu-1042"],
    claimIds: [early.lawContext, early.lawDevelopment, early.lawResult, pagoda],
    visual: {
      type: "artifact",
      mediaAssetId: "ly-chua-mot-cot",
      claimId: pagoda,
      linkLabel: "Tìm hiểu Diên Hựu – chùa Một Cột",
    },
    takeaway:
      "Luật pháp và Phật giáo cùng tham gia vào đời sống triều đại; kiến trúc hiện còn đã trải qua nhiều lớp lịch sử.",
  },
  {
    id: "ly-dai-viet",
    periodId: "ly",
    number: "04",
    title: "Đại Việt và không gian phía nam",
    question:
      "Quốc hiệu mới và chiến dịch năm 1069 đánh dấu những thay đổi gì?",
    date: date(1054, 1072, "Thời Lý Thánh Tông · 1054–1072"),
    anchorYear: 1054,
    placeIds: ["thang-long"],
    personIds: ["ly-thanh-tong", "y-lan", "ly-thuong-kiet"],
    eventIds: ["ly-quoc-hieu-1054", "ly-champa-1069"],
    claimIds: [
      early.nameContext,
      early.nameDevelopment,
      early.nameResult,
      early.champaDevelopment,
      early.champaResult,
    ],
    visual: {
      type: "events",
      eventIds: ["ly-quoc-hieu-1054", "ly-champa-1069"],
    },
    takeaway:
      "Quốc hiệu, triều đại và phạm vi quản lý là ba lớp thông tin khác nhau; việc nhượng châu không đủ để dựng một đường biên chính xác.",
  },
  {
    id: "ly-khang-tong",
    periodId: "ly",
    number: "05",
    title: "Từ cuộc tiến công đến phòng tuyến Như Nguyệt",
    question:
      "Vì sao cuộc chiến 1075–1077 gồm cả tiến công, phòng thủ và giảng hòa?",
    date: date(1075, 1078, "1075–1077"),
    anchorYear: 1077,
    placeIds: ["thang-long", "nhu-nguyet"],
    personIds: ["ly-nhan-tong", "ly-thuong-kiet", "y-lan"],
    eventIds: ["ly-khang-tong-1075"],
    claimIds: [
      early.warContext,
      early.warDevelopment,
      early.warResult,
      early.poem,
    ],
    visual: {
      type: "timeline",
      items: [
        { date: "1075", label: "Tiến đánh Ung, Khâm, Liêm" },
        { date: "1076–1077", label: "Phòng thủ ở Như Nguyệt" },
        { date: "1077", label: "Giảng hòa, quân Tống rút" },
      ],
    },
    takeaway:
      "Đọc toàn bộ cuộc chiến giúp thấy mối liên hệ giữa quân sự và ngoại giao; Nam quốc sơn hà có vấn đề tác giả cần phân biệt với truyền thuyết.",
  },
  {
    id: "ly-hoc-van",
    periodId: "ly",
    number: "06",
    title: "Từ Văn Miếu đến khoa thi và Quốc Tử Giám",
    question:
      "Việc học trở thành một con đường vào bộ máy nhà nước như thế nào?",
    date: date(1070, 1077, "1070 · 1075 · 1076"),
    anchorYear: 1076,
    placeIds: ["van-mieu", "thang-long"],
    personIds: ["ly-thanh-tong", "ly-nhan-tong", "le-van-thinh"],
    eventIds: ["ly-van-mieu-1070", "ly-khoa-thi-1075", "ly-quoc-tu-giam-1076"],
    claimIds: [
      early.templeDevelopment,
      early.examDevelopment,
      early.examResult,
      early.academyDevelopment,
      early.academyResult,
    ],
    visual: {
      type: "artifact",
      mediaAssetId: "ly-van-mieu",
      claimId: early.academyResult,
      linkLabel: "Lịch sử Văn Miếu – Quốc Tử Giám",
    },
    takeaway:
      "Dựng Văn Miếu, mở khoa thi và lập Quốc Tử Giám là ba sự kiện khác nhau; công trình nhìn thấy hôm nay có nhiều lớp xây dựng về sau.",
  },
  {
    id: "ly-trieu-chinh",
    periodId: "ly",
    number: "07",
    title: "Vua nhỏ tuổi và những người giữ việc nước",
    question:
      "Vai trò thái hậu và đại thần giúp ta hiểu gì về quyền lực trong triều?",
    date: date(1072, 1127, "Thời Lý Nhân Tông · 1072–1127"),
    anchorYear: 1072,
    placeIds: ["thang-long"],
    personIds: [
      "ly-nhan-tong",
      "y-lan",
      "ly-dao-thanh",
      "ly-thuong-kiet",
      "le-van-thinh",
    ],
    eventIds: ["ly-khoa-thi-1075", "ly-khang-tong-1075"],
    claimIds: [
      early.examContext,
      "bio-ly-nhan-tong-court",
      "bio-y-lan-court",
      "bio-ly-dao-thanh-regency",
      "bio-le-van-thinh-career",
    ],
    visual: { type: "relations", personId: "ly-nhan-tong" },
    takeaway:
      "Quan hệ gia đình, việc phụ chính và sự kế vị phải được đọc thành những loại liên kết riêng.",
  },
  {
    id: "ly-ke-vi",
    periodId: "ly",
    number: "08",
    title: "Chín người giữ ngôi, nhiều cách kế vị",
    question:
      "Vì sao chuỗi vua Lý không thể chỉ đọc như một đường cha truyền con nối?",
    date: date(1009, 1226, "1009–1225/1226"),
    anchorYear: 1127,
    placeIds: ["thang-long", "den-do"],
    personIds: [
      "ly-nhan-tong",
      "sung-hien-hau",
      "ly-than-tong",
      "ly-anh-tong",
      "ly-cao-tong",
      "to-hien-thanh",
    ],
    eventIds: ["ly-ke-vi-1175"],
    claimIds: [
      "ly-bio-than-tong-summary",
      "ly-succession-1175-context",
      "ly-succession-1175-dispute",
      "ly-succession-1175-result",
    ],
    visual: { type: "rulers" },
    takeaway:
      "Nhân Tông nhận Dương Hoán làm con nuôi; Cao Tông được phụ chính bảo vệ ngôi khi còn nhỏ. Kế vị và huyết thống không phải cùng một quan hệ.",
  },
  {
    id: "ly-bien-dong",
    periodId: "ly",
    number: "09",
    title: "Thương cảng và những biến động cuối triều",
    question:
      "Vì sao giao thương phát triển vẫn có thể đi cùng khủng hoảng quyền lực?",
    date: date(1149, 1224, "1149–đầu thế kỷ XIII"),
    anchorYear: 1209,
    placeIds: ["van-don", "thang-long", "hai-ap"],
    personIds: [
      "ly-anh-tong",
      "ly-cao-tong",
      "ly-hue-tong",
      "tran-ly",
      "tran-tu-khanh",
      "tran-thi-dung",
    ],
    eventIds: ["ly-thuong-cang-1149", "ly-quach-boc-1209"],
    claimIds: [
      "ly-van-don-establishment",
      "ly-van-don-traces",
      "ly-quach-boc-context",
      "ly-quach-boc-development",
      "ly-quach-boc-result",
    ],
    visual: {
      type: "events",
      eventIds: ["ly-thuong-cang-1149", "ly-quach-boc-1209"],
    },
    takeaway:
      "Sự phát triển kinh tế không đồng nghĩa quyền lực triều đình luôn ổn định. Biến loạn 1209 làm thay đổi tương quan giữa hoàng tộc Lý và các thế lực địa phương.",
  },
  {
    id: "ly-chuyen-trieu",
    periodId: "ly",
    number: "10",
    title: "Từ Chiêu Hoàng đến cuộc chuyển ngôi",
    question: "Vì sao nữ hoàng cuối nhà Lý nhường ngôi cho Trần Cảnh?",
    date: date(1224, 1226, "1224–1225/1226"),
    anchorYear: 1224,
    placeIds: ["thang-long", "hai-ap"],
    personIds: [
      "ly-hue-tong",
      "ly-chieu-hoang",
      "tran-thi-dung",
      "tran-thu-do",
      "tran-canh",
    ],
    eventIds: ["ly-chieu-hoang-1224", "chuyen-trieu"],
    claimIds: [
      "ly-chieu-hoang-accession-context",
      "ly-chieu-hoang-accession",
      "ly-chieu-hoang-power",
      "transition",
      "date-disagreement",
    ],
    visual: {
      type: "transition",
      from: { personId: "ly-chieu-hoang", label: "Triều Lý" },
      to: { personId: "tran-canh", label: "Triều Trần" },
      label: "nhường ngôi →",
      date: "1225 / 1226",
    },
    takeaway:
      "Cuộc chuyển triều là kết quả của quá trình thay đổi quyền lực trước đó; cùng một nhân vật và sự kiện có thể nối hai thời kỳ.",
  },
];

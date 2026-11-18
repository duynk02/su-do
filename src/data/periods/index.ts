import { date, type Period, type PeriodContent } from "../schema";
import { tranContent } from "./tran";
import { lyContent } from "./ly";
import { hoContent } from "./ho";
import { earlyContent } from "./ngo-dinh-tien-le";

const pendingPeriods: Period[] = [
  {
    id: "co-dai",
    name: "Dựng nước & Bắc thuộc",
    date: date(-699, 939, "Trước thế kỷ X"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary: "Nội dung thời dựng nước và Bắc thuộc đang được biên soạn.",
  },
  {
    id: "minh-lam-son",
    name: "Thời Minh & Lam Sơn",
    date: date(1407, 1428, "Đầu thế kỷ XV"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary: "Nội dung về thời Minh và khởi nghĩa Lam Sơn đang được biên soạn.",
  },
  {
    id: "le-so",
    name: "Lê sơ",
    date: date(1428, 1527, "Thế kỷ XV–đầu XVI"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary: "Nội dung chuyên sâu về nhà Lê sơ đang được biên soạn.",
  },
  {
    id: "le-mac",
    name: "Lê–Mạc · Trịnh–Nguyễn",
    date: date(1527, 1789, "Thế kỷ XVI–XVIII"),
    status: "draft",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    lanesSource: {
      label:
        "Việt Nam sử lược, quyển II, chương Nam–Bắc triều và bảng Trịnh–Nguyễn",
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Viet_Nam_Su_Luoc_2.pdf",
    },
    lanes: [
      { name: "Mạc", date: "1527–1592 tại Thăng Long; tiếp tục ở Cao Bằng" },
      { name: "Lê trung hưng", date: "Đồng thời với Mạc từ thế kỷ XVI" },
      { name: "Trịnh · Đàng Ngoài", date: "Cùng thời với chính quyền Nguyễn" },
      { name: "Nguyễn · Đàng Trong", date: "Cùng thời với chính quyền Trịnh" },
    ],
    summary:
      "Nội dung chi tiết về các chính quyền Lê–Mạc và Trịnh–Nguyễn đang được biên soạn.",
  },
  {
    id: "tay-son",
    name: "Tây Sơn",
    date: date(1771, 1802, "Cuối thế kỷ XVIII"),
    status: "unwritten",
    polityIds: [],
    dynastyIds: [],
    claimIds: [],
    summary: "Nội dung về Tây Sơn đang được biên soạn.",
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

export const periodContents: PeriodContent[] = [
  earlyContent,
  lyContent,
  tranContent,
  hoContent,
];
export const defaultPeriodId = "tran";
export const periods: Period[] = [
  ...pendingPeriods,
  ...periodContents.map((entry) => entry.period),
].sort((a, b) => a.date.start - b.date.start);

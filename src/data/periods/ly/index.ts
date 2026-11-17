import { date, type PeriodContent } from "../../schema";
import { lyEarlyEvents, lyEarlyTenures } from "./early";
import { lyLateEvents, lyLateTenures } from "./late";
import { lyChapters } from "./chapters";
export const lyContent: PeriodContent = {
  period: {
    id: "ly",
    name: "Nhà Lý",
    date: date(1009, 1226, "1009–1225/1226"),
    status: "draft",
    defaultYear: 1009,
    subtitle: "Đại Cồ Việt → Đại Việt",
    polityIds: ["dai-co-viet", "dai-viet"],
    dynastyIds: ["ly-dynasty"],
    claimIds: [
      "ly-foundation-development",
      "ly-capital-development",
      "ly-name-development",
      "ly-war-result",
      "ly-academy-development",
      "transition",
    ],
    summary:
      "Từ việc Lý Công Uẩn lên ngôi năm 1009 và dời đô ra Thăng Long năm 1010, nhà Lý xây dựng một trung tâm chính trị lâu dài ở đồng bằng sông Hồng. Qua chín đời vua, triều đình củng cố luật pháp, đặt quốc hiệu Đại Việt, phát triển giáo dục Nho học song song với Phật giáo, và trải qua chiến tranh lẫn giao thương với các nước trong khu vực. Cuối thế kỷ XII–đầu XIII, tranh chấp cung đình và các thế lực quân sự địa phương làm quyền lực nhà vua suy yếu; cuộc chuyển ngôi từ Lý Chiêu Hoàng sang Trần Cảnh khép lại triều đại.",
    overviewFacts: [
      {
        label: "Quốc hiệu",
        value: "Đại Cồ Việt; Đại Việt từ 1054",
        claimIds: ["ly-name-development"],
      },
      {
        label: "Kinh đô",
        value: "Hoa Lư → Thăng Long (1010)",
        claimIds: ["ly-capital-development"],
      },
      {
        label: "Chuỗi ngôi vua",
        value: "9 người giữ ngôi, từ Thái Tổ đến Chiêu Hoàng",
        claimIds: ["ly-thai-to-reign", "ly-reign-ly-chieu-hoang"],
      },
    ],
    milestones: [
      {
        eventId: "ly-lap-trieu-1009",
        label: "1009",
        title: "Lý Công Uẩn lên ngôi",
      },
      {
        eventId: "ly-doi-do-1010",
        label: "1010",
        title: "Dời đô ra Thăng Long",
      },
      {
        eventId: "ly-quoc-hieu-1054",
        label: "1054",
        title: "Quốc hiệu Đại Việt",
      },
      {
        eventId: "ly-khang-tong-1075",
        label: "1075–1077",
        title: "Kháng chiến chống Tống",
      },
      {
        eventId: "ly-thuong-cang-1149",
        label: "1149",
        title: "Thương cảng Vân Đồn",
      },
      {
        eventId: "ly-quach-boc-1209",
        label: "1209",
        title: "Biến loạn Quách Bốc",
      },
      {
        eventId: "chuyen-trieu",
        label: "1225/26",
        title: "Chuyển ngôi sang nhà Trần",
      },
    ],
  },
  chapters: lyChapters,
  events: [...lyEarlyEvents, ...lyLateEvents],
  tenures: [
    ...lyEarlyTenures,
    ...lyLateTenures,
    {
      id: "ly-retired-sung-hien-hau",
      personId: "sung-hien-hau",
      periodId: "ly",
      dynastyId: "ly-dynasty",
      polityId: "dai-viet",
      role: "retired",
      label: "Thái thượng hoàng (được tôn)",
      date: date(1129, 1130, "1129–1130"),
      claimIds: ["ly-bio-sung-hien-title"],
    },
  ],
};

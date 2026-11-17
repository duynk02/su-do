import { date, type PeriodContent } from "../../schema";
export const hoContent: PeriodContent = {
  period: {
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
  chapters: [],
  events: [],
  tenures: [],
};

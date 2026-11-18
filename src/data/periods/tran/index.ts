import "./claims";
import { date, type PeriodContent } from "../../schema";
import { chapters } from "./chapters";
import { events } from "./events";
import { tenures } from "./tenures";

export const tranContent: PeriodContent = {
  period: {
    id: "tran",
    name: "Nhà Trần",
    date: date(1225, 1400, "1225/1226–1400"),
    status: "draft",
    defaultYear: 1225,
    subtitle: "Đại Việt",
    overviewFacts: [
      { label: "Quốc hiệu", value: "Đại Việt", claimIds: ["transition"] },
      {
        label: "Kinh đô",
        value: "Thăng Long → Tây Đô (cuối triều)",
        claimIds: ["tran-ending"],
      },
    ],
    milestones: [
      {
        eventId: "chuyen-trieu",
        label: "1225/26",
        title: "Hình thành triều Trần",
      },
      { eventId: "khang-chien-1258", label: "1258", title: "Chống Mông Cổ" },
      { eventId: "khang-chien-1285", label: "1285", title: "Chống Nguyên" },
      { eventId: "bach-dang-1288", label: "1288", title: "Bạch Đằng" },
      {
        eventId: "hon-nhan-1306",
        label: "1306",
        title: "Huyền Trân · Chế Mân",
      },
    ],
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
      "Triều Trần hình thành khi thế lực họ Trần đã gia tăng trong triều đình cuối thời Lý. Việc Lý Chiêu Hoàng nhường ngôi cho Trần Cảnh mở ra một cơ chế quyền lực có cả vua và Thái thượng hoàng. Ba cuộc kháng chiến trong thế kỷ XIII là những dấu mốc nổi bật, bên cạnh đời sống nông nghiệp, khoa cử và Phật giáo Trúc Lâm. Cuối thế kỷ XIV, quyền lực chuyển dần sang Hồ Quý Ly; năm 1400 mở đầu triều Hồ.",
  },
  chapters,
  events,
  tenures,
};

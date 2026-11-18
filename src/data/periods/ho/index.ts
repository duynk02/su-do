import { date, type PeriodContent } from "../../schema";
import { hoChapters } from "./chapters";
import { hoReformEvents, hoReformClaimIds as reform } from "./reforms";
import { hoWarEvents, hoTenures } from "./people-war";
import { hoTransitionEvent } from "./transition";
export const hoContent: PeriodContent = {
  period: {
    id: "ho",
    name: "Nhà Hồ",
    date: date(1400, 1407, "1400–1407"),
    status: "draft",
    defaultYear: 1400,
    subtitle: "Đại Ngu · Tây Đô",
    polityIds: ["dai-ngu"],
    dynastyIds: ["ho-dynasty"],
    claimIds: [
      reform.daiNgu,
      reform.overview,
      "ho-royal-succession-1400",
      "ho-war-capture-result",
    ],
    summary:
      "Nhà Hồ được lập năm 1400 với quốc hiệu Đại Ngu, đặt kinh đô tại Tây Đô. Hồ Quý Ly truyền ngôi cho Hồ Hán Thương ngay cuối năm ấy và tiếp tục cùng coi chính sự trên ngôi Thái thượng hoàng. Những cải cách về tiền tệ, ruộng đất, nhân lực và việc học đã bắt đầu từ cuối Trần, rồi được tiếp tục dưới triều mới với kết quả không đồng đều. Cuộc tiến công của nhà Minh năm 1406 và các thất bại quân sự năm 1407 kết thúc sự cai trị của nhà Hồ, nhưng cuộc đời và di sản của nhiều nhân vật còn tiếp tục sau đó.",
    overviewFacts: [
      { label: "Quốc hiệu", value: "Đại Ngu", claimIds: [reform.daiNgu] },
      {
        label: "Kinh đô",
        value: "Tây Đô, Thanh Hóa",
        claimIds: [reform.capitalBuilding],
      },
      {
        label: "Ngôi vua",
        value: "Hồ Quý Ly → Hồ Hán Thương",
        claimIds: ["ho-royal-succession-1400"],
      },
    ],
    milestones: [
      {
        eventId: "nha-ho-1400",
        label: "1400",
        title: "Lập nhà Hồ, quốc hiệu Đại Ngu",
      },
      {
        eventId: "ho-ho-tich-1401",
        label: "1401",
        title: "Hộ tịch và tổ chức nhân lực",
      },
      { eventId: "ho-champa-1402", label: "1402", title: "Chiến dịch Champa" },
      { eventId: "ho-thi-cu-1404", label: "1404", title: "Điều chỉnh thi cử" },
      {
        eventId: "ho-minh-tien-cong-1406",
        label: "1406",
        title: "Quân Minh tiến công",
      },
      {
        eventId: "ho-bat-ho-ho-1407",
        label: "1407",
        title: "Vương triều kết thúc",
      },
    ],
  },
  chapters: hoChapters,
  events: [hoTransitionEvent, ...hoReformEvents, ...hoWarEvents],
  tenures: hoTenures,
};

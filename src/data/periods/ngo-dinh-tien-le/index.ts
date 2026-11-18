import { date, type PeriodContent } from "../../schema";
import { earlyChapters } from "./chapters";
import { ngoDinhClaimIds as ngo, ngoDinhEvents, ngoDinhTenures } from "./ngo-dinh";
import { tienLeClaimIds as le, tienLeEvents, tienLeTenures } from "./tien-le";

export const earlyContent: PeriodContent = {
  period: {
    id: "the-ky-x",
    name: "Ngô · Đinh · Tiền Lê",
    date: date(939, 1010, "939–1009"),
    defaultYear: 939,
    status: "draft",
    subtitle: "Từ Cổ Loa đến Hoa Lư",
    polityIds: ["ngo-polity", "dai-co-viet"],
    dynastyIds: ["ngo-dynasty", "dinh-dynasty", "tien-le-dynasty"],
    claimIds: [ngo.overview, ngo.coronation, ngo.unification, le.accession, le.warResult, le.agriculture, le.diplomacy, le.faith, "ly-foundation-development"],
    summary:
      "Từ chiến thắng Bạch Đằng năm 938, Ngô Quyền tiến tới xưng vương và đóng đô tại Cổ Loa năm 939. Sau những biến động kế vị và thời kỳ phân tranh, Đinh Bộ Lĩnh thống nhất các thế lực, lên ngôi hoàng đế năm 968, đặt quốc hiệu Đại Cồ Việt và định đô Hoa Lư. Lê Hoàn lên ngôi năm 980, chỉ huy cuộc kháng chiến chống Tống năm 981 và tiếp tục củng cố nhà nước. Giai đoạn này còn có ngoại giao, hoạt động nông nghiệp và sự tham gia của giới tăng sĩ vào việc nước. Năm 1009, Lý Công Uẩn lên ngôi tại Hoa Lư, mở đầu triều Lý.",
    overviewFacts: [
      {
        label: "Ba triều đại",
        value: "Ngô · Đinh · Tiền Lê",
        claimIds: [ngo.overview, "ly-foundation-development"],
      },
      {
        label: "Quốc hiệu từ năm 968",
        value: "Đại Cồ Việt",
        claimIds: [ngo.unification],
      },
      {
        label: "Kinh đô",
        value: "Cổ Loa → Hoa Lư",
        claimIds: [ngo.coronation, "early-place-hoa-lu"],
      },
    ],
    milestones: [
      { eventId: "ngo-xung-vuong-939", label: "939", title: "Ngô Quyền xưng vương" },
      { eventId: "ngo-khoi-phuc-950", label: "950–951", title: "Khôi phục quyền lực họ Ngô" },
      { eventId: "dinh-thong-nhat-968", label: "968", title: "Lập nhà Đinh, định đô Hoa Lư" },
      { eventId: "le-len-ngoi-980", label: "980", title: "Lê Hoàn lên ngôi" },
      { eventId: "le-chong-tong-981", label: "981", title: "Kháng chiến chống Tống" },
      { eventId: "ly-lap-trieu-1009", label: "1009", title: "Chuyển ngôi sang nhà Lý" },
    ],
  },
  chapters: earlyChapters,
  // The shared transition of 1009 is registered once in the Ly repository.
  events: [...ngoDinhEvents, ...tienLeEvents],
  tenures: [...ngoDinhTenures, ...tienLeTenures],
};

import { date, type HistoricalEvent } from "../../schema";

// One canonical event is shared by both periods; its ID keeps existing links valid.
export const hoTransitionEvent: HistoricalEvent = {
  id: "nha-ho-1400",
  periodIds: ["tran", "ho"],
  name: "Chuyển từ nhà Trần sang nhà Hồ",
  date: date(1400, 1400, "1400"),
  placeIds: ["tay-do"],
  personIds: ["ho-quy-ly", "tran-thieu-de"],
  contextClaimIds: ["ho-reform-dates"],
  developmentClaimIds: ["tran-ending"],
  resultClaimIds: [],
  consequence:
    "Một chính sách bắt đầu trước năm 1400 nên được đặt trong bối cảnh cuối thời Trần hay chỉ kể trong nhà Hồ?",
  consequenceKind: "editorial-question",
  precisionNote: "",
};

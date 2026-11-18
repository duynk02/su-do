import { date, type Polity, type Dynasty } from "../schema";
import { ngoDinhClaimIds as early } from "../periods/ngo-dinh-tien-le/ngo-dinh";

export const polities: Polity[] = [
  { id: "ngo-polity", name: "Chính quyền thời Ngô", claimIds: [early.coronation] },
  { id: "dai-co-viet", name: "Đại Cồ Việt", claimIds: [early.unification, "ly-name-development"] },
  { id: "dai-viet", name: "Đại Việt", claimIds: ["transition", "tran-ending"] },
  { id: "dai-ngu", name: "Đại Ngu", claimIds: ["tran-ending"] },
];
export const dynasties: Dynasty[] = [
  {
    id: "ngo-dynasty",
    name: "Triều Ngô",
    polityId: "ngo-polity",
    date: date(939, 966, "939–965"),
  },
  {
    id: "dinh-dynasty",
    name: "Triều Đinh",
    polityId: "dai-co-viet",
    date: date(968, 980, "968–980"),
  },
  {
    id: "tien-le-dynasty",
    name: "Triều Tiền Lê",
    polityId: "dai-co-viet",
    date: date(980, 1009, "980–1009"),
  },
  {
    id: "ly-dynasty",
    name: "Triều Lý",
    polityId: "dai-viet",
    date: date(1009, 1226, "1009–1225/1226"),
  },
  {
    id: "tran-dynasty",
    name: "Triều Trần",
    polityId: "dai-viet",
    date: date(1225, 1400, "1225/1226–1400"),
  },
  {
    id: "ho-dynasty",
    name: "Triều Hồ",
    polityId: "dai-ngu",
    date: date(1400, 1407, "1400–1407"),
  },
];

import { date, type Polity, type Dynasty } from "../schema";

export const polities: Polity[] = [
  { id: "dai-co-viet", name: "Đại Cồ Việt", claimIds: ["ly-name-development"] },
  { id: "dai-viet", name: "Đại Việt", claimIds: ["transition", "tran-ending"] },
  { id: "dai-ngu", name: "Đại Ngu", claimIds: ["tran-ending"] },
];
export const dynasties: Dynasty[] = [
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

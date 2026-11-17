import { date, type TerritorySnapshot } from "../schema";

export const territorySnapshots: TerritorySnapshot[] = [
  {
    id: "tran-territory-unavailable",
    polityId: "dai-viet",
    date: date(1225, 1400, "1225/1226–1400"),
    geometry: null,
    representation: "unavailable",
    sourceIds: [],
    method:
      "Không số hóa vì chưa có atlas/bộ dữ liệu có nguồn và quyền sử dụng phù hợp",
    uncertainty: "Chưa có lớp ranh giới được đối chiếu cho mốc này.",
    license: null,
    status: "unwritten",
  },
];

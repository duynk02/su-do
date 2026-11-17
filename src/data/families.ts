import { date, type Person, type Relationship } from "./schema";

export const familyPeople: Person[] = [
  {
    id: "huy-ninh",
    name: "Huy Ninh",
    aliases: ["Công chúa Huy Ninh"],
    title: "Công chúa triều Trần",
    summaryClaimIds: [],
    eventIds: ["nha-ho-1400"],
    contextYear: 1371,
  },
  {
    id: "kham-thanh",
    name: "Khâm Thánh",
    aliases: ["Khâm Thánh hoàng hậu", "Thánh Ngâu", "Thánh Ngẫu"],
    title: "Hoàng hậu của Trần Thuận Tông",
    summaryClaimIds: [],
    eventIds: ["thieu-de-len-ngoi", "nha-ho-1400"],
    contextYear: 1389,
  },
  {
    id: "tran-lieu",
    name: "Trần Liễu",
    aliases: ["An Sinh vương", "Yên Sinh vương"],
    title: "An Sinh vương · cha Trần Quốc Tuấn",
    summaryClaimIds: [],
    eventIds: ["hon-nhan-1237"],
    contextYear: 1237,
  },
  {
    id: "thuan-thien",
    name: "Thuận Thiên",
    aliases: ["Thuận Thiên hoàng hậu", "Lý Thuận Thiên", "Hiển Từ Thuận Thiên"],
    title: "Hoàng hậu · mẹ Trần Thánh Tông",
    summaryClaimIds: [],
    eventIds: ["hon-nhan-1237"],
    contextYear: 1237,
  },
  {
    id: "bao-thanh",
    name: "Bảo Thánh",
    aliases: ["Bảo Thánh hoàng hậu", "Khâm Từ Bảo Thánh"],
    title: "Hoàng hậu · mẹ Trần Anh Tông",
    summaryClaimIds: [],
    eventIds: [],
    contextYear: 1274,
  },
];

const link = (
  from: string,
  to: string,
  type: Relationship["type"],
  label: string,
  claimIds: string[],
  details: Partial<Relationship> = {},
): Relationship => ({
  id: `family-${from}-${to}-${type}`,
  from,
  to,
  type,
  label,
  claimIds,
  status: "draft",
  ...details,
});

export const familyRelationships: Relationship[] = [
  link("tran-minh-tong", "huy-ninh", "parent", "Cha – con", ["bio-huy-ninh"]),
  link(
    "ho-quy-ly",
    "huy-ninh",
    "marriage",
    "Hôn nhân · 1371",
    ["bio-huy-ninh"],
    {
      date: date(1371, 1371, "Kết hôn năm 1371"),
      note: "Mốc kết hôn, không phải toàn bộ thời gian hôn nhân.",
    },
  ),
  link("ho-quy-ly", "kham-thanh", "parent", "Cha – con", ["bio-kham-thanh"]),
  link("huy-ninh", "kham-thanh", "parent", "Mẹ – con", ["bio-kham-thanh"]),
  link(
    "tran-thuan-tong",
    "kham-thanh",
    "marriage",
    "Hoàng hậu · 1389",
    ["bio-kham-thanh"],
    {
      date: date(1389, 1389, "Được lập làm hoàng hậu năm 1389"),
      note: "Ghi năm lập hoàng hậu; không suy ra ngày bắt đầu hôn nhân.",
    },
  ),
  link("kham-thanh", "tran-thieu-de", "parent", "Mẹ – con", [
    "bio-tran-thieu-de-section-1-1",
  ]),
  link("tran-nghe-tong", "ho-quy-ly", "political", "Cất nhắc · 1371", [
    "bio-ho-quy-ly-section-1-1",
  ]),
  link("ho-quy-ly", "tran-thuan-tong", "political", "Ép nhường ngôi", [
    "bio-tran-thuan-tong-section-1-1",
  ]),
  link("ho-quy-ly", "tran-thieu-de", "political", "Nhiếp chính", [
    "bio-tran-thieu-de-section-2-1",
  ]),
  link(
    "tran-thieu-de",
    "ho-quy-ly",
    "succession",
    "Chuyển triều · 1400",
    ["bio-tran-thieu-de-section-3-1"],
    { date: date(1400, 1400, "1400") },
  ),
  link("tran-thua", "tran-lieu", "parent", "Cha – con", ["bio-tran-lieu"]),
  link("tran-lieu", "tran-quoc-tuan", "parent", "Cha – con", [
    "bio-tran-quoc-tuan",
  ]),
  link("tran-quoc-tuan", "bao-thanh", "parent", "Cha – con", ["bio-bao-thanh"]),
  link(
    "tran-nhan-tong",
    "bao-thanh",
    "marriage",
    "Hôn nhân · 1274",
    ["bio-bao-thanh"],
    {
      date: date(1274, 1274, "Kết hôn khi Trần Khâm còn là thái tử, năm 1274"),
    },
  ),
  link("bao-thanh", "tran-anh-tong", "parent", "Mẹ – con", ["bio-bao-thanh"]),
  link("tran-thi-dung", "thuan-thien", "parent", "Mẹ – con", [
    "bio-thuan-thien",
  ]),
  link("thuan-thien", "tran-thanh-tong", "parent", "Mẹ – con", [
    "bio-thuan-thien",
  ]),
  link(
    "tran-lieu",
    "thuan-thien",
    "marriage",
    "Hôn nhân trước 1237",
    ["bio-thuan-thien"],
    {
      date: date(1237, 1237, "Hôn nhân kết thúc năm 1237"),
      note: "Không xác định năm kết hôn trong nguồn đang dẫn.",
    },
  ),
  link(
    "thuan-thien",
    "tran-canh",
    "marriage",
    "Hôn nhân từ 1237",
    ["bio-thuan-thien"],
    { date: date(1237, 1237, "Trở thành hoàng hậu của Thái Tông năm 1237") },
  ),
];

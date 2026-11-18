import { date, type Person } from "../schema";
import { claim, type Ref } from "../claim-store";
import { biographies } from "../biographies";
import { familyPeople } from "../families";
import { lyPeople } from "./ly-people";
import { lySharedPersonUpdates } from "./ly-late-people";
import { hoPeople, hoSharedPersonUpdates } from "./ho-people";

export const rulerRows: [string, string, string, number, number, string?][] = [
  ["tran-canh", "Trần Thái Tông", "Trần Cảnh", 1225, 1258, "1225/1226–1258"],
  ["tran-thanh-tong", "Trần Thánh Tông", "Trần Hoảng", 1258, 1278],
  ["tran-nhan-tong", "Trần Nhân Tông", "Trần Khâm", 1278, 1293],
  ["tran-anh-tong", "Trần Anh Tông", "Trần Thuyên", 1293, 1314],
  ["tran-minh-tong", "Trần Minh Tông", "Trần Mạnh", 1314, 1329],
  ["tran-hien-tong", "Trần Hiến Tông", "Trần Vượng", 1329, 1341],
  ["tran-du-tong", "Trần Dụ Tông", "Trần Hạo", 1341, 1369],
  ["duong-nhat-le", "Dương Nhật Lễ", "Dương Nhật Lễ", 1369, 1370],
  ["tran-nghe-tong", "Trần Nghệ Tông", "Trần Phủ", 1370, 1372],
  ["tran-due-tong", "Trần Duệ Tông", "Trần Kính", 1372, 1377],
  ["tran-phe-de", "Trần Phế Đế", "Trần Hiện", 1377, 1388],
  ["tran-thuan-tong", "Trần Thuận Tông", "Trần Nhung", 1388, 1398],
  ["tran-thieu-de", "Trần Thiếu Đế", "Trần An", 1398, 1400],
];
export const people: Person[] = rulerRows.map(
  ([id, name, personalName, start, end, label]) => {
    const refs: Ref[] = [
      ["the-thu", `Phần II – Thế thứ các vua thời Trần, mục ${name}`],
    ];
    if (id === "tran-nhan-tong")
      refs.push([
        "nhan-tong-heritage",
        "Đoạn giới thiệu niên đại trị vì 1278–1293",
      ]);
    if (id === "tran-phe-de")
      refs.push([
        "toan-thu-phe-de",
        "Quyển VIII, tờ 1a, tên húy Hiện",
        "Hỗ trợ tên húy, không thay thế nguồn nhiệm kỳ",
      ]);
    const cid =
      id === "duong-nhat-le"
        ? "nhat-le-reign"
        : claim(
            `reign-${id}`,
            `${name} (${personalName}): ở ngôi ${label ?? `${start}–${end}`}.`,
            refs,
            id === "tran-nhan-tong"
              ? {
                  note: "Bài biên niên scov.gov.vn ghi 1279, trong khi Thế thứ và Trung tâm Bảo tồn Di sản Thăng Long ghi 1278.",
                }
              : {},
          );
    const variants: Record<string, string[]> = {
      "tran-phe-de": ["Trần Hiệu"],
      "tran-thuan-tong": ["Trần Ngung"],
      "tran-thieu-de": ["Trần Án"],
    };
    return {
      id,
      periodIds: ["tran"],
      name: id === "tran-canh" ? "Trần Cảnh" : name,
      aliases: [name, personalName, ...(variants[id] ?? [])],
      personalName,
      templeName:
        id === "duong-nhat-le" ||
        id.includes("phe-de") ||
        id.includes("thieu-de")
          ? undefined
          : name.replace("Trần ", ""),
      summaryClaimIds: [cid],
      eventIds:
        id === "tran-canh"
          ? ["chuyen-trieu", "khang-chien-1258"]
          : id === "tran-nhan-tong" || id === "tran-thanh-tong"
            ? ["khang-chien-1285", "bach-dang-1288"]
            : [],
      note:
        id === "duong-nhat-le"
          ? "Tên thường dùng trong sử liệu."
          : variants[id]
            ? "Tên húy theo Thế thứ; bài biên niên có cách ghi khác."
            : undefined,
    };
  },
);
people.push(
  {
    id: "tran-thua",
    periodIds: ["ly", "tran"],
    name: "Trần Thừa",
    aliases: ["Trần Thái Tổ", "Huy Tông"],
    templeName: "Thái Tổ (truy tôn)",
    title: "Thái thượng hoàng",
    summaryClaimIds: ["thua-role", "thua-dates"],
    eventIds: ["chuyen-trieu"],
  },
  {
    id: "ly-chieu-hoang",
    periodIds: ["ly", "tran"],
    name: "Lý Chiêu Hoàng",
    aliases: ["Chiêu Thánh"],
    title: "Vua cuối triều Lý",
    summaryClaimIds: ["chieu-hoang", "transition"],
    eventIds: ["chuyen-trieu"],
  },
  {
    id: "tran-thu-do",
    periodIds: ["ly", "tran"],
    name: "Trần Thủ Độ",
    aliases: [],
    title: "Người tổ chức chuyển giao quyền lực",
    summaryClaimIds: ["thu-do"],
    eventIds: ["chuyen-trieu"],
  },
  {
    id: "tran-thi-dung",
    periodIds: ["ly", "tran"],
    name: "Trần Thị Dung",
    aliases: ["Linh Từ quốc mẫu"],
    title: "Thái hậu cuối triều Lý",
    summaryClaimIds: ["chieu-hoang", "family", "transition"],
    eventIds: ["chuyen-trieu"],
  },
  {
    id: "tran-ly",
    periodIds: ["ly", "tran"],
    name: "Trần Lý",
    aliases: [],
    title: "Hào trưởng vùng Hải Ấp",
    summaryClaimIds: ["tran-origins", "family"],
    eventIds: [],
  },
  {
    id: "tran-tu-khanh",
    periodIds: ["ly", "tran"],
    name: "Trần Tự Khánh",
    aliases: [],
    title: "Nhân vật cuối triều Lý",
    summaryClaimIds: ["late-ly", "family"],
    eventIds: [],
  },
  {
    id: "tran-quoc-tuan",
    periodIds: ["tran"],
    name: "Trần Quốc Tuấn",
    aliases: ["Trần Hưng Đạo", "Hưng Đạo đại vương"],
    title: "Người chỉ huy quân sự",
    summaryClaimIds: ["war-1288"],
    eventIds: ["khang-chien-1285", "bach-dang-1288"],
  },
  {
    id: "huyen-tran",
    periodIds: ["tran"],
    name: "Huyền Trân",
    aliases: ["Công chúa Huyền Trân"],
    title: "Công chúa triều Trần",
    summaryClaimIds: ["huyen-marriage"],
    eventIds: ["hon-nhan-1306"],
  },
  {
    id: "che-man",
    periodIds: ["tran"],
    name: "Chế Mân",
    aliases: [],
    title: "Vua Champa",
    summaryClaimIds: ["huyen-marriage"],
    eventIds: ["hon-nhan-1306"],
  },
  {
    id: "ho-quy-ly",
    periodIds: ["tran", "ho"],
    name: "Hồ Quý Ly",
    contextYear: 1400,
    aliases: ["Lê Quý Ly"],
    title: "Người nắm quyền cuối thời Trần, lập nhà Hồ",
    summaryClaimIds: ["ho-reform-dates", "tran-ending"],
    eventIds: ["nha-ho-1400"],
  },
);
people.push(...familyPeople);
for (const [personId, biography] of Object.entries(biographies)) {
  const person = people.find((p) => p.id === personId);
  if (!person) throw new Error(`Biography has no person: ${personId}`);
  const summaryId = `bio-${personId}`;
  claim(summaryId, biography.summary.text, biography.summary.refs, {
    kind: biography.summary.kind ?? "evidence",
    note: biography.summary.note,
  });
  person.summaryClaimIds = [summaryId];
  person.title = biography.title ?? person.title;
  person.life = biography.life ?? person.life;
  person.eraNames = biography.eraNames ?? person.eraNames;
  person.aliases = [
    ...new Set([...person.aliases, ...(biography.aliases ?? [])]),
  ];
  person.eventIds = biography.eventIds ?? person.eventIds;
  person.biographySections =
    biography.sections?.map((section, index) => ({
      title: section.title,
      claimIds: section.claims.map((entry, entryIndex) =>
        claim(
          `${summaryId}-section-${index + 1}-${entryIndex + 1}`,
          entry.text,
          entry.refs,
          {
            kind: entry.kind ?? "evidence",
            note: entry.note,
          },
        ),
      ),
    })) ?? [];
  if (biography.relatedClaimIds?.length)
    person.biographySections.push({
      title: "Hoạt động và dấu mốc",
      claimIds: biography.relatedClaimIds,
    });
  if (personId === "duong-nhat-le") person.note = undefined;
}

people.find((person) => person.id === "tran-canh")!.periodIds = ["ly", "tran"];
people.push(...lyPeople, ...hoPeople);
for (const update of [...lySharedPersonUpdates, ...hoSharedPersonUpdates]) {
  const person = people.find((entry) => entry.id === update.personId);
  if (!person)
    throw new Error(`Shared profile has no person: ${update.personId}`);
  const { personId: _, biographySections, eventIds, ...fields } = update;
  Object.assign(person, fields);
  person.biographySections = [
    ...(person.biographySections ?? []),
    ...(biographySections ?? []),
  ];
  person.eventIds = [...new Set([...person.eventIds, ...(eventIds ?? [])])];
}
people.find((person) => person.id === "thuan-thien")!.periodIds = [
  "ly",
  "tran",
];
for (const id of ["huy-ninh", "kham-thanh", "tran-thieu-de"]) {
  const person = people.find((entry) => entry.id === id)!;
  person.periodIds = [...new Set([...person.periodIds, "ho"])];
}

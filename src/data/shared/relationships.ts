import { date, type Relationship } from "../schema";
import { familyRelationships } from "../families";
import { rulerRows } from "./people";
import { lyEarlyRelationships, lyEarlyTenures } from "../periods/ly/early";
import { lyLateRelationships, lyLateTenures } from "../periods/ly/late";

export const relationships: Relationship[] = [
  ...lyEarlyRelationships,
  ...lyLateRelationships,
  ...familyRelationships,
  ...["tran-thua", "tran-tu-khanh", "tran-thi-dung"].map((to) => ({
    id: `rel-ly-${to}`,
    from: "tran-ly",
    to,
    type: "parent" as const,
    label: "Cha – con",
    claimIds: ["family"],
    status: "cross-referenced" as const,
  })),
  {
    id: "rel-thua-canh",
    from: "tran-thua",
    to: "tran-canh",
    type: "parent",
    label: "Cha – con",
    claimIds: ["family"],
    status: "cross-referenced",
  },
  {
    id: "rel-dung-chieu",
    from: "tran-thi-dung",
    to: "ly-chieu-hoang",
    type: "parent",
    label: "Mẹ – con",
    claimIds: ["chieu-hoang"],
    status: "draft",
  },
  {
    id: "rel-chieu-canh",
    from: "ly-chieu-hoang",
    to: "tran-canh",
    type: "marriage",
    label: "Hôn nhân",
    date: date(1225, 1226, "Gắn với chuyển ngôi 1225/1226"),
    claimIds: ["transition"],
    status: "cross-referenced",
    note: "Khoảng thời gian của ngữ cảnh đang thể hiện, không phải toàn bộ thời gian hôn nhân.",
  },
  {
    id: "rel-chieu-canh-succession",
    from: "ly-chieu-hoang",
    to: "tran-canh",
    type: "succession",
    label: "Nhường ngôi",
    date: date(1225, 1226, "1225/1226"),
    claimIds: ["transition"],
    status: "cross-referenced",
  },
  {
    id: "rel-thudo-canh",
    from: "tran-thu-do",
    to: "tran-canh",
    type: "political",
    label: "Tổ chức chuyển ngôi",
    claimIds: ["thu-do"],
    status: "draft",
  },
  {
    id: "rel-huyen-cheman",
    from: "huyen-tran",
    to: "che-man",
    type: "marriage",
    label: "Hôn nhân · 1306",
    date: date(1306, 1306, "1306"),
    claimIds: ["huyen-marriage"],
    status: "draft",
  },
  ...[
    ["tran-canh", "tran-thanh-tong"],
    ["tran-thanh-tong", "tran-nhan-tong"],
    ["tran-nhan-tong", "tran-anh-tong"],
    ["tran-nhan-tong", "huyen-tran"],
    ["tran-anh-tong", "tran-minh-tong"],
    ["tran-minh-tong", "tran-hien-tong"],
    ["tran-minh-tong", "tran-du-tong"],
    ["tran-minh-tong", "tran-nghe-tong"],
    ["tran-minh-tong", "tran-due-tong"],
    ["tran-due-tong", "tran-phe-de"],
    ["tran-nghe-tong", "tran-thuan-tong"],
    ["tran-thuan-tong", "tran-thieu-de"],
  ].map(([from, to]) => ({
    id: `parent-${from}-${to}`,
    from,
    to,
    type: "parent" as const,
    label: "Cha – con",
    claimIds: [
      to === "tran-nhan-tong" ? "bio-tran-nhan-tong-section-1-1" : `bio-${to}`,
    ],
    status: "draft" as const,
  })),
  ...rulerRows.slice(0, -1).map((row, i) => ({
    id: `succession-${i}`,
    from: row[0],
    to: rulerRows[i + 1][0],
    type: "succession" as const,
    label: "Kế vị",
    claimIds: [
      row[0] === "duong-nhat-le" || rulerRows[i + 1][0] === "duong-nhat-le"
        ? "nhat-le-reign"
        : `reign-${rulerRows[i + 1][0]}`,
    ],
    status: "draft" as const,
  })),
];

const lyRulers = [...lyEarlyTenures, ...lyLateTenures];
for (let index = 1; index < lyRulers.length; index++) {
  const from = lyRulers[index - 1],
    to = lyRulers[index];
  if (
    !relationships.some(
      (edge) =>
        edge.type === "succession" &&
        edge.from === from.personId &&
        edge.to === to.personId,
    )
  )
    relationships.push({
      id: `ly-succession-${to.personId}`,
      from: from.personId,
      to: to.personId,
      type: "succession",
      label: "Kế vị",
      claimIds: to.claimIds,
      status: "draft",
      date: to.date,
    });
}

import { date, type RoleTenure } from "../../schema";
import { claim } from "../../claim-store";
import { rulerRows } from "../../shared/people";

export const tenures: RoleTenure[] = rulerRows.map(
  ([id, name, , start, end, label]) => ({
    id: `role-${id}`,
    personId: id,
    periodId: "tran",
    dynastyId: "tran-dynasty",
    polityId: "dai-viet",
    emphasis: id === "duong-nhat-le",
    role: "reigning",
    label: `Hoàng đế · ${name}`,
    date: date(start, end, label ?? `${start}–${end}`),
    claimIds: [id === "duong-nhat-le" ? "nhat-le-reign" : `reign-${id}`],
  }),
);
tenures.push(
  {
    id: "retired-thua",
    periodId: "tran",
    dynastyId: "tran-dynasty",
    polityId: "dai-viet",
    personId: "tran-thua",
    role: "retired",
    label: "Thái thượng hoàng",
    date: date(1226, 1234, "1226–1234"),
    claimIds: ["thua-dates"],
  },
  {
    id: "retired-thai-tong",
    periodId: "tran",
    dynastyId: "tran-dynasty",
    polityId: "dai-viet",
    personId: "tran-canh",
    role: "retired",
    label: "Thái thượng hoàng",
    date: date(1258, 1277, "1258–1277"),
    claimIds: [
      claim(
        "retired-thai-tong",
        "Trần Thái Tông nhường ngôi năm 1258 và làm Thượng hoàng đến khi mất năm 1277.",
        [
          [
            "tran-chronology",
            "Mục 1 và mục 2, các đoạn nhường ngôi và năm mất",
          ],
        ],
      ),
    ],
  },
  {
    id: "retired-thanh-tong",
    periodId: "tran",
    dynastyId: "tran-dynasty",
    polityId: "dai-viet",
    personId: "tran-thanh-tong",
    role: "retired",
    label: "Thái thượng hoàng",
    date: date(1278, 1290, "1278–1290"),
    claimIds: [
      claim(
        "retired-thanh-tong",
        "Trần Thánh Tông nhường ngôi năm 1278; làm Thượng hoàng và mất năm 1290.",
        [["tran-chronology", "Mục 2. Trần Thánh Tông"]],
      ),
    ],
  },
  {
    id: "retired-nhan-tong",
    periodId: "tran",
    dynastyId: "tran-dynasty",
    polityId: "dai-viet",
    personId: "tran-nhan-tong",
    role: "retired",
    label: "Thái thượng hoàng",
    date: date(1293, 1308, "1293–1308"),
    claimIds: [
      claim(
        "retired-nhan-tong",
        "Trần Nhân Tông nhường ngôi năm 1293 và mang tôn hiệu Thái thượng hoàng. Việt Nam sử lược vẫn gọi ông là Nhân Tông Thượng hoàng khi ghi việc ông mất năm 1308, dù ông đã xuất gia tu hành trước đó.",
        [
          [
            "the-thu",
            "Chương 5, mục Trần Nhân Tông: nhường ngôi năm 1293, xuất gia năm 1299",
          ],
          [
            "vietnam-su-luoc-tran",
            "Trang in 168, đoạn Nhân Tông Thượng hoàng mất năm Mậu Thân 1308",
          ],
        ],
        {
          note: "Thế thứ tính giai đoạn Thượng hoàng trước khi xuất gia là 1293–1299; Việt Nam sử lược còn dùng tôn hiệu Thượng hoàng khi ghi năm mất 1308. Khoảng 1293–1308 ở đây là thời gian mang tôn hiệu, không khẳng định ông trực tiếp điều hành triều chính suốt khoảng đó.",
        },
      ),
    ],
  },
);

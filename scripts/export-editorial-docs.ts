import { writeFileSync } from "node:fs";
import {
  citations,
  claims,
  sources,
  people,
  mediaAssets,
  tenures,
  periods,
  events,
  chapters,
} from "../src/data/history";
import { statusLabels } from "../src/data/schema";
const illustrated = people.filter((person) => person.mediaAssetId);
const rulers = tenures.filter((tenure) => tenure.role === "reigning");

const registry = [
  "# Danh mục nguồn đã đọc",
  "",
  "Tạo từ `src/data/sources.ts` bằng `npx tsx scripts/export-editorial-docs.ts`. Không đồng nghĩa mọi bài là nghiên cứu gốc hoặc đã được chuyên gia duyệt. Trường không xác nhận được giữ trống/null thay vì suy đoán.",
  "",
  ...sources.flatMap((s) => [
    `## ${s.id} — ${s.title}`,
    "",
    `- URL: [mở nguồn](${s.url})`,
    `- Tác giả: ${s.author ?? "chưa xác nhận"}. Cơ quan/nhà xuất bản: ${s.publisher}.`,
    `- Năm: ${s.year ?? "chưa xác nhận / không áp dụng"}. Ấn bản: ${s.edition ?? "chưa xác nhận / không áp dụng"}.`,
    `- Loại: ${s.type}. Truy cập: ${s.accessed}.`,
    `- Vị trí thực sự đọc: ${s.readLocation}.`,
    `- Nguồn bài đăng lại: ${s.upstream ?? "không xác định là bài đăng lại"}.`,
    `- Giới hạn: ${s.limits}`,
    "",
  ]),
  "## Nguồn chưa tiếp cận đầy đủ",
  "",
  "Bản PDF Thơ văn Lý–Trần, tập 1 tại tailieuphathoc.com vượt giới hạn tải của công cụ; không dùng snippet tìm kiếm để xuất bản phép đổi ngày. Trang niên biểu Đà Nẵng trả 403; không dùng làm căn cứ. Chưa có atlas lịch sử được cấp quyền để dựng ranh giới. Các tài liệu này không được đánh dấu là nguồn đã đọc.",
  "",
];
writeFileSync("SOURCE_REGISTER.md", registry.join("\n"));
const audit = [
  "# Kiểm toán nội dung",
  "",
  "Bản đầu có dẫn nguồn, chưa có người biên tập chuyên môn duyệt. Bảng dưới là các khẳng định đang xuất bản trong bản local; `cross-referenced` chỉ là đã so sánh nguồn, không khẳng định độc lập hoặc đồng thuận của mọi nguồn.",
  "",
  "## Dị biệt và quyết định biên tập",
  "",
  "- Chuyển Lý–Trần: giữ mốc 1225/1226; ngày 11 tháng Chạp và 21 tháng 10 trong hai bài được lưu riêng. Chưa tự chuyển lịch.",
  "- Nhà Lý: dùng 1009 cho năm Công Uẩn lên ngôi, 1010 cho niên hiệu và dời đô; 1054 cho quốc hiệu Đại Việt. Văn Miếu 1070, khoa thi 1075 và Quốc Tử Giám 1076 là ba mốc riêng theo hồ sơ di tích.",
  "- Nhân Tông–Thần Tông: giữ năm Đinh Mùi 1127 theo quy ước nguồn Việt; niên hiệu Thiên Thuận từ 1128. Dương Hoán là con Sùng Hiền hầu, được Nhân Tông nhận nuôi, không vẽ thành cha đẻ–con. Cao Tông đăng cơ 1175, Trinh Phù từ 1176; Huệ Tông đăng cơ 1210, Kiến Gia từ 1211.",
  "- Tô Hiến Thành: không gán năm sinh 1102 hoặc đỗ khoa 1138 khi nghiên cứu Hán Nôm còn lưu ý giới hạn chứng cứ. Đỗ Anh Vũ được trình bày qua vai trò và sự kiện sử chép, không lặp nhãn đạo đức của sử quan.",
  "- Nam quốc sơn hà: không khẳng định Lý Thường Kiệt là tác giả; giữ dị bản, tác giả chưa xác định và phân biệt chuyện thần đọc thơ với diễn biến chiến tranh. Gia thế Lý Công Uẩn, chuyện thác sinh của Thần Tông và vụ hóa hổ Lê Văn Thịnh không được dùng làm dữ kiện siêu nhiên đã chứng minh.",
  "- Trần Thừa: tách vai trò Thượng hoàng và miếu hiệu truy tôn khỏi trị vì. Thứ tự anh/em với Trần Tự Khánh khác nguồn; không dựng thứ bậc.",
  "- Nhân Tông: dùng 1278 theo Thế thứ và Trung tâm Bảo tồn Di sản Thăng Long; bài biên niên ghi 1279. Không tự giải thích dị biệt bằng lịch khi chưa khảo cứu.",
  "- Nhân Tông: Thế thứ ghi thời gian Thượng hoàng trước xuất gia 1293–1299, trong khi Việt Nam sử lược còn gọi Nhân Tông Thượng hoàng lúc mất năm 1308. Vai trò 1293–1308 là thời gian mang tôn hiệu; không đồng nhất với trực tiếp điều hành chính sự. Ngày mất 1/11 trong bài di sản khác 3/11 trong Thế thứ; hồ sơ chỉ ghi năm 1308.",
  "- Dương Nhật Lễ: tách việc thực sự giữ ngôi 1369–1370 khỏi huyết thống. Xuất thân và bạo lực cung đình được trình bày là ghi chép sử liệu được dẫn lại; không dùng lời miệt thị nghề diễn xướng hoặc suy đoán động cơ. Chưa xác định năm sinh.",
  "- Tên húy: dùng Hiện, Nhung, An theo Thế thứ; lưu Hiệu, Ngung, Án từ bài biên niên như biến thể tìm kiếm. Tên Hiện được kiểm tra ở bản số hóa Toàn thư, quyển VIII, tờ 1a.",
  "- Dương Nhật Lễ: giữ trong chuỗi ngôi vua, không suy ra huyết thống và không lặp phán xét đạo đức của sử quan.",
  "- Bạch Đằng: hai bài đăng năm 2013 và 2019 khác nhận định về cọc ngang dòng chính; chưa có báo cáo khai quật gốc, nên không dựng chiến thuật hoặc hình học.",
  "- Không dùng nguồn Hồ có đoạn nói Thiếu Đế bị giết để viết chi tiết này; giữ phạm vi chuyển ngôi có căn cứ.",
  "- Thiếu Đế: Khâm Thánh là mẹ, Hồ Quý Ly/Huy Ninh là ông bà ngoại; Huy Ninh là con Minh Tông, em Nghệ Tông. Dẫn Cương mục và Toàn thư về nhiếp chính 1398, phế ngôi 1400, được tha chết vì là cháu ngoại; chưa xác định năm mất.",
  "- Khâm Thánh: bản dịch Toàn thư ghi Thánh Ngâu, phiên âm ghi Thánh Ngẫu; dùng tôn hiệu để gọi hồ sơ và giữ cả hai biến thể để tìm kiếm. Việc lập hoàng hậu năm 1389 không tự xác lập ngày cưới.",
  "- Thuận Thiên: hai cuộc hôn nhân thuộc giai đoạn khác nhau; không gán Quốc Tuấn là con Thuận Thiên hoặc Thánh Tông là con Trần Liễu. Bảo Thánh nối nhánh Quốc Tuấn với Anh Tông qua quan hệ mẹ–con đã đối chiếu.",
  "",
  "## Khẳng định và vị trí dẫn",
  "",
  ...claims.flatMap((c) => [
    `### ${c.id}`,
    "",
    c.text,
    "",
    `Loại: ${c.kind}. Trạng thái: ${statusLabels[c.status]}. ${c.note ?? ""}`,
    "",
    ...citations
      .filter((ref) => ref.claimId === c.id)
      .map((ref) => {
        const s = sources.find((s) => s.id === ref.sourceId)!;
        return `- [${s.title}](${s.url}) — ${ref.location}. Phạm vi: ${ref.supports}`;
      }),
    "",
  ]),
  "## Còn thiếu",
  "",
  "- Đối chiếu bản in và thông tin thư mục của các trích đoạn sách/Toàn thư; xác định nguồn phụ thuộc chung.",
  "- Nghiên cứu sâu đê điều, văn học, kiến trúc, đời sống dân thường, quan hệ khu vực; hiện chỉ tóm lược phần có căn cứ.",
  "- Bổ sung các vai trò Thượng hoàng, niên hiệu và tuổi thọ bằng nguồn cụ thể; không tự lấy từ trí nhớ.",
  "- Lý có mười chương bản đầu, Trần giữ chín chương. Các thời kỳ ngoài hai bộ này chủ yếu có khung điều hướng hoặc phần nối chuyển triều; không công bố tất cả triều đại đã hoàn chỉnh.",
  "- Geometry lịch sử, tuyến hành quân và định vị Hải Ấp/Đông Bộ Đầu/Bạch Đằng chưa đủ căn cứ.",
  "",
  "Kiểm tra tự động không chứng minh lịch sử đúng; người biên tập phải rà từng liên kết hỗ trợ thực tế.",
  "",
];
writeFileSync(
  "CONTENT_AUDIT.md",
  audit.map((line) => line.trimEnd()).join("\n"),
);

console.log(
  JSON.stringify(
    {
      people: people.length,
      illustrated: illustrated.length,
      periods: periods
        .filter((period) =>
          chapters.some((chapter) => chapter.periodId === period.id),
        )
        .map((period) => ({
          id: period.id,
          chapters: chapters.filter((chapter) => chapter.periodId === period.id)
            .length,
          people: people.filter((person) =>
            person.periodIds.includes(period.id),
          ).length,
          events: events.filter((event) => event.periodIds.includes(period.id))
            .length,
          rulers: rulers.filter((tenure) => tenure.periodId === period.id)
            .length,
        })),
      claims: claims.length,
      citations: citations.length,
      sources: sources.length,
    },
    null,
    2,
  ),
);
console.log(
  `Exported register: ${sources.length} sources; audit: ${claims.length} claims.`,
);
const kindLabels: Record<string, string> = {
  painting: "Tranh minh họa",
  "statue-photo": "Ảnh tượng thờ",
  "heritage-photo": "Ảnh di tích",
  reconstruction: "Minh họa tái dựng",
};
writeFileSync(
  "IMAGE_COVERAGE.md",
  [
    "# Hình minh họa nhân vật",
    "",
    `${illustrated.length}/${people.length} hồ sơ có hình; ${rulers.filter((ruler) => people.find((person) => person.id === ruler.personId)?.mediaAssetId).length}/${rulers.length} người giữ ngôi trong các bộ Lý–Trần có hình.`,
    "",
    "Hình đã chọn thể hiện nhân vật hoặc được bài nguồn dùng để minh họa nhân vật; nhãn tranh/tượng được giữ trong hồ sơ. Không dùng làm bằng chứng về diện mạo. Ảnh lưu cục bộ, thông tin tra cứu tại public/images/people/provenance.json và public/images/people/ly/provenance.json.",
    "",
    "| Nhân vật | Loại hình | Tệp ảnh |",
    "|---|---|---|",
    ...people.map((person) => {
      const asset = mediaAssets.find(
        (entry) => entry.id === person.mediaAssetId,
      );
      return asset
        ? `| ${person.name} | ${kindLabels[asset.kind] ?? asset.kind} | [Xem ảnh](public${asset.src}) |`
        : `| ${person.name} | Chưa chọn hình phù hợp | — |`;
    }),
    "",
  ].join("\n"),
);

import { writeFileSync } from "node:fs";
import { citations, claims, sources } from "../src/data/history";
import { statusLabels } from "../src/data/schema";

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
  "- Các thời kỳ ngoài Trần chủ yếu có khung điều hướng sơ bộ. Không công bố chúng là các chương hoàn chỉnh.",
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
  `Exported register: ${sources.length} sources; audit: ${claims.length} claims.`,
);

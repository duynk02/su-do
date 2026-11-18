import type { ReviewRecord } from "../schema";

export const reviews: ReviewRecord[] = [
  {
    id: "early-dynasties-reading",
    entityIds: ["nd-coronation", "nd-shared-rule", "nd-unification", "nd-scripture", "tl-accession-development", "tl-war-981-development", "tl-dynasty-ending"],
    action: "cross-reference",
    reviewer: "Trợ lý biên soạn có hỗ trợ AI; chưa có biên tập viên chuyên môn duyệt",
    date: "2026-11-18",
    note: "Đọc Toàn thư, Thế thứ, nghiên cứu và hồ sơ di sản tại vị trí dẫn trong từng Citation. Giữ các khoảng đồng trị và dị biệt niên đại; đối chiếu nguồn không thay việc chuyên gia thẩm định từng khẳng định.",
  },
  {
    id: "initial-reading",
    entityIds: [
      "transition",
      "thua-role",
      "date-disagreement",
      "bach-dang-uncertainty",
    ],
    action: "cross-reference",
    reviewer:
      "Trợ lý biên soạn có hỗ trợ AI; chưa có biên tập viên chuyên môn duyệt",
    date: "2026-11-17",
    note: "Đọc nguồn và so sánh các phần được dẫn. Đối chiếu nguồn không phải xác nhận của chuyên gia hoặc kết luận chắc chắn về mọi chi tiết.",
  },
];

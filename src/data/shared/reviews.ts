import type { ReviewRecord } from "../schema";

export const reviews: ReviewRecord[] = [
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

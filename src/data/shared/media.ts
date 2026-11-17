import type { MediaAsset } from "../schema";
import { personMediaAssets, lyIllustrationAssets } from "../person-media";

export const mediaAssets: MediaAsset[] = [
  {
    id: "bowl",
    src: "/media/bowl-met.jpg",
    title: "Bát gốm trang trí hoa nâu",
    date: "Thế kỷ XIV–đầu XV",
    kind: "artifact-photo",
    creator: "The Metropolitan Museum of Art · Richard Greenbaum Fund, 2021",
    license: "Public Domain",
    sourceId: "met-bowl",
    note: "Ảnh hiện vật 2021.182; không xác định chắc riêng triều vua. Nhãn Period của bảo tàng ghi ‘Tran or Ly Dynasty’.",
  },
  ...personMediaAssets,
  ...lyIllustrationAssets,
];

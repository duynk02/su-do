import type { Place, Source } from "../../schema";
import { claim } from "../../claim-store";

export const lyPlaceSources: Source[] = [
  {
    id: "ly-map-hoa-lu",
    title: "Hoa Lư Ancient Capital — điểm tham chiếu di tích",
    url: "https://en.wikipedia.org/wiki/Hoa_L%C6%B0_Ancient_Capital",
    publisher: "Wikipedia contributors",
    readLocation:
      "Coordinates ở đầu bài: 20°17′10″N, 105°54′24″E; chỉ dùng làm điểm đại diện di tích hiện nay.",
    limits:
      "Nguồn tham khảo tọa độ, không phải khảo sát khảo cổ hoặc ranh giới kinh thành cổ.",
    type: "geography",
    author: null,
    year: null,
    edition: null,
    upstream: null,
    accessed: "2026-11-17",
  },
  {
    id: "ly-map-van-mieu",
    title: "Temple of Literature, Hanoi — tọa độ khu di tích",
    url: "https://en.wikipedia.org/wiki/Temple_of_Literature,_Hanoi",
    publisher: "Wikipedia contributors",
    readLocation:
      "Coordinates: 21°1′43″N, 105°50′8″E và địa chỉ 58 Quốc Tử Giám.",
    limits:
      "Điểm khu di tích hiện nay; không định vị riêng tòa Quốc Tử Giám thế kỷ XI. Không dùng bài này thay nguồn chuyên biệt về lịch sử khoa cử.",
    type: "geography",
    author: null,
    year: null,
    edition: null,
    upstream: null,
    accessed: "2026-11-17",
  },
  {
    id: "ly-map-den-do",
    title: "Lý Bát Đế Temple — khu tưởng niệm các vua Lý",
    url: "https://en.wikipedia.org/wiki/L%C3%BD_B%C3%A1t_%C4%90%E1%BA%BF_Shrine",
    publisher: "Wikipedia contributors",
    readLocation:
      "Coordinates: 21°06′26″N, 105°57′37″E; mở đầu, Main hall and side halls và Restoration in the 1990s.",
    limits:
      "Nguồn tham khảo điểm đền hiện nay và chức năng tưởng niệm. Không dùng tọa độ để xác định quê quán chính xác hoặc mộ của từng vua; không dùng chuỗi nhiệm kỳ trong bài thay Toàn thư/Thế thứ.",
    type: "geography",
    author: null,
    year: null,
    edition: null,
    upstream: null,
    accessed: "2026-11-17",
  },
];
const denDoClaim = claim(
  "ly-place-den-do",
  "Đền Đô, còn gọi đền Lý Bát Đế, là nơi thờ các vua Lý ở Đình Bảng. Khu đền hiện nay đã qua nhiều lần xây dựng và phục hồi; đây là một địa điểm tưởng niệm để tìm hiểu về triều đại, không phải kinh đô của nhà Lý.",
  [
    [
      "ly-map-den-do",
      "Mở đầu; Main hall and side halls; Restoration in the 1990s",
    ],
  ],
);

export const lyPlaces: Place[] = [
  {
    id: "hoa-lu",
    name: "Hoa Lư",
    names: [{ label: "Khu di tích cố đô Hoa Lư hiện nay" }],
    type: "capital",
    locationType: "representative",
    coordinates: [105.90667, 20.28611],
    coordinateSourceId: "ly-map-hoa-lu",
    coordinateMethod:
      "Dùng tọa độ đại diện khu di tích từ nguồn; không dựng mặt bằng kinh thành.",
    precision:
      "Điểm tham chiếu di tích; không phải vị trí một cung điện thời Lý",
    claimIds: ["ly-foundation-result", "ly-capital-development"],
    periodIds: ["ly"],
    validFrom: 1009,
    validTo: 1011,
    mapLabel: { regular: [30, 42], compact: [30, 42] },
  },
  {
    id: "van-mieu",
    name: "Văn Miếu – Quốc Tử Giám",
    names: [{ label: "Khu di tích Văn Miếu – Quốc Tử Giám hiện nay" }],
    type: "heritage",
    locationType: "representative",
    coordinates: [105.83556, 21.02861],
    coordinateSourceId: "ly-map-van-mieu",
    coordinateMethod:
      "Tọa độ khu di tích hiện nay từ nguồn; không định vị tòa nhà nguyên gốc.",
    precision:
      "Điểm khu di tích; kiến trúc còn lại được xây dựng qua nhiều triều đại",
    claimIds: [
      "ly-temple-development",
      "ly-academy-development",
      "ly-academy-result",
    ],
    periodIds: ["ly"],
    validFrom: 1070,
    validTo: 1400,
    mapLabel: { regular: [-78, -95], compact: [-38, -38] },
  },
  {
    id: "den-do",
    name: "Đền Đô",
    names: [{ label: "Đền Lý Bát Đế, Đình Bảng" }],
    type: "heritage",
    locationType: "modern-memorial",
    coordinates: [105.96028, 21.10722],
    coordinateSourceId: "ly-map-den-do",
    coordinateMethod:
      "Điểm khu đền hiện nay; không định vị di tích bằng suy đoán.",
    precision: "Địa điểm thờ các vua Lý hiện nay",
    claimIds: [denDoClaim],
    periodIds: ["ly"],
    validFrom: 1028,
    validTo: 1226,
    mapLabel: { regular: [58, -14], compact: [55, 22] },
  },
  {
    id: "nhu-nguyet",
    name: "Phòng tuyến Như Nguyệt",
    names: [
      { label: "Không gian phòng thủ ven sông Cầu trong cuộc chiến 1076–1077" },
    ],
    type: "event",
    locationType: "uncertain",
    coordinates: null,
    coordinateSourceId: null,
    coordinateMethod: "Chỉ lưu mô tả vùng sông; chưa số hóa phòng tuyến.",
    precision:
      "Không gian ven sông Cầu; chưa có tọa độ và phạm vi chiến trường đủ căn cứ",
    claimIds: ["ly-war-development", "ly-war-result"],
    periodIds: ["ly"],
    validFrom: 1075,
    validTo: 1078,
  },
  {
    id: "van-don",
    name: "Vân Đồn",
    names: [{ label: "Không gian thương cảng qua các bến đảo" }],
    type: "regional",
    locationType: "uncertain",
    coordinates: null,
    coordinateSourceId: null,
    coordinateMethod: "Chưa số hóa các bến khảo cổ thành một tọa độ duy nhất.",
    precision: "Thương cảng gồm nhiều bến; chưa đặt điểm đại diện",
    claimIds: ["ly-van-don-establishment"],
    periodIds: ["ly"],
    validFrom: 1149,
    validTo: 1226,
  },
];

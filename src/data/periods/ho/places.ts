import { claim } from "../../claim-store";
import type { Place, Source } from "../../schema";
import { hoWarEvents } from "./people-war";

export const hoPlaceSources: Source[] = [
  {
    id: "ho-nam-giao-archaeology",
    title: "Giá trị di vật Đàn Nam Giao thời Hồ ở Thanh Hóa",
    url: "https://baotanglichsu.vn/vi/Articles/1508/49884/gia-tri-di-vat-djan-nam-giao-thoi-ho-o-thanh-hoa.html",
    publisher: "Bảo tàng Lịch sử Quốc gia",
    author: null,
    year: 2008,
    accessed: "2026-11-17",
    edition: null,
    upstream: "Bài đăng lại từ cinet.gov.vn; cuối bài ghi Theo TH",
    type: "museum",
    readLocation:
      "Mở đầu về Đốn Sơn; các đoạn khai quật 2004, dấu tích kiến trúc và nhóm di vật.",
    limits:
      "Bài giới thiệu khảo cổ được đăng lại, chưa đọc báo cáo khai quật đầy đủ. Dấu tích nền và hiện vật không tự cho phép phục dựng toàn bộ nghi lễ hoặc kiến trúc nguyên trạng.",
  },
];

export const hoPlaceClaimIds = {
  namGiao: claim(
    "ho-place-nam-giao",
    "Đàn Nam Giao ở núi Đốn Sơn, phía nam kinh đô Tây Đô, là một thành phần của quần thể Thành nhà Hồ. Những đợt khai quật đã làm rõ dấu tích nền đàn, đường đi, giếng và các vật liệu kiến trúc. Di tích hiện nay giúp tìm hiểu không gian nghi lễ của vương triều, nhưng không còn đầy đủ các công trình như lúc sử dụng.",
    [
      ["ho-nam-giao-archaeology", "Mở đầu, phần khai quật 2004 và di vật"],
      [
        "ho-unesco-citadel",
        "Outstanding Universal Value: ba thành phần và dấu tích Nam Giao",
      ],
    ],
  ),
};

export const hoPlaces: Place[] = [
  {
    id: "nam-giao-nha-ho",
    name: "Đàn Nam Giao · Tây Đô",
    names: [{ label: "Nam Giao Altar · UNESCO component 1358-003" }],
    type: "heritage",
    locationType: "historical-site",
    coordinates: [105 + 37 / 60 + 15.99 / 3600, 20 + 2 / 60 + 44 / 3600],
    coordinateSourceId: "unesco-ho",
    coordinateMethod:
      "Đổi DMS từ bảng UNESCO component 1358-003; không hiệu chỉnh hoặc dựng ranh giới.",
    precision:
      "Điểm khu di tích đàn tế hiện nay; không phục dựng từng công trình nghi lễ",
    claimIds: [hoPlaceClaimIds.namGiao],
    periodIds: ["ho"],
    validFrom: 1402,
    validTo: 1408,
    mapLabel: { regular: [-40, 55], compact: [-30, -45] },
  },
  {
    id: "da-bang",
    name: "Đa Bang",
    names: [{ label: "Không gian phòng thủ Đa Bang đầu năm 1407" }],
    type: "event",
    locationType: "uncertain",
    coordinates: null,
    coordinateSourceId: null,
    coordinateMethod:
      "Giữ địa danh sử liệu; chưa đối chiếu mặt bằng thành và chiến trường.",
    precision: "Khu vực Ba Vì; chưa đặt tọa độ thành hoặc tuyến phòng thủ",
    claimIds: [],
    periodIds: ["ho"],
    validFrom: 1406,
    validTo: 1408,
  },
  {
    id: "ham-tu",
    name: "Hàm Tử",
    names: [{ label: "Địa danh trong cuộc chiến năm 1407" }],
    type: "event",
    locationType: "uncertain",
    coordinates: null,
    coordinateSourceId: null,
    coordinateMethod:
      "Không đồng nhất địa danh trận đánh với một tọa độ hiện đại chưa khảo sát.",
    precision: "Vùng ven sông Hồng; chưa xác định phạm vi giao tranh năm 1407",
    claimIds: [],
    periodIds: ["ho"],
    validFrom: 1407,
    validTo: 1408,
  },
  {
    id: "ky-la-cao-vong",
    name: "Kỳ La · Cao Vọng",
    names: [{ label: "Các địa danh sử chép về việc bắt giữ họ Hồ" }],
    type: "regional",
    locationType: "uncertain",
    coordinates: null,
    coordinateSourceId: null,
    coordinateMethod:
      "Giữ nhiều địa danh và diễn biến theo sử liệu, không gộp thành một điểm bắt giữ duy nhất.",
    precision:
      "Không gian Hà Tĩnh; chưa có tọa độ đủ căn cứ cho từng lần bắt giữ",
    claimIds: [],
    periodIds: ["ho"],
    validFrom: 1407,
    validTo: 1408,
  },
];
for (const place of hoPlaces) {
  if (place.claimIds.length) continue;
  const event = hoWarEvents.find((entry) => entry.placeIds.includes(place.id));
  if (event)
    place.claimIds = [...event.contextClaimIds, ...event.developmentClaimIds];
}

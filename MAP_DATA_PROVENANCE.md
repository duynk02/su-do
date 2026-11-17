# Nguồn gốc dữ liệu bản đồ

## Nền địa lý

- Nhà cung cấp: Natural Earth, tỷ lệ gốc 1:50 triệu, dữ liệu **hiện đại**.
- Quyền: [public domain](https://www.naturalearthdata.com/about/terms-of-use/).
- Đầu vào thực tế: [ne_50m_admin_0_countries.geojson](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson), [ne_50m_rivers_lake_centerlines.geojson](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_rivers_lake_centerlines.geojson).
- Công cụ tạo: `scripts/prepare-assets.py`, chạy bởi trợ lý triển khai. Chọn feature khu vực, giữ geometry gốc, bỏ thuộc tính không cần; chọn sông có đỉnh trong vùng 99–113°Đ, 13–26°B. Không sửa hoặc tự tạo tọa độ.
- Đầu ra: `public/maps/land.json`, `rivers.json`, `provenance.json`. Manifest ghi URL đầu vào và số feature. Không tải lại dữ liệu trong quá trình build; cập nhật dữ liệu phải có diff/review riêng.
- Trình bày: Mercator qua d3-geo, SVG. Các nước cùng màu, mặc định không stroke ranh giới hành chính. Chỉ khi bật “Tham chiếu hiện đại” mới hiện đường phân chia và tên nước hiện đại.
- Không có tile server, API token hoặc chi phí/hạn ngạch nhà cung cấp trong vận hành bản này. GeoJSON được serve cùng site; hosting có thể có chi phí riêng.
- Giới hạn: dữ liệu khái quát hóa mạnh, không dùng định vị di tích chính xác hoặc suy bờ biển/lòng sông trung đại. Vùng hiển thị không cắt theo biên giới Việt Nam hiện nay.

## Điểm tham chiếu

Tọa độ từ bảng di sản UNESCO, đổi DMS sang độ thập phân theo `d + m/60 + s/3600`, thứ tự `[kinh độ, vĩ độ]`, không hiệu chỉnh:

| Điểm | Nguồn | Ý nghĩa |
|---|---|---|
| Thăng Long | [1328](https://whc.unesco.org/en/list/1328/), N21 2 15.072 E105 50 19.043 | Điểm di sản đại diện không gian kinh thành; không định vị điện Thiên An |
| Thái Miếu | [1732/maps](https://whc.unesco.org/en/list/1732/maps/), component 001 | Khu di tích hiện nay |
| Kiếp Bạc | cùng bảng, component 002 | Điểm đền tưởng niệm; không phải chiến trường Bạch Đằng |
| Yên Tử / chùa Lân | cùng bảng, component 003 | Điểm chùa Lân, không đại diện toàn dãy Yên Tử |
| Tây Đô | [1358/maps](https://whc.unesco.org/en/list/1358/maps/), component 001 | Nội thành di tích hiện nay |

Chỉ chép số tọa độ thực tế, không sao chép bản đồ/geometry ranh khu di sản của UNESCO. Không đặt tọa độ cho Hải Ấp, Đông Bộ Đầu hoặc chiến trường Bạch Đằng. Chúng nằm trong danh sách văn bản với trạng thái tương đối.

`Place.validFrom/validTo` là phạm vi liên hệ biên tập để lọc, không khẳng định ngày xây mọi di tích hiện nay. Nhãn bản đồ ghi điểm di sản tham chiếu. Điểm được chọn từ chương có thể tiếp tục hiện để cung cấp ngữ cảnh, không biến thành bằng chứng tồn tại đúng từng năm.

## Ranh giới lịch sử

Chưa có geometry lãnh thổ đủ căn cứ/quyền sử dụng. `TerritorySnapshot.geometry = null`, trạng thái `unwritten`. Thông báo thiếu dữ liệu luôn hiện, không lấy ranh hiện đại thay thế, không vẽ đường ảnh hưởng hoặc nội suy. Không sử dụng bản đồ in trong PDF nghiên cứu vì chưa xác định quyền và phương pháp số hóa.

## Ảnh và font

Ảnh bát The Met, [object 2021.182](https://www.metmuseum.org/art/collection/search/853979), trang đánh dấu Public Domain, tải từ `images.metmuseum.org/CRDImages/as/original/DP-26130-001.jpg`. Không chỉnh sửa ảnh; SHA-256 lưu trong provenance.json. Dòng ghi công: Richard Greenbaum Fund, 2021. Nhãn niên đại giữ “thế kỷ XIV–đầu XV”, không ép chắc vào triều Trần.

Be Vietnam Pro và Noto Serif lấy từ kho `google/fonts`, giấy phép OFL được lưu cùng font trong `public/fonts/`. Không dùng chân dung hoặc bản đồ AI.

# Sử Đồ

Khám phá Việt Nam qua từng lớp thời gian.

Atlas lịch sử tương tác bằng tiếng Việt. Phiên bản đầu gồm luồng học về nhà Trần, bối cảnh cuối Lý và chuyển sang Hồ; khung các thời kỳ đến năm 1900. Mỗi đoạn có khẳng định và chú thích nguồn mở được trong trang.

## Chạy local

Yêu cầu Node.js 20.9 trở lên (đã dùng Node 22) và npm.

```sh
npm ci
npm run dev
```

Mở http://127.0.0.1:3000. Trên PowerShell bị chặn script npm.ps1, dùng `npm.cmd ci` và `npm.cmd run dev`.

```sh
npm run typecheck
npm test
npm run audit:content
npm run build
npm start
```

`next build` xuất website tĩnh vào `out/`. `npm start` dùng server tĩnh Node cục bộ (không phải `next start`). Không cần backend, .env, tài khoản hay token bản đồ. Chưa triển khai công khai.

## Kiểm thử trình duyệt

```sh
npm run build
npm run test:e2e
```

Playwright tự mở server tĩnh ở cổng **3100** và kiểm tra desktop/mobile, tách khỏi dev server thường dùng cổng 3000. Cấu hình mặc định dùng Microsoft Edge đã có sẵn trên Windows. Khi dùng hệ điều hành khác, đổi `channel: "msedge"` trong playwright.config.ts hoặc cài Edge qua Playwright. Ảnh thực tế nằm trong `docs/screenshots/`.

Kiểm tra lỗi hydration cần React development để nhìn thấy cảnh báo thuộc tính. Khi dev server đang chạy ở 3000, dùng PowerShell:

```powershell
$env:SU_DO_TEST_PORT = "3000"
$env:SU_DO_TEST_DEV = "1"
npm.cmd run test:e2e -- hydration.spec.ts
```

Bộ kiểm tra này mô phỏng công cụ con trỏ chèn `data-cc-prev-cursor`/`style` lên `html` và `body` trước hydration, đồng thời có ca đối chứng xác nhận sai khác bên trong bài đọc vẫn được phát hiện. Layout chỉ cho phép khác biệt thuộc tính tại hai thẻ gốc; không tắt kiểm tra cho nội dung ứng dụng. Xóa hai biến môi trường thử nghiệm sau khi kiểm tra nếu tiếp tục dùng cùng cửa sổ PowerShell.

## Cấu trúc và lựa chọn kỹ thuật

- Next.js App Router + TypeScript, static export: nội dung đọc được từ HTML, không cần máy chủ ứng dụng.
- `src/data/schema.ts`: các thực thể sử học; `history.ts`: nội dung và liên kết; `biographies.ts`: tiểu sử nhân vật theo đoạn có nguồn; `sources.ts`: nguồn đã thực sự đọc.
- `src/lib/history.ts`: tìm kiếm không dấu, quy ước thời gian, đọc/ghi URL.
- Bản đồ SVG dùng d3-geo, tải module và GeoJSON khi cần; không cần WebGL. Đã đọc [tài liệu d3-geo](https://d3js.org/d3-geo) và [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
- Natural Earth public domain, dữ liệu địa lý hiện đại lưu cục bộ. Không gọi tile server; không có phí API hoặc hạn ngạch từ nhà cung cấp bản đồ. Hạ tầng hosting tương lai có thể có phí riêng.
- Đồ thị quan hệ SVG có danh sách văn bản cùng các nút điều hướng; không thêm thư viện đồ thị lớn cho quy mô hiện tại.
- Hai họ font tiếng Việt lưu cục bộ, có giấy phép OFL đi kèm. Ảnh hiện vật The Met được đánh dấu Public Domain.

Để đổi nguồn bản đồ, thay GeoJSON và phép chiếu trong `atlas-map.tsx`, cập nhật `MAP_DATA_PROVENANCE.md`; giữ riêng lớp tham chiếu hiện đại. Không cần đổi mô hình nội dung hoặc đăng ký token khi dùng dữ liệu cục bộ tương đương.

## Giới hạn biên soạn

23 hồ sơ nhân vật có đoạn giới thiệu tiểu sử. Trần Nhân Tông và Dương Nhật Lễ có thêm các phần về xuất thân, hoạt động, lên ngôi/rời ngôi và liên kết sự kiện. Niên đại sống được bổ sung khi nguồn hỗ trợ; năm sinh của Nhật Lễ và năm mất của Thiếu Đế vẫn để chưa rõ. Những cách ghi ngày hoặc thời gian mang tôn hiệu khác nhau được lưu trong chú thích nguồn.

Chưa có biên tập viên/chuyên gia lịch sử duyệt. “Đã đối chiếu nguồn” chỉ nói về việc so sánh nguồn. Chưa có dữ liệu ranh giới lịch sử đủ căn cứ; website không dựng polygon lãnh thổ. Các địa điểm không đủ tọa độ vẫn nằm trong danh sách văn bản.

Chín phần đã có nội dung tóm lược và tương tác; chiều sâu chưa đồng đều. Chuyên đề đê điều, văn học, kiến trúc, tiếng nói người dân và quan hệ khu vực cần khảo cứu tiếp. Các thời kỳ khác chủ yếu là khung điều hướng. Một số nguồn là bài đăng lại hoặc bản chuyển dạng chưa xác nhận ấn bản; giới hạn ghi rõ trong hồ sơ nguồn.

Thêm nội dung theo `DATA_MODEL.md` và `HISTORICAL_EDITORIAL_POLICY.md`, rồi chạy kiểm tra dữ liệu. Test tự động không chứng minh lịch sử đúng.

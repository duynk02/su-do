# Sử Đồ

Khám phá Việt Nam qua từng lớp thời gian.

Atlas lịch sử tương tác bằng tiếng Việt. Bộ Ngô–Đinh–Tiền Lê có 11 chương, nhà Lý 10 chương, nhà Trần chín chương và nhà Hồ tám chương; các thời kỳ khác có khung đến năm 1900. Nội dung lịch sử đi kèm chú thích nguồn mở được trong trang.

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
- `src/data/schema.ts`: các thực thể sử học; `claim-store.ts`: tạo khẳng định/dẫn nguồn; `history.ts`: bộ tổng hợp dữ liệu tĩnh; `sources.ts`: nguồn đã đọc.
- `src/data/periods/{ngo-dinh-tien-le,ly,tran,ho}/`: mỗi bộ có metadata, chương, sự kiện và nhiệm kỳ. `periods/index.ts` là nơi đăng ký bộ nội dung; thêm thời kỳ không cần gắn tên hay số chương vào component. Bộ Ngô–Đinh–Tiền Lê giữ ID `the-ky-x` để các liên kết cũ tiếp tục dùng được.
- `src/data/shared/`: hồ sơ nhân vật, quan hệ và địa điểm dùng chung theo ID. `Person.periodIds` cho phép một người xuất hiện ở nhiều thời kỳ; Chiêu Hoàng, Trần Cảnh và Hồ Quý Ly không có hồ sơ trùng. `biographies.ts`/`families.ts` giữ các đoạn và nhánh nhà Trần đã biên soạn.
- `person-media.ts` đọc các catalog trong `public/images/people/`, gắn hình với hồ sơ chuẩn. 55/71 nhân vật có hình, gồm đủ 33 người giữ ngôi trong bốn bộ nội dung. Bộ mới có 16 ảnh hồ sơ và ba ảnh bài đọc; Ngô Xương Văn và Lê Trung Tông dùng ảnh di tích khi chưa tìm được chân dung đủ căn cứ. Bài đọc phân biệt tranh, tượng, di tích, hiện vật và bản tái dựng. Xem `IMAGE_COVERAGE.md`.
- `src/lib/history.ts`: bộ chọn dữ liệu theo thời kỳ, tìm kiếm không dấu, quy ước thời gian, đọc/ghi URL và ngữ cảnh điều hướng. Liên kết nhà Trần cũ giữ được; trang mặc định vẫn mở bộ Trần.
- `src/lib/relations-layout.ts`: chọn phạm vi quan hệ theo loại và bố trí phả hệ theo tầng; `src/components/relations.tsx`: bộ lọc Gia đình/Kế vị/Chính trị, thu phóng và mở hồ sơ từ ô nhân vật.
- Bản đồ SVG dùng d3-geo, tải module và GeoJSON khi cần; không cần WebGL. Đã đọc [tài liệu d3-geo](https://d3js.org/d3-geo) và [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
- Natural Earth public domain, dữ liệu địa lý hiện đại lưu cục bộ. Không gọi tile server; không có phí API hoặc hạn ngạch từ nhà cung cấp bản đồ. Hạ tầng hosting tương lai có thể có phí riêng.
- Sơ đồ SVG phân tầng có danh sách văn bản, nút chọn loại quan hệ và thu phóng; giữ cỡ chữ gốc khi sơ đồ rộng, cuộn ngang trong khung. Không thêm thư viện đồ thị lớn cho quy mô hiện tại.
- Hai họ font tiếng Việt lưu cục bộ, có giấy phép OFL đi kèm. Ảnh hiện vật The Met được đánh dấu Public Domain.

Để đổi nguồn bản đồ, thay GeoJSON và phép chiếu trong `atlas-map.tsx`, cập nhật `MAP_DATA_PROVENANCE.md`; giữ riêng lớp tham chiếu hiện đại. Không cần đổi mô hình nội dung hoặc đăng ký token khi dùng dữ liệu cục bộ tương đương.

## Giới hạn biên soạn

71 hồ sơ có đoạn giới thiệu và dẫn nguồn. Bộ Ngô–Đinh–Tiền Lê có 25 nhân vật liên quan, trong đó Lý Công Uẩn dùng cùng hồ sơ với bộ Lý; Vạn Hạnh, Đào Cam Mộc và Khuông Việt cũng có phạm vi qua hai thời kỳ. Phả hệ tách Dương hoàng hậu nhà Ngô khỏi Dương Vân Nga, phân biệt huyết thống, nhận nuôi, hôn nhân và quan hệ chính trị; không gán Dương Vân Nga làm mẹ Long Việt/Long Đĩnh. Các hồ sơ Hồ tiếp tục giữ nhánh Huy Ninh–Khâm Thánh–Thiếu Đế và hậu vận Quý Ly.

Chưa có biên tập viên/chuyên gia lịch sử duyệt. “Đã đối chiếu nguồn” chỉ nói về việc so sánh nguồn. Chưa có dữ liệu ranh giới lịch sử đủ căn cứ; website không dựng polygon lãnh thổ. Các địa điểm không đủ tọa độ vẫn nằm trong danh sách văn bản.

Bộ Ngô–Đinh–Tiền Lê gồm 11 chương từ bối cảnh Bạch Đằng 938 đến chuyển triều 1009, 20 sự kiện và chín người giữ ngôi; hai vương thời Ngô có khoảng đồng trị. Lý có 10 chương từ 1009 đến 1225/1226; Trần giữ chín chương; Hồ có tám chương đến chiến tranh 1406–1407 và hậu vận nhân vật. Giữ rõ dị biệt 897/898 của Ngô Quyền, 991/1001 của Đinh Phế Đế, 1018/1025 của Vạn Hạnh và cách đếm niên hiệu Tiền Lê. Chiều sâu chưa đồng đều; những thời kỳ còn lại chủ yếu là khung. Một số nguồn là bài đăng lại/bản chuyển dạng chưa xác nhận ấn bản; giới hạn ghi trong hồ sơ nguồn.

Thêm nội dung theo `DATA_MODEL.md` và `HISTORICAL_EDITORIAL_POLICY.md`, rồi chạy kiểm tra dữ liệu. Test tự động không chứng minh lịch sử đúng.

## Lộ trình lưu trữ và biên tập

Hiện nội dung nằm trong TypeScript/JSON, quản lý bằng Git; sửa nội dung cần build lại. Sau khi mở rộng phần lớn triều đại, dự kiến thay lớp tổng hợp bằng database/CMS trả cùng schema và giữ ID. Chức năng góp ý lịch sử và dashboard biên tập là giai đoạn sau: lưu đề xuất riêng, xem nguồn, duyệt bản nháp rồi xuất bản, có lịch sử thay đổi. Chưa triển khai database, CMS, đăng nhập, góp ý hay dashboard trong đợt này.

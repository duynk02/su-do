# Quy trình làm việc với dự án

## Nhánh, commit và pull request

- Trước khi bắt đầu mỗi nhóm chức năng, thay đổi hoặc chỉnh sửa mới, kiểm tra trạng thái Git và tạo một nhánh riêng từ `master`. Dùng tên nhánh mô tả công việc, chẳng hạn `feat/...`, `fix/...` hoặc `chore/...`.
- Thực hiện chỉnh sửa, chạy các kiểm tra phù hợp và tạo commit trên nhánh đó; không commit trực tiếp vào `master`. Giữ nguyên các thay đổi riêng của người dùng và chỉ stage những tệp thuộc công việc đang làm.
- Dùng Conventional Commits và cập nhật `IMPLEMENTATION_STATUS.md` với kết quả, kiểm tra và phần còn lại khi có thay đổi triển khai.
- Người dùng tự tạo pull request trên GitHub. Không tự tạo pull request hoặc merge nhánh thay người dùng.
- Sau mỗi lần commit, phản hồi cuối phải nêu tên nhánh, mã commit và phần nội dung có thể dùng để tạo pull request: tiêu đề đề xuất, tóm tắt chỉnh sửa và kết quả kiểm tra. Nêu rõ trạng thái push để người dùng biết nhánh đã có trên GitHub hay mới ở local.

## Nội dung lịch sử

Khi biên soạn hoặc sửa dữ kiện, đọc `HISTORICAL_EDITORIAL_POLICY.md` và tuân theo mô hình trong `DATA_MODEL.md`. Dữ liệu lịch sử thuộc bộ nội dung theo thời kỳ hoặc hồ sơ dùng chung; component phụ trách trình bày.

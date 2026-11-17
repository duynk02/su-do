import type { Source } from "./schema";
const accessed = "2026-11-17";
const source = (s: Omit<Source, "accessed" | "edition">): Source => ({
  ...s,
  accessed,
  edition: null,
});
export const sources: Source[] = [
  source({
    id: "the-thu",
    title: "Thế thứ các triều vua Việt Nam",
    author: "Nguyễn Khắc Thuần",
    publisher: "Trường Sư phạm, Đại học Cần Thơ — bản chuyển dạng sách",
    year: null,
    url: "https://se.ctu.edu.vn/hoat-dong-su/tu-lieu-lich-su/677-the-thu-cac-trieu-vua-viet-nam.html",
    type: "research",
    upstream:
      "Thế thứ các triều vua Việt Nam của Nguyễn Khắc Thuần; trước đây đã đọc bản PDF chuyển dạng tại thuviensach.vn",
    readLocation:
      "Chương 5, phần II – Thế thứ các vua thời Trần, mục 1–13; chương 4, mục Lý Chiêu Hoàng",
    limits:
      "Đã đọc bản chuyển dạng tại Đại học Cần Thơ và bản PDF trước đó, chưa đối chiếu bản in. Hai bản chuyển dạng là cùng một công trình, không tính là hai nguồn độc lập. Các niên đại giữ độ chính xác năm; mốc Thượng hoàng Nhân Tông 1293–1299 trong sách được phân biệt với thời gian còn mang tôn hiệu đến khi mất năm 1308. Các biến thể Hiện/Hiệu, Nhung/Ngung, An/Án được lưu cho tìm kiếm.",
  }),
  source({
    id: "nhan-tong-heritage",
    title:
      "Lễ dâng hương kỷ niệm 715 năm huý nhật Đức Vua, Phật Hoàng Trần Nhân Tông",
    author: "Ban biên tập",
    publisher: "Trung tâm Bảo tồn Di sản Thăng Long – Hà Nội",
    year: 2023,
    url: "https://hoangthanhthanglong.vn/le-dang-huong-tuong-niem-715-nam-ngay-mat-duc-vua-phat-hoang-tran-nhan-tong-tai-hoang-thanh-thang-long/",
    type: "heritage",
    upstream: null,
    readLocation: "Đoạn giới thiệu: sinh 1258, mất 1308, trị vì 1278–1293",
    limits:
      "Bài tưởng niệm chỉ dùng niên đại; không dùng lời tán dương làm kết luận khách quan. Mốc lên ngôi 1278 khác bài biên niên ghi 1279; chưa tự giải thích bằng chuyển lịch.",
  }),
  source({
    id: "nhan-tong-journey",
    title:
      "Lễ dâng hương tưởng niệm 710 năm ngày mất Phật hoàng Trần Nhân Tông",
    author: null,
    publisher: "Trung tâm Bảo tồn Di sản Thăng Long – Hà Nội",
    year: 2018,
    url: "https://hoangthanhthanglong.vn/le-dang-huong-tuong-niem-710-nam-ngay-mat-phat-hoang-tran-nhan-tong/",
    type: "heritage",
    upstream: null,
    readLocation:
      "Các đoạn về kháng chiến 1285/1288, nhường ngôi 1293, xuất gia Yên Tử 1299, Pháp Loa và am Ngọa Vân 1308",
    limits:
      "Bài giới thiệu di sản mang tính tưởng niệm. Chỉ dùng các dấu mốc và hoạt động được nêu; không dùng lời tán dương làm nhận định khách quan. Ngày mất 1 tháng 11 trong bài khác ngày 3 tháng 11 trong Thế thứ; chỉ xuất bản năm 1308.",
  }),
  source({
    id: "nhat-le-court",
    title: "Nàng công chúa dẹp loạn cứu vương triều",
    author: "Lê Thái Dũng",
    publisher: "Bảo tàng Lịch sử Quốc gia (đăng lại)",
    year: 2012,
    url: "https://baotanglichsu.vn/vi/Articles/2001/66421/nang-cong-chua-dep-loan-cuu-vuong-trieu.html",
    type: "museum",
    upstream:
      "phunutoday.vn; bài dẫn Đại Việt sử ký toàn thư và Đại Việt sử ký tiền biên",
    readLocation:
      "Phần ‘Một quyết định sai lầm khiến xã tắc ngả nghiêng’ và các đoạn về Nguyên Trác, Thiên Ninh, Trần Phủ, việc phế Nhật Lễ tháng 11 năm 1370",
    limits:
      "Bài phổ thông dẫn sử liệu, chưa thay thế việc kiểm tra bản sử gốc. Phân biệt ghi chép về huyết thống và động cơ chính trị với dữ kiện hiện đại; không lặp lời miệt thị nghề nghiệp, lời thoại hoặc mô tả cảm xúc.",
  }),
  source({
    id: "quoc-tuan-biography",
    title: "Hưng Đạo Đại Vương – Trần Quốc Tuấn",
    author: null,
    publisher: "Ủy ban Nhà nước về người Việt Nam ở nước ngoài",
    year: 2007,
    url: "https://scov.gov.vn/dat-nuoc-con-nguoi/con-nguoi-viet-nam/hung-ao-ai-vuong-tran-quoc-tuan.html",
    type: "chronology",
    upstream: null,
    readLocation:
      "Đoạn mở đầu 1228–1300; các đoạn về Trần Liễu, Trần Quang Khải, quyền tiết chế và Hịch tướng sĩ",
    limits:
      "Bài giới thiệu mang tính tôn vinh; không dùng lời đánh giá tuyệt đối hoặc gán quyền tổng chỉ huy cả ba cuộc chiến chỉ từ đoạn tóm tắt. Năm sinh 1228 được ghi xấp xỉ do còn có cách ghi dè dặt trong nghiên cứu.",
  }),
  source({
    id: "vietnam-su-luoc-tran",
    title: "Việt Nam sử lược, quyển I — cuối đời Nhân Tông và đời Anh Tông",
    author: "Trần Trọng Kim",
    publisher: "Wikisource — bản chuyển dạng kèm ảnh trang sách",
    year: null,
    url: "https://vi.wikisource.org/wiki/Trang:Viet_Nam_Su_Luoc_1.djvu/180",
    type: "chronology",
    upstream:
      "Việt Nam sử lược, quyển I, trang in 167–168; các trang djvu/179 và djvu/180",
    readLocation:
      "Trang in 167: Nhân Tông đi tu và quan hệ với Champa; trang 168: Nhân Tông Thượng hoàng mất năm 1308",
    limits:
      "Sử biên soạn đầu thế kỷ XX, cần đối chiếu nguồn khác. Chỉ dùng việc tôn hiệu Thượng hoàng còn được ghi khi Nhân Tông mất năm 1308 và các mốc đã đối chiếu; không lặp nhận định về tập tục Champa hoặc lời phán xét. Chưa xác nhận ấn bản của bản quét.",
  }),
  source({
    id: "toan-thu-phe-de",
    title: "Đại Việt sử ký toàn thư — Phế Đế, quyển VIII, tờ 1a",
    author: null,
    publisher: "Vietnamese Nôm Preservation Foundation — bản số hóa",
    year: null,
    url: "https://www.nomfoundation.org/nom-project/history-of-greater-vietnam/Fulltext/49-Phe-De?uiLang=en",
    type: "research",
    upstream: "Sử liệu và bản dịch được trình bày song song trên trang",
    readLocation:
      "Quyển VIII, tờ 1a, phần Phế Đế; dòng Hán văn ‘諱 晛’ và bản dịch tên húy Hiện",
    limits:
      "Chưa xác nhận đủ dịch giả và ấn bản của phần dịch; chỉ dùng để đối chiếu tên Hiện. Các lời phê bình của sử quan không xem là dữ kiện khách quan.",
  }),
  source({
    id: "timeline-reference",
    title: "List of Vietnamese dynasties",
    author: "Các cộng tác viên Wikipedia",
    publisher: "Wikipedia",
    year: null,
    url: "https://en.wikipedia.org/wiki/List_of_Vietnamese_dynasties",
    type: "reference",
    upstream: "Tài liệu tham khảo liệt kê ở cuối bài",
    readLocation: "Bảng từ Ngô đến Nguyễn; chú thích về các triều đồng thời",
    limits:
      "Chỉ dùng làm khung niên đại sơ bộ ngoài chương Trần; chưa đối chiếu các mốc này với công trình chuyên ngành. Không dùng niên đại truyền thuyết hoặc làm căn cứ duy nhất cho vấn đề tranh luận. Khung Tây Sơn bao gồm phong trào từ 1771, triều đại trong bảng bắt đầu 1778.",
  }),
  source({
    id: "dong-son",
    title:
      "Văn hóa Đông Sơn ở Việt Nam — 90 năm phát hiện và nghiên cứu (phần 1)",
    author: "Nguyễn Văn Đoàn",
    publisher: "Bảo tàng Lịch sử Quốc gia",
    year: 2014,
    url: "https://baotanglichsu.vn/vi/Articles/3101/16655/van-hoa-djong-son-o-viet-nam-90-nam-phat-hien-va-nghien-cuu-phan-1.html",
    type: "museum",
    upstream: null,
    readLocation: "Đoạn mở đầu và mục 1. Niên đại và các giai đoạn phát triển",
    limits:
      "Khung văn hóa khảo cổ không đồng nhất với niên đại một nhà nước; không suy ra năm thành lập Văn Lang từ thời gian văn hóa Đông Sơn.",
  }),
  source({
    id: "vietnam-su-luoc-2",
    title: "Việt Nam sử lược, quyển II",
    author: "Trần Trọng Kim",
    publisher: "Bản PDF tại Wikimedia Commons",
    year: null,
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Viet_Nam_Su_Luoc_2.pdf",
    type: "chronology",
    upstream: null,
    readLocation:
      "Chương II. Nam triều Bắc triều, mục 1, 3, 7, 9; các bảng Trịnh–Nguyễn",
    limits:
      "Sử biên soạn đầu thế kỷ XX, mang quan niệm chính thống của thời đại; chỉ dùng để trình bày các chính quyền đồng thời, không lặp lời phán xét.",
  }),
  source({
    id: "ly-study",
    title: "Lịch sử Việt Nam, tập 2 — phần cuối triều Lý",
    author: null,
    publisher: "Bản trích lưu tại Thư viện tỉnh Quảng Ngãi",
    year: null,
    url: "https://thuvientinh.quangngai.gov.vn/wp-content/uploads/2020/12/193-356.pdf",
    type: "research",
    upstream: null,
    readLocation: "Trang in 347–356, đoạn về Hải Ấp và việc chuyển ngôi",
    limits:
      "Đã đọc bản trích; chưa có trang tên sách để xác nhận ấn bản và tác giả. Không dùng lời đánh giá nhân vật như dữ kiện khách quan.",
  }),
  source({
    id: "tran-chronology",
    title: "XIV. Nhà Trần (1225–1400), phần 1",
    author: null,
    publisher: "Ủy ban Nhà nước về người Việt Nam ở nước ngoài",
    year: null,
    url: "https://scov.gov.vn/dat-nuoc-con-nguoi/tom-tat-bien-nien-su-vn/xiv.-nha-tran-175-nam-1225-1400-quoc-hieu-dai-viet-kinh-do-thang-long-phan-1-.html",
    type: "chronology",
    upstream: "quehuongonline.vn (ghi ở cuối bài)",
    readLocation: "Các mục tên từng vua; đoạn sau mục Trần Dụ Tông",
    limits:
      "Biên niên phổ thông; có điểm sai và thiếu nhất quán. Không lấy số quân, lời thoại hoặc đoạn phê phán làm bằng chứng độc lập. Mốc chuyển ngôi khác nguồn ly-transition.",
  }),
  source({
    id: "tran-thua",
    title: "Kỳ lạ ‘Vua’ sáng nghiệp nhà Trần chưa từng ở bệ rồng",
    author: "Vĩnh Khang",
    publisher: "Bảo tàng Lịch sử Quốc gia (đăng lại)",
    year: 2011,
    url: "https://baotanglichsu.vn/vi/Articles/2001/65615/ky-la-vua-sang-nghiep-nha-tran-chua-tung-o-be-rong.html",
    type: "museum",
    upstream:
      "baodatviet.vn; dẫn Danh tướng Việt Nam và Đại Việt sử ký toàn thư",
    readLocation: "Mục ‘Trở thành Thái tổ’",
    limits:
      "Bài phổ thông đăng lại. Thứ tự anh/em Trần Thừa–Trần Tự Khánh khác nguồn khác; chỉ ghi quan hệ anh em, không xác định thứ bậc.",
  }),
  source({
    id: "ly-transition",
    title: "Ai là tác giả chiếu nhường ngôi của Lý Chiêu Hoàng?",
    author: null,
    publisher: "Bảo tàng Lịch sử Quốc gia (đăng lại)",
    year: null,
    url: "https://baotanglichsu.vn/VI/Articles/3098/14781/ai-la-tac-gia-chieu-nhuong-ngoi-cua-ly-chieu-hoang.html",
    type: "museum",
    upstream: "kienthuc.net.vn (liên kết ảnh và nguồn trong bài)",
    readLocation: "Các đoạn về cung đình; đoạn ‘ngày 11 tháng Chạp năm Ất Dậu’",
    limits:
      "Đọc qua bài giới thiệu dẫn sử liệu; chưa trực tiếp đối chiếu bản in các sử liệu. Không suy diễn tâm trạng, tình yêu hoặc tác giả chiếu từ văn phong.",
  }),
  source({
    id: "tran-society",
    title: "Lịch sử Việt Nam, tập 2 — văn hóa, xã hội Đại Việt thời Trần",
    author: null,
    publisher: "Bản trích lưu tại Thư viện tỉnh Quảng Ngãi",
    year: null,
    url: "https://thuvientinh.quangngai.gov.vn/wp-content/uploads/2020/12/504-620.pdf",
    type: "research",
    upstream: null,
    readLocation:
      "Trang in 549–550, 566–568, 611–614; phần kháng chiến trang 504–548",
    limits:
      "Bản trích không có trang tên sách; không tái sử dụng ảnh và bản đồ có quyền chưa xác định. Chưa khảo sát riêng đê điều, kiến trúc hoặc đời sống từng địa phương.",
  }),
  source({
    id: "wars-education",
    title: "Chủ đề Nước Đại Việt thời Trần (phần 2)",
    author: null,
    publisher: "Trường THCS Nguyễn Du, Quận 1 — cổng giáo dục TP.HCM",
    year: null,
    url: "https://thcsnguyenduq1.hcm.edu.vn/khoi-7/lich-su-7-chu-de-nuoc-dai-viet-thoi-tran-phan-2/ct/73803/548583",
    type: "education",
    upstream: null,
    readLocation: "Mục I, II, III: diễn biến và kết quả ba cuộc kháng chiến",
    limits:
      "Tài liệu giáo dục khái quát; không dùng số quân và chi tiết chiến thuật. Không sử dụng câu gộp thời điểm lập nhà Nguyên với năm 1279.",
  }),
  source({
    id: "dong-bo-dau",
    title: "Lịch sử địa danh Đông Bộ Đầu",
    author: null,
    publisher: "Ủy ban Nhà nước về người Việt Nam ở nước ngoài",
    year: null,
    url: "https://scov.gov.vn/dat-nuoc-con-nguoi/1000-nam-thang-long-ha-noi/lich-su-dia-danh-dong-bo-dau.html",
    type: "research",
    upstream: null,
    readLocation: "Đoạn định nghĩa Bộ Đầu và vị trí phía đông Thăng Long",
    limits:
      "Chỉ có mô tả vị trí tương đối; không đủ căn cứ đặt tọa độ chính xác của trận đánh.",
  }),
  source({
    id: "bach-dang-2013",
    title: "Nhận diện khoa học về chiến thắng Bạch Đằng — Bài 2",
    author: null,
    publisher: "Bảo tàng Lịch sử Quốc gia (đăng lại)",
    year: 2013,
    url: "https://baotanglichsu.vn/vi/Articles/2001/66579/nhan-dien-khoa-hoc-ve-chien-thang-bach-djang-bai-2-tu-bai-coc-tai-hien-tran-bach-djang-xua.html",
    type: "research",
    upstream: "daidoanket.vn; bài phục dựng dựa trên nghiên cứu khảo cổ",
    readLocation: "Đoạn mở đầu và đoạn về dòng chảy cổ, bố trí bãi cọc",
    limits:
      "Nhiều phần là giả thuyết phục dựng. Không coi đường đi, hỏa công hoặc bố trí trận địa là hình học đã xác lập.",
  }),
  source({
    id: "bach-dang-2019",
    title:
      "Phát hiện bãi cọc trong trận thủy chiến trên sông Bạch Đằng năm 1288",
    author: null,
    publisher: "Bảo tàng Lịch sử Quốc gia",
    year: 2019,
    url: "https://baotanglichsu.vn/vi/Articles/3100/71253/phat-hien-bai-coc-trong-tran-thuy-chien-tren-song-bach-djang-nam-1288.html",
    type: "museum",
    upstream: "Bài có dẫn liên kết Wikipedia; không phải báo cáo khai quật gốc",
    readLocation: "Đoạn về địa mạo, vị trí trận địa cọc và phát hiện Cao Quỳ",
    limits:
      "Nhận định về cọc ngang dòng chính khác bài năm 2013; bằng chứng chưa đủ để dựng hoạt cảnh chiến thuật. Chưa đối chiếu báo cáo khai quật gốc.",
  }),
  source({
    id: "nhat-le",
    title: "Dương Nhật Lễ [1369–1370]",
    author: "Hồ Bạch Thảo",
    publisher: "Diễn Đàn",
    year: 2021,
    url: "https://www.diendan.org/phe-binh-nghien-cuu/duong-nhat-le",
    type: "research",
    upstream:
      "Khâm định Việt sử thông giám cương mục và Minh thực lục (dẫn trong bài)",
    readLocation: "Đoạn mở đầu; các mục tháng 6/1369 và tháng 10–11/1370",
    limits:
      "Bài khảo cứu dẫn sử liệu, không phải bản sử gốc. Các lời chê trong sử là quan điểm của người biên soạn; không quy thành đánh giá trung lập.",
  }),
  source({
    id: "huyen-tran",
    title: "Công chúa Huyền Trân với xứ Huế",
    author: null,
    publisher: "Sở Văn hóa và Thể thao thành phố Huế",
    year: null,
    url: "https://svhttdl.hue.gov.vn/thong-tin-tu-lieu/cong-chua-huyen-tran-voi-xu-hue.html",
    type: "heritage",
    upstream: null,
    readLocation: "Đoạn ghi năm 1306, Huyền Trân–Chế Mân và hai châu Ô, Lý",
    limits:
      "Bài giới thiệu có yếu tố tưởng niệm và diễn giải cảm xúc; chỉ sử dụng mốc hôn nhân và địa danh. Chưa có atlas xác định ranh giới Ô, Lý.",
  }),
  source({
    id: "ho-reforms",
    title: "Hồ Quý Ly và những cải cách lớn về kinh tế",
    author: "Dương Tuấn",
    publisher: "Bảo tàng Lịch sử Quốc gia (đăng lại)",
    year: 2012,
    url: "https://baotanglichsu.vn/VI/Articles/3098/13166/ho-quy-ly-va-nhung-cai-cach-lon-ve-kinh-te.html",
    type: "museum",
    upstream: "kienthuc.net.vn",
    readLocation: "Đoạn tiền giấy (1396), mục ‘Chính sách hạn điền’ (1397)",
    limits:
      "Tách niên đại chính sách khỏi nhận định ‘đi trước thời đại’. Chưa đối chiếu tỷ lệ đổi tiền và hiệu quả cải cách.",
  }),
  source({
    id: "ho-chronology",
    title: "XV. Nhà Hồ (1400–1407): quốc hiệu Đại Ngu, kinh đô Tây Đô",
    author: null,
    publisher: "Ủy ban Nhà nước về người Việt Nam ở nước ngoài",
    year: null,
    url: "https://scov.gov.vn/dat-nuoc-con-nguoi/tom-tat-bien-nien-su-vn/xv.-nha-ho-1400-1407-quoc-hieu-dai-ngu-kinh-do-tay-do-thanh-hoa-.html",
    type: "chronology",
    upstream: "quehuongonline.vn",
    readLocation: "Tiêu đề và mục Hồ Quý Ly, Hồ Hán Thương",
    limits:
      "Chỉ dùng niên đại, quốc hiệu, kinh đô. Không dùng lời phán xét và con số quân đội; đoạn nói Thiếu Đế bị giết mâu thuẫn nguồn khác và không được xuất bản.",
  }),
  source({
    id: "unesco-thang-long",
    title: "Central Sector of the Imperial Citadel of Thang Long — Hanoi",
    author: "UNESCO World Heritage Centre",
    publisher: "UNESCO",
    year: null,
    url: "https://whc.unesco.org/en/list/1328/",
    type: "heritage",
    upstream: null,
    readLocation: "Description; tọa độ N21 2 15.072 E105 50 19.043",
    limits:
      "Tọa độ di sản hiện đại là điểm đại diện kinh thành, không phải tọa độ điện Thiên An hoặc toàn bộ Thăng Long trung đại.",
  }),
  source({
    id: "unesco-yen-tu",
    title: "Yen Tu–Vinh Nghiem–Con Son, Kiep Bac Complex",
    author: "UNESCO World Heritage Centre",
    publisher: "UNESCO",
    year: null,
    url: "https://whc.unesco.org/en/list/1732/",
    type: "heritage",
    upstream: null,
    readLocation: "Description: Trúc Lâm, các di tích gắn với triều Trần",
    limits:
      "Giới thiệu di sản hiện đại, không xác lập mọi chi tiết của sinh hoạt tôn giáo thế kỷ XIII.",
  }),
  source({
    id: "unesco-yen-tu-map",
    title: "Yen Tu complex — Geographical data",
    author: "UNESCO World Heritage Centre",
    publisher: "UNESCO",
    year: null,
    url: "https://whc.unesco.org/en/list/1732/maps/",
    type: "geography",
    upstream: null,
    readLocation:
      "Bảng tọa độ: 1732-001 Thái Miếu; 1732-002 Kiếp Bạc; 1732-003 chùa Lân",
    limits:
      "Điểm di sản hiện đại; không chứng minh chính xác địa điểm sự kiện quân sự hoặc đường biên lịch sử.",
  }),
  source({
    id: "unesco-ho",
    title: "Citadel of the Ho Dynasty — Geographical data",
    author: "UNESCO World Heritage Centre",
    publisher: "UNESCO",
    year: null,
    url: "https://whc.unesco.org/en/list/1358/maps/",
    type: "geography",
    upstream: null,
    readLocation: "Bảng: 1358-001 Inner Citadel, N20 4 41.00 E105 36 17.00",
    limits: "Tọa độ di tích hiện đại, không phải polygon lãnh thổ của nhà Hồ.",
  }),
  source({
    id: "met-bowl",
    title: "Bowl with iron-brown floral décor — object 2021.182",
    author: "The Metropolitan Museum of Art",
    publisher: "The Met",
    year: null,
    url: "https://www.metmuseum.org/art/collection/search/853979",
    type: "collection",
    upstream: null,
    readLocation:
      "Artwork Details: date, medium, culture, credit line; nhãn Public Domain",
    limits:
      "Niên đại của bảo tàng: thế kỷ XIV–đầu XV; nhãn Period ‘Tran or Ly Dynasty’ cần đọc thận trọng. Không gán chắc vật này cho một vua hoặc một năm.",
  }),
  source({
    id: "natural-earth",
    title: "Natural Earth — Terms of Use",
    author: "Natural Earth contributors",
    publisher: "Natural Earth",
    year: null,
    url: "https://www.naturalearthdata.com/about/terms-of-use/",
    type: "geography",
    upstream: null,
    readLocation: "Terms of Use: dữ liệu vector và raster thuộc public domain",
    limits:
      "Địa lý hiện đại, khái quát hóa ở tỷ lệ 1:50 triệu; không phải dữ liệu ranh giới lịch sử.",
  }),
];

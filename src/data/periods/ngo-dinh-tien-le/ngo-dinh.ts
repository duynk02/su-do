import {
  date,
  type Claim,
  type HistoricalEvent,
  type Person,
  type Relationship,
  type RoleTenure,
  type Source,
} from "../../schema";
import { claim, type Ref } from "../../claim-store";

const source = (
  record: Pick<Source, "id" | "title" | "publisher" | "url" | "type" | "readLocation" | "limits"> &
    Partial<Pick<Source, "author" | "year" | "edition" | "upstream">>,
): Source => ({
  author: null,
  year: null,
  edition: null,
  upstream: null,
  accessed: "2026-11-18",
  ...record,
});

export const ngoDinhSources: Source[] = [
  source({
    id: "nd-annals-ngo",
    title: "Đại Việt sử ký toàn thư — Ngoại kỷ V, từ Dương Đình Nghệ đến cuối thời Ngô",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vietnamthuquan.eu/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-9",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Ngoại kỷ quyển V; trang ghi đăng lại từ informatik.uni-leizig.de",
    readLocation: "Tờ 18a–20a: 931, 937, Bạch Đằng 938; 20b–21a: Ngô Quyền; 21b–23a: Dương Tam Kha; 23a–25a: hai vương; 25a–26a: sứ quân, Xương Xí, Trần Lãm và Đinh Bộ Lĩnh.",
    limits: "Bản đánh máy chưa xác nhận đủ ấn bản/dịch giả, có lỗi chữ và lời bình đời sau. Không dùng điềm lạ, lời thoại, số quân hay phép đổi lịch làm dữ kiện đã xác minh. Dương Tam Kha giành quyền sau Ngô Quyền mất 944 nhưng niên mục riêng bắt đầu 945; xưng Nam Tấn Vương ở 951, khác mốc lật Tam Kha 950. Ngô Xương Xí được xếp mục sứ quân, không phải một vua thống nhất toàn quốc.",
  }),
  source({
    id: "nd-annals-dinh",
    title: "Đại Việt sử ký toàn thư — Bản kỷ I, triều Đinh và chuyển sang nhà Tiền Lê",
    publisher: "Việt Nam Thư Quán — bản chuyển dạng",
    url: "https://thuvien.vietnamthuquan.eu/TacPham/dai-viet-su-ky-toan-thu-2585/chuong-10",
    type: "chronology",
    upstream: "Đại Việt sử ký toàn thư, Bản kỷ quyển I, phần a; trang ghi đăng lại từ informatik.uni-leizig.de",
    readLocation: "Tờ 1a–3a: thân thế, Đại Cồ Việt, Hoa Lư; 3b–4b: bộ máy 971, sứ bộ và sắc phong 972–975; 5a–7a: Hạng Lang, vụ giết hai cha con năm 979, Phế Đế; 7a–8a: Nguyễn Bặc, Đinh Điền, Phạm Hạp; 10a trở đi: Lê Hoàn và biến động 980.",
    limits: "Ghi chép được biên soạn nhiều thế kỷ sau sự kiện, không phải hồ sơ điều tra vụ án 979. Giữ cách quy trách nhiệm của sử liệu và tách điềm báo/lời bình. Phần đầu Phế Đế ghi 974–991, không thống nhất với niên mục 1001 ở phần Đại Hành (nguồn tl-annals). Không áp niên hiệu Thái Bình từ 968; sử đặt từ 970.",
  }),
  source({
    id: "nd-ngo-museum",
    title: "Ngô Quyền và chiến thắng Bạch Đằng năm 938",
    author: "Lê Khiêm (tổng hợp)",
    publisher: "Bảo tàng Lịch sử Quốc gia",
    year: 2013,
    url: "https://baotanglichsu.vn/VI/Articles/3098/13934/ngo-quyen-va-chien-thang-bach-djang-nam-938.html",
    type: "museum",
    readLocation: "Từ tiểu sử mở đầu đến Dương Đình Nghệ 931, Kiều Công Tiễn 937, kế hoạch cọc–thủy triều 938 và đoạn cuối về xưng vương, Cổ Loa 939; đã xem mục nguồn tham khảo.",
    limits: "Bài tổng hợp dẫn Phan Huy Lê và Lê Năng Hiển, không thay toàn văn hai nghiên cứu. Năm sinh 897 khác cách ghi 898 trong bản Toàn thư đang dùng. Không lấy sơ đồ minh họa làm tọa độ bãi cọc hoặc khẳng định chi tiết cánh quân chỉ từ tranh.",
  }),
  source({
    id: "nd-history-volume2",
    title: "Lịch sử Việt Nam, tập 2: Từ thế kỷ X đến thế kỷ XIV",
    author: "Trần Thị Vinh (chủ biên); Hà Mạnh Khoa biên soạn chương II–III",
    publisher: "Viện Sử học — Nhà xuất bản Khoa học xã hội; bản số hóa tại Thư viện tỉnh Quảng Ngãi",
    year: 2013,
    edition: "Trang tên Hà Nội–2013; PDF phần 001–192",
    url: "https://thuvientinh.quangngai.gov.vn/wp-content/uploads/2020/12/001-192.pdf",
    type: "research",
    readLocation: "Trang tên và phân công tác giả; trang in 66–69: họ Ngô–Dương và đồng trị; 73–76: các thế lực vùng, Trần Lãm và thống nhất; 81–83: bộ máy triều Đinh; 90–92: khảo cổ Hoa Lư, cột kinh và xã hội; 93–96: khủng hoảng 979 và nội chiến.",
    limits: "Là công trình tổng hợp nghiên cứu, nhiều đoạn sử dụng cùng Toàn thư nên không mặc nhiên là chứng cứ độc lập thứ hai. Các phân tích cấu trúc xã hội được ghi là diễn giải. Không dùng mọi chi tiết gia phả, số quân hoặc tình tiết có dấu hỏi trong chú thích như dữ kiện chắc chắn.",
  }),
  source({
    id: "nd-dinh-pillars",
    title: "Những giá trị nổi bật của Bảo vật quốc gia – Sưu tập cột kinh Phật thời Đinh ở Bảo tàng Ninh Bình",
    publisher: "Sở Văn hóa và Thể thao tỉnh Ninh Bình",
    year: 2024,
    url: "https://vhtt.ninhbinh.gov.vn/vi/di-san-van-hoa/nhung-gia-tri-noi-bat-cua-bao-vat-quoc-gia-suu-tap-cot-kinh-phat-thoi-dinh-o-bao-tang-ninh-binh-1263.html",
    type: "heritage",
    readLocation: "Các mục cấu tạo, minh văn và lạc khoản; khoảng niên đại 973–979; tên Đinh Khuông Liễn; bản dịch cột ký hiệu 667–Đ26 và ý nghĩa đối với Phật giáo thế kỷ X.",
    limits: "Bài cơ quan quản lý giới thiệu hiện vật và bản dịch, không phải công bố phiên bản chữ Hán đầy đủ. Nội dung tự biện hộ của người dựng cột phải đọc theo ngữ cảnh; không xem là lời phán xét trung lập về Hạng Lang hoặc gán cùng một lý do cho mọi cột 973–979.",
  }),
  source({
    id: "nd-nguyen-bac",
    title: "Ai là tể tướng đầu tiên trong lịch sử Việt Nam?",
    author: "Trịnh Dương",
    publisher: "Bảo tàng Lịch sử Quốc gia — đăng lại kienthuc.net.vn",
    year: 2014,
    url: "https://baotanglichsu.vn/vi/Articles/3098/15741/ai-la-te-tuong-djau-tien-trong-lich-su-viet-nam.html",
    type: "museum",
    upstream: "kienthuc.net.vn; dòng nguồn cuối bài",
    readLocation: "Đoạn lập chính quyền và Định quốc công 971; đoạn Nguyễn Bặc cùng Đinh Điền, Phạm Hạp chống Lê Hoàn; ảnh có chú thích tượng thờ Nguyễn Bặc.",
    limits: "Bài phổ thông đăng lại có chi tiết truyền tụng và lỗi can chi của năm 951. Chỉ dùng vai trò và xung đột đã đối chiếu chính sử; không áp danh xưng tể tướng đầu tiên hoặc gia thế, ngày sinh như kết luận đã được nghiên cứu toàn diện.",
  }),
];

const passage = (id: string, text: string, refs: Ref[], kind: Claim["kind"] = "chronicle", note?: string) =>
  claim(id, text, refs, { kind, ...(note ? { note } : {}) });
const ngo = (location: string): Ref => ["nd-annals-ngo", location];
const dinh = (location: string): Ref => ["nd-annals-dinh", location];
const study = (location: string): Ref => ["nd-history-volume2", location];
const genealogy = (location: string): Ref => ["the-thu", location];

export const ngoDinhClaimIds = {
  origins: passage("nd-origins", "Trước thời Ngô, Dương Đình Nghệ đã đánh đuổi quân Nam Hán năm 931 và nắm quyền với chức Tiết độ sứ. Năm 937, ông bị thuộc tướng Kiều Công Tiễn giết để đoạt quyền. Ngô Quyền, người từng được giao cai quản Ái Châu và là con rể Đình Nghệ, đưa quân ra chống Công Tiễn.", [ngo("Tờ 18a–19a: các năm 931, 937–938"), ["nd-ngo-museum", "Các đoạn bối cảnh 930–938"]]),
  bachDangContext: passage("nd-bach-dang-context", "Kiều Công Tiễn cầu viện Nam Hán khi bị Ngô Quyền tiến đánh. Vua Nam Hán sai con là Hoằng Tháo đưa thủy quân sang; Công Tiễn đã bị giết trước khi đoàn quân ấy tới.", [ngo("Tờ 19a–19b: Mậu Tuất 938")]),
  bachDangDevelopment: passage("nd-bach-dang-development", "Sử chép Ngô Quyền bố trí cọc ngầm và dựa vào thủy triều trên sông Bạch Đằng. Thuyền nhẹ nhử quân Nam Hán tiến vào khi nước lên; lúc nước rút, quân của ông phản công, khiến đoàn thuyền đối phương mắc trong trận địa.", [ngo("Tờ 19b–20a: kế hoạch và diễn biến trận đánh"), ["nd-ngo-museum", "Các đoạn thế trận cọc ngầm, nghi binh và thủy triều"]]),
  bachDangResult: passage("nd-bach-dang-result", "Quân Nam Hán thất bại, Hoằng Tháo tử trận và lực lượng tiếp ứng rút lui. Chiến thắng năm 938 tạo điều kiện để Ngô Quyền xây dựng vương quyền độc lập ở Cổ Loa vào năm sau.", [ngo("Tờ 20a–21a: kết quả trận đánh, xưng vương 939"), ["nd-ngo-museum", "Đoạn ý nghĩa chiến thắng và định đô 939"]]),
  coronation: passage("nd-coronation", "Mùa xuân năm 939, Ngô Quyền xưng vương, chọn Cổ Loa làm kinh đô, lập Dương thị làm hoàng hậu và đặt quan chức, nghi lễ, phẩm phục triều đình. Đây là mốc tổ chức vương triều sau chiến thắng Bạch Đằng, khác với năm diễn ra trận đánh.", [ngo("Tờ 20b–21a: Kỷ Hợi 939"), ["nd-ngo-museum", "Đoạn cuối về Cổ Loa và xưng vương"]]),
  succession944: passage("nd-succession-944", "Ngô Quyền mất năm 944. Dương Tam Kha, người có quan hệ anh/em với Dương hoàng hậu, nhận việc giúp các con vua nhưng nắm lấy quyền và xưng Bình Vương. Ngô Xương Ngập phải lánh nạn, còn Xương Văn được Tam Kha nhận nuôi.", [ngo("Tờ 21a–22a: Ngô Quyền mất và Dương Tam Kha"), study("Trang in 66–68: họ Ngô–Dương và biến động quyền lực")], "chronicle", "Sự giành quyền gắn với năm 944; niên mục riêng của Tam Kha trong bản Toàn thư bắt đầu Ất Tỵ 945. Nguồn giữ cả cách gọi anh và em của Dương hậu, nên không chọn một thứ bậc chắc chắn."),
  recovery: passage("nd-recovery", "Năm 950, Ngô Xương Văn cùng Dương Cát Lợi và Đỗ Cảnh Thạc quay quân về lật đổ Dương Tam Kha. Tam Kha không bị giết mà bị giáng làm Chương Dương công. Niên mục năm 951 ghi Xương Văn xưng Nam Tấn Vương và đón anh về cùng coi chính sự.", [ngo("Tờ 22b–23b: Canh Tuất 950, Tân Hợi 951"), study("Trang in 68: phục hồi vương quyền")]),
  sharedRule: passage("nd-shared-rule", "Ngô Xương Văn và Ngô Xương Ngập cùng giữ vương quyền từ năm 951, mang hiệu Nam Tấn Vương và Thiên Sách Vương. Xương Ngập mất năm 954; Xương Văn tiếp tục cầm quyền đến khi tử trận năm 965. Giai đoạn 951–954 có hai người cùng trị vì.", [ngo("Tờ 23a–24b: hai vương, năm 954 và 965"), genealogy("Chương III, phần chính quyền Ngô Vương — Hậu Ngô Vương")]),
  fragmentation: passage("nd-fragmentation", "Sau khi Ngô Xương Văn mất năm 965, quyền lực trung ương suy yếu và các thủ lĩnh địa phương tranh giữ những vùng khác nhau. Sử gọi giai đoạn phân tranh này là mười hai sứ quân; Ngô Xương Xí giữ Bình Kiều, Trần Lãm giữ Bố Hải Khẩu, còn Đinh Bộ Lĩnh phát triển lực lượng từ Hoa Lư.", [ngo("Tờ 24b–26a: năm 965 và mục Ngô sứ quân"), study("Trang in 73–75: nguồn gốc và địa bàn các thế lực vùng")]),
  unification: passage("nd-unification", "Đinh Bộ Lĩnh liên kết với Trần Lãm rồi tiếp nhận lực lượng của ông, kết hợp thu phục và đánh dẹp các thế lực cát cứ. Năm 968, Bộ Lĩnh lên ngôi hoàng đế, đặt quốc hiệu Đại Cồ Việt và xây dựng kinh đô Hoa Lư.", [ngo("Tờ 25b–26a: Trần Lãm và Đinh Bộ Lĩnh"), dinh("Tờ 1a–3a: Mậu Thìn 968"), study("Trang in 75–76: quá trình thống nhất")]),
  government: passage("nd-government", "Triều Đinh đặt niên hiệu Thái Bình từ năm 970. Năm 971, sử ghi việc định cấp bậc văn võ và tăng đạo: Nguyễn Bặc làm Định quốc công, Lưu Cơ coi hình án, Lê Hoàn giữ chức Thập đạo tướng quân; Ngô Chân Lưu được ban hiệu Khuông Việt đại sư.", [dinh("Tờ 3a–4a: các năm 970–971"), study("Trang in 81–82: tổ chức quan lại")]),
  diplomacy: passage("nd-diplomacy", "Đinh Liễn mang tước Nam Việt Vương và giữ vai trò quan trọng trong bang giao với nhà Tống. Ông đi sứ năm 972, trở về năm 973; đến năm 975 được phía Tống gia phong Giao Chỉ Quận Vương. Tước phong trong quan hệ đối ngoại không đồng nghĩa với việc ông thay cha giữ ngôi hoàng đế trong nước.", [dinh("Tờ 3a–4b: phong Nam Việt Vương 969, sứ bộ 972–973 và gia phong 975")]),
  scripture: passage("nd-scripture", "Các cột kinh Phật do Đinh Liễn cho dựng ở Hoa Lư có niên đại trong khoảng 973–979. Minh văn ghi tên Đinh Khuông Liễn, tước vị, lời cầu chúc và việc cầu siêu; một cột nhắc đến người em đã bị ông làm hại. Những văn bản trên đá bổ sung tiếng nói đương thời cho các ghi chép sử học về sau.", [["nd-dinh-pillars", "Các mục niên đại, lạc khoản cột 667–Đ26 và tên Đinh Khuông Liễn"], study("Trang in 90–91: cột kinh và sinh hoạt Phật giáo")], "evidence"),
  succession978: passage("nd-succession-978", "Năm 978, Đinh Tiên Hoàng lập người con nhỏ Hạng Lang làm thái tử và phong Đinh Toàn làm Vệ Vương. Sử chép Đinh Liễn, người con trưởng từng cùng cha gây dựng lực lượng, bất bình và sai giết Hạng Lang vào mùa xuân năm 979.", [dinh("Tờ 4b–5b: Mậu Dần 978 và mùa xuân Kỷ Mão 979"), ["nd-dinh-pillars", "Đoạn lạc khoản cầu siêu cho em trai"]]),
  crisis979: passage("nd-crisis-979", "Mùa đông năm 979, Đinh Tiên Hoàng và Đinh Liễn cùng bị giết. Toàn thư quy việc sát hại cho nội nhân Đỗ Thích và chép Nguyễn Bặc bắt, giết người này. Hai nhân vật chủ chốt qua đời trong cùng biến cố, sau việc thái tử Hạng Lang bị giết đầu năm, khiến triều đình rơi vào khủng hoảng kế vị.", [dinh("Tờ 5b–7a: vụ giết vua, Liễn và lên ngôi của Toàn"), study("Trang in 93–95: khủng hoảng vương triều")], "chronicle", "Trình bày theo cách quy trách nhiệm của sử liệu; không đưa điềm sao rơi hoặc giả thuyết âm mưu chưa chứng minh thành dữ kiện."),
  minority: passage("nd-minority", "Đinh Toàn, con Đinh Tiên Hoàng và Dương thái hậu, lên ngôi khi còn nhỏ sau biến cố năm 979. Lê Hoàn nắm quân đội và nhiếp chính. Nhà Đinh kết thúc khi Hoàn được tôn làm vua năm 980; Toàn trở lại tước Vệ Vương.", [dinh("Tờ 7a–8a: Phế Đế, nhiếp chính; mục Canh Thìn 980: tôn Lê Hoàn"), ["tl-annals", "Tờ 15b: Dương thị là vợ Tiên Hoàng, mẹ Vệ Vương Toàn"]]),
  civilConflict: passage("nd-civil-conflict", "Trong thời gian Đinh Toàn còn nhỏ và Lê Hoàn nhiếp chính, Nguyễn Bặc, Đinh Điền và Phạm Hạp đem quân chống Hoàn vì lo ngôi vua họ Đinh bị đe dọa. Lực lượng này thất bại: Điền tử trận, Bặc bị bắt rồi giết, Hạp cũng bị bắt. Các sử gia đời sau đánh giá khác nhau về tính chính đáng của hai phía.", [dinh("Tờ 7a–8a: hai đường thủy bộ chống Lê Hoàn và kết quả"), ["tl-annals", "Tờ 14b–15a: lời bàn khác nhau của Lê Văn Hưu và Ngô Sĩ Liên"], study("Trang in 95–96: xung đột sau biến cố 979")], "chronicle", "Nguồn thuật lại xung đột trong đoạn cuối thời Đinh, không xác định cùng một ngày tháng cho mọi nhân vật. Không lặp lời gọi loạn tặc hoặc trung nghĩa như sự phân loại khách quan."),
  overview: passage("nd-overview", "Từ vương triều Ngô ở Cổ Loa đến triều Đinh ở Hoa Lư, thế kỷ X chứng kiến việc xây dựng chính quyền độc lập, khủng hoảng kế vị và phân tranh giữa các thế lực vùng. Quốc hiệu Đại Cồ Việt có từ năm 968; nền quân chủ được củng cố qua tổ chức triều đình, ngoại giao và những mạng lưới tôn giáo. Việc một triều đại ra đời không làm chấm dứt ngay các xung đột quyền lực.", [ngo("Tờ 20b–26a: vương quyền và phân tranh"), dinh("Tờ 2b–8a: quốc hiệu, bộ máy và xung đột"), study("Chương II, trang in 66–96")], "interpretation"),
};

const section = (id: string, title: string, text: string, refs: Ref[], kind: Claim["kind"] = "chronicle", note?: string) => ({
  title,
  claimIds: [passage(id, text, refs, kind, note)],
});

export const ngoDinhPeople: Person[] = [
  {
    id: "ngo-quyen", periodIds: ["the-ky-x"], name: "Ngô Quyền", personalName: "Ngô Quyền",
    aliases: ["Tiền Ngô Vương", "Ngô Vương"], title: "Người dựng vương triều Ngô · Người chỉ huy chiến thắng Bạch Đằng",
    life: "898–944 (Toàn thư; có nguồn ghi 897)", contextYear: 939,
    summaryClaimIds: [passage("nd-bio-ngo-quyen", "Ngô Quyền là người chỉ huy chiến thắng Bạch Đằng năm 938 và người mở đầu vương triều Ngô. Từng làm tướng của Dương Đình Nghệ ở Ái Châu, ông tiến đánh Kiều Công Tiễn rồi chống quân Nam Hán. Năm 939, ông xưng vương và định đô ở Cổ Loa, tổ chức triều đình riêng. Ông mất năm 944; việc kế vị sau đó dẫn tới biến động giữa hai họ Ngô và Dương.", [ngo("Tờ 19a–22a: Bạch Đằng, Tiền Ngô Vương và Tam Kha"), ["nd-ngo-museum", "Tiểu sử và đoạn định đô Cổ Loa"]])],
    biographySections: [
      section("nd-bio-ngo-quyen-family", "Từ Đường Lâm đến Ái Châu", "Toàn thư ghi Ngô Quyền là con châu mục Ngô Mân, người Đường Lâm. Ông làm thuộc tướng của Dương Đình Nghệ, được gả con gái và giao quản Ái Châu. Mối gắn bó giữa quân sự và hôn nhân nối họ Ngô với gia đình đang đứng đầu chính quyền tự chủ trước năm 938.", [ngo("Tờ 20b: thân thế và quan hệ với Đình Nghệ")]),
      { title: "Bạch Đằng và việc xây dựng vương quyền", claimIds: [ngoDinhClaimIds.bachDangDevelopment, ngoDinhClaimIds.coronation] },
      section("nd-bio-ngo-quyen-dates", "Niên đại đời người", "Bản Toàn thư đang dẫn ghi khoảng đời 898–944, còn bài tổng hợp của Bảo tàng Lịch sử Quốc gia dùng 897–944. Cả hai đều đặt năm mất ở 944; mốc 938 là chiến thắng, còn 939 là năm xưng vương. Các mốc này cần được đọc riêng thay vì gộp thành một ngày lập triều.", [ngo("Tờ 20a–21a: niên đại và xưng vương"), ["nd-ngo-museum", "Dòng niên đại mở đầu và đoạn cuối"]], "interpretation"),
    ],
    eventIds: ["ngo-bach-dang-938", "ngo-xung-vuong-939", "ngo-bien-dong-944"],
  },
  {
    id: "duong-dinh-nghe", periodIds: ["the-ky-x"], name: "Dương Đình Nghệ", personalName: "Dương Đình Nghệ",
    aliases: ["Dương Diên Nghệ"], title: "Tiết độ sứ trước thời Ngô · Người khôi phục quyền tự chủ năm 931",
    life: "Chưa rõ năm sinh – 937", contextYear: 937,
    summaryClaimIds: [passage("nd-bio-duong-dinh-nghe", "Dương Đình Nghệ là thủ lĩnh từ Ái Châu đã đánh đuổi quân Nam Hán khỏi Đại La năm 931, rồi tự xưng Tiết độ sứ. Ngô Quyền từng làm tướng và là con rể của ông. Năm 937, thuộc tướng Kiều Công Tiễn giết Đình Nghệ để chiếm quyền; biến cố ấy dẫn tới cuộc tiến quân của Ngô Quyền và cuộc can thiệp của Nam Hán năm 938.", [ngo("Tờ 18a–20b: các năm 931, 937 và thân thế Ngô Quyền"), ["nd-ngo-museum", "Các đoạn Dương Đình Nghệ và Kiều Công Tiễn"]])],
    biographySections: [
      section("nd-bio-duong-dinh-nghe-position", "Quyền tự chủ trước vương triều Ngô", "Đình Nghệ dùng danh hiệu Tiết độ sứ sau khi đẩy lùi lực lượng Nam Hán. Ngô Quyền tiếp nối cuộc đấu tranh giữ quyền tự chủ nhưng đến năm 939 chuyển sang xưng vương. Đình Nghệ vì thế xuất hiện trong câu chuyện mở đầu thời Ngô, dù ông đã mất trước khi vương triều được lập.", [ngo("Tờ 18a–21a: Đình Nghệ và Ngô Quyền")]),
      section("nd-bio-duong-dinh-nghe-name", "Hai cách ghi tên", "Tư liệu có cả cách viết Dương Đình Nghệ và Dương Diên Nghệ. Chú thích của bản Toàn thư đang dùng nêu sự khác nhau giữa các bộ sử và khả năng nhầm nét chữ; hồ sơ gộp hai cách gọi vào cùng một người.", [ngo("Chú thích 219 về chữ Đình và Diên")], "evidence"),
    ],
    eventIds: ["ngo-bach-dang-938"],
  },
  {
    id: "kieu-cong-tien", periodIds: ["the-ky-x"], name: "Kiều Công Tiễn", personalName: "Kiều Công Tiễn",
    aliases: ["Kiểu Công Tiễn"], title: "Người chiếm quyền sau Dương Đình Nghệ", life: "Chưa rõ năm sinh – 938", contextYear: 938,
    summaryClaimIds: [passage("nd-bio-kieu-cong-tien", "Kiều Công Tiễn là thuộc tướng đã giết Dương Đình Nghệ năm 937 để đoạt chức Tiết độ sứ. Khi Ngô Quyền đưa quân từ Ái Châu ra đánh, ông cầu cứu Nam Hán. Công Tiễn bị giết trước khi quân cứu viện đến; đoàn thủy quân do Hoằng Tháo chỉ huy sau đó vẫn tiến vào Bạch Đằng và bị đánh bại.", [ngo("Tờ 19a–20a: Đinh Dậu 937, Mậu Tuất 938"), ["nd-ngo-museum", "Các đoạn bối cảnh cuộc xâm lược lần thứ hai"]])],
    biographySections: [
      section("nd-bio-kieu-cong-tien-context", "Biến cố bên trong và cuộc can thiệp bên ngoài", "Việc cầu viện khiến tranh chấp quyền lực tại Đại La gắn với ý đồ can thiệp của Nam Hán. Toàn thư tách hai diễn biến: Ngô Quyền trừ Công Tiễn trước, rồi chuẩn bị đánh đoàn quân sang sau. Công Tiễn không phải người trực tiếp chỉ huy quân Nam Hán trong trận Bạch Đằng.", [ngo("Tờ 19a–19b: Công Tiễn đã chết khi Hoằng Tháo tiến vào")]),
    ], eventIds: ["ngo-bach-dang-938"],
  },
  {
    id: "duong-hau-nha-ngo", periodIds: ["the-ky-x"], name: "Dương hoàng hậu nhà Ngô",
    aliases: ["Dương thị", "Dương quốc mẫu", "Dương Thị Như Ngọc"], title: "Con Dương Đình Nghệ · Hoàng hậu của Ngô Quyền",
    life: "Thế kỷ X · chưa rõ năm sinh, năm mất", contextYear: 939,
    summaryClaimIds: [passage("nd-bio-duong-hau-ngo", "Dương hoàng hậu nhà Ngô là con gái Dương Đình Nghệ, được gả cho Ngô Quyền và được lập làm hoàng hậu năm 939. Bà thuộc nhánh gia đình nối họ Dương với hai người con nối nghiệp họ Ngô là Xương Ngập và Xương Văn. Dương Tam Kha là anh hoặc em của bà theo những cách ghi được Toàn thư lưu lại; đây là quan hệ giúp giải thích vì sao ông được giao giúp các con vua.", [ngo("Tờ 20b–22a: gả con gái, lập Dương thị, Tam Kha"), genealogy("Chương III, phần chính quyền Ngô Vương — Tiền Ngô Vương và Hậu Ngô Vương")])],
    biographySections: [
      section("nd-bio-duong-hau-ngo-distinction", "Nhánh họ Dương trong việc kế vị", "Sau khi Ngô Quyền mất, Dương Tam Kha giữ quyền còn các con vua ở những hoàn cảnh khác nhau: Xương Ngập lánh nạn, Xương Văn được nhận nuôi, Nam Hưng và Càn Hưng còn nhỏ theo Dương quốc mẫu. Quan hệ thân tộc gần gũi không ngăn được tranh chấp vương quyền.", [ngo("Tờ 21b–22a: Dương quốc mẫu và các con Ngô Quyền")]),
    ],
    note: "Dương thị trong vương triều Ngô là hồ sơ riêng với Dương Vân Nga, hoàng hậu nhà Đinh và nhà Tiền Lê. Tên Như Ngọc được một số tài liệu dùng, còn Toàn thư ở đoạn này chỉ ghi Dương thị.",
    eventIds: ["ngo-xung-vuong-939", "ngo-bien-dong-944"],
  },
  {
    id: "duong-tam-kha", periodIds: ["the-ky-x"], name: "Dương Tam Kha", personalName: "Dương Tam Kha",
    aliases: ["Bình Vương", "Dương Bình Vương", "Chương Dương công"], title: "Người giữ vương quyền giữa hai giai đoạn triều Ngô",
    life: "Thế kỷ X · chưa rõ năm sinh, năm mất", contextYear: 945,
    summaryClaimIds: [passage("nd-bio-duong-tam-kha", "Dương Tam Kha là người trong gia đình Dương hoàng hậu, được Ngô Quyền giao giúp các con trước lúc mất. Ông nắm quyền và xưng Bình Vương, khiến Xương Ngập phải chạy trốn; Xương Văn được ông nhận làm con nuôi. Năm 950, Xương Văn cùng các tướng quay quân lật đổ ông. Tam Kha được tha chết, giáng làm Chương Dương công và cấp thực ấp.", [ngo("Tờ 21b–23a: toàn mục Dương Tam Kha"), study("Trang in 66–68: chuyển quyền sau 944")])],
    biographySections: [
      { title: "Quan hệ thân tộc và việc giành quyền", claimIds: [ngoDinhClaimIds.succession944] },
      { title: "Bị lật đổ và được tha", claimIds: [ngoDinhClaimIds.recovery] },
    ],
    note: "Có mặt trong danh sách người giữ ngôi vì từng trực tiếp nắm vương quyền. Toàn thư đặt niên mục riêng từ 945; biến cố được kể ngay sau khi Ngô Quyền mất năm 944. Không có niên đại đời người chắc chắn trong nguồn đang dẫn.",
    eventIds: ["ngo-bien-dong-944", "ngo-khoi-phuc-950"],
  },
  {
    id: "ngo-xuong-ngap", periodIds: ["the-ky-x"], name: "Ngô Xương Ngập", personalName: "Ngô Xương Ngập",
    aliases: ["Thiên Sách Vương"], title: "Thiên Sách Vương · Đồng trị với Ngô Xương Văn",
    life: "Chưa rõ năm sinh – 954", contextYear: 951,
    summaryClaimIds: [passage("nd-bio-ngo-xuong-ngap", "Ngô Xương Ngập là con trưởng của Ngô Quyền. Sau khi cha mất và Dương Tam Kha chiếm quyền, ông trốn đến Trà Hương nhờ Phạm Lệnh Công che chở. Năm 951, người em Xương Văn đón ông về cùng coi việc nước; ông xưng Thiên Sách Vương. Xương Ngập mất năm 954, kết thúc giai đoạn hai anh em cùng giữ vương quyền.", [ngo("Tờ 21b–24b: chạy trốn, trở về và năm mất"), genealogy("Chương III — Hậu Ngô Vương")])],
    biographySections: [
      section("nd-bio-ngo-xuong-ngap-exile", "Từ người lánh nạn trở lại triều đình", "Sử chép Phạm Lệnh Công nhiều lần che giấu Xương Ngập khi Tam Kha sai người truy tìm. Việc ông trở về chỉ diễn ra sau khi Xương Văn đã lật đổ Tam Kha; đó không phải một lần kế vị diễn ra liên tục ngay từ năm 944.", [ngo("Tờ 21b–23b: Phạm Lệnh Công và phục hồi họ Ngô")]),
      { title: "Hai vương cùng coi chính sự", claimIds: [ngoDinhClaimIds.sharedRule] },
    ], eventIds: ["ngo-bien-dong-944", "ngo-khoi-phuc-950", "ngo-phan-tranh-965"],
  },
  {
    id: "ngo-xuong-van", periodIds: ["the-ky-x"], name: "Ngô Xương Văn", personalName: "Ngô Xương Văn",
    aliases: ["Nam Tấn Vương", "Hậu Ngô Vương"], title: "Nam Tấn Vương · Người khôi phục vương quyền họ Ngô",
    life: "Chưa rõ năm sinh – 965", contextYear: 951,
    summaryClaimIds: [passage("nd-bio-ngo-xuong-van", "Ngô Xương Văn là con thứ của Ngô Quyền, từng được Dương Tam Kha nhận nuôi. Ông cùng các tướng lật đổ Tam Kha năm 950, rồi xưng Nam Tấn Vương năm 951 và mời anh là Xương Ngập cùng trị vì. Sau khi anh mất năm 954, Xương Văn tiếp tục giữ ngôi. Năm 965, ông bị trúng tên và tử trận khi đi đánh hai thôn Đường, Nguyễn ở Thái Bình theo địa danh sử cũ.", [ngo("Tờ 22b–25a: Hậu Ngô Vương"), genealogy("Chương III — Hậu Ngô Vương")])],
    biographySections: [
      { title: "Phục hồi vương quyền và đồng trị", claimIds: [ngoDinhClaimIds.recovery, ngoDinhClaimIds.sharedRule] },
      section("nd-bio-ngo-xuong-van-last", "Kết thúc một trung tâm quyền lực", "Cái chết của Xương Văn làm triều đình Cổ Loa mất người đứng đầu có khả năng chi phối các thế lực vùng. Những lực lượng địa phương đã tồn tại trong thời Ngô tiếp tục phân tranh. Tên Thái Bình trong sử liệu về trận cuối đời ông không tự động tương đương tỉnh Thái Bình hiện nay.", [ngo("Tờ 24b–25b và chú thích 230 về hai thôn Đường, Nguyễn"), study("Trang in 68–69: biến cố 965")], "interpretation"),
    ], eventIds: ["ngo-khoi-phuc-950", "ngo-phan-tranh-965"],
  },
  {
    id: "ngo-xuong-xi", periodIds: ["the-ky-x"], name: "Ngô Xương Xí", personalName: "Ngô Xương Xí",
    aliases: [], title: "Người nối dòng họ Ngô · Sứ quân ở Bình Kiều",
    life: "Thế kỷ X · chưa rõ năm sinh, năm mất", contextYear: 966,
    summaryClaimIds: [passage("nd-bio-ngo-xuong-xi", "Ngô Xương Xí là con Ngô Xương Ngập và thuộc thế hệ cháu của Ngô Quyền. Sau khi Ngô Xương Văn mất, ông giữ vùng Bình Kiều và được kể trong danh sách mười hai sứ quân. Một số sách gọi ông là người nối nghiệp họ Ngô, nhưng phạm vi quyền lực thực tế chỉ là một thế lực địa phương trong giai đoạn phân tranh.", [ngo("Tờ 25a–25b: Ngô sứ quân"), genealogy("Chương III — Hậu Ngô Vương và danh sách 12 sứ quân, mục 01")])],
    biographySections: [
      section("nd-bio-ngo-xuong-xi-role", "Nối dòng họ không đồng nghĩa kiểm soát cả nước", "Xương Xí giúp nối phả hệ từ Ngô Quyền qua Xương Ngập tới giai đoạn cuối thời Ngô. Trong Toàn thư, ông nằm ở mục sứ quân bên cạnh các thủ lĩnh khác; không có một niên hiệu hay khoảng trị vì toàn quốc riêng được xác nhận trong đoạn này.", [ngo("Tờ 25a–26a: cấu trúc mục Ngô sứ quân"), genealogy("Chương III — danh sách 12 sứ quân")], "interpretation"),
    ], eventIds: ["ngo-phan-tranh-965", "dinh-thong-nhat-968"],
  },
  {
    id: "dinh-bo-linh", periodIds: ["the-ky-x"], name: "Đinh Tiên Hoàng", personalName: "Đinh Bộ Lĩnh",
    aliases: ["Đinh Bộ Lĩnh", "Vạn Thắng Vương", "Đại Thắng Minh Hoàng đế"], eraNames: ["Thái Bình"],
    title: "Người lập nhà Đinh · Hoàng đế Đại Cồ Việt", life: "924–979", contextYear: 968,
    summaryClaimIds: [passage("nd-bio-dinh-bo-linh", "Đinh Tiên Hoàng, thường gọi Đinh Bộ Lĩnh, là người thống nhất các thế lực sứ quân và mở đầu triều Đinh. Ông xuất thân từ gia đình Đinh Công Trứ, gây dựng lực lượng ở Hoa Lư và liên kết với Trần Lãm. Năm 968, ông xưng hoàng đế, đặt quốc hiệu Đại Cồ Việt, định đô Hoa Lư; niên hiệu Thái Bình được dùng từ 970. Năm 979, ông và người con trưởng Đinh Liễn cùng bị giết, để lại ngôi vua cho Đinh Toàn còn nhỏ.", [dinh("Tờ 1a–7a: thân thế, 968, 970 và biến cố 979"), genealogy("Chương III, phần triều Đinh — Đinh Tiên Hoàng")])],
    biographySections: [
      section("nd-bio-dinh-bo-linh-origins", "Hoa Lư và liên minh Trần Lãm", "Cha của Bộ Lĩnh là Đinh Công Trứ, từng làm tướng cho Dương Đình Nghệ rồi giữ chức ở Hoan Châu. Bộ Lĩnh lớn lên trong môi trường hào trưởng ở Hoa Lư. Việc đi theo Trần Lãm giúp ông tiếp nhận thêm lực lượng; quan hệ này được sử chép là nhận làm con nuôi, khác với huyết thống của gia đình họ Đinh.", [dinh("Tờ 1a: Đinh Công Trứ và mẹ họ Đàm"), ngo("Tờ 25b–26a: Trần Minh Công nhận Bộ Lĩnh")]),
      { title: "Quốc hiệu, kinh đô và tổ chức triều đình", claimIds: [ngoDinhClaimIds.unification, ngoDinhClaimIds.government] },
      { title: "Bất ổn kế vị trong hoàng gia", claimIds: [ngoDinhClaimIds.succession978, ngoDinhClaimIds.crisis979] },
    ],
    eventIds: ["ngo-phan-tranh-965", "dinh-thong-nhat-968", "dinh-trieu-chinh-971", "dinh-ngoai-giao-973", "dinh-bien-co-979"],
  },
  {
    id: "dinh-lien", periodIds: ["the-ky-x"], name: "Đinh Liễn", personalName: "Đinh Khuông Liễn",
    aliases: ["Đinh Khuông Liễn", "Nam Việt Vương"], title: "Nam Việt Vương · Người dựng cột kinh ở Hoa Lư",
    life: "Chưa rõ năm sinh – 979", contextYear: 973,
    summaryClaimIds: [passage("nd-bio-dinh-lien", "Đinh Liễn là con trưởng của Đinh Tiên Hoàng, từng cùng cha gây dựng lực lượng và được phong Nam Việt Vương. Ông đảm nhiệm bang giao với nhà Tống, đồng thời cho dựng các cột kinh Phật ở Hoa Lư. Việc Hạng Lang được chọn làm thái tử dẫn tới xung đột giữa các con vua; sử chép Liễn sai giết người em này năm 979. Cuối năm ấy, Liễn cùng cha bị sát hại.", [dinh("Tờ 3a–6a: tước Nam Việt Vương, bang giao và các vụ giết năm 979"), ["nd-dinh-pillars", "Niên đại cột kinh và tên Đinh Khuông Liễn"]])],
    biographySections: [
      { title: "Vai trò trong bang giao", claimIds: [ngoDinhClaimIds.diplomacy] },
      { title: "Cột kinh và tiếng nói của người đương thời", claimIds: [ngoDinhClaimIds.scripture] },
      { title: "Xung đột kế vị và biến cố cuối đời", claimIds: [ngoDinhClaimIds.succession978, ngoDinhClaimIds.crisis979] },
    ],
    note: "Tước Nam Việt Vương và danh hiệu được nhà Tống phong không tạo thành một nhiệm kỳ hoàng đế riêng ở Đại Cồ Việt.",
    eventIds: ["dinh-thong-nhat-968", "dinh-ngoai-giao-973", "dinh-cot-kinh-973", "dinh-bien-co-979"],
  },
  {
    id: "dinh-hang-lang", periodIds: ["the-ky-x"], name: "Đinh Hạng Lang", personalName: "Đinh Hạng Lang",
    aliases: [], title: "Thái tử trong cuộc khủng hoảng kế vị triều Đinh", life: "Chưa rõ năm sinh – 979", contextYear: 978,
    summaryClaimIds: [passage("nd-bio-dinh-hang-lang", "Đinh Hạng Lang là người con nhỏ của Đinh Tiên Hoàng được lập làm thái tử năm 978. Sự lựa chọn này đặt ông vào vị trí kế vị trước người anh Đinh Liễn, vốn có công cùng cha và giữ vai trò đối ngoại. Toàn thư chép Liễn sai giết Hạng Lang vào mùa xuân năm 979. Vụ việc là một mắt xích quan trọng trong khủng hoảng của hoàng gia trước khi vua và Liễn cùng bị giết cuối năm.", [dinh("Tờ 4b–6a: lập thái tử và các biến cố 978–979")])],
    biographySections: [
      section("nd-bio-dinh-hang-lang-pillars", "Dấu vết trong minh văn cột kinh", "Bài giới thiệu cột kinh của cơ quan văn hóa Ninh Bình liên hệ người em được nhắc trong lời cầu siêu của Đinh Khuông Liễn với Hạng Lang. Lạc khoản bộc lộ cách người dựng cột giải thích hành động của mình, vì vậy không thể dùng những lời quy lỗi trong đó như kết luận trung lập về người đã chết.", [["nd-dinh-pillars", "Bản dịch lạc khoản 667–Đ26 và đoạn giá trị lịch sử văn hóa"]], "interpretation"),
    ], eventIds: ["dinh-cot-kinh-973", "dinh-bien-co-979"],
  },
  {
    id: "dinh-phe-de", periodIds: ["the-ky-x"], name: "Đinh Phế Đế", personalName: "Đinh Toàn",
    aliases: ["Đinh Toàn", "Vệ Vương"], title: "Vị vua nhỏ tuổi cuối cùng của triều Đinh",
    life: "974–1001 (niên mục Toàn thư; có cách ghi 991)", contextYear: 980,
    summaryClaimIds: [passage("nd-bio-dinh-phe-de", "Đinh Phế Đế, tên húy Đinh Toàn, là con Đinh Tiên Hoàng và Dương thái hậu. Ông được đưa lên ngôi sau khi cha và anh Đinh Liễn bị giết năm 979, khi còn rất nhỏ. Lê Hoàn giữ quân đội và nhiếp chính, rồi được tôn làm vua năm 980 trước nguy cơ chiến tranh với nhà Tống. Toàn trở lại tước Vệ Vương và tiếp tục sống trong thời Tiền Lê.", [dinh("Tờ 7a–8a, mục Canh Thìn 980: vua nhỏ và chuyển ngôi"), ["tl-annals", "Tờ 15b: mẹ Vệ Vương Toàn là Dương thị"]])],
    biographySections: [
      { title: "Ngôi vua giữa khủng hoảng trong và ngoài triều", claimIds: [ngoDinhClaimIds.minority, ngoDinhClaimIds.civilConflict] },
      section("nd-bio-dinh-phe-de-death", "Hậu vận và hai cách ghi năm mất", "Niên mục năm Tân Sửu 1001 của Toàn thư ghi Vệ Vương Toàn trúng tên chết khi theo Lê Đại Hành đánh Cử Long. Tuy vậy, phần giới thiệu Phế Đế ở đầu cùng bộ sử và bản Thế thứ đang dẫn lại ghi năm 991. Hồ sơ dùng mốc 1001 theo niên mục sự kiện, đồng thời giữ cách ghi 991 để người đọc thấy điểm chưa thống nhất.", [["tl-annals", "Tờ 23b: Tân Sửu, Ứng Thiên thứ 8, năm 1001"], dinh("Tờ 7a: phần đầu Phế Đế ghi 974–991"), genealogy("Chương III — Đinh Phế Đế: mất Tân Mão 991")], "chronicle", "Không suy từ tuổi thọ theo lối tính truyền thống để tự sửa năm trong các nguồn."),
    ], eventIds: ["dinh-bien-co-979", "dinh-noi-chien-980", "le-len-ngoi-980"],
  },
  {
    id: "nguyen-bac", periodIds: ["the-ky-x"], name: "Nguyễn Bặc", personalName: "Nguyễn Bặc",
    aliases: ["Định quốc công"], title: "Định quốc công nhà Đinh · Người chống quyền nhiếp chính của Lê Hoàn",
    life: "Thế kỷ X · mất trong xung đột cuối thời Đinh", contextYear: 979,
    summaryClaimIds: [passage("nd-bio-nguyen-bac", "Nguyễn Bặc là công thần của Đinh Tiên Hoàng, được ghi nhận với tước Định quốc công năm 971. Sau vụ sát hại vua và Đinh Liễn năm 979, ông góp phần xử lý Đỗ Thích. Khi Đinh Toàn lên ngôi còn nhỏ, Bặc cùng Đinh Điền và Phạm Hạp đem quân chống Lê Hoàn vì lo quyền lực họ Đinh bị thay thế. Ông thất bại, bị bắt và bị giết.", [dinh("Tờ 3b, 6a–8a: chức tước, Đỗ Thích và chống Lê Hoàn"), ["nd-nguyen-bac", "Các đoạn Định quốc công 971 và xung đột sau Đinh Tiên Hoàng mất"]])],
    biographySections: [
      section("nd-bio-nguyen-bac-court", "Một công thần trong bộ máy Hoa Lư", "Nguyễn Bặc thuộc nhóm giúp Đinh Bộ Lĩnh dựng chính quyền sau thời phân tranh. Tước Định quốc công được chính sử ghi trong đợt xác lập cấp bậc năm 971. Đó là vị trí trong triều đình nhà Đinh, khác với các danh xưng tôn vinh được truyền lại ở đền thờ về sau.", [dinh("Tờ 3b: định cấp bậc năm 971"), study("Trang in 75, 81–82: công thần và quan lại")]),
      { title: "Vì sao cùng Đinh Điền chống Lê Hoàn?", claimIds: [ngoDinhClaimIds.civilConflict] },
    ], eventIds: ["dinh-thong-nhat-968", "dinh-trieu-chinh-971", "dinh-bien-co-979", "dinh-noi-chien-980"],
  },
  {
    id: "dinh-dien", periodIds: ["the-ky-x"], name: "Đinh Điền", personalName: "Đinh Điền",
    aliases: ["Ngoại giáp Đinh Điền"], title: "Ngoại giáp nhà Đinh · Người cùng Nguyễn Bặc chống Lê Hoàn",
    life: "Thế kỷ X · mất trong xung đột cuối thời Đinh", contextYear: 979,
    summaryClaimIds: [passage("nd-bio-dinh-dien", "Đinh Điền là công thần trong lực lượng của Đinh Bộ Lĩnh và giữ chức Ngoại giáp ở triều Đinh. Sau biến cố năm 979, ông cùng Nguyễn Bặc, Phạm Hạp chống Lê Hoàn, người đang nắm quân đội và nhiếp chính cho Đinh Toàn. Cuộc tiến quân không thành; Toàn thư chép Điền bị giết tại trận. Vai trò của ông làm rõ sự chia rẽ trong chính những người từng cùng gây dựng triều Đinh.", [dinh("Tờ 7a–8a: Ngoại giáp và cuộc xung đột"), study("Trang in 75, 82, 95–96: lực lượng công thần và chống Lê Hoàn")])],
    biographySections: [
      section("nd-bio-dinh-dien-office", "Từ lực lượng thống nhất đến quan chức nhà Đinh", "Công trình Lịch sử Việt Nam xếp Đinh Điền trong nhóm tướng giúp Bộ Lĩnh xây dựng lực lượng và mô tả chức Ngoại giáp phụ trách quân bên ngoài. Tư liệu hiện dùng không đủ để khẳng định quan hệ cha con hay anh em ruột giữa ông với Đinh Tiên Hoàng chỉ từ việc cùng họ Đinh.", [study("Trang in 75, 81–82: tướng lĩnh và chức Ngoại giáp")], "interpretation"),
      { title: "Bảo vệ nhà Đinh và thất bại quân sự", claimIds: [ngoDinhClaimIds.civilConflict] },
    ], eventIds: ["dinh-thong-nhat-968", "dinh-noi-chien-980"],
  },
  {
    id: "tran-lam", periodIds: ["the-ky-x"], name: "Trần Lãm", personalName: "Trần Lãm",
    aliases: ["Trần Minh Công"], title: "Sứ quân Bố Hải Khẩu · Người liên kết với Đinh Bộ Lĩnh",
    life: "Thế kỷ X · chưa rõ niên đại đời người", contextYear: 967,
    summaryClaimIds: [passage("nd-bio-tran-lam", "Trần Lãm, còn gọi Trần Minh Công, là thủ lĩnh ở Bố Hải Khẩu trong thời phân tranh sau nhà Ngô. Đinh Bộ Lĩnh cùng con là Liễn đến nương tựa; Toàn thư chép Lãm nhận Bộ Lĩnh làm con nuôi và giao quân. Sau khi Lãm mất, Bộ Lĩnh tiếp tục phát triển lực lượng để thống nhất các thế lực địa phương.", [ngo("Tờ 25b–26a: Trần Minh Công và Đinh Bộ Lĩnh"), genealogy("Chương III — danh sách 12 sứ quân, mục 02")])],
    biographySections: [
      section("nd-bio-tran-lam-alliance", "Liên minh tạo bước chuyển cho lực lượng Hoa Lư", "Vai trò của Trần Lãm cho thấy quá trình thống nhất không chỉ gồm những trận đánh giữa hai phía. Liên kết, tiếp nhận quân và sự quy phục của các thủ lĩnh cũng giúp Đinh Bộ Lĩnh mở rộng quyền lực. Quan hệ nhận nuôi được ghi ở đây không thay cha đẻ của Bộ Lĩnh là Đinh Công Trứ.", [ngo("Tờ 25b–26a: nhận nuôi, giao quân và Phạm Phòng Át hàng"), study("Trang in 75–76: liên minh và thu phục")], "interpretation"),
    ], eventIds: ["ngo-phan-tranh-965", "dinh-thong-nhat-968"],
  },
];

const c = ngoDinhClaimIds;
const event = (
  id: string, name: string, at: ReturnType<typeof date>, places: string[], people: string[],
  context: string[], development: string[], result: string[], consequence: string, precisionNote: string,
): HistoricalEvent => ({
  id, periodIds: ["the-ky-x"], name, date: at, placeIds: places, personIds: people,
  contextClaimIds: context, developmentClaimIds: development, resultClaimIds: result,
  consequence, consequenceKind: "editorial-question", precisionNote,
});

const ngoCourtResult = passage("nd-ngo-court-result", "Vương quyền được đặt tại Cổ Loa với nghi lễ và quan chức riêng. Ngô Quyền giữ ngôi đến năm 944; những ghi chép hiện dùng không cho phép tái dựng đầy đủ sơ đồ từng cơ quan hoặc vị trí từng cung điện thời Ngô.", [ngo("Tờ 20b–21a: xưng vương, đặt trăm quan và năm mất")]);
const ngoSuccessionResult = passage("nd-ngo-succession-result", "Dòng kế vị dự định của họ Ngô bị gián đoạn. Sự phân tán của các con Ngô Quyền và việc các tướng nắm lực lượng riêng làm cho tranh chấp ở triều đình gắn với quyền lực địa phương.", [ngo("Tờ 21b–23a: các con Ngô Quyền và tướng dưới Tam Kha"), study("Trang in 66–68: xáo trộn triều đình")], "interpretation");
const ngoRecoveryResult = passage("nd-ngo-recovery-result", "Vương quyền họ Ngô được phục hồi dưới hai người con của Ngô Quyền. Đồng trị không loại bỏ khác biệt quyền lực: sử chép quan hệ giữa Thiên Sách Vương và Nam Tấn Vương nảy sinh hiềm khích trước khi Xương Ngập mất năm 954.", [ngo("Tờ 23b–24b: hai vương và quan hệ trong chính sự")]);
const ngoFragmentationResult = passage("nd-fragmentation-result", "Không một thủ lĩnh riêng lẻ nào ngay lập tức thay triều đình Cổ Loa kiểm soát toàn bộ các vùng. Đinh Bộ Lĩnh dần giành ưu thế qua liên minh và quân sự, rồi xưng hoàng đế năm 968.", [ngo("Tờ 25a–26a: các sứ quân"), dinh("Tờ 1a–2b: thống nhất và xưng đế")], "interpretation");
const dinhStateResult = passage("nd-state-result", "Hoa Lư trở thành trung tâm chính trị của nhà Đinh. Đế hiệu và quốc hiệu được xác lập từ 968, còn niên hiệu Thái Bình xuất hiện từ 970; ba yếu tố ấy không cùng bắt đầu tại một mốc.", [dinh("Tờ 2b–3a: Mậu Thìn 968 và Canh Ngọ 970")]);
const dinhGovernmentResult = passage("nd-government-result", "Quan lại văn võ và chức vụ tăng đạo cùng hiện diện trong triều đình. Các vị trí của Lê Hoàn, Nguyễn Bặc và giới tăng sĩ cho thấy nhiều nhóm cùng tham gia bộ máy, đồng thời giúp giải thích vì sao việc vua mất có thể dẫn đến tranh chấp giữa các công thần.", [dinh("Tờ 3b–4a, 7a–8a: quan chức và nhiếp chính"), study("Trang in 81–82: công thần và cao tăng")], "interpretation");
const dinhDiplomacyContext = passage("nd-diplomacy-context", "Sau khi lập triều, nhà Đinh duy trì giao thiệp với nhà Tống đang mở rộng quyền lực ở phía bắc. Đinh Liễn được cha phong Nam Việt Vương năm 969 và trở thành nhân vật đảm nhiệm những sứ bộ quan trọng.", [dinh("Tờ 3a–4a: các năm 969–973")]);
const dinhDiplomacyResult = passage("nd-diplomacy-result", "Phía Tống ban chức tước cho cả Bộ Lĩnh và Liễn theo khuôn khổ bang giao của mình. Trong khi ấy, triều đình Hoa Lư vẫn dùng đế hiệu và quốc hiệu Đại Cồ Việt trong nước; cần phân biệt hai ngữ cảnh khi đọc các danh hiệu.", [dinh("Tờ 2b–4b: đế hiệu ở Hoa Lư và sắc phong từ Tống")], "interpretation");
const dinhScriptureContext = passage("nd-scripture-context", "Phật giáo có chỗ đứng trong đời sống và triều đình Đại Cồ Việt. Bên cạnh chức vụ tăng đạo trong sử chép, những cột kinh đá còn lại ở Hoa Lư là một loại bằng chứng vật chất và chữ viết của chính thế kỷ X.", [dinh("Tờ 3b: chức tăng đạo"), ["nd-dinh-pillars", "Các mục hiện vật nguyên gốc và minh văn"]], "evidence");
const dinhScriptureResult = passage("nd-scripture-result", "Minh văn bổ sung tên đệm Khuông của Đinh Liễn và cho biết cách người dựng cột cầu phúc, cầu siêu. Các cột có nhiều niên đại nên không thể coi mọi văn bản đều phản ánh cùng một biến cố gia đình hoặc cùng một mục đích.", [["nd-dinh-pillars", "Niên đại 973–979, tên Đinh Khuông Liễn và bản dịch lạc khoản"]], "evidence");
const dinhCivilResult = passage("nd-civil-result", "Sau khi phe Nguyễn Bặc–Đinh Điền thất bại, Lê Hoàn tiếp tục giữ quyền nhiếp chính và điều khiển quân đội. Việc chuyển ngôi năm 980 diễn ra trên nền khủng hoảng kế vị, chia rẽ trong triều và áp lực quân sự từ nhà Tống.", [dinh("Tờ 7a–8a và mục 980: nội chiến, tin quân Tống và tôn vua"), study("Trang in 95–96: cục diện sau biến cố")], "interpretation");

export const ngoDinhEvents: HistoricalEvent[] = [
  event("ngo-bach-dang-938", "Chiến thắng Bạch Đằng năm 938", date(938, 938, "938"), ["bach-dang-938"], ["ngo-quyen", "duong-dinh-nghe", "kieu-cong-tien"], [c.origins, c.bachDangContext], [c.bachDangDevelopment], [c.bachDangResult], "Một thắng lợi quân sự cần những bước nào để trở thành một chính quyền bền vững?", "Bối cảnh trước khi Ngô Quyền xưng vương năm 939. Chưa chuẩn hóa ngày theo lịch hiện đại; không lấy bãi cọc của các trận sau làm tọa độ trận 938."),
  event("ngo-xung-vuong-939", "Ngô Quyền xưng vương và định đô Cổ Loa", date(939, 939, "939"), ["co-loa"], ["ngo-quyen", "duong-hau-nha-ngo"], [c.bachDangResult], [c.coronation], [ngoCourtResult], "Việc xưng vương và đặt triều nghi tạo ra những thay đổi gì so với chức Tiết độ sứ?", "Theo mốc mùa xuân Kỷ Hợi 939 trong Toàn thư. Chưa có dữ liệu vị trí từng cung điện thời Ngô."),
  event("ngo-bien-dong-944", "Ngô Quyền mất và Dương Tam Kha nắm quyền", date(944, 946, "944–945", "Ngô Quyền mất Giáp Thìn 944; niên mục Dương Tam Kha bắt đầu Ất Tỵ 945"), ["co-loa"], ["ngo-quyen", "duong-hau-nha-ngo", "duong-tam-kha", "ngo-xuong-ngap", "ngo-xuong-van"], [c.coronation], [c.succession944], [ngoSuccessionResult], "Vì sao người được giao giúp các con vua có thể trở thành người giữ vương quyền?", "Tách năm vua mất 944 và niên mục 945 của Tam Kha; không suy ngày diễn ra việc chiếm quyền."),
  event("ngo-khoi-phuc-950", "Khôi phục vương quyền họ Ngô và hai vương đồng trị", date(950, 952, "950–951"), ["co-loa"], ["duong-tam-kha", "ngo-xuong-van", "ngo-xuong-ngap"], [c.succession944], [c.recovery], [c.sharedRule, ngoRecoveryResult], "Hai người cùng giữ vương quyền giải quyết hay tạo thêm những vấn đề kế vị nào?", "Toàn thư đặt việc lật Tam Kha ở 950, xưng Nam Tấn Vương và đón anh ở 951; đồng trị kéo dài đến khi Xương Ngập mất năm 954."),
  event("ngo-phan-tranh-965", "Ngô Xương Văn mất và cục diện mười hai sứ quân", date(965, 968, "965–967"), ["binh-kieu", "hoa-lu"], ["ngo-xuong-van", "ngo-xuong-xi", "tran-lam", "dinh-bo-linh"], [c.sharedRule], [c.fragmentation], [ngoFragmentationResult], "Bên cạnh chiến tranh, những liên minh nào giúp một thế lực địa phương giành ưu thế?", "Khoảng biên tập từ cái chết Xương Văn 965 đến trước khi lập triều Đinh 968; không khẳng định các thế lực địa phương chỉ bắt đầu xuất hiện cùng một năm."),
  event("dinh-thong-nhat-968", "Đinh Bộ Lĩnh thống nhất và lập nước Đại Cồ Việt", date(968, 968, "968"), ["hoa-lu"], ["dinh-bo-linh", "dinh-lien", "tran-lam", "nguyen-bac", "dinh-dien"], [c.fragmentation], [c.unification], [dinhStateResult], "Quốc hiệu, kinh đô và quan chức giúp củng cố sự thống nhất như thế nào?", "968 là mốc xưng hoàng đế và quốc hiệu; không gán niên hiệu Thái Bình cho năm này."),
  event("dinh-trieu-chinh-971", "Tổ chức quan lại và chức vụ tăng đạo thời Đinh", date(971, 971, "971"), ["hoa-lu"], ["dinh-bo-linh", "nguyen-bac", "le-dai-hanh"], [c.unification], [c.government], [dinhGovernmentResult], "Vì sao các công thần và tăng sĩ cùng có vị trí trong bộ máy Hoa Lư?", "Theo mục Tân Mùi, Thái Bình thứ hai. Không dùng sơ đồ quan chức suy ra quân số thực tế."),
  event("dinh-ngoai-giao-973", "Đinh Liễn đi sứ và quan hệ với nhà Tống", date(972, 976, "972–975"), ["hoa-lu"], ["dinh-bo-linh", "dinh-lien"], [dinhDiplomacyContext], [c.diplomacy], [dinhDiplomacyResult], "Cùng một người có thể mang tước vị khác nhau trong triều đình và bang giao ra sao?", "972 đi sứ, 973 về và nhận phong, 975 được gia phong. Không đồng nhất tước phong đối ngoại với ngôi hoàng đế trong nước."),
  event("dinh-cot-kinh-973", "Đinh Liễn dựng cột kinh Phật ở Hoa Lư", date(973, 980, "973–979"), ["hoa-lu"], ["dinh-lien", "dinh-hang-lang", "dinh-bo-linh"], [dinhScriptureContext], [c.scripture], [dinhScriptureResult], "Chữ viết còn lại trên đá bổ sung gì cho những bộ sử được biên soạn muộn hơn?", "Khoảng niên đại nhiều cột, không phải mọi cột cùng dựng năm 973. Nhân vật Hạng Lang liên quan các minh văn cầu siêu về sau, không gán cái chết của ông cho 973."),
  event("dinh-bien-co-979", "Khủng hoảng kế vị và biến cố hoàng gia năm 979", date(979, 979, "979"), ["hoa-lu"], ["dinh-bo-linh", "dinh-lien", "dinh-hang-lang", "dinh-phe-de", "duong-van-nga", "nguyen-bac"], [c.succession978], [c.crisis979], [c.minority], "Ngôi vua của một đứa trẻ phụ thuộc vào những lực lượng nào trong triều đình?", "Hạng Lang bị giết mùa xuân; hai cha con Tiên Hoàng–Liễn bị giết mùa đông. Quy trách nhiệm vụ sau theo Toàn thư; không xuất bản điềm báo hoặc giả thuyết âm mưu như kết luận."),
  event("dinh-noi-chien-980", "Nguyễn Bặc và Đinh Điền chống quyền nhiếp chính", date(979, 981, "Cuối thời Đinh · 979–980"), ["hoa-lu"], ["dinh-phe-de", "nguyen-bac", "dinh-dien", "le-dai-hanh", "duong-van-nga"], [c.minority], [c.civilConflict], [dinhCivilResult], "Các sử gia khác nhau đánh giá tính chính đáng của cùng một cuộc xung đột như thế nào?", "Khoảng biên tập sau biến cố 979 và trước chuyển ngôi 980; nguồn đang dẫn chưa cho một ngày tháng chung chắc chắn. Không phải trận đánh tại thành Tây Đô thời Hồ."),
];

const tenure = (id: string, personId: string, label: string, start: number, end: number, display: string, dynastyId: string, claimIds: string[], roleLabel = "Hoàng đế trị vì"): RoleTenure => ({
  id, periodId: "the-ky-x", personId, role: "reigning", label, roleLabel,
  dynastyId, polityId: dynastyId === "ngo-dynasty" ? "ngo-polity" : "dai-co-viet",
  date: date(start, end, display), claimIds,
});
export const ngoDinhTenures: RoleTenure[] = [
  tenure("nd-tenure-ngo-quyen", "ngo-quyen", "Ngô Quyền", 939, 944, "939–944", "ngo-dynasty", [c.coronation, c.succession944], "Ngô Vương"),
  tenure("nd-tenure-duong-tam-kha", "duong-tam-kha", "Dương Tam Kha", 945, 950, "945–950", "ngo-dynasty", [c.succession944, c.recovery], "Bình Vương"),
  tenure("nd-tenure-ngo-xuong-van", "ngo-xuong-van", "Ngô Xương Văn", 951, 965, "951–965", "ngo-dynasty", [c.recovery, c.sharedRule], "Nam Tấn Vương"),
  tenure("nd-tenure-ngo-xuong-ngap", "ngo-xuong-ngap", "Ngô Xương Ngập", 951, 954, "951–954 · đồng trị", "ngo-dynasty", [c.sharedRule], "Thiên Sách Vương"),
  tenure("nd-tenure-dinh-tien-hoang", "dinh-bo-linh", "Hoàng đế · Đinh Tiên Hoàng", 968, 979, "968–979", "dinh-dynasty", [c.unification, c.crisis979]),
  tenure("nd-tenure-dinh-phe-de", "dinh-phe-de", "Hoàng đế · Đinh Phế Đế", 979, 980, "979–980", "dinh-dynasty", [c.minority]),
];

const link = (id: string, from: string, to: string, type: Relationship["type"], label: string, text: string, refs: Ref[], at?: ReturnType<typeof date>, note?: string): Relationship => ({
  id, from, to, type, label, claimIds: [passage(`${id}-claim`, text, refs)], status: "draft",
  ...(at ? { date: at } : {}), ...(note ? { note } : {}),
});
export const ngoDinhRelationships: Relationship[] = [
  link("nd-family-dinh-nghe-daughter", "duong-dinh-nghe", "duong-hau-nha-ngo", "parent", "Cha–con", "Dương hoàng hậu của Ngô Quyền là con gái Dương Đình Nghệ.", [ngo("Tờ 20b: Đình Nghệ gả con gái cho Ngô Quyền")]),
  link("nd-family-dinh-nghe-tam-kha", "duong-dinh-nghe", "duong-tam-kha", "parent", "Cha–con", "Dương Tam Kha là con Dương Đình Nghệ theo phần khảo cứu về gia đình Ngô–Dương.", [study("Trang in 67: Tam Kha là con trai Đình Nghệ"), ngo("Chú thích 225 dẫn Việt sử tiêu án về Tam Kha")]),
  link("nd-marriage-ngo-quyen-duong-hau", "ngo-quyen", "duong-hau-nha-ngo", "marriage", "Hôn nhân", "Ngô Quyền lấy con gái Dương Đình Nghệ và lập Dương thị làm hoàng hậu năm 939.", [ngo("Tờ 20b–21a: hôn nhân và hoàng hậu")]),
  ...["ngo-xuong-ngap", "ngo-xuong-van"].map((id) => link(`nd-father-ngo-quyen-${id}`, "ngo-quyen", id, "parent", "Cha–con", `${id === "ngo-xuong-ngap" ? "Ngô Xương Ngập là con trưởng" : "Ngô Xương Văn là con thứ"} của Ngô Quyền.`, [ngo("Tờ 21b–23b: các con và Hậu Ngô Vương")])),
  ...["ngo-xuong-ngap", "ngo-xuong-van"].map((id) => link(`nd-mother-duong-hau-${id}`, "duong-hau-nha-ngo", id, "parent", "Mẹ–con", `Dương hoàng hậu nhà Ngô là mẹ của ${id === "ngo-xuong-ngap" ? "Ngô Xương Ngập" : "Ngô Xương Văn"}.`, [genealogy("Chương III — Tiền Ngô Vương, Dương Bình Vương và Hậu Ngô Vương")])),
  link("nd-sibling-ngo-brothers", "ngo-xuong-ngap", "ngo-xuong-van", "sibling", "Anh–em", "Ngô Xương Ngập và Ngô Xương Văn là hai anh em; năm 951, Văn đón anh về cùng coi việc nước.", [ngo("Tờ 23b: Tân Hợi 951")]),
  link("nd-family-xuong-ngap-xuong-xi", "ngo-xuong-ngap", "ngo-xuong-xi", "parent", "Cha–con", "Ngô Xương Xí là con của Thiên Sách Vương Ngô Xương Ngập, được Thế thứ liệt kê ở mục sứ quân Bình Kiều.", [genealogy("Chương III — danh sách 12 sứ quân, mục 01")]),
  link("nd-adoption-tam-kha-xuong-van", "duong-tam-kha", "ngo-xuong-van", "political", "Nhận nuôi", "Dương Tam Kha nhận Ngô Xương Văn làm con nuôi khi nắm vương quyền; không phải cha đẻ của Xương Văn.", [ngo("Tờ 21b và 22b: nhận nuôi, tha tội khi bị lật đổ")]),
  link("nd-ngo-quyen-dinh-nghe-service", "duong-dinh-nghe", "ngo-quyen", "political", "Giao quản Ái Châu", "Ngô Quyền làm tướng và được Dương Đình Nghệ giao quản Ái Châu trước khi dựng vương triều Ngô.", [ngo("Tờ 20b: tiểu sử Tiền Ngô Vương")]),
  link("nd-political-tam-kha-takeover", "ngo-quyen", "duong-tam-kha", "succession", "Nắm quyền sau khi vua mất", "Sau khi Ngô Quyền mất năm 944, Dương Tam Kha chiếm quyền và xưng Bình Vương. Đây không phải việc cha truyền ngôi cho con.", [ngo("Tờ 21a–22a: Ngô Quyền mất và Tam Kha")], date(944, 946, "944–945")),
  link("nd-succession-tam-kha-xuong-van", "duong-tam-kha", "ngo-xuong-van", "succession", "Bị lật đổ", "Ngô Xương Văn lật đổ Dương Tam Kha năm 950 và xưng Nam Tấn Vương trong niên mục 951.", [ngo("Tờ 22b–23b: 950 và 951")], date(950, 952, "950–951")),
  link("nd-political-co-rule", "ngo-xuong-van", "ngo-xuong-ngap", "political", "Đồng trị", "Từ năm 951 đến năm 954, Nam Tấn Vương Ngô Xương Văn và Thiên Sách Vương Ngô Xương Ngập cùng giữ vương quyền.", [ngo("Tờ 23b–24b: cùng coi việc nước và Xương Ngập mất")], date(951, 954, "951–954")),
  link("nd-political-lam-bo-linh", "tran-lam", "dinh-bo-linh", "political", "Nhận nuôi · Giao quân", "Toàn thư chép Trần Lãm nhận Đinh Bộ Lĩnh làm con nuôi và giao cho coi quân. Cha đẻ Bộ Lĩnh là Đinh Công Trứ, không phải Trần Lãm.", [ngo("Tờ 25b–26a: Trần Minh Công"), dinh("Tờ 1a: Đinh Công Trứ")]),
  ...["dinh-lien", "dinh-hang-lang", "dinh-phe-de"].map((id) => link(`nd-father-bo-linh-${id}`, "dinh-bo-linh", id, "parent", "Cha–con", `${id === "dinh-lien" ? "Đinh Liễn" : id === "dinh-hang-lang" ? "Đinh Hạng Lang" : "Đinh Toàn"} là con của Đinh Tiên Hoàng.`, [dinh("Tờ 3a–7a: các con và kế vị triều Đinh")])),
  link("nd-sibling-lien-hang-lang", "dinh-lien", "dinh-hang-lang", "sibling", "Anh–em", "Đinh Liễn là anh của Hạng Lang; xung đột ngôi thái tử kết thúc bằng việc Liễn sai giết người em năm 979 theo Toàn thư.", [dinh("Tờ 5a–5b: mùa xuân 979")]),
  link("nd-succession-bo-linh-toan", "dinh-bo-linh", "dinh-phe-de", "succession", "Kế vị", "Đinh Toàn lên ngôi sau khi Đinh Tiên Hoàng và Đinh Liễn cùng bị giết năm 979.", [dinh("Tờ 6a–7a: cuối 979 và Phế Đế")], date(979, 979, "979")),
  ...["nguyen-bac", "dinh-dien"].map((id) => link(`nd-political-bo-linh-${id}`, "dinh-bo-linh", id, "political", "Công thần", `${id === "nguyen-bac" ? "Nguyễn Bặc" : "Đinh Điền"} là công thần trong lực lượng và triều đình của Đinh Bộ Lĩnh.`, [study("Trang in 75, 81–82: tướng lĩnh và quan lại")])),
  ...["nguyen-bac", "dinh-dien"].map((id) => link(`nd-political-toan-${id}`, id, "dinh-phe-de", "political", "Ủng hộ ngôi vua họ Đinh", `${id === "nguyen-bac" ? "Nguyễn Bặc" : "Đinh Điền"} chống Lê Hoàn khi lo quyền nhiếp chính đe dọa ngôi vua của Đinh Toàn.`, [dinh("Tờ 7a–8a: động cơ và cuộc xung đột")])),
  ...["nguyen-bac", "dinh-dien"].map((id) => link(`nd-political-against-hoan-${id}`, id, "le-dai-hanh", "political", "Đối đầu quyền nhiếp chính", `${id === "nguyen-bac" ? "Nguyễn Bặc" : "Đinh Điền"} cùng các quan khác đem quân chống Lê Hoàn rồi thất bại trong giai đoạn cuối thời Đinh.`, [dinh("Tờ 7a–8a: thủy bộ chống Lê Hoàn")], date(979, 981, "979–980"))),
];

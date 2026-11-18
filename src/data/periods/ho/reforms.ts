import {
  date,
  type Claim,
  type HistoricalEvent,
  type Source,
} from "../../schema";
import { claim, type Ref } from "../../claim-store";

const source = (
  entry: Pick<
    Source,
    "id" | "title" | "publisher" | "url" | "type" | "readLocation" | "limits"
  > &
    Partial<Pick<Source, "author" | "year" | "upstream" | "edition">>,
): Source => ({
  author: null,
  year: null,
  edition: null,
  upstream: null,
  accessed: "2026-11-18",
  ...entry,
});

export const hoReformSources: Source[] = [
  source({
    id: "ho-unesco-citadel",
    title: "Citadel of the Ho Dynasty — Outstanding Universal Value",
    author: "UNESCO World Heritage Centre",
    publisher: "UNESCO",
    url: "https://whc.unesco.org/en/list/1358/",
    type: "heritage",
    readLocation:
      "Description; Outstanding Universal Value, Brief synthesis: xây năm 1397; ba thành phần Inner Citadel, La Thanh Outer Wall, Nam Giao Altar; vai trò kinh đô 1398–1407.",
    limits:
      "Hồ sơ di sản hiện đại ghi vai trò kinh đô từ 1398, khác cách ghi chuyển đô 1397 trong sử Việt. Không dùng mốc khởi dựng để kết luận toàn bộ tường đá hoàn tất trong ba tháng. Tọa độ các thành phần ở trang maps là nguồn riêng.",
  }),
  source({
    id: "ho-reform-overview",
    title: "Những cải cách của Hồ Quý Ly cuối thế kỷ XIV – đầu thế kỷ XV",
    author: "Lê Khiêm (tổng hợp)",
    publisher: "Bảo tàng Lịch sử Quốc gia",
    year: 2013,
    url: "https://baotanglichsu.vn/vi/Articles/3098/14720/nhung-cai-cach-cua-ho-quy-ly-cuoi-the-ky-xiv-djau-the-ky-xv.html",
    type: "museum",
    readLocation:
      "Các đoạn tiền giấy 1396, hạn điền 1397, hạn nô 1401; phần văn hóa–giáo dục, khoa thi đầu triều và thi viết chữ/toán 1404.",
    limits:
      "Bài phổ thông có lỗi niên đại trong phần tiểu sử (Dụ Tông năm 1371, Nghệ Tông mất 1395); không dùng các chi tiết đó. Không coi lời ca ngợi cải cách hoặc việc ban hành chính sách là bằng chứng mọi biện pháp đã thực hiện thành công.",
  }),
  source({
    id: "ho-socio-economic-study",
    title: "Vài nét về chính sách cải cách kinh tế – xã hội của Hồ Quý Ly",
    author: "Trần Thuận",
    publisher:
      "Tạp chí Phát triển Khoa học và Công nghệ – Khoa học Xã hội và Nhân văn, ĐHQG-HCM",
    year: 2020,
    edition: "Tập 4, số 4, trang 574–584; DOI 10.32508/stdjssh.v4i4.614",
    url: "https://ssh.vnuhcmjournal.com.vn/index.php/ssh/article/download/614/996/1804",
    type: "research",
    readLocation:
      "Trang in 577–579: hạn điền, tiền giấy, thuế, hạn nô, thường bình, Quảng tế; trang 580–582: nhận xét giới hạn của cải cách và các cách đánh giá.",
    limits:
      "Nghiên cứu diễn giải trên cơ sở sử liệu và các công trình trước, không phải một nguồn đương thời độc lập cho từng niên đại. Phần kho thường bình dẫn ý định nhưng không nhắc rõ trở ngại thực thi được Toàn thư ghi; nội dung đối chiếu lại sử gốc. Không đồng nhất Quảng tế với Bộ Y tế hiện đại.",
  }),
  source({
    id: "ho-reform-monograph",
    title: "Cải cách Hồ Quý Ly",
    author: "Phan Đăng Thanh; Trương Thị Hòa",
    publisher: "Bản chuyển dạng sách lưu tại cổng Quản lý giáo dục",
    url: "https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/2/838/UserFiles/Cai-cach-Ho-Quy-Li-e85a5e1c-47f7-469e-9c5e-486964e484af.pdf",
    type: "research",
    readLocation:
      "Trang PDF 57–59: bộ máy và khoa thi 1400; trang 75: hộ tịch 1401; trang 107–112: hạn nô, Quảng tế, cứu đói; phần hạn chế cải cách trang 117–118.",
    limits:
      "Bản chuyển dạng 392 trang chưa xác nhận đủ thông tin ấn bản; lời tựa ký 13-2-1995 không đồng nhất với năm của lần tái bản. Một số đoạn suy đoán ý định tốt của chính sách khi thừa nhận sử liệu không ghi; không chuyển suy đoán ấy thành kết quả thực tế.",
  }),
  source({
    id: "ho-education-heritage",
    title: "Hồ Quý Ly và những bài học lịch sử về cải cách văn hóa, giáo dục",
    publisher:
      "Ban Quản lý Di sản Thành Nhà Hồ và các di tích trọng điểm tỉnh Thanh Hóa",
    url: "https://thanhnhaho.vn/NewsDetail.aspx?Id=7658",
    type: "heritage",
    upstream:
      "Bài dẫn Cải cách Hồ Quý Ly của Phan Đăng Thanh và Trương Thị Hòa, NXB Tổng hợp TP.HCM, 2012",
    readLocation:
      "Các đoạn Minh đạo, dịch thiên Vô dật, Thi nghĩa bằng quốc âm; đoạn cuối về giới hạn chữ Nôm và việc thi cử vẫn bằng chữ Hán.",
    limits:
      "Phụ thuộc sách của Phan Đăng Thanh–Trương Thị Hòa, không tính thành nguồn độc lập thứ hai với sách. Không dùng niên đại mất 1407 trong phần giới thiệu; không coi chữ Nôm đã thay thế chữ Hán trong toàn bộ hoạt động nhà nước.",
  }),
];

// Existing sources are reused by ID: ho-reforms, ho-chronology and toan-thu-family.
// A second transcription of the same chronicle is not independent corroboration.
const chronicle = (location: string): Ref => [
  "toan-thu-family",
  `Bản kỷ quyển VIII, ${location}`,
];
const register = (
  id: string,
  text: string,
  refs: Ref[],
  kind: Claim["kind"] = "evidence",
) => claim(id, text, refs, { kind, status: "draft" });

export const hoReformClaimIds: Record<string, string> = {
  overview: register(
    "ho-reforms-overview",
    "Những thay đổi do Hồ Quý Ly thúc đẩy bắt đầu khi nhà Trần còn tồn tại. Tiền giấy, ruộng đất, nhân lực, học tập và bộ máy hành chính cùng trở thành đối tượng điều chỉnh; kết quả của từng biện pháp không giống nhau.",
    [
      [
        "ho-socio-economic-study",
        "Trang 577–582: các chính sách và phần nhận xét",
      ],
      ["ho-reform-overview", "Các mục kinh tế, xã hội, văn hóa–giáo dục"],
    ],
    "interpretation",
  ),
  daiNgu: register(
    "ho-dai-ngu-name",
    "Năm 1400, Hồ Quý Ly lên ngôi, đặt niên hiệu Thánh Nguyên và quốc hiệu Đại Ngu. Tây Đô là kinh đô của triều đại mới; việc xây dựng trung tâm này đã bắt đầu từ cuối Trần.",
    [
      chronicle("tờ 36b–37a: chuyển triều và quốc hiệu"),
      ["ho-chronology", "Tiêu đề và mục Hồ Quý Ly"],
      ["ho-unesco-citadel", "Brief synthesis: khởi dựng năm 1397"],
    ],
  ),

  capitalContext: register(
    "ho-capital-context",
    "Quyết định xây trung tâm mới ở An Tôn được đưa ra khi Hồ Quý Ly đang nắm quyền trong triều Trần. Sử chép cả những ý kiến phản đối việc rời Thăng Long, cho thấy đây là một lựa chọn có tranh luận.",
    [chronicle("tờ 28b–29a: xem đất An Tôn và lời can của Nguyễn Nhữ Thuyết")],
    "chronicle",
  ),
  capitalBuilding: register(
    "ho-capital-building",
    "Thành ở An Tôn, nay được biết là Thành Nhà Hồ, được khởi dựng năm 1397. Công trình nằm trong cảnh quan giữa sông Mã và sông Bưởi; các tường đá lớn là dấu tích nổi bật của trung tâm quyền lực này.",
    [
      ["ho-unesco-citadel", "Description; Brief synthesis; Criterion (iv)"],
      [
        "ho-reforms",
        "Mục Sửa đổi quy chế quan lại: quyết định xây thành An Tôn năm 1397",
      ],
    ],
  ),
  capitalTransfer: register(
    "ho-capital-transfer",
    "Toàn thư ghi vua Trần bị buộc chuyển vào Thanh Hóa tháng 11 năm 1397. Việc vận chuyển vật liệu cung điện gặp tổn thất; thành tiếp tục được xây sửa ở những năm sau, nên mốc khởi dựng không đồng nghĩa toàn bộ công trình đã hoàn tất.",
    [
      chronicle(
        "tờ 31a–31b: chuyển đô và vật liệu bị chìm; tờ 40a: xây sửa thành",
      ),
    ],
    "chronicle",
  ),
  capitalResult: register(
    "ho-capital-result",
    "Tây Đô tiếp tục được sử dụng dưới nhà Hồ. Hồ sơ UNESCO xác định ba thành phần di sản: thành trong, La Thành và đàn Nam Giao; quy mô của di sản hiện nay không phải đường biên của quốc gia Đại Ngu.",
    [["ho-unesco-citadel", "Brief synthesis; Integrity: ba thành phần di sản"]],
  ),

  moneyContext: register(
    "ho-money-context",
    "Việc đổi tiền diễn ra trước khi nhà Hồ thành lập. Nhà nước tìm cách tập trung nguồn lực tài chính và kim loại, đồng thời thay đổi phương tiện trao đổi đang được dùng trong xã hội.",
    [
      [
        "ho-socio-economic-study",
        "Trang 577–578: phát hành tiền giấy và mục tiêu tài chính",
      ],
      ["ho-reforms", "Mục Phát hành tiền giấy"],
    ],
    "interpretation",
  ),
  moneyPolicy: register(
    "ho-money-policy",
    "Năm 1396, Thông bảo hội sao được phát hành. Triều đình quy định đổi tiền đồng lấy tiền giấy, cấm lưu giữ và sử dụng tiền đồng, đồng thời đặt hình phạt nặng đối với việc làm giả hoặc vi phạm lệnh cấm.",
    [
      ["ho-reforms", "Mục Phát hành tiền giấy"],
      chronicle("tờ 26a–26b: phát hành Thông bảo hội sao"),
    ],
  ),
  moneyLimits: register(
    "ho-money-limits",
    "Tiền giấy không tự tạo ra lòng tin của người mua bán. Sử còn ghi người buôn chê tiền giấy và nhà nước phải dùng chế tài để buộc lưu hành; việc ban lệnh vì thế khác với việc đồng tiền được chấp nhận thuận lợi.",
    [
      chronicle("tờ 43a: thương nhân và điều luật về tiền giấy"),
      [
        "ho-socio-economic-study",
        "Trang 581: các cách giải thích khó khăn của tiền giấy",
      ],
    ],
    "interpretation",
  ),

  landContext: register(
    "ho-land-context",
    "Ruộng đất và gia nô là những nguồn lực gắn với thế lực của quý tộc cuối Trần. Chính sách hạn điền điều chỉnh quyền chiếm hữu ruộng tư, khác với hạn nô là chính sách điều chỉnh việc giữ người lệ thuộc.",
    [
      [
        "ho-socio-economic-study",
        "Trang 577, 579–581: quan hệ giữa hạn điền và hạn nô",
      ],
    ],
    "interpretation",
  ),
  landPolicy: register(
    "ho-land-policy",
    "Năm 1397, phép hạn điền giới hạn ruộng tư ở mức 10 mẫu đối với các đối tượng theo lệnh, ngoại trừ đại vương và trưởng công chúa. Phần vượt hạn phải nộp cho nhà nước.",
    [
      ["ho-reforms", "Mục Chính sách hạn điền"],
      chronicle("tờ 30b–31a: chiếu hạn chế danh điền"),
    ],
  ),
  landImplementation: register(
    "ho-land-implementation",
    "Từ năm 1398, chủ ruộng phải khai tên và cắm thẻ trên ruộng; quan địa phương đo đạc, lập sổ. Công việc kéo dài nhiều năm, cho thấy thực hiện hạn điền đòi hỏi bộ máy kiểm kê chứ không chỉ một chiếu lệnh.",
    [
      ["ho-reforms", "Mục Chính sách hạn điền: lệnh bổ sung và việc đo đạc"],
      ["ho-socio-economic-study", "Trang 577: lập địa bạ trong năm năm"],
    ],
  ),
  landLimits: register(
    "ho-land-limits",
    "Ruộng vượt hạn chuyển sang sở hữu nhà nước không đồng nghĩa người nghèo lập tức được chia ruộng. Những ngoại lệ cho tầng lớp cao nhất và cách tổ chức thực hiện khiến tác động của hạn điền cần được đánh giá riêng với mục tiêu chính sách.",
    [
      [
        "ho-socio-economic-study",
        "Trang 580–582: giới hạn và tính không triệt để của hạn điền",
      ],
      [
        "ho-reform-monograph",
        "Trang PDF 117–118: tác động trước mắt của hạn điền",
      ],
    ],
    "interpretation",
  ),

  examContext: register(
    "ho-exam-context",
    "Triều Hồ tiếp nhận một bộ máy có nhiều người từng làm việc dưới triều Trần. Bên cạnh việc sử dụng quan lại cũ, khoa cử là một con đường lựa chọn và bổ sung người có học cho triều đình mới.",
    [
      [
        "ho-reform-monograph",
        "Trang PDF 57–59: bộ máy và người được bổ dụng sau khoa thi",
      ],
    ],
    "interpretation",
  ),
  exam1400: register(
    "ho-exam-1400",
    "Tháng 8 năm 1400, Hồ Quý Ly mở khoa thi Thái học sinh. Sử ghi 20 người đỗ, trong đó có Nguyễn Trãi, Lý Tử Tấn và Vũ Mộng Nguyên; đây là khoa thi ngay trong năm đầu của triều Hồ.",
    [
      chronicle("tờ 38a: khoa Thái học sinh năm Canh Thìn"),
      ["ho-reform-monograph", "Trang PDF 58–59: khoa thi đầu triều"],
    ],
  ),
  examResult: register(
    "ho-exam-result",
    "Một số người đỗ khoa thi năm 1400 về sau tiếp tục hoạt động dưới thời Lê. Cuộc đời họ cho thấy việc học và con đường làm quan có thể nối qua nhiều triều đại, dù triều Hồ tồn tại ngắn.",
    [
      [
        "ho-education-heritage",
        "Đoạn cuối: các nhân tài thời Hồ tiếp tục phục vụ nhà Lê",
      ],
    ],
  ),

  householdContext: register(
    "ho-household-context",
    "Để huy động nhân lực, triều Hồ cần nắm số dân và nơi cư trú. Việc kiểm kê hộ tịch gắn trực tiếp với tuyển quân, bên cạnh những yêu cầu quản lý dân cư của nhà nước.",
    [["ho-reform-monograph", "Trang PDF 75: hộ tịch và nguồn tuyển quân"]],
    "interpretation",
  ),
  householdPolicy: register(
    "ho-household-policy",
    "Năm 1401, Hồ Hán Thương cho lập sổ hộ tịch trong cả nước, ghi người từ hai tuổi trở lên. Sử còn ghi lệnh đưa người lưu cư trở về nguyên quán để việc kê khai sát với số người đang có.",
    [
      chronicle("tờ 39a–39b: làm sổ hộ tịch"),
      ["ho-reform-monograph", "Trang PDF 75: kiểm tra dân số toàn quốc"],
    ],
  ),
  householdResult: register(
    "ho-household-result",
    "Việc ghi sổ làm hiện rõ thêm nguồn dân đinh để tuyển quân, theo ghi chép của sử. Đây là thay đổi trong khả năng quản lý và huy động của nhà nước, không phải bằng chứng dân số thực tế tăng vọt chỉ trong một năm.",
    [
      chronicle("tờ 39b: dân đinh và tuyển quân năm sau"),
      [
        "ho-reform-monograph",
        "Trang PDF 75: số dân được kiểm kê làm cơ sở tuyển quân",
      ],
    ],
    "interpretation",
  ),

  slavesContext: register(
    "ho-slaves-context",
    "Sau hạn điền, việc hạn chế số gia nô tiếp tục tác động vào nguồn nhân lực của các nhà quyền quý. Hai chính sách liên hệ với nhau nhưng khác đối tượng: ruộng đất và những người đang bị lệ thuộc.",
    [
      [
        "ho-socio-economic-study",
        "Trang 579–581: chính sách hạn nô và liên hệ hạn điền",
      ],
    ],
    "interpretation",
  ),
  slavesPolicy: register(
    "ho-slaves-policy",
    "Năm 1401, triều Hồ đặt phép hạn nô: số người được giữ phụ thuộc phẩm cấp; số vượt hạn chuyển cho nhà nước và chủ cũ được trả tiền theo quy định. Chính sách không phải lệnh xóa bỏ chế độ nô tì.",
    [
      chronicle("tờ 39b: hạn chế gia nô"),
      ["ho-reform-overview", "Đoạn phép hạn nô năm 1401"],
    ],
  ),
  slavesLimits: register(
    "ho-slaves-limits",
    "Gia nô chuyển thành quan nô vẫn ở địa vị lệ thuộc. Nhà nước tăng khả năng kiểm soát lao động, còn việc giảm thế lực chủ cũ không đồng nghĩa người bị chuyển giao đã trở thành dân tự do.",
    [
      [
        "ho-socio-economic-study",
        "Trang 580–581: chuyển chủ và quyền kiểm soát dân đinh",
      ],
      ["ho-reform-overview", "Đoạn gia nô thành quan nô, chưa được giải phóng"],
    ],
    "interpretation",
  ),
  law1401: register(
    "ho-law-1401",
    "Cuối năm 1401, sử ghi Hồ Hán Thương định quan chế và hình luật nước Đại Ngu. Ghi chép ngắn không cung cấp toàn văn, nên chưa thể dựng lại một bộ luật đầy đủ hay khẳng định mọi điều khoản đã thay đổi so với thời Trần.",
    [
      chronicle("tờ 40a: định quan chế và hình luật"),
      ["ho-reform-monograph", "Trang PDF 58: giới hạn thông tin về quan chế"],
    ],
  ),

  granaryPolicy: register(
    "ho-granary-policy",
    "Năm 1401, Hồ Hán Thương ra lệnh đặt kho thường bình, cấp tiền cho địa phương mua thóc dự trữ. Mục tiêu là có nguồn lương thực để ứng phó khi thiếu đói và giá cả biến động.",
    [
      chronicle("tờ 40a: đặt kho thường bình"),
      ["ho-socio-economic-study", "Trang 579: tích cốc phòng cơ"],
    ],
  ),
  granaryLimits: register(
    "ho-granary-limits",
    "Ngay sau ghi chép về kho thường bình, Toàn thư nói việc không thực hiện được vì thay đổi quan lại địa phương. Đây là một ví dụ cho khoảng cách giữa dự định cải cách và khả năng thực thi của bộ máy.",
    [chronicle("tờ 40a: trở ngại do thay đổi quan lại")],
    "chronicle",
  ),
  tax1402: register(
    "ho-tax-1402",
    "Năm 1402, triều Hồ điều chỉnh thuế và tô ruộng: có khoản tăng, có khoản giảm hoặc miễn theo loại đất, tài sản và hoàn cảnh. Vì thế không thể gộp mọi thay đổi thành một nhận xét chung rằng thuế đều nhẹ hơn hay đều nặng hơn.",
    [
      [
        "ho-socio-economic-study",
        "Trang 578: thuế đinh, thuế tô và các đối tượng miễn",
      ],
      chronicle("tờ 42a–42b: định lại thuế và tô ruộng"),
    ],
    "interpretation",
  ),
  measurement1403: register(
    "ho-measurement-1403",
    "Sử ghi việc ban hành cân, thước, thưng, đấu và định giá tiền giấy dưới triều Hồ Hán Thương. Chuẩn hóa đo lường được đặt cùng những nỗ lực quản lý thị trường, nhưng việc lưu hành tiền giấy vẫn gặp phản ứng.",
    [chronicle("tờ 43a: đo lường, giá tiền giấy và phản ứng của thương nhân")],
  ),

  nom: register(
    "ho-nom-learning",
    "Hồ Quý Ly dùng chữ Nôm trong các hoạt động dịch và giải nghĩa sách, như thiên Vô dật và Thi nghĩa. Việc đề cao quốc âm không có nghĩa chữ Nôm đã thay thế chữ Hán trong khoa cử; các kỳ thi vẫn sử dụng chữ Hán.",
    [
      [
        "ho-education-heritage",
        "Các đoạn Vô dật, Thi nghĩa và giới hạn sử dụng chữ Nôm",
      ],
    ],
  ),
  educationPolicy: register(
    "ho-local-schools-policy",
    "Năm 1397, triều đình ra chiếu đặt học quan và cấp ruộng phục vụ việc học ở một số phủ, lộ. Đây là chủ trương mở rộng cơ sở giáo dục địa phương từ cuối Trần, trước khi nhà Hồ thành lập.",
    [
      chronicle("tờ 30a–30b: học quan, học điền và tiến cử học trò"),
      ["ho-education-heritage", "Đoạn chiếu tháng 5 năm Đinh Sửu"],
    ],
  ),
  educationLimits: register(
    "ho-local-schools-limits",
    "Ngô Sĩ Liên nhận xét rằng lệnh mở trường năm 1397 không thấy được thi hành. Đó là lời đánh giá của sử gia đời sau, cần phân biệt với nội dung chiếu và với việc có trường lớp hoạt động trên thực tế.",
    [chronicle("tờ 30b: lời bình Ngô Sĩ Liên sau chiếu học quan")],
    "chronicle",
  ),
  exams1404: register(
    "ho-exams-1404",
    "Năm 1404, Hồ Hán Thương định lại thể thức tuyển chọn nhân tài, quy định các vòng thi và thêm nội dung viết chữ, làm toán. Quy định này mở rộng nội dung được khảo thí ngoài những bài văn kinh điển.",
    [
      chronicle("tờ 45b–46a: thể thức thi và kỳ viết chữ, thi toán"),
      ["ho-education-heritage", "Đoạn thể thức thi năm 1404"],
    ],
  ),
  examsLimits: register(
    "ho-exams-limits",
    "Toàn thư ghi học trò mới thi ở bộ Lễ thì chiến tranh làm việc thi cử phải dừng. Quy chế năm 1404 vì vậy cho thấy một dự định tổ chức, nhưng chưa phải bằng chứng mọi vòng thi đã được thực hiện đầy đủ.",
    [chronicle("tờ 45b–46a: mới thi ở bộ Lễ, gặp loạn phải thôi")],
    "chronicle",
  ),

  healthContext: register(
    "ho-health-context",
    "Công việc của triều Hồ còn bao gồm các biện pháp về đời sống dân cư, bên cạnh tiền tệ, ruộng đất và quân đội. Việc đặt Quảng tế cho thấy một hướng tổ chức người làm việc chữa bệnh dưới sự quản lý của triều đình.",
    [
      [
        "ho-reform-monograph",
        "Trang PDF 111–112: Quảng tế và các chính sách xã hội",
      ],
    ],
    "interpretation",
  ),
  health1403: register(
    "ho-health-1403",
    "Năm 1403, Hồ Hán Thương bổ Nguyễn Đại Năng, người Giáp Sơn biết dùng kim châm và lửa cứu để chữa bệnh, vào chức việc tại Quảng tế. Sử ghi việc đặt quan thuộc cơ quan này bắt đầu từ đó.",
    [
      chronicle("tờ 44b: Nguyễn Đại Năng và Quảng tế"),
      ["ho-socio-economic-study", "Trang 579: lập Quảng tế thự"],
    ],
  ),
  healthLimits: register(
    "ho-health-limits",
    "Ghi chép cho biết việc tổ chức và người được bổ nhiệm, nhưng chưa đủ để xác định số nơi chữa bệnh hay mức độ người dân được tiếp cận. Quảng tế thời Hồ cần được hiểu trong hoàn cảnh y tế trung đại, không đồng nhất với bệnh viện hiện nay.",
    [
      [
        "ho-reform-monograph",
        "Trang PDF 57–58: giới hạn hiểu biết về chức năng cơ quan; trang 111: Quảng tế",
      ],
    ],
    "interpretation",
  ),

  champaContext: register(
    "ho-champa-context",
    "Quan hệ với Champa thời Hồ bao gồm những cuộc tiến quân, thương lượng và việc tổ chức cai trị ở vùng đất tranh chấp. Hoạt động phía nam diễn ra đồng thời với những nỗ lực củng cố nhà nước ở phía bắc.",
    [chronicle("tờ 40a–41a: chiến dịch và tổ chức vùng Thăng Hoa")],
    "interpretation",
  ),
  champa1402: register(
    "ho-champa-1402-development",
    "Năm 1402, quân Hồ tiến đánh Champa. Sau sức ép quân sự, Chiêm Động và Cổ Lũy được chuyển giao; triều Hồ chia thành bốn châu Thăng, Hoa, Tư, Nghĩa và đặt quan cai trị.",
    [chronicle("tờ 40b–41a: Chiêm Động, Cổ Lũy và bốn châu")],
    "chronicle",
  ),
  champaResult: register(
    "ho-champa-result",
    "Việc chuyển giao dẫn tới thay đổi quản lý và di chuyển cư dân, không chỉ là đổi tên trên bản đồ. Sử ghi chính sách di dân năm sau cùng những tổn thất và lời oán thán; chưa có đủ căn cứ để vẽ ranh giới chính xác của bốn châu.",
    [chronicle("tờ 41a: dân Champa; tờ 42b–43a: di dân Thăng Hoa và tổn thất")],
    "chronicle",
  ),
};

const event = (
  id: string,
  name: string,
  year: number,
  placeIds: string[],
  personIds: string[],
  context: string,
  development: string,
  result: string,
  consequence: string,
  additionalClaimIds: string[] = [],
): HistoricalEvent => ({
  id,
  periodIds: year < 1400 ? ["tran", "ho"] : ["ho"],
  name,
  date: date(year, year, String(year)),
  placeIds,
  personIds,
  contextClaimIds: [context],
  developmentClaimIds: [development],
  resultClaimIds: [result],
  consequence,
  consequenceKind: "editorial-question",
  precisionNote: "",
  ...(additionalClaimIds.length ? { additionalClaimIds } : {}),
});

export const hoReformEvents: HistoricalEvent[] = [
  event(
    "ho-tien-giay-1396",
    "Phát hành Thông bảo hội sao",
    1396,
    ["thang-long"],
    ["ho-quy-ly", "tran-thuan-tong"],
    hoReformClaimIds.moneyContext,
    hoReformClaimIds.moneyPolicy,
    hoReformClaimIds.moneyLimits,
    "Một phương tiện thanh toán mới cần những điều kiện nào để được người mua bán chấp nhận?",
  ),
  event(
    "ho-han-dien-1397",
    "Ban hành phép hạn điền",
    1397,
    [],
    ["ho-quy-ly", "tran-thuan-tong"],
    hoReformClaimIds.landContext,
    hoReformClaimIds.landPolicy,
    hoReformClaimIds.landLimits,
    "Giảm sở hữu ruộng lớn và cải thiện đời sống người không có ruộng có phải cùng một kết quả?",
    [hoReformClaimIds.landImplementation],
  ),
  event(
    "ho-tay-do-1397",
    "Xây trung tâm Tây Đô và chuyển đô",
    1397,
    ["tay-do", "thang-long"],
    ["ho-quy-ly", "tran-thuan-tong"],
    hoReformClaimIds.capitalContext,
    hoReformClaimIds.capitalBuilding,
    hoReformClaimIds.capitalResult,
    "Việc chuyển trung tâm quyền lực cần được nhìn qua công trình, nhân lực và những ý kiến phản đối như thế nào?",
    [hoReformClaimIds.capitalTransfer],
  ),
  event(
    "ho-khoa-thi-1400",
    "Khoa thi Thái học sinh đầu triều Hồ",
    1400,
    ["tay-do"],
    ["ho-quy-ly", "nguyen-trai"],
    hoReformClaimIds.examContext,
    hoReformClaimIds.exam1400,
    hoReformClaimIds.examResult,
    "Vì sao tiểu sử người đỗ đạt không kết thúc cùng triều đại đã tuyển dụng họ?",
  ),
  event(
    "ho-han-no-1401",
    "Đặt phép hạn nô",
    1401,
    [],
    ["ho-quy-ly", "ho-han-thuong"],
    hoReformClaimIds.slavesContext,
    hoReformClaimIds.slavesPolicy,
    hoReformClaimIds.slavesLimits,
    "Thay đổi người quản lý có làm thay đổi địa vị lệ thuộc của gia nô hay không?",
  ),
  event(
    "ho-ho-tich-1401",
    "Lập sổ hộ tịch và kiểm kê nhân lực",
    1401,
    [],
    ["ho-han-thuong", "ho-quy-ly"],
    hoReformClaimIds.householdContext,
    hoReformClaimIds.householdPolicy,
    hoReformClaimIds.householdResult,
    "Một bộ sổ dân cư giúp nhà nước quản lý tốt hơn nhưng tạo thêm những nghĩa vụ nào cho người được kê khai?",
    [
      hoReformClaimIds.law1401,
      hoReformClaimIds.granaryPolicy,
      hoReformClaimIds.granaryLimits,
    ],
  ),
  event(
    "ho-champa-1402",
    "Chiến dịch Champa và việc tổ chức bốn châu",
    1402,
    [],
    ["ho-han-thuong", "ho-quy-ly"],
    hoReformClaimIds.champaContext,
    hoReformClaimIds.champa1402,
    hoReformClaimIds.champaResult,
    "Một cuộc chuyển giao đất đai làm thay đổi cuộc sống của những cộng đồng đang cư trú ở đó ra sao?",
  ),
  event(
    "ho-quang-te-1403",
    "Đặt quan thuộc Quảng tế",
    1403,
    [],
    ["ho-han-thuong"],
    hoReformClaimIds.healthContext,
    hoReformClaimIds.health1403,
    hoReformClaimIds.healthLimits,
    "Cần thêm loại tư liệu nào để hiểu khoảng cách giữa tổ chức một cơ quan chữa bệnh và việc người dân được chữa trị?",
  ),
  event(
    "ho-thi-cu-1404",
    "Quy định thi viết chữ và làm toán",
    1404,
    [],
    ["ho-han-thuong"],
    hoReformClaimIds.educationPolicy,
    hoReformClaimIds.exams1404,
    hoReformClaimIds.examsLimits,
    "Chiến tranh tác động thế nào đến những dự định đào tạo và tuyển dụng của một triều đại?",
    [hoReformClaimIds.nom, hoReformClaimIds.educationLimits],
  ),
];

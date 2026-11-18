import type { Person } from "../schema";
import { claim, type Ref } from "../claim-store";

const passage = (
  id: string,
  text: string,
  refs: Ref[],
  kind: "evidence" | "chronicle" | "interpretation" = "chronicle",
) => claim(id, text, refs, { kind, status: "draft" });

export const hoPeople: Person[] = [
  {
    id: "ho-han-thuong",
    periodIds: ["ho"],
    name: "Hồ Hán Thương",
    aliases: [],
    eraNames: ["Thiệu Thành", "Khai Đại"],
    life: "Chưa rõ năm sinh và năm mất",
    title: "Vị hoàng đế thứ hai và cuối cùng của nhà Hồ",
    contextYear: 1401,
    summaryClaimIds: [
      passage(
        "ho-bio-han-thuong-summary",
        "Hồ Hán Thương là con Hồ Quý Ly và công chúa Huy Ninh, cháu ngoại Trần Minh Tông. Ông nhận ngôi từ cha vào cuối năm 1400, đặt niên hiệu Thiệu Thành từ năm 1401 và Khai Đại từ năm 1403. Trong thời gian ông làm vua, Hồ Quý Ly giữ ngôi Thái thượng hoàng và tiếp tục cùng coi chính sự. Triều đại kết thúc khi hai cha con cùng nhiều người trong hoàng tộc bị quân Minh bắt năm 1407.",
        [
          [
            "ho-annals-viii",
            "Bản kỷ VIII, tờ 38b–39a: nhường ngôi, mẹ Hán Thương, niên hiệu",
          ],
          ["the-thu", "Chương 6, phần I.b: Hồ Hán Thương"],
          ["ho-annals-ix", "Đầu năm Đinh Hợi 1407, tờ 3a–3b"],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Người nối ngôi và quan hệ với hoàng tộc Trần",
        claimIds: [
          passage(
            "ho-bio-han-thuong-family",
            "Hán Thương là em Hồ Nguyên Trừng nhưng được chọn làm người kế vị. Mẹ ông, Huy Ninh, là con Trần Minh Tông; Khâm Thánh hoàng hậu, mẹ Trần Thiếu Đế, cũng là con Huy Ninh với Quý Ly. Khi giao thiệp với nhà Minh, phía họ Hồ từng viện quan hệ cháu ngoại Minh Tông của Hán Thương để giải thích việc ông trông coi quốc sự.",
            [
              [
                "ho-annals-viii",
                "Tờ 36b: chọn thái tử; tờ 38b–39a: Huy Ninh, Khâm Thánh và thư sang Minh",
              ],
              [
                "the-thu",
                "Chương 6, phần I.b: con thứ Quý Ly, em Nguyên Trừng",
              ],
            ],
          ),
        ],
      },
      {
        title: "Điều hành đất nước trong thời cải cách",
        claimIds: [
          passage(
            "ho-bio-han-thuong-government",
            "Dưới thời Hán Thương, triều đình tiếp tục những thay đổi về hành chính và tuyển dụng người học. Năm 1401, ông cho làm sổ hộ tịch trong cả nước và bổ dụng Nguyễn Phi Khanh làm Hàn lâm học sĩ. Năm 1402, triều đình sửa đường từ Tây Đô đến Hóa Châu, đặt trạm truyền thư; những việc này vừa phục vụ quản lý đất nước vừa gắn với nhu cầu quân sự.",
            [
              [
                "ho-annals-viii",
                "Mục Tân Tỵ 1401, tờ 39a–40b: hộ tịch, bổ dụng Phi Khanh; mục Nhâm Ngọ 1402: đường thiên lý",
              ],
            ],
          ),
        ],
      },
      {
        title: "Chiến tranh và sự chấm dứt vương triều",
        claimIds: [
          passage(
            "ho-bio-han-thuong-end",
            "Từ năm 1406, cuộc tiến công của quân Minh đặt triều Hồ trước thử thách quyết định. Sau khi phòng tuyến Đa Bang–Đông Đô bị phá, nhà Hồ tiếp tục chống giữ và phản công ở hạ lưu sông Hồng nhưng không đảo ngược được tình thế. Năm 1407, Hán Thương bị bắt tại vùng núi Cao Vọng, sau đó bị đưa sang Trung Quốc; năm sinh và năm mất của ông chưa được xác định chắc chắn trong các nguồn đang dẫn.",
            [
              [
                "ho-military-history",
                "Phần về cuộc kháng chiến chống Minh 1406–1407, các đoạn Đa Bang và Hàm Tử",
              ],
              [
                "ho-annals-ix",
                "Năm 1407, tờ 3a–3b: Hán Thương và thái tử Nhuế bị bắt",
              ],
              [
                "the-thu",
                "Chương 6, phần I.b: bị đưa sang Trung Quốc, chưa rõ năm mất",
              ],
            ],
          ),
        ],
      },
    ],
    eventIds: [
      "nha-ho-1400",
      "ho-minh-tien-cong-1406",
      "ho-da-bang-1407",
      "ho-ham-tu-1407",
      "ho-rut-ve-tay-do-1407",
      "ho-bat-ho-ho-1407",
    ],
  },
  {
    id: "ho-nguyen-trung",
    periodIds: ["tran", "ho"],
    name: "Hồ Nguyên Trừng",
    aliases: ["Lê Trừng", "Hồ Trừng", "Mạnh Nguyên", "Nam Ông"],
    personalName: "Hồ Nguyên Trừng",
    life: "1374–1446",
    title: "Tả tướng quốc · nhà kỹ thuật quân sự · tác giả Nam Ông mộng lục",
    contextYear: 1406,
    summaryClaimIds: [
      passage(
        "ho-bio-nguyen-trung-summary",
        "Hồ Nguyên Trừng, tự Mạnh Nguyên, hiệu Nam Ông, là con trai cả Hồ Quý Ly và là anh Hồ Hán Thương. Ông giữ chức Tả tướng quốc dưới triều Hồ, tham gia tổ chức phòng thủ và trực tiếp cầm quân chống Minh. Tài chế tạo hỏa khí khiến cuộc đời ông tiếp tục gắn với kỹ thuật quân sự sau khi bị bắt và đưa sang Trung Quốc năm 1407.",
        [
          [
            "ho-nguyen-trung-abstract",
            "Tóm tắt bài Ngô Thị Xinh, trang 9 của bản PDF tóm tắt",
          ],
          [
            "ho-nguyen-trung-biography",
            "Đoạn mở đầu: gia đình, chức vụ, việc bị bắt và làm quan nhà Minh",
          ],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Một người anh giữ vai trò giúp nước",
        claimIds: [
          passage(
            "ho-bio-nguyen-trung-family-office",
            "Dù là con cả, Nguyên Trừng không phải người nhận ngôi khi Quý Ly nhường lại cho Hán Thương. Trước khi nhà Hồ thành lập, ông đã giữ chức vụ dưới triều Trần; Toàn thư ghi năm 1394 ông được giao làm Phán tư sự. Đến thời Hồ, vai trò nổi bật của ông nằm ở việc quân, hỏa khí và tổ chức chiến đấu.",
            [
              [
                "ho-annals-viii",
                "Mục Giáp Tuất 1394, tờ 24b: Lê Nguyên Trừng làm Phán tư sự",
              ],
              [
                "ho-nguyen-trung-abstract",
                "Tóm tắt: chức vụ trước và sau khi nhà Hồ thành lập",
              ],
              ["the-thu", "Chương 6, phần I.b: Hán Thương là em Nguyên Trừng"],
            ],
          ),
        ],
      },
      {
        title: "Hỏa khí và cuộc kháng chiến 1406–1407",
        claimIds: [
          passage(
            "ho-bio-nguyen-trung-artillery",
            "Nguyên Trừng được biết đến với việc chế tạo súng thần cơ và các phương tiện chiến đấu của triều Hồ. Trong cuộc chiến với quân Minh, ông chỉ huy quân ở các phòng tuyến sông và tham gia phản công Hàm Tử. Sau thất bại, ông bị bắt ở cửa biển Kỳ La; sang Trung Quốc, ông được giao công việc liên quan đến hỏa khí và về sau giữ chức vụ tại Bộ Công nhà Minh.",
            [
              [
                "ho-nguyen-trung-biography",
                "Các đoạn chiến đấu, chế tạo súng và làm quan Bộ Công",
              ],
              [
                "ho-annals-ix",
                "Năm 1407, tờ 1a–3b: phản công Hàm Tử, bị bắt ở Kỳ La",
              ],
              [
                "ho-nguyen-trung-abstract",
                "Tóm tắt về hỏa khí và chức Bộ Công",
              ],
            ],
          ),
        ],
      },
      {
        title: "Nam Ông mộng lục và ký ức về nước cũ",
        claimIds: [
          passage(
            "ho-bio-nguyen-trung-literature",
            "Trong thời gian sống ở Trung Quốc, Nguyên Trừng viết Nam Ông mộng lục bằng chữ Hán. Tác phẩm gồm 31 thiên truyện, lưu lại nhiều câu chuyện về nhân vật và đời sống nước Việt thời Lý–Trần. Những câu chuyện ấy mang cả giá trị tư liệu lẫn cách kể và lựa chọn của tác giả, trở thành một phần di sản văn học của người sống xa quê sau biến cố 1407.",
            [
              [
                "ho-nam-ong-research",
                "Mở đầu và phần so sánh 31 thiên Nam Ông mộng lục với Toàn thư",
              ],
              [
                "ho-nguyen-trung-biography",
                "Các đoạn giới thiệu tác phẩm, lời tựa 1438 và những chuyện thời Lý–Trần",
              ],
            ],
            "interpretation",
          ),
        ],
      },
    ],
    eventIds: [
      "ho-minh-tien-cong-1406",
      "ho-da-bang-1407",
      "ho-ham-tu-1407",
      "ho-bat-ho-ho-1407",
    ],
  },
  {
    id: "nguyen-phi-khanh",
    periodIds: ["tran", "ho"],
    name: "Nguyễn Phi Khanh",
    aliases: ["Nguyễn Ứng Long", "Nhị Khê"],
    personalName: "Nguyễn Ứng Long",
    life: "Thế kỷ XIV–XV",
    title: "Nhà nho, nhà thơ · Hàn lâm học sĩ thời Hồ",
    contextYear: 1401,
    summaryClaimIds: [
      passage(
        "ho-bio-phi-khanh-summary",
        "Nguyễn Phi Khanh vốn tên Nguyễn Ứng Long, là nhà nho và nhà thơ sống qua cuối thời Trần và thời Hồ. Ông là cha Nguyễn Trãi; gia đình có quan hệ với Trần Nguyên Đán qua cuộc hôn nhân với Trần Thị Thái. Năm 1401, Hồ Hán Thương bổ dụng ông làm Hàn lâm học sĩ, mở ra quãng thời gian ông tham gia chính quyền nhà Hồ.",
        [
          [
            "ho-phi-khanh-research",
            "Trang in 28–29 và 34: tên cũ, gia đình, đường làm quan",
          ],
          [
            "ho-annals-viii",
            "Mục Tân Tỵ 1401, tờ 40a–40b: bổ dụng Hàn lâm học sĩ",
          ],
          [
            "ho-trai-museum",
            "Đầu bài: Nguyễn Phi Khanh và Trần Thị Thái là cha mẹ Nguyễn Trãi",
          ],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Từ khoa bảng cuối thời Trần đến làm quan nhà Hồ",
        claimIds: [
          passage(
            "ho-bio-phi-khanh-career",
            "Nguyễn Ứng Long đỗ khoa thi năm 1374 nhưng con đường được bổ dụng dưới triều Trần không thuận lợi. Đến thời Hồ, ông đổi tên thành Phi Khanh và tham gia bộ máy quan lại. Trong khi cha được giao chức Hàn lâm học sĩ năm 1401, người con Nguyễn Trãi đã đỗ Thái học sinh ở khoa thi do nhà Hồ tổ chức năm 1400.",
            [
              [
                "ho-phi-khanh-research",
                "Trang in 29 và 34: khoa 1374, tên Phi Khanh, cha con ra làm quan",
              ],
              [
                "ho-annals-viii",
                "Tờ 38a: Nguyễn Trãi đỗ; tờ 40a–40b: Phi Khanh được bổ dụng",
              ],
            ],
          ),
        ],
      },
      {
        title: "Thơ văn trước những thay đổi của thời cuộc",
        claimIds: [
          passage(
            "ho-bio-phi-khanh-poetry",
            "Thơ văn Phi Khanh bộc lộ mong muốn đem việc học giúp đời, đồng thời lưu lại nỗi lo trước đời sống khó khăn của nhân dân. Nghiên cứu về tác phẩm của ông cho thấy những băn khoăn ấy hiện diện cả khi chờ được dùng lẫn khi đã bước vào triều chính. Di sản thơ văn giúp nhìn thời Trần–Hồ qua trải nghiệm của một người trí thức, bên cạnh các ghi chép về vua và chiến trận.",
            [
              [
                "ho-phi-khanh-poetry",
                "Phần 2.1 về bản thân, thời đại và phần 2.2 về cuộc sống nhân dân",
              ],
              [
                "ho-phi-khanh-research",
                "Các phần 2.1–2.2 về lý tưởng hành đạo",
              ],
            ],
            "interpretation",
          ),
        ],
      },
      {
        title: "Biến cố năm 1407",
        claimIds: [
          passage(
            "ho-bio-phi-khanh-1407",
            "Khi nhà Hồ thất bại năm 1407, cuộc đời quan lại của Phi Khanh ở Đại Ngu cũng chấm dứt. Toàn thư ghi ông trong nhóm đã đầu hàng trước lúc những người đứng đầu họ Hồ bị bắt; các nghiên cứu về ông còn ghi việc bị đưa sang Trung Quốc. Biến cố ấy đặt gia đình Phi Khanh–Nguyễn Trãi trong hoàn cảnh nước mất, ly tán.",
            [
              [
                "ho-annals-ix",
                "Năm 1407, tờ 3b: nhóm Nguyễn Phi Khanh đã đầu hàng từ trước",
              ],
              [
                "ho-phi-khanh-research",
                "Trang in 28–29: bị đưa sang Trung Quốc sau thất bại 1407",
              ],
            ],
          ),
        ],
      },
    ],
    eventIds: ["ho-bat-ho-ho-1407"],
  },
  {
    id: "nguyen-trai",
    periodIds: ["ho"],
    name: "Nguyễn Trãi",
    aliases: ["Ức Trai"],
    personalName: "Nguyễn Trãi",
    life: "1380–1442",
    title: "Nho sĩ đỗ Thái học sinh và làm quan thời Hồ",
    contextYear: 1400,
    summaryClaimIds: [
      passage(
        "ho-bio-trai-summary",
        "Nguyễn Trãi, hiệu Ức Trai, là con Nguyễn Phi Khanh và Trần Thị Thái, cháu ngoại Trần Nguyên Đán. Năm 1400, ông đỗ Thái học sinh trong khoa thi đầu triều Hồ rồi tham gia bộ máy quan lại. Quãng đời đầu ấy gắn ông với sự chuyển đổi từ nhà Trần sang nhà Hồ và với biến cố chiến tranh năm 1407.",
        [
          [
            "ho-trai-museum",
            "Đầu bài: thân thế, khoa thi 1400, làm quan nhà Hồ",
          ],
          ["ho-annals-viii", "Mục Canh Thìn 1400, tờ 38a: danh sách người đỗ"],
          [
            "ho-trai-hannom",
            "Mục Nguyễn Trãi với các thế hệ người Việt Nam, đoạn mở đầu",
          ],
        ],
      ),
    ],
    biographySections: [
      {
        title: "Gia đình và con đường khoa bảng",
        claimIds: [
          passage(
            "ho-bio-trai-family-study",
            "Cha Nguyễn Trãi là Nguyễn Ứng Long, về sau mang tên Phi Khanh; mẹ ông thuộc gia đình quan Tư đồ Trần Nguyên Đán. Sự nối tiếp giữa việc học của cha và khoa thi của người con đặt gia đình này trong lớp nhà nho bước vào chính quyền Hồ. Ở khoa thi 1400, Nguyễn Trãi đỗ cùng Lý Tử Tấn, Vũ Mộng Nguyên và những người khác được Toàn thư ghi tên.",
            [
              ["ho-trai-museum", "Đoạn thân thế"],
              [
                "ho-phi-khanh-research",
                "Trang in 34: cha con cùng ra làm quan thời Hồ",
              ],
              ["ho-annals-viii", "Mục 1400, tờ 38a: khoa thái học sinh"],
            ],
          ),
        ],
      },
      {
        title: "Bước đầu làm quan giữa một triều đại ngắn ngủi",
        claimIds: [
          passage(
            "ho-bio-trai-office",
            "Sau khi đỗ, Nguyễn Trãi giữ chức Chính chưởng Ngự sử đài dưới triều Hồ. Cha ông được bổ làm Hàn lâm học sĩ dưới thời Hán Thương vào năm 1401. Khi cuộc kháng chiến chống Minh thất bại, bộ máy mà hai cha con từng phục vụ tan rã và Phi Khanh bị đưa ra khỏi đất nước.",
            [
              [
                "ho-trai-hannom",
                "Mục Nguyễn Trãi với các thế hệ người Việt Nam: đỗ 1400, chức Chính chưởng Ngự sử đài",
              ],
              ["ho-annals-viii", "Mục 1401, tờ 40a–40b"],
              ["ho-phi-khanh-research", "Trang in 28–29: biến cố 1407"],
            ],
          ),
        ],
      },
    ],
    eventIds: ["ho-bat-ho-ho-1407"],
  },
];

export const hoSharedPersonUpdates: ({ personId: string } & Partial<
  Omit<Person, "id">
>)[] = [
  {
    personId: "ho-quy-ly",
    title: "Người lập nhà Hồ · Thái thượng hoàng từ cuối năm 1400",
    biographySections: [
      {
        title: "Nhường ngôi nhưng tiếp tục coi chính sự",
        claimIds: [
          passage(
            "ho-bio-quy-ly-retired-rule",
            "Cuối năm 1400, Hồ Quý Ly nhường ngôi cho Hán Thương và tự xưng Thái thượng hoàng. Ông tiếp tục cùng con điều hành đất nước, nên những cải cách và việc chuẩn bị chiến tranh thời Hán Thương vẫn gắn với cả hai cha con. Quan hệ này nối tiếp cách tổ chức có vua và Thượng hoàng từng tồn tại dưới triều Trần.",
            [
              [
                "ho-annals-viii",
                "Mục Canh Thìn 1400, tờ 38b: cùng coi chính sự",
              ],
              [
                "ho-military-history",
                "Phần đầu thời Hồ: nhường ngôi, giữ vai trò Thượng hoàng và tổ chức quốc phòng",
              ],
            ],
          ),
        ],
      },
      {
        title: "Thất bại năm 1407 và số phận về sau",
        claimIds: [
          passage(
            "ho-bio-quy-ly-defeat",
            "Quý Ly và Hán Thương chỉ huy cuộc chống giữ khi quân Minh tiến vào từ năm 1406. Sau những thất bại ở đồng bằng sông Hồng, họ rút về Thanh Hóa rồi xuống vùng ven biển phía nam. Năm 1407, Quý Ly bị bắt và đưa sang Trung Quốc cùng nhiều người trong gia đình; việc bị bắt không đồng nghĩa năm 1407 đã được xác định là năm ông mất.",
            [
              ["ho-annals-ix", "Đầu năm 1407, tờ 1a–3b: rút quân và bị bắt"],
              [
                "ho-han-thuong-chronology",
                "Các đoạn cuối: rút về Thanh Hóa và bị bắt ở vùng Kỳ La",
              ],
            ],
          ),
        ],
      },
    ],
    eventIds: [
      "nha-ho-1400",
      "ho-minh-tien-cong-1406",
      "ho-da-bang-1407",
      "ho-ham-tu-1407",
      "ho-rut-ve-tay-do-1407",
      "ho-bat-ho-ho-1407",
    ],
  },
];

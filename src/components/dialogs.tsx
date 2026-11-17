"use client";
import { useEffect, useRef, useState } from "react";
import { citations, sources } from "@/data/history";
import { statusLabels } from "@/data/schema";
import { claimById, searchHistory, type SearchResult } from "@/lib/history";
import { Icon } from "./icon";

export function Modal({
  title,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const opener = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      dialog.close();
      opener?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "modal-wide" : ""}`}
      aria-labelledby="dialog-heading"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-heading">
        <h2 id="dialog-heading">{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Đóng hộp thoại"
        >
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export function EvidenceDialog({
  claimId,
  onClose,
}: {
  claimId: string;
  onClose: () => void;
}) {
  const claim = claimById(claimId)!;
  const refs = citations.filter((c) => c.claimId === claimId);
  return (
    <Modal title="Đọc cùng bằng chứng" onClose={onClose}>
      <div className="evidence-claim">
        <span className="eyebrow">Khẳng định đang đọc</span>
        <p>{claim.text}</p>
      </div>
      <div className="evidence-status">
        <span>{statusLabels[claim.status]}</span>
        <span>
          {claim.kind === "interpretation"
            ? "Diễn giải từ tư liệu"
            : claim.kind === "chronicle"
              ? "Ghi chép trong nguồn"
              : "Dữ kiện có dẫn nguồn"}
        </span>
      </div>
      {claim.note && (
        <aside className="editorial-note">
          <strong>Điểm cần đối chiếu</strong>
          <p>{claim.note}</p>
        </aside>
      )}
      <ol className="evidence-list">
        {refs.map((c) => {
          const source = sources.find((s) => s.id === c.sourceId)!;
          return (
            <li key={c.id}>
              <h3>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                  <Icon name="external" size={14} />
                </a>
              </h3>
              <p className="source-byline">
                {source.author ?? "Chưa xác nhận tác giả"} · {source.publisher}
                {source.year ? ` · ${source.year}` : ""}
              </p>
              <dl>
                <dt>Vị trí tra cứu</dt>
                <dd>{c.location}</dd>
                <dt>Phạm vi hỗ trợ</dt>
                <dd>{c.supports}</dd>
                <dt>Giới hạn nguồn</dt>
                <dd>{source.limits}</dd>
                {source.upstream && (
                  <>
                    <dt>Nguồn bài đăng lại</dt>
                    <dd>{source.upstream}</dd>
                  </>
                )}
                <dt>Truy cập</dt>
                <dd>{source.accessed}</dd>
              </dl>
            </li>
          );
        })}
      </ol>
      <p className="fine-print">
        Nguồn được đọc và đối chiếu bởi trợ lý biên soạn có hỗ trợ AI. Chưa có
        biên tập viên hoặc chuyên gia lịch sử duyệt. Hai bài đăng lại cùng một
        tài liệu không được tính là hai chứng cứ độc lập.
      </p>
    </Modal>
  );
}

export function SearchDialog({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (result: SearchResult) => void;
}) {
  const [query, setQuery] = useState("");
  const results = searchHistory(query);
  const labels: Record<SearchResult["kind"], string> = {
    person: "Nhân vật",
    event: "Sự kiện",
    place: "Địa điểm",
    period: "Thời kỳ",
    chapter: "Chương",
  };
  return (
    <Modal title="Tìm trong Sử Đồ" onClose={onClose}>
      <label className="search-field">
        <Icon name="search" />
        <input
          autoFocus
          aria-label="Tên nhân vật, địa điểm hoặc sự kiện"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Trần Cảnh, Thái Tông, Bạch Đằng…"
        />
      </label>
      <p className="fine-print">
        Tìm có dấu hoặc không dấu, theo tên húy, miếu hiệu và tên thường gọi.
      </p>
      <div aria-live="polite" className="search-count">
        {query
          ? `${results.length} kết quả`
          : "Gợi ý: tran thua · ly chieu hoang · 1288"}
      </div>
      {query && !results.length && (
        <p className="search-empty">
          Chưa có kết quả phù hợp. Thử tên ngắn hơn; nội dung ngoài chương Trần
          còn đang biên soạn.
        </p>
      )}
      <ul className="search-results">
        {results.map((result) => (
          <li key={`${result.kind}-${result.id}`}>
            <button onClick={() => onSelect(result)}>
              <small>{labels[result.kind]}</small>
              <strong>{result.label}</strong>
              <span>{result.detail}</span>
              <Icon name="arrow" size={16} />
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

export function LibraryDialog({
  initialTab,
  onClose,
}: {
  initialTab: "methods" | "sources";
  onClose: () => void;
}) {
  const [tab, setTab] = useState(initialTab);
  return (
    <Modal title="Phương pháp & nguồn tư liệu" onClose={onClose} wide>
      <div className="dialog-tabs">
        <button
          aria-pressed={tab === "methods"}
          onClick={() => setTab("methods")}
        >
          Cách đọc Sử Đồ
        </button>
        <button
          aria-pressed={tab === "sources"}
          onClick={() => setTab("sources")}
        >
          Danh mục nguồn ({sources.length})
        </button>
      </div>
      {tab === "methods" ? (
        <div className="methods-content">
          <p className="serif-lead">
            Một bản đồ giúp định hướng.
            <br />
            Một chú thích giúp kiểm tra.
          </p>
          <h3>Bản đồ đang cho biết điều gì?</h3>
          <p>
            Nền đất liền và sông lấy từ Natural Earth, tỷ lệ gốc 1:50 triệu,
            thuộc public domain. Đây là địa lý hiện đại để định hướng, không
            phải bờ biển và lòng sông được phục dựng thời Trần.
          </p>
          <p>
            Điểm Thăng Long, Thái Miếu, Kiếp Bạc, chùa Lân và Tây Đô dùng tọa độ
            di sản công bố bởi UNESCO. Tọa độ đền Kiếp Bạc không được dùng làm
            tọa độ trận Bạch Đằng. Hải Ấp, Đông Bộ Đầu và chiến trường Bạch Đằng
            chưa có tọa độ đủ căn cứ, nên chỉ xuất hiện trong danh sách.
          </p>
          <aside className="editorial-note">
            <strong>Chưa có lớp ranh giới được đối chiếu cho mốc này.</strong>
            <p>
              Không có polygon lãnh thổ lịch sử, tuyến hành quân giả định hoặc
              phép nội suy giữa các năm. Lớp tham chiếu hiện đại mặc định tắt và
              được ghi riêng khi bật.
            </p>
          </aside>
          <h3>Đọc nguồn và mức bất định</h3>
          <p>
            Nút số cạnh mỗi đoạn mở khẳng định cùng vị trí tra cứu, nguồn bài
            đăng lại và giới hạn tiếp cận. “Đã đối chiếu nguồn” mô tả công việc
            so sánh, không phải sự đồng thuận của chuyên gia. Nguồn đơn lẻ giữ
            trạng thái đang biên soạn; chưa có nội dung được người biên tập
            duyệt.
          </p>
          <h3>Ngày tháng và tên gọi</h3>
          <p>
            1225/1226 được giữ như một dị biệt cần nghiên cứu hệ lịch, không tự
            gán ngày dương lịch. Trị vì, Thái thượng hoàng, miếu hiệu và danh
            hiệu truy tôn được tách riêng. Giao diện không hiển thị năm 0.
          </p>
          <h3>Phạm vi phiên bản đầu</h3>
          <p>
            Chín phần nhà Trần đã có khung đọc và dẫn nguồn, với bối cảnh cuối
            Lý và chuyển sang Hồ. Nhiệm kỳ các vua được lưu riêng, bao gồm Dương
            Nhật Lễ. Các vai trò Thượng hoàng mới biên soạn một phần; chuyên đề
            đê điều, văn học, kiến trúc và quan hệ khu vực cần nghiên cứu thêm.
          </p>
          <h3>Thao tác bằng bàn phím</h3>
          <p>
            Tab để chọn điều khiển; Enter hoặc Space để mở. Escape đóng hộp
            thoại. Khi bản đồ được focus, dùng phím mũi tên để dịch, +/− để đổi
            độ phóng và Home để khôi phục. Danh sách địa điểm là cách thay thế
            cho thao tác trực tiếp trên bản đồ.
          </p>
          <p className="fine-print">
            Không cần token bản đồ, dịch vụ tile hay tài khoản. Nội dung và tài
            sản đã tải nằm trong dự án. Không có trình theo dõi hoặc chatbot làm
            giao diện chính.
          </p>
        </div>
      ) : (
        <ol className="source-library">
          {sources.map((s) => (
            <li key={s.id}>
              <span className="source-kind">{s.type}</span>
              <h3>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title} <Icon name="external" size={13} />
                </a>
              </h3>
              <p>
                {s.author ?? "Chưa xác nhận tác giả"} · {s.publisher}
                {s.year ? ` · ${s.year}` : ""}
              </p>
              <p>
                <strong>Đã đọc:</strong> {s.readLocation}
              </p>
              <details>
                <summary>Giới hạn và xuất xứ</summary>
                <p>{s.limits}</p>
                {s.upstream && <p>Nguồn gốc: {s.upstream}</p>}
                <p>
                  Ấn bản: {s.edition ?? "chưa xác nhận / không áp dụng"}. Truy
                  cập {s.accessed}.
                </p>
              </details>
            </li>
          ))}
        </ol>
      )}
    </Modal>
  );
}

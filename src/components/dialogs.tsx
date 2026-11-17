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
      <div aria-live="polite" className="search-count">
        {query
          ? `${results.length} kết quả`
          : "Gợi ý: tran thua · ly chieu hoang · 1288"}
      </div>
      {query && !results.length && (
        <p className="search-empty">
          Chưa có kết quả phù hợp.
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

export function LibraryDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title={`Nguồn tư liệu (${sources.length})`} onClose={onClose} wide>
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
              <strong>Phần trích dẫn:</strong> {s.readLocation}
            </p>
            <details>
              <summary>Thông tin xuất bản</summary>
              {s.upstream && <p>Nguồn gốc: {s.upstream}</p>}
              <p>
                Ấn bản: {s.edition ?? "chưa xác nhận / không áp dụng"}. Truy
                cập {s.accessed}.
              </p>
            </details>
          </li>
        ))}
      </ol>
    </Modal>
  );
}

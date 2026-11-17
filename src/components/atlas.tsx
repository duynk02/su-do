"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { chapters, events, periods, places } from "@/data/history";
import { statusLabels } from "@/data/schema";
import {
  formatYear,
  initialState,
  personYear,
  readState,
  stateQuery,
  visiblePlaces,
  type AtlasState,
  type SearchResult,
} from "@/lib/history";
import { Icon } from "./icon";
import { Reader, type ReaderActions } from "./reader";
import { EvidenceDialog, LibraryDialog, SearchDialog } from "./dialogs";

const AtlasMap = dynamic(() => import("./atlas-map"), {
  ssr: false,
  loading: () => (
    <div className="map-skeleton" role="status">
      Đang mở bản đồ…<span>Bạn có thể đọc nội dung ngay.</span>
    </div>
  ),
});

export default function Atlas() {
  const [state, setState] = useState<AtlasState>(initialState);
  const [mobilePane, setMobilePane] = useState<"map" | "reader">("reader");
  const [searchOpen, setSearchOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [evidence, setEvidence] = useState<string | null>(null);
  const [yearInput, setYearInput] = useState("1225");
  const [yearError, setYearError] = useState("");
  const [shareMessage, setShareMessage] = useState<{ text: string } | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);
  const stateRef = useRef<AtlasState>(initialState);
  const readerRef = useRef<HTMLDivElement>(null);
  const lastReaderKey = useRef("");
  const readerKey = [
    state.period,
    state.view,
    state.chapter,
    state.person,
    state.event,
    state.view === "place" ? state.place : null,
  ].join("|");
  useEffect(() => {
    const changed =
      lastReaderKey.current && lastReaderKey.current !== readerKey;
    lastReaderKey.current = readerKey;
    if (!changed || !readerRef.current) return;
    readerRef.current.scrollTop = 0;
    if (
      mobilePane === "reader" &&
      window.matchMedia("(max-width: 900px)").matches
    ) {
      readerRef.current.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }, [readerKey, mobilePane]);
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    stateRef.current = readState(window.location.search);
    setState(stateRef.current);
    setMounted(true);
    const pop = () => {
      stateRef.current = readState(window.location.search);
      setState(stateRef.current);
    };
    window.addEventListener("popstate", pop);
    return () => {
      window.removeEventListener("popstate", pop);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);
  useEffect(() => {
    setYearInput(String(state.year <= 0 ? state.year - 1 : state.year));
    setYearError("");
  }, [state.year]);
  useEffect(() => {
    if (!shareMessage) return;
    const timer = window.setTimeout(() => setShareMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [shareMessage]);
  const navigate = useCallback((patch: Partial<AtlasState>) => {
    const next = { ...stateRef.current, ...patch };
    stateRef.current = next;
    window.history.pushState(null, "", stateQuery(next));
    setState(next);
    setYearError("");
  }, []);
  const period = periods.find((p) => p.id === state.period)!;
  const chapter = chapters.find((c) => c.id === state.chapter)!;
  const onPeriod = (id: string) => {
    const p = periods.find((p) => p.id === id)!;
    navigate({
      period: id,
      chapter: "cuoi-ly",
      year: id === "tran" ? 1225 : id === "co-dai" ? -499 : p.date.start,
      view: id === "tran" ? "story" : "overview",
      person: null,
      event: null,
      place: null,
    });
  };
  const onChapter = (id: string) => {
    const c = chapters.find((c) => c.id === id)!;
    navigate({
      period: "tran",
      chapter: id,
      year:
        id === "cuoi-ly" || id === "gia-toc"
          ? 1225
          : id === "cuoi-tran"
            ? 1397
            : c.date.start,
      view: "story",
      person: null,
      event: null,
      place: null,
    });
    setMobilePane("reader");
  };
  const onPerson = (id: string) => {
    const year = personYear(id);
    navigate({
      period: year >= 1400 ? "ho" : "tran",
      year,
      view: "people",
      person: id,
      event: null,
      place: null,
    });
    setMobilePane("reader");
  };
  const onEvent = (id: string) => {
    const e = events.find((e) => e.id === id)!;
    navigate({
      period: e.id === "nha-ho-1400" ? "ho" : "tran",
      view: "events",
      event: id,
      person: null,
      place: null,
      year: e.date.start,
    });
    setMobilePane("reader");
  };
  const onPlace = (id: string) => {
    navigate({ view: "place", place: id, person: null, event: null });
    setMobilePane("reader");
  };
  const actions: ReaderActions = {
    onChapter,
    onPerson,
    onEvent,
    onPlace,
    onClaim: setEvidence,
    onPeriod,
    onView: (view) =>
      navigate({ view, person: null, event: null, place: null }),
    onMap: (id) => {
      if (id) navigate({ place: id });
      setMobilePane("map");
    },
  };
  const selectSearch = (result: SearchResult) => {
    setSearchOpen(false);
    if (result.kind === "person") {
      onPerson(result.id);
    }
    if (result.kind === "event") onEvent(result.id);
    if (result.kind === "place") {
      const p = places.find((p) => p.id === result.id)!;
      navigate({
        period: p.periodIds.includes("tran") ? "tran" : "ho",
        view: "place",
        place: p.id,
        person: null,
        event: null,
        year: p.validFrom,
      });
      setMobilePane("reader");
    }
    if (result.kind === "period") onPeriod(result.id);
    if (result.kind === "chapter") onChapter(result.id);
  };
  const activeEvent = events.find((e) => e.id === state.event);
  const mapPlaces = visiblePlaces(state.period, state.year);
  // Explicit related places can be outside the selected year. The UI labels them as chapter references.
  const highlighted =
    state.view === "story"
      ? chapter.placeIds
      : (activeEvent?.placeIds ?? (state.place ? [state.place] : []));
  const availablePlaces = [
    ...new Map(
      [...mapPlaces, ...places.filter((p) => highlighted.includes(p.id))].map(
        (p) => [p.id, p],
      ),
    ).values(),
  ];
  const contextNotes = [
    state.year < period.date.start || state.year >= period.date.end
      ? `Năm ${formatYear(state.year)} nằm ngoài khoảng ${period.date.label}. Bài đọc đang được giữ làm bối cảnh.`
      : null,
    availablePlaces.some(
      (p) => state.year < p.validFrom || state.year >= p.validTo,
    )
      ? "Có địa điểm được giữ từ bài đọc ngoài khoảng liên hệ của năm đang xem; đây là điểm tham chiếu theo chương."
      : null,
  ]
    .filter(Boolean)
    .join(" ");
  const submitYear = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(yearInput);
    if (
      !/^-?\d+$/.test(yearInput) ||
      !Number.isSafeInteger(value) ||
      value === 0 ||
      value < -700 ||
      value > 1900
    ) {
      setYearError(
        "Nhập năm từ 700 TCN (−700) đến 1900; lịch sử không có năm 0.",
      );
      return;
    }
    const year = value < 0 ? value + 1 : value;
    const p =
      year >= period.date.start && year < period.date.end
        ? period
        : periods.find((p) => year >= p.date.start && year < p.date.end);
    navigate({
      year,
      period: p?.id ?? state.period,
      view: p?.id === state.period ? state.view : "overview",
      person: null,
      event: null,
      place: null,
    });
  };

  return (
    <div className={`atlas-app mode-${state.mode} mobile-${mobilePane}`}>
      <a className="skip-link" href="#reader">
        Đến bài đọc
      </a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Sử Đồ — về màn hình đầu">
          <span className="brand-mark">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M6 5h8v22H6zM18 5h8v22h-8z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M9 10h3m-3 5h3m-3 5h3m9-10h3m-3 5h3m-3 5h3"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
          <strong>Sử Đồ</strong>
          <span className="brand-descriptor">ATLAS LỊCH SỬ VIỆT NAM</span>
        </a>
        <button className="header-search" onClick={() => setSearchOpen(true)}>
          <Icon name="search" />
          <span>Tìm nhân vật, sự kiện, địa điểm…</span>
          <kbd>Tìm kiếm</kbd>
        </button>
        <nav className="header-nav" aria-label="Thông tin dự án">
          <button onClick={() => setLibraryOpen(true)}>
            Nguồn tư liệu <Icon name="external" size={13} />
          </button>
        </nav>
        <button
          className="mobile-search icon-button"
          onClick={() => setSearchOpen(true)}
          aria-label="Tìm kiếm"
        >
          <Icon name="search" />
        </button>
      </header>
      <div className="intro-strip">
        <span>Khám phá Việt Nam qua từng lớp thời gian.</span>
        <span>Một thời kỳ. Nhiều góc nhìn.</span>
      </div>
      <main className="atlas-layout">
        <aside className="timeline" aria-label="Chọn thời kỳ lịch sử">
          <div className="timeline-heading">
            <span className="eyebrow">Dòng thời gian</span>
            <span className="timeline-range">Từ thời dựng nước đến 1900</span>
          </div>
          <label className="mobile-period-select">
            Thời kỳ đang đọc
            <select
              value={state.period}
              onChange={(e) => onPeriod(e.target.value)}
            >
              {periods.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} · {p.date.label}
                </option>
              ))}
            </select>
          </label>
          <ol className="period-list">
            {periods.map((p) => (
              <li
                key={p.id}
                className={state.period === p.id ? "selected" : ""}
              >
                <button
                  className="period-button"
                  aria-current={state.period === p.id ? "true" : undefined}
                  onClick={() => onPeriod(p.id)}
                >
                  <span className="timeline-dot" />
                  <time>{p.date.label}</time>
                  <strong>{p.name}</strong>
                  <span className="period-state">
                    {p.id === "tran"
                      ? "9 chương có dẫn nguồn"
                      : statusLabels[p.status]}
                  </span>
                </button>
                {state.period === p.id && p.id === "tran" && (
                  <ol className="sub-timeline">
                    {[
                      {
                        id: "chuyen-trieu",
                        label: "1225/26",
                        title: "Hình thành triều Trần",
                      },
                      {
                        id: "khang-chien-1258",
                        label: "1258",
                        title: "Chống Mông Cổ",
                      },
                      {
                        id: "khang-chien-1285",
                        label: "1285",
                        title: "Chống Nguyên",
                      },
                      {
                        id: "bach-dang-1288",
                        label: "1288",
                        title: "Bạch Đằng",
                      },
                      {
                        id: "hon-nhan-1306",
                        label: "1306",
                        title: "Huyền Trân · Chế Mân",
                      },
                    ].map((e) => (
                      <li key={e.id}>
                        <button
                          className={state.event === e.id ? "active" : ""}
                          onClick={() => onEvent(e.id)}
                        >
                          <time>{e.label}</time>
                          {e.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                )}
                {state.period === p.id && p.lanes && (
                  <div className="timeline-parallel">
                    {p.lanes.map((l) => (
                      <span key={l.name}>{l.name}</span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
          <div className="timeline-foot">
            <span className="outline-dot" /> Chương khác đang biên soạn
          </div>
        </aside>
        <section className="exploration" aria-label="Không gian khám phá">
          <div className="exploration-toolbar">
            <div className="current-period">
              <span>{period.name}</span>
              <small>
                {period.id === "tran"
                  ? "Đại Việt"
                  : period.id === "ho"
                    ? "Đại Ngu"
                    : period.date.label}
              </small>
            </div>
            <div
              className="mode-switch"
              role="group"
              aria-label="Chế độ khám phá"
            >
              <button
                aria-pressed={state.mode === "explore"}
                onClick={() => navigate({ mode: "explore" })}
              >
                <Icon name="map" size={15} />
                <span>Khám phá</span>
              </button>
              <button
                aria-pressed={state.mode === "story"}
                onClick={() => {
                  navigate({
                    mode: "story",
                    view: state.period === "tran" ? "story" : "overview",
                  });
                  setMobilePane("reader");
                }}
              >
                <Icon name="book" size={15} />
                <span>Theo câu chuyện</span>
              </button>
            </div>
          </div>
          <div
            className="mobile-pane-switch"
            role="group"
            aria-label="Chọn vùng nội dung"
          >
            <button
              aria-pressed={mobilePane === "map"}
              onClick={() => setMobilePane("map")}
            >
              <Icon name="map" size={16} />
              Bản đồ
            </button>
            <button
              aria-pressed={mobilePane === "reader"}
              onClick={() => setMobilePane("reader")}
            >
              <Icon name="book" size={16} />
              Bài đọc
            </button>
          </div>
          <div className="map-and-reader">
            <section
              className="map-column"
              aria-label="Bản đồ và mốc thời gian"
            >
              <AtlasMap
                contextNote={contextNotes}
                year={state.year}
                places={availablePlaces}
                selectedPlace={state.place}
                highlighted={highlighted}
                onSelect={onPlace}
                wide={chapter.id === "khu-vuc" && state.view === "story"}
              />
              <div className="year-bar">
                <form onSubmit={submitYear}>
                  <label htmlFor="atlas-year">Đến năm</label>
                  <input
                    id="atlas-year"
                    inputMode="numeric"
                    value={yearInput}
                    onChange={(e) => setYearInput(e.target.value)}
                    aria-describedby={yearError ? "year-error" : undefined}
                    aria-invalid={!!yearError}
                  />
                  <button type="submit" aria-label="Xem năm đã nhập">
                    <Icon name="arrow" size={16} />
                  </button>
                </form>
                {state.year < 1225 && state.period === "tran" && (
                  <span>Bối cảnh trước triều Trần</span>
                )}
              </div>
              {yearError && (
                <p className="year-error" id="year-error" role="alert">
                  {yearError}
                </p>
              )}
            </section>
            <section className="reader-column" aria-label="Bài đọc lịch sử">
              <div className="reader-tabs" aria-label="Loại nội dung">
                <button
                  aria-pressed={
                    state.view === "story" ||
                    state.view === "overview" ||
                    state.view === "place"
                  }
                  onClick={() =>
                    actions.onView(
                      state.period === "tran" ? "story" : "overview",
                    )
                  }
                >
                  Câu chuyện
                </button>
                <button
                  aria-pressed={state.view === "people"}
                  onClick={() => actions.onView("people")}
                >
                  Nhân vật
                </button>
                <button
                  aria-pressed={state.view === "events"}
                  onClick={() => actions.onView("events")}
                >
                  Sự kiện
                </button>
                <button
                  className="reader-share"
                  aria-label="Sao chép liên kết đang xem"
                  title="Sao chép liên kết đang xem"
                  onClick={async () => {
                    try {
                      if (!window.location.search)
                        window.history.replaceState(
                          null,
                          "",
                          stateQuery(state),
                        );
                      await navigator.clipboard.writeText(window.location.href);
                      setShareMessage({ text: "Đã sao chép liên kết" });
                    } catch {
                      setShareMessage({
                        text: "Chưa sao chép được. Bạn có thể sao chép liên kết trên thanh địa chỉ.",
                      });
                    }
                  }}
                >
                  <Icon name="copy" size={17} />
                </button>
              </div>
              {state.period === "tran" && (
                <label className="chapter-select">
                  <span>Mục lục</span>
                  <select
                    value={state.chapter}
                    onChange={(e) => onChapter(e.target.value)}
                    aria-label="Chọn chương nhà Trần"
                  >
                    {chapters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.number}. {c.title}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div
                className="reader-body"
                ref={readerRef}
                id="reader"
                tabIndex={0}
                aria-label="Nội dung có thể cuộn"
              >
                <Reader state={state} actions={actions} />
              </div>
              <div className="reader-footer">
                <button onClick={() => actions.onView("overview")}>
                  Tổng quan thời kỳ <Icon name="arrow" size={13} />
                </button>
                <button onClick={() => setLibraryOpen(true)}>
                  Đọc nguồn <Icon name="external" size={12} />
                </button>
              </div>
            </section>
          </div>
        </section>
      </main>
      <div className="screen-announcement sr-only" aria-live="polite">
        {mounted
          ? `${period.name}. Mốc ${formatYear(state.year)}. ${state.view === "story" ? chapter.title : state.view === "people" ? "Nhân vật" : state.view === "events" ? "Sự kiện" : "Nội dung đã chọn"}. Chưa có ranh giới lịch sử được đối chiếu.`
          : ""}
      </div>
      {shareMessage && (
        <div className="share-message" role="status" aria-atomic="true">
          <span>{shareMessage.text}</span>
          <button
            onClick={() => setShareMessage(null)}
            aria-label="Đóng thông báo"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      )}
      {searchOpen && (
        <SearchDialog
          onClose={() => setSearchOpen(false)}
          onSelect={selectSearch}
        />
      )}
      {libraryOpen && <LibraryDialog onClose={() => setLibraryOpen(false)} />}
      {evidence && (
        <EvidenceDialog claimId={evidence} onClose={() => setEvidence(null)} />
      )}
    </div>
  );
}

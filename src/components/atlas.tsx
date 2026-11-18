"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { chapters, events, periods, places, people } from "@/data/history";
import { statusLabels } from "@/data/schema";
import {
  formatYear,
  chaptersForPeriod,
  periodStartState,
  periodForEntity,
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
  const [yearInput, setYearInput] = useState(String(initialState.year));
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
  const periodChapters = chaptersForPeriod(period.id);
  const chapter =
    periodChapters.find((entry) => entry.id === state.chapter) ??
    periodChapters[0];
  const onPeriod = (id: string) => {
    navigate({ ...periodStartState(id), mode: state.mode });
  };
  const onChapter = (id: string) => {
    const selected = chapters.find((entry) => entry.id === id);
    if (!selected) return;
    navigate({
      period: selected.periodId,
      chapter: id,
      year: selected.anchorYear ?? selected.date.start,
      view: "story",
      person: null,
      event: null,
      place: null,
    });
    setMobilePane("reader");
  };
  const onPerson = (id: string) => {
    const selected = people.find((entry) => entry.id === id);
    if (!selected) return;
    const targetPeriod = periodForEntity(
      selected.periodIds,
      state.period,
      personYear(id),
    );
    const target = periodStartState(targetPeriod.id);
    navigate({
      period: targetPeriod.id,
      chapter:
        targetPeriod.id === state.period ? state.chapter : target.chapter,
      year: personYear(id, targetPeriod.id),
      view: "people",
      person: id,
      event: null,
      place: null,
    });
    setMobilePane("reader");
  };
  const onEvent = (id: string) => {
    const selected = events.find((entry) => entry.id === id);
    if (!selected) return;
    const targetPeriod = periodForEntity(
      selected.periodIds,
      state.period,
      selected.date.start,
    );
    navigate({
      period: targetPeriod.id,
      chapter:
        targetPeriod.id === state.period
          ? state.chapter
          : periodStartState(targetPeriod.id).chapter,
      view: "events",
      event: id,
      person: null,
      place: null,
      year: selected.date.start,
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
        period: periodForEntity(p.periodIds, state.period, p.validFrom).id,
        chapter: periodStartState(
          periodForEntity(p.periodIds, state.period, p.validFrom).id,
        ).chapter,
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
      ? (chapter?.placeIds ?? [])
      : (activeEvent?.placeIds ?? (state.place ? [state.place] : []));
  const availablePlaces = [
    ...new Map(
      [...mapPlaces, ...places.filter((p) => highlighted.includes(p.id))].map(
        (p) => [p.id, p],
      ),
    ).values(),
  ];
  const contextNotes = [
    state.year === period.date.end
      ? `Mốc chuyển tiếp cuối ${period.name.toLowerCase()}. Bài đọc của thời kỳ đang được giữ.`
      : state.year < period.date.start || state.year > period.date.end
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
      chapter:
        p && p.id !== state.period
          ? periodStartState(p.id).chapter
          : state.chapter,
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
                    {chaptersForPeriod(p.id).length
                      ? `${chaptersForPeriod(p.id).length} chương có dẫn nguồn`
                      : statusLabels[p.status]}
                  </span>
                </button>
                {state.period === p.id && !!p.milestones?.length && (
                  <ol
                    className="sub-timeline"
                    aria-label={`Các mốc trong thời kỳ ${p.name.replace(/^Nhà /, "nhà ")}`}
                  >
                    {p.milestones?.map((milestone) => {
                      const event = events.find(
                        (entry) => entry.id === milestone.eventId,
                      )!;
                      const e = {
                        id: event.id,
                        label: milestone.label ?? event.date.label,
                        title: milestone.title ?? event.name,
                      };
                      return (
                        <li
                          key={e.id}
                          className={
                            state.event === e.id ? "active" : undefined
                          }
                        >
                          <button
                            className={state.event === e.id ? "active" : ""}
                            aria-current={
                              state.event === e.id ? "true" : undefined
                            }
                            onClick={() => onEvent(e.id)}
                          >
                            <time>{e.label}</time>
                            <span>{e.title}</span>
                          </button>
                        </li>
                      );
                    })}
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
              <small>{period.subtitle ?? period.date.label}</small>
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
                    view: periodChapters.length ? "story" : "overview",
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
                wide={!!chapter?.mapWide && state.view === "story"}
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
                {state.year < period.date.start && (
                  <span>Bối cảnh trước {period.name.toLowerCase()}</span>
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
                    actions.onView(periodChapters.length ? "story" : "overview")
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
              {!!periodChapters.length && (
                <label className="chapter-select">
                  <span>Mục lục</span>
                  <select
                    value={state.chapter}
                    onChange={(e) => onChapter(e.target.value)}
                    aria-label={`Chọn chương ${period.name.replace(/^Nhà /, "nhà ")}`}
                  >
                    {periodChapters.map((c) => (
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
          ? `${period.name}. Mốc ${formatYear(state.year)}. ${state.view === "story" ? (chapter?.title ?? period.name) : state.view === "people" ? "Nhân vật" : state.view === "events" ? "Sự kiện" : "Nội dung đã chọn"}. Chưa có ranh giới lịch sử được đối chiếu.`
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

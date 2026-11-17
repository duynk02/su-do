import {
  chapters,
  defaultPeriodId,
  claims,
  events,
  people,
  periods,
  places,
  tenures,
} from "../data/history";
import type { HistoricalDate } from "../data/schema";

export const chaptersForPeriod = (periodId: string) =>
  chapters.filter((chapter) => chapter.periodId === periodId);
export const peopleForPeriod = (periodId: string) =>
  people.filter((person) => person.periodIds.includes(periodId));
export const eventsForPeriod = (periodId: string) =>
  events.filter((event) => event.periodIds.includes(periodId));
export const tenuresForPeriod = (periodId: string) =>
  tenures.filter((tenure) => tenure.periodId === periodId);
export function periodById(id: string) {
  return (
    periods.find((period) => period.id === id) ??
    periods.find((period) => period.id === defaultPeriodId)!
  );
}
export function periodForEntity(
  ids: string[],
  preferred?: string,
  year?: number,
) {
  return periodById(
    (preferred && ids.includes(preferred) ? preferred : undefined) ??
      periods.find(
        (period) =>
          ids.includes(period.id) &&
          year !== undefined &&
          containsYear(period.date, year),
      )?.id ??
      ids[0] ??
      defaultPeriodId,
  );
}
export function periodStartState(id: string): AtlasState {
  const period = periodById(id);
  const chapter = chaptersForPeriod(period.id)[0];
  return {
    period: period.id,
    chapter: chapter?.id ?? "",
    year: period.defaultYear ?? chapter?.anchorYear ?? period.date.start,
    view: chapter ? "story" : "overview",
    person: null,
    event: null,
    place: null,
    mode: "explore",
  };
}

export function formatYear(year: number) {
  return year <= 0 ? `${1 - year} TCN` : `${year}`;
}
export function containsYear(date: HistoricalDate, year: number) {
  return date.start === date.end
    ? year === date.start
    : year >= date.start && year < date.end;
}
export function foldText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}
export type ReaderView = "story" | "overview" | "people" | "events" | "place";
export interface AtlasState {
  period: string;
  chapter: string;
  year: number;
  view: ReaderView;
  person: string | null;
  event: string | null;
  place: string | null;
  mode: "explore" | "story";
}
export const initialState: AtlasState = periodStartState(defaultPeriodId);
export function readState(search: string): AtlasState {
  const q = new URLSearchParams(search);
  const period = periodById(q.get("period") ?? defaultPeriodId);
  const periodChapters = chaptersForPeriod(period.id);
  const chapter =
    periodChapters.find((c) => c.id === q.get("chapter")) ?? periodChapters[0];
  const rawYear = q.get("year");
  const person =
    peopleForPeriod(period.id).find((p) => p.id === q.get("person"))?.id ??
    null;
  const event =
    eventsForPeriod(period.id).find((e) => e.id === q.get("event"))?.id ?? null;
  const place =
    places.find(
      (p) => p.id === q.get("place") && p.periodIds.includes(period.id),
    )?.id ?? null;
  const views: ReaderView[] = [
    "story",
    "overview",
    "people",
    "events",
    "place",
  ];
  let view = views.includes(q.get("view") as ReaderView)
    ? (q.get("view") as ReaderView)
    : chapter
      ? "story"
      : "overview";
  if (view === "story" && !chapter) view = "overview";
  if (view === "place" && !place) view = "overview";
  const contextYear =
    view === "people" && person
      ? personYear(person, period.id)
      : view === "events" && event
        ? events.find((entry) => entry.id === event)!.date.start
        : view === "place" && place
          ? Math.max(
              period.date.start,
              Math.min(
                period.date.end - 1,
                places.find((entry) => entry.id === place)!.validFrom,
              ),
            )
          : view === "story" && chapter
            ? (chapter.anchorYear ?? chapter.date.start)
            : (period.defaultYear ?? period.date.start);
  const year =
    rawYear && /^-?\d+$/.test(rawYear) ? Number(rawYear) : contextYear;
  return {
    period: period.id,
    chapter: chapter?.id ?? "",
    year:
      Number.isSafeInteger(year) && year >= -699 && year <= 1900
        ? year
        : contextYear,
    view,
    person,
    event,
    place,
    mode: q.get("mode") === "story" ? "story" : "explore",
  };
}
export function stateQuery(state: AtlasState) {
  const q = new URLSearchParams({
    period: state.period,
    chapter: state.chapter,
    year: String(state.year),
    view: state.view,
    mode: state.mode,
  });
  if (state.person) q.set("person", state.person);
  if (state.event) q.set("event", state.event);
  if (state.place) q.set("place", state.place);
  return `?${q.toString()}`;
}
export interface SearchResult {
  id: string;
  label: string;
  detail: string;
  kind: "person" | "event" | "place" | "period" | "chapter";
}
export function searchHistory(query: string): SearchResult[] {
  const term = foldText(query);
  if (!term) return [];
  const items: (SearchResult & { match: string })[] = [
    ...people.map((p) => ({
      id: p.id,
      label: p.name,
      detail:
        p.aliases.filter((a) => a !== p.name).join(" · ") ||
        p.title ||
        "Nhân vật",
      kind: "person" as const,
      match: [p.name, ...p.aliases].join(" "),
    })),
    ...events.map((e) => ({
      id: e.id,
      label: e.name,
      detail: e.date.label,
      kind: "event" as const,
      match: `${e.name} ${e.date.label}`,
    })),
    ...places.map((p) => ({
      id: p.id,
      label: p.name,
      detail: p.precision,
      kind: "place" as const,
      match: [p.name, ...p.names.map((n) => n.label)].join(" "),
    })),
    ...periods.map((p) => ({
      id: p.id,
      label: p.name,
      detail: p.date.label,
      kind: "period" as const,
      match: `${p.name} ${p.date.label}`,
    })),
    ...chapters.map((c) => ({
      id: c.id,
      label: c.title,
      detail: `Chương ${c.number} · ${c.date.label}`,
      kind: "chapter" as const,
      match: `${c.title} ${c.date.label}`,
    })),
  ];
  return items
    .filter((i) => foldText(i.match).includes(term))
    .map(({ match: _, ...item }) => item);
}
export function personYear(id: string, periodId?: string) {
  const person = people.find((person) => person.id === id);
  const roles = tenures.filter(
    (tenure) =>
      tenure.personId === id && (!periodId || tenure.periodId === periodId),
  );
  const relatedEvents = events.filter(
    (event) =>
      event.personIds.includes(id) &&
      (!periodId || event.periodIds.includes(periodId)),
  );
  const year =
    roles.find((role) => role.role === "reigning")?.date.start ??
    roles[0]?.date.start ??
    person?.contextYear ??
    relatedEvents[0]?.date.start ??
    periodById(periodId ?? person?.periodIds[0] ?? defaultPeriodId).date.start;
  if (!periodId) return year;
  const period = periodById(periodId);
  return Math.max(period.date.start, Math.min(period.date.end - 1, year));
}
export function claimById(id: string) {
  return claims.find((c) => c.id === id);
}
export function visiblePlaces(period: string, year: number) {
  return places.filter(
    (p) =>
      p.periodIds.includes(period) && year >= p.validFrom && year < p.validTo,
  );
}

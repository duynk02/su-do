import {
  chapters,
  claims,
  events,
  people,
  periods,
  places,
  tenures,
} from "../data/history";
import type { HistoricalDate } from "../data/schema";

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
export const initialState: AtlasState = {
  period: "tran",
  chapter: "cuoi-ly",
  year: 1225,
  view: "story",
  person: null,
  event: null,
  place: null,
  mode: "explore",
};
export function readState(search: string): AtlasState {
  const q = new URLSearchParams(search);
  const period = periods.find((p) => p.id === q.get("period")) ?? periods[3];
  const chapter =
    chapters.find((c) => c.id === q.get("chapter")) ?? chapters[0];
  const rawYear = q.get("year");
  const year =
    rawYear && /^-?\d+$/.test(rawYear)
      ? Number(rawYear)
      : period.id === "tran"
        ? 1225
        : period.date.start;
  const person = people.find((p) => p.id === q.get("person"))?.id ?? null;
  const event = events.find((e) => e.id === q.get("event"))?.id ?? null;
  const place = places.find((p) => p.id === q.get("place"))?.id ?? null;
  const views: ReaderView[] = [
    "story",
    "overview",
    "people",
    "events",
    "place",
  ];
  let view = views.includes(q.get("view") as ReaderView)
    ? (q.get("view") as ReaderView)
    : period.id === "tran"
      ? "story"
      : "overview";
  if (view === "place" && !place) view = "overview";
  return {
    period: period.id,
    chapter: chapter.id,
    year:
      Number.isSafeInteger(year) && year >= -699 && year <= 1900
        ? year
        : period.date.start,
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
      match: e.name,
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
      match: p.name,
    })),
    ...chapters.map((c) => ({
      id: c.id,
      label: c.title,
      detail: `Chương ${c.number} · ${c.date.label}`,
      kind: "chapter" as const,
      match: c.title,
    })),
  ];
  return items
    .filter((i) => foldText(i.match).includes(term))
    .map(({ match: _, ...item }) => item);
}
export function personYear(id: string) {
  return tenures.find((t) => t.personId === id)?.date.start ?? 1225;
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

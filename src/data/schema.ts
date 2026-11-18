export type EditorialStatus =
  "unwritten" | "draft" | "cross-referenced" | "editor-approved";
export const statusLabels: Record<EditorialStatus, string> = {
  unwritten: "Chưa biên soạn",
  draft: "Đang biên soạn",
  "cross-referenced": "Đã đối chiếu nguồn",
  "editor-approved": "Đã được người biên tập duyệt",
};
// Astronomical years internally: 0 = 1 BCE. UI always uses BCE/CE, never year 0.
// Ranges are [start, end), except point dates (start === end).
export interface HistoricalDate {
  start: number;
  end: number;
  label: string;
  precision: "year" | "range" | "month" | "day" | "unknown";
  original: string;
  calendar: "source-convention" | "lunisolar" | "CE" | "unknown";
  normalized?: string;
  conversion?: { method: string; sourceId: string };
}
export interface Source {
  id: string;
  title: string;
  author: string | null;
  publisher: string;
  year: number | null;
  edition: string | null;
  url: string;
  accessed: string;
  type:
    | "research"
    | "heritage"
    | "museum"
    | "education"
    | "chronology"
    | "geography"
    | "collection"
    | "reference";
  upstream: string | null;
  limits: string;
  readLocation: string;
}
export interface Claim {
  id: string;
  text: string;
  kind:
    | "evidence"
    | "chronicle"
    | "interpretation"
    | "hypothesis"
    | "legend"
    | "reconstruction";
  status: EditorialStatus;
  published: boolean;
  note?: string;
}
export interface Citation {
  id: string;
  claimId: string;
  sourceId: string;
  location: string;
  supports: string;
}
export interface Period {
  id: string;
  name: string;
  date: HistoricalDate;
  status: EditorialStatus;
  polityIds: string[];
  dynastyIds: string[];
  claimIds: string[];
  summary: string;
  defaultYear?: number;
  subtitle?: string;
  overviewFacts?: { label: string; value: string; claimIds: string[] }[];
  milestones?: { eventId: string; label?: string; title?: string }[];
  lanes?: { name: string; date: string }[];
  lanesSource?: { label: string; url: string };
}
export interface Polity {
  id: string;
  name: string;
  claimIds: string[];
}
export interface Dynasty {
  id: string;
  name: string;
  polityId: string;
  date: HistoricalDate;
}
export interface Person {
  id: string;
  periodIds: string[];
  name: string;
  aliases: string[];
  personalName?: string;
  templeName?: string;
  eraNames?: string[];
  title?: string;
  life?: string;
  summaryClaimIds: string[];
  biographySections?: { title: string; claimIds: string[] }[];
  eventIds: string[];
  mediaAssetId?: string;
  contextYear?: number;
  note?: string;
}
export interface RoleTenure {
  id: string;
  periodId: string;
  dynastyId?: string;
  polityId?: string;
  personId: string;
  role: "reigning" | "retired" | "minister";
  roleLabel?: string;
  label: string;
  date: HistoricalDate;
  claimIds: string[];
}
export interface Relationship {
  id: string;
  from: string;
  to: string;
  type: "parent" | "marriage" | "sibling" | "succession" | "political";
  label: string;
  claimIds: string[];
  status: EditorialStatus;
  date?: HistoricalDate;
  note?: string;
}
export interface HistoricalEvent {
  id: string;
  periodIds: string[];
  name: string;
  date: HistoricalDate;
  placeIds: string[];
  personIds: string[];
  contextClaimIds: string[];
  developmentClaimIds: string[];
  resultClaimIds: string[];
  consequence: string;
  consequenceKind: "editorial-question";
  precisionNote: string;
  additionalClaimIds?: string[];
}
export interface Place {
  id: string;
  name: string;
  names: { label: string; date?: HistoricalDate }[];
  type: "capital" | "heritage" | "event" | "regional";
  locationType:
    "historical-site" | "modern-memorial" | "representative" | "uncertain";
  coordinates: [number, number] | null;
  coordinateSourceId: string | null;
  coordinateMethod: string;
  precision: string;
  claimIds: string[];
  periodIds: string[];
  validFrom: number;
  validTo: number;
  mapLabel?: { regular: [number, number]; compact: [number, number] };
}
export interface TerritorySnapshot {
  id: string;
  polityId: string;
  date: HistoricalDate;
  geometry: null;
  representation: "unavailable";
  sourceIds: string[];
  method: string;
  uncertainty: string;
  license: string | null;
  status: EditorialStatus;
}
export interface StoryChapter {
  id: string;
  periodId: string;
  number: string;
  title: string;
  question: string;
  date: HistoricalDate;
  anchorYear?: number;
  mapWide?: boolean;
  placeIds: string[];
  personIds: string[];
  eventIds: string[];
  claimIds: string[];
  visual: ChapterVisual;
  takeaway: string;
  editorialNote?: string;
}
export type ChapterVisual =
  | { type: "chain"; label: string; items: string[] }
  | { type: "relations"; personId: string }
  | {
      type: "comparison";
      items: { label: string; personId: string; detail: string }[];
    }
  | { type: "rulers" }
  | { type: "events"; eventIds: string[] }
  | {
      type: "artifact";
      mediaAssetId: string;
      claimId?: string;
      linkLabel?: string;
    }
  | {
      type: "transition";
      from: { personId: string; label: string };
      to: { personId: string; label: string };
      label: string;
      date: string;
    }
  | {
      type: "diplomacy";
      from: string;
      to: string;
      label: string;
      detail: string;
    }
  | {
      type: "timeline";
      items: { date: string; label: string }[];
      caption?: string;
    };

export interface PeriodContent {
  period: Period;
  chapters: StoryChapter[];
  events: HistoricalEvent[];
  tenures: RoleTenure[];
}
export interface MediaAsset {
  id: string;
  src: string;
  title: string;
  date: string;
  kind:
    | "artifact-photo"
    | "reconstruction"
    | "statue-photo"
    | "heritage-photo"
    | "painting";
  creator: string;
  credit?: string;
  license: string;
  sourceId: string;
  note: string;
  alt?: string;
  width?: number;
  height?: number;
  licenseUrl?: string;
  personIds?: string[];
}
export interface ReviewRecord {
  id: string;
  entityIds: string[];
  action: "source-read" | "cross-reference";
  reviewer: string;
  date: string;
  note: string;
}

export function date(
  start: number,
  end: number,
  label: string,
  original = label,
): HistoricalDate {
  return {
    start,
    end,
    label,
    original,
    precision: start === end ? "year" : "range",
    calendar: "source-convention",
  };
}

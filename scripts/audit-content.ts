import {
  chapters,
  citations,
  claims,
  dynasties,
  events,
  mediaAssets,
  people,
  periods,
  places,
  polities,
  relationships,
  reviews,
  sources,
  tenures,
  territorySnapshots,
} from "../src/data/history";
import type { HistoricalDate } from "../src/data/schema";

export function auditContent() {
  const errors: string[] = [];
  const groups = {
    chapters,
    citations,
    claims,
    dynasties,
    events,
    mediaAssets,
    people,
    periods,
    places,
    polities,
    relationships,
    reviews,
    sources,
    tenures,
    territorySnapshots,
  };
  for (const [name, rows] of Object.entries(groups)) {
    const ids = rows.map((row) => row.id);
    if (new Set(ids).size !== ids.length)
      errors.push(`Duplicate IDs in ${name}`);
  }
  const ref = (ids: string[], rows: { id: string }[], context: string) =>
    ids.forEach((id) => {
      if (!rows.some((row) => row.id === id))
        errors.push(`Broken ${context}: ${id}`);
    });
  const checkDate = (d: HistoricalDate, id: string) => {
    if (
      !Number.isSafeInteger(d.start) ||
      !Number.isSafeInteger(d.end) ||
      d.start > d.end ||
      !d.original ||
      (d.normalized && !d.conversion)
    )
      errors.push(`Invalid date: ${id}`);
  };
  claims.forEach((c) => {
    if (c.published && !citations.some((ref) => ref.claimId === c.id))
      errors.push(`Published claim without citation: ${c.id}`);
    if (c.status === "editor-approved")
      errors.push(`No human approval recorded: ${c.id}`);
  });
  citations.forEach((c) => {
    ref([c.claimId], claims, "claim");
    ref([c.sourceId], sources, "source");
    if (!c.location || !c.supports)
      errors.push(`Missing citation detail: ${c.id}`);
  });
  sources.forEach((s) => {
    try {
      const url = new URL(s.url);
      if (
        url.protocol !== "https:" ||
        /example\.|placeholder|localhost/.test(url.hostname)
      )
        errors.push(`Invalid URL: ${s.id}`);
    } catch {
      errors.push(`Invalid URL: ${s.id}`);
    }
    if (!s.readLocation || !s.limits)
      errors.push(`Missing source provenance: ${s.id}`);
  });
  for (const entity of [
    ...chapters,
    ...periods,
    ...events,
    ...dynasties,
    ...tenures,
    ...territorySnapshots,
  ])
    checkDate(entity.date, entity.id);
  for (const c of chapters) {
    ref(c.claimIds, claims, c.id);
    ref(c.personIds, people, c.id);
    ref(c.placeIds, places, c.id);
    ref(c.eventIds, events, c.id);
  }
  for (const p of people) {
    ref(p.summaryClaimIds, claims, p.id);
    if (p.mediaAssetId) ref([p.mediaAssetId], mediaAssets, `${p.id} image`);
    for (const section of p.biographySections ?? []) {
      if (!section.title || !section.claimIds.length)
        errors.push(`Empty biography section: ${p.id}`);
      ref(section.claimIds, claims, `${p.id} biography`);
    }
    ref(p.eventIds, events, p.id);
  }
  for (const e of events) {
    ref(
      [...e.contextClaimIds, ...e.developmentClaimIds, ...e.resultClaimIds],
      claims,
      e.id,
    );
    ref(e.personIds, people, e.id);
    ref(e.placeIds, places, e.id);
  }
  for (const r of relationships) {
    ref([r.from, r.to], people, r.id);
    ref(r.claimIds, claims, r.id);
    if (r.date) checkDate(r.date, r.id);
    if (r.from === r.to) errors.push(`Self relationship: ${r.id}`);
  }
  for (const t of tenures) {
    ref([t.personId], people, t.id);
    ref(t.claimIds, claims, t.id);
  }
  for (const p of periods) {
    ref(p.claimIds, claims, p.id);
    ref(p.polityIds, polities, p.id);
    ref(p.dynastyIds, dynasties, p.id);
  }
  for (const d of dynasties) ref([d.polityId], polities, d.id);
  for (const p of polities) ref(p.claimIds, claims, p.id);
  for (const p of places) {
    ref(p.claimIds, claims, p.id);
    ref(p.periodIds, periods, p.id);
    if (p.coordinates) {
      const [lon, lat] = p.coordinates;
      if (Math.abs(lon) > 180 || Math.abs(lat) > 90 || !p.coordinateSourceId)
        errors.push(`Invalid coordinates: ${p.id}`);
    }
    if (p.coordinateSourceId) ref([p.coordinateSourceId], sources, p.id);
    if (p.locationType === "uncertain" && p.coordinates)
      errors.push(
        `Uncertain place must not have invented coordinates: ${p.id}`,
      );
    if (p.validFrom >= p.validTo)
      errors.push(`Invalid place validity: ${p.id}`);
  }
  for (const t of territorySnapshots) {
    ref([t.polityId], polities, t.id);
    ref(t.sourceIds, sources, t.id);
    if (t.geometry !== null)
      errors.push(`Unexpected unreviewed territory: ${t.id}`);
  }
  for (const m of mediaAssets) {
    ref([m.sourceId], sources, m.id);
    if (!m.license || !m.creator) errors.push(`Missing media rights: ${m.id}`);
    if (m.personIds?.length) {
      ref(m.personIds, people, m.id);
      if (
        !m.alt ||
        !m.width ||
        !m.height ||
        !m.licenseUrl ||
        !m.src.startsWith("/images/people/")
      )
        errors.push(`Incomplete person image: ${m.id}`);
    }
  }
  const allEntities = Object.values(groups).flat() as { id: string }[];
  for (const r of reviews) ref(r.entityIds, allEntities, r.id);
  return errors;
}
if (process.argv[1]?.replace(/\\/g, "/").endsWith("audit-content.ts")) {
  const errors = auditContent();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else
    console.log(
      `Content consistency passed: ${claims.length} claims, ${citations.length} citations, ${sources.length} sources. Historical accuracy still requires editorial review.`,
    );
}

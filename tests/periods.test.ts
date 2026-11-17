import test from "node:test";
import assert from "node:assert/strict";
import { chapters, people, periods } from "../src/data/history";
import { relationships } from "../src/data/history";
import {
  chaptersForPeriod,
  peopleForPeriod,
  eventsForPeriod,
  tenuresForPeriod,
  periodStartState,
  periodForEntity,
  personYear,
  readState,
  stateQuery,
} from "../src/lib/history";

test("period selection never borrows another period's chapters or directory", () => {
  for (const period of periods) {
    const state = periodStartState(period.id);
    const ownChapters = chaptersForPeriod(period.id);
    assert.equal(state.view, ownChapters.length ? "story" : "overview");
    assert.equal(state.chapter, ownChapters[0]?.id ?? "");
    assert.ok(
      peopleForPeriod(period.id).every((person) =>
        person.periodIds.includes(period.id),
      ),
    );
    assert.ok(
      eventsForPeriod(period.id).every((event) =>
        event.periodIds.includes(period.id),
      ),
    );
    assert.ok(
      tenuresForPeriod(period.id).every(
        (tenure) => tenure.periodId === period.id,
      ),
    );
    assert.deepEqual(readState(stateQuery(state)), state);
  }
});

test("stale cross-period URL parameters are repaired within the requested period", () => {
  const state = readState(
    "?period=le-so&chapter=cuoi-ly&person=tran-canh&event=bach-dang-1288&view=story",
  );
  assert.equal(state.period, "le-so");
  assert.equal(state.chapter, "");
  assert.equal(state.person, null);
  assert.equal(state.event, null);
  assert.equal(state.view, "overview");
});

test("transitional figures have one canonical profile and retain an applicable reading context", () => {
  for (const id of ["ly-chieu-hoang", "tran-canh", "ho-quy-ly"]) {
    const profiles = people.filter((person) => person.id === id);
    assert.equal(profiles.length, 1);
    for (const periodId of profiles[0].periodIds) {
      assert.equal(
        periodForEntity(profiles[0].periodIds, periodId, personYear(id)).id,
        periodId,
      );
      const year = personYear(id, periodId);
      const period = periods.find((entry) => entry.id === periodId)!;
      assert.ok(year >= period.date.start && year < period.date.end);
      assert.ok(peopleForPeriod(periodId).some((person) => person.id === id));
    }
  }
  assert.equal(chaptersForPeriod("tran").length, 9);
  assert.ok(chapters.every((chapter) => !!chapter.periodId));
});

test("Ly has nine rulers and separates adopted succession from biological parentage", () => {
  const rulers = tenuresForPeriod("ly").filter(
    (tenure) => tenure.role === "reigning",
  );
  assert.equal(rulers.length, 9);
  assert.equal(rulers[0].personId, "ly-thai-to");
  assert.equal(rulers.at(-1)!.personId, "ly-chieu-hoang");
  assert.ok(!rulers.some((tenure) => tenure.personId === "sung-hien-hau"));
  assert.ok(
    tenuresForPeriod("ly").some(
      (tenure) =>
        tenure.personId === "sung-hien-hau" && tenure.role === "retired",
    ),
  );
  assert.equal(chaptersForPeriod("ly").length, 10);
  assert.ok(
    relationships.some(
      (edge) =>
        edge.type === "parent" &&
        edge.from === "sung-hien-hau" &&
        edge.to === "ly-than-tong",
    ),
  );
  assert.ok(
    !relationships.some(
      (edge) =>
        edge.type === "parent" &&
        edge.from === "ly-nhan-tong" &&
        edge.to === "ly-than-tong",
    ),
  );
  assert.ok(
    relationships.some(
      (edge) =>
        edge.type === "political" &&
        edge.from === "ly-nhan-tong" &&
        edge.to === "ly-than-tong",
    ),
  );
  assert.ok(
    !eventsForPeriod("ly").some((event) => event.id === "bach-dang-1288"),
  );
  assert.ok(
    !peopleForPeriod("tran").some((person) => person.id === "ly-thuong-kiet"),
  );
  assert.equal(
    readState("?period=ly&chapter=cuoi-ly&view=story").chapter,
    "ly-khoi-dau",
  );
});

test("links without a year select the chapter or person's own historical context", () => {
  assert.equal(
    readState("?period=ly&view=people&person=ly-than-tong").year,
    1127,
  );
  assert.equal(
    readState("?period=ly&view=story&chapter=ly-hoc-van").year,
    1076,
  );
  assert.equal(
    readState("?period=ly&view=events&event=ly-khang-tong-1075").year,
    1075,
  );
  assert.equal(
    readState("?period=ly&view=people&person=ly-than-tong&year=1130").year,
    1130,
  );
});

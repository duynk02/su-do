import test from "node:test";
import assert from "node:assert/strict";
import { events, people, relationships, claims } from "../src/data/history";
import {
  chaptersForPeriod,
  eventsForPeriod,
  peopleForPeriod,
  tenuresForPeriod,
  readState,
  visiblePlaces,
} from "../src/lib/history";

test("Ho has two emperors and separates Quý Ly's retired rule from Hán Thương's reign", () => {
  const roles = tenuresForPeriod("ho");
  assert.deepEqual(
    roles
      .filter((role) => role.role === "reigning")
      .map((role) => role.personId),
    ["ho-quy-ly", "ho-han-thuong"],
  );
  assert.ok(
    roles.some(
      (role) => role.personId === "ho-quy-ly" && role.role === "retired",
    ),
  );
  assert.equal(
    roles.find((role) => role.personId === "ho-han-thuong")!.date.start,
    1400,
  );
  assert.equal(chaptersForPeriod("ho").length, 8);
  assert.equal(
    readState("?period=ho&chapter=cuoi-tran&view=story").chapter,
    "ho-lap-trieu",
  );
  assert.equal(
    readState("?period=ho&person=ho-han-thuong&view=people").year,
    1400,
  );
});

test("Ho reuses the transition and canonical people across the Tran boundary", () => {
  assert.equal(events.filter((event) => event.id === "nha-ho-1400").length, 1);
  for (const periodId of ["tran", "ho"]) {
    assert.ok(
      eventsForPeriod(periodId).some((event) => event.id === "nha-ho-1400"),
    );
    assert.ok(
      peopleForPeriod(periodId).some((person) => person.id === "ho-quy-ly"),
    );
  }
  assert.equal(people.filter((person) => person.id === "ho-quy-ly").length, 1);
  for (const id of [
    "ho-tien-giay-1396",
    "ho-han-dien-1397",
    "ho-tay-do-1397",
  ]) {
    const event = events.find((entry) => entry.id === id)!;
    assert.ok(
      event.periodIds.includes("tran") && event.periodIds.includes("ho"),
    );
    assert.ok(event.date.start < 1400);
  }
  for (const event of eventsForPeriod("ho"))
    for (const placeId of event.placeIds)
      assert.equal(
        readState(
          `?period=ho&view=place&place=${placeId}&year=${event.date.start}`,
        ).place,
        placeId,
      );
});

test("the Ho family keeps maternal ancestry without inventing Nguyên Trừng's mother", () => {
  for (const [from, to] of [
    ["ho-quy-ly", "ho-han-thuong"],
    ["ho-quy-ly", "ho-nguyen-trung"],
    ["huy-ninh", "ho-han-thuong"],
    ["nguyen-phi-khanh", "nguyen-trai"],
  ])
    assert.ok(
      relationships.some(
        (edge) =>
          edge.type === "parent" && edge.from === from && edge.to === to,
      ),
    );
  assert.ok(
    !relationships.some(
      (edge) =>
        edge.type === "parent" &&
        edge.from === "huy-ninh" &&
        edge.to === "ho-nguyen-trung",
    ),
  );
  assert.ok(
    !people
      .find((person) => person.id === "ho-han-thuong")!
      .life?.includes("–1407"),
  );
  const namGiao = visiblePlaces("ho", 1403).find(
    (place) => place.id === "nam-giao-nha-ho",
  )!;
  assert.equal(namGiao.coordinateSourceId, "unesco-ho");
  assert.ok(namGiao.coordinates);
});

test("Ho accounts distinguish ordered reforms from documented implementation limits", () => {
  assert.match(
    claims.find((claim) => claim.id === "ho-granary-limits")!.text,
    /không (làm|thực hiện) được/,
  );
  assert.match(
    claims.find((claim) => claim.id === "ho-exams-limits")!.text,
    /chiến tranh|gặp loạn/,
  );
  assert.ok(
    eventsForPeriod("ho").some((event) => event.id === "ho-bat-ho-ho-1407"),
  );
  assert.ok(
    !eventsForPeriod("ly").some((event) => event.id === "ho-bat-ho-ho-1407"),
  );
});

import test from "node:test";
import assert from "node:assert/strict";
import { events, people, periods, places, relationships } from "../src/data/history";
import {
  chaptersForPeriod,
  eventsForPeriod,
  peopleForPeriod,
  periodForEntity,
  personYear,
  readState,
  tenuresForPeriod,
} from "../src/lib/history";

const periodId = "the-ky-x";

test("the tenth-century repository separates three dynasties and concurrent Ngo rule", () => {
  const period = periods.find((entry) => entry.id === periodId)!;
  assert.notEqual(period.status, "unwritten");
  assert.deepEqual(period.dynastyIds, ["ngo-dynasty", "dinh-dynasty", "tien-le-dynasty"]);
  assert.ok(chaptersForPeriod(periodId).length >= 10);
  const reigning = tenuresForPeriod(periodId).filter((entry) => entry.role === "reigning");
  assert.equal(reigning.length, 9);
  assert.ok(!reigning.some((entry) => ["ngo-xuong-xi", "dinh-lien"].includes(entry.personId)));
  const ngap = reigning.find((entry) => entry.personId === "ngo-xuong-ngap")!;
  const van = reigning.find((entry) => entry.personId === "ngo-xuong-van")!;
  assert.ok(ngap.date.start < van.date.end && van.date.start < ngap.date.end);
  assert.equal(ngap.dynastyId, van.dynastyId);
  assert.equal(reigning.find((entry) => entry.personId === "ngo-quyen")!.polityId, "ngo-polity");
  assert.ok(reigning.filter((entry) => entry.dynastyId !== "ngo-dynasty").every((entry) => entry.polityId === "dai-co-viet"));
});

test("the transition of 1009 and its figures remain canonical across both periods", () => {
  assert.equal(events.filter((entry) => entry.id === "ly-lap-trieu-1009").length, 1);
  for (const id of ["ly-thai-to", "van-hanh", "dao-cam-moc"]) {
    const profiles = people.filter((entry) => entry.id === id);
    assert.equal(profiles.length, 1);
    for (const context of [periodId, "ly"]) {
      assert.ok(peopleForPeriod(context).some((entry) => entry.id === id));
      assert.equal(periodForEntity(profiles[0].periodIds, context, personYear(id, context)).id, context);
      assert.ok(eventsForPeriod(context).some((entry) => entry.id === "ly-lap-trieu-1009"));
    }
  }
  const state = readState("?period=the-ky-x&view=people&person=ly-thai-to");
  assert.equal(state.period, periodId);
  assert.equal(state.year, 1009);
  assert.equal(state.person, "ly-thai-to");
  assert.equal(readState("?period=the-ky-x&view=events&event=ly-lap-trieu-1009").event, "ly-lap-trieu-1009");
});

test("the two royal households keep sourced marriages separate from parentage", () => {
  const has = (from: string, to: string, type: string) => relationships.some((edge) => edge.from === from && edge.to === to && edge.type === type);
  assert.ok(has("dinh-bo-linh", "duong-van-nga", "marriage") || has("duong-van-nga", "dinh-bo-linh", "marriage"));
  assert.ok(has("le-dai-hanh", "duong-van-nga", "marriage") || has("duong-van-nga", "le-dai-hanh", "marriage"));
  assert.ok(has("duong-van-nga", "dinh-phe-de", "parent"));
  assert.ok(has("le-dai-hanh", "le-trung-tong", "parent"));
  assert.ok(has("le-dai-hanh", "le-long-dinh", "parent"));
  for (const id of ["le-trung-tong", "le-long-dinh"])
    assert.ok(!has("duong-van-nga", id, "parent"));
  assert.ok(!has("duong-tam-kha", "duong-van-nga", "parent"));
});

test("capitals reuse canonical sites while the three Bach Dang battles retain separate spatial records", () => {
  assert.equal(places.filter((entry) => entry.id === "hoa-lu").length, 1);
  const hoaLu = places.find((entry) => entry.id === "hoa-lu")!;
  assert.ok(hoaLu.periodIds.includes(periodId) && hoaLu.periodIds.includes("ly"));
  assert.equal(hoaLu.type, "capital");
  assert.equal(places.find((entry) => entry.id === "co-loa")!.type, "capital");
  const placeIds = ["bach-dang-938", "le-bach-dang-981", "bach-dang"];
  for (const id of placeIds) {
    const place = places.find((entry) => entry.id === id)!;
    assert.ok(place, id);
    assert.equal(place.coordinates, null);
    assert.equal(place.locationType, "uncertain");
  }
  assert.ok(eventsForPeriod(periodId).some((entry) => entry.id === "ngo-bach-dang-938"));
  assert.ok(!eventsForPeriod(periodId).some((entry) => entry.id === "bach-dang-1288"));
});

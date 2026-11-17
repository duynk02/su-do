import test from "node:test";
import assert from "node:assert/strict";
import { auditContent } from "../scripts/audit-content";
import {
  chapters,
  citations,
  claims,
  people,
  relationships,
  territorySnapshots,
  tenures,
} from "../src/data/history";
import { date } from "../src/data/schema";
import {
  containsYear,
  foldText,
  formatYear,
  initialState,
  readState,
  searchHistory,
  stateQuery,
  visiblePlaces,
} from "../src/lib/history";

test("published content has complete references and valid entity relationships", () =>
  assert.deepEqual(auditContent(), []));
test("historical year display has no year zero", () => {
  assert.equal(formatYear(0), "1 TCN");
  assert.equal(formatYear(-1), "2 TCN");
  assert.equal(formatYear(1), "1");
  assert.equal(containsYear(date(1225, 1400, ""), 1400), false);
  assert.equal(containsYear(date(1288, 1288, ""), 1288), true);
});
test("Tran Thua is never inserted into the reigning emperor sequence", () => {
  assert.equal(
    tenures.filter((t) => t.personId === "tran-thua" && t.role === "reigning")
      .length,
    0,
  );
  assert.ok(
    tenures.some((t) => t.personId === "tran-thua" && t.role === "retired"),
  );
  assert.ok(
    claims.find((c) => c.id === "thua-role")?.text.includes("không trực tiếp"),
  );
});
test("Duong Nhat Le stays between Du Tong and Nghe Tong", () => {
  const rulers = tenures.filter((t) => t.role === "reigning");
  const index = rulers.findIndex((t) => t.personId === "duong-nhat-le");
  assert.equal(rulers[index - 1].personId, "tran-du-tong");
  assert.equal(rulers[index + 1].personId, "tran-nghe-tong");
});
test("search matches accented names, personal names and temple names", () => {
  for (const name of ["tran canh", "Trần Cảnh", "thai tong", "Thái Tông"])
    assert.ok(searchHistory(name).some((r) => r.id === "tran-canh"));
  assert.ok(
    searchHistory("tran hung dao").some((r) => r.id === "tran-quoc-tuan"),
  );
  assert.equal(foldText("Đại Việt"), "dai viet");
  assert.deepEqual(searchHistory("xxyyzz"), []);
});
test("URL round trip preserves entity, year, mode and reading position", () => {
  const state = {
    ...initialState,
    chapter: "nhuong-ngoi",
    person: "tran-canh",
    view: "people" as const,
    mode: "story" as const,
    year: 1226,
  };
  assert.deepEqual(readState(stateQuery(state)), state);
  const repaired = readState(
    "?period=unknown&chapter=absent&person=bad&year=NaN&view=bad",
  );
  assert.equal(repaired.period, "tran");
  assert.equal(repaired.person, null);
  assert.equal(repaired.year, 1225);
});
test("missing territories never silently become modern polygons", () => {
  assert.ok(
    territorySnapshots.every(
      (t) => t.geometry === null && t.representation === "unavailable",
    ),
  );
  assert.ok(!visiblePlaces("tran", 1200).some((p) => p.id === "tay-do"));
  assert.ok(visiblePlaces("tran", 1398).some((p) => p.id === "tay-do"));
  assert.ok(!visiblePlaces("tran", 1398).some((p) => p.id === "thang-long"));
});
test("one person can have different relationship types with the same person", () => {
  const pair = relationships.filter(
    (r) => r.from === "ly-chieu-hoang" && r.to === "tran-canh",
  );
  assert.deepEqual(pair.map((r) => r.type).sort(), ["marriage", "succession"]);
  assert.equal(people.filter((p) => p.id === "tran-canh").length, 1);
});
test("all nine chapters and differing transition dates keep source provenance", () => {
  assert.equal(chapters.length, 9);
  assert.equal(
    citations.filter((c) => c.claimId === "date-disagreement").length,
    2,
  );
  assert.ok(claims.every((c) => c.status !== "editor-approved"));
});

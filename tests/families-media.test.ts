import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  claims,
  mediaAssets,
  people,
  relationships,
  sources,
} from "../src/data/history";
import { relationsForView } from "../src/lib/relations-layout";

test("Thieu De's maternal ancestry is explicit and does not invent direct parentage", () => {
  const family = relationsForView(
    "tran-thieu-de",
    relationships,
    "family",
    true,
  );
  for (const [from, to] of [
    ["tran-thuan-tong", "tran-thieu-de"],
    ["kham-thanh", "tran-thieu-de"],
    ["ho-quy-ly", "kham-thanh"],
    ["huy-ninh", "kham-thanh"],
  ])
    assert.ok(
      family.some((r) => r.type === "parent" && r.from === from && r.to === to),
    );
  assert.ok(
    !relationships.some(
      (r) =>
        r.type === "parent" &&
        r.from === "ho-quy-ly" &&
        r.to === "tran-thieu-de",
    ),
  );
  assert.ok(
    !relationships.some(
      (r) =>
        r.type === "parent" &&
        r.from === "tran-nghe-tong" &&
        r.to === "huy-ninh",
    ),
  );
  assert.ok(
    relationships.some(
      (r) =>
        r.type === "parent" &&
        r.from === "tran-minh-tong" &&
        r.to === "huy-ninh",
    ),
  );
  const profile = people.find((p) => p.id === "tran-thieu-de")!;
  const text = profile
    .biographySections!.flatMap((section) =>
      section.claimIds.map(
        (id) => claims.find((claim) => claim.id === id)!.text,
      ),
    )
    .join(" ");
  assert.match(text, /nhiếp chính/);
  assert.match(text, /được tha chết/);
  assert.match(text, /năm mất chưa được xác định/);
});

test("pivotal maternal branches connect Quoc Tuan to Anh Tong without false mothers", () => {
  for (const [from, to] of [
    ["tran-lieu", "tran-quoc-tuan"],
    ["tran-quoc-tuan", "bao-thanh"],
    ["bao-thanh", "tran-anh-tong"],
    ["thuan-thien", "tran-thanh-tong"],
  ])
    assert.ok(
      relationships.some(
        (r) => r.type === "parent" && r.from === from && r.to === to,
      ),
    );
  assert.ok(
    !relationships.some(
      (r) =>
        r.type === "parent" &&
        r.from === "thuan-thien" &&
        r.to === "tran-quoc-tuan",
    ),
  );
});

test("profile images are local photographs with complete visible rights and source metadata", () => {
  const profiles = people.filter((person) => person.mediaAssetId);
  assert.ok(profiles.length >= 6);
  for (const person of profiles) {
    const asset = mediaAssets.find(
      (entry) => entry.id === person.mediaAssetId,
    )!;
    assert.ok(asset.personIds?.includes(person.id));
    assert.ok(asset.width! >= 400 && asset.height! >= 300);
    assert.match(asset.kind, /^(statue|heritage)-photo$/);
    assert.match(asset.note, /không phải chân dung/);
    assert.ok(asset.creator && asset.license && asset.licenseUrl && asset.alt);
    assert.ok(
      sources
        .find((source) => source.id === asset.sourceId)
        ?.url.startsWith("https://commons.wikimedia.org/wiki/File:"),
    );
    const bytes = readFileSync(
      new URL(`../public${asset.src}`, import.meta.url),
    );
    assert.deepEqual([...bytes.subarray(0, 3)], [0xff, 0xd8, 0xff]);
  }
});

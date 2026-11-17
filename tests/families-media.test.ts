import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  claims,
  mediaAssets,
  people,
  relationships,
  sources,
  tenures,
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

test("profile illustrations have local files, source metadata and honest rights records", () => {
  const profiles = people.filter((person) => person.mediaAssetId);
  assert.ok(profiles.length >= 23);
  for (const ruler of tenures.filter((tenure) => tenure.role === "reigning"))
    assert.ok(
      people.find((person) => person.id === ruler.personId)?.mediaAssetId,
      `${ruler.personId}: missing ruler illustration`,
    );
  for (const person of profiles) {
    const asset = mediaAssets.find(
      (entry) => entry.id === person.mediaAssetId,
    )!;
    assert.ok(asset.personIds?.includes(person.id));
    assert.ok(asset.width! >= 200 && asset.height! >= 240);
    assert.match(asset.kind, /^(statue-photo|heritage-photo|painting)$/);
    assert.match(asset.note, /không phải chân dung/);
    assert.ok(asset.creator && asset.license && asset.alt);
    if (asset.licenseUrl) assert.match(asset.licenseUrl, /^https:\/\//);
    else assert.equal(asset.license, "Chưa xác định giấy phép tái sử dụng");
    assert.ok(
      sources
        .find((source) => source.id === asset.sourceId)
        ?.url.startsWith("https://"),
    );
    const bytes = readFileSync(
      new URL(`../public${asset.src}`, import.meta.url),
    );
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const png = bytes
      .subarray(0, 8)
      .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const webp =
      bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP";
    assert.ok(jpeg || png || webp, `${person.id}: invalid local image file`);
  }
});

test("Thai Tong and Thanh Tong use distinct depictions of people instead of tomb photos", () => {
  const hashes = ["tran-canh", "tran-thanh-tong"].map((id) => {
    const person = people.find((entry) => entry.id === id)!;
    const image = mediaAssets.find(
      (asset) => asset.id === person.mediaAssetId,
    )!;
    assert.ok(["painting", "statue-photo"].includes(image.kind));
    assert.ok(!image.src.includes("tomb"));
    return createHash("sha256")
      .update(readFileSync(new URL(`../public${image.src}`, import.meta.url)))
      .digest("hex");
  });
  assert.notEqual(hashes[0], hashes[1]);
});

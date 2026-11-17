import catalog from "../../public/images/people/provenance.json";
import type { MediaAsset, Source } from "./schema";

export const personMediaAssets: MediaAsset[] = catalog.assets.map((asset) => ({
  id: `image-${asset.personIds[0]}`,
  src: asset.src,
  title: asset.title,
  alt: asset.title,
  date: asset.date,
  kind: asset.kind as MediaAsset["kind"],
  creator: asset.creator,
  credit: asset.credit,
  license: asset.license,
  licenseUrl: asset.licenseUrl ?? undefined,
  sourceId: asset.sourceId ?? `commons-${asset.personIds[0]}`,
  note: asset.note,
  width: asset.width,
  height: asset.height,
  personIds: asset.personIds,
}));

export const personMediaSources: Source[] = catalog.assets.map((asset) => ({
  id: asset.sourceId ?? `commons-${asset.personIds[0]}`,
  title: asset.title,
  author: asset.creator === "Chưa xác định" ? null : asset.creator,
  publisher: asset.publisher ?? "Wikimedia Commons",
  year: null,
  edition: null,
  url: asset.sourceUrl,
  accessed: asset.accessed,
  type: "collection",
  upstream: asset.originalUrl,
  readLocation:
    asset.readLocation ??
    "Description, Author, Date và Licensing trên trang mô tả tệp; đã mở xem ảnh.",
  limits: `${asset.note} ${asset.changes}`,
}));

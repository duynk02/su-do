import catalog from "../../public/images/people/provenance.json";
import lyCatalog from "../../public/images/people/ly/provenance.json";
import type { MediaAsset, Source } from "./schema";

const portraits = [...catalog.assets, ...lyCatalog.assets];
export const personMediaAssets: MediaAsset[] = portraits.map((asset) => ({
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

export const personMediaSources: Source[] = portraits.map((asset) => ({
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

export const lyIllustrationAssets: MediaAsset[] = lyCatalog.illustrations.map(
  (asset) => ({
    id: asset.id,
    src: asset.src,
    title: asset.title,
    alt: asset.title,
    date: asset.date,
    kind: asset.kind as MediaAsset["kind"],
    creator: asset.creator,
    credit: asset.credit,
    license: asset.license,
    sourceId: asset.sourceId,
    note: asset.note,
    width: asset.width,
    height: asset.height,
  }),
);
export const lyIllustrationSources: Source[] = lyCatalog.illustrations.map(
  (asset) => ({
    id: asset.sourceId,
    title: asset.title,
    author: null,
    publisher: asset.publisher,
    year: null,
    edition: null,
    url: asset.sourceUrl,
    accessed: asset.accessed,
    type: "collection",
    upstream: asset.originalUrl,
    readLocation: asset.readLocation,
    limits: `${asset.note} ${asset.changes}`,
  }),
);

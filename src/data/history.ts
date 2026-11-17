// Static repository adapter: canonical entities + per-period content.
// A future CMS/database adapter can return the same schema without changing readers.
import { periodContents } from "./periods";
import { people } from "./shared/people";
import { mediaAssets } from "./shared/media";
export { claims, citations } from "./claim-store";
export { sources } from "./sources";
export { periods, defaultPeriodId } from "./periods";
export { people, mediaAssets };
export { relationships } from "./shared/relationships";
export { places } from "./shared/places";
export { polities, dynasties } from "./shared/polities";
export { territorySnapshots } from "./shared/territories";
export { reviews } from "./shared/reviews";
export const chapters = periodContents.flatMap((entry) => entry.chapters);
export const events = periodContents.flatMap((entry) => entry.events);
export const tenures = periodContents.flatMap((entry) => entry.tenures);
for (const asset of mediaAssets)
  for (const personId of asset.personIds ?? []) {
    const person = people.find((entry) => entry.id === personId);
    if (!person) throw new Error(`Image has no person: ${personId}`);
    person.mediaAssetId = asset.id;
  }

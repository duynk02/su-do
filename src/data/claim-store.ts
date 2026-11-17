import type { Claim, Citation } from "./schema";

export const claims: Claim[] = [];
export const citations: Citation[] = [];
export type Ref = [sourceId: string, location: string, supports?: string];
export function claim(
  id: string,
  text: string,
  refs: Ref[],
  options: Partial<Claim> = {},
) {
  claims.push({
    id,
    text,
    kind: "evidence",
    status: refs.length > 1 ? "cross-referenced" : "draft",
    published: true,
    ...options,
  });
  refs.forEach(([sourceId, location, supports], i) =>
    citations.push({
      id: `${id}-ref-${i + 1}`,
      claimId: id,
      sourceId,
      location,
      supports:
        supports ??
        "Hỗ trợ phần nội dung được nêu trong khẳng định; không mở rộng sang các chi tiết ngoài vị trí dẫn.",
    }),
  );
  return id;
}

import type { Relationship } from "../data/schema";

export type RelationView = "family" | "succession" | "political";
export const relationViews: { id: RelationView; label: string }[] = [
  { id: "family", label: "Gia đình" },
  { id: "succession", label: "Kế vị" },
  { id: "political", label: "Chính trị" },
];
const viewTypes: Record<RelationView, Relationship["type"][]> = {
  family: ["parent", "marriage", "sibling"],
  succession: ["succession"],
  political: ["political"],
};
export const relationGraph = {
  nodeWidth: 148,
  nodeHeight: 56,
  padding: 32,
  levelGap: 128,
  blockGap: 40,
};
type Point = { x: number; y: number };
type Box = Point & { width: number; height: number };
const labelWidth = (text: string) => text.length * 8 + 16;

export function defaultRelationView(
  selectedId: string,
  all: Relationship[],
): RelationView {
  return (
    relationViews.find(({ id }) =>
      all.some(
        (r) =>
          (r.from === selectedId || r.to === selectedId) &&
          viewTypes[id].includes(r.type),
      ),
    )?.id ?? "family"
  );
}

export function relationsForView(
  selectedId: string,
  all: Relationship[],
  view: RelationView,
  expanded: boolean,
) {
  const matching = all.filter((r) => viewTypes[view].includes(r.type));
  const ids = new Set([selectedId]);
  for (let depth = 0; depth < (expanded ? 2 : 1); depth++) {
    const reached = new Set(ids);
    for (const r of matching)
      if (reached.has(r.from) || reached.has(r.to)) {
        ids.add(r.from);
        ids.add(r.to);
      }
  }
  return matching.filter((r) => ids.has(r.from) && ids.has(r.to));
}

export function layoutRelations(
  selectedId: string,
  input: Relationship[],
  view: RelationView,
) {
  const edges = input.filter((r) => viewTypes[view].includes(r.type));
  const ids = [
    ...new Set([selectedId, ...edges.flatMap((r) => [r.from, r.to])]),
  ];
  const ranks = new Map([[selectedId, 0]]);
  const queue = [selectedId];
  for (let index = 0; index < queue.length; index++) {
    const id = queue[index];
    for (const edge of edges) {
      if (edge.from !== id && edge.to !== id) continue;
      const other = edge.from === id ? edge.to : edge.from;
      const step =
        edge.type === "marriage" || edge.type === "sibling"
          ? 0
          : edge.from === id
            ? 1
            : -1;
      if (!ranks.has(other)) {
        ranks.set(other, ranks.get(id)! + step);
        queue.push(other);
      }
    }
  }
  for (const id of ids) if (!ranks.has(id)) ranks.set(id, 0);

  // Partners stay beside one another, but parent links always leave their actual source person.
  const roots = new Map(ids.map((id) => [id, id]));
  const root = (id: string): string =>
    roots.get(id) === id ? id : root(roots.get(id)!);
  for (const r of edges)
    if (r.type === "marriage" || r.type === "sibling")
      roots.set(root(r.to), root(r.from));
  const levels = [...new Set(ranks.values())].sort((a, b) => a - b);
  const positions = new Map<string, Point & { generation: number }>();
  for (const [rowIndex, level] of levels.entries()) {
    const row = ids.filter((id) => ranks.get(id) === level);
    const blocks = new Map<string, string[]>();
    for (const id of row)
      blocks.set(root(id), [...(blocks.get(root(id)) ?? []), id]);
    const parentsOf = (members: string[]) => [
      ...new Set(
        edges
          .filter((r) => members.includes(r.to) && ranks.get(r.from)! < level)
          .map((r) => r.from),
      ),
    ];
    const parentCenter = (members: string[]) => {
      const parents = parentsOf(members).filter((id) => positions.has(id));
      return parents.length
        ? parents.reduce((sum, id) => sum + positions.get(id)!.x, 0) /
            parents.length
        : 0;
    };
    const clusters = new Map<
      string,
      { members: string[]; width: number; gap: number; target: number }[]
    >();
    for (const members of blocks.values()) {
      members.sort((a, b) => parentCenter([a]) - parentCenter([b]));
      const siblingLabels = edges.filter(
        (r) => members.includes(r.from) && members.includes(r.to),
      );
      const gap = Math.max(
        100,
        ...siblingLabels.map((r) => labelWidth(r.label) + 20),
      );
      const block = {
        members,
        width:
          members.length * relationGraph.nodeWidth + (members.length - 1) * gap,
        gap,
        target: parentCenter(members),
      };
      const signature = parentsOf(members).sort().join("|");
      clusters.set(signature, [...(clusters.get(signature) ?? []), block]);
    }
    const ordered = [...clusters.values()]
      .map((blocks) => ({
        blocks,
        width:
          blocks.reduce((sum, block) => sum + block.width, 0) +
          (blocks.length - 1) * relationGraph.blockGap,
        target:
          blocks.reduce((sum, block) => sum + block.target, 0) / blocks.length,
      }))
      .sort((a, b) => a.target - b.target);
    let lastRight = -Infinity;
    for (const cluster of ordered) {
      let left = Math.max(
        cluster.target - cluster.width / 2,
        lastRight + relationGraph.blockGap,
      );
      for (const block of cluster.blocks) {
        for (const id of block.members) {
          positions.set(id, {
            x: left + relationGraph.nodeWidth / 2,
            y:
              relationGraph.padding +
              relationGraph.nodeHeight / 2 +
              rowIndex * relationGraph.levelGap,
            generation: level,
          });
          left += relationGraph.nodeWidth + block.gap;
        }
        left -= block.gap;
        left += relationGraph.blockGap;
      }
      lastRight = left - relationGraph.blockGap;
    }
  }
  const minX = Math.min(
    ...[...positions.values()].map((p) => p.x - relationGraph.nodeWidth / 2),
  );
  const maxX = Math.max(
    ...[...positions.values()].map((p) => p.x + relationGraph.nodeWidth / 2),
  );
  const naturalWidth = maxX - minX + relationGraph.padding * 2;
  const width = Math.max(view === "political" ? 420 : 320, naturalWidth);
  const height =
    relationGraph.padding * 2 +
    relationGraph.nodeHeight +
    (levels.length - 1) * relationGraph.levelGap;
  const shift = relationGraph.padding - minX + (width - naturalWidth) / 2;
  const nodes = ids.map((id) => ({
    id,
    ...positions.get(id)!,
    x: positions.get(id)!.x + shift,
  }));
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const sourcesByRow = new Map<number, string[]>();
  for (const r of edges) {
    if (byId.get(r.from)!.y === byId.get(r.to)!.y) continue;
    const row = byId.get(r.from)!.y;
    sourcesByRow.set(row, [
      ...new Set([...(sourcesByRow.get(row) ?? []), r.from]),
    ]);
  }
  return {
    ...relationGraph,
    width,
    height,
    nodes,
    edges: edges.map((r) => {
      const a = byId.get(r.from)!;
      const b = byId.get(r.to)!;
      let start: Point, end: Point, path: string;
      let labelBox: Box | null = null;
      if (a.y === b.y) {
        const sign = Math.sign(b.x - a.x) || 1;
        start = { x: a.x + sign * (relationGraph.nodeWidth / 2 + 3), y: a.y };
        end = { x: b.x - sign * (relationGraph.nodeWidth / 2 + 3), y: b.y };
        path = `M${start.x},${start.y} H${end.x}`;
        labelBox = {
          x: (start.x + end.x) / 2,
          y: start.y,
          width: labelWidth(r.label),
          height: 24,
        };
      } else {
        const sign = Math.sign(b.y - a.y);
        start = { x: a.x, y: a.y + sign * (relationGraph.nodeHeight / 2 + 3) };
        end = { x: b.x, y: b.y - sign * (relationGraph.nodeHeight / 2 + 6) };
        const sources = sourcesByRow.get(a.y)!;
        const lane = sources.indexOf(r.from) - (sources.length - 1) / 2;
        const midY = (start.y + end.y) / 2 + lane * 10;
        path = `M${start.x},${start.y} V${midY} H${end.x} V${end.y}`;
        if (r.type !== "parent")
          labelBox = {
            x: (start.x + end.x) / 2 + labelWidth(r.label) / 2 + 14,
            y: midY,
            width: labelWidth(r.label),
            height: 24,
          };
      }
      return { ...r, start, end, path, labelBox };
    }),
  };
}

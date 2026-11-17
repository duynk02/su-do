import type { Relationship } from "../data/schema";

type Point = { x: number; y: number };
type Box = Point & { width: number; height: number };

export const relationGraph = {
  width: 520,
  height: 420,
  nodeWidth: 130,
  nodeHeight: 38,
};

const intersects = (a: Box, b: Box, gap = 6) =>
  Math.abs(a.x - b.x) < (a.width + b.width) / 2 + gap &&
  Math.abs(a.y - b.y) < (a.height + b.height) / 2 + gap;

function rectanglePort(
  center: Point,
  toward: Point,
  width: number,
  height: number,
) {
  const dx = toward.x - center.x;
  const dy = toward.y - center.y;
  const scale = Math.min(
    dx ? width / 2 / Math.abs(dx) : Infinity,
    dy ? height / 2 / Math.abs(dy) : Infinity,
  );
  return { x: center.x + dx * scale, y: center.y + dy * scale };
}

function curvePoint(a: Point, control: Point, b: Point, t: number): Point {
  const s = 1 - t;
  return {
    x: s * s * a.x + 2 * s * t * control.x + t * t * b.x,
    y: s * s * a.y + 2 * s * t * control.y + t * t * b.y,
  };
}

export function layoutRelations(
  selectedId: string,
  relationships: Relationship[],
) {
  const ids = [...new Set(relationships.flatMap((r) => [r.from, r.to]))]
    .filter((id) => id !== selectedId)
    .slice(0, 8);
  const center = { x: 260, y: 210 };
  const nodes = [
    { id: selectedId, ...center },
    ...ids.map((id, index) => {
      const angle = (2 * Math.PI * index) / ids.length - Math.PI / 2;
      return {
        id,
        x: center.x + Math.sin(angle) * 174,
        y: center.y - Math.cos(angle) * 136,
      };
    }),
  ];
  const positions = new Map(nodes.map((node) => [node.id, node]));
  const visible = relationships.filter(
    (r) => positions.has(r.from) && positions.has(r.to),
  );
  const pairs = new Map<string, Relationship[]>();
  const pairKey = (r: Relationship) => [r.from, r.to].sort().join("|");
  for (const edge of visible) {
    const key = pairKey(edge);
    pairs.set(key, [...(pairs.get(key) ?? []), edge]);
  }
  const nodeBoxes: Box[] = nodes.map((node) => ({
    ...node,
    width: relationGraph.nodeWidth,
    height: relationGraph.nodeHeight,
  }));
  const labels: Box[] = [];
  const edges = visible.map((edge) => {
    const a = positions.get(edge.from)!;
    const b = positions.get(edge.to)!;
    // Use the same normal for both directions within an unordered pair.
    const forward = edge.from < edge.to ? 1 : -1;
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    const normal = {
      x: (-(b.y - a.y) / length) * forward,
      y: ((b.x - a.x) / length) * forward,
    };
    const siblings = pairs.get(pairKey(edge))!;
    const lane = siblings.indexOf(edge) - (siblings.length - 1) / 2;
    const control = {
      x: (a.x + b.x) / 2 + normal.x * lane * 72,
      y: (a.y + b.y) / 2 + normal.y * lane * 72,
    };
    const start = rectanglePort(
      a,
      control,
      relationGraph.nodeWidth + 8,
      relationGraph.nodeHeight + 8,
    );
    const end = rectanglePort(
      b,
      control,
      relationGraph.nodeWidth + 8,
      relationGraph.nodeHeight + 8,
    );
    const width = edge.label.length * 7.6 + 14;
    const height = 22;
    const available = (point: Point) => {
      const box = { ...point, width, height };
      return (
        point.x - width / 2 >= 8 &&
        point.x + width / 2 <= relationGraph.width - 8 &&
        point.y - height / 2 >= 8 &&
        point.y + height / 2 <= relationGraph.height - 8 &&
        ![...nodeBoxes, ...labels].some((other) => intersects(box, other))
      );
    };
    const candidates = [0.5, 0.35, 0.65, 0.2, 0.8].flatMap((t) => {
      const anchor = curvePoint(start, control, end, t);
      return [0, 28, -28, 56, -56, 84, -84].map((shift) => ({
        x: anchor.x + normal.x * shift,
        y: anchor.y + normal.y * shift,
        anchor,
        distance: Math.abs(t - 0.5) * length + Math.abs(shift),
      }));
    });
    candidates.sort((a, b) => a.distance - b.distance);
    let label = candidates.find(available);
    if (!label) {
      // Dense expanded graphs can need a label away from its curve midpoint.
      const anchor = curvePoint(start, control, end, 0.5);
      const free: typeof candidates = [];
      for (let y = 22; y <= relationGraph.height - 22; y += 12)
        for (
          let x = width / 2 + 8;
          x <= relationGraph.width - width / 2 - 8;
          x += 12
        )
          if (available({ x, y }))
            free.push({
              x,
              y,
              anchor,
              distance: Math.hypot(x - anchor.x, y - anchor.y),
            });
      free.sort((a, b) => a.distance - b.distance);
      label = free[0];
    }
    if (!label) throw new Error(`No space for relationship label: ${edge.id}`);
    labels.push({ ...label, width, height });
    const detached =
      Math.hypot(label.x - label.anchor.x, label.y - label.anchor.y) > 1;
    const leaderEnd = detached
      ? rectanglePort(label, label.anchor, width, height)
      : null;
    return {
      ...edge,
      start,
      end,
      control,
      path: `M${start.x},${start.y} Q${control.x},${control.y} ${end.x},${end.y}`,
      labelBox: { ...label, width, height, leaderEnd },
    };
  });
  return { ...relationGraph, nodes, edges };
}

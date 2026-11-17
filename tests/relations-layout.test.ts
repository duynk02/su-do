import test from "node:test";
import assert from "node:assert/strict";
import { people, relationships } from "../src/data/history";
import { layoutRelations } from "../src/lib/relations-layout";
import type { Relationship } from "../src/data/schema";

type Box = { x: number; y: number; width: number; height: number };
const overlaps = (a: Box, b: Box) =>
  Math.abs(a.x - b.x) < (a.width + b.width) / 2 &&
  Math.abs(a.y - b.y) < (a.height + b.height) / 2;

test("parallel relationships keep separate paths and labels in either direction", () => {
  const edges: Relationship[] = [
    {
      id: "parent",
      from: "a",
      to: "b",
      type: "parent",
      label: "Cha – con",
      claimIds: [],
      status: "draft",
    },
    {
      id: "succession",
      from: "b",
      to: "a",
      type: "succession",
      label: "Kế vị",
      claimIds: [],
      status: "draft",
    },
  ];
  const graph = layoutRelations("a", edges);
  const [parent, succession] = graph.edges;
  assert.notEqual(parent.path, succession.path);
  assert.equal(overlaps(parent.labelBox, succession.labelBox), false);
  assert.ok(parent.start.x > parent.end.x);
  assert.ok(succession.start.x < succession.end.x);
});

test("all character graphs keep every visible relationship label clear of labels and nodes", () => {
  for (const person of people) {
    const direct = relationships.filter(
      (r) => r.from === person.id || r.to === person.id,
    );
    const neighbors = new Set(direct.flatMap((r) => [r.from, r.to]));
    const expanded = relationships.filter(
      (r) => neighbors.has(r.from) || neighbors.has(r.to),
    );
    for (const edges of [direct, expanded]) {
      const graph = layoutRelations(person.id, edges);
      const shown = new Set(graph.nodes.map((node) => node.id));
      assert.equal(
        graph.edges.length,
        edges.filter((r) => shown.has(r.from) && shown.has(r.to)).length,
      );
      const boxes = graph.nodes.map((node) => ({
        ...node,
        width: graph.nodeWidth,
        height: graph.nodeHeight,
      }));
      graph.edges.forEach((edge, index) => {
        const label = edge.labelBox;
        assert.ok(
          label.x - label.width / 2 >= 0 &&
            label.x + label.width / 2 <= graph.width,
        );
        assert.ok(
          label.y - label.height / 2 >= 0 &&
            label.y + label.height / 2 <= graph.height,
        );
        for (const node of boxes)
          assert.equal(
            overlaps(label, node),
            false,
            `${person.id}: ${edge.id} covers ${node.id}`,
          );
        for (const other of graph.edges.slice(index + 1))
          assert.equal(
            overlaps(label, other.labelBox),
            false,
            `${person.id}: ${edge.id} overlaps ${other.id}`,
          );
      });
    }
  }
});

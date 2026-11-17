import test from "node:test";
import assert from "node:assert/strict";
import { people, relationships } from "../src/data/history";
import {
  defaultRelationView,
  layoutRelations,
  relationsForView,
  relationViews,
} from "../src/lib/relations-layout";
import type { Relationship } from "../src/data/schema";
type Box = { x: number; y: number; width: number; height: number };
const overlaps = (a: Box, b: Box) =>
  Math.abs(a.x - b.x) < (a.width + b.width) / 2 &&
  Math.abs(a.y - b.y) < (a.height + b.height) / 2;

test("family scope excludes succession and political links and preserves known links among reached people", () => {
  const family = relationsForView("tran-canh", relationships, "family", true);
  assert.ok(
    family.every((r) => ["parent", "marriage", "sibling"].includes(r.type)),
  );
  assert.ok(family.some((r) => r.id === "rel-ly-tran-thi-dung"));
  assert.equal(
    defaultRelationView("duong-nhat-le", relationships),
    "succession",
  );
  assert.equal(defaultRelationView("tran-thu-do", relationships), "political");
});

test("family tiers preserve individual parentage rather than deriving children from a marriage", () => {
  const family = relationsForView("tran-canh", relationships, "family", true);
  const graph = layoutRelations("tran-canh", family, "family");
  const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
  for (const r of graph.edges) {
    const a = nodes.get(r.from)!;
    const b = nodes.get(r.to)!;
    if (r.type === "parent") {
      assert.ok(a.y < b.y);
      assert.equal(r.start.x, a.x);
      assert.equal(r.end.x, b.x);
    }
    if (r.type === "marriage") assert.equal(a.y, b.y);
  }
  assert.ok(
    !graph.edges.some(
      (r) => r.from === "ly-chieu-hoang" && r.to === "tran-thanh-tong",
    ),
  );
  assert.deepEqual(
    graph.edges.map((r) => r.id),
    family.map((r) => r.id),
  );
});

test("all profiles retain scoped people and clear labels in each direct and expanded view", () => {
  for (const person of people)
    for (const view of relationViews)
      for (const expanded of [false, true]) {
        const edges = relationsForView(
          person.id,
          relationships,
          view.id,
          expanded,
        );
        const graph = layoutRelations(person.id, edges, view.id);
        for (const edge of graph.edges) {
          const from = graph.nodes.find((node) => node.id === edge.from)!;
          const to = graph.nodes.find((node) => node.id === edge.to)!;
          if (edge.type === "parent")
            assert.ok(
              from.y < to.y,
              `${person.id}: parent must be above child`,
            );
          if (edge.type === "marriage")
            assert.equal(
              from.y,
              to.y,
              `${person.id}: spouses must share a tier`,
            );
        }
        assert.equal(graph.edges.length, edges.length);
        assert.equal(
          graph.nodes.length,
          new Set([person.id, ...edges.flatMap((r) => [r.from, r.to])]).size,
        );
        const boxes = graph.nodes.map((node) => ({
          ...node,
          width: graph.nodeWidth,
          height: graph.nodeHeight,
        }));
        for (let index = 0; index < boxes.length; index++)
          for (const other of boxes.slice(index + 1))
            assert.equal(
              overlaps(boxes[index], other),
              false,
              `${person.id}/${view.id}: nodes overlap`,
            );
        const labels = graph.edges.flatMap((edge) =>
          edge.labelBox ? [edge.labelBox] : [],
        );
        for (const [index, label] of labels.entries()) {
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
              `${person.id}/${view.id}: label covers node`,
            );
          for (const other of labels.slice(index + 1))
            assert.equal(
              overlaps(label, other),
              false,
              `${person.id}/${view.id}: labels overlap`,
            );
        }
      }
});

test("large families are laid out without silently dropping people", () => {
  const edges: Relationship[] = Array.from({ length: 11 }, (_, index) => ({
    id: `child-${index}`,
    from: "parent",
    to: `child-${index}`,
    type: "parent",
    label: "Cha – con",
    claimIds: [],
    status: "draft",
  }));
  const graph = layoutRelations("parent", edges, "family");
  assert.equal(graph.nodes.length, 12);
  assert.equal(graph.edges.length, 11);
  assert.ok(graph.width > 520);
});

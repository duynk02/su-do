"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";
import { people, relationships, tenures } from "@/data/history";
import type { Person } from "@/data/schema";
import {
  defaultRelationView,
  layoutRelations,
  relationsForView,
  relationViews,
} from "@/lib/relations-layout";
import { Icon } from "./icon";

function NodeText({
  children,
  maxWidth,
  ...props
}: Omit<SVGProps<SVGTextElement>, "children"> & {
  children: string;
  maxWidth: number;
}) {
  const ref = useRef<SVGTextElement>(null);
  const [display, setDisplay] = useState(children);
  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (!active || !ref.current) return;
      const context = document.createElement("canvas").getContext("2d");
      if (!context) return;
      const style = getComputedStyle(ref.current);
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      if (context.measureText(children).width <= maxWidth) {
        setDisplay(children);
        return;
      }
      const characters = Array.from(children);
      let low = 0;
      let high = characters.length;
      while (low < high) {
        const middle = Math.ceil((low + high) / 2);
        if (context.measureText(characters.slice(0, middle).join("") + "…").width <= maxWidth)
          low = middle;
        else high = middle - 1;
      }
      setDisplay(characters.slice(0, low).join("").trimEnd() + "…");
    });
    return () => { active = false; };
  }, [children, maxWidth]);
  return <text {...props} ref={ref}>{display}</text>;
}

export function Relations({
  person,
  actions,
}: {
  person: Person;
  actions: { onPerson: (id: string) => void; onClaim: (id: string) => void };
}) {
  const [expand, setExpand] = useState(false);
  const [view, setView] = useState(() =>
    defaultRelationView(person.id, relationships),
  );
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const direct = relationships.filter(
    (r) => r.from === person.id || r.to === person.id,
  );
  const edges = relationsForView(person.id, relationships, view, expand);
  const graph = layoutRelations(person.id, edges, view);
  const selected = graph.nodes.find((node) => node.id === person.id)!;
  const canExpand =
    relationsForView(person.id, relationships, view, true).length >
    relationsForView(person.id, relationships, view, false).length;
  const label = relationViews.find((item) => item.id === view)!.label;
  const markerId = `relation-arrow-${person.id}-${view}`;
  const name = (id: string) => people.find((p) => p.id === id)?.name ?? id;
  const fitGraph = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const reader = viewport.closest<HTMLElement>(".reader-body");
    const availableHeight = window.matchMedia("(max-width: 900px)").matches
      ? window.innerHeight * 0.65
      : (reader?.clientHeight ?? window.innerHeight) * 0.75;
    setZoom(
      Math.min(
        1,
        Math.max(
          0.1,
          Math.min(
            (viewport.clientWidth - 2) / graph.width,
            availableHeight / graph.height,
          ),
        ),
      ),
    );
  };

  useEffect(() => {
    setZoom(1);
  }, [view, expand]);
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport)
      viewport.scrollLeft = Math.max(
        0,
        selected.x * zoom - viewport.clientWidth / 2,
      );
  }, [selected.x, zoom, view, expand]);

  return (
    <section className="relations-section">
      <div className="section-label">
        Quan hệ{" "}
        {direct.length > 0 && (
          <span>
            {graph.nodes.length} nhân vật · {edges.length} liên kết
          </span>
        )}
      </div>
      {direct.length ? (
        <>
          <div
            className="relation-view-switch"
            role="group"
            aria-label="Loại quan hệ"
          >
            {relationViews.map((item) => {
              const count = relationsForView(
                person.id,
                relationships,
                item.id,
                expand,
              ).length;
              return (
                <button
                  key={item.id}
                  aria-pressed={view === item.id}
                  disabled={!count}
                  onClick={() => setView(item.id)}
                >
                  {item.label} <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="relation-tools">
            <button
              className="text-link relation-scope"
              disabled={!canExpand && !expand}
              onClick={() => setExpand(!expand)}
              aria-expanded={expand}
            >
              {expand ? "Thu về quan hệ gần" : "Mở thêm một bậc quan hệ"}{" "}
              <Icon name="chevron" size={14} />
            </button>
            <div
              className="relation-zoom"
              role="group"
              aria-label="Kích thước sơ đồ"
            >
              <button
                aria-label="Thu nhỏ sơ đồ"
                disabled={zoom <= 0.1}
                onClick={() =>
                  setZoom((value) =>
                    Math.max(0.1, Math.round((value - 0.2) * 100) / 100),
                  )
                }
              >
                −
              </button>
              <button
                aria-label="Khôi phục kích thước sơ đồ"
                onClick={() => setZoom(1)}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                aria-label="Phóng to sơ đồ"
                disabled={zoom >= 2}
                onClick={() =>
                  setZoom((value) =>
                    Math.min(2, Math.round((value + 0.2) * 100) / 100),
                  )
                }
              >
                +
              </button>
              <button
                aria-label="Vừa khung sơ đồ"
                title="Vừa khung"
                onClick={fitGraph}
              >
                <Icon name="expand" size={15} />
              </button>
            </div>
          </div>
          {view === "family" && (
            <div className="relations-legend">
              <span>
                <i />
                Cha mẹ → con
              </span>
              <span>
                <i className="relation-marriage-key" />
                Hôn nhân
              </span>
            </div>
          )}
          <div
            className="relations-viewport"
            ref={viewportRef}
            data-view={view}
            tabIndex={0}
            aria-label={`${label} của ${person.name}`}
          >
            <svg
              width={graph.width * zoom}
              height={graph.height * zoom}
              viewBox={`0 0 ${graph.width} ${graph.height}`}
              className="relations-graph"
              role="group"
              aria-label={`Sơ đồ ${label.toLowerCase()} của ${person.name}`}
            >
              <defs>
                <marker
                  id={markerId}
                  markerWidth="5"
                  markerHeight="5"
                  refX="5"
                  refY="2.5"
                  orient="auto"
                >
                  <path d="M0 0 5 2.5 0 5" fill="#899489" />
                </marker>
              </defs>
              <g className="relationship-paths">
                {graph.edges.map((r) => (
                  <path
                    key={r.id}
                    data-relationship={r.id}
                    data-from={r.from}
                    data-to={r.to}
                    data-type={r.type}
                    d={r.path}
                    fill="none"
                    stroke={r.type === "marriage" ? "#a13d2d" : "#899489"}
                    strokeWidth={r.type === "parent" ? 1.5 : 1}
                    strokeDasharray={
                      r.type === "succession"
                        ? "5 4"
                        : r.type === "political"
                          ? "2 3"
                          : undefined
                    }
                    markerEnd={
                      r.type === "parent" || r.type === "succession"
                        ? `url(#${markerId})`
                        : undefined
                    }
                  />
                ))}
              </g>
              {graph.nodes.map((node) => {
                const entry = people.find((p) => p.id === node.id)!;
                const subtitle =
                  view === "succession"
                    ? tenures.find(
                        (t) => t.personId === node.id && t.role === "reigning",
                      )?.date.label
                    : entry.life
                        ?.replace(
                          /chưa rõ năm sinh và năm mất/i,
                          "Niên đại chưa rõ",
                        )
                        .replace(/chưa rõ năm sinh\s*[–-]\s*/i, "?–")
                        .replace(/\s*[–-]\s*chưa rõ năm mất/i, "–?")
                        .replace(/khoảng /i, "k. ");
                return (
                  <g
                    key={node.id}
                    className="relationship-node"
                    data-person={node.id}
                    data-generation={node.generation}
                    role="button"
                    tabIndex={0}
                    aria-label={`Xem hồ sơ ${entry.name}`}
                    aria-current={node.id === person.id ? "true" : undefined}
                    onClick={() => {
                      if (node.id !== person.id) actions.onPerson(node.id);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        if (node.id !== person.id) actions.onPerson(node.id);
                      }
                    }}
                  >
                    <title>{`${entry.name}${subtitle ? ` · ${subtitle}` : ""}`}</title>
                    <rect
                      x={node.x - graph.nodeWidth / 2}
                      y={node.y - graph.nodeHeight / 2}
                      width={graph.nodeWidth}
                      height={graph.nodeHeight}
                      fill={node.id === person.id ? "#a13d2d" : "#fbfaf6"}
                      stroke={node.id === person.id ? "#a13d2d" : "#cccdbf"}
                    />
                    <NodeText
                      maxWidth={graph.nodeWidth - 16}
                      x={node.x}
                      y={node.y + (subtitle ? -4 : 5)}
                      textAnchor="middle"
                      fill={node.id === person.id ? "#fffaf0" : "#29382f"}
                      className="relation-person-name"
                    >
                      {entry.name}
                    </NodeText>
                    {subtitle && (
                      <NodeText
                        maxWidth={graph.nodeWidth - 16}
                        x={node.x}
                        y={node.y + 17}
                        textAnchor="middle"
                        fill={node.id === person.id ? "#f4ded5" : "#64705c"}
                        className="relation-person-date"
                      >
                        {subtitle}
                      </NodeText>
                    )}
                  </g>
                );
              })}
              {graph.edges.map(
                (r) =>
                  r.labelBox && (
                    <g
                      key={r.id}
                      className="relationship-caption"
                      data-relationship={r.id}
                    >
                      <rect
                        x={r.labelBox.x - r.labelBox.width / 2}
                        y={r.labelBox.y - r.labelBox.height / 2}
                        width={r.labelBox.width}
                        height={r.labelBox.height}
                        rx="3"
                        fill="#f4f3e9"
                      />
                      <text
                        x={r.labelBox.x}
                        y={r.labelBox.y}
                        dominantBaseline="central"
                        textAnchor="middle"
                        className="relationship-label"
                      >
                        {r.label}
                      </text>
                    </g>
                  ),
              )}
            </svg>
          </div>
          <ul className="relationship-list">
            {edges.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() =>
                    actions.onPerson(r.from === person.id ? r.to : r.from)
                  }
                >
                  {name(r.from)} <span>{r.label.toLowerCase()}</span>{" "}
                  {name(r.to)}
                </button>
                <button
                  className="citation"
                  onClick={() => actions.onClaim(r.claimIds[0])}
                  aria-label={`Nguồn quan hệ ${name(r.from)} và ${name(r.to)}`}
                >
                  ↗
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Chưa biên soạn quan hệ có nguồn cho nhân vật này.</p>
      )}
    </section>
  );
}

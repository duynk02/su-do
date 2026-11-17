"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { geoGraticule, geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection } from "geojson";
import type { Place } from "@/data/schema";
import { formatYear } from "@/lib/history";
import { Icon } from "./icon";

interface Props {
  year: number;
  places: Place[];
  selectedPlace: string | null;
  highlighted: string[];
  onSelect: (id: string) => void;
  onMethods: () => void;
  wide: boolean;
}
export default function AtlasMap({
  year,
  places,
  selectedPlace,
  highlighted,
  onSelect,
  onMethods,
  wide,
}: Props) {
  const [data, setData] = useState<{
    land: FeatureCollection;
    rivers: FeatureCollection;
  } | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const [modern, setModern] = useState(false);
  const [riverLayer, setRiverLayer] = useState(true);
  const [placeLayer, setPlaceLayer] = useState(true);
  const [layerPanel, setLayerPanel] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const drag = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    Promise.all(
      ["land", "rivers"].map((name) =>
        fetch(`/maps/${name}.json`, { signal: controller.signal }).then((r) => {
          if (!r.ok) throw new Error("Map unavailable");
          return r.json();
        }),
      ),
    )
      .then(([land, rivers]) => {
        setData({ land, rivers });
        setError(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, [attempt]);
  const projection = useMemo(
    () =>
      geoMercator()
        .center([105.9, 19.6])
        .scale(wide ? 2500 : 6200)
        .translate([350, 400]),
    [wide],
  );
  const path = useMemo(() => geoPath(projection), [projection]);
  const grid = useMemo(() => geoGraticule().step([1, 1])(), []);
  const landPaths = useMemo(
    () =>
      data?.land.features.map((f) => ({
        name: String(f.properties?.name),
        d: path(f) ?? "",
      })),
    [data, path],
  );
  const riverPath = useMemo(
    () => (data ? (path(data.rivers) ?? "") : ""),
    [data, path],
  );
  const dots = places.filter((p) => p.coordinates);
  const selected = places.find((p) => p.id === selectedPlace);
  const reset = () => {
    setZoom(1);
    setOffset([0, 0]);
  };
  const changeZoom = (amount: number) =>
    setZoom((v) =>
      Math.min(3, Math.max(0.6, Math.round((v + amount) * 10) / 10)),
    );
  const labelOffsets: Record<string, [number, number]> = {
    "thang-long": [-24, -27],
    "kiep-bac": [-40, -84],
    "thai-mieu": [38, -58],
    "yen-tu": [48, -18],
    "tay-do": [20, 12],
  };

  return (
    <div className={`map-stage ${wide ? "map-wide" : ""}`}>
      <div className="map-heading">
        <span className="eyebrow">Không gian lịch sử</span>
        <span className="map-date">
          Mốc đang xem <strong>{formatYear(year)}</strong>
        </span>
      </div>
      <div className="map-caption-top">
        Điểm di sản tham chiếu và địa điểm liên quan
      </div>
      <button
        className="map-layer-button"
        aria-expanded={layerPanel}
        onClick={() => setLayerPanel(!layerPanel)}
      >
        <Icon name="layers" /> Lớp bản đồ
      </button>
      {layerPanel && (
        <div className="layer-panel">
          <strong>Các lớp hiển thị</strong>
          <label>
            <input
              type="checkbox"
              checked={placeLayer}
              onChange={(e) => setPlaceLayer(e.target.checked)}
            />{" "}
            Địa điểm liên quan
          </label>
          <label>
            <input
              type="checkbox"
              checked={riverLayer}
              onChange={(e) => setRiverLayer(e.target.checked)}
            />{" "}
            Sông hiện đại để định hướng
          </label>
          <label>
            <input
              type="checkbox"
              checked={modern}
              onChange={(e) => setModern(e.target.checked)}
            />{" "}
            Tham chiếu hiện đại
          </label>
          <p>Ranh giới lịch sử: chưa có dữ liệu được đối chiếu.</p>
        </div>
      )}
      <div className="map-north" aria-label="Hướng bắc">
        <span>B</span>
        <svg width="25" height="45" viewBox="0 0 25 45" aria-hidden="true">
          <path d="M12.5 4 5 29l7.5-5 7.5 5Z" fill="currentColor" />
          <path d="M12.5 4v35" stroke="currentColor" />
        </svg>
      </div>
      {!data && !error && (
        <div className="map-loading" role="status">
          Đang tải nền địa lý…
          <br />
          <small>Bài đọc và danh sách địa điểm vẫn sẵn sàng.</small>
        </div>
      )}
      {error && (
        <div className="map-error" role="alert">
          <Icon name="map" size={28} />
          <h3>Chưa tải được bản đồ</h3>
          <p>Bạn vẫn có thể đọc và chọn địa điểm trong danh sách bên dưới.</p>
          <button
            className="text-link"
            onClick={() => {
              setError(false);
              setAttempt((v) => v + 1);
            }}
          >
            Thử tải lại <Icon name="arrow" />
          </button>
        </div>
      )}
      {data && !error && (
        <svg
          className="geography"
          viewBox="0 0 700 800"
          role="group"
          aria-label={`Bản đồ địa điểm tại mốc ${formatYear(year)}. Nền địa lý hiện đại, không thể hiện lãnh thổ lịch sử.`}
          tabIndex={0}
          onKeyDown={(e) => {
            const moves: Record<string, [number, number]> = {
              ArrowLeft: [30, 0],
              ArrowRight: [-30, 0],
              ArrowUp: [0, 30],
              ArrowDown: [0, -30],
            };
            if (moves[e.key]) {
              e.preventDefault();
              const [x, y] = moves[e.key];
              setOffset(([ox, oy]) => [ox + x, oy + y]);
            }
            if (e.key === "+" || e.key === "=") {
              e.preventDefault();
              changeZoom(0.2);
            }
            if (e.key === "-") {
              e.preventDefault();
              changeZoom(-0.2);
            }
            if (e.key === "Home") {
              e.preventDefault();
              reset();
            }
          }}
          onPointerDown={(e) => {
            if ((e.target as SVGElement).closest("[data-place]")) return;
            drag.current = {
              x: e.clientX,
              y: e.clientY,
              left: offset[0],
              top: offset[1],
            };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (drag.current) {
              const factor =
                700 / e.currentTarget.getBoundingClientRect().width;
              setOffset([
                drag.current.left + (e.clientX - drag.current.x) * factor,
                drag.current.top + (e.clientY - drag.current.y) * factor,
              ]);
            }
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <defs>
            <pattern
              id="sea-lines"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 7 7 0"
                stroke="#bacccc"
                strokeWidth=".4"
                opacity=".35"
              />
            </pattern>
          </defs>
          <rect width="700" height="800" fill="#dce7e3" />
          <rect width="700" height="800" fill="url(#sea-lines)" />
          <g
            transform={`translate(${offset[0]} ${offset[1]}) translate(350 400) scale(${zoom}) translate(-350 -400)`}
          >
            <path
              d={path(grid) ?? ""}
              fill="none"
              stroke="#a0b8ad"
              strokeWidth=".55"
              opacity=".35"
            />
            {landPaths?.map((f) => (
              <path
                key={f.name}
                d={f.d}
                fill="#ecece0"
                stroke={modern ? "#7b8980" : "none"}
                strokeWidth=".8"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {riverLayer && (
              <path
                d={riverPath}
                fill="none"
                stroke="#91b8b5"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            )}
            <text
              x="520"
              y="580"
              className="sea-label"
              transform="rotate(-28 520 580)"
            >
              VỊNH BẮC BỘ
            </text>
            {wide && (
              <text
                x="440"
                y="705"
                className="sea-label"
                transform="rotate(-28 440 705)"
              >
                BIỂN ĐÔNG
              </text>
            )}
            {modern && (
              <g className="modern-labels">
                <text x="100" y="250">
                  LÀO
                </text>
                <text x="400" y="130">
                  TRUNG QUỐC
                </text>
                <text x="280" y="600" transform="rotate(40 280 600)">
                  VIỆT NAM
                </text>
              </g>
            )}
            {placeLayer &&
              dots.map((p) => {
                const [x, y] = projection(p.coordinates!)!;
                const [dx, dy] = labelOffsets[p.id] ?? [16, -16];
                const active =
                  selectedPlace === p.id || highlighted.includes(p.id);
                return (
                  <g
                    key={p.id}
                    data-place={p.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name}. ${p.precision}`}
                    aria-pressed={selectedPlace === p.id}
                    onClick={() => onSelect(p.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        onSelect(p.id);
                      }
                    }}
                    className={`map-marker ${active ? "active" : ""}`}
                  >
                    <line
                      x1={x}
                      y1={y}
                      x2={x + dx}
                      y2={y + dy + 7}
                      stroke="currentColor"
                      strokeWidth=".7"
                      vectorEffect="non-scaling-stroke"
                    />
                    {active && (
                      <circle
                        cx={x}
                        cy={y}
                        r="14"
                        fill="currentColor"
                        opacity=".1"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={p.type === "capital" ? 7 : 5}
                      fill="#faf9f2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                    {p.type === "capital" ? (
                      <rect
                        x={x - 2}
                        y={y - 2}
                        width="4"
                        height="4"
                        fill="currentColor"
                      />
                    ) : (
                      <circle cx={x} cy={y} r="2" fill="currentColor" />
                    )}
                    <text
                      x={x + dx}
                      y={y + dy}
                      textAnchor={dx < 0 ? "end" : "start"}
                      className="place-label"
                    >
                      {p.name}
                    </text>
                    {p.type === "capital" && (
                      <text
                        x={x + dx}
                        y={y + dy + 16}
                        textAnchor={dx < 0 ? "end" : "start"}
                        className="place-sublabel"
                      >
                        Điểm đại diện kinh đô
                      </text>
                    )}
                  </g>
                );
              })}
          </g>
        </svg>
      )}
      <div className="map-controls" aria-label="Điều khiển bản đồ">
        <button
          aria-label="Phóng to bản đồ"
          onClick={() => changeZoom(0.2)}
          disabled={zoom >= 3}
        >
          +
        </button>
        <button
          aria-label="Thu nhỏ bản đồ"
          onClick={() => changeZoom(-0.2)}
          disabled={zoom <= 0.6}
        >
          −
        </button>
        <button aria-label="Về góc nhìn ban đầu" onClick={reset}>
          <Icon name="expand" size={17} />
        </button>
      </div>
      <div className="map-bottom">
        <div className="map-legend">
          <span>
            <i className="legend-capital" />
            Kinh đô
          </span>
          <span>
            <i className="legend-site" />
            Di sản
          </span>
          <span>
            <i className="legend-uncertain" />
            Vị trí tương đối: xem danh sách
          </span>
        </div>
        <div className="boundary-notice">
          <Icon name="info" size={15} />
          <span>Chưa có lớp ranh giới được đối chiếu cho mốc này.</span>
          <button onClick={onMethods} aria-label="Đọc phương pháp bản đồ">
            Tìm hiểu
          </button>
        </div>
        {modern && (
          <p className="modern-notice">
            Đang bật: Tham chiếu hiện đại · không phải ranh giới thời Trần.
          </p>
        )}
        {selected && (
          <div className="selected-map-place">
            <strong>{selected.name}</strong>
            <span>{selected.precision}</span>
          </div>
        )}
        <button
          className="map-list-toggle"
          aria-expanded={listOpen || error}
          onClick={() => setListOpen(!listOpen)}
        >
          <Icon name="pin" size={15} /> Danh sách địa điểm ({places.length}){" "}
          <Icon name="chevron" size={13} />
        </button>
        {(listOpen || error) && (
          <ul className="map-place-list">
            {places.length ? (
              places.map((p) => (
                <li key={p.id}>
                  <button onClick={() => onSelect(p.id)}>
                    {p.name}
                    <small>
                      {p.coordinates
                        ? p.locationType === "modern-memorial"
                          ? "Di tích tưởng niệm hiện nay"
                          : "Điểm tham chiếu di sản"
                        : "Vị trí tương đối · chưa đặt điểm"}
                    </small>
                  </button>
                </li>
              ))
            ) : (
              <li>Chưa có địa điểm được biên soạn cho mốc này.</li>
            )}
          </ul>
        )}
        <div className="map-credit">
          <span>Nền địa lý hiện đại · Natural Earth, public domain</span>
          <button onClick={onMethods}>Nguồn & giới hạn</button>
        </div>
      </div>
    </div>
  );
}

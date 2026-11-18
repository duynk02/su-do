"use client";

import { Fragment } from "react";

import {
  citations,
  events,
  mediaAssets,
  people,
  periods,
  places,
  sources,
  tenures,
} from "@/data/history";
import { statusLabels, type Person, type StoryChapter } from "@/data/schema";
import {
  claimById,
  chaptersForPeriod,
  peopleForPeriod,
  eventsForPeriod,
  tenuresForPeriod,
  type AtlasState,
} from "@/lib/history";
import { Relations } from "./relations";
import { Icon } from "./icon";

export interface ReaderActions {
  onChapter: (id: string) => void;
  onPerson: (id: string) => void;
  onEvent: (id: string) => void;
  onPlace: (id: string) => void;
  onClaim: (id: string) => void;
  onPeriod: (id: string) => void;
  onView: (view: AtlasState["view"]) => void;
  onMap: (placeId?: string) => void;
}
export function ClaimText({
  id,
  onClaim,
  className = "",
}: {
  id: string;
  onClaim: (id: string) => void;
  className?: string;
}) {
  const c = claimById(id);
  if (!c?.published) return null;
  return (
    <p className={`claim-text ${className}`}>
      {c.text}
      <button
        className="citation"
        onClick={() => onClaim(id)}
        aria-label={`Xem nguồn: ${c.text.slice(0, 50)}…`}
      >
        {citations.findIndex((ref) => ref.claimId === id) + 1}
      </button>
    </p>
  );
}
const pName = (id: string) => people.find((p) => p.id === id)?.name ?? id;
const mediaKindLabel = {
  "artifact-photo": "Ảnh hiện vật",
  "heritage-photo": "Ảnh di tích",
  "statue-photo": "Ảnh tượng",
  painting: "Tranh minh họa",
  reconstruction: "Minh họa tái dựng",
};

export function PersonLinks({
  ids,
  onPerson,
  showPortraits = false,
}: {
  ids: string[];
  onPerson: (id: string) => void;
  showPortraits?: boolean;
}) {
  return (
    <div className={`person-links${showPortraits ? " person-directory" : ""}`}>
      {ids.map((id) => {
        const person = people.find((entry) => entry.id === id)!;
        const image =
          showPortraits &&
          mediaAssets.find((asset) => asset.id === person.mediaAssetId);
        return (
          <button key={id} onClick={() => onPerson(id)} data-person={id}>
            {showPortraits &&
              (image ? (
                <img
                  className="person-link-photo"
                  src={image.src}
                  width={48}
                  height={60}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <span className="person-link-initial" aria-hidden="true">
                  {person.name.split(" ").at(-1)?.slice(0, 1)}
                </span>
              ))}
            <span>{person.name}</span>
            <Icon name="arrow" size={14} />
          </button>
        );
      })}
    </div>
  );
}

function RulerList({
  actions,
  periodId,
}: {
  actions: ReaderActions;
  periodId: string;
}) {
  const periodTenures = tenuresForPeriod(periodId);
  if (!periodTenures.length) return null;
  return (
    <section className="ruler-section">
      <div className="section-label">Chuỗi ngôi vua</div>
      <div className="ruler-list">
        {periodTenures
          .filter((t) => t.role === "reigning")
          .map((t, i) => (
            <button
              key={t.id}
              onClick={() => actions.onPerson(t.personId)}
            >
              <span className="ruler-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                {t.label.replace("Hoàng đế · ", "")}
                <small>
                  {people.find((p) => p.id === t.personId)?.personalName}
                </small>
              </span>
              <time>{t.date.label}</time>
            </button>
          ))}
      </div>
      {periodTenures.some((tenure) => tenure.role === "retired") && (
        <>
          <div className="section-label retired-heading">
            Thái thượng hoàng <span>Phần đã biên soạn</span>
          </div>
          <div className="retired-list">
            {periodTenures
              .filter((t) => t.role === "retired")
              .map((t) => (
                <button key={t.id} onClick={() => actions.onPerson(t.personId)}>
                  <span>{pName(t.personId)}</span>
                  <time>{t.date.label}</time>
                </button>
              ))}
          </div>
        </>
      )}
    </section>
  );
}

function ChapterVisual({
  chapter,
  actions,
}: {
  chapter: StoryChapter;
  actions: ReaderActions;
}) {
  const visual = chapter.visual;
  switch (visual.type) {
    case "chain":
      return (
        <div className="cause-chain" aria-label={visual.label}>
          {visual.items.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <i aria-hidden="true">↓</i>}
              {index === visual.items.length - 1 ? (
                <strong>{item}</strong>
              ) : (
                <span>{item}</span>
              )}
            </Fragment>
          ))}
        </div>
      );
    case "relations": {
      const person = people.find((entry) => entry.id === visual.personId);
      return person ? (
        <Relations key={person.id} person={person} actions={actions} />
      ) : null;
    }
    case "comparison":
      return (
        <div className="role-comparison">
          {visual.items.map((item) => (
            <div key={item.personId}>
              <small>{item.label}</small>
              <button onClick={() => actions.onPerson(item.personId)}>
                {pName(item.personId)} <Icon name="arrow" size={14} />
              </button>
              <span>{item.detail}</span>
            </div>
          ))}
        </div>
      );
    case "rulers":
      return <RulerList periodId={chapter.periodId} actions={actions} />;
    case "events":
      return (
        <div className="war-sequence">
          {visual.eventIds.map((id) => {
            const event = events.find((entry) => entry.id === id);
            return event ? (
              <button key={id} onClick={() => actions.onEvent(id)}>
                <time>{event.date.label}</time>
                <span>{event.name}</span>
                <Icon name="arrow" size={16} />
              </button>
            ) : null;
          })}
        </div>
      );
    case "artifact": {
      const asset = mediaAssets.find(
        (entry) => entry.id === visual.mediaAssetId,
      );
      if (!asset) return null;
      return (
        <figure className="artifact">
          <img
            src={asset.src}
            alt={asset.alt ?? asset.title}
            width={asset.width ?? 700}
            height={asset.height ?? 500}
            loading="lazy"
          />
          <figcaption>
            <span className="artifact-type">{mediaKindLabel[asset.kind]}</span>
            <strong>{asset.title}</strong>
            <span>{asset.date}</span>
            <span>{asset.creator}</span>
            {visual.claimId && (
              <button
                className="text-link"
                onClick={() => actions.onClaim(visual.claimId!)}
              >
                {visual.linkLabel ?? "Nguồn hình ảnh"}{" "}
                <Icon name="external" size={13} />
              </button>
            )}
          </figcaption>
        </figure>
      );
    }
    case "transition":
      return (
        <div className="transition-visual">
          <button onClick={() => actions.onPerson(visual.from.personId)}>
            {pName(visual.from.personId)}
            <small>{visual.from.label}</small>
          </button>
          <span>
            {visual.label}
            <small>{visual.date}</small>
          </span>
          <button onClick={() => actions.onPerson(visual.to.personId)}>
            {pName(visual.to.personId)}
            <small>{visual.to.label}</small>
          </button>
        </div>
      );
    case "diplomacy":
      return (
        <div className="diplomacy-visual">
          <span>{visual.from}</span>
          <span>
            {visual.label}
            <br />
            {visual.detail}
          </span>
          <span>{visual.to}</span>
        </div>
      );
    case "timeline":
      return (
        <div className="ending-visual">
          {visual.items.map((item, index) => (
            <span key={index}>
              <time>{item.date}</time>
              {item.label}
            </span>
          ))}
          {visual.caption && <small>{visual.caption}</small>}
        </div>
      );
  }
}

function ChapterReader({
  chapter,
  actions,
}: {
  chapter: StoryChapter;
  actions: ReaderActions;
}) {
  const periodChapters = chaptersForPeriod(chapter.periodId);
  const index = periodChapters.findIndex((c) => c.id === chapter.id);
  const total = String(periodChapters.length).padStart(2, "0");
  return (
    <>
      <div className="chapter-kicker">
        <span>
          Chương {chapter.number} / {total}
        </span>
        <span>{chapter.date.label}</span>
      </div>
      <h2>{chapter.title}</h2>
      <p className="chapter-question">{chapter.question}</p>
      <div className="chapter-body">
        {chapter.claimIds.map((id, i) => (
          <ClaimText
            key={id}
            id={id}
            onClaim={actions.onClaim}
            className={i === 0 ? "lead-paragraph" : ""}
          />
        ))}
      </div>
      <ChapterVisual chapter={chapter} actions={actions} />
      {!!chapter.personIds.length && (
        <section className="related-section">
          <div className="section-label">Người trong câu chuyện</div>
          <PersonLinks ids={chapter.personIds} onPerson={actions.onPerson} />
        </section>
      )}
      {!!chapter.eventIds.length && (
        <section className="related-section">
          <div className="section-label">Sự kiện liên quan</div>
          {chapter.eventIds.map((id) => (
            <button
              className="event-link"
              key={id}
              onClick={() => actions.onEvent(id)}
            >
              <span>{events.find((e) => e.id === id)?.name}</span>
              <Icon name="arrow" size={16} />
            </button>
          ))}
        </section>
      )}
      {!!chapter.placeIds.length && (
        <section className="related-section">
          <div className="section-label">Đọc cùng bản đồ</div>
          {chapter.placeIds.map((id) => (
            <button
              className="place-link"
              key={id}
              onClick={() => actions.onPlace(id)}
            >
              <Icon name="pin" size={14} />
              <span>{places.find((p) => p.id === id)?.name}</span>
              <small>
                {places.find((p) => p.id === id)?.coordinates
                  ? "Điểm tham chiếu"
                  : "Vị trí tương đối"}
              </small>
            </button>
          ))}
        </section>
      )}
      <nav className="chapter-pagination" aria-label="Chuyển chương">
        <button
          disabled={index === 0}
          onClick={() => actions.onChapter(periodChapters[index - 1].id)}
        >
          <Icon
            name="arrow"
            size={15}
            style={{ transform: "rotate(180deg)" }}
          />
          Trước
        </button>
        <span>
          {chapter.number} / {total}
        </span>
        <button
          disabled={index === periodChapters.length - 1}
          onClick={() => actions.onChapter(periodChapters[index + 1].id)}
        >
          Tiếp theo
          <Icon name="arrow" size={15} />
        </button>
      </nav>
    </>
  );
}

function PersonReader({
  person,
  actions,
}: {
  person: Person;
  actions: ReaderActions;
}) {
  const roles = tenures.filter((t) => t.personId === person.id);
  const aliases = person.aliases.filter(
    (name) => name !== person.name && name !== person.personalName,
  );
  const image = mediaAssets.find((asset) => asset.id === person.mediaAssetId);
  const imageSource =
    image && sources.find((source) => source.id === image.sourceId);
  return (
    <article className="person-profile">
      <button className="back-link" onClick={() => actions.onView("people")}>
        <Icon name="arrow" size={13} style={{ transform: "rotate(180deg)" }} />{" "}
        Tất cả nhân vật
      </button>
      <div className={`person-heading${image ? " has-image" : ""}`}>
        <div>
          <div className="person-title-mark" aria-hidden="true">
            {person.name.split(" ").at(-1)?.slice(0, 1)}
          </div>
          <div className="eyebrow">Hồ sơ nhân vật</div>
          <h2>{person.name}</h2>
          <p className="chapter-question">
            {person.title ?? person.templeName ?? "Nhân vật lịch sử"}
          </p>
        </div>
        {image && imageSource && (
          <figure className="person-image">
            <a
              href={imageSource.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Xem ảnh và nguồn: ${image.title}`}
            >
              <img
                src={image.src}
                alt={image.alt ?? image.title}
                width={image.width}
                height={image.height}
              />
            </a>
            <figcaption>
              <span>{image.title}</span>
              <span className="person-image-credit">
                <a href={imageSource.url} target="_blank" rel="noreferrer">
                  {image.credit ?? image.creator}
                </a>
                {image.licenseUrl && (
                  <>
                    {" · "}
                    <a href={image.licenseUrl} target="_blank" rel="noreferrer">
                      {image.license}
                    </a>
                  </>
                )}
              </span>
            </figcaption>
          </figure>
        )}
      </div>
      <div className="person-introduction">
        {person.summaryClaimIds.map((id) => (
          <ClaimText key={id} id={id} onClaim={actions.onClaim} />
        ))}
      </div>
      <dl className="person-names">
        {person.personalName && (
          <>
            <dt>Tên húy</dt>
            <dd>{person.personalName}</dd>
          </>
        )}
        {person.templeName && (
          <>
            <dt>Miếu hiệu</dt>
            <dd>{person.templeName}</dd>
          </>
        )}
        {!!aliases.length && (
          <>
            <dt>Tên gọi khác</dt>
            <dd>{aliases.join(" · ")}</dd>
          </>
        )}
        {person.life && (
          <>
            <dt>Niên đại sống</dt>
            <dd>{person.life}</dd>
          </>
        )}
        {!!person.eraNames?.length && (
          <>
            <dt>Niên hiệu</dt>
            <dd>{person.eraNames.join(" · ")}</dd>
          </>
        )}
      </dl>
      {person.biographySections?.map((section) => (
        <section className="biography-section" key={section.title}>
          <h3>{section.title}</h3>
          {section.claimIds.map((id) => (
            <ClaimText key={id} id={id} onClaim={actions.onClaim} />
          ))}
        </section>
      ))}
      {person.note && (
        <aside className="editorial-note">
          <p>{person.note}</p>
        </aside>
      )}
      {roles.length > 0 && (
        <section className="role-tenures">
          <div className="section-label">Thời gian giữ vai trò</div>
          {roles.map((t) => (
            <div key={t.id} className={t.role}>
              <span>
                {t.role === "reigning"
                  ? "Hoàng đế trị vì"
                  : "Thái thượng hoàng"}
              </span>
              <time>{t.date.label}</time>
              <button
                className="citation"
                onClick={() => actions.onClaim(t.claimIds[0])}
                aria-label={`Nguồn nhiệm kỳ ${t.date.label}`}
              >
                ↗
              </button>
            </div>
          ))}
        </section>
      )}
      <Relations key={person.id} person={person} actions={actions} />
      {!!person.eventIds.length && (
        <section className="related-section">
          <div className="section-label">Sự kiện liên quan</div>
          {person.eventIds.map((id) => (
            <button
              className="event-link"
              key={id}
              onClick={() => actions.onEvent(id)}
            >
              {events.find((e) => e.id === id)?.name}
              <Icon name="arrow" size={15} />
            </button>
          ))}
        </section>
      )}
    </article>
  );
}

export function Reader({
  state,
  actions,
}: {
  state: AtlasState;
  actions: ReaderActions;
}) {
  const period = periods.find((p) => p.id === state.period)!;
  const periodChapters = chaptersForPeriod(period.id);
  const periodPeople = peopleForPeriod(period.id);
  const periodEvents = eventsForPeriod(period.id);
  const chapter =
    periodChapters.find((c) => c.id === state.chapter) ?? periodChapters[0];
  const person = periodPeople.find((p) => p.id === state.person);
  const event = periodEvents.find((e) => e.id === state.event);
  const place = places.find((p) => p.id === state.place);
  if (state.view === "people" && person)
    return <PersonReader person={person} actions={actions} />;
  if (
    (state.view === "people" && !periodPeople.length) ||
    (state.view === "events" && !periodEvents.length)
  ) {
    return (
      <>
        <div className="eyebrow">
          {period.name} · {period.date.label}
        </div>
        <h2>{state.view === "people" ? "Nhân vật" : "Sự kiện"}</h2>
        <p>
          Chưa biên soạn danh mục{" "}
          {state.view === "people" ? "nhân vật" : "sự kiện"} cho thời kỳ này.
        </p>
        <button
          className="primary-action"
          onClick={() => actions.onView("overview")}
        >
          Tổng quan thời kỳ <Icon name="arrow" size={15} />
        </button>
      </>
    );
  }
  if (state.view === "people")
    return (
      <>
        <div className="eyebrow">Hoàng tộc & những người đương thời</div>
        <h2>Nhân vật</h2>
        <div className="people-directory">
          <PersonLinks
            ids={periodPeople.map((p) => p.id)}
            onPerson={actions.onPerson}
            showPortraits
          />
        </div>
        <RulerList periodId={period.id} actions={actions} />
      </>
    );
  if (state.view === "events" && event)
    return (
      <>
        <button className="back-link" onClick={() => actions.onView("events")}>
          <Icon
            name="arrow"
            size={13}
            style={{ transform: "rotate(180deg)" }}
          />{" "}
          Tất cả sự kiện
        </button>
        <div className="eyebrow">{event.date.label}</div>
        <h2>{event.name}</h2>
        {event.precisionNote && (
          <p className="location-precision">{event.precisionNote}</p>
        )}
        <div className="section-label">Bối cảnh & diễn biến</div>
        {[...event.contextClaimIds, ...event.developmentClaimIds].map((id) => (
          <ClaimText key={id} id={id} onClaim={actions.onClaim} />
        ))}
        {!!event.resultClaimIds.length && (
          <>
            <div className="section-label">Kết quả trực tiếp</div>
            {event.resultClaimIds.map((id) => (
              <ClaimText key={id} id={id} onClaim={actions.onClaim} />
            ))}
          </>
        )}
        <div className="reading-prompt">
          <span>Câu hỏi mở</span>
          <p>{event.consequence}</p>
        </div>
        <div className="section-label">Người liên quan</div>
        <PersonLinks ids={event.personIds} onPerson={actions.onPerson} />
        <div className="section-label">Địa điểm</div>
        {event.placeIds.length ? (
          event.placeIds.map((id) => (
            <button
              className="place-link"
              key={id}
              onClick={() => actions.onPlace(id)}
            >
              <Icon name="pin" size={15} />
              {places.find((p) => p.id === id)?.name}
              <Icon name="arrow" size={15} />
            </button>
          ))
        ) : (
          <p className="fine-print">Chưa có vị trí đủ căn cứ để đặt điểm.</p>
        )}
        <button
          className="primary-action"
          onClick={() => actions.onMap(event.placeIds[0])}
        >
          <Icon name="map" size={16} />
          Xem trên bản đồ
        </button>
        <p className="fine-print">
          Ngày nguyên gốc: {event.date.original}. Hệ lịch:{" "}
          {event.date.calendar === "lunisolar"
            ? "âm dương lịch theo nguồn"
            : "quy ước trong nguồn"}
          .
        </p>
        {event.additionalClaimIds?.map((id) => (
          <ClaimText key={id} id={id} onClaim={actions.onClaim} />
        ))}
      </>
    );
  if (state.view === "events")
    return (
      <>
        <div className="eyebrow">Những mốc để đọc sâu</div>
        <h2>Sự kiện</h2>
        <div className="event-index">
          {periodEvents
            .slice()
            .sort((a, b) => a.date.start - b.date.start)
            .map((e) => (
              <button key={e.id} onClick={() => actions.onEvent(e.id)}>
                <time>{e.date.label}</time>
                <strong>{e.name}</strong>
                <Icon name="arrow" size={16} />
              </button>
            ))}
        </div>
      </>
    );
  if (state.view === "place" && place)
    return (
      <>
        <div className="eyebrow">Hồ sơ địa điểm</div>
        <h2>{place.name}</h2>
        <p className="chapter-question">{place.names[0]?.label}</p>
        <aside className="editorial-note">
          <strong>
            {place.coordinates
              ? "Điểm tham chiếu di sản hiện nay"
              : "Vị trí chưa xác định chắc chắn"}
          </strong>
          <p>{place.precision}</p>
        </aside>
        {place.claimIds.map((id) => (
          <ClaimText key={id} id={id} onClaim={actions.onClaim} />
        ))}
        {place.coordinateSourceId && (
          <p className="fine-print">
            Nguồn tọa độ:{" "}
            <a
              href={sources.find((s) => s.id === place.coordinateSourceId)?.url}
              target="_blank"
              rel="noreferrer"
            >
              {sources.find((s) => s.id === place.coordinateSourceId)?.title}
            </a>
          </p>
        )}
        <button
          className="primary-action"
          onClick={() => actions.onMap(place.id)}
        >
          <Icon name="map" size={16} />
          Xem trên bản đồ
        </button>
      </>
    );
  if (state.view === "overview" || !chapter)
    return (
      <>
        <div className="eyebrow">Thời kỳ · {period.date.label}</div>
        <h2>{period.name}</h2>
        <p className="status-line">
          <i /> {statusLabels[period.status]}
        </p>
        <p className="claim-text lead-paragraph">{period.summary}</p>
        {!!period.overviewFacts?.length && (
          <dl className="period-facts">
            {period.overviewFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  {fact.value}
                  {fact.claimIds.map((id) => (
                    <button
                      key={id}
                      className="citation"
                      aria-label={`Xem nguồn: ${fact.label}`}
                      onClick={() => actions.onClaim(id)}
                    >
                      <Icon name="external" size={12} />
                    </button>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {!!periodChapters.length && (
          <>
            <div className="section-label">
              {periodChapters.length} chương để khám phá
            </div>
            <div className="chapter-index">
              {periodChapters.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => actions.onChapter(entry.id)}
                >
                  <span>{entry.number}</span>
                  {entry.title}
                  <Icon name="chevron" size={14} />
                </button>
              ))}
            </div>
          </>
        )}
        {!!period.lanes?.length && (
          <div
            className="parallel-lanes"
            aria-label="Các chính quyền đồng thời"
          >
            {period.lanes.map((lane) => (
              <div key={lane.name}>
                <strong>{lane.name}</strong>
                <span>{lane.date}</span>
                <i />
              </div>
            ))}
            {period.lanesSource && (
              <a href={period.lanesSource.url} target="_blank" rel="noreferrer">
                {period.lanesSource.label} ↗
              </a>
            )}
          </div>
        )}
        {!!period.claimIds.length && (
          <>
            <div className="section-label">Những nét chính</div>
            {period.claimIds.map((id) => (
              <ClaimText key={id} id={id} onClaim={actions.onClaim} />
            ))}
          </>
        )}
        {!periodChapters.length && !period.claimIds.length && (
          <p>Chưa có bài đọc chi tiết cho thời kỳ này.</p>
        )}
        <div className="period-pagination">
          {periods.findIndex((p) => p.id === period.id) > 0 && (
            <button
              onClick={() =>
                actions.onPeriod(
                  periods[periods.findIndex((p) => p.id === period.id) - 1].id,
                )
              }
            >
              ← Thời kỳ trước
            </button>
          )}
          {periods.findIndex((p) => p.id === period.id) <
            periods.length - 1 && (
            <button
              onClick={() =>
                actions.onPeriod(
                  periods[periods.findIndex((p) => p.id === period.id) + 1].id,
                )
              }
            >
              Thời kỳ sau →
            </button>
          )}
        </div>
      </>
    );
  return <ChapterReader chapter={chapter} actions={actions} />;
}

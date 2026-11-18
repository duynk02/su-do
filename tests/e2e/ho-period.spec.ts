import { expect, test } from "@playwright/test";
import { chapters, events, people, tenures } from "../../src/data/history";

test("Ho has its own chapters, two emperors and a separate retired role", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile")
    await page.locator(".mobile-period-select select").selectOption("ho");
  else
    await page.locator(".period-button").filter({ hasText: "Nhà Hồ" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Từ cuối Trần đến quốc hiệu Đại Ngu",
      exact: true,
    }),
  ).toBeVisible();
  const select = page.getByRole("combobox", { name: "Chọn chương nhà Hồ" });
  const ownChapters = chapters.filter((chapter) => chapter.periodId === "ho");
  await expect(select.locator("option")).toHaveCount(ownChapters.length);
  await select.selectOption(ownChapters.at(-1)!.id);
  await expect(
    page.getByRole("button", { name: "Tiếp theo", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".chapter-pagination")).toContainText(
    `${ownChapters.length}`,
  );
  await page
    .locator(".reader-tabs")
    .getByRole("button", { name: "Nhân vật", exact: true })
    .click();
  await expect(page.locator(".ruler-list > button")).toHaveCount(2);
  await expect(page.locator(".ruler-list")).toContainText("Hồ Hán Thương");
  await expect(page.locator(".retired-list")).toContainText("Hồ Quý Ly");
  await expect(page.locator(".ruler-list")).not.toContainText("Trần Thừa");
  await expect(
    page.locator('.people-directory [data-person="ho-nguyen-trung"]'),
  ).toBeVisible();
  await expect(
    page.locator('.people-directory [data-person="ly-thai-to"]'),
  ).toHaveCount(0);
  await page
    .locator(".reader-tabs")
    .getByRole("button", { name: "Sự kiện", exact: true })
    .click();
  await expect(page.locator(".event-index")).toContainText("1407");
  await expect(page.locator(".event-index")).not.toContainText("Bạch Đằng");
  await page
    .locator(".reader-footer")
    .getByRole("button", { name: "Tổng quan thời kỳ" })
    .click();
  await expect(page.locator(".period-facts")).toContainText("Đại Ngu");
  await expect(page.locator(".chapter-index > button")).toHaveCount(
    ownChapters.length,
  );
  await page.screenshot({
    path: `docs/screenshots/ho-overview-${testInfo.project.name}.png`,
    fullPage: testInfo.project.name === "desktop",
    scale: "css",
  });
});

test("every Ho chapter, event and profile opens with valid images and no runtime errors", async ({
  page,
}, testInfo) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const chapter of chapters.filter((entry) => entry.periodId === "ho")) {
    await page.goto(`/?period=ho&chapter=${chapter.id}&view=story&mode=story`);
    await expect(
      page.getByRole("heading", { name: chapter.title, exact: true }),
    ).toBeVisible();
    const image = page.locator(".artifact img");
    if (await image.count())
      await expect
        .poll(() =>
          image.evaluate((entry) => (entry as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
  }
  for (const event of events.filter((entry) =>
    entry.periodIds.includes("ho"),
  )) {
    await page.goto(`/?period=ho&event=${event.id}&view=events&mode=story`);
    await expect(
      page.getByRole("heading", { name: event.name, exact: true }),
    ).toBeVisible();
  }
  for (const person of people.filter((entry) =>
    entry.periodIds.includes("ho"),
  )) {
    await page.goto(`/?period=ho&person=${person.id}&view=people&mode=story`);
    await expect(page.locator(".person-profile h2")).toHaveText(person.name);
    if (person.mediaAssetId)
      await expect
        .poll(() =>
          page
            .locator(".person-image img")
            .evaluate((entry) => (entry as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  expect(
    tenures.filter(
      (tenure) => tenure.periodId === "ho" && tenure.role === "reigning",
    ),
  ).toHaveLength(2);
  await page.goto("/?period=ho&person=ho-han-thuong&view=people&mode=story");
  await expect(page.locator(".person-introduction")).toContainText("Huy Ninh");
  await page.screenshot({
    path: `docs/screenshots/ho-han-thuong-${testInfo.project.name}.png`,
    fullPage: testInfo.project.name === "desktop",
    scale: "css",
  });
  expect(errors).toEqual([]);
});

test("Ho genealogy preserves the shared Tran branch and source links", async ({
  page,
}, testInfo) => {
  await page.goto("/?period=ho&person=ho-han-thuong&view=people&mode=story");
  await expect(page.locator(".relationship-list")).toContainText("Hồ Quý Ly");
  await expect(page.locator(".relationship-list")).toContainText("Huy Ninh");
  const expand = page.getByRole("button", {
    name: "Mở thêm một bậc quan hệ",
    exact: true,
  });
  if (await expand.count()) await expand.click();
  await page.evaluate(() => document.fonts.ready);
  const collisions = await page.locator(".relations-graph").evaluate((svg) => {
    const nodes = [
      ...svg.querySelectorAll<SVGRectElement>(".relationship-node rect"),
    ].map((entry) => entry.getBBox());
    const labels = [
      ...svg.querySelectorAll<SVGTextElement>(".relationship-label"),
    ].map((entry) => ({ text: entry.textContent, box: entry.getBBox() }));
    return labels.flatMap((label, index) =>
      [...nodes, ...labels.slice(index + 1).map((entry) => entry.box)]
        .filter(
          (box) =>
            label.box.x < box.x + box.width &&
            label.box.x + label.box.width > box.x &&
            label.box.y < box.y + box.height &&
            label.box.y + label.box.height > box.y,
        )
        .map(() => label.text),
    );
  });
  expect(collisions).toEqual([]);
  await page.locator(".relations-viewport").screenshot({
    path: `docs/screenshots/ho-family-${testInfo.project.name}.png`,
    scale: "css",
  });
  await page.locator(".person-introduction .citation").first().click();
  await expect(page.getByRole("dialog")).toContainText("Vị trí tra cứu");
  await page.keyboard.press("Escape");
  await page.goto("/?period=tran&person=ho-quy-ly&view=people");
  await expect(page.locator(".person-profile h2")).toHaveText("Hồ Quý Ly");
  await expect(page).toHaveURL(/period=tran/);
});

test("Ho map retains the capital icon and the sourced Nam Giao reference", async ({
  page,
}, testInfo) => {
  await page.goto("/?period=ho&year=1403&view=overview");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bản đồ", exact: true }).click();
  await expect(
    page.locator('.geography [data-place="tay-do"] .capital-marker'),
  ).toBeVisible();
  const marker = page.locator('.geography [data-place="nam-giao-nha-ho"]');
  await expect(marker).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const covered = await page.locator(".geography").evaluate((svg) => {
    const stage = svg.closest(".map-stage")!;
    const controls = [
      ".map-heading",
      ".map-layer-button",
      ".map-controls",
      ".capital-marker",
    ]
      .flatMap((selector) => [...stage.querySelectorAll(selector)])
      .map((entry) => entry.getBoundingClientRect());
    return [...svg.querySelectorAll(".place-label, .place-sublabel")]
      .filter((label) => {
        const box = label.getBoundingClientRect();
        return controls.some(
          (control) =>
            box.left < control.right &&
            box.right > control.left &&
            box.top < control.bottom &&
            box.bottom > control.top,
        );
      })
      .map((entry) => entry.textContent);
  });
  expect(covered).toEqual([]);
  await page.locator(".geography").screenshot({
    path: `docs/screenshots/ho-map-${testInfo.project.name}.png`,
    scale: "css",
  });
  await marker.focus();
  await page.keyboard.press("Enter");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bài đọc", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Đàn Nam Giao · Tây Đô", exact: true }),
  ).toBeVisible();
});

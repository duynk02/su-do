import { expect, test } from "@playwright/test";
import { chapters, events, people } from "../../src/data/history";

const period = "the-ky-x";
const ownChapters = chapters.filter((entry) => entry.periodId === period);

test("early period selection has its own chapters and three dynasty groups", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile")
    await page.locator(".mobile-period-select select").selectOption(period);
  else
    await page.locator(".period-button").filter({ hasText: "Ngô · Đinh · Tiền Lê" }).click();
  await expect(page.getByRole("heading", { name: ownChapters[0].title, exact: true })).toBeVisible();
  const select = page.locator(".chapter-select select");
  await expect(select.locator("option")).toHaveCount(ownChapters.length);
  await select.selectOption(ownChapters.at(-1)!.id);
  await expect(page.getByRole("button", { name: "Tiếp theo", exact: true })).toBeDisabled();
  await page.locator(".reader-tabs").getByRole("button", { name: "Nhân vật", exact: true }).click();
  await expect(page.locator(".ruler-list > button")).toHaveCount(9);
  await expect(page.locator(".ruler-dynasty-heading")).toHaveText(["Triều Ngô", "Triều Đinh", "Triều Tiền Lê"]);
  await expect(page.locator(".ruler-list")).toContainText("951–954 · đồng trị");
  await expect(page.locator(".ruler-list")).not.toContainText("Ngô Xương Xí");
  await expect(page.locator('.people-directory [data-person="ngo-xuong-xi"]')).toBeVisible();
  await expect(page.locator('.people-directory [data-person="tran-canh"]')).toHaveCount(0);
  await page.locator(".reader-footer").getByRole("button", { name: "Tổng quan thời kỳ" }).click();
  await expect(page.locator(".period-facts")).toContainText("Đại Cồ Việt");
  await expect(page.locator(".chapter-index > button")).toHaveCount(ownChapters.length);
  await page.screenshot({ path: `docs/screenshots/early-overview-${testInfo.project.name}.png`, fullPage: testInfo.project.name === "desktop", scale: "css" });
});

test("every early chapter and event opens with scoped evidence and valid illustrations", async ({ page }) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const chapter of ownChapters) {
    await page.goto(`/?period=${period}&chapter=${chapter.id}&view=story&mode=story`);
    await expect(page.getByRole("heading", { name: chapter.title, exact: true })).toBeVisible();
    const image = page.locator(".artifact img");
    if (await image.count())
      await expect.poll(() => image.evaluate((entry: HTMLImageElement) => entry.naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  for (const event of events.filter((entry) => entry.periodIds.includes(period))) {
    await page.goto(`/?period=${period}&event=${event.id}&view=events&mode=story`);
    await expect(page.getByRole("heading", { name: event.name, exact: true })).toBeVisible();
    await expect(page.locator(".reader-body .citation").first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("every early profile opens and the transition of 1009 retains the selected period", async ({ page }, testInfo) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const person of people.filter((entry) => entry.periodIds.includes(period))) {
    await page.goto(`/?period=${period}&view=people&person=${person.id}&mode=story`);
    await expect(page.locator(".person-profile h2")).toHaveText(person.name);
    await expect(page.locator(".person-introduction")).not.toBeEmpty();
    if (person.mediaAssetId)
      await expect.poll(() => page.locator(".person-image img").evaluate((entry: HTMLImageElement) => entry.naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto(`/?period=${period}&chapter=tien-le-sang-ly&view=story&mode=story`);
  await page.locator(".transition-visual").getByRole("button", { name: /Lý Thái Tổ/ }).click();
  await expect(page).toHaveURL(/period=the-ky-x/);
  await expect(page.locator(".person-profile h2")).toHaveText("Lý Thái Tổ");
  await expect(page.locator(".map-date")).toContainText("1009");
  await page.reload();
  await expect(page.locator(".person-profile h2")).toHaveText("Lý Thái Tổ");
  await page.goto("/?period=ly&person=van-hanh&view=people&mode=story");
  await expect(page.locator(".person-profile h2")).toHaveText("Vạn Hạnh");
  await expect(page).toHaveURL(/period=ly/);
  await page.goto(`/?period=${period}&person=le-dai-hanh&view=people&mode=story`);
  await page.screenshot({ path: `docs/screenshots/early-le-dai-hanh-${testInfo.project.name}.png`, fullPage: testInfo.project.name === "desktop", scale: "css" });
  expect(errors).toEqual([]);
});

test("Duong queen genealogy separates families and keeps evidence accessible", async ({ page }, testInfo) => {
  await page.goto(`/?period=${period}&person=duong-van-nga&view=people&mode=story`);
  await expect(page.locator(".relationship-list")).toContainText("Đinh Tiên Hoàng");
  await expect(page.locator(".relationship-list")).toContainText("Đinh Phế Đế");
  await expect(page.locator(".relationship-list")).toContainText("Lê Đại Hành");
  await page.getByRole("button", { name: "Mở thêm một bậc quan hệ", exact: true }).click();
  await page.evaluate(() => document.fonts.ready);
  const collisions = await page.locator(".relations-graph").evaluate((svg) => {
    const nodes = [...svg.querySelectorAll<SVGRectElement>(".relationship-node rect")].map((entry) => entry.getBBox());
    const labels = [...svg.querySelectorAll<SVGTextElement>(".relationship-label")].map((entry) => ({ text: entry.textContent, box: entry.getBBox() }));
    return labels.flatMap((label, index) => [...nodes, ...labels.slice(index + 1).map((entry) => entry.box)]
      .filter((box) => label.box.x < box.x + box.width && label.box.x + label.box.width > box.x && label.box.y < box.y + box.height && label.box.y + label.box.height > box.y)
      .map(() => label.text));
  });
  expect(collisions).toEqual([]);
  await expect.poll(() => page.locator(".relationship-node").evaluateAll((nodes) => nodes.flatMap((node) => {
    const box = node.querySelector<SVGRectElement>("rect")!.getBBox();
    return [...node.querySelectorAll<SVGTextElement>("text")].filter((text) => {
      const bounds = text.getBBox();
      return bounds.x < box.x || bounds.x + bounds.width > box.x + box.width;
    }).map((text) => text.textContent);
  }))).toEqual([]);
  await page.locator(".relations-viewport").screenshot({ path: `docs/screenshots/early-family-${testInfo.project.name}.png`, scale: "css" });
  await page.locator(".person-introduction .citation").first().click();
  await expect(page.getByRole("dialog")).toContainText("Vị trí tra cứu");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("early capitals display their own markers without mapping uncertain battle sites", async ({ page }, testInfo) => {
  for (const [year, place] of [[939, "co-loa"], [968, "hoa-lu"]] as const) {
    await page.goto(`/?period=${period}&year=${year}&view=overview`);
    if (testInfo.project.name === "mobile")
      await page.getByRole("button", { name: "Bản đồ", exact: true }).click();
    await expect(page.locator(`.geography [data-place="${place}"] .capital-marker`)).toBeVisible();
    await expect(page.locator('.geography [data-place="bach-dang-938"]')).toHaveCount(0);
    await expect(page.locator('.geography [data-place="le-bach-dang-981"]')).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    const covered = await page.locator(".geography").evaluate((svg) => {
      const stage = svg.closest(".map-stage")!;
      const controls = [".map-heading", ".map-layer-button", ".map-controls", ".capital-marker"]
        .flatMap((selector) => [...stage.querySelectorAll(selector)]).map((entry) => entry.getBoundingClientRect());
      return [...svg.querySelectorAll(".place-label, .place-sublabel")].filter((entry) => {
        const box = entry.getBoundingClientRect();
        return controls.some((control) => box.left < control.right && box.right > control.left && box.top < control.bottom && box.bottom > control.top);
      }).map((entry) => entry.textContent);
    });
    expect(covered).toEqual([]);
    await page.locator(".geography").screenshot({ path: `docs/screenshots/early-${place}-${testInfo.project.name}.png`, scale: "css" });
  }
});

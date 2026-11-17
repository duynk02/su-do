import { expect, test } from "@playwright/test";
import { chapters, people, tenures } from "../../src/data/history";

test("Ly selection has its own chapters, milestones, pagination and ruler directory", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  if (testInfo.project.name === "mobile")
    await page.locator(".mobile-period-select select").selectOption("ly");
  else
    await page.locator(".period-button").filter({ hasText: "Nhà Lý" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Một triều đại bắt đầu từ Hoa Lư",
      exact: true,
    }),
  ).toBeVisible();
  const select = page.getByRole("combobox", { name: "Chọn chương nhà Lý" });
  await expect(select.locator("option")).toHaveCount(10);
  await expect(page.locator(".chapter-kicker")).toContainText("01 / 10");
  await select.selectOption("ly-chuyen-trieu");
  await expect(page.locator(".chapter-pagination")).toContainText("10 / 10");
  await expect(
    page.getByRole("button", { name: "Tiếp theo", exact: true }),
  ).toBeDisabled();
  await page
    .locator(".reader-tabs")
    .getByRole("button", { name: "Nhân vật", exact: true })
    .click();
  await expect(page.locator(".ruler-list > button")).toHaveCount(9);
  await expect(page.locator(".ruler-list")).toContainText("Lý Thần Tông");
  await expect(page.locator(".ruler-list")).not.toContainText("Trần Nhân Tông");
  await expect(
    page.locator('.people-directory [data-person="ly-thuong-kiet"]'),
  ).toBeVisible();
  await expect(
    page.locator('.people-directory [data-person="ho-quy-ly"]'),
  ).toHaveCount(0);
  await page
    .locator(".reader-tabs")
    .getByRole("button", { name: "Sự kiện", exact: true })
    .click();
  await expect(page.locator(".event-index")).toContainText("1075–1077");
  await expect(page.locator(".event-index")).not.toContainText("Bạch Đằng");
  await page
    .locator(".reader-footer")
    .getByRole("button", { name: "Tổng quan thời kỳ" })
    .click();
  await expect(page.locator(".period-facts")).toContainText("Đại Cồ Việt");
  await expect(page.locator(".chapter-index > button")).toHaveCount(10);
  await page.screenshot({
    path: `docs/screenshots/ly-overview-${testInfo.project.name}.png`,
    fullPage: testInfo.project.name === "desktop",
    scale: "css",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("every Ly chapter, profile and ruler image opens with scoped links", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const chapter of chapters.filter((entry) => entry.periodId === "ly")) {
    await page.goto(`/?period=ly&chapter=${chapter.id}&view=story&mode=story`);
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
  for (const person of people.filter((entry) =>
    entry.periodIds.includes("ly"),
  )) {
    await page.goto(`/?period=ly&view=people&person=${person.id}&mode=story`);
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
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  expect(
    tenures.filter(
      (tenure) => tenure.periodId === "ly" && tenure.role === "reigning",
    ),
  ).toHaveLength(9);
  await page.goto("/?period=ly&view=people&person=ly-than-tong&mode=story");
  await expect(page.locator(".map-date")).toContainText("1127");
  await expect(page.locator(".person-introduction")).toContainText(
    "Sùng Hiền hầu",
  );
  await expect(page.locator(".person-introduction")).toContainText("con nuôi");
  await page.screenshot({
    path: `docs/screenshots/ly-than-tong-${testInfo.project.name}.png`,
    fullPage: testInfo.project.name === "desktop",
    scale: "css",
  });
  expect(errors).toEqual([]);
});

test("shared Chiêu Hoàng profile retains period context and resolves its sources", async ({
  page,
}) => {
  await page.goto("/?period=ly&chapter=ly-chuyen-trieu&view=story&mode=story");
  await page
    .locator(".transition-visual")
    .getByRole("button", { name: "Lý Chiêu Hoàng" })
    .click();
  await expect(page).toHaveURL(/period=ly/);
  await expect(page.locator(".person-profile h2")).toHaveText("Lý Chiêu Hoàng");
  await expect(page.locator(".reader-body")).toContainText(
    "Lên ngôi giữa quyền lực chuyển dịch",
  );
  await page.locator(".person-introduction .citation").first().click();
  await expect(page.getByRole("dialog")).toContainText("Vị trí tra cứu");
  await page.keyboard.press("Escape");
  await page.goto("/?period=tran&chapter=nhuong-ngoi&view=story&mode=story");
  await page
    .locator(".transition-visual")
    .getByRole("button", { name: "Lý Chiêu Hoàng" })
    .click();
  await expect(page).toHaveURL(/period=tran/);
  await expect(page.locator(".person-profile h2")).toHaveText("Lý Chiêu Hoàng");
});

test("Ly map shows sourced reference points and can open the education site", async ({
  page,
}, testInfo) => {
  await page.goto("/?period=ly&chapter=ly-hoc-van&year=1076&view=story");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bản đồ", exact: true }).click();
  const marker = page.locator('.geography [data-place="van-mieu"]');
  await expect(marker).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const coveredLabels = await page.locator(".geography").evaluate((svg) => {
    const stage = svg.closest(".map-stage")!;
    const controls = [".map-heading", ".map-layer-button", ".map-controls"]
      .flatMap((selector) => [...stage.querySelectorAll(selector)])
      .map((element) => element.getBoundingClientRect());
    return [...svg.querySelectorAll(".place-label")]
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
      .map((label) => label.textContent);
  });
  expect(coveredLabels).toEqual([]);
  await page.locator(".geography").screenshot({
    path: `docs/screenshots/ly-map-${testInfo.project.name}.png`,
    scale: "css",
  });
  await expect(
    page.locator('.geography [data-place="thang-long"] .capital-marker'),
  ).toBeVisible();
  await marker.focus();
  await page.keyboard.press("Enter");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bài đọc", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Văn Miếu – Quốc Tử Giám", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".reader-body")).toContainText("1070");
});

test("Ly family and political views retain clear labels with the extra relationship level", async ({
  page,
}, testInfo) => {
  for (const person of ["ly-nhan-tong", "ly-than-tong", "ly-hue-tong"]) {
    await page.goto(`/?period=ly&view=people&person=${person}&mode=story`);
    await page.evaluate(() => document.fonts.ready);
    const filters = page.getByRole("group", { name: "Loại quan hệ" });
    for (const label of ["Gia đình", "Chính trị"]) {
      const filter = filters.getByRole("button", {
        name: new RegExp(`^${label}`),
      });
      if (await filter.isDisabled()) continue;
      await filter.click();
      const expand = page.getByRole("button", {
        name: "Mở thêm một bậc quan hệ",
        exact: true,
      });
      if (await expand.count()) await expand.click();
      const collisions = await page
        .locator(".relations-graph")
        .evaluate((svg) => {
          const nodes = [
            ...svg.querySelectorAll<SVGRectElement>(".relationship-node rect"),
          ].map((element) => element.getBBox());
          const labels = [
            ...svg.querySelectorAll<SVGTextElement>(".relationship-label"),
          ].map((element) => ({
            text: element.textContent,
            box: element.getBBox(),
          }));
          return labels.flatMap((label, index) =>
            [...nodes, ...labels.slice(index + 1).map((entry) => entry.box)]
              .filter(
                (other) =>
                  label.box.x < other.x + other.width &&
                  label.box.x + label.box.width > other.x &&
                  label.box.y < other.y + other.height &&
                  label.box.y + label.box.height > other.y,
              )
              .map(() => label.text),
          );
        });
      expect(collisions).toEqual([]);
      const overflowingNodeText = await page
        .locator(".relations-graph")
        .evaluate((svg) =>
          [...svg.querySelectorAll(".relationship-node")].flatMap((node) => {
            const box = node.querySelector<SVGRectElement>("rect")!.getBBox();
            return [...node.querySelectorAll<SVGTextElement>("text")]
              .filter((text) => {
                const label = text.getBBox();
                return (
                  label.x < box.x || label.x + label.width > box.x + box.width
                );
              })
              .map((text) => text.textContent);
          }),
        );
      expect(overflowingNodeText).toEqual([]);
      if (person === "ly-nhan-tong" && label === "Chính trị")
        await page.locator(".relations-viewport").screenshot({
          path: `docs/screenshots/ly-politics-${testInfo.project.name}.png`,
          scale: "css",
        });
    }
  }
});

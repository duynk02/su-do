import { expect, test } from "@playwright/test";

for (const person of [
  "tran-nhan-tong",
  "tran-minh-tong",
  "tran-canh",
  "duong-nhat-le",
  "tran-thieu-de",
])
  test(`${person}: relationship views stay readable when expanded`, async ({
    page,
  }, testInfo) => {
    await page.goto(`/?period=tran&year=1278&view=people&person=${person}`);
    const frame = page.locator(".relations-viewport");
    await expect(frame).toBeAttached();
    await page.evaluate(() => document.fonts.ready);
    const filters = page.getByRole("group", { name: "Loại quan hệ" });
    for (const expanded of [false, true]) {
      await filters.locator("button:enabled").first().click();
      if (expanded)
        await page
          .getByRole("button", { name: "Mở thêm một bậc quan hệ", exact: true })
          .click();
      for (const [view, label] of [
        ["family", "Gia đình"],
        ["succession", "Kế vị"],
        ["political", "Chính trị"],
      ]) {
        const button = filters.getByRole("button", {
          name: new RegExp(`^${label}`),
        });
        if (await button.isDisabled()) continue;
        await button.click();
        await expect(frame).toHaveAttribute("data-view", view);
        await expect(
          page.getByRole("button", { name: "Khôi phục kích thước sơ đồ" }),
        ).toHaveText("100%");
        const graph = frame.locator("svg");
        const collisions = await graph.evaluate((svg) => {
          const labels = [
            ...svg.querySelectorAll<SVGTextElement>(".relationship-label"),
          ].map((el) => ({ name: el.textContent, box: el.getBBox() }));
          const nodes = [
            ...svg.querySelectorAll<SVGRectElement>(".relationship-node rect"),
          ].map((el) => ({
            name: el.parentElement?.getAttribute("data-person"),
            box: el.getBBox(),
          }));
          const overlaps = (a: DOMRect, b: DOMRect) =>
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
          return [
            ...labels.flatMap((label, index) =>
              [...labels.slice(index + 1), ...nodes]
                .filter((other) => overlaps(label.box, other.box))
                .map((other) => `${label.name} covers ${other.name}`),
            ),
            ...nodes.flatMap((node, index) =>
              nodes
                .slice(index + 1)
                .filter((other) => overlaps(node.box, other.box))
                .map((other) => `${node.name} covers ${other.name}`),
            ),
          ];
        });
        expect(collisions).toEqual([]);
        const font = await graph
          .locator(".relation-person-name")
          .first()
          .evaluate(
            (el: SVGTextElement) =>
              parseFloat(getComputedStyle(el).fontSize) *
              Math.hypot(el.getScreenCTM()!.a, el.getScreenCTM()!.b),
          );
        expect(font).toBeGreaterThanOrEqual(13.8);
        await expect(graph.locator(".relationship-paths path")).toHaveCount(
          await page.locator(".relationship-list > li").count(),
        );
        if (view === "family")
          await expect(
            graph.locator('[data-type="succession"], [data-type="political"]'),
          ).toHaveCount(0);
        if (
          (person === "tran-nhan-tong" && !expanded && view === "family") ||
          (person === "tran-minh-tong" && expanded && view === "family")
        ) {
          await page.getByRole("button", { name: "Vừa khung sơ đồ" }).click();
          await frame.screenshot({
            path: `docs/screenshots/relations-${person}-${expanded ? "expanded" : "direct"}-${testInfo.project.name}.png`,
            scale: "css",
          });
          await page
            .getByRole("button", { name: "Khôi phục kích thước sơ đồ" })
            .click();
        }
      }
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });

test("family parentage, succession and political influence can be inspected separately", async ({
  page,
}, testInfo) => {
  await page.goto("/?period=tran&year=1225&view=people&person=tran-canh");
  const frame = page.locator(".relations-viewport");
  await expect(frame).toHaveAttribute("data-view", "family");
  await page
    .getByRole("button", { name: "Mở thêm một bậc quan hệ", exact: true })
    .click();
  await expect(frame.locator('[data-person="tran-ly"]')).toBeAttached();
  await expect(
    frame.locator('[data-from="ly-chieu-hoang"][data-to="tran-thanh-tong"]'),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Vừa khung sơ đồ" }).click();
  await frame.screenshot({
    path: `docs/screenshots/family-tran-canh-expanded-${testInfo.project.name}.png`,
    scale: "css",
  });
  const filters = page.getByRole("group", { name: "Loại quan hệ" });
  await filters.getByRole("button", { name: /^Kế vị/ }).click();
  await expect(
    frame.locator('[data-type="parent"], [data-type="marriage"]'),
  ).toHaveCount(0);
  await expect(frame.locator('[data-type="succession"]')).not.toHaveCount(0);
  await filters.getByRole("button", { name: /^Chính trị/ }).click();
  await expect(frame.locator('[data-type="political"]')).toHaveCount(1);
  await frame
    .getByRole("button", { name: "Xem hồ sơ Trần Thủ Độ", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Trần Thủ Độ", exact: true }),
  ).toBeInViewport();
});

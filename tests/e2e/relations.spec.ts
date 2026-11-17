import { expect, test } from "@playwright/test";

for (const person of [
  "tran-nhan-tong",
  "tran-minh-tong",
  "tran-canh",
  "duong-nhat-le",
])
  test(`${person}: relationship captions stay clear in direct and expanded graphs`, async ({
    page,
  }, testInfo) => {
    await page.goto(`/?period=tran&year=1278&view=people&person=${person}`);
    const graph = page.locator(".relations-graph");
    await expect(graph).toBeAttached();
    await page.evaluate(() => document.fonts.ready);
    for (const expanded of [false, true]) {
      if (expanded)
        await page
          .getByRole("button", { name: "Mở thêm một bậc quan hệ", exact: true })
          .click();
      await graph.scrollIntoViewIfNeeded();
      const collisions = await graph.evaluate((svg) => {
        const labels = [
          ...svg.querySelectorAll<SVGTextElement>(".relationship-label"),
        ].map((element) => ({
          name: element.textContent,
          box: element.getBBox(),
        }));
        const nodes = [
          ...svg.querySelectorAll<SVGRectElement>(".relationship-node rect"),
        ].map((element) => ({
          name: element.parentElement?.getAttribute("data-person"),
          box: element.getBBox(),
        }));
        const overlaps = (a: DOMRect, b: DOMRect) =>
          a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y;
        return labels.flatMap((label, index) =>
          [...labels.slice(index + 1), ...nodes]
            .filter((other) => overlaps(label.box, other.box))
            .map((other) => `${label.name} overlaps ${other.name}`),
        );
      });
      expect(collisions).toEqual([]);
      await expect(graph.locator(".relationship-label")).toHaveCount(
        await graph.locator(".relationship-paths path").count(),
      );
      if (
        (person === "tran-nhan-tong" && !expanded) ||
        (person === "tran-minh-tong" && expanded)
      )
        await graph.screenshot({
          path: `docs/screenshots/relations-${person}-${expanded ? "expanded" : "direct"}-${testInfo.project.name}.png`,
          scale: "css",
        });
    }
  });

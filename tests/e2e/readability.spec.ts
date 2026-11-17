import { expect, test } from "@playwright/test";

test("secondary text and map labels remain legible across responsive widths", async ({
  page,
}, testInfo) => {
  const viewports =
    testInfo.project.name === "desktop"
      ? [
          { width: 1920, height: 1080 },
          { width: 1440, height: 960 },
          { width: 1024, height: 768 },
        ]
      : [
          { width: 390, height: 844 },
          { width: 360, height: 800 },
        ];
  for (const viewport of viewports)
    await test.step(`${viewport.width}px`, async () => {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await expect(page.locator(".screen-announcement")).toContainText(
        "Nhà Trần",
      );
      await page.evaluate(() => document.fonts.ready);
      const selectors = [
        ".brand-descriptor",
        ".intro-strip",
        ".chapter-select > span",
        ".reader-footer button",
        ".map-legend",
        ".boundary-notice",
        ".map-list-toggle",
        ".map-credit",
      ];
      const fonts = await page.evaluate(
        (selectors) =>
          selectors.flatMap((selector) =>
            [...document.querySelectorAll<HTMLElement>(selector)].map(
              (element) => ({
                selector,
                size: parseFloat(getComputedStyle(element).fontSize),
              }),
            ),
          ),
        selectors,
      );
      for (const font of fonts)
        expect(
          font.size,
          `${font.selector} at ${viewport.width}px`,
        ).toBeGreaterThanOrEqual(13);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      if (testInfo.project.name === "mobile")
        await page.getByRole("button", { name: "Bản đồ", exact: true }).click();
      await expect(page.locator(".geography")).toBeVisible();
      const effectiveLabelSize = () =>
        page
          .locator(".place-label")
          .first()
          .evaluate((element: SVGTextElement) => {
            const matrix = element.getScreenCTM()!;
            return (
              parseFloat(getComputedStyle(element).fontSize) *
              Math.hypot(matrix.a, matrix.b)
            );
          });
      await expect.poll(effectiveLabelSize).toBeGreaterThanOrEqual(13.8);
      const controls = await page.locator(".map-controls").boundingBox();
      const footer = await page.locator(".map-bottom").boundingBox();
      expect(controls!.y + controls!.height).toBeLessThanOrEqual(footer!.y);
      const labels = await page.locator(".place-label, .place-sublabel").all();
      const layerButton = (await page
        .locator(".map-layer-button")
        .boundingBox())!;
      for (const label of labels) {
        const box = (await label.boundingBox())!;
        expect(box.y + box.height).toBeLessThanOrEqual(footer!.y);
        for (const control of [controls!, layerButton]) {
          const overlaps =
            box.x < control.x + control.width &&
            box.x + box.width > control.x &&
            box.y < control.y + control.height &&
            box.y + box.height > control.y;
          expect(
            overlaps,
            `map label ${await label.textContent()} must clear controls at ${viewport.width}px`,
          ).toBe(false);
        }
      }
      await page
        .getByRole("button", { name: "Thu nhỏ bản đồ", exact: true })
        .click();
      await expect.poll(effectiveLabelSize).toBeGreaterThanOrEqual(13.8);
      await page
        .getByRole("button", { name: "Về góc nhìn ban đầu", exact: true })
        .click();
      await page.screenshot({
        path: `docs/screenshots/readability-${viewport.width}.png`,
        fullPage: testInfo.project.name === "mobile",
        scale: "css",
      });
    });
});

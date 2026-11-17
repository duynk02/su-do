import { expect, test } from "@playwright/test";

test("sourced profile images load, retain credits and adapt to the reader width", async ({
  page,
}, testInfo) => {
  for (const id of [
    "tran-thanh-tong",
    "tran-canh",
    "tran-nhan-tong",
    "tran-quoc-tuan",
    "huyen-tran",
    "ho-quy-ly",
  ]) {
    await page.goto(
      `/?period=tran&year=1278&view=people&person=${id}&mode=story`,
    );
    const figure = page.locator(".person-image");
    const image = figure.locator("img");
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth >= 400,
        ),
      )
      .toBe(true);
    await expect(image).toHaveAttribute("alt", /Tượng|Lăng|Di tích|Minh họa/);
    await expect(figure.locator(".person-image-credit")).toContainText(
      /CC BY|Public domain|Phật giáo Việt Nam|Hội Nhà văn Việt Nam|Hoàng Hoa Mai/,
    );
    await expect(figure.locator("a").first()).toHaveAttribute(
      "href",
      /^https:\//,
    );
    const heading = (await page.locator(".person-heading").boundingBox())!;
    const title = (await page.locator(".person-heading h2").boundingBox())!;
    const photo = (await image.boundingBox())!;
    if (heading.width > 440)
      expect(photo.x).toBeGreaterThan(title.x + title.width);
    else expect(photo.y).toBeGreaterThan(title.y + title.height);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (
      ["tran-canh", "tran-thanh-tong", "tran-nhan-tong", "ho-quy-ly"].includes(
        id,
      )
    ) {
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `docs/screenshots/profile-image-${id}-${testInfo.project.name}.png`,
        scale: "css",
      });
    }
  }
});

test("Thieu De explains his maternal family and separates regency from descent", async ({
  page,
}, testInfo) => {
  await page.goto(
    "/?period=tran&year=1398&chapter=cuoi-tran&view=people&person=tran-thieu-de",
  );
  await expect(
    page.getByRole("heading", { name: "Phả hệ nối hai họ Trần và Hồ" }),
  ).toBeAttached();
  await expect(page.locator(".reader-body")).toContainText("được tha chết");
  await page
    .getByRole("button", { name: "Mở thêm một bậc quan hệ", exact: true })
    .click();
  const graph = page.locator(".relations-viewport");
  for (const id of [
    "tran-thuan-tong",
    "kham-thanh",
    "ho-quy-ly",
    "huy-ninh",
    "tran-nghe-tong",
  ])
    await expect(graph.locator(`[data-person="${id}"]`)).toBeAttached();
  await expect(
    graph.locator(
      '[data-type="parent"][data-from="ho-quy-ly"][data-to="tran-thieu-de"]',
    ),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Vừa khung sơ đồ" }).click();
  await graph.screenshot({
    path: `docs/screenshots/family-thieu-de-${testInfo.project.name}.png`,
    scale: "css",
  });
  await page
    .getByRole("group", { name: "Loại quan hệ" })
    .getByRole("button", { name: /^Chính trị/ })
    .click();
  await expect(graph.locator('[data-type="parent"]')).toHaveCount(0);
  for (const label of ["Nhiếp chính", "Ép nhường ngôi", "Cất nhắc"])
    await expect(graph).toContainText(label);
  await graph
    .getByRole("button", { name: "Xem hồ sơ Hồ Quý Ly", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Hồ Quý Ly", exact: true }),
  ).toBeInViewport();
});

test("capital gate symbols remain legible through zoom and open the place", async ({
  page,
}, testInfo) => {
  await page.goto("/?period=tran&year=1278&view=story");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bản đồ", exact: true }).click();
  const marker = page.locator('[data-place="thang-long"]');
  const symbol = marker.locator(".capital-marker");
  await expect(symbol).toBeVisible();
  const before = (await symbol.boundingBox())!;
  await page
    .getByRole("button", { name: "Phóng to bản đồ", exact: true })
    .click();
  const after = (await symbol.boundingBox())!;
  expect(Math.abs(before.width - after.width)).toBeLessThan(1);
  expect(after.width).toBeGreaterThanOrEqual(32);
  const coveredLabels = await page.locator(".geography").evaluate((map) => {
    const badge = map.querySelector(".capital-marker")!.getBoundingClientRect();
    return [...map.querySelectorAll(".place-label")]
      .filter((label) => {
        const box = label.getBoundingClientRect();
        return (
          box.left < badge.right &&
          box.right > badge.left &&
          box.top < badge.bottom &&
          box.bottom > badge.top
        );
      })
      .map((label) => label.textContent);
  });
  expect(coveredLabels).toEqual([]);
  await page.locator(".geography").screenshot({
    path: `docs/screenshots/capital-marker-${testInfo.project.name}.png`,
    scale: "css",
  });
  await marker.focus();
  await page.keyboard.press("Enter");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bài đọc", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Thăng Long", exact: true }),
  ).toBeVisible();
});

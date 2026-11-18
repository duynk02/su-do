import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Cuối thời Lý, một trật tự đổi thay",
      exact: true,
    }),
  ).toBeVisible();
});

test("representative atlas renders without horizontal overflow or runtime errors", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("body")).not.toContainText("Chargement");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  if (testInfo.project.name === "desktop")
    await expect(page.locator(".geography")).toBeVisible();
  await page.screenshot({
    path: `docs/screenshots/atlas-${testInfo.project.name}.png`,
    fullPage: testInfo.project.name === "desktop",
    scale: "css",
  });
  expect(errors).toEqual([]);
});

test("Tran Canh connects father, spouse, transfer event and direct evidence", async ({
  page,
}, testInfo) => {
  await page
    .getByRole("combobox", { name: "Chọn chương nhà Trần" })
    .selectOption("dau-trieu");
  await page
    .locator(".role-comparison")
    .getByRole("button", { name: "Trần Cảnh" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Trần Cảnh", exact: true }),
  ).toBeInViewport();
  await expect(page.locator(".relationship-list")).toContainText("Trần Thừa");
  await expect(page.locator(".relationship-list")).toContainText(
    "Lý Chiêu Hoàng",
  );
  if (testInfo.project.name === "desktop")
    await page.locator(".relations-graph").screenshot({
      path: "docs/screenshots/genealogy-desktop.png",
      scale: "css",
    });
  await page
    .locator(".relationship-list")
    .getByRole("button", { name: "Nguồn quan hệ Trần Thừa và Trần Cảnh" })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Vị trí tra cứu");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Từ triều Lý sang triều Trần", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Từ triều Lý sang triều Trần",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".reader-body")).toContainText("Lý Chiêu Hoàng");
  await expect(page.locator(".reader-body")).toContainText("Trần Cảnh");
});

test("Tran Thua has a retired role and no reigning role", async ({ page }) => {
  await page
    .locator(".person-links")
    .getByRole("button", { name: "Trần Thừa", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Trần Thừa", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".role-tenures")).toContainText(
    "Thái thượng hoàng",
  );
  await expect(page.locator(".role-tenures .reigning")).toHaveCount(0);
  await expect(page.locator(".reader-body")).toContainText(
    "không trực tiếp ở ngôi hoàng đế",
  );
});

test("search supports an unaccented temple name and empty results", async ({
  page,
}, testInfo) => {
  await page
    .getByRole("button", {
      name:
        testInfo.project.name === "mobile"
          ? "Tìm kiếm"
          : "Tìm nhân vật, sự kiện, địa điểm… Tìm kiếm",
      exact: true,
    })
    .click();
  const search = page.getByRole("textbox", {
    name: "Tên nhân vật, địa điểm hoặc sự kiện",
  });
  await search.fill("abcxyzz");
  await expect(page.getByRole("dialog")).toContainText("Chưa có kết quả");
  await search.fill("thai tong");
  await page.locator(".search-results").getByRole("button").first().click();
  await expect(
    page.getByRole("heading", { name: "Trần Cảnh", exact: true }),
  ).toBeVisible();
});

test("browser history and reload restore the selected chapter", async ({
  page,
}) => {
  const select = page.getByRole("combobox", { name: "Chọn chương nhà Trần" });
  await select.selectOption("nhuong-ngoi");
  await expect(page).toHaveURL(/chapter=nhuong-ngoi/);
  await select.selectOption("dau-trieu");
  await expect(page).toHaveURL(/chapter=dau-trieu/);
  await page.goBack();
  await expect(select).toHaveValue("nhuong-ngoi");
  await page.goForward();
  await expect(select).toHaveValue("dau-trieu");
  await page.reload();
  await expect(
    page.getByRole("heading", {
      name: "Ngôi vua và người giữ quyền",
      exact: true,
    }),
  ).toBeVisible();
});

test("source dialog exposes dates, disagreements and real external links", async ({
  page,
}, testInfo) => {
  await page
    .getByRole("combobox", { name: "Chọn chương nhà Trần" })
    .selectOption("nhuong-ngoi");
  await page.locator(".chapter-body .citation").last().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("11 tháng Chạp");
  await expect(dialog).toContainText("21 tháng 10");
  await expect(dialog.locator(".evidence-list li")).toHaveCount(2);
  await expect(dialog.locator("a").first()).toHaveAttribute(
    "href",
    /^https:\/\/baotanglichsu.vn\//,
  );
  await dialog.screenshot({
    path: `docs/screenshots/evidence-${testInfo.project.name}.png`,
    scale: "css",
  });
  await page.keyboard.press("Escape");
  await expect(page.locator(".chapter-body .citation").last()).toBeFocused();
});

test("year without territory data stays useful, and modern boundaries are opt in", async ({
  page,
}, testInfo) => {
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bản đồ", exact: true }).click();
  if (testInfo.project.name === "mobile") {
    await expect(page.locator(".geography")).toBeVisible();
    await page.screenshot({
      path: "docs/screenshots/map-mobile.png",
      fullPage: true,
      scale: "css",
    });
  }
  await page
    .getByRole("textbox", { name: "Đến năm", exact: true })
    .fill("1270");
  await page.getByRole("button", { name: "Xem năm đã nhập" }).click();
  await expect(page.locator(".map-date")).toContainText("1270");
  await expect(page.locator(".boundary-notice")).toContainText(
    "Chưa có lớp ranh giới được đối chiếu cho mốc này.",
  );
  await page.getByRole("button", { name: "Lớp bản đồ" }).click();
  const modern = page.getByRole("checkbox", {
    name: "Tham chiếu hiện đại",
    exact: true,
  });
  await expect(modern).not.toBeChecked();
  await modern.check();
  await expect(page.locator(".modern-notice")).toContainText(
    "Tham chiếu địa lý hiện đại",
  );
  await modern.uncheck();
  await expect(page.locator(".modern-notice")).toHaveCount(0);
  await page.getByRole("textbox", { name: "Đến năm", exact: true }).fill("0");
  await page.getByRole("button", { name: "Xem năm đã nhập" }).click();
  await expect(page.locator("#year-error")).toContainText("không có năm 0");
});

test("parallel period has simultaneous lanes", async ({ page }, testInfo) => {
  if (testInfo.project.name === "mobile")
    await page.locator(".mobile-period-select select").selectOption("le-mac");
  else
    await page.locator(".period-button").filter({ hasText: "Lê–Mạc" }).click();
  await expect(page.locator(".parallel-lanes>div")).toHaveCount(4);
  await expect(page.locator(".parallel-lanes")).toContainText("Cùng thời");
});

test("map failure leaves readable content and a text alternative", async ({
  page,
}, testInfo) => {
  await page.route("**/maps/*.json", (route) => route.abort());
  await page.reload();
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bản đồ", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Chưa tải được bản đồ" }),
  ).toBeVisible();
  await expect(page.locator(".map-place-list")).toContainText("Thăng Long");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bài đọc", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Cuối thời Lý, một trật tự đổi thay",
      exact: true,
    }),
  ).toBeVisible();
});

test("reduced motion preserves chapter and keyboard dialog behavior", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .getByRole("combobox", { name: "Chọn chương nhà Trần" })
    .selectOption("ngoi-vua");
  await expect(page.locator(".ruler-list")).toContainText("Dương Nhật Lễ");
  await page
    .getByRole("combobox", { name: "Chọn chương nhà Trần" })
    .selectOption("doi-song");
  await expect(page.locator(".artifact-type")).toHaveText("Ảnh hiện vật");
  await expect(page.locator(".artifact img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".artifact img")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.locator(".artifact").scrollIntoViewIfNeeded();
  if (testInfo.project.name === "desktop")
    await page.screenshot({
      path: "docs/screenshots/artifact-desktop.png",
      fullPage: true,
      scale: "css",
    });
});

test("unwritten periods keep their own empty character and event catalogues", async ({
  page,
}, testInfo) => {
  if (testInfo.project.name === "mobile")
    await page.locator(".mobile-period-select select").selectOption("nguyen");
  else
    await page
      .locator(".period-button")
      .filter({ hasText: "Nhà Nguyễn" })
      .click();
  await page
    .locator(".reader-tabs")
    .getByRole("button", { name: "Nhân vật", exact: true })
    .click();
  await expect(page.locator(".reader-body")).toContainText(
    "Chưa biên soạn danh mục nhân vật",
  );
  await expect(page.locator(".ruler-list")).toHaveCount(0);
  await page
    .locator(".reader-tabs")
    .getByRole("button", { name: "Sự kiện", exact: true })
    .click();
  await expect(page.locator(".reader-body")).toContainText(
    "Chưa biên soạn danh mục sự kiện",
  );
});

test("dates outside the selected period disclose the contextual exception", async ({
  page,
}, testInfo) => {
  await page.goto("/?period=tran&chapter=cuoi-ly&year=1500&view=story");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Bản đồ", exact: true }).click();
  await expect(page.locator(".map-context-note")).toContainText(
    "Năm 1500 nằm ngoài khoảng",
  );
  await expect(page.locator(".map-context-note")).toContainText(
    "điểm tham chiếu theo chương",
  );
  await page.locator(".geography").focus();
  const original = await page
    .locator(".geography > g")
    .getAttribute("transform");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".geography > g")).not.toHaveAttribute(
    "transform",
    original!,
  );
  await page.keyboard.press("Home");
  await expect(page.locator(".geography > g")).toHaveAttribute(
    "transform",
    original!,
  );
});

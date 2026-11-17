import { expect, test } from "@playwright/test";

test("Nhan Tong biography links his reign, monastic life and evidence", async ({
  page,
}, testInfo) => {
  await page.goto("/?period=tran&year=1278&view=people&person=tran-nhan-tong");
  await expect(
    page.getByRole("heading", { name: "Trần Nhân Tông", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".person-introduction")).toContainText(
    "Phật hoàng",
  );
  await expect(page.locator(".person-introduction")).toContainText("1278–1293");
  await expect(page.locator(".person-names")).toContainText("1258–1308");
  await expect(page.locator(".role-tenures .retired")).toContainText(
    "1293–1308",
  );
  await expect(
    page.getByRole("heading", { name: "Nhường ngôi và tu hành ở Yên Tử" }),
  ).toBeAttached();
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 0);
  });
  await page.screenshot({
    path: `docs/screenshots/nhan-tong-${testInfo.project.name}.png`,
    fullPage: testInfo.project.name === "mobile",
    scale: "css",
  });

  const monasticSection = page
    .locator(".biography-section")
    .filter({ hasText: "Nhường ngôi và tu hành ở Yên Tử" });
  await monasticSection.locator(".citation").click();
  await expect(page.getByRole("dialog")).toContainText("am Ngọa Vân");
  await expect(
    page.getByRole("dialog").locator(".evidence-list a").first(),
  ).toHaveAttribute("href", /hoangthanhthanglong\.vn/);
  await page.keyboard.press("Escape");
  await expect(monasticSection.locator(".citation")).toBeFocused();
  await page
    .locator(".reader-body")
    .getByRole("button", {
      name: "Trần Nhân Tông xuất gia tại Yên Tử",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Trần Nhân Tông xuất gia tại Yên Tử",
      exact: true,
    }),
  ).toBeInViewport();
  await expect(page).toHaveURL(/year=1299/);
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Trần Nhân Tông", exact: true }),
  ).toBeInViewport();
});

test("Nhat Le biography explains accession and opens the 1370 deposition", async ({
  page,
}, testInfo) => {
  await page.goto("/?period=tran&year=1369&view=people&person=duong-nhat-le");
  await expect(
    page.getByRole("heading", { name: "Dương Nhật Lễ", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".person-introduction")).toContainText("Đại Định");
  await expect(page.locator(".person-names")).toContainText(
    "Chưa rõ năm sinh – 1370",
  );
  const accession = page
    .locator(".biography-section")
    .filter({ hasText: "Xuất thân và nguyên nhân lên ngôi" });
  await expect(accession).toContainText("Hiến Từ");
  await expect(accession).toContainText("Trần Nguyên Dục");
  await expect(
    page
      .locator(".biography-section")
      .filter({ hasText: "Vì sao có mặt trong chuỗi vua Trần?" }),
  ).toContainText("giữa Dụ Tông và Nghệ Tông");
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 0);
  });
  await page.screenshot({
    path: `docs/screenshots/nhat-le-${testInfo.project.name}.png`,
    fullPage: testInfo.project.name === "mobile",
    scale: "css",
  });

  await accession.locator(".citation").click();
  await expect(page.getByRole("dialog")).toContainText("Cương mục");
  await expect(
    page.getByRole("dialog").locator(".evidence-list a").first(),
  ).toHaveAttribute(
    "href",
    "https://www.diendan.org/phe-binh-nghien-cuu/duong-nhat-le",
  );
  await page.keyboard.press("Escape");
  await page
    .locator(".reader-body")
    .getByRole("button", {
      name: "Dương Nhật Lễ bị phế, Trần Nghệ Tông lên ngôi",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Dương Nhật Lễ bị phế, Trần Nghệ Tông lên ngôi",
      exact: true,
    }),
  ).toBeInViewport();
  await expect(page).toHaveURL(/year=1370/);
  await page
    .locator(".person-links")
    .getByRole("button", { name: "Trần Nghệ Tông", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Trần Nghệ Tông", exact: true }),
  ).toBeInViewport();
});

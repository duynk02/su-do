import { expect, test } from "@playwright/test";

test("external cursor attributes on document roots preserve hydration", async ({
  page,
}) => {
  const warnings: string[] = [];
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydrat|server rendered|didn.t match/i.test(message.text())
    )
      warnings.push(message.text());
  });
  page.on("pageerror", (error) => warnings.push(error.message));
  await page.addInitScript(() => {
    const inject = () => {
      for (const element of [document.documentElement, document.body]) {
        if (!element) continue;
        element.setAttribute(
          "data-cc-prev-cursor",
          JSON.stringify({ prev: ["", ""], ours: ["crosshair", ""] }),
        );
        element.style.cursor = "crosshair";
      }
      if (document.documentElement && document.body) observer.disconnect();
    };
    const observer = new MutationObserver(inject);
    observer.observe(document, { childList: true, subtree: true });
    inject();
  });
  await page.goto("/");
  await expect(page.locator(".screen-announcement")).toContainText("Nhà Trần");
  expect(warnings).toEqual([]);
  await page
    .locator(".reader-tabs")
    .getByRole("button", { name: "Nhân vật", exact: true })
    .click();
  await expect(page.locator(".reader-body h2").first()).toHaveText("Nhân vật");
  await expect(page.locator("html")).toHaveAttribute("data-cc-prev-cursor");
  await expect(page.locator("body")).toHaveAttribute("data-cc-prev-cursor");
  expect(warnings).toEqual([]);
});

test("nested application mismatches are still reported in development", async ({
  page,
}) => {
  test.skip(
    process.env.SU_DO_TEST_DEV !== "1",
    "React logs attribute mismatch warnings in development only.",
  );
  const warnings: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") warnings.push(message.text());
  });
  await page.addInitScript(() => {
    const inject = () => {
      const heading = document.querySelector(".reader-body h2");
      if (!heading) return;
      heading.setAttribute("data-hydration-probe", "injected");
      observer.disconnect();
    };
    const observer = new MutationObserver(inject);
    observer.observe(document, { childList: true, subtree: true });
    inject();
  });
  await page.goto("/");
  await expect(page.locator(".screen-announcement")).toContainText("Nhà Trần");
  expect(
    warnings.some((message) => message.includes("data-hydration-probe")),
  ).toBe(true);
});

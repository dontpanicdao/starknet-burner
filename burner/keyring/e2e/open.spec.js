import { test, expect } from "@playwright/test";

test("should open keyring and check the version", async ({ page }) => {
  // baseURL is set in the playwright.config.js
  await page.goto("/");
  // checks the pahe has a footer tag with the version keyword in it
  await expect(page.locator("footer")).toContainText(/version/);
});

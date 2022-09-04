import { test, expect } from "@playwright/test";

test("check the application is running", async ({ page }) => {
  await page.goto("/");

  // create a locator
  const button = page.locator("#button-burner");

  // Expect an attribute "to be strictly equal" to the value.
  await expect(button).toHaveText("Connect");

  // Click the get started link.
  await button.click();

  // Expects the URL to contain intro.
  const iframe = page.locator("#iframe");
  await expect(iframe).not.toBeHidden({ timeout: 5000 });
});

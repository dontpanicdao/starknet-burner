import { test, expect } from "@playwright/test";

test("check the application is running", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(async () => {
    const burner = window["starknet-burner"];
    await burner.enable({ partial: true });
    const block = await burner.provider.getBlock(
      "0x4d9fed899dc91fc0a6261ff4b9aed52a0f3092c9d64e83465483f769a637e1e"
    );
    const output = document.querySelector("#output");
    if (output) {
      output.innerHTML = block.transactions[0];
    }
  });

  const output = page.locator("#output");
  await expect(output).toContainText(
    "0x4865abae2d467860332afd22a344b89db46a5c4dba2ad3b523551611bdb4da"
  );
});

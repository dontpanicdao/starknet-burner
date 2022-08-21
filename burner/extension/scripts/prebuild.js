import fs from "fs";

fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.readFile("../keyring/package.json", "utf8", (err, keyring) => {
    if (err) {
      console.error(err);
      return;
    }
    const version = JSON.parse(data)?.version || "dev";
    const versionKeyring = JSON.parse(keyring)?.version || "dev";
    if (version !== versionKeyring) {
      console.error(`version mismatch, extension: ${version}, keyring: ${versionKeyring}`);
      return;
    }
    fs.writeFileSync("src/lib/version.ts", `export const version = "${version}";
`);
    console.log("preprocessing version", version, "before publishing...");
  });
});

const fs = require("fs");

fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.readFile("../extension/package.json", "utf8", (err, extension) => {
    if (err) {
      console.error(err);
      return;
    }
    const version = JSON.parse(data)?.version || "dev";
    const versionExtension = JSON.parse(extension)?.version || "dev";
    if (version !== versionExtension) {
      console.error(
        `version mismatch, keyring: ${version}, extension: ${versionExtension}`
      );
      return;
    }
    fs.writeFileSync(
      "lib/version.js",
      `export const version = "${version}";
`
    );
  });
});

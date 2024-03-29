const fs = require("fs");

fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const version = JSON.parse(data)?.version || "dev";
  fs.writeFileSync("lib/version.js", `export const version = "${version}";`);
});

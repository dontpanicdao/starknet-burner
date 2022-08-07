import fs from "fs";

fs.readFile("./package.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const version = JSON.parse(data)?.version || "dev";
  fs.writeFileSync(
    "src/lib/version.ts",
    `export const version = "${version}";`
  );
  console.log("preprocessing version", version, "before publishing...");
});

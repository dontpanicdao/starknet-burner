import fs from "fs";

fs.writeFileSync(
  "lib/version.js",
  `export const version = "dev";
`
);

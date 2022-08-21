const fs = require("fs");

fs.writeFileSync(
  "lib/version.js",
  `export const version = "dev";
`
);

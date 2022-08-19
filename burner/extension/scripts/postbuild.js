import fs from "fs";

fs.writeFileSync("src/lib/version.ts", `export const version = "dev";
`);

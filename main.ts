// The Battery's Last Text to Its Charger — a make.fun bounty entry.
//
// One line of plain text: the phone battery's final message to the charger
// it waited for all day. Run with `node main.ts`; the line is written to
// /output/entry.txt with no trailing newline, and printed with its length.
//
// The gate accepts UTF-8 text of 1-200 characters that is not only
// whitespace, so the line is checked here before anything is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_FILE = "/output/entry.txt";
const CHAR_LIMIT = 200;

const LAST_TEXT =
  "I held 4% through your ex's 2am 'u up?', three alarms, and a 3-hour doomscroll. You left me on the nightstand like furniture. I'm done. Go charge someone else.";

function checkLine(text: string): string {
  const chars = [...text].length;
  if (chars < 1) {
    throw new Error("entry must not be empty");
  }
  if (chars > CHAR_LIMIT) {
    throw new Error(`entry is ${chars} characters, over the ${CHAR_LIMIT} limit`);
  }
  if (text.trim() === "") {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be one single line");
  }
  return text;
}

function writeEntry(): void {
  const line = checkLine(LAST_TEXT);
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, line, "utf8");
  console.log(line);
  console.log(`characters: ${[...line].length}`);
}

writeEntry();

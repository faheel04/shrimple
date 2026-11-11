import { writeFileSync } from "node:fs";
import englishWords from "an-array-of-english-words";

const TARGET = "SHRIMP";

const validWords = new Set(
  (englishWords as string[])
    .map((word) => word.toUpperCase())
    .filter((word) => /^[A-Z]{6}$/.test(word))
);

// Guarantee our known word ladder is included.
[
  "SHRIMP",
  "SCRIMP",
  "SCRIMS",
  "SCRIPS",
  "STRIPS",
  "STRIPE",
  "STRIKE",
].forEach((word) => validWords.add(word));

// Find the entire connected component of SHRIMP.
const reachable = new Set<string>([TARGET]);
const queue = [TARGET];

let index = 0;

while (index < queue.length) {
  const current = queue[index++];

  for (let position = 0; position < 6; position++) {
    for (let code = 65; code <= 90; code++) {
      const letter = String.fromCharCode(code);

      if (letter === current[position]) continue;

      const candidate =
        current.slice(0, position) +
        letter +
        current.slice(position + 1);

      if (validWords.has(candidate) && !reachable.has(candidate)) {
        reachable.add(candidate);
        queue.push(candidate);
      }
    }
  }
}

const startingWords = [...reachable]
  .filter((word) => word !== TARGET)
  .sort();

writeFileSync(
  "data/word-data.json",
  JSON.stringify(
    {
      validWords: [...validWords],
      startingWords,
    },
    null,
    2
  )
);

console.log(`Dictionary words: ${validWords.size}`);
console.log(`Reachable starting words: ${startingWords.length}`);

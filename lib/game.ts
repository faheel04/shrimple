export function countDifferentLetters(
  first: string,
  second: string
): number {
  if (first.length !== second.length) return Infinity;

  let differences = 0;

  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) {
      differences++;
    }
  }

  return differences;
}

export function isValidMove(
  previousWord: string,
  nextWord: string
): boolean {
  return (
    /^[A-Z]{6}$/.test(nextWord) &&
    countDifferentLetters(previousWord, nextWord) === 1
  );
}

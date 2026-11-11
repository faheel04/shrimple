import { WORD_LENGTH, TARGET_WORD } from "@/data/words";

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
}

export default function GameBoard({
  guesses,
  currentGuess,
}: GameBoardProps) {
  const rows = [...guesses, currentGuess];

  return (
    <div className="game-board">
      {rows.map((word, rowIndex) => {
        const previousWord =
          rowIndex > 0 ? guesses[rowIndex - 1] : "";

        let changedPosition = -1;

        if (word && previousWord) {
          for (let i = 0; i < WORD_LENGTH; i++) {
            if (word[i] !== previousWord[i]) {
              changedPosition = i;
              break;
            }
          }
        }

        return (
          <div className="board-row" key={rowIndex}>
            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
              const letter = word[colIndex] || "";
              const isTarget = word === TARGET_WORD;
              const isChanged = colIndex === changedPosition;

              return (
                <div
                  key={colIndex}
                  className={[
                    "tile",
                    letter ? "filled" : "",
                    isChanged ? "changed-letter" : "",
                    isTarget ? "target-letter" : "",
                  ].filter(Boolean).join(" ")}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

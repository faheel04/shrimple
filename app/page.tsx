"use client";

import { useCallback, useEffect, useState } from "react";
import GameBoard from "@/components/GameBoard";
import Keyboard from "@/components/Keyboard";
import { STARTING_WORDS, TARGET_WORD, WORD_LENGTH, VALID_WORDS } from "@/data/words";
import { isValidMove } from "@/lib/game";

export default function Home() {
  const [startingWord, setStartingWord] = useState<string>(
    STARTING_WORDS[0]
  );

  const [guesses, setGuesses] = useState<string[]>([
    STARTING_WORDS[0],
  ]);

  const [currentGuess, setCurrentGuess] = useState("");
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);

  const lastGuess = guesses[guesses.length - 1];

  const newGame = useCallback(() => {
    const availableWords = STARTING_WORDS.filter(
      (word) => word !== startingWord
    );

    const randomIndex = Math.floor(
      Math.random() * availableWords.length
    );

    const newStartingWord = availableWords[randomIndex];

    setStartingWord(newStartingWord);
    setGuesses([newStartingWord]);
    setCurrentGuess("");
    setMessage("");
    setGameWon(false);
  }, [startingWord]);

  const submitGuess = useCallback(() => {
    if (gameWon) return;

    const guess = currentGuess.toUpperCase();

    if (guess.length !== WORD_LENGTH) {
      setMessage(`Enter a ${WORD_LENGTH}-letter word.`);
      return;
    }

    if (!VALID_WORDS.has(guess)) {
      setMessage("That's not a valid word.");
      return;
    }

    if (!isValidMove(lastGuess, guess)) {
      setMessage("Your word must change exactly one letter.");
      return;
    }

    if (guesses.includes(guess)) {
      setMessage("You've already used that word.");
      return;
    }

    const updatedGuesses = [...guesses, guess];

    setGuesses(updatedGuesses);
    setCurrentGuess("");
    setMessage("");

    if (guess === TARGET_WORD) {
      setGameWon(true);
    }
  }, [currentGuess, gameWon, lastGuess, guesses]);

  const handleKey = useCallback(
    (key: string) => {
      if (gameWon) return;

      if (key === "ENTER") {
        submitGuess();
        return;
      }

      if (key === "BACKSPACE") {
        setCurrentGuess((previous) => previous.slice(0, -1));
        return;
      }

      if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((previous) => previous + key);
      }
    },
    [currentGuess, gameWon, submitGuess]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleKey("ENTER");
      } else if (event.key === "Backspace") {
        handleKey("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKey(event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKey]);

  return (
    <main className="game-container">
      <header className="game-header">
        <h1>shrimple</h1>
        <p>Change one letter at a time to reach SHRIMP.</p>
      </header>

      <section className="game-content">
        <GameBoard
          guesses={guesses}
          currentGuess={currentGuess}
        />

        {message && (
          <p className="game-message" role="status">
            {message}
          </p>
        )}

        {gameWon ? (
          <div className="win-message">
            <h2>You got it!</h2>
            <p>
              You reached SHRIMP in {guesses.length - 1} guesses.
            </p>
            <button onClick={newGame}>Play Again</button>
          </div>
        ) : (
          <Keyboard onKey={handleKey} disabled={gameWon} />
        )}
      </section>
    </main>
  );
}

interface KeyboardProps {
  onKey: (key: string) => void;
  disabled: boolean;
}

const KEY_ROWS = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM",
];

export default function Keyboard({
  onKey,
  disabled,
}: KeyboardProps) {
  return (
    <div className="keyboard">
      {KEY_ROWS.map((row, index) => (
        <div className="keyboard-row" key={index}>
          {index === 2 && (
            <button
              className="special-key"
              onClick={() => onKey("ENTER")}
              disabled={disabled}
            >
              ENTER
            </button>
          )}

          {row.split("").map((letter) => (
            <button
              className="key"
              key={letter}
              onClick={() => onKey(letter)}
              disabled={disabled}
            >
              {letter}
            </button>
          ))}

          {index === 2 && (
            <button
              className="special-key"
              onClick={() => onKey("BACKSPACE")}
              disabled={disabled}
            >
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

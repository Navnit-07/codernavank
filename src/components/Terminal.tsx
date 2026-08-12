import { useEffect, useRef, useState } from "react";

export interface TermLine {
  type: "system" | "you" | "bot" | "event" | "error";
  text: string;
}

interface Props {
  lines: TermLine[];
  onSubmit: (raw: string) => void;
}

export default function Terminal({ lines, onSubmit }: Props) {
  const [value, setValue] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<string[]>([]);
  const historyIdx = useRef<number>(-1);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  function submit() {
    const raw = value;
    if (!raw.trim()) return;
    historyRef.current.push(raw);
    historyIdx.current = historyRef.current.length;
    onSubmit(raw);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyRef.current.length === 0) return;
      historyIdx.current = Math.max(0, historyIdx.current - 1);
      setValue(historyRef.current[historyIdx.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyRef.current.length === 0) return;
      historyIdx.current = Math.min(historyRef.current.length, historyIdx.current + 1);
      setValue(historyRef.current[historyIdx.current] ?? "");
    }
  }

  return (
    <>
      <div className="term-output" ref={outputRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((l, i) => (
          <div className={`term-line ${l.type}`} key={i}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="term-input-row">
        <span className="term-prompt">$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="try: e4, whoami, help..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="terminal input"
        />
        <span className="term-hint">enter ↵</span>
      </div>
    </>
  );
}

import { useCallback, useRef, useState } from "react";
import { Chess, type Square as ChessSquare } from "chess.js";
import Boot from "./components/Boot";
import TitleBar from "./components/TitleBar";
import Board from "./components/Board";
import Terminal, { type TermLine } from "./components/Terminal";
import Panels from "./components/Panels";
import GameOverOverlay from "./components/GameOverOverlay";
import { routeForPiece, type PanelId, type PieceType } from "./lib/pieceRouter";
import { pickBotMove, CAPTURE_TAUNTS, CHECK_TAUNTS, OPENING_TAUNTS, randomFrom } from "./lib/chessBot";
import { HELP_TEXT, PANEL_ALIASES, UNKNOWN_RESPONSES } from "./lib/commands";
import { IDENTITY } from "./lib/content";

const PIECE_NAMES: Record<string, string> = {
  p: "pawn",
  n: "knight",
  b: "bishop",
  r: "rook",
  q: "queen",
  k: "king",
};

interface KillEntry {
  by: "you" | "bot";
  piece: string;
  square: string;
  move: number;
}

const INTRO_LINES: TermLine[] = [
  { type: "system", text: "codernavankOS terminal — type a chess move (e4, Nf3, O-O...) or a command." },
  { type: "system", text: "type `help` if you're lost. type `whoami` if I am." },
  { type: "system", text: "" },
];

export default function App() {
  const [booted, setBooted] = useState(false);
  const gameRef = useRef(new Chess());
  const [, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);

  const [selected, setSelected] = useState<ChessSquare | null>(null);
  const [legalTargets, setLegalTargets] = useState<string[]>([]);
  const [legalCaptures, setLegalCaptures] = useState<Set<string>>(new Set());
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [killFeed, setKillFeed] = useState<KillEntry[]>([]);
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [overlay, setOverlay] = useState<"none" | "win" | "lose">("none");
  const [hasWon, setHasWon] = useState(false);
  const [botThinking, setBotThinking] = useState(false);
  const [lines, setLines] = useState<TermLine[]>(INTRO_LINES);

  const append = useCallback((newLines: TermLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  function clearSelection() {
    setSelected(null);
    setLegalTargets([]);
    setLegalCaptures(new Set());
  }

  function applyBotTurn() {
    const game = gameRef.current;
    if (game.isGameOver()) return;
    setBotThinking(true);
    const delay = 550 + Math.random() * 700;
    setTimeout(() => {
      const move = pickBotMove(game);
      if (!move) {
        setBotThinking(false);
        return;
      }
      game.move(move.san);
      setLastMove({ from: move.from, to: move.to });

      const out: TermLine[] = [{ type: "bot", text: `played ${move.san}` }];

      if (move.captured) {
        setKillFeed((prev) => [
          ...prev,
          {
            by: "bot",
            piece: `${PIECE_NAMES[move.captured!] ?? move.captured}`,
            square: move.to,
            move: game.history().length,
          },
        ]);
        out.push({ type: "bot", text: randomFrom(CAPTURE_TAUNTS) });
      } else if (game.history().length <= 6) {
        out.push({ type: "bot", text: randomFrom(OPENING_TAUNTS) });
      }

      if (game.isCheckmate()) {
        out.push({ type: "event", text: "checkmate. Industry Standard wins this round." });
        append(out);
        setOverlay("lose");
        setBotThinking(false);
        rerender();
        return;
      }

      if (game.inCheck()) {
        out.push({ type: "bot", text: randomFrom(CHECK_TAUNTS) });
      }

      append(out);
      setBotThinking(false);
      rerender();
    }, delay);
  }

  function commitPlayerMove(san: string, echo: boolean) {
    const game = gameRef.current;
    let move;
    try {
      move = game.move(san);
    } catch {
      return false;
    }
    if (!move) return false;

    setLastMove({ from: move.from, to: move.to });
    clearSelection();

    const out: TermLine[] = [];
    if (echo) out.push({ type: "you", text: san });

    const route = routeForPiece(move.piece as PieceType);
    out.push({ type: "event", text: route.flavor });
    out.push({ type: "event", text: `→ opened ${route.panelTitle}` });
    setActivePanel(route.panel);

    if (move.captured) {
      setKillFeed((prev) => [
        ...prev,
        {
          by: "you",
          piece: `${PIECE_NAMES[move.captured!] ?? move.captured}`,
          square: move.to,
          move: game.history().length,
        },
      ]);
      out.push({
        type: "event",
        text: `captured black ${PIECE_NAMES[move.captured!] ?? move.captured} on ${move.to}`,
      });
    }

    if (game.isCheckmate()) {
      out.push({ type: "event", text: "CHECKMATE. Industry Standard has no moves left." });
      append(out);
      setOverlay("win");
      setHasWon(true);
      rerender();
      return true;
    }

    if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
      out.push({
        type: "event",
        text: "the game's a draw. anticlimactic, but the panels still work — keep exploring.",
      });
      append(out);
      rerender();
      return true;
    }

    if (game.inCheck()) {
      out.push({ type: "event", text: "check!" });
    }

    append(out);
    rerender();
    applyBotTurn();
    return true;
  }

  function handleSquareClick(square: ChessSquare) {
    if (overlay !== "none" || botThinking) return;
    const game = gameRef.current;
    if (game.isGameOver()) return;

    if (selected === square) {
      clearSelection();
      return;
    }

    if (selected) {
      const moves = game.moves({ square: selected, verbose: true });
      const found = moves.find((m) => m.to === square);
      if (found) {
        commitPlayerMove(found.san, true);
        return;
      }
    }

    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setSelected(square);
      const moves = game.moves({ square, verbose: true });
      setLegalTargets(moves.map((m) => m.to));
      setLegalCaptures(new Set(moves.filter((m) => m.captured).map((m) => m.to)));
    } else {
      clearSelection();
    }
  }

  function resetGame(logMessage: boolean) {
    gameRef.current = new Chess();
    clearSelection();
    setLastMove(null);
    setKillFeed([]);
    setOverlay("none");
    setHasWon(false);
    setBotThinking(false);
    rerender();
    if (logMessage) {
      append([
        { type: "you", text: "reset" },
        { type: "event", text: "new game. clean slate. unlike your browser history." },
      ]);
    }
  }

  function handleTerminalSubmit(raw: string) {
    const trimmed = raw.trim();
    const lowered = trimmed.toLowerCase();

    if (lowered === "help") {
      append([{ type: "you", text: trimmed }, ...HELP_TEXT.map((t) => ({ type: "system" as const, text: t }))]);
      return;
    }
    if (lowered === "clear") {
      setLines([]);
      return;
    }
    if (lowered === "reset") {
      resetGame(true);
      return;
    }
    if (lowered === "whoami") {
      append([
        { type: "you", text: trimmed },
        { type: "system", text: `${IDENTITY.name} / ${IDENTITY.handle}` },
        { type: "system", text: IDENTITY.tagline },
        {
          type: "system",
          text: "currently: building the next move, optimizing the current one, and shipping things that weren't supposed to work this well.",
        },
      ]);
      return;
    }
    if (lowered === "ls") {
      append([
        { type: "you", text: trimmed },
        { type: "system", text: "skills.sh  projects/  achievements.log  experience.log  hire_me.sh  about.txt" },
      ]);
      return;
    }
    if (lowered.startsWith("whois")) {
      append([
        { type: "you", text: trimmed },
        { type: "system", text: `github    -> ${IDENTITY.links.github}` },
        { type: "system", text: `leetcode  -> ${IDENTITY.links.leetcode}` },
        { type: "system", text: `linkedin  -> ${IDENTITY.links.linkedin}` },
      ]);
      return;
    }
    if (lowered === "history") {
      const game = gameRef.current;
      const moves = game.history();
      append([
        { type: "you", text: trimmed },
        {
          type: "system",
          text: moves.length ? `moves so far: ${moves.join(" ")}` : "no moves yet. the board is a blank canvas.",
        },
        { type: "system", text: "type `cat experience.log` for the career commit log." },
      ]);
      return;
    }
    if (lowered === "hint") {
      const game = gameRef.current;
      if (game.isGameOver()) {
        append([{ type: "you", text: trimmed }, { type: "system", text: "game's over. type reset." }]);
        return;
      }
      const moves = game.moves();
      const suggestion = randomFrom(moves);
      append([
        { type: "you", text: trimmed },
        { type: "system", text: `try ${suggestion}? maybe. no promises, I'm a portfolio, not Stockfish.` },
      ]);
      return;
    }
    if (lowered === "resign") {
      append([
        { type: "you", text: trimmed },
        { type: "system", text: "you resigned. the board doesn't care about your feelings. type `reset` to try again." },
      ]);
      return;
    }
    if (lowered.startsWith("cat ")) {
      const key = lowered.replace("cat ", "").trim();
      const panel = PANEL_ALIASES[key];
      if (panel) {
        setActivePanel(panel as PanelId);
        append([
          { type: "you", text: trimmed },
          { type: "event", text: `opened ${key}` },
        ]);
      } else {
        append([
          { type: "you", text: trimmed },
          { type: "error", text: `no such file: ${key}. try \`ls\`.` },
        ]);
      }
      return;
    }

    if (overlay !== "none") {
      append([
        { type: "you", text: trimmed },
        { type: "error", text: "game's over. type `reset` to play again, or browse with `cat`." },
      ]);
      return;
    }
    if (botThinking) {
      append([
        { type: "you", text: trimmed },
        { type: "error", text: "Industry Standard is still thinking. rude to interrupt." },
      ]);
      return;
    }
    if (gameRef.current.isGameOver()) {
      append([
        { type: "you", text: trimmed },
        { type: "error", text: "the game already ended. type `reset` to play again, or `cat` a panel to keep browsing." },
      ]);
      return;
    }

    const ok = commitPlayerMove(trimmed, true);
    if (!ok) {
      append([
        { type: "you", text: trimmed },
        { type: "error", text: randomFrom(UNKNOWN_RESPONSES) },
      ]);
    }
  }

  if (!booted) {
    return <Boot onDone={() => setBooted(true)} />;
  }

  const game = gameRef.current;

  return (
    <div className="app-shell">
      <div className="crt-overlay" />
      <div className="crt-vignette" />
      <TitleBar
        turn={game.turn()}
        moveCount={game.history().length}
        botThinking={botThinking}
        gameOver={game.isGameOver()}
      />

      <div className="main-grid">
        <section className="pane board-pane">
          <div className="pane-header">
            <span>chess.exe</span>
            <span>white to move loses focus fastest</span>
          </div>
          <Board
            game={game}
            selected={selected}
            legalTargets={legalTargets}
            legalCaptures={legalCaptures}
            lastMove={lastMove}
            onSquareClick={handleSquareClick}
            disabled={overlay !== "none" || botThinking}
            killFeed={killFeed}
          />
        </section>

        <section className="pane term-pane" style={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
          <div style={{ display: "grid", gridTemplateRows: "1fr auto", minHeight: 260 }}>
            <div className="pane-header">
              <span>terminal</span>
              <span>checkmate to unlock hire_me.sh</span>
            </div>
            <Terminal lines={lines} onSubmit={handleTerminalSubmit} />
          </div>
          <div style={{ borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", minHeight: 220 }}>
            <div className="pane-header">
              <span>viewer</span>
              <span>{activePanel ?? "empty"}</span>
            </div>
            <Panels activePanel={activePanel} hasWon={hasWon} />
          </div>
        </section>
      </div>

      <div className="status-strip">
        <span>
          pawn→skills · knight→projects · bishop→achievements · rook→experience · queen→hire · king→about
        </span>
        <span>
          built by {IDENTITY.name} ({IDENTITY.handle})
        </span>
      </div>

      {overlay !== "none" && (
        <GameOverOverlay
          type={overlay}
          onRetry={() => resetGame(false)}
          onDismiss={() => setOverlay("none")}
          onViewHire={() => {
            setActivePanel("HIRE");
            setOverlay("none");
          }}
        />
      )}
    </div>
  );
}

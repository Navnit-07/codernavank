import type { Chess, Square as ChessSquare } from "chess.js";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

const PIECE_GLYPH: Record<string, { w: string; b: string }> = {
  p: { w: "♙", b: "♟" },
  n: { w: "♘", b: "♞" },
  b: { w: "♗", b: "♝" },
  r: { w: "♖", b: "♜" },
  q: { w: "♕", b: "♛" },
  k: { w: "♔", b: "♚" },
};

interface KillEntry {
  by: "you" | "bot";
  piece: string;
  square: string;
  move: number;
}

interface Props {
  game: Chess;
  selected: string | null;
  legalTargets: string[];
  legalCaptures: Set<string>;
  lastMove: { from: string; to: string } | null;
  onSquareClick: (square: ChessSquare) => void;
  disabled: boolean;
  killFeed: KillEntry[];
}

export default function Board({
  game,
  selected,
  legalTargets,
  legalCaptures,
  lastMove,
  onSquareClick,
  disabled,
  killFeed,
}: Props) {
  const checkSquare = (() => {
    if (!game.inCheck()) return null;
    const turn = game.turn();
    const board = game.board();
    for (const row of board) {
      for (const cell of row) {
        if (cell && cell.type === "k" && cell.color === turn) return cell.square;
      }
    }
    return null;
  })();

  return (
    <div className="board-wrap">
      <div className="board-coords-top">
        {FILES.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
      <div className="board-grid">
        {RANKS.map((rank) =>
          FILES.map((file) => {
            const square = `${file}${rank}` as ChessSquare;
            const piece = game.get(square);
            const isLight = (FILES.indexOf(file) + rank) % 2 !== 0;
            const classes = [
              "square",
              isLight ? "light" : "dark",
              selected === square ? "selected" : "",
              legalTargets.includes(square) && !legalCaptures.has(square) ? "legal-target" : "",
              legalCaptures.has(square) ? "legal-capture" : "",
              lastMove && (lastMove.from === square || lastMove.to === square) ? "last-move" : "",
              checkSquare === square ? "in-check" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={square}
                type="button"
                className={classes}
                onClick={() => !disabled && onSquareClick(square)}
                aria-label={`${square}${piece ? ` ${piece.color === "w" ? "white" : "black"} ${piece.type}` : ""}`}
              >
                {piece && (
                  <span className={`piece ${piece.color === "w" ? "white" : "black"}`}>
                    {PIECE_GLYPH[piece.type][piece.color]}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
      <div className="board-coords-bottom">
        {FILES.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
      <div className="board-meta">
        <span>
          you: <b>white</b>
        </span>
        <span>
          opponent: <b>Industry Standard</b>
        </span>
      </div>

      <div className="kill-feed">
        <div className="kill-feed__title">kill feed</div>
        {killFeed.length === 0 && <div className="kill-feed__row">no captures yet. play something.</div>}
        {[...killFeed]
          .slice(-8)
          .reverse()
          .map((k, i) => (
            <div key={i} className={`kill-feed__row ${k.by === "you" ? "mine" : "theirs"}`}>
              {k.by === "you" ? "you" : "Industry Standard"} captured {k.piece} on {k.square}
            </div>
          ))}
      </div>
    </div>
  );
}

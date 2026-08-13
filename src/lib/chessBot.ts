import type { Chess, Move } from "chess.js";

// A light, beatable bot: weights captures and checks higher than quiet moves,
// nudges toward center control in the opening. Not trying to be Stockfish —
// trying to be a fun, occasionally-taunting rival.
export function pickBotMove(game: Chess): Move | null {
  const moves = game.moves({ verbose: true }) as Move[];
  if (moves.length === 0) return null;

  const centerSquares = new Set(["d4", "e4", "d5", "e5"]);
  const moveNumber = game.history().length;

  const weighted: { move: Move; weight: number }[] = moves.map((move) => {
    let weight = 1;
    if (move.captured) weight += 4;
    if (move.san.includes("+")) weight += 3;
    if (move.san.includes("#")) weight += 100;
    if (moveNumber < 10 && centerSquares.has(move.to)) weight += 2;
    if (move.piece === "k" && moveNumber < 12 && !move.san.includes("O")) weight -= 1;
    return { move, weight: Math.max(weight, 0.2) };
  });

  const total = weighted.reduce((sum, m) => sum + m.weight, 0);
  let roll = Math.random() * total;
  for (const entry of weighted) {
    roll -= entry.weight;
    if (roll <= 0) return entry.move;
  }
  return weighted[weighted.length - 1].move;
}

export const OPENING_TAUNTS = [
  "everyone opens like that. try something they haven't seen.",
  "textbook. I've seen this line a thousand times.",
  "playing it safe, I see.",
  "bold. or desperate. hard to tell yet.",
];

export const CAPTURE_TAUNTS = [
  "took my piece. cute. it's not over.",
  "material means nothing if the position's lost.",
  "fine, take it. I didn't need it anyway.",
];

export const CHECK_TAUNTS = [
  "check. okay, that one actually worried me.",
  "not bad. still not enough.",
  "getting nervous over here.",
];

export const IDLE_TAUNTS = [
  "thinking...",
  "calculating five moves deep, unlike your last commit.",
  "give me a second, this is a real engine, not a template.",
];

export function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

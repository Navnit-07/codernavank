import { IDENTITY } from "../lib/content";

interface Props {
  turn: "w" | "b";
  moveCount: number;
  botThinking: boolean;
  gameOver: boolean;
}

export default function TitleBar({ turn, moveCount, botThinking, gameOver }: Props) {
  return (
    <header className="title-bar">
      <div className="title-bar__left">
        <span className="title-bar__dot" />
        codernavankOS — checkmate_to_hire.exe
      </div>
      <div className="title-bar__status">
        <span>
          status: <b>{gameOver ? "game over" : botThinking ? "opponent thinking..." : "your move"}</b>
        </span>
        <span>
          turn: <b>{turn === "w" ? "you (white)" : "Industry Standard (black)"}</b>
        </span>
        <span>
          moves: <b>{moveCount}</b>
        </span>
      </div>
      <div className="title-bar__links">
        <a href={IDENTITY.links.github} target="_blank" rel="noreferrer">
          github
        </a>
        <a href={IDENTITY.links.leetcode} target="_blank" rel="noreferrer">
          leetcode
        </a>
        <a href={IDENTITY.links.linkedin} target="_blank" rel="noreferrer">
          linkedin
        </a>
      </div>
    </header>
  );
}

interface Props {
  type: "win" | "lose";
  onRetry: () => void;
  onDismiss: () => void;
  onViewHire?: () => void;
}

export default function GameOverOverlay({ type, onRetry, onDismiss, onViewHire }: Props) {
  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className={`overlay-card ${type === "lose" ? "lose" : ""}`}>
        {type === "win" ? (
          <>
            <h2>CHECKMATE. YOU WIN.</h2>
            <p>
              Industry Standard has no legal moves left. hire_me.sh just unlocked — the resume, contact form,
              and the smug satisfaction of beating a chess bot on someone's portfolio site.
            </p>
            <div className="overlay-actions">
              <button className="btn" onClick={onViewHire}>
                open hire_me.sh
              </button>
              <button className="btn ghost" onClick={onRetry}>
                play again
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>CHECKMATE. YOU LOSE.</h2>
            <p>
              [Industry Standard]: relax, so did most senior engineers early on. the portfolio's still all
              here — you just have to explore it the normal way now, or run it back.
            </p>
            <div className="overlay-actions">
              <button className="btn" onClick={onRetry}>
                retry
              </button>
              <button className="btn ghost" onClick={onDismiss}>
                keep browsing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

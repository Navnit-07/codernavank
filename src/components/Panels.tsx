import { useState } from "react";
import type { PanelId } from "../lib/pieceRouter";
import { ABOUT_LINES, ACHIEVEMENTS, COMMIT_LOG, EXPERIENCE, IDENTITY, PROJECTS, SKILLS } from "../lib/content";

interface Props {
  activePanel: PanelId;
  hasWon: boolean;
}

export default function Panels({ activePanel, hasWon }: Props) {
  if (!activePanel) {
    return (
      <div className="panel-empty">
        <p>
          nothing open yet. <br />
          play a move on the board — or type one in the terminal — <br />
          and this pane fills in. <br />
          <br />
          <b>pawn</b> → skills · <b>knight</b> → projects · <b>bishop</b> → achievements
          <br />
          <b>rook</b> → experience · <b>queen</b> → hire me · <b>king</b> → about
        </p>
      </div>
    );
  }

  return (
    <div className="panel-scroll">
      {activePanel === "SKILLS" && <SkillsPanel />}
      {activePanel === "PROJECTS" && <ProjectsPanel />}
      {activePanel === "ACHIEVEMENTS" && <AchievementsPanel />}
      {activePanel === "EXPERIENCE" && <ExperiencePanel />}
      {activePanel === "ABOUT" && <AboutPanel />}
      {activePanel === "HIRE" && <HirePanel hasWon={hasWon} />}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div>
      <h2 className="panel-title">skills.sh</h2>
      <p className="panel-sub">pawn move detected — here's the foundation everything else is built on.</p>
      {SKILLS.map((s) => (
        <div className="skill-row" key={s.label}>
          <span>{s.label}</span>
          <span className="bar-track">
            <span className="bar-fill" style={{ width: `${s.value}%` }} />
          </span>
          <span>{s.value}%</span>
        </div>
      ))}
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div>
      <h2 className="panel-title">projects/</h2>
      <p className="panel-sub">knight move — nonlinear, from-scratch builds, not tutorials.</p>
      {PROJECTS.map((p) => (
        <div className="card" key={p.id}>
          <h3>{p.name}</h3>
          <div className="meta">
            {p.stack} · {p.period}
          </div>
          <p>{p.blurb}</p>
          <a className="link" href={p.url} target="_blank" rel="noreferrer">
            view on github →
          </a>
        </div>
      ))}
    </div>
  );
}

function AchievementsPanel() {
  return (
    <div>
      <h2 className="panel-title">achievements.log</h2>
      <p className="panel-sub">bishop move — cutting diagonally across hackathons, research, and leadership.</p>
      {ACHIEVEMENTS.map((a, i) => (
        <div className="achievement-row" key={i}>
          {a}
        </div>
      ))}
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div>
      <h2 className="panel-title">experience.log</h2>
      <p className="panel-sub">rook move — straight lines, real companies, real numbers.</p>
      {EXPERIENCE.map((e) => (
        <div className="card" key={e.id}>
          <h3>
            {e.role} · {e.org}
          </h3>
          <div className="meta">{e.period}</div>
          <ul>
            {e.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="card">
        <h3>git log --oneline</h3>
        <div className="meta">the whole career, as commits</div>
        {COMMIT_LOG.map((c) => (
          <div className="commit-row" key={c.hash}>
            <span className="dot">●</span>
            <span className="hash">{c.hash}</span>
            <span>{c.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div>
      <h2 className="panel-title">about.txt</h2>
      <p className="panel-sub">king move — protecting what matters, the actual person behind the OS.</p>
      <div className="card">
        {ABOUT_LINES.map((l, i) => (
          <div key={i} style={{ minHeight: l ? undefined : "0.6em" }}>
            {l}
          </div>
        ))}
        <p style={{ marginTop: 14 }}>{IDENTITY.school}</p>
      </div>
    </div>
  );
}

function HirePanel({ hasWon }: { hasWon: boolean }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Let's work together — from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}\n\n(sent from codernavankOS after a checkmate)`
    );
    window.location.href = `mailto:codernavank@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div>
      <h2 className="panel-title">hire_me.sh</h2>
      <p className="panel-sub">queen move — the boldest piece on the board.</p>

      {!hasWon && (
        <div className="hire-locked">
          this panel unlocks properly once you checkmate <b style={{ color: "var(--amber)" }}>Industry Standard</b>.
          <br />
          bring the queen out, but bring a plan too.
          <br />
          <br />
          (you can still reach out below — I'm not going to gatekeep my own email behind a chess engine.)
          <div style={{ marginTop: 14 }}>
            <a className="link" href={IDENTITY.links.linkedin} target="_blank" rel="noreferrer">
              linkedin →
            </a>
          </div>
        </div>
      )}

      {hasWon && (
        <div className="hire-unlocked">
          <b style={{ color: "var(--green)" }}>checkmate. unlocked.</b>
          <p style={{ color: "var(--text)", marginTop: 8 }}>
            You beat Industry Standard. That's either a great sign for how you handle pressure, or a sign the bot
            needs work. Either way — let's talk.
          </p>
        </div>
      )}

      {!sent ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            placeholder="your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="your email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="what are we building?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button className="btn" type="submit">
            send_message.sh
          </button>
        </form>
      ) : (
        <p style={{ color: "var(--green)", fontSize: 12.5 }}>
          your mail client should be opening now. if it didn't, reach out directly on{" "}
          <a href={IDENTITY.links.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
          .
        </p>
      )}
    </div>
  );
}

export type PanelId =
  | "SKILLS"
  | "PROJECTS"
  | "ACHIEVEMENTS"
  | "EXPERIENCE"
  | "HIRE"
  | "ABOUT"
  | null;

export type PieceType = "p" | "n" | "b" | "r" | "q" | "k";

interface RouteInfo {
  panel: PanelId;
  flavor: string;
  panelTitle: string;
}

const ROUTES: Record<PieceType, RouteInfo> = {
  p: {
    panel: "SKILLS",
    flavor: "pawn advances. fundamentals loading...",
    panelTitle: "skills.sh — the fundamentals",
  },
  n: {
    panel: "PROJECTS",
    flavor: "knight develops. nonlinear thinking incoming.",
    panelTitle: "projects/ — things I built from scratch",
  },
  b: {
    panel: "ACHIEVEMENTS",
    flavor: "bishop develops. cutting diagonally across categories.",
    panelTitle: "achievements.log — cross-cutting wins",
  },
  r: {
    panel: "EXPERIENCE",
    flavor: "rook activates. straight line, no detours.",
    panelTitle: "experience.log — where I've shipped",
  },
  q: {
    panel: "HIRE",
    flavor: "queen is out early. bold, maybe reckless. respect it.",
    panelTitle: "hire_me.sh — the boldest piece on the board",
  },
  k: {
    panel: "ABOUT",
    flavor: "the king moves. protecting what matters.",
    panelTitle: "about.txt — who's actually behind this",
  },
};

export function routeForPiece(piece: PieceType): RouteInfo {
  return ROUTES[piece];
}

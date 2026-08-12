export const HELP_TEXT = [
  "available inputs:",
  "  <chess move>     e.g. e4, Nf3, O-O — plays it on the board, opens a panel",
  "  whoami           who you're dealing with",
  "  ls                list every panel",
  "  cat <panel>      open a panel directly (skills, projects, achievements,",
  "                   experience, hire, about)",
  "  history          move log, styled like a commit log",
  "  whois codernavank   linked profiles (github / leetcode / linkedin)",
  "  hint             suggest a legal move",
  "  resign           give up the game (unlocks nothing, but it's an option)",
  "  reset            start a new game",
  "  clear            clear the terminal output",
  "  help             this list",
];

export const PANEL_ALIASES: Record<string, string> = {
  skills: "SKILLS",
  "skills.sh": "SKILLS",
  projects: "PROJECTS",
  "projects/": "PROJECTS",
  achievements: "ACHIEVEMENTS",
  "achievements.log": "ACHIEVEMENTS",
  experience: "EXPERIENCE",
  "experience.log": "EXPERIENCE",
  hire: "HIRE",
  "hire_me.sh": "HIRE",
  "hire-me": "HIRE",
  about: "ABOUT",
  "about.txt": "ABOUT",
};

export const UNKNOWN_RESPONSES = [
  "command not found. maybe google it — most devs do.",
  "not a legal move, not a known command. pick a lane.",
  "that's neither valid SAN nor a valid command. try `help`.",
];

export const AVATAR_COLORS = ["orange", "green", "pink", "gray", "teal", "blue", "red"];

const AVATAR_COLOR_ALIASES = {
  purple: "blue",
  white: "orange",
};

export function normalizeAvatarColor(color, fallback = "orange") {
  const resolved = AVATAR_COLOR_ALIASES[color] ?? color;
  return AVATAR_COLORS.includes(resolved) ? resolved : fallback;
}

export const AVATAR_SIZES = ["md", "xl", "2xl"];

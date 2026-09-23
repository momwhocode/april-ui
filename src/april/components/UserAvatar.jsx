import { Avatar } from "./Avatar.jsx";

function avatarUrl(user) {
  return user?.imageUrl ?? user?.profilePhotoUrl ?? user?.photoUrl ?? user?.avatarUrl ?? user?.src ?? "";
}

/** Person avatar. Shows a photo when one is set, otherwise initials. */
export function UserAvatar({ user, size = "md", className = "", alt }) {
  if (!user || typeof user !== "object") return null;

  const imageUrl = String(avatarUrl(user)).trim();

  return (
    <Avatar
      type={imageUrl ? "image" : "initials"}
      size={size}
      initials={user.initials}
      color={user.color}
      imageUrl={imageUrl || undefined}
      alt={alt ?? user.name ?? user.actor}
      className={className}
    />
  );
}

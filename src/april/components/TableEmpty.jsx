import { Button } from "./Button.jsx";

const PRESETS = {
  default: {
    title: "No items yet",
    description: "There's nothing here yet. Add your first entry to get started.",
    action: "Add new",
    icon: "table_rows",
    regionLabel: "Empty list",
  },
};

/** Empty state for a table with no rows. */
export function TableEmpty({
  variant = "default",
  title,
  description,
  actionLabel,
  icon,
  showAction = true,
  onAction,
  regionLabel,
}) {
  const preset = PRESETS[variant] ?? PRESETS.default;
  const resolvedTitle = title ?? preset.title;
  const resolvedDescription = description ?? preset.description;
  const resolvedAction = actionLabel ?? preset.action;
  const resolvedIcon = icon ?? preset.icon;
  const resolvedRegion = regionLabel ?? preset.regionLabel;

  return (
    <div className="april-table-shell april-table-shell--empty">
      <div className="april-table-empty-frame" role="region" aria-label={resolvedRegion}>
        <div className="april-table-empty april-table-empty--framed">
          <div className="april-table-empty__icon" aria-hidden="true">
            <span
              className="material-symbols-outlined april-icon"
              style={{ fontSize: "var(--icon-size-icon-24)" }}
            >
              {resolvedIcon}
            </span>
          </div>
          <div className="april-table-empty__copy">
            <h3 className="april-text-style april-text-style--text-md-semibold april-table-empty__title">
              {resolvedTitle}
            </h3>
            <p className="april-text-style april-text-style--text-xs-regular april-table-empty__description">
              {resolvedDescription}
            </p>
          </div>
          {showAction ? (
            <Button
              label={resolvedAction}
              variant="primary"
              size="md"
              leadingIcon
              trailingIcon={false}
              icon="add"
              onClick={onAction}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

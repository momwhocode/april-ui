export const MODAL_SIZES = ["sm", "md", "lg"];

/** Content modals use `md` (400px) or `lg` (600px); `sm` is the compact confirmation pattern. */
export const MODAL_CONTENT_SIZES = ["md", "lg"];

/** `modal-container` slot content (Figma examples). */
export const MODAL_MD_CONTENT = ["empty", "filter", "change-status", "change-plan"];

const LG_MD_CONTENT = new Set(["filter", "change-status", "change-plan"]);

function isContentModalSize(size) {
  return MODAL_CONTENT_SIZES.includes(size);
}

/** Filter content always renders at lg (600px). */
export function resolveModalSize(size, mdContent = "empty") {
  if (size === "sm") return "sm";
  if (LG_MD_CONTENT.has(mdContent)) return "lg";
  if (size === "lg") return "lg";
  return "md";
}

const MD_CONTENT_PRESETS = {
  empty: {
    title: "Modal Title",
    icon: "apps",
    confirm: "Continue",
    resetLabel: "Reset All",
    showReset: true,
  },
  filter: {
    title: "Filter",
    icon: "filter_list",
    confirm: "Filter",
    resetLabel: "Reset Filters",
    showReset: true,
  },
  "change-status": {
    title: "Change Status",
    icon: "info",
    confirm: "Update Status",
    resetLabel: "Reset All",
    showReset: false,
  },
  "change-plan": {
    title: "Change Plan",
    icon: "credit_card",
    confirm: "Update Plan",
    resetLabel: "Reset All",
    showReset: false,
  },
};

const DEFAULT_TITLES = {
  sm: "Modal Title?",
  md: "Modal Title",
  lg: "Modal Title",
};

const DEFAULT_ICONS = {
  sm: "delete",
  md: "apps",
  lg: "apps",
};

const DEFAULT_CONFIRM = {
  sm: "Delete",
  md: "Continue",
  lg: "Continue",
};

export function resolveModalPlaygroundArgs({
  size = "sm",
  mdContent = "empty",
  showConfirmInput = true,
  title = null,
  description = "",
  icon = null,
  showDescription = true,
  cancel = "Cancel",
  confirm = null,
  resetLabel = null,
  showReset = null,
  confirmPlaceholder = "Confirm",
  modalContainer = null,
  backdrop = false,
} = {}) {
  const requestedSize = MODAL_SIZES.includes(size) ? size : "sm";
  const resolvedMdContent = MODAL_MD_CONTENT.includes(mdContent) ? mdContent : "empty";
  const resolvedSize = resolveModalSize(requestedSize, resolvedMdContent);
  const contentPreset = isContentModalSize(resolvedSize) ? MD_CONTENT_PRESETS[resolvedMdContent] : null;

  return {
    size: resolvedSize,
    mdContent: resolvedMdContent,
    showConfirmInput: resolvedSize === "sm" && showConfirmInput,
    title: title ?? contentPreset?.title ?? DEFAULT_TITLES[resolvedSize],
    description,
    icon: icon ?? contentPreset?.icon ?? DEFAULT_ICONS[resolvedSize],
    showDescription,
    cancel,
    confirm: confirm ?? contentPreset?.confirm ?? DEFAULT_CONFIRM[resolvedSize],
    resetLabel: resetLabel ?? contentPreset?.resetLabel ?? "Reset All",
    showReset: showReset ?? contentPreset?.showReset ?? isContentModalSize(resolvedSize),
    confirmPlaceholder,
    modalContainer,
    backdrop,
  };
}

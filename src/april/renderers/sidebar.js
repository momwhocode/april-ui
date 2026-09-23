export const SIDEBAR_VARIANTS = ["main", "settings"];

/** Neutral Storybook defaults; applications provide their own route-aware items. */
export const DEFAULT_MAIN_MENU_TOP = [
  { id: "home", label: "Home", icon: "home" },
  { id: "people", label: "People", icon: "person" },
  { id: "calendar", label: "Calendar", icon: "event" },
];

export const DEFAULT_MAIN_MENU_GROUPS = [];

export const DEFAULT_MAIN_MENU_BOTTOM = [
  { id: "reports", label: "Reports", icon: "bar_chart" },
  { id: "settings", label: "Settings", icon: "settings" },
];

export const DEFAULT_SETTINGS_MENU_GROUPS = [
  {
    groupLabel: "General",
    items: [
      { id: "school-profile", label: "School Profile", icon: "post_add" },
      { id: "billing", label: "Billing", icon: "credit_card" },
    ],
  },
  {
    groupLabel: "Operations",
    items: [
      { id: "batches", label: "Batches", icon: "schedule" },
      { id: "programs", label: "Programs", icon: "menu_book" },
      { id: "fee-plans", label: "Fee Plans", icon: "payments" },
      { id: "miscellaneous", label: "Miscellaneous", icon: "tune" },
    ],
  },
  {
    groupLabel: "Access",
    items: [{ id: "users-roles", label: "Users & Roles", icon: "admin_panel_settings" }],
  },
];

export const DEFAULT_SIDEBAR_ACTIVE_ITEM = {
  main: "home",
  settings: "school-profile",
};

export function resolveSidebarMenuData({ variant = "main", topItems, groups, bottomItems } = {}) {
  if (variant === "settings") {
    return {
      topItems: [],
      groups: groups ?? DEFAULT_SETTINGS_MENU_GROUPS,
      bottomItems: [],
    };
  }

  return {
    topItems: topItems ?? DEFAULT_MAIN_MENU_TOP,
    groups: groups ?? DEFAULT_MAIN_MENU_GROUPS,
    bottomItems: bottomItems ?? DEFAULT_MAIN_MENU_BOTTOM,
  };
}

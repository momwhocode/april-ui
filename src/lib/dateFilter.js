/** Date-range filter presets for a filter chip. */

import { formatAprilShortDate } from "../april/renderers/date-time.js";

export const DEFAULT_DATE_RANGE_FILTER = { preset: "lifetime" };

const DATE_RANGE_PRESETS = [
  { value: "lifetime", label: "Lifetime" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last_week", label: "Last Week" },
  { value: "last_month", label: "Last Month" },
  { value: "this_year", label: "This Year" },
  { value: "last_year", label: "Last Year" },
];

const PRESET_LABELS = Object.fromEntries(DATE_RANGE_PRESETS.map((option) => [option.value, option.label]));

export function isDateRangeFilterActive(value) {
  return Boolean(value?.preset && value.preset !== "lifetime");
}

export function dateRangeFilterGroups(value = DEFAULT_DATE_RANGE_FILTER) {
  const preset = value?.preset ?? "lifetime";

  return [
    {
      label: "Select Date Range",
      items: DATE_RANGE_PRESETS.map((option) => ({
        ...option,
        selected: preset === option.value,
        state: preset === option.value ? "active" : "default",
      })),
      dividerAfter: true,
    },
    {
      items: [
        {
          value: "custom",
          label: "Custom",
          selected: preset === "custom",
          state: preset === "custom" ? "active" : "default",
        },
      ],
    },
  ];
}

export function dateFilterDisplayLabel(filterLabel, value) {
  if (!isDateRangeFilterActive(value)) return filterLabel;

  if (value.preset !== "custom") {
    return `${filterLabel}: ${PRESET_LABELS[value.preset] ?? value.preset}`;
  }

  if (value.from && value.to) {
    return `${filterLabel}: ${formatAprilShortDate(`${value.from}T00:00:00`)} – ${formatAprilShortDate(`${value.to}T00:00:00`)}`;
  }

  if (value.from) {
    return `${filterLabel}: From ${formatAprilShortDate(`${value.from}T00:00:00`)}`;
  }

  if (value.to) {
    return `${filterLabel}: Until ${formatAprilShortDate(`${value.to}T00:00:00`)}`;
  }

  return `${filterLabel}: Custom`;
}

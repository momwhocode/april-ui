import { TABLE_ROWS } from "../../fixtures/table.js";

/** Table story constants — Storybook only. */

export { DEFAULT_TABLE_COLUMNS } from "../../fixtures/table.js";

export const TABLE_PLAYGROUND_STATES = [
  { value: "default", label: "Default" },
  { value: "loading", label: "Loading" },
  { value: "partially-loading", label: "Partial loading" },
  { value: "empty", label: "Empty" },
];

export const TABLE_LOADED_ROWS_MIN = 1;
export const TABLE_LOADED_ROWS_MAX = TABLE_ROWS.length;

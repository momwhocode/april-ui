/** True when a table column header can be sorted. */
export function isSortableColumn(column) {
  return Boolean(column?.sortable || column?.kind === "sortable-header");
}

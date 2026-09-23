/** Keep digits from a phone value. */
export function digitsOnlyPhone(value) {
  return String(value || "").replace(/\D/g, "");
}

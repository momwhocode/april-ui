import { TextInput } from "./TextInput.jsx";
import { digitsOnlyPhone } from "../../lib/validation.js";

const DEFAULT_MAX_LENGTH = 15;

/** Digits-only phone field. */
export function FormPhoneField({
  id = "form-phone",
  value = "",
  onChange,
  onBlur,
  placeholder = "Phone number",
  state = "default",
  description,
  showDescription = false,
  fullWidth = true,
  maxLength = DEFAULT_MAX_LENGTH,
  disabled = false,
  readOnly = false,
  autoComplete = "tel",
}) {
  return (
    <TextInput
      id={id}
      showLabel={false}
      showDescription={showDescription}
      description={description}
      type="tel"
      inputMode="numeric"
      autoComplete={autoComplete}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      fullWidth={fullWidth}
      state={state}
      disabled={disabled}
      readOnly={readOnly}
      onBlur={onBlur}
      onChange={(event) => {
        const next = digitsOnlyPhone(event.target.value).slice(0, maxLength);
        onChange?.({ target: { value: next } });
      }}
    />
  );
}

import React from "react";

export default function BackgroundImageRadioButton({
  onChange,
  kindNum,
  label,
}) {
  debugger;
  return (
    <>
      <input
        className="form-check-input"
        type="radio"
        name="backgroundKind"
        value={kindNum}
        onChange={onChange}
      />
      <label className="form-check-label">{label}</label>
    </>
  );
}

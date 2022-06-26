import React from "react";

export default function BackgroundImageRadioButton({
  onChange,
  kindNum,
  label,
}) {
  return (
    <>
      <input
        className="form-check-input"
        type="radio"
        name="backgroundKind"
        value={kindNum}
        onChange={onChange}
        defaultChecked={kindNum === 1}
      />
      <label className="form-check-label">{label}</label>
    </>
  );
}

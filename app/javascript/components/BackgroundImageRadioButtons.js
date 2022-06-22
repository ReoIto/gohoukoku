import React from "react";

export default function BackgroundImagesRadioButtons({ onChange }) {
  return (
    <div>
      <input
        className="form-check-input"
        type="radio"
        name="backgroundKind"
        value={1}
        onChange={onChange}
      />
      <label className="form-check-label">黒</label>
      <input
        className="form-check-input"
        type="radio"
        name="backgroundKind"
        value={2}
        onChange={onChange}
      />
      <label className="form-check-label">赤</label>
    </div>
  );
}
